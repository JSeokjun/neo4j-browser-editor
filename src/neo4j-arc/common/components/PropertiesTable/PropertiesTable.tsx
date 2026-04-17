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
import React, { useEffect, useMemo, useState } from 'react'

import { ClickableUrls } from '../ClickableUrls'
import {
  ActionSpacer,
  AlternatingTable,
  CopyCell,
  KeyCell,
  InlineActionButton,
  InlineEditInput,
  AddPropertyContainer,
  StyledExpandValueButton,
  StyledInlineList,
  ValueCell
} from './PropertiesTable.style'
import { ClipboardCopier } from '../ClipboardCopier'
import { ShowMoreOrAll } from '../ShowMoreOrAll/ShowMoreOrAll'
import { VizItemProperty } from 'neo4j-arc/common'
import { PlusIcon, TrashIcon } from '../../icons/Icons'

export const ELLIPSIS = '\u2026'
export const WIDE_VIEW_THRESHOLD = 900
export const MAX_LENGTH_NARROW = 150
export const MAX_LENGTH_WIDE = 300
type ExpandableValueProps = {
  value: string
  width: number
  type: string
  t: (key: string, params?: Record<string, string | number>) => string
}
function ExpandableValue({ value, width, type, t }: ExpandableValueProps) {
  const [expanded, setExpanded] = useState(false)

  const maxLength =
    width > WIDE_VIEW_THRESHOLD ? MAX_LENGTH_WIDE : MAX_LENGTH_NARROW

  const handleExpandClick = () => {
    setExpanded(true)
  }

  let valueShown = expanded ? value : value.slice(0, maxLength)
  const valueIsTrimmed = valueShown.length !== value.length
  valueShown += valueIsTrimmed ? ELLIPSIS : ''

  return (
    <>
      {type.startsWith('Array') && '['}
      <ClickableUrls text={valueShown} />
      {valueIsTrimmed && (
        <StyledExpandValueButton onClick={handleExpandClick}>
          {t('editing.props.showAll')}
        </StyledExpandValueButton>
      )}
      {type.startsWith('Array') && ']'}
    </>
  )
}

type PropertiesViewProps = {
  visibleProperties: VizItemProperty[]
  onMoreClick: (numMore: number) => void
  totalNumItems: number
  moreStep: number
  nodeInspectorWidth: number
  editable?: boolean
  onPropertiesChange?: (properties: VizItemProperty[]) => void
  onValidationWarning?: (message: string) => void
  readOnlyKeys?: string[]
  t?: (key: string, params?: Record<string, string | number>) => string
}

type EditingCell = {
  index: number
  field: 'key' | 'value'
}

