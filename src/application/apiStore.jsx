import {get} from './apiCenter'
//hey!
export function getBanner() {
  return get('/banner')
}

export function getSongList(limit = 30) {
  return get('/playlist/hot?limit=${limit}')
}

export function getnewSong(limit = 10) {
  return get(`/personalized/newsong?limit=${limit}`)
}

export function getSearch(keywords, limit = 20) {
  return get(`/search?keywords=${keywords}&limit=${limit}`)
}

export function getTop(type, limit = 10) {
  return get(`/top/list?idx=${type}&limit=${limit}`)
}

export function getUrl(id) {
  return get(`/song/url?id=${id}`)
}

export function getPlaylist(num) {
  return get(`/personalized?limit=${num}`)
}

export function getListSong(id) {
  return get(`/playlist/detail?id=${id}`)
}
