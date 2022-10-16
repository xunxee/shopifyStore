import { css } from '@emotion/react';

import emotionReset from 'emotion-reset';

console.log(css);

export default css`
    ${emotionReset}

    *, *::after, *::before {
      box-sizing: border-box;
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
    }
`;
