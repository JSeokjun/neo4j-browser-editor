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
import React, { useState } from 'react'

import {
  numberToUSLocale,
  ShowMoreOrAll,
  WarningMessage
} from 'neo4j-arc/common'
import { GraphStyleModel } from '../../models/GraphStyle'
import { GraphStats } from '../../utils/mapper'

import {
  PaneBody,
  PaneHeader,
  PaneBodySectionHeaderWrapper,
  PaneBodySectionSmallText,
  PaneBodySectionTitle,
  StyledLegendInlineList,
  PaneWrapper
} from './styled'

import { NodeLabel } from './NodeLabel'
import { RelType } from './RelType'

type PaneBodySectionHeaderProps = {
  title: string
  numOfElementsVisible: number
  totalNumOfElements: number
  t?: (key: string, params?: Record<string, string | number>) => string
}
function PaneBodySectionHeader({
  title,
  numOfElementsVisible,
  totalNumOfElements,
  t
}: PaneBodySectionHeaderProps) {
  const translate = t || ((key: string) => key)
  return (
    <PaneBodySectionHeaderWrapper>
      <PaneBodySectionTitle>{title}</PaneBodySectionTitle>
      {numOfElementsVisible < totalNumOfElements && (
        <PaneBodySectionSmallText>
          {translate('overview.showing', {
            visible: numOfElementsVisible,
            total: totalNumOfElements
          })}
        </PaneBodySectionSmallText>
      )}
    </PaneBodySectionHeaderWrapper>
  )
}

export type OverviewPaneProps = {
  graphStyle: GraphStyleModel
  hasTruncatedFields: boolean
  nodeCount: number | null
  relationshipCount: number | null
  stats: GraphStats
  infoMessage: string | null
  t?: (key: string, params?: Record<string, string | number>) => string
}

export const OVERVIEW_STEP_SIZE = 50

function DefaultOverviewPane({
  graphStyle,
  hasTruncatedFields,
  nodeCount,
  relationshipCount,
  stats,
  infoMessage,
  t: tProp
}: OverviewPaneProps): JSX.Element {
  const t = tProp || ((key: string) => key)
  const [maxLabelsCount, setMaxLabelsCount] = useState(OVERVIEW_STEP_SIZE)
  const [maxRelationshipsCount, setMaxRelationshipsCount] =
    useState(OVERVIEW_STEP_SIZE)

  const onMoreLabelsClick = (numMore: number) => {
    setMaxLabelsCount(maxLabelsCount + numMore)
  }

  const onMoreRelationshipsClick = (numMore: number) => {
    setMaxRelationshipsCount(maxRelationshipsCount + numMore)
  }

  const { relTypes, labels } = stats
  const visibleLabelKeys = labels
    ? Object.keys(labels).slice(0, maxLabelsCount)
    : []
  const visibleRelationshipKeys = relTypes
    ? Object.keys(relTypes).slice(0, maxRelationshipsCount)
    : []
  const totalNumOfLabelTypes = labels ? Object.keys(labels).length : 0
  const totalNumOfRelTypes = relTypes ? Object.keys(relTypes).length : 0

  return (
    <PaneWrapper>
      <PaneHeader>{t('overview.title')}</PaneHeader>
      <PaneBody>
        {labels && visibleLabelKeys.length !== 0 && (
          <div>
            <PaneBodySectionHeader
              title={t('overview.nodeLabels')}
              numOfElementsVisible={visibleLabelKeys.length}
              totalNumOfElements={totalNumOfLabelTypes}
              t={t}
            />
            <StyledLegendInlineList>
              {visibleLabelKeys.map((label: string) => (
                <NodeLabel
                  key={label}
                  graphStyle={graphStyle}
                  allNodesCount={nodeCount}
                  selectedLabel={{
                    label,
                    propertyKeys: Object.keys(labels[label].properties),
                    count: labels[label].count
                  }}
                />
              ))}
            </StyledLegendInlineList>
            <ShowMoreOrAll
              total={totalNumOfLabelTypes}
              shown={visibleLabelKeys.length}
              moreStep={OVERVIEW_STEP_SIZE}
              onMore={onMoreLabelsClick}
            />
          </div>
        )}
        {relTypes && visibleRelationshipKeys.length !== 0 && (
          <div>
            <PaneBodySectionHeader
              title={t('overview.relTypes')}
              numOfElementsVisible={visibleRelationshipKeys.length}
              totalNumOfElements={totalNumOfRelTypes}
              t={t}
            />
            <StyledLegendInlineList>
              {visibleRelationshipKeys.map(relType => (
                <RelType
                  key={relType}
                  graphStyle={graphStyle}
                  selectedRelType={{
                    relType,
                    propertyKeys: Object.keys(relTypes[relType].properties),
                    count: relTypes[relType].count
                  }}
                />
              ))}
            </StyledLegendInlineList>
            <ShowMoreOrAll
              total={totalNumOfRelTypes}
              shown={visibleRelationshipKeys.length}
              moreStep={OVERVIEW_STEP_SIZE}
              onMore={onMoreRelationshipsClick}
            />
          </div>
        )}
        <div style={{ paddingBottom: '10px' }}>
          {hasTruncatedFields && (
            <>
              <WarningMessage text={t('overview.truncatedFields')} />
              <br />
            </>
          )}
          {infoMessage && (
            <>
              <WarningMessage text={infoMessage} />
              <br />
            </>
          )}
          {nodeCount !== null &&
            relationshipCount !== null &&
            t('overview.displaying', {
              nodes: numberToUSLocale(nodeCount) || '0',
              rels: numberToUSLocale(relationshipCount) || '0'
            })}
        </div>
      </PaneBody>
    </PaneWrapper>
  )
}

export default DefaultOverviewPane
