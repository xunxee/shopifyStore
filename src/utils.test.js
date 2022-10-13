import { get } from './utils';

test('get', () => {
  const state = {
    person: {
      name: 'gunhee',
    },
  };

  const a = get({ page: 'person', key: 'name' });
  const b = get({ page: 'person', key: 'age' });

  expect(a(state)).toBe('gunhee');
  expect(b(state)).toBeUndefined();
});
