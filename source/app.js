(function () {
  'use strict'

  //if true this is for local testing at ./source/local_testing.html
  if (!window.addEventListener) return // Check for IE9+
  var element
  var options
  // updateElement runs every time the options are updated.
  // Most of your code will end up inside this function.
  function updateElement () {
    options = INSTALL_OPTIONS
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

}())
