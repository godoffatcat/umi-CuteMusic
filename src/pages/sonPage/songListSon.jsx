import React, { useState, useEffect } from 'react';
import styles from '../index.less';
import { getPersonalList } from '../../services/index';
import DateTrans from '../../application/timeApi';
import { Toast } from 'antd-mobile';
import { history } from 'umi';
import useRequest from '../../hooks/useRequest';
import useLoading from '../../hooks/useLoading';
import TitleBar from '../../components/titleBar';

const PersonalList = props => {
  const [state, setState] = useState({
    listName: '',
    songListINthis: [],
    loading: false,
    updateTime: '',
    coverImg: '',
  });

  const id = props.location.query.id;
  const { loading, data } = useRequest(getPersonalList(id));
  useEffect(() => {
    if (data) {
      const transformPersonalList = res => {
        setState({
          listName: res.playlist.name,
          songListINthis: res.playlist.tracks,
          updateTime: res.playlist.updateTime,
          coverImg: res.coverImgUrl,
        });
      };
      transformPersonalList(data);
    }
  }, [data]);
  useLoading(loading);

  const timeTo = () => {
    const time = state.updateTime;
    const newTime = DateTrans(time);
    return newTime;
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
      <TitleBar></TitleBar>
      <div className={styles.rankBanner}>
        <div className={styles.rankBannerTitle}>{state.listName}</div>
        <div className={styles.time}>{timeTo()} 更新</div>
      </div>
      <div className={styles.rankListArea}>
        {state.songListINthis.map((val, i) => {
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
              <div className={styles.rankPoint}> · </div>
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

export default PersonalList;
