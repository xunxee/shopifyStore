export function get({ page, key }) {
  return (obj) => obj[page][key];
}

export function updateSlide({ targetName, isMotion }) {
  if (targetName === 'previousArrow') {
    return ({ number }) => ({
      number: number - 1,
      isMotion,
    });
  }

  return ({ number }) => ({
    number: number + 1,
    isMotion,
  });
}

export function makeSelectedNumber({ length, slideNumber }) {
  const initialNumber = slideNumber - length;

  if (initialNumber === 0) return length;

  if (initialNumber === length + 1) return 1;

  return initialNumber;
}

export function changeAlbumPosition(
  {
    ALBUM_IMAGE_INDEX,
    MAIN_SLIDE_LENGTH,
    CLIENT_SLIDE_WIDTH,
  },
) {
  const SLIDE_ITEM_WIDTH = 235;

  if (ALBUM_IMAGE_INDEX === 1
      || ALBUM_IMAGE_INDEX === MAIN_SLIDE_LENGTH + 1
  ) {
    return `translateX(-${0}vw)`;
  }

  if (ALBUM_IMAGE_INDEX * SLIDE_ITEM_WIDTH
      >= CLIENT_SLIDE_WIDTH + SLIDE_ITEM_WIDTH
  ) {
    return `translateX(-${(ALBUM_IMAGE_INDEX * SLIDE_ITEM_WIDTH) - CLIENT_SLIDE_WIDTH}px)`;
  }

  if (ALBUM_IMAGE_INDEX === 0) {
    return `translateX(-${(MAIN_SLIDE_LENGTH * SLIDE_ITEM_WIDTH) - CLIENT_SLIDE_WIDTH}px)`;
  }

  return `translateX(-${0}vw)`;
}
