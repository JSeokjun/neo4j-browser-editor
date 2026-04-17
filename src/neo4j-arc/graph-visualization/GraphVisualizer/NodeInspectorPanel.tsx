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
import React, { Component } from 'react'

import { ChevronLeftIcon, ChevronRightIcon } from '../../common'

import {
  DefaultDetailsPane,
  DetailsPaneProps
} from './DefaultPanelContent/DefaultDetailsPane'
import { NodeInspectorDrawer } from './NodeInspectorDrawer'
import DefaultOverviewPane, {
  OverviewPaneProps
} from './DefaultPanelContent/DefaultOverviewPane'
import {
  PaneContainer,
  StyledNodeInspectorTopMenuChevron,
  panelMinWidth
} from './styled'
import { Resizable } from 're-resizable'
import { GraphStats } from '../utils/mapper'
import { GraphStyleModel } from '../models/GraphStyle'
import { VizItem } from '../types'
import { VizItemProperty } from 'neo4j-arc/common'

interface NodeInspectorPanelProps {
  expanded: boolean
  graphStyle: GraphStyleModel
  hasTruncatedFields: boolean
  hoveredItem: VizItem
  selectedItem: VizItem
  multiSelectedItems?: VizItem[]
  setWidth: (width: number) => void
  stats: GraphStats
  toggleExpanded: () => void
  width: number
  detailsPaneEditable?: boolean
  onBatchDelete?: () => void
  onPropertyListChange?: (
    vizItem: VizItem,
    propertyList: VizItemProperty[]
  ) => void
  onNodeLabelsChange?: (vizItem: VizItem, labels: string[]) => void
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
  onValidationWarning?: (message: string) => void
  t?: (key: string, params?: Record<string, string | number>) => string
  DetailsPaneOverride?: React.FC<DetailsPaneProps>
  OverviewPaneOverride?: React.FC<OverviewPaneProps>
}

export const defaultPanelWidth = (): number =>
  Math.max(window.innerWidth / 5, panelMinWidth)
export class NodeInspectorPanel extends Component<NodeInspectorPanelProps> {
  render(): JSX.Element {
    const {
      expanded,
      graphStyle,
      hasTruncatedFields,
      hoveredItem,
      selectedItem,
      multiSelectedItems = [],
      setWidth,
      stats,
      toggleExpanded,
      width,
      detailsPaneEditable,
      onPropertyListChange,
      onNodeLabelsChange,
      onCreateRelationshipFromNode,
      onDeleteRelationship,
      onReverseRelationship,
      onReconnectRelationship,
      onRelationshipTypeChange,
      onBatchDelete,
      t: tProp,
      DetailsPaneOverride,
      OverviewPaneOverride
    } = this.props
    const t = tProp || ((key: string) => key)
    const relevantItems = ['node', 'relationship']
    const hoveringNodeOrRelationship =
      hoveredItem && relevantItems.includes(hoveredItem.type)
    const shownEl = hoveringNodeOrRelationship ? hoveredItem : selectedItem
    const DetailsPane =
      DetailsPaneOverride !== undefined
        ? DetailsPaneOverride
        : DefaultDetailsPane
    const OverviewPane =
      OverviewPaneOverride !== undefined
        ? OverviewPaneOverride
        : DefaultOverviewPane

    return (
      <>
        <StyledNodeInspectorTopMenuChevron
          aria-label={
            expanded ? t('editing.panel.collapse') : t('editing.panel.expand')
          }
          expanded={expanded}
          onClick={toggleExpanded}
          title={
            expanded ? t('editing.panel.collapse') : t('editing.panel.expand')
          }
        >
          {expanded ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </StyledNodeInspectorTopMenuChevron>

        <NodeInspectorDrawer width={width} isOpen={expanded}>
          <Resizable
            size={{
              width: width,
              height: '100%'
            }}
            onResize={(_e, _direction, ref, _d) => {
              const width = Number.parseInt(ref.style.width.slice(0, -2))
              setWidth(width)
            }}
            data-testid="vizInspector"
          >
            <PaneContainer paneWidth={width}>
              {multiSelectedItems.length > 1 ? (
                <div style={{ padding: '14px' }}>
                  <div
                    style={{
                      fontSize: '16px',
                      marginTop: '10px',
                      marginBottom: '14px'
                    }}
                  >
                    {t('editing.panel.multiSelect.itemsSelected', {
                      count: multiSelectedItems.length
                    })}
                  </div>
                  <div style={{ fontSize: '13px', marginBottom: '14px' }}>
                    {multiSelectedItems.filter(i => i.type === 'node').length}{' '}
                    {t('editing.panel.multiSelect.nodes')},{' '}
                    {
                      multiSelectedItems.filter(i => i.type === 'relationship')
                        .length
                    }{' '}
                    {t('editing.panel.multiSelect.relationships')}
                  </div>
                  {detailsPaneEditable && onBatchDelete && (
                    <button
                      onClick={onBatchDelete}
                      style={{
                        padding: '6px 14px',
                        background: 'transparent',
                        color: '#d9534f',
                        border: '1px solid #d9534f',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: 'bold'
                      }}
                    >
                      {t('editing.panel.multiSelect.deleteSelected', {
                        count: multiSelectedItems.length
                      })}
                    </button>
                  )}
                </div>
              ) : shownEl.type === 'node' || shownEl.type === 'relationship' ? (
                <DetailsPane
                  vizItem={shownEl}
                  graphStyle={graphStyle}
                  nodeInspectorWidth={width}
                  editable={detailsPaneEditable}
                  onPropertyListChange={propertyList =>
                    onPropertyListChange?.(shownEl, propertyList)
                  }
                  onNodeLabelsChange={labels =>
                    onNodeLabelsChange?.(shownEl, labels)
                  }
                  onCreateRelationship={(targetNodeId, type) => {
                    if (shownEl.type !== 'node') {
                      return
                    }
                    onCreateRelationshipFromNode?.(
                      shownEl.item.id,
                      targetNodeId,
                      type
                    )
                  }}
                  onDeleteRelationship={() => {
                    if (shownEl.type !== 'relationship') {
                      return
                    }
                    onDeleteRelationship?.(shownEl.item.elementId)
                  }}
                  onReverseRelationship={() => {
                    if (shownEl.type !== 'relationship') {
                      return
                    }
                    onReverseRelationship?.(shownEl.item.elementId)
                  }}
                  onReconnectRelationship={(startNodeId, endNodeId) => {
                    if (shownEl.type !== 'relationship') {
                      return
                    }
                    onReconnectRelationship?.(
                      shownEl.item.elementId,
                      startNodeId,
                      endNodeId
                    )
                  }}
                  onRelationshipTypeChange={newType => {
                    if (shownEl.type !== 'relationship') {
                      return
                    }
                    onRelationshipTypeChange?.(shownEl.item.elementId, newType)
                  }}
                  onValidationWarning={this.props.onValidationWarning}
                  t={t}
                />
              ) : (
                <OverviewPane
                  graphStyle={graphStyle}
                  hasTruncatedFields={hasTruncatedFields}
                  stats={stats}
                  t={t}
                  nodeCount={
                    shownEl.type === 'canvas' ? shownEl.item.nodeCount : null
                  }
                  relationshipCount={
                    shownEl.type === 'canvas'
                      ? shownEl.item.relationshipCount
                      : null
                  }
                  infoMessage={
                    shownEl.type === 'status-item' ? shownEl.item : null
                  }
                />
              )}
            </PaneContainer>
          </Resizable>
        </NodeInspectorDrawer>
      </>
    )
  }
}
