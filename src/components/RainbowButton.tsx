import styled from 'utils/styled';
import { css } from '@emotion/core';
import { Button } from '@sumup/circuit-ui';

export const RainbowButton = styled(Button)(
  ({ theme }) => css`
    position: relative;
    border: none;
    border-radius: ${theme.borderRadius.pill};
    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      margin: -${theme.borderWidth.mega};
      border-radius: inherit;
      background: linear-gradient(
        90deg,
        #f9ad9d 0%,
        #f6ba84 8.12%,
        #f8c863 14.11%,
        #f3e175 21.05%,
        #e9e68a 28.4%,
        #cfe6b0 35.75%,
        #a1e09a 43.97%,
        #72dad3 60.41%,
        #69c4ea 67.14%,
        #5bbdec 76.61%,
        #8261d4 87.87%,
        #e457a9 99.78%
      );
    }
  `,
);
