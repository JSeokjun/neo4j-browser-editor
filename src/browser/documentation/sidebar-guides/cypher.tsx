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
      <p className="lead">
        <em>{t('cypher.s1.lead')}</em>
      </p>
      <p>{t('cypher.s1.desc')}</p>
      <ul className="big">
        <li>{t('cypher.s1.li1')}</li>
        <li>{t('cypher.s1.li2')}</li>
        <li>{t('cypher.s1.li3')}</li>
      </ul>
    </BuiltInGuideSidebarSlide>
  )
}

function Slide2() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('cypher.s2.title')}</h3>
      <p className="lead">
        <em>{t('cypher.s2.lead')}</em>
      </p>
      <p>{t('cypher.s2.desc')}</p>
      <p>
        <b>NOTE:</b> {t('cypher.s2.note')}
      </p>
      <ol>
        <li>
          {t('cypher.s2.clickCode')}
          <pre className="pre-scrollable code runnable">
            {
              "CREATE (ee:Person {name: 'Emil', from: 'Sweden', kloutScore: 99})"
            }
          </pre>
          <ul style={{ marginLeft: '10px', paddingLeft: '10px' }}>
            <li>
              <code>CREATE</code> {t('cypher.s2.createExplain')}
            </li>
            <li>
              <code>()</code> {t('cypher.s2.parenExplain')}
            </li>
            <li>
              <code>ee:Person</code> {t('cypher.s2.varExplain')}
            </li>
            <li>
              <code>{'{}'}</code> {t('cypher.s2.propsExplain')}
            </li>
          </ul>
        </li>
        <li>{t('cypher.s2.runButton')}</li>
      </ol>
    </BuiltInGuideSidebarSlide>
  )
}

function Slide3() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('cypher.s3.title')}</h3>
      <p className="lead">
        <em>{t('cypher.s3.lead')}</em>
      </p>
      <p>{t('cypher.s3.desc')}</p>
      <ol>
        <li>
          {t('cypher.s3.clickCode')}
          <pre className="pre-scrollable code runnable">
            {`MATCH (ee:Person) WHERE ee.name = 'Emil' RETURN ee;`}
          </pre>
          <ul style={{ marginLeft: '10px', paddingLeft: '10px' }}>
            <li>
              <code>MATCH</code> {t('cypher.s3.matchExplain')}
            </li>
            <li>
              <code>(ee:Person)</code> {t('cypher.s3.patternExplain')}
            </li>
            <li>
              <code>WHERE</code> {t('cypher.s3.whereExplain')}
            </li>
            <li>
              <code>{`ee.name = 'Emil'`}</code> {t('cypher.s3.compareExplain')}
            </li>
            <li>
              <code>RETURN</code> {t('cypher.s3.returnExplain')}
            </li>
          </ul>
        </li>
        <li>{t('cypher.s3.runButton')}</li>
        <br />
      </ol>
    </BuiltInGuideSidebarSlide>
  )
}

function Slide4() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('cypher.s4.title')}</h3>
      <p className="lead">
        <em>{t('cypher.s4.lead')}</em>
      </p>
      <p>{t('cypher.s4.desc')}</p>
      <pre className="pre-scrollable code runnable">
        {`MATCH (ee:Person) WHERE ee.name = 'Emil'
CREATE (js:Person { name: 'Johan', from: 'Sweden', learn: 'surfing' }),
(ir:Person { name: 'Ian', from: 'England', title: 'author' }),
(rvb:Person { name: 'Rik', from: 'Belgium', pet: 'Orval' }),
(ally:Person { name: 'Allison', from: 'California', hobby: 'surfing' }),
(ee)-[:KNOWS {since: 2001}]->(js),(ee)-[:KNOWS {rating: 5}]->(ir),
(js)-[:KNOWS]->(ir),(js)-[:KNOWS]->(rvb),
(ir)-[:KNOWS]->(js),(ir)-[:KNOWS]->(ally),
(rvb)-[:KNOWS]->(ally)`}
      </pre>
      <br />
    </BuiltInGuideSidebarSlide>
  )
}

function Slide5() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('cypher.s5.title')}</h3>
      <p className="lead">
        <em>{t('cypher.s5.lead')}</em>
      </p>
      <p className="summary">{t('cypher.s5.desc')}</p>
      <pre className="pre-scrollable code runnable">
        {`MATCH (ee:Person)-[:KNOWS]-(friends)
WHERE ee.name = 'Emil' RETURN ee, friends`}
      </pre>
      <ul style={{ marginLeft: '10px', paddingLeft: '10px' }}>
        <li>
          <code>MATCH</code> {t('cypher.s5.matchExplain')}
        </li>
        <li>
          <code>(ee)</code> {t('cypher.s5.eeExplain')}
        </li>
        <li>
          <code>-[:KNOWS]-</code> {t('cypher.s5.knowsExplain')}
        </li>
        <li>
          <code>(friends)</code> {t('cypher.s5.friendsExplain')}
        </li>
        <li>
          <code>RETURN</code> {t('cypher.s5.returnExplain')}
        </li>
      </ul>
    </BuiltInGuideSidebarSlide>
  )
}

function Slide6() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('cypher.s6.title')}</h3>
      <ul className="undecorated">
        <li>
          <a data-exec="guide movie-graph">{t('cypher.s6.movieLink')}</a>
        </li>
        <li>
          <a data-exec="guide northwind-graph">
            {t('cypher.s6.northwindLink')}
          </a>
        </li>
      </ul>
      <br />
      <h3>{t('cypher.s6.references')}</h3>
      <ul className="undecorated">
        <li>
          <a help-topic="commands">{t('cypher.s6.helpCommands')}</a>
        </li>
        <li>
          <a help-topic="keys">{t('cypher.s6.helpKeys')}</a>
        </li>
      </ul>
    </BuiltInGuideSidebarSlide>
  )
}

const title = 'Cypher Guide'
const identifier = 'cypher'
const slides = [
  <Slide1 key="s1" />,
  <Slide2 key="s2" />,
  <Slide3 key="s3" />,
  <Slide4 key="s4" />,
  <Slide5 key="s5" />,
  <Slide6 key="s6" />
]

export default { title, identifier, slides }
