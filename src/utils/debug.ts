export default () => {
  try {
    if (window.debugCount === undefined) {
      window.debugCount = 0
    }
    if (window.debugCount > 0) {
      return
    }
    if (window !== window.top) {
      console.debug('🤣🤣🤣🤣🤣---------custom-site in frame!!-----------')
      return
    }

    let isDebug = window.location.href.search(/\/(dev|pre)\/|(192|127|localhost)/) !== -1

    if (!isDebug) {
      let clientIP = ''
      const xhr = new XMLHttpRequest()
      xhr.open('GET', 'https://fc.xiongmaoboshi.com/h5/tool/client/ip', false)
      xhr.setRequestHeader('accept', 'application/json')
      xhr.send()
      const res = JSON.parse(xhr.responseText)
      if (res && res.ip) {
        clientIP = res.ip
      }
      isDebug = clientIP === '222.209.84.192'
    }

    if (isDebug) {
      const erudaElement = document.createElement('link')
      erudaElement.href = 'https://cdn.bootcdn.net/ajax/libs/eruda/2.4.1/eruda.min.js'
      erudaElement.rel = 'preload'
      erudaElement.as = 'script'
      document.head.appendChild(erudaElement)

      const erudaElementScriptElement = document.createElement('script')
      erudaElementScriptElement.src = 'https://cdn.bootcdn.net/ajax/libs/eruda/2.4.1/eruda.min.js'
      document.head.appendChild(erudaElementScriptElement)
      erudaElementScriptElement.onload = () => {
        window.eruda?.init()
        window.debugCount++
      }

      const vConsoleElement = document.createElement('link')
      vConsoleElement.href = 'https://cdn.bootcdn.net/ajax/libs/eruda/2.4.1/eruda.min.js'
      vConsoleElement.rel = 'preload'
      vConsoleElement.as = 'script'
      document.head.appendChild(vConsoleElement)

      const vConsoleElementScriptElement = document.createElement('script')
      vConsoleElementScriptElement.src =
        'https://cdn.bootcdn.net/ajax/libs/vConsole/3.9.5/vconsole.min.js'
      document.head.appendChild(vConsoleElementScriptElement)
      vConsoleElementScriptElement.onload = () => {
        new window.VConsole()
        window.debugCount++
      }
    }
  } catch (e) {
    // open debug-tool fail
  }
}
