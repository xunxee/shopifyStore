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

  let events = {};

  beforeEach(() => {
    events = {};

    document.addEventListener = jest.fn((event, callback) => {
      events[event] = callback;
    });

    document.removeEventListener = jest.fn((event) => {
      delete events[event];
    });
  });

  describe('addEventListener', () => {
    context('when click the modal', () => {
      it("doesn't run onClick function", () => {
        //
      });
    });

    context('when click outside the modal', () => {
      it('run onClick function');
    });
  });
});
