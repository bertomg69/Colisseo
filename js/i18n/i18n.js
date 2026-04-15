'use strict';
const translatableElements = document.querySelectorAll('[datai18n]');
const languageSwitcher = document.querySelector('#languageswitcher');
if (translatableElements.length === 0 && !languageSwitcher) {
    console.log('Esta página todavía no está preparada para i18n.');
} else { }



'use strict';
function applyTranslations(locale) {
    const translatableElements =
        document.querySelectorAll('[data-i18n]');
    const labelElements = document.querySelectorAll('[data-i18nlabel]');
    const dict = window.translations?.[locale];
    //Primer for para recorrer elementos traducibles con text.Content()
    for (let i = 0; i < translatableElements.length; i++) {
        const element = translatableElements[i];
        const key = element.dataset.i18n;
        const translatedText = dict[key];
        if (translatedText) {
            element.textContent = translatedText;
        }
    }
    //Segundo for, elementos 'especiales, atributos: label, alt, placeholder...
    for (let i = 0; i < labelElements.length; i++) {
        const element = labelElements[i];
        const key = element.dataset.i18n;
        const translatedLabel = dict[key];
        if (translatedLabel) {
            element.setAttribute('label', translatedLabel);
        }
    }
    document.documentElement.lang = locale;
}
//LLAMADA A LA FUNCIÓN 
applyTranslations('en');

function setLocale(locale) {
    const selectedLocale = window.translations[locale] ? locale : 'es';
    localStorage.setItem('preferredLanguage', selectedLocale);
    applyTranslations(selectedLocale);
    updateDynamicContent(selectedLocale);
    initializeLanguageSwitcher(selectedLocale);
}
// Nos aseguramos de que setLocale sea global.
window.setLocale = setLocale;


function getSavedLocale() {
    const savedLocale =
        localStorage.getItem('preferredLanguage');
    return translations[savedLocale] ? savedLocale : 'es';
}

function initializeLanguageSwitcher(locale) {
    const languageSwitcher = document.querySelector('#language-switcher');
    if (languageSwitcher) {
        languageSwitcher.value = locale;
    }
}
function initializeI18n() {
    const translatableElements = document.querySelectorAll('[data-i18n]');
    const languageSwitcher = document.querySelector('#language-switcher');
    if (translatableElements.length === 0 && !languageSwitcher) {
        console.log('Esta página todavía no está preparada para i18n.');
        return;
    }
    const initialLocale = getSavedLocale();
    applyTranslations(initialLocale);
    updateDynamicContent(initialLocale);
    initializeLanguageSwitcher(initialLocale);
}
initializeI18n();

//Formateo regional de fechas
function formatDate(dateValue, locale) {
    const resolvedLocale = locale === 'en' ? 'en-US' : 'es-ES';
    return new Intl.DateTimeFormat(resolvedLocale, {
        dateStyle: 'long',
        timeStyle: 'short'
    }).format(dateValue);
}
//Formateo regional de numeros y precios
function formatCurrency(amount, locale) {
    const resolvedLocale = locale === 'en' ? 'en-US' : 'es-ES';
    const currency = locale === 'en' ? 'USD' : 'EUR';
    return new Intl.NumberFormat(resolvedLocale, {
        style: 'currency',
        currency: currency
    }).format(amount);
}


function updateDynamicContent(locale) {
    const meetingDateBox = document.querySelector('#monthly-meeting-date');
    const meetingFeeBox = document.querySelector('#monthly-meeting-fee');
    if (meetingDateBox) {
        const rawDate = meetingDateBox.dataset.date;
        const meetingDate = new Date(rawDate);
        meetingDateBox.textContent = formatDate(meetingDate, locale);
    }
    if (meetingFeeBox) {
        const rawFee = Number(meetingFeeBox.dataset.fee);
        meetingFeeBox.textContent = formatCurrency(rawFee, locale);
    }
}