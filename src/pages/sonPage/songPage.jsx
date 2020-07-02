import React, { useState, useEffect, version } from 'react';
import styles from './singlePageCss.less';
import { getSongDetail, getUrl, getSongLyric } from '../../application/apiStore';
import SongLyric from './lyric';
import { useLocation } from 'umi';
import { useRequest } from 'umi';
import useLoading from '../../hooks/useLoading';
import TitleBar from '../../components/titleBar';
import EndTitleBar from '../../components/endBar';


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
    lyricFile: '',
  });

  const realId = props.location.query.id;

  // 请求歌曲详情、播放url
  const { loading, data } = useRequest(getSongDetail, {
    defaultParams: [realId],
  });
  useEffect(() => {
    if (data) {
      const transformSongDetail = res => {
        setState({
          ...state,
          songDetail: res.songs,
          pic: res.songs[0].al.picUrl,
        });
        console.log(res.songs, 'songs');
      };
      transformSongDetail(data);
    }
  }, [data]);
  useLoading(loading);

  // 点击播放,抓取url
  const { loading: loadingUrl, data: dataUrl } = useRequest(getUrl, {
    defaultParams: [realId],
  });
  useEffect(() => {
    if (dataUrl) {
      const transformSongUrl = res => {
        setState({ ...state, songAudio: res.data[0].url });
      };
      transformSongUrl(dataUrl);
    }
  }, [dataUrl]);

  // 请求歌词文件
  const { loading:loadingLyric, data: dataLyric } = useRequest(getSongLyric(realId));
  useEffect(() => {
    if (dataLyric) {
      const transformSongLyric = res => {
        setState({ lyricFile: res.lrc.lyric });
      };
      transformSongLyric(dataLyric);
    }
  }, [dataLyric]);
  useLoading(loadingLyric);

  // play or pause
  const playAudio = document.getElementById('thisMusicAudio');
  const playMusicAudio = () => {
    playAudio.play();
  };
  const pauseMusicAudio = () => {
    playAudio.pause();
  };

  // 更改按钮形态、歌曲播放
  const btnPlayorPause = () => {
    if (state.playMusic === false) {
      setState({ ...state, playMusic: true });
      playMusicAudio();
    } else {
      setState({ ...state, playMusic: false });
      pauseMusicAudio();
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
    <div>
    <TitleBar/>
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
              <audio id="thisMusicAudio" src={state.songAudio} ></audio>
              <SongLyric id={realId} pause={state.playMusic} lyric={state.lyricFile}></SongLyric>
              <EndTitleBar></EndTitleBar>
            </div>
          );
        })}
    </div>
    </div>
  );
};

export default SingleSong;
