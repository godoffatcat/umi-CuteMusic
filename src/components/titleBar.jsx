import React from 'react'
import styles from './titleBarCss';


const TitleBar = () => {
  return(
    <div style={styles.title}>
      <div style={styles.titleFont}>
       =元气音乐库=
      </div>
      <button style={styles.btn}>下载APP</button>
    </div>
  )
}

export default TitleBar
