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

import { isMac } from 'neo4j-arc/common'

import { BuiltInGuideSidebarSlide } from '../../modules/Carousel/Slide'

function Slide1() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('intro.s1.title')}</h3>
      <p>{t('intro.s1.desc')}</p>
      <ul className="big">
        <li>{t('intro.s1.li1')}</li>
        <li>{t('intro.s1.li2')}</li>
        <li>{t('intro.s1.li3')}</li>
        <li>{t('intro.s1.li4')}</li>
      </ul>
    </BuiltInGuideSidebarSlide>
  )
}

function Slide2() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('intro.s2.title')}</h3>
      <p className="lead">
        <em>{t('intro.s2.lead')}</em>
      </p>
      <p>{t('intro.s2.desc')}</p>
      <table>
        <tbody>
          <tr>
            <td>{t('intro.s2.execute')}</td>
            <td className="padding5">
              <div className="key code">
                {isMac ? '<Cmd-Return>' : '<Ctrl-Return>'}
              </div>
            </td>
          </tr>
          <tr>
            <td>{t('intro.s2.prevHistory')}</td>
            <td className="padding5">
              <div className="key code">
                {isMac ? '<Cmd-Up-Arrow>' : '<Ctrl-Up-Arrow>'}
              </div>
            </td>
          </tr>
          <tr>
            <td>{t('intro.s2.nextHistory')}</td>
            <td className="padding5">
              <div className="key code">
                {isMac ? '<Cmd-Down-Arrow>' : '<Ctrl-Down-Arrow>'}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <p></p>
      <p>{t('intro.s2.keybindingHint')}</p>
      <br />
      <video autoPlay loop muted playsInline>
        <source src="./assets/images/Keystrokes.mp4" type="video/mp4" />
      </video>
    </BuiltInGuideSidebarSlide>
  )
}

function Slide3() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('intro.s3.title')}</h3>
      <p className="lead">
        <em>{t('intro.s3.lead')}</em>
      </p>
      <p>{t('intro.s3.desc')}</p>
      <ul>
        <li>{t('intro.s3.li1')}</li>
        <li>{t('intro.s3.li2')}</li>
        <li>{t('intro.s3.li3')}</li>
        <li>{t('intro.s3.li4')}</li>
      </ul>
      <br />
      <img
        src="./assets/images/Stream.png"
        className="img-responsive padding5"
      />
    </BuiltInGuideSidebarSlide>
  )
}

function Slide4() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('intro.s4.title')}</h3>
      <p className="lead">
        <em>{t('intro.s4.lead')}</em>
      </p>
      <p>{t('intro.s4.desc1')}</p>
      <p>{t('intro.s4.desc2')}</p>
      <br />
      <video autoPlay loop muted playsInline>
        <source src="./assets/images/ReusableFrame.mp4" type="video/mp4" />
      </video>
    </BuiltInGuideSidebarSlide>
  )
}

function Slide5() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('intro.s5.title')}</h3>
      <p className="lead">
        <em>{t('intro.s5.lead')}</em>
      </p>
      {t('intro.s5.desc')}
      <br />
      <img
        src="./assets/images/SidebarDB_Iinfo.png"
        className="img-responsive padding5"
      />
    </BuiltInGuideSidebarSlide>
  )
}

function Slide6() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('intro.s6.title')}</h3>
      <p className="lead">
        <em>{t('intro.s6.lead')}</em>
      </p>
      <p>{t('intro.s6.desc1')}</p>
      <p>{t('intro.s6.desc2')}</p>
      <br />
      <video autoPlay loop muted playsInline>
        <source src="./assets/images/Favorites.mp4" type="video/mp4" />
      </video>
    </BuiltInGuideSidebarSlide>
  )
}

function Slide7() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('intro.s7.title')}</h3>
      <p className="lead">
        <em>{t('intro.s7.lead')}</em>
      </p>
      <p>{t('intro.s7.desc1')}</p>
      <p></p>
      <p>{t('intro.s7.desc2')}</p>
      <br />
      <video autoPlay loop muted playsInline>
        <source src="./assets/images/ProjectFiles.mp4" type="video/mp4" />
      </video>
    </BuiltInGuideSidebarSlide>
  )
}

function Slide8() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('intro.s8.title')}</h3>
      <ul className="undecorated">
        <li>
          <a data-exec="guide concepts">{t('intro.s8.conceptsLink')}</a>
        </li>
        <li>
          <a data-exec="guide cypher">{t('intro.s8.cypherLink')}</a>
        </li>
      </ul>
      <br />
      <h3>{t('intro.s8.references')}</h3>
      <ul className="undecorated">
        <li>
          <a help-topic="commands">{t('intro.s8.helpCommands')}</a>
        </li>
        <li>
          <a help-topic="keys">{t('intro.s8.helpKeys')}</a>
        </li>
      </ul>
    </BuiltInGuideSidebarSlide>
  )
}

const title = 'Intro Guide'
const identifier = 'intro'
const slides = [
  <Slide1 key="s1" />,
  <Slide2 key="s2" />,
  <Slide3 key="s3" />,
  <Slide4 key="s4" />,
  <Slide5 key="s5" />,
  <Slide6 key="s6" />,
  <Slide7 key="s7" />,
  <Slide8 key="s8" />
]

export default { title, identifier, slides }
