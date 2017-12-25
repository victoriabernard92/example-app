window.INSTALL = window.INSTALL || {}
window.INSTALL_OPTIONS = {
      // default testing options
        "location": {
            "selector": "body",
            "method": "before"
          },
        "message":
           "<p>Welcome to Cloudflare Apps! This is our example app.</p><p>Download this app every time you want to make a new project.</p>"
      }
INSTALL.createElement = function(location, element){
  element = element || document.createElement('div')
  if (!location){
    //default to append to the document body if location not given
    elementMethodSwitch(element, document.body, 'append')
    return element
  }
  var locations = document.querySelectorAll(location.selector)
  locations.forEach((el) => {
      el.appendChild(element)
    // before, after, append, prepend or replace
      el = elementMethodSwitch(element, el, location.method)
  })
  return element
}
function elementMethodSwitch(el, parent, method){
  //implements the specified method by adding el to the parent
  var grandpa = parent.parentElement
  switch (method){
    case 'append':
          return parent.appendChild(el)
    case 'prepend':
          return parent.prepend(el)
    case 'before':
          return grandpa.insertBefore(el, parent)
    case 'after':
          return grandpa.insertBefore(el, parent.nextSibling)
    case 'replace':
          return grandpa.replaceChild(el, parent)
  }
}
