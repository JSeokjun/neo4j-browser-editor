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
      <h3>{t('concepts.s1.title')}</h3>
      <p className="lead">
        <em>{t('concepts.s1.lead')}</em>
      </p>
      <p>{t('concepts.s1.desc')}</p>
      <ul className="big">
        <li>{t('concepts.s1.li1')}</li>
        <li>{t('concepts.s1.li2')}</li>
        <li>{t('concepts.s1.li3')}</li>
        <li>{t('concepts.s1.li4')}</li>
      </ul>
    </BuiltInGuideSidebarSlide>
  )
}

function Slide2() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('concepts.s2.title')}</h3>
      <p className="lead">
        <em>{t('concepts.s2.lead')}</em>
      </p>
      <p>{t('concepts.s2.desc')}</p>
      <ol>
        <li>{t('concepts.s2.li1')}</li>
        <li>{t('concepts.s2.li2')}</li>
        <li>{t('concepts.s2.li3')}</li>
      </ol>
      <br />
      <img src="./assets/images/one_node.png" className="img-responsive" />
      <br />
      <p className="paragraph">
        <em>
          <p>{t('concepts.s2.keyInfo')}</p>
          <ul>
            <li>{t('concepts.s2.ki1')}</li>
            <li>{t('concepts.s2.ki2')}</li>
            <li>{t('concepts.s2.ki3')}</li>
          </ul>
        </em>
      </p>
    </BuiltInGuideSidebarSlide>
  )
}

function Slide3() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('concepts.s3.title')}</h3>
      <p className="lead">
        <em>{t('concepts.s3.lead')}</em>
      </p>
      <p>{t('concepts.s3.desc')}</p>
      <ol>
        <li>{t('concepts.s3.li1')}</li>
        <li>{t('concepts.s3.li2')}</li>
      </ol>
      <br />
      <img src="./assets/images/labeled_node.png" className="img-responsive" />
      <br />
      <p className="paragraph">
        <em>
          <p>{t('concepts.s3.keyInfo')}</p>
          <ul>
            <li>{t('concepts.s3.ki1')}</li>
            <li>{t('concepts.s3.ki2')}</li>
          </ul>
        </em>
      </p>
    </BuiltInGuideSidebarSlide>
  )
}

function Slide4() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('concepts.s4.title')}</h3>
      <p className="lead">
        <em>{t('concepts.s4.lead')}</em>
      </p>
      <p>{t('concepts.s4.desc')}</p>
      <ol>
        <li>{t('concepts.s4.li1')}</li>
        <li>{t('concepts.s4.li2')}</li>
        <li>{t('concepts.s4.li3')}</li>
        <li>{t('concepts.s4.li4')}</li>
        <li>{t('concepts.s4.li5')}</li>
      </ol>
      <br />
      <img src="./assets/images/more_nodes.png" className="img-responsive" />
      <br />
      <p className="paragraph">
        <em>
          <p>{t('concepts.s4.keyInfo')}</p>
          <ul>
            <li>{t('concepts.s4.ki1')}</li>
            <li>{t('concepts.s4.ki2')}</li>
            <li>{t('concepts.s4.ki3')}</li>
            <li>{t('concepts.s4.ki4')}</li>
          </ul>
        </em>
      </p>
    </BuiltInGuideSidebarSlide>
  )
}

function Slide5() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('concepts.s5.title')}</h3>
      <p className="lead">
        <em>{t('concepts.s5.lead')}</em>
      </p>
      <p>{t('concepts.s5.desc1')}</p>
      <p>{t('concepts.s5.desc2')}</p>
      <ol>
        <li>{t('concepts.s5.li1')}</li>
        <li>{t('concepts.s5.li2')}</li>
        <li>{t('concepts.s5.li3')}</li>
      </ol>
      <br />
      <img src="./assets/images/relationships.png" className="img-responsive" />
      <br />
      <p className="paragraph">
        <em>
          <p>{t('concepts.s5.keyInfo')}</p>
          <ul>
            <li>{t('concepts.s5.ki1')}</li>
            <li>{t('concepts.s5.ki2')}</li>
            <li>{t('concepts.s5.ki3')}</li>
          </ul>
        </em>
      </p>
    </BuiltInGuideSidebarSlide>
  )
}

function Slide6() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('concepts.s6.title')}</h3>
      <p className="lead">
        <em>{t('concepts.s6.lead')}</em>
      </p>
      <p>{t('concepts.s6.desc')}</p>
      <ul>
        <li>{t('concepts.s6.li1')}</li>
        <li>{t('concepts.s6.li2')}</li>
        <li>{t('concepts.s6.li3')}</li>
      </ul>
      <br />
      <img src="./assets/images/rel-props.png" className="img-responsive" />
    </BuiltInGuideSidebarSlide>
  )
}

function Slide7() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('concepts.s7.title')}</h3>
      <ul className="undecorated">
        <li>
          <a data-exec="guide cypher">{t('concepts.s7.cypherLink')}</a>
        </li>
      </ul>
    </BuiltInGuideSidebarSlide>
  )
}

const title = 'Concepts Guide'
const category = 'guides'
const identifier = 'concepts'
const slides = [
  <Slide1 key="s1" />,
  <Slide2 key="s2" />,
  <Slide3 key="s3" />,
  <Slide4 key="s4" />,
  <Slide5 key="s5" />,
  <Slide6 key="s6" />,
  <Slide7 key="seventh" />
]

export default { title, category, identifier, slides }
