import React from 'react'
import {getPlaylist} from '../../application/apiStore'
import { Grid } from 'antd-mobile';

const data = Array.from(new Array(9)).map((_val, name) => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
  text: `${name}`,
}));

const data1 = Array.from(new Array(9)).map(() => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
}));

const GridExample = () => (
<div className="sub-title">元气歌单</div>
<Grid data={data1}
  columnNum={3}
  renderItem={dataItem => (
    <div style={{ padding: '12.5px' }}>
      <img src={dataItem.icon} style={{ width: '75px', height: '75px' }} alt="" />
      <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
        <span>I am title..</span>
      </div>
    </div>
  )}
/>
)
