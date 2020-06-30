import React, { useState, useEffect, version } from 'react';
import styles from './singlePageCss.less';
import { getSongDetail, getUrl } from '../../services/index';
import SongLyric from './lyric';
import { useLocation } from 'umi';
import useRequest from '../../hooks/useRequest';
import useLoading from '../../hooks/useLoading';

const SingleSong = props => {
  console.log(props, '==props');
  // const location = useLocation();
  // const id = location.query.id;
  // console.log(id, '==id');
  const [state, setState] = useState({
    songName: '',
    loading: false,
    songDetail: [''],
    pic: '',
    playMusic: false,
    songAudio: '',
  });

  // 请求歌曲详情、播放url
  const realId = props.location.query.id
  const { loading, data } = useRequest(getSongDetail(realId));
  useEffect(() => {
    if (data) {
      const transformSongDetail = res => {
        setState({ songDetail: res.songs, pic: res.songs[0].al.picUrl });
        console.log(res.songs, 'songs')
      };
      transformSongDetail(data);
    }
  }, [data]);
  useLoading(loading);

  const { loadingA, dataA } = useRequest(getUrl(realId));
  useEffect(() => {
    if (dataA) {
      const transformSongUrl = res => {
        setState({ songAudio: res.url});
        console.log(res.url, 'audio url')
      };
      transformSongUrl(data);
    }
  }, [dataA]);
  useLoading(loadingA);


  const getName = val => {
    let name = '';
    if (val.ar && Array.isArray(val.ar)) {
      val.ar.forEach(element => {
        name += element.name;
        name += ' - ';
      });
      if (name[name.length - 2] === '-') {
        name = name.slice(0, name.length - 2);
      }
    }
    return name;
  };

  // 更改按钮形态、歌曲播放
  const btnPlayorPause = () => {
    if (state.playMusic === false) {
      setState({ ...state, playMusic: true });
      console.log(state.playMusic);
    } else {
      setState({ ...state, playMusic: false });
      console.log(state.playMusic);
    }
  };

  return (
    <div className={styles.bgPic}>
      {Array.isArray(state.songDetail) &&
        state.songDetail.map(v => {
          return (
            <div className={styles.songPageDetail} key={v.dt}>
              <div className={styles.songTitle}>{v.name}</div>
              <div className={styles.songArtists}>{getName(v)}</div>
              <div className={styles.picAndplay}>
                <img className={styles.picArea} src={state.pic} alt=""></img>
                <button className={styles.playBtn} onClick={btnPlayorPause}>
                  {state.playMusic ? 'PAUSE' : 'PLAY'}
                </button>
              </div>
              <SongLyric id={realId}></SongLyric>
            </div>
          );
        })}
    </div>
  );
};

export default SingleSong;

