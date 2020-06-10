import React from 'react'
import styles from './titleBarCss.less';


const TitleBar = () => {
  return(
    <div className={styles.title}>
      <div className={styles.titleFont}>
       =元气音乐库=
      </div>
      <button className={styles.btn}>下载APP</button>
    </div>
  )
}

export default TitleBar
