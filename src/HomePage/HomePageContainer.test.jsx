import { useDispatch } from 'react-redux';

import { render } from '@testing-library/react';

import HomePageContainer from './HomePageContainer';

jest.mock('react-redux');

describe('HomePageContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);
  });

  function renderHomePageContainer() {
    return render(
      <HomePageContainer />,
    );
  }

  it('renders the title', () => {
    const { container } = renderHomePageContainer();

    expect(container).toHaveTextContent('HomePageContainer');
  });
});
