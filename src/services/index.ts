export function getBanner() {
  return `/banner`
}

//
export function getSongList(limit = 30) {
  return `/playlist/hot?limit=${limit}`
}

// 首页的歌单推荐
export function getPlaylist(num:string) {
  return `/personalized?limit=${num}`
}

// 首页的新歌速递
export function getnewSong(limit = 10) {
  return `/personalized/newsong?limit=${limit}`
}

// 搜索请求
export function getSearch(keywords:string, limit = 20) {
  return `/search?keywords=${keywords}&limit=${limit}`
}

export function getRank(type:string) {
  return `/top/list?idx=${type}`
}

export function getUrl(id:string) {
  return `/song/url?id=${id}`
}

export function getListSong(id:string) {
  return `/playlist/detail?id=${id}`
}

export function getDefault() {
  return `/search/default`
}

export function getHotWord() {
  return `/search/hot`
}

// 获取歌单详情
export function getPersonalList(id:string) {
  return `/playlist/detail?id=${id}`
}

// 获取歌曲详情
export function getSongDetail(id:string) {
  return `/song/detail?ids=${id}`
}

export function getSongLyric(id:string) {
  return `/lyric?id=${id}`
}
