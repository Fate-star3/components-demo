// /** 多页面项目路由跳转方案 */

// import runtime from './runtime'

// /**
//  * 获取url参数，如果传入key，就返回指定key的值
//  * 不传就返回参数对象 没有参数就返回null
//  * @param {String} key
//  */
// export const getQueryParam = (key?: string): any => {
//   if (!window.location.search) {
//     return null
//   }
//   const searchParams = new URLSearchParams(window.location.search)

//   if (key) {
//     return searchParams.get(key) || ''
//   }
//   const result = {}
//   for (const [key, value] of searchParams.entries()) {
//     result[key] = value
//   }
//   return result
// }

// /**
//  * 给当前url添加额外的参数
//  * @param {String} key 参数的key
//  * @param {any} value 参数的值
//  */
// export const appendParam = (key, value) => {
//   const { origin, pathname, search } = window.location
//   const searchParams = new URLSearchParams(search)

//   searchParams.append(key, value)
//   let result = ''

//   if (searchParams.toString()) {
//     result = `?${searchParams.toString()}`
//   }

//   return origin + pathname + result
// }

// /**
//  * 页面跳转
//  * @param {String} path 需要跳转的路径，例如：/ca-download
//  * @param {String} params url额外的参数
//  */
// export function push(path = '', params = '') {
//   path = `/drpanda${path}/`
//   if (!runtime.isDevelopment) {
//     path = `/${APP_NAME}/${runtime.envPath}${path}`
//   }
//   const { origin } = window.location
//   const searchParams = new URLSearchParams(params)
//   const newPath = `${origin + path}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`

//   console.log('newPath:', newPath)
//   if (newPath) {
//     window.location.href = newPath
//   }
// }

// export default {
//   getQueryParam,
//   appendParam,
//   push,
// }
export default {}
