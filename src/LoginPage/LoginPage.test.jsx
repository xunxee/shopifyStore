import { useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import LoginPage from './LoginPage';

jest.mock('react-redux');

describe('LoginPage', () => {
  useSelector.mockImplementation((selector) => selector({
    login: {
      isLogin: true,
      loginFields: {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
      },
    },
  }));

  it('renders the LoginFormContainer', () => {
    const { container } = render(<LoginPage />);

    expect(container).toHaveTextContent('X');
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
          <LoginPage
            onClick={handleClick}
          />
        ));

        events.mousedown({
          target: getByTestId('LoginPage'),
        });

        expect(handleClick).toBeCalledTimes(0);
      });
    });

    context('when click outside the modal', () => {
      it('run onClick function', () => {
        const events = mockEvents();

        const { getByTestId } = render((
          <LoginPage
            onClickToggle={handleClick}
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
