import React, { useState, useEffect } from 'react';
import { getnewSong } from '../../application/apiStore';
import styles from './playlistCss.less';

const NewMusic = () => {
  const [state, setState] = useState({
    newSong: [''],
  });

  useEffect(() => {
    const initNewSong = () => {
      const transformNewSong = res => {
        if (res.code === 200) {
          setState({ newSong: res.result });
        }
      };
      getnewSong().then(res => transformNewSong(res));
    };
    initNewSong();
  }, []);

  useEffect(() => {
    // console.log('newSong is', state.newSong);
  }, [state.newSong]);

  const nameSplit = str => {
    // console.log(str, '====str');
    if (str === undefined) {
      return '';
    }
    if (str.length > 20) {
      var newName = str.substring(0, 20);
      return newName + '...';
    } else {
      return str;
    }
  };

  return (
    <div>
      <div className={styles.title}>
        <div className={styles.t1}>
        <div className={styles.square}></div>
        ♡最新歌曲♡
        </div>

        <div className={styles.citation}>全新元气，快来尝尝！</div>
      </div>
      <div className={styles.newSongListBox}>
        {Array.isArray(state.newSong) &&
          state.newSong.map((val, i) => {
            return (
              <div className={styles.newSongBox} key={i}>
                <div className={styles.songArtists}>
                <div className={styles.songName}>{nameSplit(val.name)}</div>
                <div className={styles.singerInfo}>{getName(val)}</div>
                </div>
                <button className={styles.playBtn}>PLAY</button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default NewMusic;

/**
 *  获取artists的名字
 * @param {*} val
 */
function getName(val) {
  let name = '';
  if (val.song && val.song.artists && Array.isArray(val.song.artists)) {
    val.song.artists.forEach(element => {
      name += element.name;
      name += '-';
    });
    if (name[name.length - 1] === '-') {
      name = name.slice(0, name.length - 1);
    }
  }
  return name;
}
