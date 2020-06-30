import React, { useState, useEffect, version } from 'react';
import styles from './singlePageCss.less';
import { getSongDetail, getUrl } from '../../services/index';
import SongLyric from './lyric';
import { useLocation } from 'umi';
import { useRequest } from 'umi';
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

  const realId = props.location.query.id

  // 请求歌曲详情、播放url
  const { loading, data } = useRequest(getSongDetail(realId));
  useEffect(() => {
    if (data) {
      const transformSongDetail = res => {
        setState({...state, songDetail: res.songs, pic: res.songs[0].al.picUrl });
        console.log(res.songs, 'songs')
      };
      transformSongDetail(data);
    }
  }, [data]);
  useLoading(loading)

  // play or pause
  // const playSwitch = () => {
  //   const playUrl = document.getElementById('thisMusicAudio')
  // }

  // 点击播放,抓取url
  const { loading: loadingUrl, data: dataUrl, run: runUrlPlay } = useRequest(getUrl(id), {
    manual: true,
  })
  useEffect(() => {
    if(dataUrl) {
      const transformSongUrl = res => {
        setState({...state, songAudio: res.url});
      };
      transformSongUrl(dataA);
    }
  }, [dataUrl])

  const playMusicAudio = (id) => {
    runUrlPlay(id)
};

  // 更改按钮形态、歌曲播放
  const btnPlayorPause = () => {
    if (state.playMusic === false) {
      setState({ ...state, playMusic: true });
      playMusicAudio(realId)
    } else {
      setState({ ...state, playMusic: false });
    }
  };

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

  return (
    <div className={styles.bgPic}>
      {Array.isArray(state.songDetail) &&
        state.songDetail.map(v => {
          return (
            <div className={styles.songPageDetail} key={v.dt} >
              <audio id='thisMusicAudio' src={state.songAudio} auto></audio>
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

