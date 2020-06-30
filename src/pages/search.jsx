import { Toast, SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import React, { useState, useEffect } from 'react';
import { getSearch, getDefault, getHotWord } from '../application/apiStore';
// import { getSearch, getDefault, getHotWord } from '../services/index';
import styles from './searchCss.less';
import { history } from 'umi';
import useRequest from '@/hooks/useRequest';
import useLoading from '@/hooks/useLoading';

// TODO  增加热门词条、点击即填入state并同时触发搜索

const SearchBarExample = () => {
  const [state, setState] = useState({
    value: '',
    searchSong: [],
    searchHistory: [],
    hotWord: [],
    defaultWord: '',
  });

  // 发送 搜索请求
  // const searchOne = (value) => {
  //   const { loading: loadingA, data: dataA } = useRequest(getSearch(value));
  //   if (dataA) {
  //     const transformSearch = res => {
  //       setState({ ...state, searchSong: res.result.songs });
  //     };
  //     transformSearch(data);
  //   }
  //   useLoading(loadingA);
  // };

  //重构前
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
  // const { loading: loadingB, data: dataB } = useRequest(getHotWord());
  // useEffect(() => {
  //   if (dataB) {
  //     const transformHotWord = res => {
  //       console.log('hotword is', res.result);
  //       setState({ ...state, hotWord: res.result.hots });
  //     };
  //     transformHotWord(res);
  //   }
  //   useLoading(loadingB);
  // }, [dataB]);

  // 重构前
  useEffect(() => {
    const initHotWord = () => {
      const transformHotWord = res => {
        console.log('hotword is', res.result);
        if (res.code === 200) {
          setState(state => {
            return { ...state, hotWord: res.result.hots };
          });
        }
      };
      getHotWord().then(res => transformHotWord(res));
    };
    initHotWord();
  }, []);

  // 请求默认搜索词
  // const { loading: loadingC, data: dataC } = useRequest(getDefault());
  // useEffect(() => {
  //   if (dataC) {
  //     const transformWord = res => {
  //       setState({ ...state, defaultWord: res.data.realkeyword });
  //     };
  //     transformWord(res);
  //   }
  //   useLoading(loadingC);
  // }, [dataC]);

// 请搜默认词
  useEffect(() => {
    const initDefaultWord = () => {
      const transformWord = res => {
        if (res.code === 200) {
          console.log(res.data.realkeyword);
          setState(state => {
            return { ...state, defaultWord: res.data.realkeyword };
          });
        }
      };
      getDefault().then(res => transformWord(res));
    };
    initDefaultWord();
  }, []);

  // 按钮点击触发搜索
  const beginSearch = () => {
    var value = state.value;
    var defaultWord = state.defaultWord;
    if (value === '') {
      searchOne(defaultWord);
    }
    searchOne(value);
  };

  // onchange事件，输入内容更新到state
  const inputValue = e => {
    setState(state => {
      return { ...state, value: e };
    });
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
      var singName = name.substring(0, 20);
      return singName + '...';
    } else {
      return name;
    }
  };

  // 热搜词

  return (
    <div>
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
            // className={styles.searchBtn}
            onClick={beginSearch}
            onSubmit={beginSearch}
          >
            🔍
          </Button>
        </WingBlank>
        <WhiteSpace />
      </div>

      {/* 搜索结果区 */}
      <div className={styles.newSongListBox}>
        {Array.isArray(state.searchSong) &&
          state.searchSong.map(val => {
            return (
              <div
                className={styles.newSongBox}
                key={val.id}
                onClick={() => {
                  history.push({
                    pathname: '/songDetail',
                    query: {
                      id: val.id,
                    },
                  });
                }}
              >
                <div className={styles.songAritsts}>
                  <div className={styles.songName}>{nameSplit(val.name)}</div>
                  <div className={styles.singerInfo}>{getName(val)}</div>
                </div>
                <button className={styles.playBtn}>PLAY</button>
              </div>
            );
          })}
      </div>
    </div>
    // </div>
  );
};

export default SearchBarExample;
