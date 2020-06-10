import React from 'react';
import styles from './index.less';
import TitleBar from '../components/titleBar'
import NavBar from '../components/NavBar'
import Banner from './singleCom/banner'
import { NoticeBar, WhiteSpace, Icon } from 'antd-mobile';

export default () => {
  return (
    <div>
      <TitleBar></TitleBar>
      <NavBar></NavBar>
      <WhiteSpace size="2px" />
      <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
        注意啦：只有充满元气的可爱宝宝才可以使用元气音乐喔↖(^ω^)↗
      </NoticeBar>
      <Banner></Banner>
    </div>
  );
}
