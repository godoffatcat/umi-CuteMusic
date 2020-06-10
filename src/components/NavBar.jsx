import React from 'react'
import { Tabs, WhiteSpace } from 'antd-mobile';
import styles from './titleBarCss.less'

const tabs = [
  { title: '=首页=', key: 't1' },
  { title: '=元气排行榜=', key: 't2' },
  { title: '=搜索=', key: 't3' },
];

const NavBar = () => {
  return(
    <div>
    <WhiteSpace />
    <div style={{ height: 100 }}>
      <Tabs tabs={tabs}
        initialPage={'t1'}
      >
        <div className={{ NavBar}}>
          Content of first tab
        </div>
        <div className={{ NavBar}}>
          Content of second tab
        </div>
        <div className={{ NavBar}}>
          Content of third tab
        </div>
      </Tabs>
    </div>
  </div>
  )
}
// 呜呜
export default NavBar
