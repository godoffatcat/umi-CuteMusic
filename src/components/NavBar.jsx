import React from 'react'
import { Tabs, WhiteSpace } from 'antd-mobile';

const tabs = [
  { title: 'Home&Hot', key: 't1' },
  { title: 'board', key: 't2' },
  { title: 'search', key: 't3' },
];

const NavBar = () => {
  return(
    <div>
    <WhiteSpace />
    <div style={{ height: 200 }}>
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

export default NavBar
