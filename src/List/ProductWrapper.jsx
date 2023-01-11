import { useState, useRef, useEffect } from 'react';

import styled from '@emotion/styled';

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

const Slides = styled.div({
  display: 'flex',
  position: 'relative',
  overflow: 'hidden',
  '& ul': {
    display: 'flex',
    width: '100%',
  },
  '& li': {
    display: 'flex',
    justifyContent: 'center',
    minWidth: '100%',
    backgroundColor: `${basicPurple}`,
  },
  '& img': {
    width: '600px',
    height: '600px',
  },
});

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
  const [currentImgOrder, setCurrentImgOrder] = useState(0);
  const IMG_WIDTH = 936;
  const slideRange = currentImgOrder * IMG_WIDTH;

  const slideRef = useRef(null);

  function handleSlideRight() {
    setCurrentImgOrder(currentImgOrder + 1);
  }

  useEffect(() => {
    slideRef.current.style
      .transition = '.5s';
    slideRef.current.style
      .transitionTimingFunction = 'cubic-bezier(.4, 0, .2, 1)';
    slideRef.current.style
      .transform = `translateX(-${slideRange}px)`;
  }, [currentImgOrder]);

  return (
    <>
      <ItemLayout>
        <SlideWrapper>
          <Slides>
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
                onClick={handleSlideRight}
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
              {imageList && imageList.map((image) => (
                <li key={image}>
                  <img alt={title} src={image} />
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
