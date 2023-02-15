import styled from "@emotion/styled";

import ItemCard from "./ItemCard";

const Layout = styled.div({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  marginTop: "1.5rem",
  marginBottom: "5rem",
});

export default function ItemList({ onClickItemList, productList }) {
  return (
    <Layout>
      {productList.map((product) => (
        <ItemCard
          key={product.id}
          product={product}
          onClickItemList={onClickItemList}
        />
      ))}
    </Layout>
  );
}
