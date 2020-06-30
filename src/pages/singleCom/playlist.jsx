import React, { useState, useEffect } from 'react';
import { getPlaylist } from '@/services/index';
import styles from './playlistCss.less';
import useRequest from '@/hooks/useRequest';
import useLoading from '@/hooks/useLoading'
import { history } from 'umi';
const PlayList = () => {
  const [state, setState] = useState({
    songlist: [''],
  });

  const { loading, data } = useRequest(getPlaylist(6));

  useEffect(() => {
    if(data) {
      const transformBanner = res => {
        setState({ songlist: res.result });
      }
    transformBanner(data);
    }
  }, [data]);

  useLoading(loading)

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
        <div className={styles.t1}>
          <div className={styles.square}></div>
          <div>♡元气歌单♡</div>
        </div>

        <div className={styles.citation}>用最元气的歌单打开全新的一天！</div>
      </div>
      <div className={styles.personalized_list} key="all">
        {Array.isArray(state.songlist) &&
          state.songlist.length &&
          state.songlist
            .filter((v, i) => i <= 2)
            .map((v, i) => {
              // console.log(v.id, '====vid');
              return (
                <div className={styles.listBox} key={i}>
                  <div
                    onClick={() => {
                      history.push({
                        pathname: '/songList',
                        query: {
                          id: v.id,
                        },
                      });
                    }}
                    className={styles.personalized_list_box}
                  >
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
                <div
                  className={styles.personalized_list_box}
                  key={v.id}
                  onClick={() => {
                    history.push({
                      pathname: '/songList',
                      query: {
                        id: v.id,
                      },
                    });
                  }}
                >
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
