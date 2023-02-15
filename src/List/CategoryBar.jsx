import styled from "@emotion/styled";

import { useCallback } from "react";

import LIST_CATEGORIES_STYLE from "../../fixtures/List/style/listCategoriesStyle";
import LIST_CATEGORIES from "../../fixtures/List/listCategoriesCollection";

const { container, button } = LIST_CATEGORIES_STYLE;

const Container = styled.div(container);

const Button = styled.button(({ underLine, name }) => ({
  ...button,
  textDecoration: underLine === name ? "underLine" : "none",
}));

export default function CategoryBar({ field, selectedItem, onClick }) {
  const { title, belong, data } = LIST_CATEGORIES[field];

  const handleClick = useCallback(
    ({ target: { name } }) => {
      onClick({ name, belong });
    },
    [onClick],
  );

  return (
    <Container>
      <div>
        <h1>{title}</h1>
        <ul>
          {data.map(({ value, subHeading }) => (
            <Button
              type="button"
              key={value}
              name={value}
              underLine={selectedItem}
              onClick={handleClick}
            >
              {subHeading}
            </Button>
          ))}
        </ul>
      </div>
    </Container>
  );
}
