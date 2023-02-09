import styled from '@emotion/styled';

const Container = styled.div({
  backgroundColor: 'red',
});

const ImageList = styled.ul({
  display: 'flex',
  '& li': {
    display: 'inline-block',
  },
  '& img': {
    width: '235px',
    height: '182px',
  },
});

export default function SlideAlbum({
  title,
  imageList,
}) {
  const uniqueImageList = imageList.map((url, index) => [url, index + 1]);

  return (
    <Container>
      <ImageList data-testid="albumContainer">
        {uniqueImageList.map(([url, key]) => (
          <li
            key={key}
            data-testid="detailImage"
          >
            <img alt={title} src={url} />
          </li>
        ))}
      </ImageList>
    </Container>
  );
}
