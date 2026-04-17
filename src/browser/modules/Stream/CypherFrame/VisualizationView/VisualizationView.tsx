/*
 * Copyright (c) "Neo4j"
 * Neo4j Sweden AB [http://neo4j.com]
 *
 * This file is part of Neo4j.
 *
 * Neo4j is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import neo4j from 'neo4j-driver'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withBus } from 'react-suber'
import { Action, Dispatch } from 'redux'
import { Bus } from 'suber'
import I18nContext from 'shared/i18n/i18nContext'
import { TranslationKey } from 'shared/i18n/translations'

import {
  GraphModel,
  GraphNodeLabelsEditEvent,
  GraphPropertyEditEvent,
  GraphSelectionEvent,
  GraphVisualizer,
  VizItem
} from 'neo4j-arc/graph-visualization'

import { resultHasTruncatedFields } from 'browser/modules/Stream/CypherFrame/helpers'
import {
  BasicNode,
  BasicNodesAndRels,
  BasicRelationship,
  deepEquals
} from 'neo4j-arc/common'
import bolt from 'services/bolt/bolt'
import { NEO4J_BROWSER_USER_ACTION_QUERY } from 'services/bolt/txMetadata'
import { GlobalState } from 'shared/globalState'
import {
  ROUTED_CYPHER_READ_REQUEST,
  ROUTED_CYPHER_WRITE_REQUEST
} from 'shared/modules/cypher/cypherDuck'
import {
  getNodePropertiesExpandedByDefault,
  setNodePropertiesExpandedByDefault
} from 'shared/modules/frames/framesDuck'
import * as grassActions from 'shared/modules/grass/grassDuck'
import {
  getMaxFieldItems,
  shouldShowWheelZoomInfo,
  update as updateSettings
} from 'shared/modules/settings/settingsDuck'
import { DetailsPane } from './PropertiesPanelContent/DetailsPane'
import OverviewPane from './PropertiesPanelContent/OverviewPane'
import {
  StyledChangeItem,
  StyledChangeItemBadge,
  StyledChangeItemEmpty,
  StyledChangesList,
  StyledChangesOverlay,
  StyledChangesPanel,
  StyledChangesPanelActions,
  StyledChangesPanelHeader,
  StyledEditActionButton,
  StyledToast,
  StyledToastContainer,
  StyledVisContainer
} from './VisualizationView.styled'

type PendingPropertyEdit = GraphPropertyEditEvent
type PendingNodeCreate = {
  id: string
  elementId: string
  labels: string[]
  properties: Record<string, string>
  propertyTypes: Record<string, string>
}

type PendingNodeDelete = {
  id: string
  elementId: string
}

type PendingNodeLabelEdit = {
  id: string
  elementId: string
  originalLabels: string[]
  labels: string[]
}

type PendingRelationshipCreate = {
  id: string
  elementId: string
  startNodeId: string
  endNodeId: string
  type: string
  properties: Record<string, string>
  propertyTypes: Record<string, string>
}

type PendingRelationshipDelete = {
  id: string
  elementId: string
}

type PendingRelationshipRewire = {
  id: string
  elementId: string
  originalStartNodeId: string
  originalEndNodeId: string
  startNodeId: string
  endNodeId: string
  originalType: string
  type: string
}

type VisualizationState = {
  updated: number
  dataVersion: number
  nodes: BasicNode[]
  relationships: BasicRelationship[]
  originalNodes: BasicNode[]
  originalRelationships: BasicRelationship[]
  hasTruncatedFields: boolean
  nodeLimitHit: boolean
  pendingPropertyEdits: Record<string, PendingPropertyEdit>
  pendingNodeCreates: Record<string, PendingNodeCreate>
  pendingNodeDeletes: Record<string, PendingNodeDelete>
  pendingNodeLabelEdits: Record<string, PendingNodeLabelEdit>
  pendingRelationshipCreates: Record<string, PendingRelationshipCreate>
  pendingRelationshipDeletes: Record<string, PendingRelationshipDelete>
  pendingRelationshipRewires: Record<string, PendingRelationshipRewire>
  isSaving: boolean
  saveError: string | null
  relationshipCreationSourceNodeId: string | null
  relationshipCreationPreview: {
    sourceX: number
    sourceY: number
    targetX: number
    targetY: number
    sourceRadius: number
    targetRadius: number
  } | null
  relationshipReconnectRequest: {
    relationshipElementId: string
    endpoint: 'source' | 'target'
  } | null
  selectedNode: {
    id: string
    elementId: string
  } | null
  selectedRelationship: {
    id: string
    elementId: string
  } | null
  toast: {
    kind: 'success' | 'error'
    message: string
  } | null
}

type GraphInteractionEvent =
  | 'NODE_DISMISSED'
  | 'NODE_EXPAND'
  | 'NODE_UNPINNED'
  | 'NODE_RELATIONSHIP_CREATE_ACTIVATED'
  | 'RELATIONSHIP_ENDPOINT_RECONNECT_REQUESTED'

export type VisualizationProps = {
  result: any
  graphStyleData: any
  updated: number
  autoComplete: boolean
  maxNeighbours: number
  bus: Bus
  maxFieldItems: number
  initialNodeDisplay: number
  isFullscreen: boolean
  updateStyle: (style: any) => void
  assignVisElement: (v: any) => void
  nodePropertiesExpandedByDefault: boolean
  setNodePropertiesExpandedByDefault: (expandedByDefault: boolean) => void
  wheelZoomInfoMessageEnabled: boolean
  disableWheelZoomInfoMessage: () => void
  query?: string
  showChangesPanel?: boolean
  onPendingCountChange?: (count: number) => void
}

export class Visualization extends Component<
  VisualizationProps,
  VisualizationState
> {
  static contextType = I18nContext
  declare context: React.ContextType<typeof I18nContext>

  private t(
    key: TranslationKey,
    params?: Record<string, string | number>
  ): string {
    return this.context?.t(key, params) ?? key
  }

  autoCompleteCallback?: (
    rels: BasicRelationship[],
    initialRun: boolean
  ) => void
  graph: GraphModel | undefined
  containerRef = React.createRef<HTMLDivElement>()
  _ignoreNextCanvasClick = false
  _lastReportedPendingCount = 0
  state: VisualizationState = {
    nodes: [],
    relationships: [],
    originalNodes: [],
    originalRelationships: [],
    updated: 0,
    dataVersion: 0,
    nodeLimitHit: false,
    hasTruncatedFields: false,
    pendingPropertyEdits: {},
    pendingNodeCreates: {},
    pendingNodeDeletes: {},
    pendingNodeLabelEdits: {},
    pendingRelationshipCreates: {},
    pendingRelationshipDeletes: {},
    pendingRelationshipRewires: {},
    isSaving: false,
    saveError: null,
    relationshipCreationSourceNodeId: null,
    relationshipCreationPreview: null,
    relationshipReconnectRequest: null,
    selectedNode: null,
    selectedRelationship: null,
    toast: null
  }
  toastTimeout: ReturnType<typeof setTimeout> | null = null

  componentDidMount(): void {
    const { records = [] } = this.props.result
    if (records && records.length > 0) {
      this.populateDataToStateFromProps(this.props)
    }
  }

  shouldComponentUpdate(
    props: VisualizationProps,
    state: VisualizationState
  ): boolean {
    return (
      this.props.updated !== props.updated ||
      this.props.isFullscreen !== props.isFullscreen ||
      !deepEquals(props.graphStyleData, this.props.graphStyleData) ||
      this.state.updated !== state.updated ||
      this.props.autoComplete !== props.autoComplete ||
      this.props.wheelZoomInfoMessageEnabled !==
        props.wheelZoomInfoMessageEnabled ||
      this.props.showChangesPanel !== props.showChangesPanel ||
      !deepEquals(this.state.nodes, state.nodes) ||
      !deepEquals(this.state.relationships, state.relationships) ||
      Object.keys(this.state.pendingPropertyEdits).length !==
        Object.keys(state.pendingPropertyEdits).length ||
      Object.keys(this.state.pendingNodeCreates).length !==
        Object.keys(state.pendingNodeCreates).length ||
      Object.keys(this.state.pendingNodeDeletes).length !==
        Object.keys(state.pendingNodeDeletes).length ||
      Object.keys(this.state.pendingNodeLabelEdits).length !==
        Object.keys(state.pendingNodeLabelEdits).length ||
      Object.keys(this.state.pendingRelationshipCreates).length !==
        Object.keys(state.pendingRelationshipCreates).length ||
      Object.keys(this.state.pendingRelationshipDeletes).length !==
        Object.keys(state.pendingRelationshipDeletes).length ||
      Object.keys(this.state.pendingRelationshipRewires).length !==
        Object.keys(state.pendingRelationshipRewires).length ||
      this.state.isSaving !== state.isSaving ||
      this.state.saveError !== state.saveError ||
      this.state.relationshipCreationSourceNodeId !==
        state.relationshipCreationSourceNodeId ||
      !deepEquals(
        this.state.relationshipCreationPreview,
        state.relationshipCreationPreview
      ) ||
      !deepEquals(
        this.state.relationshipReconnectRequest,
        state.relationshipReconnectRequest
      ) ||
      !deepEquals(this.state.selectedNode, state.selectedNode) ||
      !deepEquals(
        this.state.selectedRelationship,
        state.selectedRelationship
      ) ||
      this.state.toast !== state.toast
    )
  }

  showToast(kind: 'success' | 'error', message: string): void {
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout)
    }
    this.setState({ toast: { kind, message } })
    this.toastTimeout = setTimeout(() => {
      this.setState({ toast: null })
    }, 2500)
  }

  getPendingCount(): number {
    return (
      Object.keys(this.state.pendingPropertyEdits).length +
      Object.keys(this.state.pendingNodeCreates).length +
      Object.keys(this.state.pendingNodeDeletes).length +
      Object.keys(this.state.pendingNodeLabelEdits).length +
      Object.keys(this.state.pendingRelationshipCreates).length +
      Object.keys(this.state.pendingRelationshipDeletes).length +
      Object.keys(this.state.pendingRelationshipRewires).length
    )
  }

  componentDidUpdate(prevProps: VisualizationProps): void {
    if (
      this.props.updated !== prevProps.updated ||
      this.props.autoComplete !== prevProps.autoComplete
    ) {
      this.populateDataToStateFromProps(this.props)
    }

    if (this.props.onPendingCountChange) {
      const count = this.getPendingCount()
      if (count !== this._lastReportedPendingCount) {
        this._lastReportedPendingCount = count
        this.props.onPendingCountChange(count)
      }
    }
  }

  populateDataToStateFromProps(props: VisualizationProps): void {
    const { nodes, relationships } =
      bolt.extractNodesAndRelationshipsFromRecordsForOldVis(
        props.result.records,
        true,
        props.maxFieldItems
      )

    const { nodes: uniqNodes, nodeLimitHit } = deduplicateNodes(
      nodes,
      this.props.initialNodeDisplay
    )

    const uniqRels = nodeLimitHit
      ? relationships.filter(
          rel =>
            !!uniqNodes.find(node => node.id === rel.startNodeId) &&
            !!uniqNodes.find(node => node.id === rel.endNodeId)
        )
      : relationships

    const hasTruncatedFields = resultHasTruncatedFields(
      props.result,
      props.maxFieldItems
    )
    this.setState(prevState => ({
      nodes: uniqNodes,
      relationships: uniqRels,
      originalNodes: uniqNodes,
      originalRelationships: uniqRels,
      nodeLimitHit,
      hasTruncatedFields,
      updated: new Date().getTime(),
      dataVersion: prevState.dataVersion + 1,
      pendingPropertyEdits: {},
      pendingNodeCreates: {},
      pendingNodeDeletes: {},
      pendingNodeLabelEdits: {},
      pendingRelationshipCreates: {},
      pendingRelationshipDeletes: {},
      pendingRelationshipRewires: {},
      saveError: null,
      relationshipCreationSourceNodeId: null,
      relationshipCreationPreview: null,
      relationshipReconnectRequest: null,
      selectedNode: null,
      selectedRelationship: null
    }))
  }

  refreshByCurrentQuery(): Promise<void> {
    if (!this.props.query) {
      this.populateDataToStateFromProps(this.props)
      return Promise.resolve()
    }

    return new Promise((resolve, reject) => {
      this.props.bus &&
        this.props.bus.self(
          ROUTED_CYPHER_READ_REQUEST,
          {
            query: this.props.query,
            queryType: NEO4J_BROWSER_USER_ACTION_QUERY,
            useDb: this.props.result.summary.database.name
          },
          (response: any) => {
            if (!response.success) {
              reject(response.error)
              return
            }

            const { nodes, relationships } =
              bolt.extractNodesAndRelationshipsFromRecordsForOldVis(
                response.result.records,
                true,
                this.props.maxFieldItems
              )

            const { nodes: uniqNodes, nodeLimitHit } = deduplicateNodes(
              nodes,
              this.props.initialNodeDisplay
            )

            const uniqRels = nodeLimitHit
              ? relationships.filter(
                  rel =>
                    !!uniqNodes.find(node => node.id === rel.startNodeId) &&
                    !!uniqNodes.find(node => node.id === rel.endNodeId)
                )
              : relationships

            const hasTruncatedFields = resultHasTruncatedFields(
              { result: response.result },
              this.props.maxFieldItems
            )

            this.setState(prevState => ({
              nodes: uniqNodes,
              relationships: uniqRels,
              nodeLimitHit,
              hasTruncatedFields,
              updated: new Date().getTime(),
              dataVersion: prevState.dataVersion + 1,
              pendingPropertyEdits: {},
              pendingNodeCreates: {},
              pendingNodeDeletes: {},
              pendingNodeLabelEdits: {},
              pendingRelationshipCreates: {},
              pendingRelationshipDeletes: {},
              pendingRelationshipRewires: {},
              saveError: null,
              relationshipCreationSourceNodeId: null,
              relationshipCreationPreview: null,
              relationshipReconnectRequest: null,
              selectedNode: null,
              selectedRelationship: null
            }))
            resolve()
          }
        )
    })
  }

  onPropertyEdit(edit: PendingPropertyEdit): void {
    if (this.state.pendingNodeDeletes[edit.elementId]) {
      return
    }

    if (
      edit.itemType === 'node' &&
      this.state.pendingNodeCreates[edit.elementId]
    ) {
      const updatedNode = this.state.nodes.find(
        node => node.elementId === edit.elementId
      )
      if (!updatedNode) {
        return
      }

      this.setState(prevState => ({
        pendingNodeCreates: {
          ...prevState.pendingNodeCreates,
          [updatedNode.elementId]: {
            ...prevState.pendingNodeCreates[updatedNode.elementId],
            labels: updatedNode.labels,
            properties: updatedNode.properties,
            propertyTypes: updatedNode.propertyTypes
          }
        },
        saveError: null
      }))
      return
    }

    const editKey = `${edit.itemType}:${edit.elementId}`

    // Compare against original properties to detect no-ops
    const originalItem =
      edit.itemType === 'node'
        ? this.state.originalNodes.find(
            node => node.elementId === edit.elementId
          )
        : this.state.originalRelationships.find(
            rel => rel.elementId === edit.elementId
          )

    if (originalItem) {
      const originalPropertyList = Object.entries(originalItem.properties)
        .map(([key, value]) => ({
          key,
          value,
          type: originalItem.propertyTypes[key] || 'string'
        }))
        .sort((a, b) => (a.key < b.key ? -1 : 1))

      const editPropertyList = [...edit.propertyList].sort((a, b) =>
        a.key < b.key ? -1 : 1
      )

      const isUnchanged =
        originalPropertyList.length === editPropertyList.length &&
        originalPropertyList.every(
          (prop, i) =>
            prop.key === editPropertyList[i].key &&
            prop.value === editPropertyList[i].value
        )

      if (isUnchanged) {
        // Remove pending edit if it was previously registered
        this.setState(prevState => {
          const nextEdits = { ...prevState.pendingPropertyEdits }
          delete nextEdits[editKey]
          return { pendingPropertyEdits: nextEdits, saveError: null }
        })
        return
      }
    }

    this.setState(prevState => ({
      pendingPropertyEdits: {
        ...prevState.pendingPropertyEdits,
        [editKey]: edit
      },
      saveError: null
    }))
  }

  onNodeLabelsEdit(edit: GraphNodeLabelsEditEvent): void {
    if (this.state.pendingNodeDeletes[edit.elementId]) {
      return
    }

    this.setState(prevState => {
      const updatedNodes = prevState.nodes.map(node =>
        node.elementId === edit.elementId
          ? { ...node, labels: edit.labels }
          : node
      )

      if (prevState.pendingNodeCreates[edit.elementId]) {
        const updatedCreate = prevState.pendingNodeCreates[edit.elementId]
        const nextLabelEdits = { ...prevState.pendingNodeLabelEdits }
        delete nextLabelEdits[edit.elementId]

        return {
          nodes: updatedNodes,
          pendingNodeCreates: {
            ...prevState.pendingNodeCreates,
            [edit.elementId]: {
              ...updatedCreate,
              labels: edit.labels
            }
          },
          pendingNodeLabelEdits: nextLabelEdits,
          saveError: null
        }
      }

      const existingPendingEdit =
        prevState.pendingNodeLabelEdits[edit.elementId]
      const originalLabels = existingPendingEdit
        ? existingPendingEdit.originalLabels
        : edit.originalLabels

      // If labels are back to original, remove the pending edit
      const isBackToOriginal =
        originalLabels.length === edit.labels.length &&
        originalLabels.every((label, i) => label === edit.labels[i])

      const nextLabelEdits = { ...prevState.pendingNodeLabelEdits }
      if (isBackToOriginal) {
        delete nextLabelEdits[edit.elementId]
      } else {
        nextLabelEdits[edit.elementId] = {
          id: edit.id,
          elementId: edit.elementId,
          originalLabels,
          labels: edit.labels
        }
      }

      return {
        nodes: updatedNodes,
        pendingNodeCreates: prevState.pendingNodeCreates,
        pendingNodeLabelEdits: nextLabelEdits,
        saveError: null
      }
    })
  }

  sanitizeRelationshipType(type: string): string {
    const trimmedType = type.trim()
    return trimmedType.length ? trimmedType : 'RELATED_TO'
  }

  relationshipTypeCypherSegment(type: string): string {
    return '`' + this.sanitizeRelationshipType(type).replace(/`/g, '``') + '`'
  }

  normalizeNodeId(nodeId: unknown): string | null {
    if (typeof nodeId !== 'string' && typeof nodeId !== 'number') {
      return null
    }

    const normalizedNodeId = String(nodeId)
    return normalizedNodeId.length ? normalizedNodeId : null
  }

  createRelationshipFromNode(
    sourceNodeId: string,
    targetNodeId: string,
    type: string
  ): boolean {
    if (this.state.isSaving) {
      return false
    }

    const normalizedSourceNodeId = this.normalizeNodeId(sourceNodeId)
    const normalizedTargetNodeId = this.normalizeNodeId(targetNodeId)

    if (
      !normalizedSourceNodeId ||
      !normalizedTargetNodeId ||
      normalizedSourceNodeId === normalizedTargetNodeId
    ) {
      this.setState({
        saveError: this.t('editing.toast.selectTwoDifferentNodes')
      })
      this.showToast('error', this.t('editing.toast.selectTwoDifferentNodes'))
      return false
    }

    const sourceNode = this.state.nodes.find(
      node => String(node.id) === normalizedSourceNodeId
    )
    const targetNode = this.state.nodes.find(
      node => String(node.id) === normalizedTargetNodeId
    )

    const canRenderLocally = !!sourceNode && !!targetNode

    if (
      (sourceNode && this.state.pendingNodeCreates[sourceNode.elementId]) ||
      (targetNode && this.state.pendingNodeCreates[targetNode.elementId])
    ) {
      this.setState({
        saveError: this.t('editing.toast.saveNewNodesFirst')
      })
      this.showToast('error', this.t('editing.toast.saveNewNodesFirst'))
      return false
    }

    const temporaryRelationshipId = `temp-rel-${Date.now()}`
    const relationshipType = this.sanitizeRelationshipType(type)

    const newRelationship: BasicRelationship = {
      id: temporaryRelationshipId,
      elementId: temporaryRelationshipId,
      startNodeId: normalizedSourceNodeId,
      endNodeId: normalizedTargetNodeId,
      type: relationshipType,
      properties: {},
      propertyTypes: {}
    }

    this.setState(prevState => ({
      relationships: canRenderLocally
        ? [...prevState.relationships, newRelationship]
        : prevState.relationships,
      dataVersion: canRenderLocally
        ? prevState.dataVersion + 1
        : prevState.dataVersion,
      pendingRelationshipCreates: {
        ...prevState.pendingRelationshipCreates,
        [newRelationship.elementId]: {
          ...newRelationship
        }
      },
      selectedRelationship: canRenderLocally
        ? {
            id: newRelationship.id,
            elementId: newRelationship.elementId
          }
        : prevState.selectedRelationship,
      selectedNode: null,
      saveError: null
    }))

    return true
  }

  deleteRelationship(relationshipElementId: string): void {
    if (this.state.isSaving) {
      return
    }

    const relationship = this.state.relationships.find(
      rel => rel.elementId === relationshipElementId
    )

    if (!relationship) {
      return
    }

    this.setState(prevState => {
      const nextPropertyEdits = { ...prevState.pendingPropertyEdits }
      delete nextPropertyEdits[`relationship:${relationshipElementId}`]

      const nextRelationshipCreates = {
        ...prevState.pendingRelationshipCreates
      }
      const isTemporary = !!nextRelationshipCreates[relationshipElementId]
      delete nextRelationshipCreates[relationshipElementId]

      const nextRelationshipDeletes = {
        ...prevState.pendingRelationshipDeletes
      }
      if (!isTemporary) {
        nextRelationshipDeletes[relationshipElementId] = {
          id: relationship.id,
          elementId: relationship.elementId
        }
      }

      const nextRelationshipRewires = {
        ...prevState.pendingRelationshipRewires
      }
      delete nextRelationshipRewires[relationshipElementId]

      return {
        relationships: prevState.relationships.filter(
          rel => rel.elementId !== relationshipElementId
        ),
        dataVersion: prevState.dataVersion + 1,
        pendingPropertyEdits: nextPropertyEdits,
        pendingRelationshipCreates: nextRelationshipCreates,
        pendingRelationshipDeletes: nextRelationshipDeletes,
        pendingRelationshipRewires: nextRelationshipRewires,
        selectedRelationship:
          prevState.selectedRelationship?.elementId === relationshipElementId
            ? null
            : prevState.selectedRelationship,
        saveError: null
      }
    })
  }

  getNodeScreenCenter(
    nodeId: string
  ): { x: number; y: number; radius: number } | null {
    const container = this.containerRef.current
    if (!container) {
      return null
    }

    const nodeElement = container.querySelector(
      `[aria-label="graph-node${nodeId}"]`
    )
    if (!(nodeElement instanceof SVGGraphicsElement)) {
      return null
    }

    const nodeRect = nodeElement.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    return {
      x: nodeRect.left - containerRect.left + nodeRect.width / 2,
      y: nodeRect.top - containerRect.top + nodeRect.height / 2,
      radius: nodeRect.width / 2
    }
  }

  onCanvasMouseMove(event: React.MouseEvent<HTMLDivElement>): void {
    const container = this.containerRef.current
    if (!container) {
      return
    }

    const containerRect = container.getBoundingClientRect()
    const mouseX = event.clientX - containerRect.left
    const mouseY = event.clientY - containerRect.top

    // Edge creation mode: line from source node to mouse
    const sourceNodeId = this.state.relationshipCreationSourceNodeId
    if (sourceNodeId) {
      const sourceCenter = this.getNodeScreenCenter(sourceNodeId)
      if (sourceCenter) {
        this.setState({
          relationshipCreationPreview: {
            sourceX: sourceCenter.x,
            sourceY: sourceCenter.y,
            targetX: mouseX,
            targetY: mouseY,
            sourceRadius: sourceCenter.radius,
            targetRadius: 0
          }
        })
      }
      return
    }

    // Edge reconnect mode: line from fixed endpoint to mouse
    const reconnectRequest = this.state.relationshipReconnectRequest
    if (reconnectRequest) {
      const relationship = this.state.relationships.find(
        rel => rel.elementId === reconnectRequest.relationshipElementId
      )
      if (relationship) {
        // The fixed endpoint is the one NOT being reconnected
        const fixedNodeId =
          reconnectRequest.endpoint === 'source'
            ? relationship.endNodeId
            : relationship.startNodeId
        const fixedCenter = this.getNodeScreenCenter(String(fixedNodeId))
        if (fixedCenter) {
          // When reconnecting source: mouse is new source, fixed is target (arrow stays at fixed end)
          // When reconnecting target: fixed is source, mouse is new target (arrow follows mouse)
          const isReconnectingSource = reconnectRequest.endpoint === 'source'
          this.setState({
            relationshipCreationPreview: {
              sourceX: isReconnectingSource ? mouseX : fixedCenter.x,
              sourceY: isReconnectingSource ? mouseY : fixedCenter.y,
              targetX: isReconnectingSource ? fixedCenter.x : mouseX,
              targetY: isReconnectingSource ? fixedCenter.y : mouseY,
              sourceRadius: isReconnectingSource ? 0 : fixedCenter.radius,
              targetRadius: isReconnectingSource ? fixedCenter.radius : 0
            }
          })
        }
      }
      return
    }

    if (this.state.relationshipCreationPreview) {
      this.setState({ relationshipCreationPreview: null })
    }
  }

  reconnectRelationship(
    relationshipElementId: string,
    startNodeId: string,
    endNodeId: string
  ): void {
    if (this.state.isSaving) {
      return
    }

    const normalizedStartNodeId = this.normalizeNodeId(startNodeId)
    const normalizedEndNodeId = this.normalizeNodeId(endNodeId)

    if (
      !normalizedStartNodeId ||
      !normalizedEndNodeId ||
      normalizedStartNodeId === normalizedEndNodeId
    ) {
      this.setState({
        saveError: this.t('editing.toast.selectTwoDifferentNodes')
      })
      return
    }

    const relationship = this.state.relationships.find(
      rel => rel.elementId === relationshipElementId
    )

    if (!relationship) {
      return
    }

    this.setState(prevState => {
      const nextRelationships = prevState.relationships.map(rel =>
        rel.elementId === relationshipElementId
          ? {
              ...rel,
              startNodeId: normalizedStartNodeId,
              endNodeId: normalizedEndNodeId
            }
          : rel
      )

      const nextPropertyEdits = { ...prevState.pendingPropertyEdits }
      delete nextPropertyEdits[`relationship:${relationshipElementId}`]

      const nextRelationshipCreates = {
        ...prevState.pendingRelationshipCreates
      }
      if (nextRelationshipCreates[relationshipElementId]) {
        nextRelationshipCreates[relationshipElementId] = {
          ...nextRelationshipCreates[relationshipElementId],
          startNodeId: normalizedStartNodeId,
          endNodeId: normalizedEndNodeId
        }

        const nextRelationshipRewires = {
          ...prevState.pendingRelationshipRewires
        }
        delete nextRelationshipRewires[relationshipElementId]

        return {
          relationships: nextRelationships,
          dataVersion: prevState.dataVersion + 1,
          pendingPropertyEdits: nextPropertyEdits,
          pendingRelationshipCreates: nextRelationshipCreates,
          pendingRelationshipRewires: nextRelationshipRewires,
          saveError: null
        }
      }

      const existingRewire =
        prevState.pendingRelationshipRewires[relationshipElementId]

      const originalStartNodeId = existingRewire
        ? existingRewire.originalStartNodeId
        : relationship.startNodeId
      const originalEndNodeId = existingRewire
        ? existingRewire.originalEndNodeId
        : relationship.endNodeId
      const originalType = existingRewire
        ? existingRewire.originalType
        : relationship.type
      const currentType = existingRewire
        ? existingRewire.type
        : relationship.type

      // If reconnecting back to original endpoints with no type change, remove the rewire
      const isBackToOriginal =
        normalizedStartNodeId === originalStartNodeId &&
        normalizedEndNodeId === originalEndNodeId &&
        currentType === originalType

      const nextRelationshipRewires = {
        ...prevState.pendingRelationshipRewires
      }
      if (isBackToOriginal) {
        delete nextRelationshipRewires[relationshipElementId]
      } else {
        nextRelationshipRewires[relationshipElementId] = {
          id: relationship.id,
          elementId: relationship.elementId,
          originalStartNodeId,
          originalEndNodeId,
          startNodeId: normalizedStartNodeId,
          endNodeId: normalizedEndNodeId,
          originalType,
          type: currentType
        }
      }

      return {
        relationships: nextRelationships,
        dataVersion: prevState.dataVersion + 1,
        pendingPropertyEdits: nextPropertyEdits,
        pendingRelationshipCreates: nextRelationshipCreates,
        pendingRelationshipRewires: nextRelationshipRewires,
        saveError: null
      }
    })
  }

  reverseRelationship(relationshipElementId: string): void {
    const relationship = this.state.relationships.find(
      rel => rel.elementId === relationshipElementId
    )

    if (!relationship) {
      return
    }

    this.reconnectRelationship(
      relationshipElementId,
      relationship.endNodeId,
      relationship.startNodeId
    )
  }

  changeRelationshipType(relationshipElementId: string, newType: string): void {
    if (this.state.isSaving) {
      return
    }

    const sanitizedType = newType.trim() || 'RELATED_TO'
    const relationship = this.state.relationships.find(
      rel => rel.elementId === relationshipElementId
    )

    if (!relationship) {
      return
    }

    this.setState(prevState => {
      const nextRelationships = prevState.relationships.map(rel =>
        rel.elementId === relationshipElementId
          ? { ...rel, type: sanitizedType }
          : rel
      )

      if (prevState.pendingRelationshipCreates[relationshipElementId]) {
        return {
          relationships: nextRelationships,
          dataVersion: prevState.dataVersion + 1,
          pendingRelationshipCreates: {
            ...prevState.pendingRelationshipCreates,
            [relationshipElementId]: {
              ...prevState.pendingRelationshipCreates[relationshipElementId],
              type: sanitizedType
            }
          },
          pendingRelationshipRewires: prevState.pendingRelationshipRewires,
          saveError: null
        }
      }

      const existingRewire =
        prevState.pendingRelationshipRewires[relationshipElementId]

      const originalStartNodeId = existingRewire
        ? existingRewire.originalStartNodeId
        : relationship.startNodeId
      const originalEndNodeId = existingRewire
        ? existingRewire.originalEndNodeId
        : relationship.endNodeId
      const currentStartNodeId = existingRewire
        ? existingRewire.startNodeId
        : relationship.startNodeId
      const currentEndNodeId = existingRewire
        ? existingRewire.endNodeId
        : relationship.endNodeId
      const originalType = existingRewire
        ? existingRewire.originalType
        : relationship.type

      // If type and endpoints are back to original, remove the rewire
      const isBackToOriginal =
        sanitizedType === originalType &&
        currentStartNodeId === originalStartNodeId &&
        currentEndNodeId === originalEndNodeId

      const nextRelationshipRewires = {
        ...prevState.pendingRelationshipRewires
      }
      if (isBackToOriginal) {
        delete nextRelationshipRewires[relationshipElementId]
      } else {
        nextRelationshipRewires[relationshipElementId] = {
          id: relationship.id,
          elementId: relationship.elementId,
          originalStartNodeId,
          originalEndNodeId,
          startNodeId: currentStartNodeId,
          endNodeId: currentEndNodeId,
          originalType,
          type: sanitizedType
        }
      }

      return {
        relationships: nextRelationships,
        dataVersion: prevState.dataVersion + 1,
        pendingRelationshipCreates: prevState.pendingRelationshipCreates,
        pendingRelationshipRewires: nextRelationshipRewires,
        saveError: null
      }
    })
  }

  onSelectionChange(selection: GraphSelectionEvent): void {
    if (selection.itemType !== 'node') {
      // Canvas click while in edge creation/reconnect mode → cancel the mode
      const isCanvasClick = selection.itemType === 'canvas'
      // Skip the canvas deselect event that fires right after menu activation
      if (isCanvasClick && this._ignoreNextCanvasClick) {
        this._ignoreNextCanvasClick = false
        return
      }
      const inInteractionMode =
        !!this.state.relationshipReconnectRequest ||
        !!this.state.relationshipCreationSourceNodeId
      this.setState({
        selectedNode: null,
        selectedRelationship:
          selection.itemType === 'relationship' && 'elementId' in selection
            ? {
                id: selection.id,
                elementId: selection.elementId
              }
            : null,
        // Cancel interaction mode on canvas click, preserve on other events (e.g. relationship hover)
        relationshipReconnectRequest:
          isCanvasClick || !inInteractionMode
            ? null
            : this.state.relationshipReconnectRequest,
        relationshipCreationSourceNodeId:
          isCanvasClick || !inInteractionMode
            ? null
            : this.state.relationshipCreationSourceNodeId,
        relationshipCreationPreview: isCanvasClick
          ? null
          : this.state.relationshipCreationPreview
      })
      return
    }

    if (
      this.state.relationshipCreationSourceNodeId &&
      this.state.relationshipCreationSourceNodeId !== String(selection.id)
    ) {
      const created = this.createRelationshipFromNode(
        this.state.relationshipCreationSourceNodeId,
        String(selection.id),
        'RELATED_TO'
      )
      if (created) {
        this.setState({
          relationshipCreationSourceNodeId: null,
          relationshipCreationPreview: null
        })
      }
      return
    }

    if (this.state.relationshipReconnectRequest) {
      const request = this.state.relationshipReconnectRequest
      const relationship = this.state.relationships.find(
        rel => rel.elementId === request.relationshipElementId
      )

      if (relationship) {
        const startNodeId =
          request.endpoint === 'source'
            ? String(selection.id)
            : relationship.startNodeId
        const endNodeId =
          request.endpoint === 'target'
            ? String(selection.id)
            : relationship.endNodeId
        this.reconnectRelationship(
          request.relationshipElementId,
          startNodeId,
          endNodeId
        )
      }

      this.setState({
        relationshipReconnectRequest: null,
        relationshipCreationPreview: null
      })
      return
    }

    this.setState({
      selectedNode: {
        id: selection.id,
        elementId: selection.elementId
      },
      selectedRelationship: null
    })
  }

  handleGraphInteraction(
    event: GraphInteractionEvent,
    properties?: Record<string, unknown>
  ): void {
    if (event === 'NODE_RELATIONSHIP_CREATE_ACTIVATED') {
      const nodeId = properties?.nodeId
      const normalizedNodeId = this.normalizeNodeId(nodeId)
      if (normalizedNodeId) {
        // The menu click also triggers a canvas deselect event;
        // ignore it so the mode isn't immediately canceled.
        this._ignoreNextCanvasClick = true
        this.setState({
          relationshipCreationSourceNodeId: normalizedNodeId,
          relationshipCreationPreview: null,
          relationshipReconnectRequest: null,
          selectedRelationship: null,
          saveError: null
        })
        this.showToast('success', this.t('editing.toast.relModeEnabled'))
      }
      return
    }

    if (event === 'RELATIONSHIP_ENDPOINT_RECONNECT_REQUESTED') {
      const relationshipElementId = properties?.relationshipElementId
      const endpoint = properties?.endpoint
      if (
        typeof relationshipElementId === 'string' &&
        (endpoint === 'source' || endpoint === 'target')
      ) {
        this.setState({
          relationshipCreationSourceNodeId: null,
          relationshipCreationPreview: null,
          relationshipReconnectRequest: {
            relationshipElementId,
            endpoint
          },
          saveError: null
        })
        this.showToast(
          'success',
          endpoint === 'source'
            ? this.t('editing.toast.reconnectSource')
            : this.t('editing.toast.reconnectTarget')
        )
      }
      return
    }

    if (event !== 'NODE_DISMISSED') {
      return
    }

    const elementId = properties?.elementId
    const nodeId = properties?.nodeId

    if (typeof elementId !== 'string' || typeof nodeId !== 'string') {
      return
    }

    const targetNode = this.state.nodes.find(
      node => node.elementId === elementId || node.id === nodeId
    )

    if (!targetNode) {
      return
    }

    this.setState(prevState => {
      const isTemporary = !!prevState.pendingNodeCreates[targetNode.elementId]
      const nextPropertyEdits = { ...prevState.pendingPropertyEdits }
      delete nextPropertyEdits[`node:${targetNode.elementId}`]

      const relatedRelationshipElementIds = prevState.relationships
        .filter(
          relationship =>
            relationship.startNodeId === targetNode.id ||
            relationship.endNodeId === targetNode.id
        )
        .map(relationship => relationship.elementId)

      relatedRelationshipElementIds.forEach(relationshipElementId => {
        delete nextPropertyEdits[`relationship:${relationshipElementId}`]
      })

      const nextNodeCreates = { ...prevState.pendingNodeCreates }
      delete nextNodeCreates[targetNode.elementId]

      const nextNodeDeletes = { ...prevState.pendingNodeDeletes }
      if (!isTemporary) {
        nextNodeDeletes[targetNode.elementId] = {
          id: targetNode.id,
          elementId: targetNode.elementId
        }
      }

      const nextNodeLabelEdits = { ...prevState.pendingNodeLabelEdits }
      delete nextNodeLabelEdits[targetNode.elementId]

      const relatedRelationshipElementIdsSet = new Set(
        relatedRelationshipElementIds
      )

      const nextRelationshipCreates = Object.fromEntries(
        Object.entries(prevState.pendingRelationshipCreates).filter(
          ([elementId]) => !relatedRelationshipElementIdsSet.has(elementId)
        )
      ) as Record<string, PendingRelationshipCreate>

      const nextRelationshipDeletes = Object.fromEntries(
        Object.entries(prevState.pendingRelationshipDeletes).filter(
          ([elementId]) => !relatedRelationshipElementIdsSet.has(elementId)
        )
      ) as Record<string, PendingRelationshipDelete>

      const nextRelationshipRewires = Object.fromEntries(
        Object.entries(prevState.pendingRelationshipRewires).filter(
          ([elementId]) => !relatedRelationshipElementIdsSet.has(elementId)
        )
      ) as Record<string, PendingRelationshipRewire>

      return {
        nodes: prevState.nodes.filter(
          node => node.elementId !== targetNode.elementId
        ),
        relationships: prevState.relationships.filter(
          relationship =>
            relationship.startNodeId !== targetNode.id &&
            relationship.endNodeId !== targetNode.id
        ),
        dataVersion: prevState.dataVersion + 1,
        pendingPropertyEdits: nextPropertyEdits,
        pendingNodeCreates: nextNodeCreates,
        pendingNodeDeletes: nextNodeDeletes,
        pendingNodeLabelEdits: nextNodeLabelEdits,
        pendingRelationshipCreates: nextRelationshipCreates,
        pendingRelationshipDeletes: nextRelationshipDeletes,
        pendingRelationshipRewires: nextRelationshipRewires,
        relationshipCreationSourceNodeId: null,
        relationshipCreationPreview: null,
        relationshipReconnectRequest: null,
        selectedNode: null,
        selectedRelationship: null,
        saveError: null
      }
    })
  }

  addNode(): void {
    if (this.state.isSaving) {
      return
    }

    const temporaryId = `temp-node-${Date.now()}`
    const newNode: BasicNode = {
      id: temporaryId,
      elementId: temporaryId,
      labels: ['Node'],
      properties: {},
      propertyTypes: {}
    }

    this.setState(prevState => ({
      nodes: [...prevState.nodes, newNode],
      dataVersion: prevState.dataVersion + 1,
      pendingNodeCreates: {
        ...prevState.pendingNodeCreates,
        [newNode.elementId]: {
          id: newNode.id,
          elementId: newNode.elementId,
          labels: newNode.labels,
          properties: newNode.properties,
          propertyTypes: newNode.propertyTypes
        }
      },
      selectedNode: { id: newNode.id, elementId: newNode.elementId },
      saveError: null
    }))
  }

  onCanvasContextMenu(event: React.MouseEvent<HTMLDivElement>): void {
    const target = event.target
    if (!(target instanceof Element)) {
      return
    }

    const isOverCanvas = !!target.closest('#svg-vis')
    const isOverNode = !!target.closest('.node')
    const isOverRelationship = !!target.closest('.relationship')
    const isOverContextItem = !!target.closest('.context-menu-item')

    // Always prevent default context menu inside the canvas area
    if (isOverCanvas) {
      event.preventDefault()
    }

    if (
      !isOverCanvas ||
      isOverNode ||
      isOverRelationship ||
      isOverContextItem
    ) {
      return
    }

    this.addNode()
  }

  deleteSelectedNode(): void {
    const selectedNode = this.state.selectedNode
    if (!selectedNode || this.state.isSaving) {
      return
    }

    const targetNode = this.state.nodes.find(
      node => node.elementId === selectedNode.elementId
    )

    if (!targetNode) {
      return
    }

    const isTemporary = !!this.state.pendingNodeCreates[targetNode.elementId]
    const relatedRelationshipElementIds = this.state.relationships
      .filter(
        relationship =>
          relationship.startNodeId === targetNode.id ||
          relationship.endNodeId === targetNode.id
      )
      .map(relationship => relationship.elementId)

    this.setState(prevState => {
      const nextPropertyEdits = { ...prevState.pendingPropertyEdits }
      delete nextPropertyEdits[`node:${targetNode.elementId}`]
      relatedRelationshipElementIds.forEach(relationshipElementId => {
        delete nextPropertyEdits[`relationship:${relationshipElementId}`]
      })

      const nextNodeCreates = { ...prevState.pendingNodeCreates }
      delete nextNodeCreates[targetNode.elementId]

      const nextNodeDeletes = { ...prevState.pendingNodeDeletes }
      if (!isTemporary) {
        nextNodeDeletes[targetNode.elementId] = {
          id: targetNode.id,
          elementId: targetNode.elementId
        }
      }

      const nextNodeLabelEdits = { ...prevState.pendingNodeLabelEdits }
      delete nextNodeLabelEdits[targetNode.elementId]

      const relatedRelationshipElementIdsSet = new Set(
        relatedRelationshipElementIds
      )

      const nextRelationshipCreates = Object.fromEntries(
        Object.entries(prevState.pendingRelationshipCreates).filter(
          ([elementId]) => !relatedRelationshipElementIdsSet.has(elementId)
        )
      ) as Record<string, PendingRelationshipCreate>

      const nextRelationshipDeletes = Object.fromEntries(
        Object.entries(prevState.pendingRelationshipDeletes).filter(
          ([elementId]) => !relatedRelationshipElementIdsSet.has(elementId)
        )
      ) as Record<string, PendingRelationshipDelete>

      const nextRelationshipRewires = Object.fromEntries(
        Object.entries(prevState.pendingRelationshipRewires).filter(
          ([elementId]) => !relatedRelationshipElementIdsSet.has(elementId)
        )
      ) as Record<string, PendingRelationshipRewire>

      return {
        nodes: prevState.nodes.filter(
          node => node.elementId !== targetNode.elementId
        ),
        relationships: prevState.relationships.filter(
          relationship =>
            relationship.startNodeId !== targetNode.id &&
            relationship.endNodeId !== targetNode.id
        ),
        dataVersion: prevState.dataVersion + 1,
        pendingPropertyEdits: nextPropertyEdits,
        pendingNodeCreates: nextNodeCreates,
        pendingNodeDeletes: nextNodeDeletes,
        pendingNodeLabelEdits: nextNodeLabelEdits,
        pendingRelationshipCreates: nextRelationshipCreates,
        pendingRelationshipDeletes: nextRelationshipDeletes,
        pendingRelationshipRewires: nextRelationshipRewires,
        relationshipCreationSourceNodeId: null,
        relationshipCreationPreview: null,
        relationshipReconnectRequest: null,
        selectedNode: null,
        selectedRelationship: null,
        saveError: null
      }
    })
  }

  sanitizeLabels(labels: string[]): string[] {
    const seenLabels = new Set<string>()
    return labels.reduce((acc, label) => {
      const normalizedLabel = label.trim()
      if (!normalizedLabel || seenLabels.has(normalizedLabel)) {
        return acc
      }
      seenLabels.add(normalizedLabel)
      return [...acc, normalizedLabel]
    }, [] as string[])
  }

  labelsCypherSegment(labels: string[]): string {
    return this.sanitizeLabels(labels)
      .map(label => ':`' + label.replace(/`/g, '``') + '`')
      .join('')
  }

  buildUpdateNodeLabelsQuery(
    originalLabels: string[],
    nextLabels: string[]
  ): string | null {
    const removeLabels = this.labelsCypherSegment(originalLabels)
    const setLabels = this.labelsCypherSegment(nextLabels)

    if (!removeLabels && !setLabels) {
      return null
    }

    const removeClause = removeLabels ? ` REMOVE n${removeLabels}` : ''
    const setClause = setLabels ? ` SET n${setLabels}` : ''
    return `MATCH (n) WHERE elementId(n) = $elementId${removeClause}${setClause} RETURN elementId(n)`
  }

  buildCreateNodeQuery(labels: string[]): string {
    const sanitizedLabels = labels
      .filter(label => label.trim().length > 0)
      .map(label => `\`${label.replace(/`/g, '``')}\``)
      .join(':')

    return `CREATE (n${sanitizedLabels ? `:${sanitizedLabels}` : ''}) SET n = $properties RETURN elementId(n)`
  }

  buildCreateRelationshipQuery(type: string): string {
    const relationshipType = this.relationshipTypeCypherSegment(type)
    return `MATCH (s), (t) WHERE id(s) = toInteger($startNodeId) AND id(t) = toInteger($endNodeId) CREATE (s)-[r:${relationshipType}]->(t) SET r = $properties RETURN elementId(r)`
  }

  buildRewireRelationshipQuery(type: string): string {
    const relationshipType = this.relationshipTypeCypherSegment(type)
    return `MATCH ()-[r]->() WHERE elementId(r) = $elementId WITH properties(r) AS props MATCH (s), (t) WHERE id(s) = toInteger($startNodeId) AND id(t) = toInteger($endNodeId) DELETE r CREATE (s)-[nr:${relationshipType}]->(t) SET nr = props RETURN elementId(nr)`
  }

  runWriteQuery(query: string, params: Record<string, any>): Promise<void> {
    return new Promise((resolve, reject) => {
      this.props.bus &&
        this.props.bus.self(
          ROUTED_CYPHER_WRITE_REQUEST,
          {
            query,
            params,
            queryType: NEO4J_BROWSER_USER_ACTION_QUERY,
            useDb: this.props.result.summary.database.name
          },
          (response: any) => {
            if (!response.success) {
              reject(response.error)
              return
            }
            resolve()
          }
        )
    })
  }

  async savePropertyEdits(): Promise<void> {
    const propertyEdits = Object.values(this.state.pendingPropertyEdits).filter(
      edit => !this.state.pendingNodeDeletes[edit.elementId]
    )
    const nodeCreates = Object.values(this.state.pendingNodeCreates)
    const nodeDeletes = Object.values(this.state.pendingNodeDeletes)
    const nodeLabelEdits = Object.values(this.state.pendingNodeLabelEdits)
      .filter(edit => !this.state.pendingNodeDeletes[edit.elementId])
      .filter(edit => !this.state.pendingNodeCreates[edit.elementId])
    const relationshipCreates = Object.values(
      this.state.pendingRelationshipCreates
    ).filter(
      relationshipCreate =>
        !this.state.pendingNodeDeletes[
          this.state.nodes.find(
            node => node.id === relationshipCreate.startNodeId
          )?.elementId || ''
        ] &&
        !this.state.pendingNodeDeletes[
          this.state.nodes.find(
            node => node.id === relationshipCreate.endNodeId
          )?.elementId || ''
        ]
    )
    const relationshipDeletes = Object.values(
      this.state.pendingRelationshipDeletes
    ).filter(
      relationshipDelete =>
        !this.state.pendingRelationshipCreates[relationshipDelete.elementId]
    )
    const relationshipRewires = Object.values(
      this.state.pendingRelationshipRewires
    )
      .filter(
        relationshipRewire =>
          !this.state.pendingRelationshipDeletes[relationshipRewire.elementId]
      )
      .filter(
        relationshipRewire =>
          !this.state.pendingRelationshipCreates[relationshipRewire.elementId]
      )

    if (
      (!propertyEdits.length &&
        !nodeCreates.length &&
        !nodeDeletes.length &&
        !nodeLabelEdits.length &&
        !relationshipCreates.length &&
        !relationshipDeletes.length &&
        !relationshipRewires.length) ||
      this.state.isSaving
    ) {
      return
    }

    this.setState({ isSaving: true, saveError: null })

    try {
      await Promise.all(
        nodeCreates.map(nodeCreate =>
          this.runWriteQuery(this.buildCreateNodeQuery(nodeCreate.labels), {
            properties: nodeCreate.properties
          })
        )
      )

      await Promise.all(
        nodeDeletes.map(nodeDelete =>
          this.runWriteQuery(
            'MATCH (n) WHERE elementId(n) = $elementId DETACH DELETE n',
            {
              elementId: nodeDelete.elementId
            }
          )
        )
      )

      await Promise.all(
        nodeLabelEdits.map(nodeLabelEdit => {
          const query = this.buildUpdateNodeLabelsQuery(
            nodeLabelEdit.originalLabels,
            nodeLabelEdit.labels
          )

          if (!query) {
            return Promise.resolve()
          }

          return this.runWriteQuery(query, {
            elementId: nodeLabelEdit.elementId
          })
        })
      )

      await Promise.all(
        relationshipCreates.map(relationshipCreate =>
          this.runWriteQuery(
            this.buildCreateRelationshipQuery(relationshipCreate.type),
            {
              startNodeId: relationshipCreate.startNodeId,
              endNodeId: relationshipCreate.endNodeId,
              properties: relationshipCreate.properties
            }
          )
        )
      )

      await Promise.all(
        relationshipDeletes.map(relationshipDelete =>
          this.runWriteQuery(
            'MATCH ()-[r]->() WHERE elementId(r) = $elementId DELETE r',
            {
              elementId: relationshipDelete.elementId
            }
          )
        )
      )

      await Promise.all(
        relationshipRewires.map(relationshipRewire =>
          this.runWriteQuery(
            this.buildRewireRelationshipQuery(relationshipRewire.type),
            {
              elementId: relationshipRewire.elementId,
              startNodeId: relationshipRewire.startNodeId,
              endNodeId: relationshipRewire.endNodeId
            }
          )
        )
      )

      await Promise.all(
        propertyEdits.map(edit => {
          const properties = edit.propertyList.reduce(
            (acc, property) => ({ ...acc, [property.key]: property.value }),
            {} as Record<string, string>
          )

          if (edit.itemType === 'node') {
            return this.runWriteQuery(
              'MATCH (n) WHERE elementId(n) = $elementId SET n = $properties RETURN elementId(n)',
              {
                elementId: edit.elementId,
                properties
              }
            )
          }

          return this.runWriteQuery(
            'MATCH ()-[r]->() WHERE elementId(r) = $elementId SET r = $properties RETURN elementId(r)',
            {
              elementId: edit.elementId,
              properties
            }
          )
        })
      )

      // Clear pending state but keep current graph as-is.
      // Re-running the original query would discard expanded nodes and
      // any edges/nodes that are visible only because of expansion.
      this.setState({
        pendingPropertyEdits: {},
        pendingNodeCreates: {},
        pendingNodeDeletes: {},
        pendingNodeLabelEdits: {},
        pendingRelationshipCreates: {},
        pendingRelationshipDeletes: {},
        pendingRelationshipRewires: {},
        isSaving: false,
        saveError: null
      })
      this.showToast('success', this.t('editing.toast.saved'))
    } catch (error: any) {
      this.setState({
        isSaving: false,
        saveError: error?.message || this.t('editing.toast.saveFailed')
      })
      this.showToast(
        'error',
        error?.message || this.t('editing.toast.saveFailed')
      )
    }
  }

  cancelPropertyEdits(): void {
    this.populateDataToStateFromProps(this.props)
  }

  autoCompleteRelationships(
    existingNodes: { id: string }[],
    newNodes: { id: string }[],
    initialRun: boolean
  ): void {
    if (this.props.autoComplete) {
      const existingNodeIds = existingNodes.map(node => parseInt(node.id))
      const newNodeIds = newNodes.map(node => parseInt(node.id))

      this.getInternalRelationships(existingNodeIds, newNodeIds).then(graph => {
        // Filter out relationships that are pending deletion
        const deletedIds = new Set(
          Object.keys(this.state.pendingRelationshipDeletes)
        )
        const filteredRels = graph.relationships.filter(
          r => !deletedIds.has(r.elementId)
        )

        this.autoCompleteCallback &&
          this.autoCompleteCallback(filteredRels, initialRun)

        // Sync autocompleted relationships into component state
        // so that edge reconnection and other operations can find them
        if (filteredRels.length > 0) {
          this.setState(prevState => {
            const existingRelIds = new Set(
              prevState.relationships.map(r => r.elementId)
            )
            const newRels = filteredRels.filter(
              r => !existingRelIds.has(r.elementId)
            )
            if (newRels.length === 0) return null
            return {
              relationships: [...prevState.relationships, ...newRels]
            }
          })
        }
      })
    } else {
      this.autoCompleteCallback && this.autoCompleteCallback([], initialRun)
    }
  }

  getNeighbours(
    id: string,
    currentNeighbourIds: string[] = []
  ): Promise<BasicNodesAndRels & { allNeighboursCount: number }> {
    const maxNewNeighbours =
      this.props.maxNeighbours - currentNeighbourIds.length

    const query =
      maxNewNeighbours > 0
        ? `MATCH (a) WHERE id(a) = ${id}
WITH a, size([(a)--() | 1]) AS allNeighboursCount
MATCH path = (a)--(o) WHERE NOT id(o) IN [${currentNeighbourIds.join(',')}]
RETURN path, allNeighboursCount
ORDER BY id(o)
LIMIT ${maxNewNeighbours}`
        : `MATCH p=(a)--() WHERE id(a) = ${id} RETURN count(p) as allNeighboursCount`

    return new Promise((resolve, reject) => {
      this.props.bus &&
        this.props.bus.self(
          ROUTED_CYPHER_READ_REQUEST,
          {
            query: query,
            queryType: NEO4J_BROWSER_USER_ACTION_QUERY,
            useDb: this.props.result.summary.database.name
          },
          (response: any) => {
            if (!response.success) {
              reject(new Error())
            } else {
              const allNeighboursCount =
                response.result.records.length > 0
                  ? parseInt(
                      response.result.records[0]
                        .get('allNeighboursCount')
                        .toString()
                    )
                  : 0
              const resultGraph =
                bolt.extractNodesAndRelationshipsFromRecordsForOldVis(
                  response.result.records,
                  false,
                  this.props.maxFieldItems
                )
              // Sync expanded nodes/relationships into component state
              // so that edge creation between expanded nodes works correctly
              this.setState(prevState => {
                const existingNodeIds = new Set(
                  prevState.nodes.map(n => String(n.id))
                )
                const existingRelIds = new Set(
                  prevState.relationships.map(r => r.elementId)
                )
                const newNodes = resultGraph.nodes.filter(
                  n => !existingNodeIds.has(String(n.id))
                )
                const newRels = resultGraph.relationships.filter(
                  r => !existingRelIds.has(r.elementId)
                )
                if (newNodes.length === 0 && newRels.length === 0) {
                  return null
                }
                return {
                  nodes: [...prevState.nodes, ...newNodes],
                  relationships: [...prevState.relationships, ...newRels]
                }
              })

              this.autoCompleteRelationships(
                this.graph?.nodes() || [],
                resultGraph.nodes,
                false
              )
              resolve({ ...resultGraph, allNeighboursCount })
            }
          }
        )
    })
  }

  getInternalRelationships(
    rawExistingNodeIds: number[],
    rawNewNodeIds: number[]
  ): Promise<BasicNodesAndRels> {
    const newNodeIds = rawNewNodeIds.map(n => neo4j.int(n))
    const existingNodeIds = rawExistingNodeIds
      .map(n => neo4j.int(n))
      .concat(newNodeIds)
    const query =
      'MATCH (a)-[r]->(b) WHERE id(a) IN $existingNodeIds AND id(b) IN $newNodeIds RETURN r;'
    return new Promise(resolve => {
      this.props.bus &&
        this.props.bus.self(
          ROUTED_CYPHER_READ_REQUEST,
          {
            query,
            params: { existingNodeIds, newNodeIds },
            queryType: NEO4J_BROWSER_USER_ACTION_QUERY,
            useDb: this.props.result.summary.database.name
          },
          (response: any) => {
            if (!response.success) {
              console.error(response.error)
              resolve({ nodes: [], relationships: [] })
            } else {
              resolve({
                ...bolt.extractNodesAndRelationshipsFromRecordsForOldVis(
                  response.result.records,
                  false,
                  this.props.maxFieldItems
                )
              })
            }
          }
        )
    })
  }

  setGraph(graph: GraphModel): void {
    this.graph = graph
    this.autoCompleteRelationships([], this.graph.nodes(), true)
  }

  renderChangesList(): React.ReactNode {
    const items: React.ReactNode[] = []

    Object.values(this.state.pendingNodeCreates).forEach(create => {
      items.push(
        <StyledChangeItem key={`create-node-${create.elementId}`} kind="create">
          <StyledChangeItemBadge kind="create">
            {this.t('editing.changes.create')}
          </StyledChangeItemBadge>
          {this.t('editing.changes.node')} [{create.labels.join(', ')}]
        </StyledChangeItem>
      )
    })

    Object.values(this.state.pendingNodeDeletes).forEach(del => {
      items.push(
        <StyledChangeItem key={`delete-node-${del.elementId}`} kind="delete">
          <StyledChangeItemBadge kind="delete">
            {this.t('editing.changes.delete')}
          </StyledChangeItemBadge>
          {this.t('editing.changes.node')} ({del.elementId})
        </StyledChangeItem>
      )
    })

    Object.values(this.state.pendingNodeLabelEdits).forEach(edit => {
      items.push(
        <StyledChangeItem key={`labels-${edit.elementId}`} kind="modify">
          <StyledChangeItemBadge kind="modify">
            {this.t('editing.changes.labels')}
          </StyledChangeItemBadge>
          [{edit.originalLabels.join(', ')}] → [{edit.labels.join(', ')}]
        </StyledChangeItem>
      )
    })

    Object.values(this.state.pendingRelationshipCreates).forEach(create => {
      items.push(
        <StyledChangeItem key={`create-rel-${create.elementId}`} kind="create">
          <StyledChangeItemBadge kind="create">
            {this.t('editing.changes.create')}
          </StyledChangeItemBadge>
          {this.t('editing.changes.rel')} [{create.type}] ({create.startNodeId}{' '}
          → {create.endNodeId})
        </StyledChangeItem>
      )
    })

    Object.values(this.state.pendingRelationshipDeletes).forEach(del => {
      items.push(
        <StyledChangeItem key={`delete-rel-${del.elementId}`} kind="delete">
          <StyledChangeItemBadge kind="delete">
            {this.t('editing.changes.delete')}
          </StyledChangeItemBadge>
          {this.t('editing.changes.rel')} ({del.elementId})
        </StyledChangeItem>
      )
    })

    Object.values(this.state.pendingRelationshipRewires).forEach(rewire => {
      const endpointsChanged =
        rewire.originalStartNodeId !== rewire.startNodeId ||
        rewire.originalEndNodeId !== rewire.endNodeId
      const typeChanged = rewire.originalType !== rewire.type

      if (typeChanged && !endpointsChanged) {
        items.push(
          <StyledChangeItem key={`rewire-${rewire.elementId}`} kind="modify">
            <StyledChangeItemBadge kind="modify">
              {this.t('editing.changes.type')}
            </StyledChangeItemBadge>
            {this.t('editing.changes.rel')} [{rewire.originalType}] → [
            {rewire.type}]
          </StyledChangeItem>
        )
      } else if (endpointsChanged && !typeChanged) {
        items.push(
          <StyledChangeItem key={`rewire-${rewire.elementId}`} kind="modify">
            <StyledChangeItemBadge kind="modify">
              {this.t('editing.changes.rewire')}
            </StyledChangeItemBadge>
            {this.t('editing.changes.rel')} [{rewire.type}] (
            {rewire.originalStartNodeId}→{rewire.originalEndNodeId}) → (
            {rewire.startNodeId}→{rewire.endNodeId})
          </StyledChangeItem>
        )
      } else {
        items.push(
          <StyledChangeItem key={`rewire-${rewire.elementId}`} kind="modify">
            <StyledChangeItemBadge kind="modify">
              {this.t('editing.changes.rewire')}
            </StyledChangeItemBadge>
            {this.t('editing.changes.rel')} [{rewire.originalType}→{rewire.type}
            ] ({rewire.originalStartNodeId}→{rewire.originalEndNodeId}) → (
            {rewire.startNodeId}→{rewire.endNodeId})
          </StyledChangeItem>
        )
      }
    })

    Object.values(this.state.pendingPropertyEdits).forEach(edit => {
      items.push(
        <StyledChangeItem
          key={`prop-${edit.itemType}-${edit.elementId}`}
          kind="modify"
        >
          <StyledChangeItemBadge kind="modify">
            {this.t('editing.changes.props')}
          </StyledChangeItemBadge>
          {edit.itemType === 'node'
            ? this.t('editing.changes.node')
            : this.t('editing.changes.rel')}{' '}
          ({edit.elementId})
        </StyledChangeItem>
      )
    })

    if (items.length === 0) {
      return (
        <StyledChangeItemEmpty>
          {this.t('editing.changes.noChanges')}
        </StyledChangeItemEmpty>
      )
    }

    return items
  }

  getNodePositions(): Record<string, { x: number; y: number }> {
    const positions: Record<string, { x: number; y: number }> = {}
    if (this.graph) {
      this.graph.nodes().forEach(node => {
        if (node.x !== undefined && node.y !== undefined) {
          positions[node.id] = { x: node.x, y: node.y }
        }
      })
    }
    return positions
  }

  batchDelete(items: VizItem[]): void {
    if (this.state.isSaving) {
      return
    }

    const nodeItems = items.filter(i => i.type === 'node')
    const relItems = items.filter(i => i.type === 'relationship')

    // Delete relationships first (including those connected to deleted nodes)
    relItems.forEach(relItem => {
      if (relItem.type === 'relationship') {
        this.deleteRelationship(relItem.item.elementId)
      }
    })

    // Then delete nodes via the existing NODE_DISMISSED handler
    nodeItems.forEach(nodeItem => {
      if (nodeItem.type === 'node') {
        this.handleGraphInteraction('NODE_DISMISSED', {
          nodeId: nodeItem.item.id,
          elementId: nodeItem.item.elementId,
          source: 'nodeDelete'
        })
      }
    })

    this.showToast(
      'success',
      `${nodeItems.length} ${this.t('editing.panel.multiSelect.nodes')}, ${relItems.length} ${this.t('editing.panel.multiSelect.relationships')} ${this.t('editing.toast.batchDeleted')}`
    )
  }

  render(): React.ReactNode {
    if (!this.state.nodes.length) return null

    const nodePositions = this.getNodePositions()

    const pendingCount = this.getPendingCount()

    return (
      <StyledVisContainer
        isFullscreen={this.props.isFullscreen}
        onContextMenu={this.onCanvasContextMenu.bind(this)}
        onMouseMove={this.onCanvasMouseMove.bind(this)}
        ref={this.containerRef}
      >
        {this.state.toast && (
          <StyledToastContainer>
            <StyledToast kind={this.state.toast.kind}>
              {this.state.toast.message}
            </StyledToast>
          </StyledToastContainer>
        )}
        <GraphVisualizer
          key={`graph-visualizer-${this.state.dataVersion}`}
          maxNeighbours={this.props.maxNeighbours}
          hasTruncatedFields={this.state.hasTruncatedFields}
          graphStyleData={this.props.graphStyleData}
          updateStyle={this.props.updateStyle}
          getNeighbours={this.getNeighbours.bind(this)}
          nodes={this.state.nodes}
          autocompleteRelationships={this.props.autoComplete ?? false}
          relationships={this.state.relationships}
          isFullscreen={this.props.isFullscreen}
          assignVisElement={this.props.assignVisElement}
          nodeLimitHit={this.state.nodeLimitHit}
          getAutoCompleteCallback={(
            callback: (rels: BasicRelationship[], initialRun: boolean) => void
          ) => {
            this.autoCompleteCallback = callback
          }}
          setGraph={this.setGraph.bind(this)}
          initialNodePositions={nodePositions}
          setNodePropertiesExpandedByDefault={
            this.props.setNodePropertiesExpandedByDefault
          }
          nodePropertiesExpandedByDefault={
            this.props.nodePropertiesExpandedByDefault
          }
          wheelZoomRequiresModKey={!this.props.isFullscreen}
          wheelZoomInfoMessageEnabled={
            this.props.wheelZoomInfoMessageEnabled && !this.props.isFullscreen
          }
          disableWheelZoomInfoMessage={this.props.disableWheelZoomInfoMessage}
          DetailsPaneOverride={DetailsPane}
          OverviewPaneOverride={OverviewPane}
          useGeneratedDefaultColors={false}
          initialZoomToFit
          onPropertyEdit={this.onPropertyEdit.bind(this)}
          onNodeLabelsEdit={this.onNodeLabelsEdit.bind(this)}
          onDeleteRelationship={this.deleteRelationship.bind(this)}
          onReverseRelationship={this.reverseRelationship.bind(this)}
          onRelationshipTypeChange={this.changeRelationshipType.bind(this)}
          onBatchDelete={this.batchDelete.bind(this)}
          onValidationWarning={(message: string) =>
            this.showToast('error', message)
          }
          t={this.t.bind(this) as any}
          onSelectionChange={this.onSelectionChange.bind(this)}
          onGraphInteraction={this.handleGraphInteraction.bind(this)}
          selectedNodeElementId={this.state.selectedNode?.elementId}
          selectedRelationshipElementId={
            this.state.selectedRelationship?.elementId
          }
        />
        {this.state.relationshipCreationPreview &&
          (() => {
            const p = this.state.relationshipCreationPreview
            const dx = p.targetX - p.sourceX
            const dy = p.targetY - p.sourceY
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 1) return null

            const ux = dx / dist
            const uy = dy / dist

            // Offset start/end points to node edge instead of center
            const x1 = p.sourceX + ux * p.sourceRadius
            const y1 = p.sourceY + uy * p.sourceRadius
            const x2 = p.targetX - ux * p.targetRadius
            const y2 = p.targetY - uy * p.targetRadius

            // Arrow dimensions matching neo4j-arc style
            const shaftWidth = 2
            const headWidth = 12
            const headLength = 10

            const lineDist = Math.sqrt(
              (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)
            )
            if (lineDist < headLength) return null

            // Build arrow path: shaft rectangle + triangle head
            const hw = shaftWidth / 2
            const shaftLen = lineDist - headLength
            const hh = headWidth / 2
            const pathD = [
              `M 0 ${-hw}`,
              `L ${shaftLen} ${-hw}`,
              `L ${shaftLen} ${-hh}`,
              `L ${lineDist} 0`,
              `L ${shaftLen} ${hh}`,
              `L ${shaftLen} ${hw}`,
              `L 0 ${hw}`,
              'Z'
            ].join(' ')

            const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI

            return (
              <svg
                width="100%"
                height="100%"
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  zIndex: 20
                }}
              >
                <path
                  d={pathD}
                  transform={`translate(${x1},${y1}) rotate(${angle})`}
                  fill="#A5ABB6"
                  opacity="0.6"
                  strokeDasharray="6 4"
                  stroke="#A5ABB6"
                  strokeWidth="0.5"
                />
              </svg>
            )
          })()}
        {this.props.showChangesPanel && (
          <StyledChangesOverlay>
            <StyledChangesPanel>
              <StyledChangesPanelHeader>
                {this.t('editing.changes.pendingChanges', {
                  count: String(pendingCount)
                })}
              </StyledChangesPanelHeader>
              <StyledChangesList>{this.renderChangesList()}</StyledChangesList>
              <StyledChangesPanelActions>
                <StyledEditActionButton
                  onClick={() => this.cancelPropertyEdits()}
                >
                  {this.t('editing.changes.cancel')}
                </StyledEditActionButton>
                <StyledEditActionButton
                  primary
                  onClick={() => this.savePropertyEdits()}
                  disabled={pendingCount === 0 || this.state.isSaving}
                >
                  {this.state.isSaving
                    ? this.t('editing.changes.saving')
                    : this.t('editing.changes.saveAll')}
                </StyledEditActionButton>
              </StyledChangesPanelActions>
            </StyledChangesPanel>
          </StyledChangesOverlay>
        )}
      </StyledVisContainer>
    )
  }

  componentWillUnmount(): void {
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout)
    }
  }
}

const mapStateToProps = (state: GlobalState) => ({
  graphStyleData: grassActions.getGraphStyleData(state),
  maxFieldItems: getMaxFieldItems(state),
  nodePropertiesExpandedByDefault: getNodePropertiesExpandedByDefault(state),
  wheelZoomInfoMessageEnabled: shouldShowWheelZoomInfo(state)
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  disableWheelZoomInfoMessage: () => {
    dispatch(updateSettings({ showWheelZoomInfo: false }))
  },
  setNodePropertiesExpandedByDefault: (expandedByDefault: boolean) =>
    dispatch(setNodePropertiesExpandedByDefault(expandedByDefault)),
  updateStyle: (graphStyleData: any) => {
    dispatch(grassActions.updateGraphStyleData(graphStyleData))
  }
})

export const VisualizationConnectedBus = withBus(
  connect(mapStateToProps, mapDispatchToProps)(Visualization)
)

type DeduplicateHelper = {
  nodes: BasicNode[]
  taken: Record<string, boolean>
  nodeLimitHit: boolean
}

const deduplicateNodes = (
  nodes: BasicNode[],
  limit: number
): { nodes: BasicNode[]; nodeLimitHit: boolean } =>
  nodes.reduce(
    (all: DeduplicateHelper, curr: BasicNode) => {
      if (all.nodes.length === limit) {
        all.nodeLimitHit = true
      } else if (!all.taken[curr.id]) {
        all.nodes.push(curr)
        all.taken[curr.id] = true
      }
      return all
    },
    { nodes: [], taken: {}, nodeLimitHit: false }
  )
