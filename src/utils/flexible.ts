// eslint-disable-next-line func-names
export default function () {
  const doc = window.document
  const docEl = doc.documentElement
  let timerId

  function refreshRem() {
    const { width } = docEl.getBoundingClientRect()
    // width = width > 750 ? 750 : width
    const rem = width / 10
    docEl.style.setProperty('font-size', `${rem}px`, 'important')
  }

  window.addEventListener(
    'resize',
    () => {
      clearTimeout(timerId)
      timerId = setTimeout(refreshRem, 300)
    },
    false,
  )
  window.addEventListener(
    'pageshow',
    e => {
      /** 页面是否从缓存中加载 */
      if (e.persisted) {
        clearTimeout(timerId)
        timerId = setTimeout(refreshRem, 300)
      }
    },
    false,
  )

  refreshRem()
}
