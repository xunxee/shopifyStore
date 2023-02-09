import styled from '@emotion/styled';

const Container = styled.div({
  height: '182px',
  backgroundColor: 'red',
});

export default function SlideAlbum({
  title,
  imageList,
}) {
  const uniqueImageList = imageList.map((url, index) => [url, index + 1]);

  return (
    <Container>
      <p>SlideAlbum</p>
      <ul data-testid="albumContainer">
        {uniqueImageList.map(([url, key]) => (
          <li
            key={key}
            data-testid="detailImage"
          >
            <img alt={title} src={url} />
          </li>
        ))}
      </ul>
    </Container>
  );
}
