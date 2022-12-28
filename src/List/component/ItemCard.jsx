import styled from '@emotion/styled';

const Layout = styled.div({
  width: '256px',
  height: '267px',
  backgroundColor: '#F8F8F8',
});

export default function ItemCard(
  { product: { title, price, img } },
) {
  return (
    <Layout>
      <div>
        <h3>
          {title}
        </h3>
        <span>{price}</span>
      </div>
      <div>
        <img alt={title} src={img} width="200px" />
      </div>
    </Layout>
  );
}
