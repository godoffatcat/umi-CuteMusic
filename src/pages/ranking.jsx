import React, { useState, useEffect } from 'react';
import styles from './index.less';
import DateTrans from '../application/timeApi';
import { history } from 'umi';
import useRequest from '@/hooks/useRequest';
import useLoading from '@/hooks/useLoading'
import {getRank} from '@/services/index'

const RankingList = () => {
  const [state, setState] = useState({
    listType: '0',
    typeName: '',
    rankList: [],
    loading: false,
    updateTime: '',
  });

  const getName = val => {
    let name = '';
    // console.log('name is', val);
    if (val && val.ar && Array.isArray(val.ar)) {
      val.ar.forEach(element => {
        name += element.name;
        name += ' - ';
        // console.log('plus name is', name);
      });
      if (name[name.length - 2] === '-') {
        name = name.slice(0, name.length - 2);
      }
    }
    return name;
  };

  const { loading, data } = useRequest(getRank(6));

  useEffect(() => {
    if (data) {
      const transformRankList = res => {
          setState({
            rankList: res.playlist.tracks.slice(0, 50),
            typeName: res.playlist.name,
            updateTime: res.playlist.trackUpdateTime,
          });
      };
      transformRankList(data);
    }
  }, [data]);

  useLoading(loading)

  const timeTo = () => {
    const time = state.updateTime;
    const newTime = DateTrans(time);
    return newTime;
  };

  return (
    <div>
      <div className={styles.rankBanner}>
        <div className={styles.rankBannerTitle}>{state.typeName}</div>
        <div className={styles.time}>{timeTo()} 更新</div>
      </div>
      <div className={styles.rankListArea}>
        {state.rankList.map((val, i) => {
          return (
            <div
              className={styles.rankSingle}
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
              <div className={styles.rankNum}> {i + 1} </div>
              <div className={styles.rankNameAr}>
                <div className={styles.rankName}> {val.name}</div>
                <div className={styles.artists}>{getName(val)}</div>
              </div>
              <button className={styles.playBtn}>▶</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RankingList;
