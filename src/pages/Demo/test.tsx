import React, { memo, useCallback, useEffect, useRef, useState } from 'react'

type ITest = {
  count: number
}
export type Remains = Record<
  'days' | 'hours' | 'minutes' | 'seconds' | 'countDownTime',
  string | number
>
const getTime = (
  countdown: number
): {
  days?: string
  hours?: string
  minutes?: string
  seconds?: string
} => {
  if (!countdown) {
    return {
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00'
    }
  }
  const addPrefix = (time: number): string => {
    return time < 10 ? `0${time}` : `${time}`
  }
  /** 计算相差天数 */
  const days = String(Math.floor(countdown / (24 * 3600 * 1000)))
  // 计算天数后剩余的毫秒数
  const leftTime1 = countdown % (24 * 3600 * 1000)
  /** 计算小时数 */
  const hours = addPrefix(Math.floor(leftTime1 / (3600 * 1000)))
  /** 计算小时数后剩余的毫秒数 */
  const leftTime2 = leftTime1 % (3600 * 1000)
  /** 计算相差分钟数 */
  const minutes = addPrefix(Math.floor(leftTime2 / (60 * 1000)))
  /** 计算分钟数后剩余的毫秒数 */
  const leftTime3 = leftTime2 % (60 * 1000)
  /** 计算相差秒 */
  const seconds = addPrefix(Math.round(leftTime3 / 1000))

  return { days, hours, minutes, seconds }
}

function useCountdown<T extends number, K extends Function>(
  timeRemaining: T,
  onComplete: K
): Remains {
  const cancelToken = useRef(false)
  const timer = useRef<number>()
  const [countDownTime, setCountDownTime] = useState(0)

  useEffect(
    () => () => {
      cancelToken.current = true
    },
    []
  )

  useEffect(() => {
    count(timeRemaining)

    return () => {
      window.clearTimeout(timer.current)
    }
  }, [])

  const count = (remainTs: number) => {
    if (timer.current) window.clearTimeout(timer.current)
    if (cancelToken.current) return
    if (remainTs <= 0 && Number(timeRemaining) > 0) {
      window.clearTimeout(timer.current)
      onComplete()
    } else {
      setCountDownTime(remainTs - 1000)
      timer.current = window.setTimeout(() => count(remainTs - 1000), 1000)
    }
  }

  const { days, hours, minutes, seconds } = getTime(countDownTime)
  return { days, hours, minutes, seconds, countDownTime }
}
const Test: React.FC<any> = props => {
  const { count } = props
  // const { days, hours, minutes, seconds, countDownTime } = useCountdown(5000, () =>
  //   console.log('use')
  // )
  const test1 = useCallback(() => {
    console.log('test')
  }, [])
  const test2 = () => {
    console.log('test')
  }
  // test()
  console.log(2)

  useEffect(() => {
    console.log('useEffect')
    return () => {
      console.log('unmount')
    }
  }, [test1])

  return <div>test</div>
}

export default Test
