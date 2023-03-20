import {
  get,
  updateSlide,
  makeSelectedNumber,
  changeAlbumPosition,
  setColorById,
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

  context(
    'when click the previous button to go to the replicated slide',
    () => {
      it('moves to the last picture on the main slide', () => {
        const number = makeSelectedNumber({
          length: 4,
          slideNumber: 4,
        });

        expect(number).toBe(4);
      });
    },
  );
});

describe('changeAlbumPosition', () => {
  context('when the slide image being moved is in the album', () => {
    it("doesn't move the album slide", () => {
      const location = changeAlbumPosition({
        ALBUM_IMAGE_INDEX: 4,
        MAIN_SLIDE_LENGTH: 6,
        CLIENT_SLIDE_WIDTH: 940,
      });

      expect(location).toBe('translateX(-0vw)');
    });
  });

  context('when the slide image being moved is not in the album', () => {
    it('moves the album slide', () => {
      const location = changeAlbumPosition({
        ALBUM_IMAGE_INDEX: 5,
        MAIN_SLIDE_LENGTH: 6,
        CLIENT_SLIDE_WIDTH: 940,
      });

      expect(location).toBe('translateX(-235px)');
    });
  });

  context('when the slide moves to the left and reaches the last slide', () => {
    it('moves the last image of the album to be visible', () => {
      const location = changeAlbumPosition({
        ALBUM_IMAGE_INDEX: 0,
        MAIN_SLIDE_LENGTH: 6,
        CLIENT_SLIDE_WIDTH: 940,
      });

      expect(location).toBe('translateX(-470px)');
    });
  });
});

describe('setColorById', () => {
  const id = 1;

  const color = setColorById(id);

  expect(color).toBe('#7928ca');
});
