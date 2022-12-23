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
          url: {
            category: given.category,
            product: given.product,
            sort: given.sort,
            material: given.material,
          },
        },
      })),
    );
  });

  function renderListContainer({
    urlPathname = '/search',
    urlSearch,
  } = {}) {
    return render((
      <ListContainer
        onClickCategories={handleClick}
        urlPathname={urlPathname}
        urlSearch={urlSearch}
      />
    ));
  }

  it('renders categories', () => {
    const { getByText } = renderListContainer();

    fireEvent.click(getByText('New Arrivals'));

    expect(handleClick).toBeCalled();
  });

  describe('makeUrl', () => {
    context('when it clicks New Arrivals', () => {
      it('changes url to /search/new', () => {
        const { getByText } = renderListContainer();

        fireEvent.click(getByText('New Arrivals'));

        expect(handleClick).toBeCalledWith('/search/new');
      });
    });

    context('when it clicks Sofas', () => {
      it('changes url to /search/product/sofas', () => {
        const { getByText } = renderListContainer();

        fireEvent.click(getByText('Sofas'));

        expect(handleClick).toBeCalledWith(
          '/search/product/sofas',
        );
      });
    });

    context('when it clicks Trending', () => {
      it('changes url to /search?sort=trending', () => {
        const { getByText } = renderListContainer({
          urlPathname: '/search/new',
        });

        fireEvent.click(getByText('Trending'));

        expect(handleClick).toBeCalledWith(
          '/search?sort=trending',
        );
      });
    });

    context('when it clicks Fabric', () => {
      given('sort', () => 'trending');

      it('changes url to /search?sort=trending', () => {
        const { getByText } = renderListContainer({
          urlPathname: '/search/product/beds/new',
        });

        fireEvent.click(getByText('Fabric'));

        expect(handleClick).toBeCalledWith(
          '/search?sort=trending&material=fabric',
        );
      });
    });
  });
});
