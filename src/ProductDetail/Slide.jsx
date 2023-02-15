import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import PALETTE from '../styles/Palette';

const { basicWhite, basicPurple, darkPurple } = PALETTE;

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
  zIndex: '20',
  width: '194px',
  border: `1px solid ${basicWhite}`,
  borderWidth: '1px',
  '& button': {
    ':hover': {
      backgroundColor: darkPurple,
    },
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
  isPassTheLastSlide,
  goToMainStartSlide,
  goToBanner,
}) {
  function handleClickArrowButtons({ currentTarget: { title: targetName } }) {
    if (targetName === 'previousArrow') {
      return isPassTheFirstSlide
        ? goToMainEndSlide({ targetName, isMotion: false })
        : goToBanner({ targetName, isMotion: true });
    }

    return isPassTheLastSlide
      ? goToMainStartSlide({ targetName, isMotion: false })
      : goToBanner({ targetName, isMotion: true });
  }

  return (
    <Layout slideLength={banners.length}>
      <SlideControlButton>
        <button
          type="button"
          title="previousArrow"
          onClick={handleClickArrowButtons}
        >
          <FontAwesomeIcon icon={faArrowLeft} size="2x" color={basicWhite} />
        </button>
        <button
          title="nextArrow"
          type="button"
          onClick={handleClickArrowButtons}
        >
          <FontAwesomeIcon icon={faArrowRight} size="2x" color={basicWhite} />
        </button>
      </SlideControlButton>
      <ul ref={slideRef}>
        {banners &&
          banners.map(({ key, imgUrl }) => (
            <li key={key}>
              <img alt={title} src={imgUrl} />
            </li>
          ))}
      </ul>
    </Layout>
  );
}
