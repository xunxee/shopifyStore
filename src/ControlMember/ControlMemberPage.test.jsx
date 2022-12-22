import { useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import ControlMemberPage from './ControlMemberPage';

import INITIAL_LOGIN_FIELDS from '../../fixtures/initialLoginFields';

jest.mock('react-redux');

describe('ControlMemberPage', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      controlMember: {
        isLogin: true,
        accountFields: INITIAL_LOGIN_FIELDS,
        isButtonActive: false,
      },
    }));
  });

  it('renders the ControlMemberContainer', () => {
    const { container } = render(<ControlMemberPage />);

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
          <ControlMemberPage
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
          <ControlMemberPage
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
