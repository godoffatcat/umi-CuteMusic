import React, {useState, useEffect}  from 'react';
import styles from './index.less';
import { getTop } from "../application/apiStore";
import TitleBar from '../components/titleBar'

const SongList =() => {
    // const [state, setState] = useState({
    //   listType: '0',
    //   playList: [],
    //   loading: false,
    // })

//   const transformSearch = (res) => {
//     if(res.code === 200) {
//       setState({listType: state.listType, playList: res.playlist.track, loading: false})
//     }
//   }

//   const fetchList = (typeNum) => {
//     setState({...state, loading: true})
//     getTop(typeNum).then((res) => transformSearch(res))
//   }

// const SongListToogle = (num) => {
//   setState({listType: num, playList: [], loading: false})
//   fetchList(state.listType)
// }

  return (
    <div>
    <TitleBar></TitleBar>
    <div>
      <h1 className={styles.title}>sssss index</h1>
    </div>
    </div>
  );
}

export default SongList
