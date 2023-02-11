import {
  get,
  updateSlide,
  makeSelectedNumber,
} from './utils';

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

describe('makeSelectedNumber', () => {
  context('when click the next button to go to the replicated slide', () => {
    it('moves to the first picture on the main slide', () => {
      const number = makeSelectedNumber({
        length: 4,
        slideNumber: 9,
      });

      expect(number).toBe(1);
    });
  });

  context('when click the previous button to go to the replicated slide', () => {
    it('moves to the last picture on the main slide', () => {
      const number = makeSelectedNumber({
        length: 4,
        slideNumber: 4,
      });

      expect(number).toBe(4);
    });
  });
});
