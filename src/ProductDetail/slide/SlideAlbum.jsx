import styled from '@emotion/styled';

import Palette from '../../styles/Palette';

import { makeSelectedNumber } from '../../utils';

const {
  darkPurple,
  palePurple,
} = Palette;

const AlbumLayout = styled.ul({
  display: 'flex',
  backgroundColor: darkPurple,
});

const AlbumImage = styled.button(({
  uniqueNumber,
  selectedSlideNumber,
}) => ({
  all: 'unset',
  display: 'inline-block',
  backgroundColor: `${uniqueNumber === selectedSlideNumber
    ? palePurple
    : darkPurple}`,
  '& img': {
    width: '235px',
    height: '182px',
  },
}));

export default function SlideAlbum({
  title,
  imageList,
  currentSlideNumber,
  setSlide,
  BANNERS_COUNT,
}) {
  const uniqueImageList = imageList.map((
    url,
    index,
  ) => [url, index + 1]);

  function handleClick(number) {
    const selectedNumber = number + 4;

    if (selectedNumber === currentSlideNumber) return;

    setSlide({
      number: selectedNumber,
      isMotion: true,
    });
  }

  return (
    <AlbumLayout data-testid="albumContainer">
      {uniqueImageList.map(([url, key]) => (
        <AlbumImage
          type="button"
          key={key}
          data-testid="detailImage"
          uniqueNumber={key}
          selectedSlideNumber={makeSelectedNumber({
            length: BANNERS_COUNT,
            slideNumber: currentSlideNumber,
          })}
          onClick={() => handleClick(key)}
        >
          <img alt={title} src={url} />
        </AlbumImage>
      ))}
    </AlbumLayout>
  );
}
