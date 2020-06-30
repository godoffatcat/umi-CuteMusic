import React from 'react'
import { request } from '@/utils/request'

function useRequest(url: string, options?:RequestInit) {
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState()

  React.useEffect(() => {
    setLoading(true)
    request(url, options).then(res => {
      if (res.code === 200) {
        setLoading(false)
        setData(res)
      } else {
        throw new Error('res code is not 200 ' + res)
      }

    }).catch(e => {
      setLoading(false)
    })
  }, [url, options])

  return {
    loading,
    data
  }
}

export default  useRequest
