const validFields = {
  email: {
    regexps:
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
    invalidMessage: 'Email은 숫자나 문자로 시작하고 @를 포함해야합니다.',
  },
  password: {
    regexps: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/,
    invalidMessage:
      'Password는 숫자, 알파벳 소문자, 알파벳 대문자, 특수문자(!, @, #)을 포함한 8자리 이상의 문자여야합니다.',
  },
};

export default validFields;
