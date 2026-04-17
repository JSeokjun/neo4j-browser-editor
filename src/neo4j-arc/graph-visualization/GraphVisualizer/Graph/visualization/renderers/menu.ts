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
import { BaseType, Selection } from 'd3-selection'
import { arc as d3Arc } from 'd3-shape'

import { NodeModel } from '../../../../models/Node'
import Renderer from '../Renderer'
import { Visualization } from '../Visualization'
import icons from './d3Icons'

const noOp = () => undefined

const numberOfItemsInContextMenu = 5

const drawArc = function (radius: number, itemNumber: number, width = 30) {
  const startAngle =
    ((2 * Math.PI) / numberOfItemsInContextMenu) * (itemNumber - 1)
  const endAngle = startAngle + (2 * Math.PI) / numberOfItemsInContextMenu
  const innerRadius = Math.max(radius + 8, 20)
  return d3Arc()
    .innerRadius(innerRadius)
    .outerRadius(innerRadius + width)
    .startAngle(startAngle)
    .endAngle(endAngle)
    .padAngle(0.03)
}

const getSelectedNode = (node: NodeModel) => (node.selected ? [node] : [])

const attachContextEvent = (
  eventType: string,
  elements: [
    Selection<BaseType | SVGPathElement, NodeModel, BaseType, NodeModel>,
    Selection<BaseType | SVGGElement, NodeModel, BaseType, NodeModel>
  ],
  viz: Visualization,
  content: string,
  label: string
) => {
  elements.forEach(element => {
    element.on('mousedown.drag', (event: Event) => {
      event.stopPropagation()
      return null
    })
    element.on('mouseup', (_event: Event, node: NodeModel) =>
      viz.trigger(eventType, node)
    )
    element.on('mouseover', (_event: Event, node: NodeModel) => {
      node.contextMenu = {
        menuSelection: eventType,
        menuContent: content,
        label
      }
      return viz.trigger('menuMouseOver', node)
    })

    element.on('mouseout', (_event: Event, node: NodeModel) => {
      delete node.contextMenu
      return viz.trigger('menuMouseOut', node)
    })
  })
}

const createMenuItem = function (
  selection: Selection<SVGGElement, NodeModel, BaseType, unknown>,
  viz: Visualization,
  eventType: string,
  itemIndex: number,
  className: string,
  svgIconKey: 'Expand / Collapse' | 'Unlock' | 'Remove' | 'Delete' | 'Create',
  tooltip: string,
  iconScale = 0.7
) {
  const tab = selection
    .selectAll(`path.${className}`)
    .data(getSelectedNode)
    .join('path')
    .classed(className, true)
    .classed('context-menu-item', true)
    .attr('d', node => {
      // @ts-expect-error Expected 1-2 arguments, but got 0.ts(2554)
      return drawArc(node.radius, itemIndex, 1)()
    })

  const rawSvgIcon = icons[svgIconKey]
  const svgIcon = document.importNode(
    new DOMParser().parseFromString(rawSvgIcon, 'application/xml')
      .documentElement.firstChild as HTMLElement,
    true
  )
  const icon = selection
    .selectAll(`.icon.${className}`)
    .data(getSelectedNode)
    .join('g')
    .html(svgIcon.innerHTML)
    .classed('icon', true)
    .classed(className, true)
    .classed('context-menu-item', true)
    .attr('transform', (node: NodeModel) => {
      // @ts-expect-error
      const [cx, cy] = drawArc(node.radius, itemIndex).centroid()
      // Center the 24x24 icon at the arc centroid:
      // translate to centroid, scale 0.7, then shift back by half viewBox
      return `translate(${cx},${cy}) scale(${iconScale}) translate(-12,-12)`
    })
    .attr('color', (node: NodeModel) => {
      return viz.style.forNode(node).get('text-color-internal')
    })

  attachContextEvent(eventType, [tab, icon], viz, tooltip, rawSvgIcon)

  tab
    .transition()
    .duration(200)
    .attr('d', (node: NodeModel) => {
      // @ts-expect-error Expected 1-2 arguments, but got 0.ts(2554)
      return drawArc(node.radius, itemIndex)()
    })
    .selection()
    .exit<NodeModel>()
    .transition()
    .duration(200)
    .attr('d', (node: NodeModel) => {
      // @ts-expect-error Expected 1-2 arguments, but got 0.ts(2554)
      return drawArc(node.radius, itemIndex, 1)()
    })
    .remove()

  return icon
}

const donutRemoveNode = new Renderer<NodeModel>({
  name: 'donutRemoveNode',
  onGraphChange(selection, viz) {
    return createMenuItem(
      selection,
      viz,
      'nodeClose',
      1,
      'remove-node',
      'Remove',
      'Dismiss'
    )
  },

  onTick: noOp
})

const donutDeleteNode = new Renderer<NodeModel>({
  name: 'donutDeleteNode',
  onGraphChange(selection, viz) {
    return createMenuItem(
      selection,
      viz,
      'nodeDelete',
      4,
      'delete-node',
      'Delete',
      'Delete the node',
      0.85
    )
  },

  onTick: noOp
})

const donutCreateRelationship = new Renderer<NodeModel>({
  name: 'donutCreateRelationship',
  onGraphChange(selection, viz) {
    return createMenuItem(
      selection,
      viz,
      'nodeCreateRelationship',
      5,
      'create-relationship',
      'Create',
      'Create relationship from this node',
      1.0
    )
  },

  onTick: noOp
})

const donutExpandNode = new Renderer<NodeModel>({
  name: 'donutExpandNode',
  onGraphChange(selection, viz) {
    return createMenuItem(
      selection,
      viz,
      'nodeDblClicked',
      2,
      'expand-node',
      'Expand / Collapse',
      'Expand / Collapse child relationships'
    )
  },

  onTick: noOp
})

const donutUnlockNode = new Renderer<NodeModel>({
  name: 'donutUnlockNode',
  onGraphChange(selection, viz) {
    return createMenuItem(
      selection,
      viz,
      'nodeUnlock',
      3,
      'unlock-node',
      'Unlock',
      'Unlock the node to re-layout the graph'
    )
  },

  onTick: noOp
})

export const nodeMenuRenderer = [
  donutExpandNode,
  donutRemoveNode,
  donutUnlockNode,
  donutDeleteNode,
  donutCreateRelationship
]
