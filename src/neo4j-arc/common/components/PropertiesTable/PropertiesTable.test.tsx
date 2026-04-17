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
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'

import {
  PropertiesTable,
  ELLIPSIS,
  MAX_LENGTH_NARROW,
  MAX_LENGTH_WIDE,
  WIDE_VIEW_THRESHOLD
} from './PropertiesTable'
import { VizItemProperty } from 'neo4j-arc/common'

describe('<DetailsPane />', () => {
  type RenderComponentProps = {
    propertyList?: VizItemProperty[]
    width?: number
  }
  const renderComponent = ({
    propertyList = [],
    width = 200
  }: RenderComponentProps) => {
    return render(
      <PropertiesTable
        visibleProperties={propertyList}
        onMoreClick={jest.fn()}
        totalNumItems={propertyList.length}
        moreStep={1000}
        nodeInspectorWidth={width}
      />
    )
  }

  test('should handle show more on long property value', async () => {
    const fullText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    const mockProperty = {
      key: 'propWithLongValue',
      type: 'string',
      value: fullText
    }
    renderComponent({
      propertyList: [mockProperty],
      width: WIDE_VIEW_THRESHOLD - 1
    })

    const expectedCutValue = fullText.slice(0, MAX_LENGTH_NARROW) + ELLIPSIS

    await waitFor(() =>
      expect(screen.getByText(expectedCutValue)).toBeInTheDocument()
    )
    expect(
      screen.getByRole('button', {
        name: 'Show all'
      })
    ).toBeInTheDocument()
    expect(screen.queryByText(fullText)).not.toBeInTheDocument()

    const showAllButton = screen.getByRole('button', {
      name: 'Show all'
    })
    showAllButton.click()

    await waitFor(() => expect(screen.getByText(fullText)).toBeInTheDocument())
    expect(
      screen.queryByRole('button', { name: 'Show all' })
    ).not.toBeInTheDocument()
  })

  test('should cut a long property value to longer size when in wide mode', async () => {
    const fullText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    const mockProperty = {
      key: 'propWithLongValue',
      type: 'string',
      value: fullText
    }
    renderComponent({
      propertyList: [mockProperty],
      width: WIDE_VIEW_THRESHOLD + 1
    })

    const expectedCutValue = fullText.slice(0, MAX_LENGTH_WIDE) + ELLIPSIS

    await waitFor(() =>
      expect(screen.getByText(expectedCutValue)).toBeInTheDocument()
    )
  })

  test('should support inline editing of key and value on double click', async () => {
    const onPropertiesChange = jest.fn()
    render(
      <PropertiesTable
        visibleProperties={[{ key: 'name', type: 'string', value: 'neo' }]}
        onMoreClick={jest.fn()}
        totalNumItems={1}
        moreStep={1000}
        nodeInspectorWidth={400}
        editable
        onPropertiesChange={onPropertiesChange}
      />
    )

    fireEvent.doubleClick(screen.getByText('name'))
    const keyInput = screen.getByLabelText('Edit property key')
    fireEvent.change(keyInput, { target: { value: 'display_name' } })
    fireEvent.keyDown(keyInput, { key: 'Enter' })

    await waitFor(() => {
      expect(onPropertiesChange).toHaveBeenCalledWith([
        { key: 'display_name', type: 'string', value: 'neo' }
      ])
    })

    fireEvent.doubleClick(screen.getByText('neo'))
    const valueInput = screen.getByLabelText('Edit property value')
    fireEvent.change(valueInput, { target: { value: 'neo4j' } })
    fireEvent.keyDown(valueInput, { key: 'Enter' })

    await waitFor(() => {
      expect(onPropertiesChange).toHaveBeenLastCalledWith([
        { key: 'display_name', type: 'string', value: 'neo4j' }
      ])
    })
  })

  test('should not allow inline editing for readonly keys', () => {
    const onPropertiesChange = jest.fn()
    render(
      <PropertiesTable
        visibleProperties={[{ key: '<id>', type: 'string', value: '12' }]}
        onMoreClick={jest.fn()}
        totalNumItems={1}
        moreStep={1000}
        nodeInspectorWidth={400}
        editable
        readOnlyKeys={['<id>', '<element-id>']}
        onPropertiesChange={onPropertiesChange}
      />
    )

    fireEvent.doubleClick(screen.getByText('<id>'))
    expect(screen.queryByLabelText('Edit property key')).not.toBeInTheDocument()
    expect(onPropertiesChange).not.toHaveBeenCalled()
  })

  test('should support adding and removing properties in editable mode', async () => {
    const onPropertiesChange = jest.fn()
    render(
      <PropertiesTable
        visibleProperties={[{ key: 'name', type: 'string', value: 'neo' }]}
        onMoreClick={jest.fn()}
        totalNumItems={1}
        moreStep={1000}
        nodeInspectorWidth={400}
        editable
        onPropertiesChange={onPropertiesChange}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Add property' }))
    fireEvent.change(screen.getByLabelText('New property key'), {
      target: { value: 'age' }
    })
    fireEvent.change(screen.getByLabelText('New property value'), {
      target: { value: '5' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Add property' }))

    await waitFor(() => {
      expect(onPropertiesChange).toHaveBeenCalledWith([
        { key: 'name', type: 'string', value: 'neo' },
        { key: 'age', type: 'string', value: '5' }
      ])
    })

    fireEvent.click(screen.getByRole('button', { name: 'Remove property age' }))
    await waitFor(() => {
      expect(onPropertiesChange).toHaveBeenLastCalledWith([
        { key: 'name', type: 'string', value: 'neo' }
      ])
    })
  })
})
