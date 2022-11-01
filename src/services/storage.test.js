import { saveItem } from './storage';

describe('storage', () => {
  jest.spyOn(localStorage, 'setItem');

  beforeEach(() => {
    localStorage.setItem = jest.fn();
  });

  describe('saveItem', () => {
    it('calls localStorage setItem', () => {
      saveItem('key', 'value');
    });
  });
});
