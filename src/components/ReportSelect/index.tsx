// /* eslint-disable no-async-promise-executor */
// /* eslint-disable func-names */
// import QRCode from 'qrcode'
// import { useState, useEffect } from 'react'

// import styles from './index.module.scss'

// import { getDevice, os } from '../../../../../utils/tools'
// import { ReferralSuperParams, ReportImg } from '../../constant'

// import Toast from '@/components/Toast'
// import introduceApi from '@/services/introduce'
// import { getModel, useModel } from '@/store'
// import sensors from '@/utils/sensors'
// import { asyncFetch } from '@/utils/tools'
// import { wechatShareImgToFriend, wechatShareImgToMonments } from '@/utils/uniWebview'

// /**
//  * 图片的地址获取base64
//  */
// const getBase64ByImg = (imgUrl: string): Promise<string> => {
//   return new Promise(resolve => {
//     const xhr = new XMLHttpRequest()
//     xhr.open('get', imgUrl, true)
//     xhr.responseType = 'blob'
//     xhr.onload = function () {
//       if (this.status === 200) {
//         const blob = this.response
//         const oFileReader = new FileReader()

//         oFileReader.onloadend = function (e) {
//           const base64 = e.target.result
//           resolve(base64 as string)
//         }
//         oFileReader.readAsDataURL(blob)
//       }
//     }
//     xhr.send()
//   })
// }

// /**
//  * 向指定cavas绘制图片
//  * @param imageInfo
//  * @param ctx
//  * @returns
//  */
// const drawImageInCanvas = (
//   imageInfo,
//   ctx: CanvasRenderingContext2D
// ): Promise<CanvasRenderingContext2D> => {
//   return new Promise((resolve, reject) => {
//     try {
//       const image = new Image()
//       const { url, left, top, width, height } = imageInfo
//       image.onload = () => {
//         ctx.drawImage(image, left, top, width, height)
//         resolve(ctx)
//       }
//       image.src = url
//     } catch (e) {
//       reject(e)
//     }
//   })
// }
// // 获取不同设备的配置
// const getSizeConfig = () => {
//   const { isTablet } = os
//   console.warn('isTablet', isTablet)
//   if (isTablet) {
//     return {
//       width: 340,
//       height: 604,
//       left: 235,
//       top: 506,
//       size: 69,
//       speLeft: 136,
//       speTop: 488
//     }
//   }
//   return {
//     width: 506,
//     height: 900,
//     left: 351,
//     top: 756,
//     speLeft: 204,
//     speTop: 730,
//     size: 100
//   }
// }

// /**
//  * 获取拼接的cavas生成的base64海报
//  * @param reportBase 海报背景图片的base64
//  * @param qrCodeBase 二维码的 base64编码
//  * @returns
//  */
// const getCanvasPoster = (reportBase: string, qrCodeBase: string, pos: boolean): Promise<string> => {
//   const { width, height, left, top, speLeft, speTop, size } = getSizeConfig()
//   return new Promise(resolve => {
//     const imgList = [
//       { url: reportBase, left: 0, top: 0, width, height },
//       {
//         url: qrCodeBase,
//         left: pos ? speLeft : left,
//         top: pos ? speTop : top,
//         width: size,
//         height: size
//       }
//     ]
//     // 绘制海报的基本信息
//     let canvas = document.createElement('canvas')
//     canvas.width = width
//     canvas.height = height
//     canvas.style.display = 'none'
//     document.body.appendChild(canvas)

//     const ctx = canvas.getContext('2d')

//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     ctx.rect(0, 0, canvas.width, canvas.height)
//     drawImageInCanvas(imgList[0], ctx).then(ctx1 => {
//       drawImageInCanvas(imgList[1], ctx1).then(() => {
//         /** 海报绘制完成 */
//         const posterUrl = canvas.toDataURL('imgage/png')
//         document.body.removeChild(canvas)
//         canvas = null
//         // 只需要bsae64格式的海报图片
//         resolve(posterUrl)
//       })
//     })
//   })
// }

// /**
//  * 将二维码和背景图片拼在一起
//  * @param reportBgImg 海报背景图片的URL
//  * @param qrCodeBase 二维码的 base64编码
//  * @param pos 是否使用额外定位数据
//  * @returns
//  */
// export const getPoster = async (
//   reportBgImg: string,
//   qrCodeBase: string,
//   pos = false
// ): Promise<string> => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       // 1. 把img转为base64
//       const reportBase = await getBase64ByImg(reportBgImg)
//       console.warn(reportBase, 'reportBase')

//       // 2. 所有base64拼canvas
//       const poster = await getCanvasPoster(reportBase, qrCodeBase, pos)
//       resolve(poster)
//     } catch (e) {
//       reject(e)
//     }
//   })
// }

// interface IReportSelect {
//   loginStatus: boolean
//   reportVisible: boolean
//   setReportVisible: (visible: boolean) => void
// }

// const ReportSelect: React.FC<IReportSelect> = props => {
//   const { urlParams } = useModel('introduce')
//   const { reportVisible, setReportVisible, loginStatus } = props
//   // 默认选中第二个海报
//   const [curIndex, setCurIndex] = useState<number>(1)
//   const [reportList, setReportList] = useState<string[]>(ReportImg)
//   const [qrcode, setQrcode] = useState<string>('')
//   const [qrcodeUrl, setQrcodeUrl] = useState<string>('')
//   // 埋点
//   useEffect(() => {
//     if (reportVisible) {
//       sensors.track('posterMade', {
//         ...ReferralSuperParams,
//         UserID: getModel('user')?.userInfo?.id,
//         posterType: curIndex + 1
//       })
//     }
//   }, [reportVisible, curIndex])

