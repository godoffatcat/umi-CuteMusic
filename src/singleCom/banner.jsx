import { Carousel, WingBlank } from 'antd-mobile';
import {getBanner} from '../application/apiStore'
import React, {useState, useEffect}  from 'react';


const Banner = () => {
  const [state, setState] = useState({
    imgHeight: 176,
    bannerPic: [{imageUrl: "" }],
  })

  useEffect(() => {
    const initBanner = () => {
      const transformBanner = (res) => {
        if (res.code === 200) {
          setInterval(() => {
            setState({ ...state, bannerPic: res.banners });
          }, 10)
          console.log('banner is', state.bannerPic)
        }
      };
      getBanner().then((res) => transformBanner(res));
    };
    initBanner();
  }, []);


  return (
    <WingBlank>
    <Carousel
      autoplay={false}
      infinite
      beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
      afterChange={index => console.log('slide to', index)}
    >
      {state.bannerPic.map(val => (
        <a
          key={val}
          href=""
          style={{ display: 'inline-block', width: '100%', height: state.imgHeight }}
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
  )
}

export default Banner
