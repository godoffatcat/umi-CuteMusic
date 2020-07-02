import React, { useState, useEffect } from 'react';
import styles from './singlePageCss.less';

// 分割时间和歌词，一个数组管理
function useGetLyrics(lyric) {
  // 切出时间
  const transformLyric = (lyric) => {
    const contents = lyric.split('\n').map(v => {
      return v.slice(11)
    })
    const times = lyric.split('\n').map(v => {
      const str = v.slice(1, 11)
      const m = Number(str.slice(0, 2)) * 60
      const s = Number(str.slice(3, 5))
      const second = m + s
      return second
    })

    const res = []
    //歌词内容拿到了
    if(contents)
    contents.forEach((v, i) => {
      res.push({
        time: times[i],
        content: v
      })
    })
    return res
  }

  const [lyrics, setLyrics] = useState([])
  useEffect(() => {
    const lyrics = transformLyric(lyric)
    setLyrics(lyrics)
  }, [lyric])

  return lyrics
}

const SongLyric = ({lyric = '', pause = true}) => {
  const lyrics = useGetLyrics(lyric)
  // 当前行
  const [currentStep, setCurrentStep] = useState(0)
  // 当前下标
  const [currentIndex, setCurrentIndex] = useState(0)
  // 当前秒数
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if(currentIndex + 1 < lyrics.length) {
      const {time} = lyrics[currentIndex + 1]
      if(time <= tick) {
        setCurrentIndex(s => s + 1)
        const step = -20
        setCurrentStep(s => s + step)
      }
    } else {
      console.log('end')
    }
  }, [tick])

  useEffect(() => {
    let timer
    if(pause === false) {
      timer = setInterval(() => {
        setTick(s => s + 1)
      }, 1000)
    } else {
      clearInterval(timer)
    }
    return () => {
      clearInterval(timer)
    }
  }, [pause])

  return <div className={styles.container}>
      <div className={styles.window}>
          <div className={styles.inner} style={{
              transform: `translateY(${currentStep}px)`
          }}>
              {lyrics.map((v, i) => {
                  return <div key={i} >{v.content}</div>
              })}
          </div>
      </div>
  </div>
}

export default SongLyric;