//   // 获取二维码的URL
//   useEffect(() => {
//     if (loginStatus) {
//       asyncFetch(introduceApi.getIntroduceUrl(), {
//         onSuccess: data => {
//           setQrcodeUrl(data)
//         }
//       })
//     }
//   }, [loginStatus])

//   // 将二维码图片转为base64
//   useEffect(() => {
//     if (!qrcodeUrl) {
//       return
//     }
//     QRCode.toDataURL(qrcodeUrl, {
//       // 类型
//       type: 'image/png',
//       // 图片质量A Number between 0 and 1
//       quality: 0.5,
//       // 高度
//       width: 100,
//       // 宽度
//       height: 100,
//       // 容错率
//       errorCorrectionLevel: 'L',
//       // 外边距
//       margin: 1,
//       color: {
//         // 前景色
//         dark: '#000000',
//         // 背景色
//         light: '#ffffff'
//       }
//     }).then((imgData: string) => {
//       setQrcode(imgData)
//     })
//   }, [qrcodeUrl])

//   useEffect(() => {
//     if (!qrcode) {
//       return
//     }
//     Promise.all(
//       ReportImg.map((url, index) => {
//         // 第三张海报图定位有差异
//         if (index === 2) {
//           return getPoster(url, qrcode, true)
//         }
//         return getPoster(url, qrcode)
//       })
//     )
//       .then(reporters => {
//         console.warn(reporters, 'reporters')
//         setReportList(reporters)
//       })
//       .catch(err => {
//         throw err
//       })
//   }, [qrcode])

//   const handleReport = (type: 'add' | 'decrease') => {
//     if (type === 'add' && curIndex < 2) {
//       setCurIndex(curIndex => curIndex + 1)
//     }
//     if (type === 'decrease' && curIndex > 0) {
//       setCurIndex(curIndex => curIndex - 1)
//     }
//   }

//   const handleAppShare = (type: 'friends' | 'moments') => {
//     if (Number(urlParams?.isWechat) === 0) {
//       return Toast.show('请安装微信后分享')
//     }
//     if (type === 'friends') {
//       sensors.track('operationShare', {
//         ...ReferralSuperParams,
//         UserID: getModel('user')?.userInfo?.id,
//         shareChannel: '微信',
//         closeType: 'ButtonClick'
//       })
//       wechatShareImgToFriend(reportList[curIndex])
//     }
//     if (type === 'moments') {
//       sensors.track('operationShare', {
//         ...ReferralSuperParams,
//         UserID: getModel('user')?.userInfo?.id,
//         shareChannel: '朋友圈',
//         closeType: 'ButtonClick'
//       })
//       wechatShareImgToMonments(reportList[curIndex])
//     }
//   }

//   return (
//     <div
//       className={styles.report_wrapper}
//       style={{ zIndex: reportVisible ? 9 : -1, opacity: reportVisible ? 1 : 0 }}
//     >
//       <div className={styles.mask} />
//       <div className={styles.content}>
//         <div className={styles.report_list}>
//           <img
//             onClick={() => handleReport('decrease')}
//             className={styles.left}
//             style={{ opacity: curIndex > 0 ? 1 : 0 }}
//             src='https://business.xiongmaoboshi.com/dpshop/res/img/%E5%B7%A6%E5%88%87%E6%8D%A2%402x-1668417449992-455.png'
//           />

//           <img
//             className={os.isTablet ? styles.report_tablet : styles.report_mobile}
//             src={reportList[curIndex]}
//           />
//           <img
//             onClick={() => handleReport('add')}
//             style={{ opacity: curIndex < 2 ? 1 : 0 }}
//             className={styles.right}
//             src='https://business.xiongmaoboshi.com/dpshop/res/img/%E5%8F%B3%E5%88%87%E6%8D%A2%402x-1668417449990-217.png'
//           />
//         </div>
//         <div className={styles.dot_list}>
//           {reportList.map((item, index) => (
//             <span key={item} className={curIndex === index ? styles.cur_dot : styles.dot} />
//           ))}
//         </div>
//         <div className={styles.footer}>
//           <div className={styles.app}>
//             {getDevice(2) === 'app' && (
//               <div>
//                 <img
//                   onClick={() => handleAppShare('friends')}
//                   src='https://business.xiongmaoboshi.com/dpshop/res/img/%E5%88%86%E4%BA%AB%E7%BB%99%E5%A5%BD%E5%8F%8B%402x-1668417449974-329.png'
//                 />
//                 <img
//                   onClick={() => handleAppShare('moments')}
//                   src='https://business.xiongmaoboshi.com/dpshop/res/img/%E5%88%86%E4%BA%AB%E5%88%B0%E6%9C%8B%E5%8F%8B%E5%9C%88%402x-1668417449965-628.png'
//                 />
//               </div>
//             )}
//           </div>
//           <img
//             className={styles.guide}
//             src={
//               getDevice(2) === 'app'
//                 ? 'https://business.xiongmaoboshi.com/dpshop/res/img/%E7%AB%AF%E5%86%85%E6%8F%90%E7%A4%BA%E6%A1%86%402x-1668417449948-300.png'
//                 : 'https://business.xiongmaoboshi.com/dpshop/res/img/%E7%AB%AF%E5%A4%96%E6%8F%90%E7%A4%BA%E6%A1%86%402x-1668417449959-720.png'
//             }
//           />
//           <img
//             onClick={() => {
//               sensors.track('operationShare', {
//                 ...ReferralSuperParams,
//                 UserID: getModel('user')?.userInfo?.id,
//                 closeType: 'Cancel'
//               })
//               setReportVisible(false)
//             }}
//             className={styles.close}
//             src='https://business.xiongmaoboshi.com/dpshop/res/img/%E5%85%B3%E9%97%AD%402x-1668417449983-261.png'
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

export default {}
