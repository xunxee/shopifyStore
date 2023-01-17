import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

import PALETTE from '../../styles/Palette';

const {
  basicWhite,
  basicPurple,
} = PALETTE;

const Layout = styled.div(({ slideLength }) => ({
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

export default function Slide({
  banners,
  slideRef,
  title,
  isPassTheFirstSlide,
  goToMainEndSlide,
  goToPreviousBanner,
  isPassTheLastSlide,
  goToMainStartSlide,
  goToNextBanner,
}) {
  function handleClickPreviousButton() {
    if (isPassTheFirstSlide) {
      goToMainEndSlide();

      return;
    }

    goToPreviousBanner();
  }

  function handleClickNextButton() {
    if (isPassTheLastSlide) {
      goToMainStartSlide();

      return;
    }

    goToNextBanner();
  }

  return (
    <Layout
      slideLength={banners.length}
    >
      <SlideControlButton>
        <button
          type="button"
          title="previousArrow"
          onClick={handleClickPreviousButton}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            size="2x"
            color={basicWhite}
          />
        </button>
        <button
          title="nextArrow"
          type="button"
          onClick={handleClickNextButton}
        >
          <FontAwesomeIcon
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
    </Layout>
  );
}
