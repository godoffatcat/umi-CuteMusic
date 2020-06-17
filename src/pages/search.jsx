import { Toast, SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import React, { useState, useEffect } from 'react';
import { getSearch } from '../application/apiStore';
import styles from './index.less'

// TODO  增加热门词条、点击即填入state并同时触发搜索

const SearchBarExample = () => {
  const [state, setState] = useState({
    value: 'mojito',
    searchSong: [],
  });

  const searchOne = () => {
    const initSearch = () => {
      const transformSearch = res => {
        if (res.code === 200) {
          setState({ searchSong: res.name });
        }
        Toast.hide();
      };
      Toast.loading('加载中', 0);
      getSearch(state.value).then(res => transformSearch(res));
    };
    initSearch();
  };


  return (
    <div>
      <WingBlank>
        <div className="sub-title"></div>
      </WingBlank>
      <SearchBar placeholder="Search" maxLength={10} />
      <WhiteSpace />
      <WingBlank>
        <Button className={styles.searchBtn} onClick={searchOne()}>搜索元气！</Button>
      </WingBlank>
      <WhiteSpace />
    </div>
  );
};

export default SearchBarExample;
