import React, { useState, useEffect } from 'react';
import { getSongLyric } from '@/services/index';
import useRequest from '@/hooks/useRequest';
import useLoading from '@/hooks/useLoading';
import styles from './singlePageCss.less';
import { render } from 'react-dom';

const AudioPlay = props => {
  const [state, setState] = useState({
    lyricList: [], // 歌词数组
    currentTime: '', // audio当前播放时间
    currentLyc: 0, // 当前歌词
    lycStyle: {}, // 歌词滚动样式
    resUrl: '',
  });

  const { loading, data } = useRequest(getSongLyric(props.id));
  useEffect(() => {
    if (data) {
      const transformSongLyric = res => {
        setState({ resUrl: res.lrc.lyric });
      };
      transformSongLyric(data);
    }
  }, [data]);
  useLoading(loading);


  const format = value => {
    // 时间转换
    if (!value) return '';
    let interval = Math.floor(value);
    let minute = Math.floor(interval / 60)
      .toString()
      .padStart(2, '0');
    let second = (interval % 60).toString().padStart(2, '0');
    return `${minute}:${second}`;
  };

  // 歌词文件分离
  useEffect(() => {
    let result = state.resUrl;
    let lyricList = state.lyricList;
    result['lrc']['lyric']
      .split(/[\n]/) // 截取中括号
      .forEach(item => {
        let temp = item.split(/\[(.+?)\]/);
        lyricList.push({
          time: temp[1], // 时间
          lyc: temp[2], //歌词内容
        });
      });
    lyricList = lyricList.filter(v => v['lyc']); // 去除无歌词内容
    this.setState({
      lyric: result['lrc']['lyric'],
      lyricList,
    });
  })

  const TimeUpdate = e => {
    // 播放位置发生时改变触发
    // 获取audio当前播放时间
    let currentTime = format(
      document.getElementsByTagName('audio')[0]['currentTime'],
    ); // 事件转换
    let { currentLyc, lyricList } = this.state;
    for (let i = currentLyc; i < lyricList.length; i++) {
      if (
        lyricList[i + 1] &&
        currentTime < lyricList[i + 1]['time'] &&
        currentTime > lyricList[i]['time']
      ) {
        this.setState({
          currentLyc: i,
          lycStyle: {
            transform: `translateY(-${0.545 * i}rem)`,
          },
        });
      }
    }
  };

  return (
    <div>
    <div className={styles.lyric}>{state.resUrl}</div>
  </div>
  )

}

export default AudioPlay
