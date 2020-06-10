import { Carousel, WingBlank } from 'antd-mobile';
import { getBanner } from '../../application/apiStore'
import React, { useState, useEffect } from 'react';

const Banner = () => {
  const [state, setState] = useState({
    imgHeight: 176,
    bannerPic: [''],
  });

  useEffect(() => {
    const initBanner = () => {
      const transformBanner = res => {
        if (res.code === 200) {
          setState({ ...state, bannerPic: res.banners });
        }
      };
      getBanner().then(res => transformBanner(res));
    };
    initBanner();
  });

// useEffect(() => {
//   console.log('banner is', state.bannerPic);
// }, [state.bannerPic])

  return (
    <WingBlank>
      <Carousel
        autoplay={true}
        infinite
        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
        afterChange={index => console.log('slide to', index)}
      >
        {state.bannerPic.map(val => (
          <a
            key={val}
            href=""
            style={{
              display: 'inline-block',
              width: '100%',
              height: state.imgHeight,
            }}
          >
            <img
              src={''}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
                setState({ imgHeight: 'auto' });
              }}
            />
          </a>
        ))}
      </Carousel>
    </WingBlank>
  );
};

export default Banner;
