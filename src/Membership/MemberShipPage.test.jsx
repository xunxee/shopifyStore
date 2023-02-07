import { useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import MembershipPage from './MemberShipPage';

import INITIAL_LOGIN_FIELDS from '../../fixtures/Membership/initialLoginFields';

jest.mock('react-redux');

describe('MembershipPage', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      membership: {
        isLogin: true,
        accountFields: INITIAL_LOGIN_FIELDS,
        isButtonActive: false,
      },
    }));
  });

  it('renders the MembershipContainer', () => {
    const { container } = render(<MembershipPage />);

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
          <MembershipPage
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
          <MembershipPage
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
