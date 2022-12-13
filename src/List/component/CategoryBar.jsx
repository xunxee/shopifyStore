import styled from '@emotion/styled';

import { useCallback } from 'react';

import LIST_CATEGORIES_STYLE from '../../../fixtures/listCategoriesStyle';
import LIST_CATEGORIES from '../../../fixtures/listCategoriesCollection';

const {
  container,
  layout,
  button,
} = LIST_CATEGORIES_STYLE;

const Container = styled.div(container);

const Layout = styled.ul(layout);

const Button = styled.button(({ underLine, name }) => ({
  ...button,
  textDecoration: underLine === name
    ? 'underLine' : 'none',
}));

export default function CategoryBar({
  title,
  keyword,
  item,
  onClick,
}) {
  const handleClick = useCallback((
    { target: { name } },
  ) => {
    onClick(name);
  }, [item, onClick]);
  return (
    <Container>
      <div>
        <Layout>
          {title}
          {LIST_CATEGORIES[keyword].map(({
            value, subHeading,
          }) => (
            <Button
              type="button"
              key={value}
              name={value}
              underLine={item}
              onClick={handleClick}
            >
              {subHeading}
            </Button>
          ))}
        </Layout>
      </div>
    </Container>
  );
}
