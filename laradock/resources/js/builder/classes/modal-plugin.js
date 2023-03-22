import Fetch from "../../helpers/fetch"

/**
 * Plugin class for grapes JS which will render a modal block for bootstrap, with custom content
 */
export default class ModalPlugin{
  constructor(editor,options){
    this.editor = editor
    this.options = options
    this.page_id = !$('[name="page_id"]').length ? 0 : parseInt($('[name="page_id"]').val(),10)

    if(!this.page_id) return

    this.init()
  }
  async init(){
    this.optionsTraits = await this.fetchModals()
    this.trainingModalIds()
    this.handleComponentSelected()
    this.addTypeForBlock()
    //this.addBlock()
  }
  /**
   * 
   * @returns  modals added by the user
   */
  async fetchModals(){
    const response = await (new Fetch('/api/modals')).fetch()
    const options = []

    response.content.map((el,i) => options.push({
      id: '#modal-'+el.id,
      name: el.name
    }))

    return options
  }
  async updateLinkedModal(modal_ids,type){
    const response = await (new Fetch('/api/pages/'+this.page_id)).fetch({
      modal_ids: modal_ids
    },type || 'PUT')
    console.log(response)
  }
  /**
   * Define a new custom trait for the button widget
   */
  addTypeForBlock(){
    const self = this

    self.editor.DomComponents.addType('button', {
      isComponent: el => el.tagName == 'BUTTON',
      model: {
        defaults: {
          traits: [
            self.getTrait()
          ],
          attributes: { 'data-bs-toggle': 'modal' },
        },
        init() {
          this.on('change:attributes:data-bs-target', self.handleDataTargetChange.bind(self,this));
        },
      },
    });
    
  }
  /**
   * Adds a new widget block on editor
   */
  addBlock(){
    const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM96 96H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>`
    this.editor.BlockManager.add('modal', {
      label: 'Modal',
      category: 'Extra',
      media: icon,
      content: {
        type: 'button'
      },
    });
  }
  /**
   * Will handle the component selected event
   * 
   * @param {*} options 
   */
  handleComponentSelected(){
    this.editor.on('component:selected', this.onComponentSelectionOrClone.bind(this));
    this.editor.on('component:clone', this.onComponentSelectionOrClone.bind(this));

    this.editor.on('component:remove', async (some, argument) => {
      if(some.attributes.attributes.type!='button' || !some.attributes.attributes['data-bs-target']) return

      const modal_id = some.attributes.attributes['data-bs-target'].split('-')[1]
      
      await this.updateLinkedModal([modal_id],'DELETE')

      delete this.modal_ids[[some.cid]]

      this.updateLinkedModal(Object.values(this.modal_ids))
    });
  }
  /**
   * 
   * @returns The select traits which contains all the modals added
   */
  getTrait(){
    return {
      type: 'select',
      label: 'Modal target',
      name: 'data-bs-target',
      options: this.optionsTraits
    }
  }
  /**
   * Training of modal ids on page load
   */
  trainingModalIds(){
    const components = this.editor.getComponents()
    this.modal_ids = []
    components.models.map((component,i) => {
      const attributes = component.attributes.attributes
      if(attributes['data-bs-target']){
        const modal_id = attributes['data-bs-target'].split('-')[1]

        if(this.modal_ids.indexOf(modal_id)==-1){
          this.modal_ids[component.cid] = modal_id
        }
      }
    })
  }
  /**
   * Called on update select change on trait
   * 
   * @param {*} component 
   */
  handleDataTargetChange(component){
    this.modal_ids[component.cid] = component.attributes.attributes['data-bs-target'].split('-')[1]
    this.updateLinkedModal(Object.values(this.modal_ids))
  }
  /**
   * Called when a selection or clone
   * 
   * @param {*} some 
   * @param {*} argument 
   * @returns 
   */
  onComponentSelectionOrClone(some, argument){
    if(some.attributes.type!='button') return

    if(!some.getTrait('data-bs-target')) some.addTrait(this.getTrait())
    some.off('change:attributes:data-bs-target').on('change:attributes:data-bs-target', this.handleDataTargetChange.bind(this,some))
  }
}