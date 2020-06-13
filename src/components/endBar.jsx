import React from 'react'
import styles from './titleBarCss.less';

const EndTitleBar = () => {
  return(
    <div className={styles.endTitle}>
      <div className={styles.endTitleFont}>
       =元气音乐库=
      </div>
      <div className={styles.endSlogan}>听元气音乐，让生活更元气</div>
    </div>
  )
}

export default EndTitleBar
