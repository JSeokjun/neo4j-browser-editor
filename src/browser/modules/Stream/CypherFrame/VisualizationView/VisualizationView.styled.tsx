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
import styled from 'styled-components'

import { dim } from 'browser-styles/constants'

export const StyledVisContainer = styled.div<{ isFullscreen: boolean }>`
  position: relative;
  width: 100%;
  height: ${props =>
    props.isFullscreen
      ? '100%'
      : dim.frameBodyHeight - dim.frameTitlebarHeight * 2 + 'px'};
  > svg {
    width: 100%;
  }
  > .neod3viz .node .ring {
    fill: none;
    opacity: 0;
    stroke: #6ac6ff;
  }
  > .neod3viz .node.selected .ring {
    stroke: #fdcc59;
  }
  > .neod3viz .node.selected:hover .ring {
    stroke: #6ac6ff;
  }
  > .neod3viz .node:hover .ring,
  > .neod3viz .node.selected .ring {
    opacity: 0.3;
  }
  > .neod3viz .relationship .overlay {
    opacity: 0;
    fill: #6ac6ff;
  }
  > .neod3viz .relationship.selected .overlay {
    fill: #fdcc59;
  }
  > .neod3viz .relationship.selected:hover .overlay {
    fill: #6ac6ff;
  }
  > .neod3viz .relationship:hover .overlay,
  > .neod3viz .relationship.selected .overlay {
    opacity: 0.3;
  }

  > .neod3viz .remove_node,
  .expand_node:hover {
    border: 2px #000 solid;
  }

  > .neod3viz .b-outline,
  .neod3viz .ring,
  .neod3viz .context-menu-item {
    cursor: pointer;
  }

  > .context-menu-item:hover {
    fill: #b9b9b9;
    font-size: 14px;
  }

  > path.context-menu-item {
    stroke-width: 2px;
    fill: #d2d5da;
  }

  > text.context-menu-item {
    fill: #fff;
    text-anchor: middle;
    pointer-events: none;
    font-size: 14px;
  }
`

export const StyledEditActionBar = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 4px;
  background: ${props => props.theme.editorBackground};
  box-shadow: ${props => props.theme.standardShadow};
`

export const StyledNodeActionBar = styled.div`
  position: absolute;
  top: 48px;
  left: 8px;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 4px;
  background: ${props => props.theme.editorBackground};
  box-shadow: ${props => props.theme.standardShadow};
`

export const StyledEditActionButton = styled.button<{ primary?: boolean }>`
  border: 1px solid
    ${props =>
      props.primary
        ? props.theme.link
        : props.theme.frameControlButtonTextColor};
  background: ${props => (props.primary ? props.theme.link : 'transparent')};
  color: ${props =>
    props.primary ? props.theme.editorBackground : props.theme.primaryText};
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const StyledEditStatus = styled.span`
  font-size: 12px;
  color: ${props => props.theme.primaryText};
  margin-right: 4px;
`

export const StyledToastContainer = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 4;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const StyledToast = styled.div<{ kind: 'success' | 'error' }>`
  min-width: 220px;
  max-width: 360px;
  padding: 8px 10px;
  border-radius: 4px;
  box-shadow: ${props => props.theme.standardShadow};
  background: ${props => props.theme.editorBackground};
  color: ${props => props.theme.primaryText};
  border-left: 3px solid
    ${props =>
      props.kind === 'success' ? props.theme.success : props.theme.error};
  font-size: 12px;
`

export const StyledChangesOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 10;
  background: ${props => props.theme.secondaryBackground};
  display: flex;
  flex-direction: column;
`

export const StyledChangesPanel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`

export const StyledChangesPanelHeader = styled.div`
  padding: 16px 20px 12px;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.primaryText};
  border-bottom: 1px solid ${props => props.theme.inFrameBorder};
`

export const StyledChangesList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 12px;
`

export const StyledChangeItem = styled.div<{
  kind: 'create' | 'delete' | 'modify'
}>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  margin-bottom: 4px;
  border-radius: 4px;
  font-size: 12px;
  color: ${props => props.theme.primaryText};
  background: ${props => props.theme.editorBackground};
  border-left: 3px solid
    ${props =>
      props.kind === 'create'
        ? props.theme.success || '#4cd950'
        : props.kind === 'delete'
          ? props.theme.error || '#df4d3b'
          : props.theme.link || '#58c8e3'};
`

export const StyledChangeItemBadge = styled.span<{
  kind: 'create' | 'delete' | 'modify'
}>`
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.5px;
  padding: 2px 5px;
  border-radius: 3px;
  color: #fff;
  background: ${props =>
    props.kind === 'create'
      ? props.theme.success || '#4cd950'
      : props.kind === 'delete'
        ? props.theme.error || '#df4d3b'
        : props.theme.link || '#58c8e3'};
  flex-shrink: 0;
`

export const StyledChangeItemEmpty = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${props => props.theme.preText};
  font-size: 13px;
`

export const StyledChangesPanelActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px 20px;
  border-top: 1px solid ${props => props.theme.inFrameBorder};
`
