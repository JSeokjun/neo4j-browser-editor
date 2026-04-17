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
import { connect } from 'react-redux'

import { toKeyString } from 'neo4j-arc/common'

import {
  StyledSetting,
  StyledSettingLabel,
  StyledSettingTextInput
} from './styled'
import { CheckboxSelector, RadioSelector } from 'browser-components/Form'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerSection,
  DrawerSectionBody,
  DrawerSubHeader
} from 'browser-components/drawer/drawer-styled'
import FeatureToggle from 'browser/modules/FeatureToggle/FeatureToggle'
import { GlobalState } from 'shared/globalState'
import {
  disableExperimentalFeature,
  enableExperimentalFeature,
  experimentalFeatureSelfName,
  getExperimentalFeatures
} from 'shared/modules/experimentalFeatures/experimentalFeaturesDuck'
import * as actions from 'shared/modules/settings/settingsDuck'
import {
  TelemetrySettingSource,
  TelemetrySettings,
  getTelemetrySettings
} from 'shared/utils/selectors'
import { useT } from 'shared/i18n'
import { TranslationKey } from 'shared/i18n/translations'

type VisualSettingDef = {
  titleKey: TranslationKey
  settings: Array<{
    key: string
    displayNameKey: TranslationKey
    tooltipKey: TranslationKey
    type?: 'input' | 'radio' | 'checkbox' | 'info'
    options?: string[]
    onChange?: (value: any) => void
  }>
}

const visualSettingDefs: VisualSettingDef[] = [
  {
    titleKey: 'settings.ui',
    settings: [
      {
        key: 'theme',
        displayNameKey: 'settings.ui.theme',
        tooltipKey: 'settings.ui.theme.tooltip',
        type: 'radio',
        options: [
          actions.AUTO_THEME,
          actions.LIGHT_THEME,
          actions.OUTLINE_THEME,
          actions.DARK_THEME
        ]
      },
      {
        key: 'language',
        displayNameKey: 'settings.ui.language',
        tooltipKey: 'settings.ui.language.tooltip',
        type: 'radio',
        options: ['en', 'ko']
      },
      {
        key: 'codeFontLigatures',
        displayNameKey: 'settings.ui.codeFontLigatures',
        tooltipKey: 'settings.ui.codeFontLigatures.tooltip',
        type: 'checkbox'
      },
      {
        key: 'enableMultiStatementMode',
        displayNameKey: 'settings.ui.enableMultiStatementMode',
        tooltipKey: 'settings.ui.enableMultiStatementMode.tooltip',
        type: 'checkbox'
      }
    ]
  },
  {
    titleKey: 'settings.preferences',
    settings: [
      {
        key: 'initCmd',
        displayNameKey: 'settings.preferences.initCmd',
        tooltipKey: 'settings.preferences.initCmd.tooltip',
        type: 'input'
      },
      {
        key: 'connectionTimeout',
        displayNameKey: 'settings.preferences.connectionTimeout',
        tooltipKey: 'settings.preferences.connectionTimeout.tooltip',
        type: 'input'
      },
      {
        key: 'useReadTransactions',
        displayNameKey: 'settings.preferences.useReadTransactions',
        tooltipKey: 'settings.preferences.useReadTransactions.tooltip',
        type: 'checkbox'
      }
    ]
  },
  {
    titleKey: 'settings.resultFrames',
    settings: [
      {
        key: 'maxFrames',
        displayNameKey: 'settings.resultFrames.maxFrames',
        tooltipKey: 'settings.resultFrames.maxFrames.tooltip'
      },
      {
        key: 'maxHistory',
        displayNameKey: 'settings.resultFrames.maxHistory',
        tooltipKey: 'settings.resultFrames.maxHistory.tooltip'
      },
      {
        key: 'scrollToTop',
        displayNameKey: 'settings.resultFrames.scrollToTop',
        tooltipKey: 'settings.resultFrames.scrollToTop.tooltip',
        type: 'checkbox'
      }
    ]
  },
  {
    titleKey: 'settings.graphViz',
    settings: [
      {
        key: 'initialNodeDisplay',
        displayNameKey: 'settings.graphViz.initialNodeDisplay',
        tooltipKey: 'settings.graphViz.initialNodeDisplay.tooltip'
      },
      {
        key: 'maxNeighbours',
        displayNameKey: 'settings.graphViz.maxNeighbours',
        tooltipKey: 'settings.graphViz.maxNeighbours.tooltip'
      },
      {
        key: 'maxRows',
        displayNameKey: 'settings.graphViz.maxRows',
        tooltipKey: 'settings.graphViz.maxRows.tooltip'
      },
      {
        key: 'maxFieldItems',
        displayNameKey: 'settings.graphViz.maxFieldItems',
        tooltipKey: 'settings.graphViz.maxFieldItems.tooltip'
      },
      {
        key: 'autoComplete',
        displayNameKey: 'settings.graphViz.autoComplete',
        tooltipKey: 'settings.graphViz.autoComplete.tooltip',
        type: 'checkbox'
      },
      {
        key: 'showWheelZoomInfo',
        displayNameKey: 'settings.graphViz.showWheelZoomInfo',
        tooltipKey: 'settings.graphViz.showWheelZoomInfo.tooltip',
        type: 'checkbox'
      }
    ]
  }
]

