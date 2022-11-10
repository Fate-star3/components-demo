// /* 神策埋点相关 */
// /* eslint-disable prettier/prettier */
// /* eslint-disable func-names */
// /* eslint-disable prefer-rest-params */
// import { PageModule, ProjectType } from "@/common/type"
// import RUNTIME from '@/utils/runtime'

// const server_url: string[] = []

// const Delay = 200
// const SensorsServer = {
//   [ProjectType.CA]: 'https://sensorsdata-2.talbrain.com:8080/sa?project=ChineseAcademy',
//   [ProjectType.CC]: 'https://sensorsdata.talbrain.com:8080/sa?project=DrpandaCC',
//   [ProjectType.LP]: 'https://sensorsdata.talbrain.com:8080/sa?project=DrpandaLP',
//   [ProjectType.OLA]: 'https://sensorsdata-4.talbrain.com:8080/sa?project=DrpandaOLA'
// }

// /** h5的基础属性 */
// function baseProperty(): Record<string, any> {
//   const { pathname } = window.location
//   const h5_path = pathname
//   const h5_module = PageModule
//   const h5_title = document.title

//   let obj = {
//     h5_path,
//     h5_module,
//     h5_title,
//     h5_env: RUNTIME.env,
//     h5_runtime: RUNTIME.runtime,
//   }

//   obj = {
//     ...obj,
//   }
//   return obj
// }

// /** 添加属性 */
// function addProperty<T>(data: T): () => T {
//   const property: any = {
//     ...baseProperty(),
//   }

//   // 同名的属性将会被替换掉
//   for (const key in data) {
//     if (key && data[key]) {
//       property[key] = data[key]
//     }
//   }

//   return property
// }

// export default {
//   init: (project) => {
//     if (!project) {
//       console.log('🙃🙃🙃🙃🙃---无神策埋点相关项目配置，初始化神策SDK失败---')
//       return
//     }
//     /** 根据项目匹配埋点服务器 */
//     if (typeof project === 'string') {
//       server_url.push(SensorsServer[project])
//     }
//     if (Array.isArray(project)) {
//       project.forEach(item => {
//         server_url.push(SensorsServer[item])
//       })
//     }
//     ; (function (para) {
//       const p = para.sdk_url
//       const n = para.name
//       const w: any = window
//       const d = document
//       const s = 'script'
//       let x: any = null
//       let y = null

//       if (typeof w.sensorsDataAnalytic201505 !== 'undefined') {
//         return false
//       }
//       w.sensorsDataAnalytic201505 = n
//       w[n] =
//         w[n] ||
//         function (a: any) {
//           return function () {
//             ; (w[n]._q = w[n]._q || []).push([a, arguments])
//           }
//         }
//       const ifs = [
//         'track',
//         'quick',
//         'register',
//         'registerPage',
//         'registerOnce',
//         'trackSignup',
//         'trackAbtest',
//         'setProfile',
//         'setOnceProfile',
//         'appendProfile',
//         'incrementProfile',
//         'deleteProfile',
//         'unsetProfile',
//         'identify',
//         'login',
//         'logout',
//         'trackLink',
//         'clearAllRegister',
//         'getAppStatus',
//       ]

//       for (let i = 0; i < ifs.length; i++) {
//         w[n][ifs[i]] = w[n].call(null, ifs[i])
//       }
//       if (!w[n]._t) {
//         // eslint-disable-next-line no-sequences
//         ; (x = d.createElement(s)), (y = d.getElementsByTagName(s)[0])
//         x.async = 1
//         x.src = p
//         x.setAttribute('charset', 'UTF-8')
//         w[n].para = para
//         y.parentNode?.insertBefore(x, y)
//       }
//     })({
//       sdk_url: 'https://cdn01.xiongmaoboshi.com/sdk/sensorsdata.min.js',
//       name: 'sensors',
//       server_url,
//       app_js_bridge: [
//         'http://sensorsdata.talbrain.com:8106/sa?project=DrpandaCC',
//         'http://sensorsdata-2.talbrain.com:8106/sa?project=ChineseAcademy',
//       ],
//       heatmap: {
//         scroll_notice_map: 'default',
//         clickmap: 'not_collect',
//       },
//     })
//   },
//   /** 自定义事件 */
//   track: (eventName: string, data = {}, success?: () => void) => {
//     if (window.sensors) {
//       try {
//         window.sensors.track(`${eventName}`, addProperty<Record<string, any>>(data))
//       } catch (e) {
//         console.log(e)
//       }
//     }
//     // 神策埋点确保执行成功
//     if (success) {
//       setTimeout(() => {
//         success()
//       }, Delay)
//     }
//   },
//   login: (data: any) => {
//     if (window.sensors) {
//       try {
//         window.sensors.login(data)
//       } catch (e) {
//         console.log(e)
//       }
//     }
//   },
//   /** 触发pageview事件 */
//   autoTrack: (data: Record<string, any>) => {
//     if (window.sensors) {
//       window.sensors.quick('autoTrack', addProperty<Record<string, any>>(data))
//     }
//   },
//   /** web点击 */
//   webClick: (target: string, data: Record<string, any>, success?: () => void) => {
//     if (window.sensors) {
//       window.sensors.quick('trackAllHeatMap', target, addProperty<Record<string, any>>(data))
//     }

//     // 神策埋点确保执行成功
//     if (success) {
//       setTimeout(() => {
//         success()
//       }, Delay)
//     }
//   }
// }
export default {}
