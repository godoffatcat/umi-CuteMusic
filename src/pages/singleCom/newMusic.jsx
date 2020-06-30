import React, { useState, useEffect } from 'react';
import styles from './playlistCss.less';
import { history } from 'umi';
import useRequest from '@/hooks/useRequest';
import useLoading from '@/hooks/useLoading'
import {getnewSong} from '@/services/index'


const NewMusic = () => {
  const [state, setState] = useState({
    newSong: [''],
  });

  const { loading, data } = useRequest(getnewSong(10));

  useEffect(() => {
    if (data) {
      const transformNewSong = res => {
          setState({ newSong: res.result });
      };
      transformNewSong(data);
    }
  }, [data]);

  useLoading(loading)



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
              <div
                className={styles.newSongBox}
                key={i}
                onClick={() => {
                  history.push({
                    pathname: '/songDetail',
                    query: {
                      id: val.id,
                    },
                  });
                }}
              >
                <div className={styles.songArtists}>
                  <div className={styles.songName}>{val.name}</div>
                  <div className={styles.singerInfo}>{getName(val)}</div>
                </div>
                <button className={styles.playBtn}>▶</button>
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
      name += ' - ';
    });
    if (name[name.length - 2] === '-') {
      name = name.slice(0, name.length - 2);
    }
  }
  return name;
}
