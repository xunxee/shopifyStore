export function get({ page, key }) {
  return (obj) => obj[page][key];
}

export function updateSlide({ targetName, isMotion }) {
  if (targetName === "previousArrow") {
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

export function setAlbumPosition({ index, length }) {
  const DISTANCE = 65 / 4;

  if (index === length + 1 || index === 1) {
    return `translateX(-${0}vw)`;
  }

  if (index === 0) {
    return `translateX(-${(length - 4) * DISTANCE}vw)`;
  }

  if (index >= 4) {
    return `translateX(-${(index - 3) * DISTANCE}vw)`;
  }

  return `translateX(-${0}vw)`;
}
