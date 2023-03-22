/**
 * Utils class for making calls with authenticated users
 */
export default class Fetch{
  
  constructor(route,isHtml){
    this.route = route
    this.isHtml = isHtml
  }

  fetch = async (params,method) => {
    const token = $("[name='user_token']")
    if(!token || !token.attr('content').length){
      window.location.href = "/login"
      return false;
    }

    const payload = {
      method: method || 'GET',
      headers: {
        'Authorization': 'Bearer '+token.attr('content'),
        'X-Language': $('[data-language]').data('language') || 'en',
        'Accept': !this.isHtml ? 'application/json' : 'text/html'
      }
    };
    if(method && method!=='GET'){
      payload['body'] = JSON.stringify(params || {})
    }
    const request = await fetch(this.route,payload)
    const data = await (this.isHtml ? request.text() : request.json())

    return data
  }
}