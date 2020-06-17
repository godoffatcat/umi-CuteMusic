import { Toast, SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import React, { useState, useEffect } from 'react';
import { getSearch, getDefault, getHotWord } from '../application/apiStore';
import styles from './searchCss.less';

// TODO  增加热门词条、点击即填入state并同时触发搜索

const SearchBarExample = () => {
  const [state, setState] = useState({
    value: 'mojito',
    searchSong: [],
    searchHistory: [],
    hotWord: [],
    defaultWord:''
  });

  // 发送 搜索请求
  const searchOne = value => {
    const initSearch = () => {
      const transformSearch = res => {
        console.log(res.result);
        if (res.code === 200) {
          setState({ ...state, searchSong: res.result.songs });
          Toast.hide();
        }
      };
      Toast.loading('加载中', 0);
      getSearch(value).then(res => transformSearch(res));
    };
    initSearch();
  };

  // 关键字请求
  useEffect(() => {
    const initHotWord = () => {
      const transformHotWord = res => {
        console.log('hotword is', res.result)
        if (res.code === 200) {
          setState({ ...state, hotWord: res.result.hots});
        }
      };
      getHotWord().then(res => transformHotWord(res));
    };
    initHotWord();
  }, []);

  // 请求默认搜索词
  useEffect(() => {
    const initDefaultWord = () => {
      const transformWord = res => {
        if (res.code === 200) {
          console.log(res.data.realkeyword)
          setState({ ...state, defaultWord: res.data.realkeyword });
        }
      };
      getDefault().then(res => transformWord(res));
    };
    initDefaultWord();
  }, []);



  // 按钮点击触发搜索
  const beginSearch = () => {
    var value = state.value;
    var defaultWord = state.defaultWord
    if (value = false) {
      searchOne (defaultWord)
    }
    searchOne(value);
  };

  // onchange事件，输入内容更新到state
  const inputValue = e => {
    setState({ value: e });
  };

  // 歌名过长切割
  const nameSplit = str => {
    // console.log(str, '====str');
    if (str === undefined) {
      return '';
    }
    if (str.length > 15) {
      var newName = str.substring(0, 15);
      return newName + '...';
    } else {
      return str;
    }
  };

  // 歌手名字;
  const getName = val => {
    let name = '';
    val.artists.forEach(element => {
      name += element.name;
      name += '-';
    });
    if (name[name.length - 1] === '-') {
      name = name.slice(0, name.length - 1);
    }
    if (name.length > 20) {
      var singName = name.substring(0, 20)
      return singName + '...'
    } else {
      return name;
    }
  };

 // 热搜词


  return (
    <div>
      <WingBlank>
        <div className="sub-title"></div>
      </WingBlank>
      <SearchBar
        placeholder={state.defaultWord}
        maxLength={10}
        onChange={inputValue}
      />
      <WhiteSpace />
      <WingBlank>
        <Button
          className={styles.searchBtn}
          onClick={beginSearch}
          onSubmit={beginSearch}
        >
          搜索元气！
        </Button>
      </WingBlank>
      <WhiteSpace />
      <div>
      {/* <div className={styles.title}>
          <div className={styles.square}></div>
          ♡搜索结果♡
        </div> */}
        <div className={styles.hotWordArea}>
        {Array.isArray(state.hotWord) && state.hotWord.map((word, i) => {
          return (
            <button className={styles.hotword} key={i}>
              {word.first}
            </button>
            // <div className={styles.hotword} key={i}>
            //   {word.first}
            // </div>
          )
        })}
        </div>

        {/* 搜索结果区 */}
        <div className={styles.newSongListBox}>
          {Array.isArray(state.searchSong) &&
            state.searchSong.map(val => {
              return (
                <div className={styles.newSongBox} key={val.id}>
                  <div className={styles.songAritsts}>
                  <div className={styles.songName}>{nameSplit(val.name)}</div>
                  <div className={styles.singerInfo}>
                    {getName(val)}
                  </div>
                  </div>
                  <button className={styles.playBtn}>PLAY</button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SearchBarExample;
