class PagesIndex{
  constructor(){
    this.init()
  }
  init(){
    const element = $('[data-message]')
    if(element.length){
      const type = element.data('type')
      const message = element.data('message')

      window.postMessage({
        detail: {
          type: type,
          message: message
        }
      })
    }
  }
}

new PagesIndex()