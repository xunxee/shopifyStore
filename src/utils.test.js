import { get, updateSlide } from './utils';

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

describe('updateSlide', () => {
  const slide = {
    number: 3,
    isMotion: false,
  };

  context("when targetName is 'previousArrow'", () => {
    it('decreases the slide number', () => {
      const a = updateSlide({
        targetName: 'previousArrow',
        isMotion: true,
      });

      expect(a(slide)).toEqual({
        number: 2,
        isMotion: true,
      });
    });
  });

  context("when targetName is 'nextArrow'", () => {
    it('increases the slide number', () => {
      const b = updateSlide({
        targetName: 'nextArrow',
        isMotion: true,
      });

      expect(b(slide)).toEqual({
        number: 4,
        isMotion: true,
      });
    });
  });
});
