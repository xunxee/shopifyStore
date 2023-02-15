import { saveItem, TODO } from './storage';

describe('storage', () => {
  jest.spyOn(Object.getPrototypeOf(localStorage), 'setItem');

  beforeEach(() => {
    Object.getPrototypeOf(localStorage).setItem = jest.fn();
  });

  describe('saveItem', () => {
    it('calls localStorage setItem', () => {
      saveItem('key', 'value');

      expect(localStorage.setItem).toBeCalledWith('key', 'value');
    });
  });

  describe('TODO', () => {
    it('return todo', () => {
      const value = TODO();

      expect(value).toBe('todo');
    });
  });
});