function getTelemetryVisualSetting({
  telemetrySettings,
  trackOptOutCrashReports,
  trackOptOutUserStats
}: {
  telemetrySettings: TelemetrySettings
  trackOptOutCrashReports: (optedIn: boolean) => void
  trackOptOutUserStats: (optedIn: boolean) => void
}): VisualSettingDef {
  const settingsByFactor: Record<
    TelemetrySettingSource,
    VisualSettingDef['settings']
  > = {
    SETTINGS_NOT_LOADED: [
      {
        key: 'allowUserStats',
        displayNameKey: 'settings.analytics.userStats',
        tooltipKey: 'settings.analytics.notLoaded',
        type: 'info'
      }
    ],
    DESKTOP_SETTING: [
      {
        key: 'allowUserStats',
        displayNameKey: 'settings.analytics.userStats',
        tooltipKey: 'settings.analytics.notLoaded',
        type: 'info'
      }
    ],
    NEO4J_CONF: [
      {
        key: 'allowUserStats',
        displayNameKey: 'settings.analytics.userStats',
        tooltipKey: 'settings.analytics.notLoaded',
        type: 'info'
      }
    ],
    AURA: [
      {
        key: 'allowUserStats',
        displayNameKey: 'settings.analytics.userStats',
        tooltipKey: 'settings.analytics.notLoaded',
        type: 'info'
      }
    ],
    BROWSER_SETTING: [
      {
        key: 'allowCrashReports',
        displayNameKey: 'settings.analytics.crashReports',
        tooltipKey: 'settings.analytics.crashReports.tooltip',
        type: 'checkbox',
        onChange: trackOptOutCrashReports
      },
      {
        key: 'allowUserStats',
        displayNameKey: 'settings.analytics.userStats',
        tooltipKey: 'settings.analytics.userStats.tooltip',
        type: 'checkbox',
        onChange: trackOptOutUserStats
      }
    ]
  }

  return {
    titleKey: 'settings.analytics',
    settings: settingsByFactor[telemetrySettings.source]
  }
}

