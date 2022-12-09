import { render, fireEvent } from '@testing-library/react';

import RelevanceBar from './RelevanceBar';

describe('CategoryBar', () => {
  const handleClickSort = jest.fn();

  it('renders the sort', () => {
    const { queryByText } = render((
      <RelevanceBar
        sort="trending"
        onClickSort={handleClickSort}
      />
    ));

    fireEvent.click((queryByText('Trending')));

    expect(handleClickSort).toBeCalled();
  });
});
