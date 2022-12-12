import { MemoryRouter } from 'react-router-dom';

import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import ListContainer from './ListContainer';

jest.mock('react-redux');

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate() {
    return mockUseNavigate;
  },
  useLocation: () => ({
    pathname: '/search/featured',
    search: '',
  }),
}));

describe('ListContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    mockUseNavigate.mockClear();

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

  function renderListContainer() {
    return render((
      <MemoryRouter>
        <ListContainer />
      </MemoryRouter>
    ));
  }

  describe('click All Categories', () => {
    context('with product item', () => {
      given('product', () => 'sofas');

      it('generates at the end of the categories path', () => {
        const { queryByText } = renderListContainer();

        fireEvent.click(queryByText('Featured'));

        expect(dispatch).toBeCalledWith({
          type: 'list/changeAllCategories',
          payload: {
            name: 'featured',
            belong: 'category',
          },
        });

        expect(mockUseNavigate).toBeCalledWith(
          '/search/products/sofas/featured',
        );
      });
    });

    context('without product item', () => {
      it('generates categories path', () => {
        const { queryByText } = renderListContainer();

        fireEvent.click(queryByText('Featured'));

        expect(dispatch).toBeCalledWith({
          type: 'list/changeAllCategories',
          payload: {
            name: 'featured',
            belong: 'category',
          },
        });

        expect(mockUseNavigate).toBeCalledWith(
          '/search/featured',
        );
      });
    });
  });

  describe('click All Products', () => {
    context('with category item', () => {
      given('category', () => 'featured');

      it('generates products path before categories', () => {
        const { queryByText } = renderListContainer();

        fireEvent.click(queryByText('Sofas'));

        expect(dispatch).toBeCalledWith({
          type: 'list/changeAllCategories',
          payload: {
            name: 'sofas',
            belong: 'product',
          },
        });

        expect(mockUseNavigate).toBeCalledWith(
          '/search/products/sofas/featured',
        );
      });
    });

    context('without category item', () => {
      it('generate products path', () => {
        const { queryByText } = renderListContainer();

        fireEvent.click(queryByText('Sofas'));

        expect(dispatch).toBeCalledWith({
          type: 'list/changeAllCategories',
          payload: {
            name: 'sofas',
            belong: 'product',
          },
        });

        expect(mockUseNavigate).toBeCalledWith(
          '/search/products/sofas',
        );
      });
    });
  });

  describe('click Sort', () => {
    it('generates sort query parameter', () => {
      const { queryByText } = renderListContainer();

      fireEvent.click(queryByText('Trending'));

      expect(dispatch).toBeCalledWith({
        type: 'list/changeAllCategories',
        payload: {
          name: 'trending',
          belong: 'sort',
        },
      });

      expect(mockUseNavigate).toBeCalledWith(
        '/search/featured?sort=trending',
      );
    });
  });

  it('renders the material', () => {
    const { queryByText } = renderListContainer();

    fireEvent.click(queryByText('Fabric'));

    expect(dispatch).toBeCalledWith({
      type: 'list/changeMaterial',
      payload: 'fabric',
    });
  });
});
