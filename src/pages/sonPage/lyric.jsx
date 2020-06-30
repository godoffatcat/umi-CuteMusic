import React, { useState, useEffect } from 'react';
import { getSongLyric } from '@/services/index';
import useRequest from '@/hooks/useRequest';
import useLoading from '@/hooks/useLoading';

const SongLyric = props => {
  const [state, setState] = useState({
    lyricFile: '',
    pureLyric: [],
  });

  const { loading, data } = useRequest(getSongLyric(props.id));

  useEffect(() => {
    if (data) {
      const transformSongLyric = res => {
        setState({ lyricFile: res.lrc.lyric });
      };
      transformSongLyric(data);
    }
  }, [data]);

  useLoading(loading);

  useEffect(() => {
    let lyricPure = [];
    var lyricStepA = state.lyricFile.split('[');
    lyricPure.push(lyricStepA);
    // console.log(lyricPure, 'after [');
    lyricPure.map(v => {
      v.slice(11);
      // console.log(lyricPure, 'after map');
    });
  }, [state.lyricFile]);

  return (
    <div>
      <div className="lyric">{state.lyricFile}</div>
    </div>
  );
};

export default SongLyric;
