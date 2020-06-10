import React from 'react';
import styles from './index.less';
import TitleBar from '../components/titleBar'
import NavBar from '../components/NavBar'
import Banner from '../singleCom/banner'

export default () => {
  return (
    <div>
      <TitleBar></TitleBar>
      <NavBar></NavBar>
      <Banner></Banner>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}
