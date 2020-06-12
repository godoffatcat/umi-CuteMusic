import React, { useState, useEffect } from 'react';
import { getPlaylist } from '../../application/apiStore';
import styles from './playlist.less';

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

  return (
    <div>
      <div className="sub-title">元气歌单</div>
      <div className={styles.personalized_list}>
        {Array.isArray(state.songlist) &&
          state.songlist
            .filter((v, i) => i < 3)
            .map(v => {
              <div className={styles.personalized_list_box} key={v.id}>
                <img
                  className={styles.personalized_list_box__img}
                  src={v.picUrl}
                  alt=""
                />
                <div className={styles.personalized_list_box__count}>
                  ❤ {v.playCoucnt}
                </div>
                <div className={styles.personalized_list_box__title}>
                  {v.name}
                </div>
              </div>;
            })}
      </div>
      <div className={styles.personalized_list}>
        {Array.isArray(state.songlist) &&
          state.songlist
            .filter((v, i) => i < 3)
            .map(v => {
              <div className={styles.personalized_list_box} key={v.id}>
                <img
                  className={styles.personalized_list_box__img}
                  src={v.picUrl}
                  alt=""
                />
                <div className={styles.personalized_list_box__count}>
                  ❤ {v.playCoucnt}
                </div>
                <div className={styles.personalized_list_box__title}>
                  {v.name}
                </div>
              </div>;
            })}
      </div>
    </div>
  );
};

export default PlayList
