import {
  useState, useRef, useEffect, useCallback,
} from 'react';

import styled from '@emotion/styled';

import { v4 } from 'uuid';

import PRODUCT_TAG from '../styles/productTag';

import Slide from './slide/Slide';
import SlideAlbum from './slide/SlideAlbum';

import {
  updateSlide,
  setAlbumPosition,
} from '../utils';

const { productName, priceName } = PRODUCT_TAG;

const Layout = styled.div({
  display: 'flex',
  position: 'relative',
});

const ProductTag = styled.div({
  position: 'absolute',
  top: '0',
  left: '0',
  zIndex: '20',
  '& h3': {
    fontSize: '32px',
    lineHeight: '32px',
    ...productName,
  },
  '& span': {
    ...priceName,
  },
});

const SlideWrapper = styled.div({
  width: '65%',
});

const ItemInfo = styled.div({
  width: '35%',
  height: '782px',
  backgroundColor: 'orange',
});

export default function ProductWrapper({
  product: {
    title,
    price,
    imageList,
    // TODO:
    // size,
    // details,
  },
  isPassTheSlide,
  startNumber,
  endNumber,
}) {
  const [banners, setBanners] = useState([]);

  const slideRef = useRef();
  const slideAlbumRef = useRef();

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

  const START = startNumber
    || (TOTAL_BANNERS_COUNT * 1) / 3 + 1;

  const END = endNumber || (TOTAL_BANNERS_COUNT * 2) / 3;

  const PREVIOUS_END = (TOTAL_BANNERS_COUNT * 1) / 3;

  const NEXT_START = (TOTAL_BANNERS_COUNT * 2) / 3 + 1;

  const [slide, setSlide] = useState({
    number: START,
    isMotion: true,
  });

  useEffect(() => {
    function setInitialPosition() {
      slideRef.current.style
        .transform = `translateX(-${
          SLIDE_WIDTH * (START - 1)
        }vw)`;

      setSlide({
        number: START,
        isMotion: false,
      });
    }

    setInitialPosition();
  }, [banners]);

  useEffect(() => {
    slideRef.current.style
      .transform = `translateX(-${
        SLIDE_WIDTH * (slide.number - 1)
      }vw)`;

    slideRef.current.style
      .transition = slide.isMotion ? 'all 0.5s ease-in' : '';

    const albumImageIndex = slide.number - BANNERS_COUNT;

    slideAlbumRef.current.style
      .transform = setAlbumPosition({
        index: albumImageIndex,
        length: BANNERS_COUNT,
      });
  }, [slide, SLIDE_WIDTH]);

  const isPassTheFirstSlide = isPassTheSlide
    || slide.number === PREVIOUS_END;
  const isPassTheLastSlide = isPassTheSlide
    || slide.number === NEXT_START;

  const goToBanner = useCallback(({
    targetName,
    isMotion,
  }) => {
    setSlide(updateSlide({ targetName, isMotion }));
  });

  const goToMainEndSlide = useCallback(({
    targetName,
    isMotion,
  }) => {
    setSlide({
      number: END,
      isMotion,
    });

    setTimeout(() => {
      goToBanner({
        targetName,
        isMotion: true,
      });
    }, 50);
  }, [slide]);

  const goToMainStartSlide = useCallback(({
    targetName,
    isMotion,
  }) => {
    setSlide({
      number: START,
      isMotion,
    });

    setTimeout(() => {
      goToBanner({
        targetName,
        isMotion: true,
      });
    }, 50);
  }, [slide]);

  return (
    <>
      <Layout>
        <ProductTag>
          <h3>{title}</h3>
          <span>{price}</span>
        </ProductTag>
        <SlideWrapper>
          <Slide
            banners={banners}
            slideRef={slideRef}
            title={title}
            isPassTheFirstSlide={isPassTheFirstSlide}
            goToMainEndSlide={goToMainEndSlide}
            isPassTheLastSlide={isPassTheLastSlide}
            goToMainStartSlide={goToMainStartSlide}
            goToBanner={goToBanner}
          />
          <SlideAlbum
            title={title}
            imageList={imageList}
            currentSlideNumber={slide.number}
            setSlide={setSlide}
            BANNERS_COUNT={BANNERS_COUNT}
            slideAlbumRef={slideAlbumRef}
          />
        </SlideWrapper>
        <ItemInfo />
      </Layout>
      <div>{title}</div>
      <div>Product Info</div>
    </>
  );
}
