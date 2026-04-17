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
import React from 'react'
import { useT } from 'shared/i18n'

import { BuiltInGuideSidebarSlide } from 'browser/modules/Carousel/Slide'

function Slide1() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <p>{t('unfound.desc')}</p>
      <h5>{t('unfound.try')}</h5>
      <ul className="undecorated">
        <li>
          <a data-exec="help">:help</a> {t('unfound.helpDesc')}
        </li>
        <li>
          <a data-exec="guide intro">:guide intro</a> {t('unfound.guideDesc')}
        </li>
        <li>
          <a href="https://neo4j.com/docs/">Neo4j Documentation</a>{' '}
          {t('unfound.docsDesc')}
        </li>
      </ul>
    </BuiltInGuideSidebarSlide>
  )
}

const title = 'Not found'
const identifier = 'unfound'
const slides = [<Slide1 key="first" />]

export default { title, slides, identifier, isError: true }
