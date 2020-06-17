// import { getBanner } from '../application/apiStore';

// const IndexModel = {
//   namespace: 'index',

//   state: {
//     name: '',
//     age: 18,
//     banner: [],
//   },

//   effects: {
//     *fetchBanner({ payload }, { call, put }) {
//       const res = yield getBanner()
//       yield put({
//         type: 'updateBanner',
//         payload: res.banners,
//       });
//     },
//   },
//   reducers: {
//     updateBanner(state, action) {
//       console.log('123');
//       return {
//         ...state,
//         banner: action.payload,
//       };
//     },
//   },
// };

// export default IndexModel;
d

