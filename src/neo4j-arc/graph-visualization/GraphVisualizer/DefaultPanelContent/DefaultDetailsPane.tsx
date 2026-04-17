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
import React, { useEffect, useState } from 'react'

import {
  ClipboardCopier,
  PropertiesTable,
  VizItemProperty
} from 'neo4j-arc/common'
import { NodeItem, RelationshipItem } from '../../types'

import { PaneBody, PaneHeader, PaneTitle, PaneWrapper } from './styled'
import { NodeLabel } from './NodeLabel'
import { RelType } from './RelType'
import { GraphStyleModel } from '../../models/GraphStyle'

export const DETAILS_PANE_STEP_SIZE = 1000
export type DetailsPaneProps = {
  vizItem: NodeItem | RelationshipItem
  graphStyle: GraphStyleModel
  nodeInspectorWidth: number
  editable?: boolean
  onPropertyListChange?: (propertyList: VizItemProperty[]) => void
  onNodeLabelsChange?: (labels: string[]) => void
  onCreateRelationship?: (targetNodeId: string, type: string) => void
  onDeleteRelationship?: () => void
  onReverseRelationship?: () => void
  onReconnectRelationship?: (startNodeId: string, endNodeId: string) => void
  onRelationshipTypeChange?: (newType: string) => void
  onValidationWarning?: (message: string) => void
  t?: (key: string, params?: Record<string, string | number>) => string
}
export function DefaultDetailsPane({
  vizItem,
  graphStyle,
  nodeInspectorWidth,
  editable = false,
  onPropertyListChange,
  onNodeLabelsChange: _onNodeLabelsChange,
  onCreateRelationship: _onCreateRelationship,
  onDeleteRelationship: _onDeleteRelationship,
  onReverseRelationship: _onReverseRelationship,
  onReconnectRelationship: _onReconnectRelationship,
  t: tProp
}: DetailsPaneProps): JSX.Element {
  const t = tProp || ((key: string) => key)
  const [maxPropertiesCount, setMaxPropertiesCount] = useState(
    DETAILS_PANE_STEP_SIZE
  )
  const [propertyList, setPropertyList] = useState(vizItem.item.propertyList)

  useEffect(() => {
    setPropertyList(vizItem.item.propertyList)
  }, [vizItem])

  const idProperty = {
    key: '<id>',
    value: `${vizItem.item.id}`,
    type: 'String'
  }
  const elementIdProperty = {
    key: '<element-id>',
    value: `${vizItem.item.elementId}`,
    type: 'String'
  }
  const allItemProperties = [
    idProperty,
    elementIdProperty,
    ...propertyList
  ].sort((a, b) => (a.key < b.key ? -1 : 1))
  const visibleItemProperties = allItemProperties.slice(0, maxPropertiesCount)

  const handleMorePropertiesClick = (numMore: number) => {
    setMaxPropertiesCount(maxPropertiesCount + numMore)
  }

  return (
    <PaneWrapper>
      <PaneHeader>
        <PaneTitle>
          <span>
            {vizItem.type === 'node'
              ? t('defaultDetails.nodeProperties')
              : t('defaultDetails.relProperties')}
          </span>
          <ClipboardCopier
            textToCopy={allItemProperties
              .map(prop => `${prop.key}: ${prop.value}`)
              .join('\n')}
            titleText={t('defaultDetails.copyAll')}
            iconSize={10}
          />
        </PaneTitle>
        {vizItem.type === 'relationship' && (
          <RelType
            selectedRelType={{
              propertyKeys: propertyList.map(p => p.key),
              relType: vizItem.item.type
            }}
            graphStyle={graphStyle}
          />
        )}
        {vizItem.type === 'node' &&
          vizItem.item.labels.map((label: string) => {
            return (
              <NodeLabel
                key={label}
                graphStyle={graphStyle}
                selectedLabel={{
                  label,
                  propertyKeys: propertyList.map(p => p.key)
                }}
              />
            )
          })}
      </PaneHeader>
      <PaneBody>
        <PropertiesTable
          visibleProperties={visibleItemProperties}
          onMoreClick={handleMorePropertiesClick}
          moreStep={DETAILS_PANE_STEP_SIZE}
          totalNumItems={allItemProperties.length}
          nodeInspectorWidth={nodeInspectorWidth}
          editable={editable}
          readOnlyKeys={['<id>', '<element-id>']}
          onPropertiesChange={nextProperties => {
            const nextPropertyList = nextProperties.filter(
              property =>
                property.key !== '<id>' && property.key !== '<element-id>'
            )
            setPropertyList(nextPropertyList)
            onPropertyListChange?.(nextPropertyList)
          }}
        />
      </PaneBody>
    </PaneWrapper>
  )
}
