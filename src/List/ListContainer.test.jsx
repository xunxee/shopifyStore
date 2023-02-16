import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import ListContainer from './ListContainer';

jest.mock('react-redux');

describe('ListContainer', () => {
  const dispatch = jest.fn();

  const handleClickCategories = jest.fn();
  const handleClickItemList = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    handleClickCategories.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      list: {
        url: {
          category: given.category,
          product: given.product,
          sort: given.sort,
          material: given.material,
        },
        productList: [],
      },
    }));
  });

  function renderListContainer({ urlPathname = '/search', urlSearch } = {}) {
    return render(
      <ListContainer
        onClickCategories={handleClickCategories}
        onClickItemList={handleClickItemList}
        urlPathname={urlPathname}
        urlSearch={urlSearch}
      />,
    );
  }

  it('renders categories', () => {
    const { getByText } = renderListContainer();

    fireEvent.click(getByText('New Arrivals'));

    expect(handleClickCategories).toBeCalled();
  });

  describe('changeUrlData', () => {
    const scenarios = [
      {
        situation: 'when only urlPathname exists',
        described: 'saves the data of pathname',
        urlPathname: 'search/product/beds/new',
        payload: { category: 'new', product: 'beds' },
      },
      {
        situation: 'when urlPathname and urlSearch exist',
        described: 'saves the data of urlPathname and urlSearch',
        urlPathname: '/search/product/beds/new',
        urlSearch: '?sort=trending',
        payload: {
          category: 'new',
          product: 'beds',
          sort: 'trending',
        },
      },
      {
        situation: "when urlPathname has 'search' and urlSearch doesn't exist",
        described: "saves 'all' in category",
        urlPathname: '/search',
        payload: { category: 'all' },
      },
      {
        situation: "when urlPathname has 'search' and urlSearch",
        described: "saves 'all' and 'trending'",
        urlPathname: '/search',
        urlSearch: '?sort=trending',
        payload: {
          category: 'all',
          sort: 'trending',
        },
      },
    ];

    scenarios.forEach(
      ({
        situation, described, urlPathname, urlSearch, payload,
      }) => {
        context(situation, () => {
          it(described, () => {
            renderListContainer({ urlPathname, urlSearch });

            expect(dispatch).toBeCalledTimes(2);

            expect(dispatch).toBeCalledWith({
              payload,
              type: 'list/changeUrlAllDataFields',
            });
          });
        });
      },
    );

    context('when not a valid pathname', () => {
      it("doesn't call dispatch", () => {
        renderListContainer({
          urlPathname: '/search/',
        });

        expect(dispatch).toBeCalledTimes(1);
      });
    });
  });

  describe('makeUrl', () => {
    context('when it clicks New Arrivals', () => {
      it('changes url to /search/new', () => {
        const { getByText } = renderListContainer();

        fireEvent.click(getByText('New Arrivals'));

        expect(handleClickCategories).toBeCalledWith('/search/new');
      });
    });

    context('when it clicks Sofas', () => {
      it('changes url to /search/product/sofas', () => {
        const { getByText } = renderListContainer({
          urlPathname: '/search/product/sofas',
        });

        fireEvent.click(getByText('Sofas'));

        expect(handleClickCategories).toBeCalledWith('/search/product/sofas');
      });
    });

    context('when it clicks Trending', () => {
      it('changes url to /search?sort=trending', () => {
        const { getByText } = renderListContainer({
          urlPathname: '/search/new',
        });

        fireEvent.click(getByText('Trending'));

        expect(handleClickCategories).toBeCalledWith('/search?sort=trending');
      });
    });

    context('when it clicks Fabric', () => {
      given('sort', () => 'trending');

      it('changes url to /search?sort=trending', () => {
        const { getByText } = renderListContainer({
          urlPathname: '/search/product/beds/new',
        });

        fireEvent.click(getByText('Fabric'));

        expect(handleClickCategories).toBeCalledWith(
          '/search?sort=trending&material=fabric',
        );
      });
    });
  });
});
