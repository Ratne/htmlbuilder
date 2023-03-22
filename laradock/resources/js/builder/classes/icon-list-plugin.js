export default class IconListPlugin{
  constructor(editor,options){
    this.editor = editor
    this.options = options

    this.init()
  }
  init(){
    this.addBlock()
    this.addTypeForBlock()
  }
  /**
   * Adds a new widget block on editor
   */
  addBlock(){
    const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M64 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM64 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48-208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"/></svg>`

    this.editor.BlockManager.add('icon-list', {
      label: 'Icon List',
      category: 'Extra',
      media: icon,
      content: 
      `
        <ul>
          <li>Icon list item</li>
        </ul>
      `
    });
  }
  /**
   * Define a new custom trait for the button widget
   */
  addTypeForBlock(){
    const self = this

    self.editor.DomComponents.addType('li', {
      isComponent: el => el.tagName == 'LI',
      model: {
        defaults: {
          traits: [
            self.getTrait()
          ],
        },
      },
    });
    
  }
  /**
   * 
   * @returns The select traits which contains all the modals added
   */
  getTrait(){
    return {
      type: 'select',
      label: 'Icon',
      name: 'class',
      options: this.getFontAwesomeNames()
    }
  }
  /**
   * 
   * @returns The list of FontAwesome 4 names
   */
  getFontAwesomeNames() {
    return [{ "id": " ", "name": " " }, { "id": "fa fa-adjust", "name": "fa-adjust" }, { "id": "fa fa-adn", "name": "fa-adn" }, { "id": "fa fa-align-center", "name": "fa-align-center" }, { "id": "fa fa-align-justify", "name": "fa-align-justify" }, { "id": "fa fa-align-left", "name": "fa-align-left" }, { "id": "fa fa-align-right", "name": "fa-align-right" }, { "id": "fa fa-ambulance", "name": "fa-ambulance" }, { "id": "fa fa-anchor", "name": "fa-anchor" }, { "id": "fa fa-android", "name": "fa-android" }, { "id": "fa fa-angellist", "name": "fa-angellist" }, { "id": "fa fa-angle-double-down", "name": "fa-angle-double-down" }, { "id": "fa fa-angle-double-left", "name": "fa-angle-double-left" }, { "id": "fa fa-angle-double-right", "name": "fa-angle-double-right" }, { "id": "fa fa-angle-double-up", "name": "fa-angle-double-up" }, { "id": "fa fa-angle-down", "name": "fa-angle-down" }, { "id": "fa fa-angle-left", "name": "fa-angle-left" }, { "id": "fa fa-angle-right", "name": "fa-angle-right" }, { "id": "fa fa-angle-up", "name": "fa-angle-up" }, { "id": "fa fa-apple", "name": "fa-apple" }, { "id": "fa fa-archive", "name": "fa-archive" }, { "id": "fa fa-area-chart", "name": "fa-area-chart" }, { "id": "fa fa-arrow-circle-down", "name": "fa-arrow-circle-down" }, { "id": "fa fa-arrow-circle-left", "name": "fa-arrow-circle-left" }, { "id": "fa fa-arrow-circle-o-down", "name": "fa-arrow-circle-o-down" }, { "id": "fa fa-arrow-circle-o-left", "name": "fa-arrow-circle-o-left" }, { "id": "fa fa-arrow-circle-o-right", "name": "fa-arrow-circle-o-right" }, { "id": "fa fa-arrow-circle-o-up", "name": "fa-arrow-circle-o-up" }, { "id": "fa fa-arrow-circle-right", "name": "fa-arrow-circle-right" }, { "id": "fa fa-arrow-circle-up", "name": "fa-arrow-circle-up" }, { "id": "fa fa-arrow-down", "name": "fa-arrow-down" }, { "id": "fa fa-arrow-left", "name": "fa-arrow-left" }, { "id": "fa fa-arrow-right", "name": "fa-arrow-right" }, { "id": "fa fa-arrow-up", "name": "fa-arrow-up" }, { "id": "fa fa-arrows-alt", "name": "fa-arrows-alt" }, { "id": "fa fa-arrows-h", "name": "fa-arrows-h" }, { "id": "fa fa-arrows-v", "name": "fa-arrows-v" }, { "id": "fa fa-arrows", "name": "fa-arrows" }, { "id": "fa fa-asterisk", "name": "fa-asterisk" }, { "id": "fa fa-at", "name": "fa-at" }, { "id": "fa fa-automobile", "name": "fa-automobile" }, { "id": "fa fa-backward", "name": "fa-backward" }, { "id": "fa fa-bank", "name": "fa-bank" }, { "id": "fa fa-ban", "name": "fa-ban" }, { "id": "fa fa-bar-chart-o", "name": "fa-bar-chart-o" }, { "id": "fa fa-bar-chart", "name": "fa-bar-chart" }, { "id": "fa fa-barcode", "name": "fa-barcode" }, { "id": "fa fa-bars", "name": "fa-bars" }, { "id": "fa fa-bed", "name": "fa-bed" }, { "id": "fa fa-beer", "name": "fa-beer" }, { "id": "fa fa-behance-square", "name": "fa-behance-square" }, { "id": "fa fa-behance", "name": "fa-behance" }, { "id": "fa fa-bell-o", "name": "fa-bell-o" }, { "id": "fa fa-bell-slash-o", "name": "fa-bell-slash-o" }, { "id": "fa fa-bell-slash", "name": "fa-bell-slash" }, { "id": "fa fa-bell", "name": "fa-bell" }, { "id": "fa fa-bicycle", "name": "fa-bicycle" }, { "id": "fa fa-binoculars", "name": "fa-binoculars" }, { "id": "fa fa-birthday-cake", "name": "fa-birthday-cake" }, { "id": "fa fa-bitbucket-square", "name": "fa-bitbucket-square" }, { "id": "fa fa-bitbucket", "name": "fa-bitbucket" }, { "id": "fa fa-bitcoin", "name": "fa-bitcoin" }, { "id": "fa fa-bold", "name": "fa-bold" }, { "id": "fa fa-bolt", "name": "fa-bolt" }, { "id": "fa fa-bomb", "name": "fa-bomb" }, { "id": "fa fa-bookmark-o", "name": "fa-bookmark-o" }, { "id": "fa fa-bookmark", "name": "fa-bookmark" }, { "id": "fa fa-book", "name": "fa-book" }, { "id": "fa fa-briefcase", "name": "fa-briefcase" }, { "id": "fa fa-btc", "name": "fa-btc" }, { "id": "fa fa-bug", "name": "fa-bug" }, { "id": "fa fa-building-o", "name": "fa-building-o" }, { "id": "fa fa-building", "name": "fa-building" }, { "id": "fa fa-bullhorn", "name": "fa-bullhorn" }, { "id": "fa fa-bullseye", "name": "fa-bullseye" }, { "id": "fa fa-bus", "name": "fa-bus" }, { "id": "fa fa-buysellads", "name": "fa-buysellads" }, { "id": "fa fa-cab", "name": "fa-cab" }, { "id": "fa fa-calculator", "name": "fa-calculator" }, { "id": "fa fa-calendar-o", "name": "fa-calendar-o" }, { "id": "fa fa-calendar", "name": "fa-calendar" }, { "id": "fa fa-camera-retro", "name": "fa-camera-retro" }, { "id": "fa fa-camera", "name": "fa-camera" }, { "id": "fa fa-caret-down", "name": "fa-caret-down" }, { "id": "fa fa-caret-left", "name": "fa-caret-left" }, { "id": "fa fa-caret-right", "name": "fa-caret-right" }, { "id": "fa fa-caret-square-o-down", "name": "fa-caret-square-o-down" }, { "id": "fa fa-caret-square-o-left", "name": "fa-caret-square-o-left" }, { "id": "fa fa-caret-square-o-right", "name": "fa-caret-square-o-right" }, { "id": "fa fa-caret-square-o-up", "name": "fa-caret-square-o-up" }, { "id": "fa fa-caret-up", "name": "fa-caret-up" }, { "id": "fa fa-cart-arrow-down", "name": "fa-cart-arrow-down" }, { "id": "fa fa-cart-plus", "name": "fa-cart-plus" }, { "id": "fa fa-car", "name": "fa-car" }, { "id": "fa fa-cc-amex", "name": "fa-cc-amex" }, { "id": "fa fa-cc-discover", "name": "fa-cc-discover" }, { "id": "fa fa-cc-mastercard", "name": "fa-cc-mastercard" }, { "id": "fa fa-cc-paypal", "name": "fa-cc-paypal" }, { "id": "fa fa-cc-stripe", "name": "fa-cc-stripe" }, { "id": "fa fa-cc-visa", "name": "fa-cc-visa" }, { "id": "fa fa-cc", "name": "fa-cc" }, { "id": "fa fa-certificate", "name": "fa-certificate" }, { "id": "fa fa-chain-broken", "name": "fa-chain-broken" }, { "id": "fa fa-chain", "name": "fa-chain" }, { "id": "fa fa-check-circle-o", "name": "fa-check-circle-o" }, { "id": "fa fa-check-circle", "name": "fa-check-circle" }, { "id": "fa fa-check-square-o", "name": "fa-check-square-o" }, { "id": "fa fa-check-square", "name": "fa-check-square" }, { "id": "fa fa-check", "name": "fa-check" }, { "id": "fa fa-chevron-circle-down", "name": "fa-chevron-circle-down" }, { "id": "fa fa-chevron-circle-left", "name": "fa-chevron-circle-left" }, { "id": "fa fa-chevron-circle-right", "name": "fa-chevron-circle-right" }, { "id": "fa fa-chevron-circle-up", "name": "fa-chevron-circle-up" }, { "id": "fa fa-chevron-down", "name": "fa-chevron-down" }, { "id": "fa fa-chevron-left", "name": "fa-chevron-left" }, { "id": "fa fa-chevron-right", "name": "fa-chevron-right" }, { "id": "fa fa-chevron-up", "name": "fa-chevron-up" }, { "id": "fa fa-child", "name": "fa-child" }, { "id": "fa fa-circle-o-notch", "name": "fa-circle-o-notch" }, { "id": "fa fa-circle-o", "name": "fa-circle-o" }, { "id": "fa fa-circle-thin", "name": "fa-circle-thin" }, { "id": "fa fa-circle", "name": "fa-circle" }, { "id": "fa fa-clipboard", "name": "fa-clipboard" }, { "id": "fa fa-clock-o", "name": "fa-clock-o" }, { "id": "fa fa-close", "name": "fa-close" }, { "id": "fa fa-cloud-download", "name": "fa-cloud-download" }, { "id": "fa fa-cloud-upload", "name": "fa-cloud-upload" }, { "id": "fa fa-cloud", "name": "fa-cloud" }, { "id": "fa fa-cny", "name": "fa-cny" }, { "id": "fa fa-code-fork", "name": "fa-code-fork" }, { "id": "fa fa-codepen", "name": "fa-codepen" }, { "id": "fa fa-code", "name": "fa-code" }, { "id": "fa fa-coffee", "name": "fa-coffee" }, { "id": "fa fa-cogs", "name": "fa-cogs" }, { "id": "fa fa-cog", "name": "fa-cog" }, { "id": "fa fa-columns", "name": "fa-columns" }, { "id": "fa fa-comment-o", "name": "fa-comment-o" }, { "id": "fa fa-comments-o", "name": "fa-comments-o" }, { "id": "fa fa-comments", "name": "fa-comments" }, { "id": "fa fa-comment", "name": "fa-comment" }, { "id": "fa fa-compass", "name": "fa-compass" }, { "id": "fa fa-compress", "name": "fa-compress" }, { "id": "fa fa-connectdevelop", "name": "fa-connectdevelop" }, { "id": "fa fa-copyright", "name": "fa-copyright" }, { "id": "fa fa-copy", "name": "fa-copy" }, { "id": "fa fa-credit-card", "name": "fa-credit-card" }, { "id": "fa fa-crop", "name": "fa-crop" }, { "id": "fa fa-crosshairs", "name": "fa-crosshairs" }, { "id": "fa fa-css3", "name": "fa-css3" }, { "id": "fa fa-cubes", "name": "fa-cubes" }, { "id": "fa fa-cube", "name": "fa-cube" }, { "id": "fa fa-cutlery", "name": "fa-cutlery" }, { "id": "fa fa-cut", "name": "fa-cut" }, { "id": "fa fa-dashboard", "name": "fa-dashboard" }, { "id": "fa fa-dashcube", "name": "fa-dashcube" }, { "id": "fa fa-database", "name": "fa-database" }, { "id": "fa fa-dedent", "name": "fa-dedent" }, { "id": "fa fa-delicious", "name": "fa-delicious" }, { "id": "fa fa-desktop", "name": "fa-desktop" }, { "id": "fa fa-deviantart", "name": "fa-deviantart" }, { "id": "fa fa-diamond", "name": "fa-diamond" }, { "id": "fa fa-digg", "name": "fa-digg" }, { "id": "fa fa-dollar", "name": "fa-dollar" }, { "id": "fa fa-dot-circle-o", "name": "fa-dot-circle-o" }, { "id": "fa fa-download", "name": "fa-download" }, { "id": "fa fa-dribbble", "name": "fa-dribbble" }, { "id": "fa fa-dropbox", "name": "fa-dropbox" }, { "id": "fa fa-drupal", "name": "fa-drupal" }, { "id": "fa fa-edit", "name": "fa-edit" }, { "id": "fa fa-eject", "name": "fa-eject" }, { "id": "fa fa-ellipsis-h", "name": "fa-ellipsis-h" }, { "id": "fa fa-ellipsis-v", "name": "fa-ellipsis-v" }, { "id": "fa fa-empire", "name": "fa-empire" }, { "id": "fa fa-envelope-o", "name": "fa-envelope-o" }, { "id": "fa fa-envelope-square", "name": "fa-envelope-square" }, { "id": "fa fa-envelope", "name": "fa-envelope" }, { "id": "fa fa-eraser", "name": "fa-eraser" }, { "id": "fa fa-euro", "name": "fa-euro" }, { "id": "fa fa-eur", "name": "fa-eur" }, { "id": "fa fa-exchange", "name": "fa-exchange" }, { "id": "fa fa-exclamation-circle", "name": "fa-exclamation-circle" }, { "id": "fa fa-exclamation-triangle", "name": "fa-exclamation-triangle" }, { "id": "fa fa-exclamation", "name": "fa-exclamation" }, { "id": "fa fa-expand", "name": "fa-expand" }, { "id": "fa fa-external-link-square", "name": "fa-external-link-square" }, { "id": "fa fa-external-link", "name": "fa-external-link" }, { "id": "fa fa-eye-slash", "name": "fa-eye-slash" }, { "id": "fa fa-eyedropper", "name": "fa-eyedropper" }, { "id": "fa fa-eye", "name": "fa-eye" }, { "id": "fa fa-facebook-f", "name": "fa-facebook-f" }, { "id": "fa fa-facebook-official", "name": "fa-facebook-official" }, { "id": "fa fa-facebook-square", "name": "fa-facebook-square" }, { "id": "fa fa-facebook", "name": "fa-facebook" }, { "id": "fa fa-fast-backward", "name": "fa-fast-backward" }, { "id": "fa fa-fast-forward", "name": "fa-fast-forward" }, { "id": "fa fa-fax", "name": "fa-fax" }, { "id": "fa fa-female", "name": "fa-female" }, { "id": "fa fa-fighter-jet", "name": "fa-fighter-jet" }, { "id": "fa fa-file-archive-o", "name": "fa-file-archive-o" }, { "id": "fa fa-file-audio-o", "name": "fa-file-audio-o" }, { "id": "fa fa-file-code-o", "name": "fa-file-code-o" }, { "id": "fa fa-file-excel-o", "name": "fa-file-excel-o" }, { "id": "fa fa-file-image-o", "name": "fa-file-image-o" }, { "id": "fa fa-file-movie-o", "name": "fa-file-movie-o" }, { "id": "fa fa-file-o", "name": "fa-file-o" }, { "id": "fa fa-file-pdf-o", "name": "fa-file-pdf-o" }, { "id": "fa fa-file-photo-o", "name": "fa-file-photo-o" }, { "id": "fa fa-file-picture-o", "name": "fa-file-picture-o" }, { "id": "fa fa-file-powerpoint-o", "name": "fa-file-powerpoint-o" }, { "id": "fa fa-file-sound-o", "name": "fa-file-sound-o" }, { "id": "fa fa-file-text-o", "name": "fa-file-text-o" }, { "id": "fa fa-file-text", "name": "fa-file-text" }, { "id": "fa fa-file-video-o", "name": "fa-file-video-o" }, { "id": "fa fa-file-word-o", "name": "fa-file-word-o" }, { "id": "fa fa-file-zip-o", "name": "fa-file-zip-o" }, { "id": "fa fa-files-o", "name": "fa-files-o" }, { "id": "fa fa-file", "name": "fa-file" }, { "id": "fa fa-film", "name": "fa-film" }, { "id": "fa fa-filter", "name": "fa-filter" }, { "id": "fa fa-fire-extinguisher", "name": "fa-fire-extinguisher" }, { "id": "fa fa-fire", "name": "fa-fire" }, { "id": "fa fa-flag-checkered", "name": "fa-flag-checkered" }, { "id": "fa fa-flag-o", "name": "fa-flag-o" }, { "id": "fa fa-flag", "name": "fa-flag" }, { "id": "fa fa-flash", "name": "fa-flash" }, { "id": "fa fa-flask", "name": "fa-flask" }, { "id": "fa fa-flickr", "name": "fa-flickr" }, { "id": "fa fa-floppy-o", "name": "fa-floppy-o" }, { "id": "fa fa-folder-open-o", "name": "fa-folder-open-o" }, { "id": "fa fa-folder-open", "name": "fa-folder-open" }, { "id": "fa fa-folder-o", "name": "fa-folder-o" }, { "id": "fa fa-folder", "name": "fa-folder" }, { "id": "fa fa-font", "name": "fa-font" }, { "id": "fa fa-forumbee", "name": "fa-forumbee" }, { "id": "fa fa-forward", "name": "fa-forward" }, { "id": "fa fa-foursquare", "name": "fa-foursquare" }, { "id": "fa fa-frown-o", "name": "fa-frown-o" }, { "id": "fa fa-futbol-o", "name": "fa-futbol-o" }, { "id": "fa fa-gamepad", "name": "fa-gamepad" }, { "id": "fa fa-gavel", "name": "fa-gavel" }, { "id": "fa fa-gbp", "name": "fa-gbp" }, { "id": "fa fa-gears", "name": "fa-gears" }, { "id": "fa fa-gear", "name": "fa-gear" }, { "id": "fa fa-genderless", "name": "fa-genderless" }, { "id": "fa fa-ge", "name": "fa-ge" }, { "id": "fa fa-gift", "name": "fa-gift" }, { "id": "fa fa-git-square", "name": "fa-git-square" }, { "id": "fa fa-github-alt", "name": "fa-github-alt" }, { "id": "fa fa-github-square", "name": "fa-github-square" }, { "id": "fa fa-github", "name": "fa-github" }, { "id": "fa fa-gittip", "name": "fa-gittip" }, { "id": "fa fa-git", "name": "fa-git" }, { "id": "fa fa-glass", "name": "fa-glass" }, { "id": "fa fa-globe", "name": "fa-globe" }, { "id": "fa fa-google-plus-square", "name": "fa-google-plus-square" }, { "id": "fa fa-google-plus", "name": "fa-google-plus" }, { "id": "fa fa-google-wallet", "name": "fa-google-wallet" }, { "id": "fa fa-google", "name": "fa-google" }, { "id": "fa fa-graduation-cap", "name": "fa-graduation-cap" }, { "id": "fa fa-gratipay", "name": "fa-gratipay" }, { "id": "fa fa-group", "name": "fa-group" }, { "id": "fa fa-h-square", "name": "fa-h-square" }, { "id": "fa fa-hacker-news", "name": "fa-hacker-news" }, { "id": "fa fa-hand-o-down", "name": "fa-hand-o-down" }, { "id": "fa fa-hand-o-left", "name": "fa-hand-o-left" }, { "id": "fa fa-hand-o-right", "name": "fa-hand-o-right" }, { "id": "fa fa-hand-o-up", "name": "fa-hand-o-up" }, { "id": "fa fa-hdd-o", "name": "fa-hdd-o" }, { "id": "fa fa-header", "name": "fa-header" }, { "id": "fa fa-headphones", "name": "fa-headphones" }, { "id": "fa fa-heart-o", "name": "fa-heart-o" }, { "id": "fa fa-heartbeat", "name": "fa-heartbeat" }, { "id": "fa fa-heart", "name": "fa-heart" }, { "id": "fa fa-history", "name": "fa-history" }, { "id": "fa fa-home", "name": "fa-home" }, { "id": "fa fa-hospital-o", "name": "fa-hospital-o" }, { "id": "fa fa-hotel", "name": "fa-hotel" }, { "id": "fa fa-html5", "name": "fa-html5" }, { "id": "fa fa-ils", "name": "fa-ils" }, { "id": "fa fa-image", "name": "fa-image" }, { "id": "fa fa-inbox", "name": "fa-inbox" }, { "id": "fa fa-indent", "name": "fa-indent" }, { "id": "fa fa-info-circle", "name": "fa-info-circle" }, { "id": "fa fa-info", "name": "fa-info" }, { "id": "fa fa-inr", "name": "fa-inr" }, { "id": "fa fa-instagram", "name": "fa-instagram" }, { "id": "fa fa-institution", "name": "fa-institution" }, { "id": "fa fa-ioxhost", "name": "fa-ioxhost" }, { "id": "fa fa-italic", "name": "fa-italic" }, { "id": "fa fa-joomla", "name": "fa-joomla" }, { "id": "fa fa-jpy", "name": "fa-jpy" }, { "id": "fa fa-jsfiddle", "name": "fa-jsfiddle" }, { "id": "fa fa-keyboard-o", "name": "fa-keyboard-o" }, { "id": "fa fa-key", "name": "fa-key" }, { "id": "fa fa-krw", "name": "fa-krw" }, { "id": "fa fa-language", "name": "fa-language" }, { "id": "fa fa-laptop", "name": "fa-laptop" }, { "id": "fa fa-lastfm-square", "name": "fa-lastfm-square" }, { "id": "fa fa-lastfm", "name": "fa-lastfm" }, { "id": "fa fa-leaf", "name": "fa-leaf" }, { "id": "fa fa-leanpub", "name": "fa-leanpub" }, { "id": "fa fa-legal", "name": "fa-legal" }, { "id": "fa fa-lemon-o", "name": "fa-lemon-o" }, { "id": "fa fa-level-down", "name": "fa-level-down" }, { "id": "fa fa-level-up", "name": "fa-level-up" }, { "id": "fa fa-life-bouy", "name": "fa-life-bouy" }, { "id": "fa fa-life-buoy", "name": "fa-life-buoy" }, { "id": "fa fa-life-ring", "name": "fa-life-ring" }, { "id": "fa fa-life-saver", "name": "fa-life-saver" }, { "id": "fa fa-lightbulb-o", "name": "fa-lightbulb-o" }, { "id": "fa fa-line-chart", "name": "fa-line-chart" }, { "id": "fa fa-linkedin-square", "name": "fa-linkedin-square" }, { "id": "fa fa-linkedin", "name": "fa-linkedin" }, { "id": "fa fa-link", "name": "fa-link" }, { "id": "fa fa-linux", "name": "fa-linux" }, { "id": "fa fa-list-alt", "name": "fa-list-alt" }, { "id": "fa fa-list-ol", "name": "fa-list-ol" }, { "id": "fa fa-list-ul", "name": "fa-list-ul" }, { "id": "fa fa-list", "name": "fa-list" }, { "id": "fa fa-location-arrow", "name": "fa-location-arrow" }, { "id": "fa fa-lock", "name": "fa-lock" }, { "id": "fa fa-long-arrow-down", "name": "fa-long-arrow-down" }, { "id": "fa fa-long-arrow-left", "name": "fa-long-arrow-left" }, { "id": "fa fa-long-arrow-right", "name": "fa-long-arrow-right" }, { "id": "fa fa-long-arrow-up", "name": "fa-long-arrow-up" }, { "id": "fa fa-magic", "name": "fa-magic" }, { "id": "fa fa-magnet", "name": "fa-magnet" }, { "id": "fa fa-mail-forward", "name": "fa-mail-forward" }, { "id": "fa fa-mail-reply-all", "name": "fa-mail-reply-all" }, { "id": "fa fa-mail-reply", "name": "fa-mail-reply" }, { "id": "fa fa-male", "name": "fa-male" }, { "id": "fa fa-map-marker", "name": "fa-map-marker" }, { "id": "fa fa-mars-double", "name": "fa-mars-double" }, { "id": "fa fa-mars-stroke-h", "name": "fa-mars-stroke-h" }, { "id": "fa fa-mars-stroke-v", "name": "fa-mars-stroke-v" }, { "id": "fa fa-mars-stroke", "name": "fa-mars-stroke" }, { "id": "fa fa-mars", "name": "fa-mars" }, { "id": "fa fa-maxcdn", "name": "fa-maxcdn" }, { "id": "fa fa-meanpath", "name": "fa-meanpath" }, { "id": "fa fa-medium", "name": "fa-medium" }, { "id": "fa fa-medkit", "name": "fa-medkit" }, { "id": "fa fa-meh-o", "name": "fa-meh-o" }, { "id": "fa fa-mercury", "name": "fa-mercury" }, { "id": "fa fa-microphone-slash", "name": "fa-microphone-slash" }, { "id": "fa fa-microphone", "name": "fa-microphone" }, { "id": "fa fa-minus-circle", "name": "fa-minus-circle" }, { "id": "fa fa-minus-square-o", "name": "fa-minus-square-o" }, { "id": "fa fa-minus-square", "name": "fa-minus-square" }, { "id": "fa fa-minus", "name": "fa-minus" }, { "id": "fa fa-mobile-phone", "name": "fa-mobile-phone" }, { "id": "fa fa-mobile", "name": "fa-mobile" }, { "id": "fa fa-money", "name": "fa-money" }, { "id": "fa fa-moon-o", "name": "fa-moon-o" }, { "id": "fa fa-mortar-board", "name": "fa-mortar-board" }, { "id": "fa fa-motorcycle", "name": "fa-motorcycle" }, { "id": "fa fa-music", "name": "fa-music" }, { "id": "fa fa-navicon", "name": "fa-navicon" }, { "id": "fa fa-neuter", "name": "fa-neuter" }, { "id": "fa fa-newspaper-o", "name": "fa-newspaper-o" }, { "id": "fa fa-openid", "name": "fa-openid" }, { "id": "fa fa-outdent", "name": "fa-outdent" }, { "id": "fa fa-pagelines", "name": "fa-pagelines" }, { "id": "fa fa-paint-brush", "name": "fa-paint-brush" }, { "id": "fa fa-paper-plane-o", "name": "fa-paper-plane-o" }, { "id": "fa fa-paper-plane", "name": "fa-paper-plane" }, { "id": "fa fa-paperclip", "name": "fa-paperclip" }, { "id": "fa fa-paragraph", "name": "fa-paragraph" }, { "id": "fa fa-paste", "name": "fa-paste" }, { "id": "fa fa-pause", "name": "fa-pause" }, { "id": "fa fa-paw", "name": "fa-paw" }, { "id": "fa fa-paypal", "name": "fa-paypal" }, { "id": "fa fa-pencil-square-o", "name": "fa-pencil-square-o" }, { "id": "fa fa-pencil-square", "name": "fa-pencil-square" }, { "id": "fa fa-pencil", "name": "fa-pencil" }, { "id": "fa fa-phone-square", "name": "fa-phone-square" }, { "id": "fa fa-phone", "name": "fa-phone" }, { "id": "fa fa-photo", "name": "fa-photo" }, { "id": "fa fa-picture-o", "name": "fa-picture-o" }, { "id": "fa fa-pie-chart", "name": "fa-pie-chart" }, { "id": "fa fa-pied-piper-alt", "name": "fa-pied-piper-alt" }, { "id": "fa fa-pied-piper", "name": "fa-pied-piper" }, { "id": "fa fa-pinterest-p", "name": "fa-pinterest-p" }, { "id": "fa fa-pinterest-square", "name": "fa-pinterest-square" }, { "id": "fa fa-pinterest", "name": "fa-pinterest" }, { "id": "fa fa-plane", "name": "fa-plane" }, { "id": "fa fa-play-circle-o", "name": "fa-play-circle-o" }, { "id": "fa fa-play-circle", "name": "fa-play-circle" }, { "id": "fa fa-play", "name": "fa-play" }, { "id": "fa fa-plug", "name": "fa-plug" }, { "id": "fa fa-plus-circle", "name": "fa-plus-circle" }, { "id": "fa fa-plus-square-o", "name": "fa-plus-square-o" }, { "id": "fa fa-plus-square", "name": "fa-plus-square" }, { "id": "fa fa-plus", "name": "fa-plus" }, { "id": "fa fa-power-off", "name": "fa-power-off" }, { "id": "fa fa-print", "name": "fa-print" }, { "id": "fa fa-puzzle-piece", "name": "fa-puzzle-piece" }, { "id": "fa fa-qq", "name": "fa-qq" }, { "id": "fa fa-qrcode", "name": "fa-qrcode" }, { "id": "fa fa-question-circle", "name": "fa-question-circle" }, { "id": "fa fa-question", "name": "fa-question" }, { "id": "fa fa-quote-left", "name": "fa-quote-left" }, { "id": "fa fa-quote-right", "name": "fa-quote-right" }, { "id": "fa fa-random", "name": "fa-random" }, { "id": "fa fa-ra", "name": "fa-ra" }, { "id": "fa fa-rebel", "name": "fa-rebel" }, { "id": "fa fa-recycle", "name": "fa-recycle" }, { "id": "fa fa-reddit-square", "name": "fa-reddit-square" }, { "id": "fa fa-reddit", "name": "fa-reddit" }, { "id": "fa fa-refresh", "name": "fa-refresh" }, { "id": "fa fa-remove", "name": "fa-remove" }, { "id": "fa fa-renren", "name": "fa-renren" }, { "id": "fa fa-reorder", "name": "fa-reorder" }, { "id": "fa fa-repeat", "name": "fa-repeat" }, { "id": "fa fa-reply-all", "name": "fa-reply-all" }, { "id": "fa fa-reply", "name": "fa-reply" }, { "id": "fa fa-retweet", "name": "fa-retweet" }, { "id": "fa fa-rmb", "name": "fa-rmb" }, { "id": "fa fa-road", "name": "fa-road" }, { "id": "fa fa-rocket", "name": "fa-rocket" }, { "id": "fa fa-rotate-left", "name": "fa-rotate-left" }, { "id": "fa fa-rotate-right", "name": "fa-rotate-right" }, { "id": "fa fa-rouble", "name": "fa-rouble" }, { "id": "fa fa-rss-square", "name": "fa-rss-square" }, { "id": "fa fa-rss", "name": "fa-rss" }, { "id": "fa fa-ruble", "name": "fa-ruble" }, { "id": "fa fa-rub", "name": "fa-rub" }, { "id": "fa fa-rupee", "name": "fa-rupee" }, { "id": "fa fa-save", "name": "fa-save" }, { "id": "fa fa-scissors", "name": "fa-scissors" }, { "id": "fa fa-search-minus", "name": "fa-search-minus" }, { "id": "fa fa-search-plus", "name": "fa-search-plus" }, { "id": "fa fa-search", "name": "fa-search" }, { "id": "fa fa-sellsy", "name": "fa-sellsy" }, { "id": "fa fa-send-o", "name": "fa-send-o" }, { "id": "fa fa-send", "name": "fa-send" }, { "id": "fa fa-server", "name": "fa-server" }, { "id": "fa fa-share-alt-square", "name": "fa-share-alt-square" }, { "id": "fa fa-share-alt", "name": "fa-share-alt" }, { "id": "fa fa-share-square-o", "name": "fa-share-square-o" }, { "id": "fa fa-share-square", "name": "fa-share-square" }, { "id": "fa fa-share", "name": "fa-share" }, { "id": "fa fa-shekel", "name": "fa-shekel" }, { "id": "fa fa-sheqel", "name": "fa-sheqel" }, { "id": "fa fa-shield", "name": "fa-shield" }, { "id": "fa fa-ship", "name": "fa-ship" }, { "id": "fa fa-shirtsinbulk", "name": "fa-shirtsinbulk" }, { "id": "fa fa-shopping-cart", "name": "fa-shopping-cart" }, { "id": "fa fa-sign-in", "name": "fa-sign-in" }, { "id": "fa fa-sign-out", "name": "fa-sign-out" }, { "id": "fa fa-signal", "name": "fa-signal" }, { "id": "fa fa-simplybuilt", "name": "fa-simplybuilt" }, { "id": "fa fa-sitemap", "name": "fa-sitemap" }, { "id": "fa fa-skyatlas", "name": "fa-skyatlas" }, { "id": "fa fa-skype", "name": "fa-skype" }, { "id": "fa fa-slack", "name": "fa-slack" }, { "id": "fa fa-sliders", "name": "fa-sliders" }, { "id": "fa fa-slideshare", "name": "fa-slideshare" }, { "id": "fa fa-smile-o", "name": "fa-smile-o" }, { "id": "fa fa-soccer-ball-o", "name": "fa-soccer-ball-o" }, { "id": "fa fa-sort-alpha-asc", "name": "fa-sort-alpha-asc" }, { "id": "fa fa-sort-alpha-desc", "name": "fa-sort-alpha-desc" }, { "id": "fa fa-sort-amount-asc", "name": "fa-sort-amount-asc" }, { "id": "fa fa-sort-amount-desc", "name": "fa-sort-amount-desc" }, { "id": "fa fa-sort-asc", "name": "fa-sort-asc" }, { "id": "fa fa-sort-desc", "name": "fa-sort-desc" }, { "id": "fa fa-sort-down", "name": "fa-sort-down" }, { "id": "fa fa-sort-numeric-asc", "name": "fa-sort-numeric-asc" }, { "id": "fa fa-sort-numeric-desc", "name": "fa-sort-numeric-desc" }, { "id": "fa fa-sort-up", "name": "fa-sort-up" }, { "id": "fa fa-sort", "name": "fa-sort" }, { "id": "fa fa-soundcloud", "name": "fa-soundcloud" }, { "id": "fa fa-space-shuttle", "name": "fa-space-shuttle" }, { "id": "fa fa-spinner", "name": "fa-spinner" }, { "id": "fa fa-spoon", "name": "fa-spoon" }, { "id": "fa fa-spotify", "name": "fa-spotify" }, { "id": "fa fa-square-o", "name": "fa-square-o" }, { "id": "fa fa-square", "name": "fa-square" }, { "id": "fa fa-stack-exchange", "name": "fa-stack-exchange" }, { "id": "fa fa-stack-overflow", "name": "fa-stack-overflow" }, { "id": "fa fa-star-half-empty", "name": "fa-star-half-empty" }, { "id": "fa fa-star-half-full", "name": "fa-star-half-full" }, { "id": "fa fa-star-half-o", "name": "fa-star-half-o" }, { "id": "fa fa-star-half", "name": "fa-star-half" }, { "id": "fa fa-star-o", "name": "fa-star-o" }, { "id": "fa fa-star", "name": "fa-star" }, { "id": "fa fa-steam-square", "name": "fa-steam-square" }, { "id": "fa fa-steam", "name": "fa-steam" }, { "id": "fa fa-step-backward", "name": "fa-step-backward" }, { "id": "fa fa-step-forward", "name": "fa-step-forward" }, { "id": "fa fa-stethoscope", "name": "fa-stethoscope" }, { "id": "fa fa-stop", "name": "fa-stop" }, { "id": "fa fa-street-view", "name": "fa-street-view" }, { "id": "fa fa-strikethrough", "name": "fa-strikethrough" }, { "id": "fa fa-stumbleupon-circle", "name": "fa-stumbleupon-circle" }, { "id": "fa fa-stumbleupon", "name": "fa-stumbleupon" }, { "id": "fa fa-subscript", "name": "fa-subscript" }, { "id": "fa fa-subway", "name": "fa-subway" }, { "id": "fa fa-suitcase", "name": "fa-suitcase" }, { "id": "fa fa-sun-o", "name": "fa-sun-o" }, { "id": "fa fa-superscript", "name": "fa-superscript" }, { "id": "fa fa-support", "name": "fa-support" }, { "id": "fa fa-tablet", "name": "fa-tablet" }, { "id": "fa fa-table", "name": "fa-table" }, { "id": "fa fa-tachometer", "name": "fa-tachometer" }, { "id": "fa fa-tags", "name": "fa-tags" }, { "id": "fa fa-tag", "name": "fa-tag" }, { "id": "fa fa-tasks", "name": "fa-tasks" }, { "id": "fa fa-taxi", "name": "fa-taxi" }, { "id": "fa fa-tencent-weibo", "name": "fa-tencent-weibo" }, { "id": "fa fa-terminal", "name": "fa-terminal" }, { "id": "fa fa-text-height", "name": "fa-text-height" }, { "id": "fa fa-text-width", "name": "fa-text-width" }, { "id": "fa fa-th-large", "name": "fa-th-large" }, { "id": "fa fa-th-list", "name": "fa-th-list" }, { "id": "fa fa-thumb-tack", "name": "fa-thumb-tack" }, { "id": "fa fa-thumbs-down", "name": "fa-thumbs-down" }, { "id": "fa fa-thumbs-o-down", "name": "fa-thumbs-o-down" }, { "id": "fa fa-thumbs-o-up", "name": "fa-thumbs-o-up" }, { "id": "fa fa-thumbs-up", "name": "fa-thumbs-up" }, { "id": "fa fa-th", "name": "fa-th" }, { "id": "fa fa-ticket", "name": "fa-ticket" }, { "id": "fa fa-times-circle-o", "name": "fa-times-circle-o" }, { "id": "fa fa-times-circle", "name": "fa-times-circle" }, { "id": "fa fa-times", "name": "fa-times" }, { "id": "fa fa-tint", "name": "fa-tint" }, { "id": "fa fa-toggle-down", "name": "fa-toggle-down" }, { "id": "fa fa-toggle-left", "name": "fa-toggle-left" }, { "id": "fa fa-toggle-off", "name": "fa-toggle-off" }, { "id": "fa fa-toggle-on", "name": "fa-toggle-on" }, { "id": "fa fa-toggle-right", "name": "fa-toggle-right" }, { "id": "fa fa-toggle-up", "name": "fa-toggle-up" }, { "id": "fa fa-train", "name": "fa-train" }, { "id": "fa fa-transgender-alt", "name": "fa-transgender-alt" }, { "id": "fa fa-transgender", "name": "fa-transgender" }, { "id": "fa fa-trash-o", "name": "fa-trash-o" }, { "id": "fa fa-trash", "name": "fa-trash" }, { "id": "fa fa-tree", "name": "fa-tree" }, { "id": "fa fa-trello", "name": "fa-trello" }, { "id": "fa fa-trophy", "name": "fa-trophy" }, { "id": "fa fa-truck", "name": "fa-truck" }, { "id": "fa fa-try", "name": "fa-try" }, { "id": "fa fa-tty", "name": "fa-tty" }, { "id": "fa fa-tumblr-square", "name": "fa-tumblr-square" }, { "id": "fa fa-tumblr", "name": "fa-tumblr" }, { "id": "fa fa-turkish-lira", "name": "fa-turkish-lira" }, { "id": "fa fa-twitch", "name": "fa-twitch" }, { "id": "fa fa-twitter-square", "name": "fa-twitter-square" }, { "id": "fa fa-twitter", "name": "fa-twitter" }, { "id": "fa fa-umbrella", "name": "fa-umbrella" }, { "id": "fa fa-underline", "name": "fa-underline" }, { "id": "fa fa-undo", "name": "fa-undo" }, { "id": "fa fa-university", "name": "fa-university" }, { "id": "fa fa-unlink", "name": "fa-unlink" }, { "id": "fa fa-unlock-alt", "name": "fa-unlock-alt" }, { "id": "fa fa-unlock", "name": "fa-unlock" }, { "id": "fa fa-unsorted", "name": "fa-unsorted" }, { "id": "fa fa-upload", "name": "fa-upload" }, { "id": "fa fa-usd", "name": "fa-usd" }, { "id": "fa fa-user-md", "name": "fa-user-md" }, { "id": "fa fa-user-plus", "name": "fa-user-plus" }, { "id": "fa fa-user-secret", "name": "fa-user-secret" }, { "id": "fa fa-user-times", "name": "fa-user-times" }, { "id": "fa fa-users", "name": "fa-users" }, { "id": "fa fa-user", "name": "fa-user" }, { "id": "fa fa-venus-double", "name": "fa-venus-double" }, { "id": "fa fa-venus-mars", "name": "fa-venus-mars" }, { "id": "fa fa-venus", "name": "fa-venus" }, { "id": "fa fa-viacoin", "name": "fa-viacoin" }, { "id": "fa fa-video-camera", "name": "fa-video-camera" }, { "id": "fa fa-vimeo-square", "name": "fa-vimeo-square" }, { "id": "fa fa-vine", "name": "fa-vine" }, { "id": "fa fa-vk", "name": "fa-vk" }, { "id": "fa fa-volume-down", "name": "fa-volume-down" }, { "id": "fa fa-volume-off", "name": "fa-volume-off" }, { "id": "fa fa-volume-up", "name": "fa-volume-up" }, { "id": "fa fa-warning", "name": "fa-warning" }, { "id": "fa fa-wechat", "name": "fa-wechat" }, { "id": "fa fa-weibo", "name": "fa-weibo" }, { "id": "fa fa-weixin", "name": "fa-weixin" }, { "id": "fa fa-whatsapp", "name": "fa-whatsapp" }, { "id": "fa fa-wheelchair", "name": "fa-wheelchair" }, { "id": "fa fa-wifi", "name": "fa-wifi" }, { "id": "fa fa-windows", "name": "fa-windows" }, { "id": "fa fa-won", "name": "fa-won" }, { "id": "fa fa-wordpress", "name": "fa-wordpress" }, { "id": "fa fa-wrench", "name": "fa-wrench" }, { "id": "fa fa-xing-square", "name": "fa-xing-square" }, { "id": "fa fa-xing", "name": "fa-xing" }, { "id": "fa fa-yahoo", "name": "fa-yahoo" }, { "id": "fa fa-yelp", "name": "fa-yelp" }, { "id": "fa fa-yen", "name": "fa-yen" }, { "id": "fa fa-youtube-play", "name": "fa-youtube-play" }, { "id": "fa fa-youtube", "name": "fa-youtube" }];
  }
}