import { Carousel, WingBlank ,Toast} from 'antd-mobile';
// import { getBanner } from '../../application/apiStore'
import React, { useState, useEffect } from 'react';
import useRequest from '@/hooks/useRequest';
import useLoading from '@/hooks/useLoading'
import {getBanner} from '@/services/index'
const Banner = () => {
  const [state, setState] = useState({
    // imgHeight: state.imgHeight,
    bannerPic: [''],
  });

  const { loading, data } = useRequest(getBanner());

  useEffect(() => {
    if (data) {
      const transformBanner = res => {
          setState({ bannerPic: res.banners });
      };
      transformBanner(data);
    }
  }, [data]);

  useLoading(loading)

  return (
    <WingBlank>
      <Carousel
        autoplay={true}
        infinite
        // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
        // afterChange={index => console.log('slide to', index)}
      >
        {Array.isArray(state.bannerPic) && state.bannerPic.map(val => (
          <a
            key={val}
            style={{
              display: 'inline-block',
              width: '100%',
              height: '150px',
            }}
          >
            <img
              src={val.imageUrl}
              alt=""
              style={{ width: '100%', verticalAlign: 'top',  height: '150px'}}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
                // setState({ ...state, imgHeight: 'auto' });
              }}
            />
          </a>
        ))}
      </Carousel>
    </WingBlank>
  );
};

export default Banner;
