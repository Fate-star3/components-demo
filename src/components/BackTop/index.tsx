import { useState, useEffect, useRef } from 'react'
import styles from './index.module.scss'
import { useThrottle } from '@/hooks'
interface IBackProps {
  duration?: number;
  target?: () => HTMLElement;
  visibilityHeight?: number;
  onClick?: () => void;
}
let scrollTop: number = 0

const BackTop: React.FC<IBackProps> = (props) => {
  const {
    duration = 5000,
    visibilityHeight = 400,
    target = () => window,
    onClick = () => window.scrollTo(0, 0) }
    = props
  const [visible, setVisible] = useState<boolean>(false)
  const [scroll, setScroll] = useState<number>(0)
  const dom = target()
  scrollTop = dom === window ? scrollTop = (document.documentElement.scrollTop || document.body.scrollTop) : dom?.scrollTop
  //页面被卷去头部
  console.log(dom);



  useEffect(() => {

    function fn() {
      console.log(scrollTop);
      setScroll(scrollTop)
      if (scrollTop > visibilityHeight) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }
    dom.addEventListener('scroll', fn)
    return () => {
      dom.removeEventListener('scroll', fn)
    }
  }, [scroll])

  const backTop = () => {
    onClick && onClick()
    setVisible(!visible)
  }

  return (
    <div className={styles.back} onClick={backTop}>
      {
        visible && <div className={styles.back_top} style={{ transition: `all  ${duration / 1000}s ease-in-out` }}>
          UP
        </div>
      }
    </div>

  )
}

export default BackTop
