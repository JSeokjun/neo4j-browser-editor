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
import deepmerge from 'deepmerge'
import { debounce } from 'lodash-es'
import React, { Component } from 'react'

import { Graph } from './Graph/Graph'
import { NodeInspectorPanel, defaultPanelWidth } from './NodeInspectorPanel'
import { StyledFullSizeContainer, panelMinWidth } from './styled'
import {
  BasicNode,
  BasicNodesAndRels,
  BasicRelationship,
  VizItemProperty,
  deepEquals
} from 'neo4j-arc/common'
import { DetailsPaneProps } from './DefaultPanelContent/DefaultDetailsPane'
import { OverviewPaneProps } from './DefaultPanelContent/DefaultOverviewPane'
import { GraphStyleModel } from '../models/GraphStyle'
import { GetNodeNeighboursFn, VizItem } from '../types'
import { GraphStats } from '../utils/mapper'
import { GraphModel } from '../models/Graph'
import { GraphInteractionCallBack } from './Graph/GraphEventHandlerModel'

const DEFAULT_MAX_NEIGHBOURS = 100

export type GraphPropertyEditEvent = {
  itemType: 'node' | 'relationship'
  id: string
  elementId: string
  propertyList: VizItemProperty[]
}

export type GraphNodeLabelsEditEvent = {
  itemType: 'node'
  id: string
  elementId: string
  labels: string[]
  originalLabels: string[]
}

export type GraphSelectionEvent =
  | {
      itemType: 'node' | 'relationship'
      id: string
      elementId: string
    }
  | {
      itemType: 'canvas' | 'status-item'
    }

type GraphVisualizerDefaultProps = {
  maxNeighbours: number
  updateStyle: (style: any) => void
  isFullscreen: boolean
  assignVisElement: (svgElement: any, graphElement: any) => void
  getAutoCompleteCallback: (
    callback: (rels: BasicRelationship[], initialRun: boolean) => void
  ) => void
  setGraph: (graph: GraphModel) => void
  hasTruncatedFields: boolean
  nodePropertiesExpandedByDefault: boolean
  setNodePropertiesExpandedByDefault: (expandedByDefault: boolean) => void
  wheelZoomInfoMessageEnabled?: boolean
  initialZoomToFit?: boolean
  disableWheelZoomInfoMessage: () => void
  useGeneratedDefaultColors: boolean
  detailsPaneEditable: boolean
}
type GraphVisualizerProps = GraphVisualizerDefaultProps & {
  relationships: BasicRelationship[]
  nodes: BasicNode[]
  maxNeighbours?: number
  graphStyleData?: any
  getNeighbours?: (
    id: string,
    currentNeighbourIds: string[] | undefined
  ) => Promise<BasicNodesAndRels & { allNeighboursCount: number }>
  updateStyle?: (style: any) => void
  isFullscreen?: boolean
  assignVisElement?: (svgElement: any, graphElement: any) => void
  getAutoCompleteCallback?: (
    callback: (rels: BasicRelationship[], initialRun: boolean) => void
  ) => void
  setGraph?: (graph: GraphModel) => void
  hasTruncatedFields?: boolean
  nodeLimitHit?: boolean
  nodePropertiesExpandedByDefault?: boolean
  setNodePropertiesExpandedByDefault?: (expandedByDefault: boolean) => void
  wheelZoomRequiresModKey?: boolean
  wheelZoomInfoMessageEnabled?: boolean
  disableWheelZoomInfoMessage?: () => void
  DetailsPaneOverride?: React.FC<DetailsPaneProps>
  OverviewPaneOverride?: React.FC<OverviewPaneProps>
  onGraphInteraction?: GraphInteractionCallBack
  useGeneratedDefaultColors?: boolean
  autocompleteRelationships: boolean
  onPropertyEdit?: (event: GraphPropertyEditEvent) => void
  onNodeLabelsEdit?: (event: GraphNodeLabelsEditEvent) => void
  onCreateRelationshipFromNode?: (
    sourceNodeId: string,
    targetNodeId: string,
    type: string
  ) => void
  onDeleteRelationship?: (relationshipElementId: string) => void
  onReverseRelationship?: (relationshipElementId: string) => void
  onReconnectRelationship?: (
    relationshipElementId: string,
    startNodeId: string,
    endNodeId: string
  ) => void
  onRelationshipTypeChange?: (
    relationshipElementId: string,
    newType: string
  ) => void
  onBatchDelete?: (items: VizItem[]) => void
  onValidationWarning?: (message: string) => void
  t?: (key: string, params?: Record<string, string | number>) => string
  onSelectionChange?: (event: GraphSelectionEvent) => void
  selectedNodeElementId?: string
  selectedRelationshipElementId?: string
  initialNodePositions?: Record<string, { x: number; y: number }>
}

