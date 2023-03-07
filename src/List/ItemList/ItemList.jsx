import styled from '@emotion/styled';

import ItemCard from './ItemCard';

const Wrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'flex-start',
  flexWrap: 'wrap',
  marginTop: '1.5rem',
  marginBottom: '5rem',
});

export default function ItemList(
  { onClickItemList, productList },
) {
  const newList = [...productList];

  while (newList.length % 3 !== 0) {
    newList.push(
      {
        id: newList[newList.length - 1].id + 1,
        title: 'fake',
      },
    );
  }

  return (
    <Wrapper>
      {newList.map((product) => (
        <ItemCard
          key={product.id}
          product={product}
          onClickItemList={onClickItemList}
        />
      ))}
    </Wrapper>
  );
}
