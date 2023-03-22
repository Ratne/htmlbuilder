import languageBundle from '@kirschbaum-development/laravel-translations-loader!@kirschbaum-development/laravel-translations-loader';

/**
 * Helper to allow getting i18n strings 
 */
export default class LocaleHelper{
  constructor(){
    this.locale = window.navigator.language.split('-')[0]
  }
  trans(string){
    return languageBundle[this.locale][string]
  }
}