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
