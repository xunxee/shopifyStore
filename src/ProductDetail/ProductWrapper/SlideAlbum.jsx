import styled from '@emotion/styled';

import Palette from '../../styles/palette';

import { makeSelectedNumber } from '../../utils';

const { darkPurple, palePurple } = Palette;

const Wrapper = styled.div({
  backgroundColor: darkPurple,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
});

const StyledImageList = styled.div();

const StyledAlbumImage = styled.button((
  {
    uniqueNumber,
    selectedSlideNumber,
  },
) => ({
  all: 'unset',
  backgroundColor: `${
    uniqueNumber === selectedSlideNumber ? palePurple : darkPurple
  }`,
  '& img': {
    width: '235px',
    height: '182px',
    objectFit: 'cover',
    transition: '0.5s',
  },
  '&: hover': {
    '& img': {
      transform: 'scale(1.2)',
    },
  },
}));

export default function SlideAlbum({
  title,
  imageList,
  currentSlideNumber,
  setSlide,
  MAIN_SLIDE_LENGTH,
  slideAlbumRef,
}) {
  const uniqueImageList = imageList.map(
    (url, index) => [url, index + 1],
  );

  function handleClick(number) {
    const selectedNumber = number + MAIN_SLIDE_LENGTH;

    if (selectedNumber === currentSlideNumber) return;

    setSlide({
      number: selectedNumber,
      isMotion: true,
    });
  }

  return (
    <Wrapper data-testid="albumContainer">
      <StyledImageList ref={slideAlbumRef}>
        {uniqueImageList.map(([url, key]) => (
          <StyledAlbumImage
            type="button"
            key={key}
            data-testid="detailImage"
            uniqueNumber={key}
            selectedSlideNumber={makeSelectedNumber(
              {
                length: MAIN_SLIDE_LENGTH,
                slideNumber: currentSlideNumber,
              },
            )}
            onClick={() => handleClick(key)}
          >
            <img alt={title} src={url} />
          </StyledAlbumImage>
        ))}
      </StyledImageList>
    </Wrapper>
  );
}