export const PropertiesTable = ({
  visibleProperties,
  totalNumItems,
  onMoreClick,
  moreStep,
  nodeInspectorWidth,
  editable = false,
  onPropertiesChange,
  onValidationWarning,
  readOnlyKeys = [],
  t: tProp
}: PropertiesViewProps): JSX.Element => {
  const t = tProp || ((key: string) => key)

  const [properties, setProperties] = useState(visibleProperties)
  const [editingCell, setEditingCell] = useState<EditingCell | null>(null)
  const [editingDraft, setEditingDraft] = useState('')
  const [newPropertyKey, setNewPropertyKey] = useState('')
  const [newPropertyValue, setNewPropertyValue] = useState('')

  useEffect(() => {
    setProperties(visibleProperties)
  }, [visibleProperties])

  const readOnlyKeySet = useMemo(() => new Set(readOnlyKeys), [readOnlyKeys])

  const applyProperties = (nextProperties: VizItemProperty[]) => {
    setProperties(nextProperties)
    onPropertiesChange?.(nextProperties)
  }

  const startEditing = (index: number, field: 'key' | 'value') => {
    if (!editable) {
      return
    }
    if (field === 'key' && readOnlyKeySet.has(properties[index].key)) {
      return
    }
    setEditingCell({ index, field })
    setEditingDraft(
      field === 'key' ? properties[index].key : properties[index].value
    )
  }

  const stopEditing = () => {
    setEditingCell(null)
    setEditingDraft('')
  }

  const commitEditing = () => {
    if (!editingCell) {
      return
    }
    const { index, field } = editingCell
    const current = properties[index]
    if (!current) {
      stopEditing()
      return
    }
    if (field === 'key') {
      const nextKey = editingDraft.trim()
      if (!nextKey) {
        onValidationWarning?.(t('editing.validation.emptyPropertyKey'))
        stopEditing()
        return
      }
      if (readOnlyKeySet.has(current.key)) {
        stopEditing()
        return
      }
      const duplicateKey = properties.some(
        (property, propertyIndex) =>
          propertyIndex !== index && property.key === nextKey
      )
      if (duplicateKey) {
        onValidationWarning?.(
          `${t('editing.validation.duplicatePropertyKey')}: "${nextKey}"`
        )
        return
      }
      const nextProperties = properties.map((property, propertyIndex) =>
        propertyIndex === index ? { ...property, key: nextKey } : property
      )
      applyProperties(nextProperties)
      stopEditing()
      return
    }

    const nextProperties = properties.map((property, propertyIndex) =>
      propertyIndex === index ? { ...property, value: editingDraft } : property
    )
    applyProperties(nextProperties)
    stopEditing()
  }

  const removeProperty = (index: number) => {
    const property = properties[index]
    if (!property || readOnlyKeySet.has(property.key)) {
      return
    }
    const nextProperties = properties.filter(
      (_, propertyIndex) => propertyIndex !== index
    )
    applyProperties(nextProperties)
  }

  const addProperty = () => {
    const nextKey = newPropertyKey.trim()
    if (!nextKey) {
      onValidationWarning?.(t('editing.validation.emptyPropertyKey'))
      return
    }
    const keyExists = properties.some(property => property.key === nextKey)
    if (keyExists) {
      onValidationWarning?.(
        `${t('editing.validation.duplicatePropertyKey')}: "${nextKey}"`
      )
      return
    }
    const nextProperties = [
      ...properties,
      { key: nextKey, value: newPropertyValue, type: 'string' }
    ]
    applyProperties(nextProperties)
    setNewPropertyKey('')
    setNewPropertyValue('')
  }

  return (
    <>
      <StyledInlineList>
        <AlternatingTable>
          <tbody data-testid="viz-details-pane-properties-table">
            {properties.map(({ key, type, value }, index) => (
              <tr key={key} title={type}>
                <KeyCell>
                  {editingCell?.index === index &&
                  editingCell.field === 'key' ? (
                    <InlineEditInput
                      aria-label={t('editing.props.editKey')}
                      autoFocus
                      value={editingDraft}
                      onChange={event => setEditingDraft(event.target.value)}
                      onKeyDown={event => {
                        if (event.key === 'Enter') {
                          commitEditing()
                        }
                        if (event.key === 'Escape') {
                          stopEditing()
                        }
                      }}
                      onBlur={commitEditing}
                    />
                  ) : (
                    <span onDoubleClick={() => startEditing(index, 'key')}>
                      <ClickableUrls text={key} />
                    </span>
                  )}
                </KeyCell>
                <ValueCell>
                  {editingCell?.index === index &&
                  editingCell.field === 'value' ? (
                    <InlineEditInput
                      aria-label={t('editing.props.editValue')}
                      autoFocus
                      value={editingDraft}
                      onChange={event => setEditingDraft(event.target.value)}
                      onKeyDown={event => {
                        if (event.key === 'Enter') {
                          commitEditing()
                        }
                        if (event.key === 'Escape') {
                          stopEditing()
                        }
                      }}
                      onBlur={commitEditing}
                    />
                  ) : (
                    <span onDoubleClick={() => startEditing(index, 'value')}>
                      <ExpandableValue
                        value={value}
                        width={nodeInspectorWidth}
                        type={type}
                        t={t}
                      />
                    </span>
                  )}
                </ValueCell>
                <CopyCell>
                  {editable && !readOnlyKeySet.has(key) ? (
                    <InlineActionButton
                      aria-label={t('editing.props.removeProperty', { key })}
                      title={t('editing.props.removeProperty', { key })}
                      onClick={() => removeProperty(index)}
                    >
                      <TrashIcon width={12} />
                    </InlineActionButton>
                  ) : editable ? (
                    <ActionSpacer />
                  ) : null}
                  <ClipboardCopier
                    titleText={t('editing.props.copyKeyValue')}
                    textToCopy={`${key}: ${value}`}
                    iconSize={12}
                  />
                </CopyCell>
              </tr>
            ))}
          </tbody>
        </AlternatingTable>
      </StyledInlineList>
      {editable && (
        <AddPropertyContainer>
          <InlineEditInput
            aria-label={t('editing.props.newKey')}
            placeholder={t('editing.props.newKeyPlaceholder')}
            value={newPropertyKey}
            onChange={event => setNewPropertyKey(event.target.value)}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                addProperty()
              }
            }}
          />
          <InlineEditInput
            aria-label={t('editing.props.newValue')}
            placeholder={t('editing.props.newValuePlaceholder')}
            value={newPropertyValue}
            onChange={event => setNewPropertyValue(event.target.value)}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                addProperty()
              }
            }}
          />
          <InlineActionButton
            aria-label={t('editing.props.addProperty')}
            title={t('editing.props.addProperty')}
            onClick={addProperty}
          >
            <PlusIcon width={14} />
          </InlineActionButton>
        </AddPropertyContainer>
      )}
      <ShowMoreOrAll
        total={Math.max(totalNumItems, properties.length)}
        shown={properties.length}
        moreStep={moreStep}
        onMore={onMoreClick}
      />
    </>
  )
}
