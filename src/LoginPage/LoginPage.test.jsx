import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';

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

    global.events = {};

    beforeEach(() => {
      handleClick.mockClear();

      global.events = {};

      document.addEventListener = jest.fn((event, callback) => {
        global.events[event] = callback;
      });

      document.removeEventListener = jest.fn((event) => {
        delete global.events[event];
      });
    });

    context('when click the modal', () => {
      it("doesn't run onClick function", () => {
        const { getByTestId } = render((
          <LoginPage
            onClick={handleClick}
          />
        ));

        global.events.mousedown({ target: getByTestId('LoginPage') });

        expect(handleClick).toBeCalledTimes(0);
      });
    });

    context('when click outside the modal', () => {
      it('run onClick function', () => {
        render((
          <LoginPage
            onClick={handleClick}
          />
        ));

        const $outside = document.getElementsByClassName(
          'outsideTheModal',
        );

        global.events.mousedown({ target: $outside[0] });

        expect(handleClick).toBeCalledTimes(1);
      });
    });
  });
});
