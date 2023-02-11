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

export function makeSelectedNumber({
  length,
  slideNumber,
}) {
  const initialNumber = slideNumber - length;

  if (initialNumber === 0) return length;

  if (initialNumber === length + 1) return 1;

  return initialNumber;
}
