import { Toast, SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import React, { useState, useEffect } from 'react';
import { getSearch, getDefault, getHotWord } from '@/application/apiStore.jsx';
// import { getSearch, getDefault, getHotWord } from '../services/index';
import styles from './searchCss.less';
import { history } from 'umi';
import { useRequest } from 'umi';
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
  const { loading: loadingSearch, data: dataSearch, run: runSearch } = useRequest(getSearch, {
    manual: true, // 这里用manual 表示需要调用run才会发送请求
  });
  useLoading(loadingSearch);
  useEffect(() => {
    if (dataSearch) {
      const transformSearch = res => {
        console.log(res.result.songs, 'serach song')
        setState({ ...state, searchSong: res.result.songs });
      };
      transformSearch(dataSearch);
    }
  }, [dataSearch]);

  const searchOne = (value) => {
    console.log('value is', value);
    runSearch(value)
  };

  // 关键字请求
  const { loading: loadingHotWord, data: dataHotWord } = useRequest(getHotWord);
  useEffect(() => {
    if (dataHotWord) {
      const transformHotWord = res => {
        console.log('hotword is', res.result);
        setState({ ...state, hotWord: res.result.hots });
      };
      transformHotWord(dataHotWord);
    }
  }, [dataHotWord]);
  useLoading(loadingHotWord);

  // 请搜默认词
  const { loading: loadingDefault, data: dataDefault } = useRequest(getDefault);
  useEffect(() => {
    if (dataDefault) {
      console.log(dataDefault, 'dataDefault')
      const transformHotWord = res => {
        console.log('hotword is', res.result);
        setState(state => {
          return { ...state, defaultWord: res.data.realkeyword };
        });

      };
      transformHotWord(dataDefault);
    }
  }, [dataDefault]);
  useLoading(loadingDefault);

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
