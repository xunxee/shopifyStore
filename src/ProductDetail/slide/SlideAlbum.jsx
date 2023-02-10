import styled from '@emotion/styled';

const Container = styled.div({
  backgroundColor: 'red',
});

const ImageList = styled.ul({
  display: 'flex',
  '& button': {
    display: 'inline-block',
    all: 'unset',
  },
  '& img': {
    width: '235px',
    height: '182px',
  },
});

export default function SlideAlbum({
  title,
  imageList,
  currentSlideNumber,
  setSlide,
}) {
  const uniqueImageList = imageList.map((url, index) => [url, index + 1]);

  function handleClick(number) {
    const selectedNumber = number + 4;

    if (selectedNumber === currentSlideNumber) return;

    setSlide({
      number: selectedNumber,
      isMotion: true,
    });
  }

  return (
    <Container>
      <ImageList data-testid="albumContainer">
        {uniqueImageList.map(([url, key]) => (
          <button
            type="button"
            key={key}
            data-testid="detailImage"
            onClick={() => handleClick(key)}
          >
            <img alt={title} src={url} />
          </button>
        ))}
      </ImageList>
    </Container>
  );
}
