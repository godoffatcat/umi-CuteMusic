import { Carousel, WingBlank } from 'antd-mobile';
import { getBanner } from '../../application/apiStore'
import React, { useState, useEffect } from 'react';

const Banner = () => {
  const [state, setState] = useState({
    // imgHeight: state.imgHeight,
    bannerPic: [''],
  });

  useEffect(() => {
    const initBanner = () => {
      const transformBanner = res => {
        if (res.code === 200) {
          setState({ bannerPic: res.banners });
        }
      };
      getBanner().then(res => transformBanner(res));
    };
    initBanner();
  }, []);

// useEffect(() => {
//   console.log('banner is', state.bannerPic);
// }, [state.bannerPic])

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
