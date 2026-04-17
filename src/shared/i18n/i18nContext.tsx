import React, { createContext, useContext, useMemo } from 'react'
import { connect } from 'react-redux'

import { GlobalState } from 'shared/globalState'
import { getLanguage } from 'shared/modules/settings/settingsDuck'
import translations, { Language, TranslationKey } from './translations'

type I18nContextValue = {
  language: Language
  t: (key: TranslationKey, params?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nContextValue>({
  language: 'en',
  t: (key: TranslationKey) => key
})

type I18nProviderInnerProps = {
  language: Language
  children: React.ReactNode
}

function I18nProviderInner({ language, children }: I18nProviderInnerProps) {
  const value = useMemo<I18nContextValue>(() => {
    const strings = translations[language] || translations.en
    const t = (
      key: TranslationKey,
      params?: Record<string, string | number>
    ): string => {
      let text = strings[key] || translations.en[key] || key
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          text = text.replace(`{${k}}`, String(v))
        })
      }
      return text
    }
    return { language, t }
  }, [language])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

const mapStateToProps = (state: GlobalState) => ({
  language: getLanguage(state)
})

export const I18nProvider = connect(mapStateToProps)(I18nProviderInner as any)

export function useI18n(): I18nContextValue {
  return useContext(I18nContext)
}

export function useT(): I18nContextValue['t'] {
  return useContext(I18nContext).t
}

export function getTranslator(language: Language) {
  const strings = translations[language] || translations.en
  return (
    key: TranslationKey,
    params?: Record<string, string | number>
  ): string => {
    let text = strings[key] || translations.en[key] || key
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v))
      })
    }
    return text
  }
}

export default I18nContext
