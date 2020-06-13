import React, { useState, useEffect } from 'react';
import { getPlaylist } from '../../application/apiStore';
import styles from './playlistCss.less';

const PlayList = () => {
  const [state, setState] = useState({
    songlist: [''],
  });

  useEffect(() => {
    const initPlaylist = () => {
      const transformBanner = res => {
        if (res.code === 200) {
          setState({ songlist: res.result });
        }
      };
      getPlaylist(6).then(res => transformBanner(res));
    };
    initPlaylist();
  }, []);

  useEffect(
    count => {
      if (count > 9999) {
        var million = count.split('');
        var len = million.length;
        million.slice(len - 4, len);
        million.toString();
      }
    },
    [state.songlist],
  );

  return (
    <div>
      <div className={styles.title}>
        <div className={styles.square}></div>
        ♡元气歌单♡
        <div className={styles.citation}>用最元气的歌单打开全新的一天！</div>
      </div>
      <div className={styles.personalized_list} key='all'>
        {Array.isArray(state.songlist) &&
          state.songlist
            .filter((v, i) => i < 3)
            .map(v => {
              return (
                <div className={styles.listBox} key='1'>
                  <div className={styles.personalized_list_box} key={v.id}>
                    <img
                      className={styles.personalized_list_box__img}
                      src={v.picUrl}
                      alt=""
                    />
                    <div className={styles.personalized_list_box__count}>
                      ❤ {v.playCount}
                    </div>
                    <div className={styles.personalized_list_box__title}>
                      {v.name}
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
      <div className={styles.personalized_list}>
        {Array.isArray(state.songlist) &&
          state.songlist
            .filter((v, i) => i > 2)
            .map(v => {
              return (
                <div className={styles.personalized_list_box} key={v.id}>
                  <img
                    className={styles.personalized_list_box__img}
                    src={v.picUrl}
                    alt=""
                  />
                  <div className={styles.personalized_list_box__count}>
                    ❤ {v.playCount}
                  </div>
                  <div className={styles.personalized_list_box__title}>
                    {v.name}
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default PlayList;
