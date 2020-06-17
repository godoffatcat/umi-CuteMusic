import React from 'react';
import styles from './index.less';
import TitleBar from '../components/titleBar';
import Banner from './singleCom/banner';
import {Button, NoticeBar, WhiteSpace, Tabs } from 'antd-mobile';
import PlayList from './singleCom/playlist';
import NewMusic from './singleCom/newMusic';
import EndTitleBar from '../components/endBar';
import SearchBarExample from './search';
import ToastExample from '../components/loading';
import {useModel, history, IndexModelState, ConnectProps, Loading, connect } from 'umi';

const tabs = [
  { title: '=首页=', sub: 't1' },
  { title: '=元气排行榜=', sub: 't2' },
  { title: '=搜索=', sub: 't3' },
];

const Index = ({ dispatch, index }) => {
  const model = useModel('hookModel');

  React.useEffect(() => {
    // console.log('zhixinglemei',dispatch, index)
    // dispatch({
    //   type: 'index/fetchBanner',
    // })
  }, []);

  return (
    <div className={styles.page}>
      <ToastExample></ToastExample>
      <TitleBar></TitleBar>
      <WhiteSpace size="2px" />
      <Tabs
        tabs={tabs}
        initialPage={'t1'}
        tabBarUnderlineStyle={{ borderColor: 'rgb(216, 111, 146)' }}
        tabBarActiveTextColor={{borderColor: 'rgb(216, 111, 146)'}}
        tabBarInactiveTextColor={{fontColor: 'black'}}
      >
        <div>
          <Banner></Banner>
          <NoticeBar marqueeProps={{ loop: true, style: { padding: '2px' } }}>
            注意啦：只有充满元气的可爱宝宝才可以使用元气音乐喔↖(^ω^)↗
          </NoticeBar>
          <PlayList></PlayList>
          <NewMusic></NewMusic>
          <EndTitleBar></EndTitleBar>
        </div>
        <div>
          <PlayList></PlayList>
        </div>
        <div>
          <SearchBarExample></SearchBarExample>
        </div>
      </Tabs>
    </div>
  );
};

export default Index;
// export default connect(({ index, loading }) => ({
//   index,
//   loading: loading.models.index,
// }))(Index);
