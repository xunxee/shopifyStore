import { useState, useRef, useEffect } from 'react';

import styled from '@emotion/styled';

import { v4 } from 'uuid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

import PALETTE from '../styles/Palette';

const {
  basicWhite,
  basicPurple,
} = PALETTE;

const ItemLayout = styled.div({
  display: 'flex',
});

const SlideWrapper = styled.div({
  width: '65%',
});

const Slides = styled.div(({ slideLength }) => ({
  display: 'flex',
  position: 'relative',
  overflow: 'hidden',
  '& ul': {
    display: 'flex',
    width: `${slideLength * 65}vw`,
  },
  '& li': {
    display: 'flex',
    justifyContent: 'center',
    minWidth: '65vw',
    backgroundColor: `${basicPurple}`,
  },
  '& img': {
    width: '600px',
    height: '600px',
  },
}));

const SlideControlButton = styled.div({
  display: 'flex',
  position: 'absolute',
  right: '2.5rem',
  bottom: '2.5rem',
  zIndex: '30',
  width: '194px',
  border: `1px solid ${basicWhite}`,
  borderWidth: '1px',
  '& button': {
    all: 'unset',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '96px',
    height: '48px',
    ':first-of-type': {
      marginRight: '-1px',
    },
    ':last-child': {
      borderLeft: `1px solid ${basicWhite}`,
    },
  },
});

const SlideAlbum = styled.div({
  height: '182px',
  backgroundColor: 'red',
});

const ItemInfo = styled.div({
  width: '35%',
  height: '782px',
  backgroundColor: 'orange',
});

export default function ProductWrapper({
  product: {
    title,
    imageList,
    // TODO:
    // size,
    // details,
  },
}) {
  const [banners, setBanners] = useState([]);

  const slideRef = useRef();

  useEffect(() => {
    setBanners([...imageList, ...imageList, ...imageList]);

    setBanners((bannerList) => {
      const result = bannerList.map((imgUrl) => ({
        key: v4(),
        imgUrl,
      }));

      return result;
    });
  }, []);

  const SLIDE_WIDTH = 65;

  const BANNERS_COUNT = banners.length / 3;

  const TOTAL_BANNERS_COUNT = BANNERS_COUNT * 3;

  const START = (TOTAL_BANNERS_COUNT * 1) / 3 + 1;

  const END = (TOTAL_BANNERS_COUNT * 2) / 3;

  const PREVIOUS_END = (TOTAL_BANNERS_COUNT * 1) / 3;

  const NEXT_START = (TOTAL_BANNERS_COUNT * 2) / 3 + 1;

  const [slide, setSlide] = useState({
    number: START,
    withMotion: true,
  });

  useEffect(() => {
    function setInitialPosition() {
      slideRef.current.style
        .transform = `translateX(-${
          SLIDE_WIDTH * (START - 1)
        }vw)`;

      setSlide({
        number: START,
        withMotion: false,
      });
    }

    setInitialPosition();
  }, [banners]);

  return (
    <>
      <ItemLayout>
        <SlideWrapper>
          <Slides
            slideLength={banners.length}
          >
            <SlideControlButton>
              <button
                type="button"
              >
                <FontAwesomeIcon
                  title="leftArrow"
                  icon={faArrowLeft}
                  size="2x"
                  color={basicWhite}
                />
              </button>
              <button
                type="button"
              >
                <FontAwesomeIcon
                  title="rightArrow"
                  icon={faArrowRight}
                  size="2x"
                  color={basicWhite}
                />
              </button>
            </SlideControlButton>
            <ul ref={slideRef}>
              {banners && banners.map(({ key, imgUrl }) => (
                <li key={key}>
                  <img alt={title} src={imgUrl} />
                </li>
              ))}
            </ul>
          </Slides>
          <SlideAlbum />
        </SlideWrapper>
        <ItemInfo />
      </ItemLayout>
      <div>{title}</div>
      <div>Product Info</div>
    </>
  );
}
