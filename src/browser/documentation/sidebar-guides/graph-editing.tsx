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

import { BuiltInGuideSidebarSlide } from '../../modules/Carousel/Slide'

function Slide1() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('guide.s1.title')}</h3>
      <p className="lead">
        <em>{t('guide.s1.lead')}</em>
      </p>
      <p>{t('guide.s1.desc')}</p>
      <ul className="big">
        <li>{t('guide.s1.li1')}</li>
        <li>{t('guide.s1.li2')}</li>
        <li>{t('guide.s1.li3')}</li>
      </ul>
    </BuiltInGuideSidebarSlide>
  )
}

function Slide2() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('guide.s2.title')}</h3>
      <p className="lead">
        <em>{t('guide.s2.lead')}</em>
      </p>
      <h4>{t('guide.s2.createTitle')}</h4>
      <p>{t('guide.s2.createDesc')}</p>
      <h4>{t('guide.s2.labelsTitle')}</h4>
      <p>{t('guide.s2.labelsDesc')}</p>
      <h4>{t('guide.s2.deleteTitle')}</h4>
      <p>{t('guide.s2.deleteDesc')}</p>
    </BuiltInGuideSidebarSlide>
  )
}

function Slide3() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('guide.s3.title')}</h3>
      <p className="lead">
        <em>{t('guide.s3.lead')}</em>
      </p>
      <h4>{t('guide.s3.editTitle')}</h4>
      <p>{t('guide.s3.editDesc')}</p>
      <h4>{t('guide.s3.addTitle')}</h4>
      <p>{t('guide.s3.addDesc')}</p>
      <h4>{t('guide.s3.removeTitle')}</h4>
      <p>{t('guide.s3.removeDesc')}</p>
      <h4>{t('guide.s3.validationTitle')}</h4>
      <p>{t('guide.s3.validationDesc')}</p>
    </BuiltInGuideSidebarSlide>
  )
}

function Slide4() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('guide.s4.title')}</h3>
      <p className="lead">
        <em>{t('guide.s4.lead')}</em>
      </p>
      <h4>{t('guide.s4.createTitle')}</h4>
      <p>{t('guide.s4.createDesc')}</p>
      <h4>{t('guide.s4.typeTitle')}</h4>
      <p>{t('guide.s4.typeDesc')}</p>
      <h4>{t('guide.s4.reverseTitle')}</h4>
      <p>{t('guide.s4.reverseDesc')}</p>
      <h4>{t('guide.s4.reconnectTitle')}</h4>
      <p>{t('guide.s4.reconnectDesc')}</p>
      <h4>{t('guide.s4.deleteTitle')}</h4>
      <p>{t('guide.s4.deleteDesc')}</p>
    </BuiltInGuideSidebarSlide>
  )
}

function Slide5() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('guide.s5.title')}</h3>
      <p className="lead">
        <em>{t('guide.s5.lead')}</em>
      </p>
      <p>{t('guide.s5.desc1')}</p>
      <p>{t('guide.s5.desc2')}</p>
      <p>{t('guide.s5.desc3')}</p>
    </BuiltInGuideSidebarSlide>
  )
}

function Slide6() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('guide.s6.title')}</h3>
      <p className="lead">
        <em>{t('guide.s6.lead')}</em>
      </p>
      <p>{t('guide.s6.desc')}</p>
      <h4>{t('guide.s6.categoriesTitle')}</h4>
      <ul>
        <li>
          <b style={{ color: '#5cb85c' }}>{t('guide.s6.createLabel')}</b>
          {' \u2014 '}
          {t('guide.s6.createDesc')}
        </li>
        <li>
          <b style={{ color: '#d9534f' }}>{t('guide.s6.deleteLabel')}</b>
          {' \u2014 '}
          {t('guide.s6.deleteDesc')}
        </li>
        <li>
          <b style={{ color: '#5bc0de' }}>{t('guide.s6.modifyLabel')}</b>
          {' \u2014 '}
          {t('guide.s6.modifyDesc')}
        </li>
      </ul>
      <h4>{t('guide.s6.saveTitle')}</h4>
      <p>{t('guide.s6.saveDesc')}</p>
      <p>{t('guide.s6.revertDesc')}</p>
    </BuiltInGuideSidebarSlide>
  )
}

const title = 'Graph Editing Guide'
const identifier = 'graph-editing'
const slides = [
  <Slide1 key="s1" />,
  <Slide2 key="s2" />,
  <Slide3 key="s3" />,
  <Slide4 key="s4" />,
  <Slide5 key="s5" />,
  <Slide6 key="s6" />
]

export default { title, identifier, slides }
