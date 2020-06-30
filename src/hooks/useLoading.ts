import React, { useState, useEffect } from 'react'
import {Toast} from 'antd-mobile'

/**
 * 传入一个loading， 来显示loading
 * @param loading
 */
export default function useLoading(loading: boolean) {
  useEffect(() => {
    if(loading) {
      Toast.loading('loading...')
    } else {
      Toast.hide()
    }
  }, [loading])
}
