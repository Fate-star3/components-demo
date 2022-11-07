// import wx from 'weixin-js-sdk'

// import runtime from './runtime'

// import { RuntimeType } from '@/common/type'

// interface IShareConfig {
//   title?: string
//   desc?: string
//   link?: string
//   imgUrl?: string
//   /** 成功分享的回调 这个成功只是触发分享 但实际有没有分享未知 */
//   onSuccess?: () => void
// }

// const defaultShareConfig: IShareConfig = {
//   title: '熊猫博士',
//   desc: '全世界孩子最好的伙伴',
//   link: window.location.href,
//   imgUrl: 'https://preview-web.xiongmaoboshi.com/resource/assets/images/drPanda-logo.png',
// }

// export default {
//   /**
//    * 初始化微信分享
//    */
//   initWechatShare: (shareConfig?: IShareConfig) => {
//     // 分享到朋友圈
//     const {
//       title = defaultShareConfig.title,
//       desc = defaultShareConfig.desc,
//       link = defaultShareConfig.link,
//       imgUrl = defaultShareConfig.imgUrl,
//       onSuccess,
//     } = shareConfig || {}
//     if (runtime.runtime !== RuntimeType.WECHAT) {
//       return
//     }
//     wx.onMenuShareTimeline({
//       // 分享标题
//       title,
//       // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//       link,
//       imgUrl,
//       success: () => {
//         // 用户点击了分享后执行的回调函数
//         console.log('点击分享到朋友圈')
//         onSuccess && onSuccess()
//       },
//     })
//     // 分享给朋友
//     wx.onMenuShareAppMessage({
//       // 分享标题
//       title,
//       // 分享描述
//       desc,
//       // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//       link,
//       imgUrl,
//       type: 'link',
//       dataUrl: '',
//       success: () => {
//         // 用户点击了分享后执行的回调函数
//         console.log('点击分享给朋友')
//         onSuccess && onSuccess()
//       },
//     })
//   },

//   /** 分享到朋友圈 */
//   wxShareToMoments: (shareConfig?: IShareConfig) => {
//     const {
//       title = defaultShareConfig.title,
//       link = defaultShareConfig.link,
//       imgUrl = defaultShareConfig.imgUrl,
//       onSuccess,
//     } = shareConfig
//     wx.onMenuShareTimeline({
//       // 分享标题
//       title,
//       // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//       link,
//       imgUrl,
//       success: () => {
//         // 用户点击了分享后执行的回调函数
//         console.log('点击分享到朋友圈')
//         onSuccess && onSuccess()
//       },
//     })
//   },

//   /** 分享给好友 */
//   wxShareToFriends: (shareConfig?: IShareConfig) => {
//     const {
//       title = defaultShareConfig.title,
//       desc = defaultShareConfig.desc,
//       link = defaultShareConfig.link,
//       imgUrl = defaultShareConfig.imgUrl,
//       onSuccess,
//     } = shareConfig
//     wx.onMenuShareAppMessage({
//       // 分享标题
//       title,
//       // 分享描述
//       desc,
//       // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//       link,
//       imgUrl,
//       success: () => {
//         // 用户点击了分享后执行的回调函数
//         console.log('点击分享给朋友')
//         onSuccess && onSuccess()
//       },
//     })
//   },
// }
export default {

}
