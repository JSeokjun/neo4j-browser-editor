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

import { ClipboardCopier, PropertiesTable, upperFirst } from 'neo4j-arc/common'
import { useT } from 'shared/i18n'
import { TrashIcon } from '../../../../../../neo4j-arc/common/icons/Icons'

import { StyleableNodeLabel } from './StyleableNodeLabel'
import { StyleableRelType } from './StyleableRelType'
import {
  PaneBody,
  PaneHeader,
  PaneTitle,
  PaneTitleActionButton,
  PaneTitleDeleteButton,
  PaneWrapper,
  RelTypeActions,
  RelTypeLine,
  StyledNodeLabelsEditor,
  StyledRelTypeEditor
} from './styled'
import { DetailsPaneProps } from 'neo4j-arc/graph-visualization'

export const DETAILS_PANE_STEP_SIZE = 1000
export function DetailsPane({
  vizItem,
  graphStyle,
  nodeInspectorWidth,
  editable = false,
  onPropertyListChange,
  onNodeLabelsChange,
  onDeleteRelationship,
  onCreateRelationship: _onCreateRelationship,
  onReverseRelationship,
  onReconnectRelationship: _onReconnectRelationship,
  onRelationshipTypeChange,
  onValidationWarning
}: DetailsPaneProps): JSX.Element {
  const t = useT()
  const [maxPropertiesCount, setMaxPropertiesCount] = useState(
    DETAILS_PANE_STEP_SIZE
  )
  const [propertyList, setPropertyList] = useState(vizItem.item.propertyList)
  const [nodeLabelsDraft, setNodeLabelsDraft] = useState('')
  const [relTypeDraft, setRelTypeDraft] = useState('')

  useEffect(() => {
    setPropertyList(vizItem.item.propertyList)
    if (vizItem.type === 'node') {
      setNodeLabelsDraft(vizItem.item.labels.join(', '))
      setRelTypeDraft('')
    } else if (vizItem.type === 'relationship') {
      setNodeLabelsDraft('')
      setRelTypeDraft(vizItem.item.type)
    }
  }, [vizItem])

  const normalizeLabels = (rawLabels: string[]): string[] => {
    const normalizedLabels: string[] = []
    const seenLabels = new Set<string>()

    rawLabels.forEach(label => {
      const trimmedLabel = label.trim()
      if (!trimmedLabel || seenLabels.has(trimmedLabel)) {
        return
      }
      seenLabels.add(trimmedLabel)
      normalizedLabels.push(trimmedLabel)
    })

    return normalizedLabels
  }

  const commitNodeLabels = () => {
    if (vizItem.type !== 'node' || !editable) {
      return
    }

    const nextLabels = normalizeLabels(nodeLabelsDraft.split(','))

    if (nextLabels.length === 0) {
      onValidationWarning?.(t('editing.validation.emptyLabel'))
      setNodeLabelsDraft(vizItem.item.labels.join(', '))
      return
    }

    const currentLabels = normalizeLabels(vizItem.item.labels)
    const hasChanged =
      nextLabels.length !== currentLabels.length ||
      nextLabels.some((label, index) => label !== currentLabels[index])

    if (!hasChanged) {
      setNodeLabelsDraft(currentLabels.join(', '))
      return
    }

    setNodeLabelsDraft(nextLabels.join(', '))
    onNodeLabelsChange?.(nextLabels)
  }

  const commitRelType = () => {
    if (vizItem.type !== 'relationship' || !editable) {
      return
    }

    const trimmed = relTypeDraft.trim()
    if (trimmed.length === 0) {
      onValidationWarning?.(t('editing.validation.emptyRelType'))
    }
    const nextType = trimmed.length > 0 ? trimmed : 'RELATED_TO'

    if (nextType === vizItem.item.type) {
      setRelTypeDraft(vizItem.item.type)
      return
    }

    setRelTypeDraft(nextType)
    onRelationshipTypeChange?.(nextType)
  }

  const idProperty = {
    key: '<id>',
    value: `${vizItem.item.id}`,
    type: 'String'
  }
  const elementIdProperty = {
    key: '<elementId>',
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
              ? t('editing.details.nodeProperties')
              : t('editing.details.relationshipProperties')}
          </span>
          <ClipboardCopier
            textToCopy={allItemProperties
              .map(prop => `${prop.key}: ${prop.value}`)
              .join('\n')}
            titleText={t('editing.details.copyAll')}
            iconSize={12}
          />
        </PaneTitle>
        {vizItem.type === 'relationship' && (
          <RelTypeLine>
            {editable ? (
              <StyledRelTypeEditor
                aria-label={t('editing.details.relType')}
                value={relTypeDraft}
                placeholder={t('editing.details.relTypePlaceholder')}
                onChange={event => setRelTypeDraft(event.target.value)}
                onBlur={commitRelType}
                onKeyDown={event => {
                  if (event.key === 'Enter') {
                    commitRelType()
                  }
                  if (event.key === 'Escape') {
                    setRelTypeDraft(vizItem.item.type)
                    event.currentTarget.blur()
                  }
                }}
              />
            ) : (
              <StyleableRelType
                selectedRelType={{
                  propertyKeys: propertyList.map(p => p.key),
                  relType: vizItem.item.type
                }}
                graphStyle={graphStyle}
              />
            )}
            {editable && (
              <RelTypeActions>
                <PaneTitleActionButton
                  aria-label={t('editing.details.reverseDirection')}
                  title={t('editing.details.reverseDirection')}
                  onClick={onReverseRelationship}
                >
                  ↔
                </PaneTitleActionButton>
                <PaneTitleDeleteButton
                  aria-label={t('editing.details.deleteRelationship')}
                  title={t('editing.details.deleteRelationship')}
                  onClick={onDeleteRelationship}
                >
                  <TrashIcon width={14} />
                </PaneTitleDeleteButton>
              </RelTypeActions>
            )}
          </RelTypeLine>
        )}
        {vizItem.type === 'node' &&
          vizItem.item.labels.map((label: string) => {
            return (
              <StyleableNodeLabel
                key={label}
                graphStyle={graphStyle}
                selectedLabel={{
                  label,
                  propertyKeys: propertyList.map(p => p.key)
                }}
              />
            )
          })}
        {vizItem.type === 'node' && editable && (
          <StyledNodeLabelsEditor
            aria-label={t('editing.details.nodeLabels')}
            value={nodeLabelsDraft}
            placeholder={t('editing.details.nodeLabelsPlaceholder')}
            onChange={event => setNodeLabelsDraft(event.target.value)}
            onBlur={commitNodeLabels}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                commitNodeLabels()
              }
              if (event.key === 'Escape') {
                setNodeLabelsDraft(vizItem.item.labels.join(', '))
                event.currentTarget.blur()
              }
            }}
          />
        )}
      </PaneHeader>
      <PaneBody data-testid="viz-details-pane-body">
        <PropertiesTable
          visibleProperties={visibleItemProperties}
          onMoreClick={handleMorePropertiesClick}
          moreStep={DETAILS_PANE_STEP_SIZE}
          totalNumItems={allItemProperties.length}
          nodeInspectorWidth={nodeInspectorWidth}
          editable={editable}
          readOnlyKeys={['<id>', '<elementId>']}
          onValidationWarning={onValidationWarning}
          t={t as any}
          onPropertiesChange={nextProperties => {
            const nextPropertyList = nextProperties.filter(
              property =>
                property.key !== '<id>' && property.key !== '<elementId>'
            )
            setPropertyList(nextPropertyList)
            onPropertyListChange?.(nextPropertyList)
          }}
        />
      </PaneBody>
    </PaneWrapper>
  )
}
