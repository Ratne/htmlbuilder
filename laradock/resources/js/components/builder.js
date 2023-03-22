import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';
import modalPlugin from '../builder/modal-plugin';
import iconListPlugin from '../builder/icon-list-plugin';
import gridPlugin from '../builder/grid-plugin';
import LocaleHelper from '../helpers/locale';
import Fetch from '../helpers/fetch';

class Builder{
  constructor(){
    this.isEdit = false

    this.fetchImagesUplaoded()
      .then((images) => {
        this.images = images.data;
        this.configure()
        this.onEdit()
        this.onUndo()
        this.noScrollableEditorPage()
      })
  }
  configure(){
    this.editor  = grapesjs.init(
      this.getConfiguration()
    );

    this.editor.I18n.addMessages({
      en: {
        styleManager: {
          properties: {
            'background-repeat': 'Repeat',
            'background-position': 'Position',
            'background-attachment': 'Attachment',
            'background-size': 'Size',
          }
        },
      }
    });

    this.onLoad()
  }
  getConfiguration(){
    return {
      height: ($(window).height()-50)+'px',
      container : '#gjs',
      fromElement: true,
      showOffsets: true,
      storageManager: false,
      assetManager: {
        upload: window.location.protocol+'//'+window.location.host+'/api/media?user_token='+$('[name="user_token"]').attr('content'),
        uploadName: 'files',
        embedAsBase64: false,
        assets: this.images
      },
      selectorManager: { componentFirst: true },
      canvas: {
        styles: [
          'https://fonts.googleapis.com/css?family=Abel|Abril+Fatface|Acme|Alegreya|Alegreya+Sans|Anton|Archivo|Archivo+Black|Archivo+Narrow|Arimo|Arvo|Asap|Asap+Condensed|Bitter|Bowlby+One+SC|Bree+Serif|Cabin|Cairo|Catamaran|Crete+Round|Crimson+Text|Cuprum|Dancing+Script|Dosis|Droid+Sans|Droid+Serif|EB+Garamond|Exo|Exo+2|Faustina|Fira+Sans|Fjalla+One|Francois+One|Gloria+Hallelujah|Hind|Inconsolata|Indie+Flower|Josefin+Sans|Julee|Karla|Lato|Libre+Baskerville|Libre+Franklin|Lobster|Lora|Mada|Manuale|Maven+Pro|Merriweather|Merriweather+Sans|Montserrat|Montserrat+Subrayada|Mukta+Vaani|Muli|Noto+Sans|Noto+Serif|Nunito|Open+Sans|Open+Sans+Condensed:300|Oswald|Oxygen|PT+Sans|PT+Sans+Caption|PT+Sans+Narrow|PT+Serif|Pacifico|Passion+One|Pathway+Gothic+One|Play|Playfair+Display|Poppins|Questrial|Quicksand|Raleway|Roboto|Roboto+Condensed|Roboto+Mono|Roboto+Slab|Ropa+Sans|Rubik|Saira|Saira+Condensed|Saira+Extra+Condensed|Saira+Semi+Condensed|Sedgwick+Ave|Sedgwick+Ave+Display|Shadows+Into+Light|Signika|Slabo+27px|Source+Code+Pro|Source+Sans+Pro|Spectral|Titillium+Web|Ubuntu|Ubuntu+Condensed|Varela+Round|Vollkorn|Work+Sans|Yanone+Kaffeesatz|Zilla+Slab|Zilla+Slab+Highlight'
        ]
      },
      styleManager: {
        sectors: [{
            name: 'General',
            properties:[
              {
                extend: 'float',
                type: 'radio',
                default: 'none',
                options: [
                  { value: 'none', className: 'fa fa-times'},
                  { value: 'left', className: 'fa fa-align-left'},
                  { value: 'right', className: 'fa fa-align-right'}
                ],
              },
              'display',
              { extend: 'position', type: 'select' },
              'top',
              'right',
              'left',
              'bottom',
            ],
          }, {
              name: 'Dimension',
              open: false,
              properties: [
                'width',
                {
                  id: 'flex-width',
                  type: 'integer',
                  name: 'Width',
                  units: ['px', '%'],
                  property: 'flex-basis',
                  toRequire: 1,
                },
                'height',
                'max-width',
                'min-height',
                'margin',
                'padding'
              ],
            },{
              name: 'Typography',
              open: false,
              properties: [
                  'font-family',
                  'font-size',
                  'font-weight',
                  'letter-spacing',
                  'color',
                  'line-height',
                  {
                    extend: 'text-align',
                    options: [
                      { id : 'left',  label : 'Left',    className: 'fa fa-align-left'},
                      { id : 'center',  label : 'Center',  className: 'fa fa-align-center' },
                      { id : 'right',   label : 'Right',   className: 'fa fa-align-right'},
                      { id : 'justify', label : 'Justify',   className: 'fa fa-align-justify'}
                    ],
                  },
                  {
                    property: 'text-decoration',
                    type: 'radio',
                    default: 'none',
                    options: [
                      { id: 'none', label: 'None', className: 'fa fa-times'},
                      { id: 'underline', label: 'underline', className: 'fa fa-underline' },
                      { id: 'line-through', label: 'Line-through', className: 'fa fa-strikethrough'}
                    ],
                  },
                  'text-shadow'
              ],
            },{
              name: 'Decorations',
              open: false,
              properties: [
                'opacity',
                'border-radius',
                'border',
                'box-shadow',
                'background', // { id: 'background-bg', property: 'background', type: 'bg' }
              ],
            },{
              name: 'Extra',
              open: false,
              buildProps: [
                'transition',
                'perspective',
                'transform'
              ],
            },{
              name: 'Flex',
              open: false,
              properties: [{
                name: 'Flex Container',
                property: 'display',
                type: 'select',
                defaults: 'block',
                list: [
                  { value: 'block', name: 'Disable'},
                  { value: 'flex', name: 'Enable'}
                ],
              },{
                name: 'Flex Parent',
                property: 'label-parent-flex',
                type: 'integer',
              },{
                name: 'Direction',
                property: 'flex-direction',
                type: 'radio',
                defaults: 'row',
                list: [{
                  value: 'row',
                  name: 'Row',
                  className: 'icons-flex icon-dir-row',
                  title: 'Row',
                },{
                  value: 'row-reverse',
                  name: 'Row reverse',
                  className: 'icons-flex icon-dir-row-rev',
                  title: 'Row reverse',
                },{
                  value: 'column',
                  name: 'Column',
                  title: 'Column',
                  className: 'icons-flex icon-dir-col',
                },{
                  value: 'column-reverse',
                  name: 'Column reverse',
                  title: 'Column reverse',
                  className: 'icons-flex icon-dir-col-rev',
                }],
              },{
                name: 'Justify',
                property: 'justify-content',
                type: 'radio',
                defaults: 'flex-start',
                list: [{
                  value: 'flex-start',
                  className: 'icons-flex icon-just-start',
                  title: 'Start',
                },{
                  value: 'flex-end',
                  title: 'End',
                  className: 'icons-flex icon-just-end',
                },{
                  value: 'space-between',
                  title: 'Space between',
                  className: 'icons-flex icon-just-sp-bet',
                },{
                  value: 'space-around',
                  title: 'Space around',
                  className: 'icons-flex icon-just-sp-ar',
                },{
                  value: 'center',
                  title: 'Center',
                  className: 'icons-flex icon-just-sp-cent',
                }],
              },{
                name: 'Align',
                property: 'align-items',
                type: 'radio',
                defaults: 'center',
                list: [{
                  value: 'flex-start',
                  title: 'Start',
                  className: 'icons-flex icon-al-start',
                },{
                  value: 'flex-end',
                  title: 'End',
                  className: 'icons-flex icon-al-end',
                },{
                  value: 'stretch',
                  title: 'Stretch',
                  className: 'icons-flex icon-al-str',
                },{
                  value: 'center',
                  title: 'Center',
                  className: 'icons-flex icon-al-center',
                }],
              },{
                name: 'Flex Children',
                property: 'label-parent-flex',
                type: 'integer',
              },{
                name: 'Order',
                property: 'order',
                type: 'integer',
                defaults: 0,
                min: 0
              },{
                name: 'Flex',
                property: 'flex',
                type: 'composite',
                properties  : [{
                  name: 'Grow',
                  property: 'flex-grow',
                  type: 'integer',
                  defaults: 0,
                  min: 0
                },{
                  name: 'Shrink',
                  property: 'flex-shrink',
                  type: 'integer',
                  defaults: 0,
                  min: 0
                },{
                  name: 'Basis',
                  property: 'flex-basis',
                  type: 'integer',
                  units: ['px','%',''],
                  unit: '',
                  defaults: 'auto',
                }],
              },{
                name: 'Align',
                property: 'align-self',
                type: 'radio',
                defaults: 'auto',
                list: [{
                  value: 'auto',
                  name: 'Auto',
                },{
                  value: 'flex-start',
                  title: 'Start',
                  className: 'icons-flex icon-al-start',
                },{
                  value   : 'flex-end',
                  title: 'End',
                  className: 'icons-flex icon-al-end',
                },{
                  value   : 'stretch',
                  title: 'Stretch',
                  className: 'icons-flex icon-al-str',
                },{
                  value   : 'center',
                  title: 'Center',
                  className: 'icons-flex icon-al-center',
                }],
              }]
            }
          ],
      },
      plugins: [
        gridPlugin,
        modalPlugin,
        iconListPlugin,
        'grapesjs-custom-code',
        'gjs-blocks-basic',
        //'grapesjs-plugin-forms',
        'grapesjs-component-countdown',
        'grapesjs-plugin-export',
        'grapesjs-tabs',
        'grapesjs-custom-code',
        'grapesjs-touch',
        'grapesjs-parser-postcss',
        'grapesjs-tooltip',
        'grapesjs-tui-image-editor',
        'grapesjs-typed',
        'grapesjs-style-bg',
        'grapesjs-preset-webpage',
      ],
      pluginsOpts: {
        'gjs-blocks-basic': { flexGrid: true },
        'grapesjs-tui-image-editor': {
          script: [
            // 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.6.7/fabric.min.js',
            'https://uicdn.toast.com/tui.code-snippet/v1.5.2/tui-code-snippet.min.js',
            'https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.js',
            'https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.js'
          ],
          style: [
            'https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.css',
            'https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.css',
          ],
        },
        'grapesjs-tabs': {
          tabsBlock: { category: 'Extra' }
        },
        'grapesjs-typed': {
          block: {
            category: 'Extra',
            content: {
              type: 'typed',
              'type-speed': 40,
              strings: [
                'Text row one',
                'Text row two',
                'Text row three',
              ],
            }
          }
        },
        'grapesjs-preset-webpage': {
          modalImportTitle: 'Import Template',
          modalImportLabel: '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
          modalImportContent: function(editor) {
            return editor.getHtml() + '<style>'+editor.getCss()+'</style>'
          },
        },
      },
    }
  }
  onEdit(){
    const self = this
    this.editor.on('update',function(){
      self.isEdit = true
      self.blockOnExitIfNeeded()
    })
  }
  blockOnExitIfNeeded(){
    window.onbeforeunload = function() {
      return " ";
    }
  }
  onUndo(){
    this.editor.on('run:core:component-delete:before', (e) => {
      if(!confirm((new LocaleHelper).trans('Are you sure to delete this?'))){
        setTimeout(() => {
          this.editor.UndoManager.undo();
        },150)
      }
    })
  }
  noScrollableEditorPage(){
    this.editor.on('component:add', () => {
      setTimeout(() =>{
        $("#gjs").css('height',(this.editor.Canvas.getDocument().body.scrollHeight+100)+'px')
      },300)
    })
  }
  async fetchImagesUplaoded(){
    return await (new Fetch('/api/media',false)).fetch({},'GET')
  }
  async fetchGoogleFonts(){
    var response = await (new Fetch('/api/font',false)).fetch({},'GET')
    var fonts = []

    response.fonts.map((el,i) => {
      fonts.push(
        {value: "'"+el+"', sans-serif", name: el}
      )
    })

    return fonts
  }
  onLoad(){
    this.editor.on('load', async () => {
      const prop = this.editor.StyleManager.getProperty('typography', 'font-family');
      prop.set('options', 
        await this.fetchGoogleFonts()
      );
      /**
       * Prepend FontAwesome 4
       */
      if(this.editor.getHtml().indexOf('font-awesome.min.css')==-1){
        this.editor.setComponents(
          '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">' + this.editor.getHtml()
        )
      }
    })
  }
}

window.builder = new Builder()