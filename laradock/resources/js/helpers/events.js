export default class Events{
  constructor(){
    this.init()
  }
  init(){
    window.addEventListener("DOMContentLoaded", () => {
      this.emitInitToLivewireComponents()
    })
    this.modalsEvent()
    this.htmlEvent()
    this.toastEvent()
    this.tabEvent()
    this.submitFormEvent()
    this.templateSelectorEvent()
  }
  toastEvent(){
    const fun = (e) => {
      if(!e.detail && !e.data.detail) return
      
      if(e.data && e.data.detail){
        e.detail = e.data.detail
      }

      toastr[e.detail.type](e.detail.message)
    }
    window.addEventListener('message', fun)
    window.addEventListener('toast',fun)
  }
  emitInitToLivewireComponents(){
    $('.emit-init').each(function(){
      const emit_name = $(this).data('emit-name')
      const emit_data = $(this).data('emit-data')
      const emit_data_object = $(this).data('emit-object')

      Livewire.emit(emit_name,emit_data_object ? JSON.parse(emit_data) : emit_data);
    })
  }
  modalsEvent(){
    window.addEventListener('openModal',e => {
      $(e.detail.class).modal('show')
    })
    window.addEventListener('closeModal',e => {
      $(e.detail.class).modal('hide')
    })
  }
  htmlEvent(){
    window.addEventListener('html',e => {
      Livewire.emit(
        'onHtml',
        [
          '<style type="text/css">',
            window.builder.editor.getCss(),
          '</style>',
          window.builder.editor.getHtml()
        ].join('')
      )
    })
  }
  tabEvent(){
    window.addEventListener('openNewTab', e => {
      var win = window.open(e.detail.url,'_blank')
      win.focus()
    })
  }
  submitFormEvent(){
    window.addEventListener('submitForm',e => {
      $(e.detail.id).submit()
    })
  }
  templateSelectorEvent(){
    window.addEventListener('template-selected',e => {
      window.builder.editor.setComponents(
        window.builder.editor.getHtml()+e.detail.template
      )
    })
  }
}

new Events