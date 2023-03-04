import {
  useState, useRef, useEffect, useCallback,
} from 'react';

import styled from '@emotion/styled';

import PRODUCT_TAG from '../../styles/productTag';

import Slide from './Slide';
import SlideAlbum from './SlideAlbum';
import ItemInfo from '../ItemInfo';

import {
  updateSlide,
  changeAlbumPosition,
} from '../../utils';

const { productName, priceName } = PRODUCT_TAG;

const Wrapper = styled.div({
  display: 'flex',
  position: 'relative',
});

const StyledProductTag = styled.div({
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

const StyledSlideWrapper = styled.div({
  width: '65%',
});

export default function ProductWrapper({
  product,
  banners,
  isPassTheSlide,
  startNumber,
  endNumber,
  selectedSize,
  onClickSize,
  selectedColor,
  onClickColor,
  isCareInfoOpen,
  isDetailsInfoOpen,
  onClickAdditionalInfo,
}) {
  const { title, price, imageList } = product;

  const slideRef = useRef();
  const slideImageRef = useRef();
  const slideAlbumRef = useRef();

  const SLIDE_IMAGE_VW = 65;
  const MAIN_SLIDE_LENGTH = banners.length / 3;
  const TOTAL_SLIDE_IMAGE_LENGTH = MAIN_SLIDE_LENGTH * 3;
  const START_MAIN_SLIDE_INDEX = startNumber || (TOTAL_SLIDE_IMAGE_LENGTH * 1) / 3 + 1;
  const END_MAIN_SLIDE_INDEX = endNumber || (TOTAL_SLIDE_IMAGE_LENGTH * 2) / 3;
  const END_PREVIOUS_SLIDE_INDEX = (TOTAL_SLIDE_IMAGE_LENGTH * 1) / 3;
  const START_NEXT_SLIDE_INDEX = (TOTAL_SLIDE_IMAGE_LENGTH * 2) / 3 + 1;

  const [slide, setSlide] = useState({
    number: START_MAIN_SLIDE_INDEX,
    isMotion: true,
  });

  useEffect(() => {
    function setInitialPosition() {
      slideRef.current.style.transform = `translateX(-${
        SLIDE_IMAGE_VW * (START_MAIN_SLIDE_INDEX - 1)
      }vw)`;

      setSlide({
        number: START_MAIN_SLIDE_INDEX,
        isMotion: false,
      });
    }

    setInitialPosition();
  }, [banners]);

  useEffect(() => {
    slideRef.current.style.transform = `translateX(-${
      SLIDE_IMAGE_VW * (slide.number - 1)
    }vw)`;

    slideRef.current.style.transition = slide.isMotion
      ? 'all 0.5s ease-in'
      : '';

    const ALBUM_IMAGE_INDEX = slide.number - MAIN_SLIDE_LENGTH;

    const CLIENT_SLIDE_WIDTH = slideImageRef.current.clientWidth;

    slideAlbumRef.current.style.transform = changeAlbumPosition(
      {
        ALBUM_IMAGE_INDEX,
        MAIN_SLIDE_LENGTH,
        CLIENT_SLIDE_WIDTH,
      },
    );
  }, [slide, SLIDE_IMAGE_VW]);

  const isPassTheFirstSlide = isPassTheSlide || slide.number === END_PREVIOUS_SLIDE_INDEX;
  const isPassTheLastSlide = isPassTheSlide || slide.number === START_NEXT_SLIDE_INDEX;

  const goToBanner = useCallback(({ targetName, isMotion }) => {
    setSlide(updateSlide({ targetName, isMotion }));
  });

  const goToMainEndSlide = useCallback(
    ({ targetName, isMotion }) => {
      setSlide({
        number: END_MAIN_SLIDE_INDEX,
        isMotion,
      });

      setTimeout(() => {
        goToBanner({
          targetName,
          isMotion: true,
        });
      }, 50);
    },
    [slide],
  );

  const goToMainStartSlide = useCallback(
    ({ targetName, isMotion }) => {
      setSlide({
        number: START_MAIN_SLIDE_INDEX,
        isMotion,
      });

      setTimeout(() => {
        goToBanner({
          targetName,
          isMotion: true,
        });
      }, 50);
    },
    [slide],
  );

  return (
    <Wrapper>
      <StyledProductTag>
        <h3>{title}</h3>
        <span>{price}</span>
      </StyledProductTag>
      <StyledSlideWrapper>
        <Slide
          banners={banners}
          slideRef={slideRef}
          slideImageRef={slideImageRef}
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
          MAIN_SLIDE_LENGTH={MAIN_SLIDE_LENGTH}
          slideAlbumRef={slideAlbumRef}
        />
      </StyledSlideWrapper>
      <ItemInfo
        product={product}
        selectedSize={selectedSize}
        onClickSize={onClickSize}
        selectedColor={selectedColor}
        onClickColor={onClickColor}
        isCareInfoOpen={isCareInfoOpen}
        isDetailsInfoOpen={isDetailsInfoOpen}
        onClickAdditionalInfo={onClickAdditionalInfo}
      />
    </Wrapper>
  );
}