export const UserSettings = ({
  settings,
  experimentalFeatures = {},
  onSettingsSave = () => {},
  onFeatureChange,
  telemetrySettings,
  trackOptOutCrashReports,
  trackOptOutUserStats
}: any) => {
  const t = useT()

  if (!settings) return null

  const allSections: VisualSettingDef[] = [
    ...visualSettingDefs,
    getTelemetryVisualSetting({
      telemetrySettings,
      trackOptOutCrashReports,
      trackOptOutUserStats
    })
  ]

  const mappedSettings = allSections.map(section => {
    const title = <DrawerSubHeader>{t(section.titleKey)}</DrawerSubHeader>
    const mapSettings = section.settings
      .map(settingDef => {
        const {
          key,
          displayNameKey,
          tooltipKey,
          options,
          onChange: onSettingChange
        } = settingDef
        const type = settingDef.type || 'input'

        if (typeof settings[key] === 'undefined') return null

        const visual = t(displayNameKey)
        const tooltip = t(tooltipKey)

        if (type === 'input') {
          return (
            <StyledSetting key={toKeyString(visual)}>
              <StyledSettingLabel title={tooltip}>
                {visual}
                <StyledSettingTextInput
                  onChange={(event: any) => {
                    const newValue = event.target.value
                    settings[key] = newValue
                    onSettingChange && onSettingChange(newValue)
                    onSettingsSave(settings)
                  }}
                  defaultValue={settings[key]}
                  title={tooltip}
                  className={key}
                  data-testid={`setting-${key}`}
                />
              </StyledSettingLabel>
            </StyledSetting>
          )
        }

        if (type === 'radio') {
          return (
            <StyledSetting key={toKeyString(visual)}>
              <StyledSettingLabel title={tooltip}>{visual}</StyledSettingLabel>
              <RadioSelector
                options={options || []}
                onChange={(event: any) => {
                  const newValue = event.target.value
                  settings[key] = newValue
                  onSettingChange && onSettingChange(newValue)
                  onSettingsSave(settings)
                }}
                selectedValue={settings[key]}
                data-testid={`setting-${key}`}
              />
            </StyledSetting>
          )
        }

        if (type === 'checkbox') {
          return (
            <StyledSetting key={toKeyString(visual)}>
              <StyledSettingLabel title={tooltip}>
                <CheckboxSelector
                  onChange={(event: any) => {
                    const newValue = event.target.checked
                    settings[key] = newValue
                    onSettingChange && onSettingChange(newValue)
                    onSettingsSave(settings)
                  }}
                  checked={settings[key]}
                  data-testid={`setting-${key}`}
                />
                {visual}
              </StyledSettingLabel>
            </StyledSetting>
          )
        }

        if (type === 'info') {
          return (
            <StyledSetting key={toKeyString(visual)}>{tooltip}</StyledSetting>
          )
        }
        return null
      })
      .filter((setting: any) => setting !== null)

    return (
      <React.Fragment key={toKeyString(t(section.titleKey))}>
        {title}
        {mapSettings}
      </React.Fragment>
    )
  })

  const mappedExperimentalFeatures = Object.keys(experimentalFeatures)
    .map(key => {
      const feature = experimentalFeatures[key]
      if (feature.name === experimentalFeatureSelfName) {
        return null
      }
      const visual = feature.displayName
      const tooltip = feature.tooltip || ''
      return (
        <StyledSetting key={toKeyString(feature.name)}>
          <StyledSettingLabel title={tooltip}>
            <CheckboxSelector
              onChange={(event: any) => {
                const on = event.target.checked
                onFeatureChange(feature.name, on)
              }}
              checked={experimentalFeatures[feature.name].on}
            />
            {visual}
          </StyledSettingLabel>
        </StyledSetting>
      )
    })
    .filter(r => r)

  return (
    <Drawer id="db-settings">
      <DrawerHeader>{t('settings.title')}</DrawerHeader>
      <DrawerBody>
        <DrawerSection>
          <DrawerSectionBody key="settings">{mappedSettings}</DrawerSectionBody>
          <FeatureToggle
            name={experimentalFeatureSelfName}
            on={
              <>
                {mappedExperimentalFeatures.length ? (
                  <DrawerSubHeader>
                    {t('settings.experimentalFeatures')}
                  </DrawerSubHeader>
                ) : null}
                <DrawerSectionBody key="experimental-features">
                  {mappedExperimentalFeatures}
                </DrawerSectionBody>
              </>
            }
          />
        </DrawerSection>
      </DrawerBody>
    </Drawer>
  )
}

const mapStateToProps = (state: GlobalState) => {
  return {
    experimentalFeatures: getExperimentalFeatures(state),
    settings: state.settings,
    telemetrySettings: getTelemetrySettings(state)
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSettingsSave: (settings: Partial<actions.SettingsState>) => {
      dispatch(actions.update(settings))
    },
    trackOptOutCrashReports(optedIn: boolean) {
      if (!optedIn) {
        dispatch({ type: actions.TRACK_OPT_OUT_CRASH_REPORTS })
      }
    },
    trackOptOutUserStats: (optedIn: boolean) => {
      if (!optedIn) {
        dispatch({ type: actions.TRACK_OPT_OUT_USER_STATS })
      }
    },
    onFeatureChange: (name: any, on: any) => {
      if (on) {
        dispatch(enableExperimentalFeature(name))
      } else {
        dispatch(disableExperimentalFeature(name))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings)
