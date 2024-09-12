import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import ch from './locales/ch.json'

/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`, which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */
function loadLocaleMessages() {
    const locales = [{en: en}, {ch: ch}]
    const messages = {}
    locales.forEach(locale => {
        const key = Object.keys(locale)
        messages[key] = locale[key]
    })
    return messages
}

export default createI18n({
  locale: "ch",
  fallbackLocale: "en",
  messages: loadLocaleMessages(),
});

