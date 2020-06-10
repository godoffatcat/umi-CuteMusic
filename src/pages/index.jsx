import React from 'react';
import styles from './index.less';
import TitleBar from '../components/titleBar'


export default () => {
  return (
    <div>
      <TitleBar></TitleBar>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}
