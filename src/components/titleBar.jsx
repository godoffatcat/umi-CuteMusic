import React from 'react';
import styles from './titleBarCss.less';
import { history } from 'umi';


const TitleBar = () => {
  return (
    <div className={styles.title}>
      <div
        className={styles.titleFont}
        onClick={() => {
          history.push({
            pathname: '/',
          });
        }}
      >
        =元气音乐库=
      </div>
      <a href='https://music.163.com/#/download'>
      <button className={styles.btn} >下载APP</button>
      </a>

    </div>
  );
};

export default TitleBar;
