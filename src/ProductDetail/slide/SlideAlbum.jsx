import styled from '@emotion/styled';

const Container = styled.div({
  height: '182px',
  backgroundColor: 'red',
});

export default function SlideAlbum({
  title,
  banners,
}) {
  if (!banners) return null;

  const uniqueBanners = banners.slice(0, banners.length / 3);

  return (
    <Container>
      <p>SlideAlbum</p>
      <ul data-testid="albumContainer">
        {uniqueBanners && uniqueBanners.map(({
          key, imgUrl,
        }) => (
          <li
            key={key}
            data-testid="detailImage"
          >
            <img alt={title} src={imgUrl} />
          </li>
        ))}
      </ul>
    </Container>
  );
}
