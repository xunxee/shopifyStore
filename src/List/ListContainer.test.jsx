import { MemoryRouter } from 'react-router-dom';

import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import ListContainer from './ListContainer';

jest.mock('react-redux');

describe('ListContainer', () => {
  const dispatch = jest.fn();

  const handleClick = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    handleClick.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation(
      (selector) => (selector({
        list: {
          category: given.category,
          product: given.product,
          sort: given.sort,
          material: given.material,
        },
      })),
    );
  });

  function renderListContainer(
    { pathname, search } = {},
  ) {
    return render((
      <MemoryRouter>
        <ListContainer
          onClickCategories={handleClick}
          pathname={pathname}
          search={search}
        />
      </MemoryRouter>
    ));
  }

  describe('click All Categories', () => {
    context('with product item', () => {
      given('product', () => 'sofas');

      it('generates at the end of the categories path', () => {
        const { getByText } = renderListContainer({
          search: '',
        });

        fireEvent.click(getByText('Featured'));

        expect(dispatch).toBeCalledWith({
          type: 'list/changeCategoriesDataField',
          payload: {
            name: 'featured',
            belong: 'category',
          },
        });

        expect(handleClick).toBeCalledWith(
          '/search/products/sofas/featured',
        );
      });
    });

    context('without product item', () => {
      it('generates categories path', () => {
        const { getByText } = renderListContainer();

        fireEvent.click(getByText('Featured'));

        expect(dispatch).toBeCalledWith({
          type: 'list/changeCategoriesDataField',
          payload: {
            name: 'featured',
            belong: 'category',
          },
        });

        expect(handleClick).toBeCalledWith(
          '/search/featured',
        );
      });
    });
  });

  describe('click All Products', () => {
    context('with category item', () => {
      given('category', () => 'featured');

      it('generates products path before categories', () => {
        const { getByText } = renderListContainer({
          search: '',
        });

        fireEvent.click(getByText('Sofas'));

        expect(dispatch).toBeCalledWith({
          type: 'list/changeCategoriesDataField',
          payload: {
            name: 'sofas',
            belong: 'product',
          },
        });

        expect(handleClick).toBeCalledWith(
          '/search/products/sofas/featured',
        );
      });
    });

    context('without category item', () => {
      it('generate products path', () => {
        const { getByText } = renderListContainer();

        fireEvent.click(getByText('Sofas'));

        expect(dispatch).toBeCalledWith({
          type: 'list/changeCategoriesDataField',
          payload: {
            name: 'sofas',
            belong: 'product',
          },
        });

        expect(handleClick).toBeCalledWith(
          '/search/products/sofas',
        );
      });
    });
  });

  describe('click Sort', () => {
    it('generates sort query parameter', () => {
      const { getByText } = renderListContainer({
        pathname: '/search/featured',
      });

      fireEvent.click(getByText('Trending'));

      expect(dispatch).toBeCalledWith({
        type: 'list/changeCategoriesDataField',
        payload: {
          name: 'trending',
          belong: 'sort',
        },
      });

      expect(handleClick).toBeCalledWith(
        '/search/featured?sort=trending',
      );
    });
  });

  it('renders the material', () => {
    const { getByText } = renderListContainer();

    fireEvent.click(getByText('Fabric'));

    expect(dispatch).toBeCalledWith({
      type: 'list/changeCategoriesDataField',
      payload: {
        name: 'fabric',
        belong: 'material',
      },
    });
  });
});
