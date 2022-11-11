import { fireEvent, render } from '@testing-library/react';

import { useDispatch } from 'react-redux';

import LogoutPage from './LogoutPage';

jest.mock('react-redux');

describe('LogoutPage', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);

  it('renders "Log out" button', () => {
    const { queryByText } = render((
      <LogoutPage />
    ));

    fireEvent.click(queryByText('Log out'));

    expect(dispatch).toBeCalledWith({
      payload: undefined,
      type: 'login/logout',
    });
  });

  describe('addEventListener', () => {
    const handleClick = jest.fn();

    beforeEach(() => {
      handleClick.mockClear();
    });

    jest.spyOn(EventTarget.prototype, 'addEventListener');

    const mockEvents = () => {
      const events = {};

      EventTarget.prototype.addEventListener = jest.fn(
        (event, callback) => { events[event] = callback; },
      );

      EventTarget.prototype.removeEventListener = jest.fn(
        (event) => { delete events[event]; },
      );

      return events;
    };

    context('when click inside the modal', () => {
      it("doesn't run onClick function", () => {
        const events = mockEvents();

        const { getByTestId } = render((
          <LogoutPage
            onClick={handleClick}
          />
        ));

        events.mousedown({
          target: getByTestId('LogoutPage'),
        });

        expect(handleClick).toBeCalledTimes(0);
      });
    });

    context('when click outside the modal', () => {
      it('run onClilckk function', () => {
        const events = mockEvents();

        const { getByTestId } = render((
          <LogoutPage
            onClick={handleClick}
          />
        ));

        events.mousedown({
          target: getByTestId('outsideTheModal'),
        });

        expect(handleClick).toBeCalledTimes(1);
      });
    });
  });
});