type GraphVisualizerState = {
  graphStyle: GraphStyleModel
  hoveredItem: VizItem
  nodes: BasicNode[]
  relationships: BasicRelationship[]
  selectedItem: VizItem
  multiSelectedItems: VizItem[]
  stats: GraphStats
  styleVersion: number
  freezeLegend: boolean
  width: number
  nodePropertiesExpanded: boolean
}

export class GraphVisualizer extends Component<
  GraphVisualizerProps,
  GraphVisualizerState
> {
  defaultStyle: any

  private asNodeSelectionItem(node: BasicNode): VizItem {
    return {
      type: 'node',
      item: {
        id: node.id,
        elementId: node.elementId,
        labels: node.labels,
        propertyList: Object.entries(node.properties).map(([key, value]) => ({
          key,
          value,
          type: node.propertyTypes[key] || 'string'
        }))
      }
    }
  }

  private asCanvasSelectionItem(
    nodes: BasicNode[],
    relationships: BasicRelationship[]
  ): VizItem {
    return {
      type: 'canvas',
      item: {
        nodeCount: nodes.length,
        relationshipCount: relationships.length
      }
    }
  }

  private asRelationshipSelectionItem(
    relationship: BasicRelationship
  ): VizItem {
    return {
      type: 'relationship',
      item: {
        id: relationship.id,
        elementId: relationship.elementId,
        type: relationship.type,
        startNodeId: relationship.startNodeId,
        endNodeId: relationship.endNodeId,
        propertyList: Object.entries(relationship.properties).map(
          ([key, value]) => ({
            key,
            value,
            type: relationship.propertyTypes[key] || 'string'
          })
        )
      }
    }
  }

  static defaultProps: GraphVisualizerDefaultProps = {
    maxNeighbours: DEFAULT_MAX_NEIGHBOURS,
    updateStyle: () => undefined,
    isFullscreen: false,
    assignVisElement: () => undefined,
    getAutoCompleteCallback: () => undefined,
    setGraph: () => undefined,
    hasTruncatedFields: false,
    nodePropertiesExpandedByDefault: true,
    setNodePropertiesExpandedByDefault: () => undefined,
    wheelZoomInfoMessageEnabled: false,
    disableWheelZoomInfoMessage: () => undefined,
    useGeneratedDefaultColors: true,
    detailsPaneEditable: true
  }

  private handlePropertyListChange(
    vizItem: VizItem,
    propertyList: VizItemProperty[]
  ): void {
    if (vizItem.type === 'node') {
      const propertyTypes = propertyList.reduce(
        (acc, property) => ({ ...acc, [property.key]: property.type }),
        {} as Record<string, string>
      )
      const properties = propertyList.reduce(
        (acc, property) => ({ ...acc, [property.key]: property.value }),
        {} as Record<string, string>
      )

      const nextNodes = this.state.nodes.map(node =>
        node.id === vizItem.item.id
          ? { ...node, properties, propertyTypes }
          : node
      )

      const nextSelectedItem: VizItem = {
        ...vizItem,
        item: {
          ...vizItem.item,
          propertyList
        }
      }

      this.setState({
        nodes: nextNodes,
        selectedItem: nextSelectedItem
      })
      this.props.onPropertyEdit?.({
        itemType: 'node',
        id: vizItem.item.id,
        elementId: vizItem.item.elementId,
        propertyList
      })
      return
    }

    if (vizItem.type === 'relationship') {
      const propertyTypes = propertyList.reduce(
        (acc, property) => ({ ...acc, [property.key]: property.type }),
        {} as Record<string, string>
      )
      const properties = propertyList.reduce(
        (acc, property) => ({ ...acc, [property.key]: property.value }),
        {} as Record<string, string>
      )

      const nextRelationships = this.state.relationships.map(relationship =>
        relationship.id === vizItem.item.id
          ? { ...relationship, properties, propertyTypes }
          : relationship
      )

      const nextSelectedItem: VizItem = {
        ...vizItem,
        item: {
          ...vizItem.item,
          propertyList
        }
      }

      this.setState({
        relationships: nextRelationships,
        selectedItem: nextSelectedItem
      })
      this.props.onPropertyEdit?.({
        itemType: 'relationship',
        id: vizItem.item.id,
        elementId: vizItem.item.elementId,
        propertyList
      })
    }
  }

  private handleNodeLabelsChange(vizItem: VizItem, labels: string[]): void {
    if (vizItem.type !== 'node') {
      return
    }

    const nextNodes = this.state.nodes.map(node =>
      node.id === vizItem.item.id ? { ...node, labels } : node
    )

    const nextSelectedItem: VizItem = {
      ...vizItem,
      item: {
        ...vizItem.item,
        labels
      }
    }

    this.setState({
      nodes: nextNodes,
      selectedItem: nextSelectedItem
    })

    this.props.onNodeLabelsEdit?.({
      itemType: 'node',
      id: vizItem.item.id,
      elementId: vizItem.item.elementId,
      labels,
      originalLabels: vizItem.item.labels
    })
  }

  private handleRelationshipTypeChange(
    vizItem: VizItem,
    newType: string
  ): void {
    if (vizItem.type !== 'relationship') {
      return
    }

    const nextRelationships = this.state.relationships.map(rel =>
      rel.id === vizItem.item.id ? { ...rel, type: newType } : rel
    )

    const nextSelectedItem: VizItem = {
      ...vizItem,
      item: {
        ...vizItem.item,
        type: newType
      }
    }

    this.setState({
      relationships: nextRelationships,
      selectedItem: nextSelectedItem
    })

    this.props.onRelationshipTypeChange?.(vizItem.item.elementId, newType)
  }

  constructor(props: GraphVisualizerProps) {
    super(props)
    const graphStyle = new GraphStyleModel(this.props.useGeneratedDefaultColors)
    this.defaultStyle = graphStyle.toSheet()
    const {
      nodeLimitHit,
      nodes,
      relationships,
      nodePropertiesExpandedByDefault
    } = this.props

    const selectedRelationship = this.props.selectedRelationshipElementId
      ? relationships.find(
          relationship =>
            relationship.elementId === this.props.selectedRelationshipElementId
        )
      : undefined

    const selectedNode = this.props.selectedNodeElementId
      ? nodes.find(node => node.elementId === this.props.selectedNodeElementId)
      : undefined

    const selectedItem: VizItem = selectedRelationship
      ? this.asRelationshipSelectionItem(selectedRelationship)
      : selectedNode
        ? this.asNodeSelectionItem(selectedNode)
        : nodeLimitHit
          ? {
              type: 'status-item',
              item: `Not all return nodes are being displayed due to Initial Node Display setting. Only first ${this.props.nodes.length} nodes are displayed.`
            }
          : this.asCanvasSelectionItem(nodes, relationships)

    if (this.props.graphStyleData) {
      const rebasedStyle = deepmerge(
        this.defaultStyle,
        this.props.graphStyleData
      )
      graphStyle.loadRules(rebasedStyle)
    }
    this.state = {
      stats: {
        labels: {},
        relTypes: {}
      },
      graphStyle,
      styleVersion: 0,
      nodes,
      relationships,
      selectedItem,
      multiSelectedItems: [],
      hoveredItem: selectedItem,
      freezeLegend: false,
      width: defaultPanelWidth(),
      nodePropertiesExpanded: nodePropertiesExpandedByDefault
    }
  }

  getNodeNeighbours: GetNodeNeighboursFn = (
    node,
    currentNeighbourIds,
    callback
  ) => {
    if (currentNeighbourIds.length > this.props.maxNeighbours) {
      callback({ nodes: [], relationships: [] })
    }
    if (this.props.getNeighbours) {
      this.props.getNeighbours(node.id, currentNeighbourIds).then(
        ({ nodes, relationships, allNeighboursCount }) => {
          if (allNeighboursCount > this.props.maxNeighbours) {
            this.setState({
              selectedItem: {
                type: 'status-item',
                item: `Rendering was limited to ${this.props.maxNeighbours} of the node's total ${allNeighboursCount} neighbours due to browser config maxNeighbours.`
              }
            })
          }
          callback({ nodes, relationships })
        },
        () => {
          callback({ nodes: [], relationships: [] })
        }
      )
    }
  }

  onItemMouseOver(item: VizItem): void {
    this.setHoveredItem(item)
  }

  mounted = true
  setHoveredItem = debounce((hoveredItem: VizItem) => {
    if (this.mounted) {
      this.setState({ hoveredItem })
    }
  }, 200)

  onItemSelect(selectedItem: VizItem): void {
    this.setState({ selectedItem })
    if (selectedItem.type === 'node' || selectedItem.type === 'relationship') {
      this.props.onSelectionChange?.({
        itemType: selectedItem.type,
        id: selectedItem.item.id,
        elementId: selectedItem.item.elementId
      })
      return
    }

    if (selectedItem.type === 'canvas' || selectedItem.type === 'status-item') {
      this.props.onSelectionChange?.({ itemType: selectedItem.type })
    }
  }

  onGraphModelChange(stats: GraphStats): void {
    this.setState({ stats })
    if (this.props.updateStyle) {
      this.props.updateStyle(this.state.graphStyle.toSheet())
    }
  }

  componentDidUpdate(prevProps: GraphVisualizerProps): void {
    if (!deepEquals(prevProps.graphStyleData, this.props.graphStyleData)) {
      if (this.props.graphStyleData) {
        const rebasedStyle = deepmerge(
          this.defaultStyle,
          this.props.graphStyleData
        )
        this.state.graphStyle.loadRules(rebasedStyle)
        this.setState({
          graphStyle: this.state.graphStyle,
          styleVersion: this.state.styleVersion + 1
        })
      } else {
        this.state.graphStyle.resetToDefault()
        this.setState(
          { graphStyle: this.state.graphStyle, freezeLegend: true },
          () => {
            this.setState({ freezeLegend: false })
            this.props.updateStyle(this.state.graphStyle.toSheet())
          }
        )
      }
    }

    if (
      prevProps.selectedRelationshipElementId !==
        this.props.selectedRelationshipElementId &&
      this.props.selectedRelationshipElementId
    ) {
      const selectedRelationship = this.state.relationships.find(
        relationship =>
          relationship.elementId === this.props.selectedRelationshipElementId
      )

      if (selectedRelationship) {
        this.setState({
          selectedItem: this.asRelationshipSelectionItem(selectedRelationship)
        })
      }
      return
    }

    if (
      prevProps.selectedNodeElementId !== this.props.selectedNodeElementId &&
      this.props.selectedNodeElementId
    ) {
      const selectedNode = this.state.nodes.find(
        node => node.elementId === this.props.selectedNodeElementId
      )

      if (selectedNode) {
        this.setState({ selectedItem: this.asNodeSelectionItem(selectedNode) })
      }
      return
    }

    if (
      prevProps.selectedNodeElementId !== this.props.selectedNodeElementId &&
      !this.props.selectedNodeElementId
    ) {
      this.setState({
        selectedItem: this.asCanvasSelectionItem(
          this.state.nodes,
          this.state.relationships
        )
      })
    }
  }

  render(): JSX.Element {
    // This is a workaround to make the style reset to the same colors as when starting the browser with an empty style
    // If the legend component has the style it will ask the neoGraphStyle object for styling before the graph component,
    // and also doing this in a different order from the graph. This leads to different default colors being assigned to different labels.
    const graphStyle = this.state.freezeLegend
      ? new GraphStyleModel(this.props.useGeneratedDefaultColors)
      : this.state.graphStyle

    return (
      <StyledFullSizeContainer id="svg-vis">
        <Graph
          isFullscreen={this.props.isFullscreen}
          relationships={this.state.relationships}
          nodes={this.state.nodes}
          getNodeNeighbours={this.getNodeNeighbours.bind(this)}
          onItemMouseOver={this.onItemMouseOver.bind(this)}
          onItemSelect={this.onItemSelect.bind(this)}
          graphStyle={graphStyle}
          styleVersion={this.state.styleVersion} // cheap way for child to check style updates
          onGraphModelChange={this.onGraphModelChange.bind(this)}
          assignVisElement={this.props.assignVisElement}
          getAutoCompleteCallback={this.props.getAutoCompleteCallback}
          autocompleteRelationships={this.props.autocompleteRelationships}
          setGraph={this.props.setGraph}
          offset={
            (this.state.nodePropertiesExpanded ? this.state.width + 8 : 0) + 8
          }
          wheelZoomRequiresModKey={this.props.wheelZoomRequiresModKey}
          wheelZoomInfoMessageEnabled={this.props.wheelZoomInfoMessageEnabled}
          disableWheelZoomInfoMessage={this.props.disableWheelZoomInfoMessage}
          initialZoomToFit={this.props.initialZoomToFit}
          onGraphInteraction={this.props.onGraphInteraction}
          onMultiSelectionChanged={(items: VizItem[]) =>
            this.setState({ multiSelectedItems: items })
          }
          initialNodePositions={this.props.initialNodePositions}
        />
        <NodeInspectorPanel
          graphStyle={graphStyle}
          hasTruncatedFields={this.props.hasTruncatedFields}
          hoveredItem={this.state.hoveredItem}
          selectedItem={this.state.selectedItem}
          stats={this.state.stats}
          width={this.state.width}
          setWidth={(width: number) =>
            this.setState({ width: Math.max(panelMinWidth, width) })
          }
          expanded={this.state.nodePropertiesExpanded}
          toggleExpanded={() => {
            const { nodePropertiesExpanded } = this.state
            this.props.setNodePropertiesExpandedByDefault(
              !nodePropertiesExpanded
            )
            this.setState({ nodePropertiesExpanded: !nodePropertiesExpanded })
          }}
          detailsPaneEditable={this.props.detailsPaneEditable}
          onPropertyListChange={this.handlePropertyListChange.bind(this)}
          onNodeLabelsChange={this.handleNodeLabelsChange.bind(this)}
          onCreateRelationshipFromNode={this.props.onCreateRelationshipFromNode}
          onDeleteRelationship={this.props.onDeleteRelationship}
          onReverseRelationship={this.props.onReverseRelationship}
          onReconnectRelationship={this.props.onReconnectRelationship}
          onRelationshipTypeChange={(elementId, newType) => {
            const vizItem = this.state.selectedItem
            if (
              vizItem.type === 'relationship' &&
              vizItem.item.elementId === elementId
            ) {
              this.handleRelationshipTypeChange(vizItem, newType)
            }
          }}
          multiSelectedItems={this.state.multiSelectedItems}
          onBatchDelete={() =>
            this.props.onBatchDelete?.(this.state.multiSelectedItems)
          }
          onValidationWarning={this.props.onValidationWarning}
          t={this.props.t}
          DetailsPaneOverride={this.props.DetailsPaneOverride}
          OverviewPaneOverride={this.props.OverviewPaneOverride}
        />
      </StyledFullSizeContainer>
    )
  }

  componentWillUnmount(): void {
    this.mounted = false
  }
}
