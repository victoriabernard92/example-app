(function () {
  'use strict'

  var isLocalTest = true
  if (typeof INSTALL_ID === 'string'  ){
     isLocalTest = (INSTALL_ID !== "preview" ) && (typeof window.INSTALL_OPTIONS !== 'object')
  }
  //if true this is for local testing at ./source/local_testing.html
  if (!window.addEventListener) return // Check for IE9+
  var options = window.INSTALL_OPTIONS || {}
  var element

  // Check if INSTALL_OPTIONS exists, if not this is for local testing at ./source/local_testing.html
  if (isLocalTest) {
    window.INSTALL = window.INSTALL || {}
    options = {
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

  }else{
    var options = window.INSTALL_OPTIONS
  }

  // updateElement runs every time the options are updated.
  // Most of your code will end up inside this function.
  function updateElement () {

    element = INSTALL.createElement(options.location, element)

    // Set the app attribute to your app's dash-delimited alias.
    element.setAttribute('app', 'example')
    element.innerHTML = options.message
  }

  // INSTALL_SCOPE is an object that is used to handle option changes without refreshing the page.
    window.INSTALL_SCOPE = {
      setOptions: function setOptions (nextOptions) {
        options = nextOptions

        updateElement()
      }
    }

  // This code ensures that the app doesn't run before the page is loaded.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateElement)
  } else {
    updateElement()
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
}())
