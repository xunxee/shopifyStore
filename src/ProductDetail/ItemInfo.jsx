import styled from '@emotion/styled';

const Layout = styled.div({
  width: '35%',
  backgroundColor: 'orange',
});

export default function ItemInfo({
  size,
  color,
  details,
  evaluation: { starRating },
}) {
  return (
    <Layout>
      <div>{size}</div>
      <div>{color}</div>
      <div>{details}</div>
      <div>{starRating}</div>
    </Layout>
  );
}
