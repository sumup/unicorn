import { Card, SubHeading, Button, Image } from '@sumup/circuit-ui';
import { css } from '@emotion/core';
import { Theme } from '@sumup/design-tokens';

import styled from '../../../utils/styled';

export const Wrapper = styled.div(
  () => css`
    max-width: 1170px;
    margin: 0 auto;
    display: flex;
    position: relative;
    padding-top: 46px;
  `,
);

export const StyledCard = styled(Card)(
  () => css`
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    max-width: 100%;
    width: 375px;
    overflow: hidden;
    margin-right: 32px;
  `,
);

export const StyledSubheading = styled(SubHeading)(
  () => css`
    text-transform: none;
    font-size: 20px;
    line-height: 24px;
    color: #666666;
    font-weight: normal;
    margin-bottom: 24px;
  `,
);

export const StyledDt = styled.dt`
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #666666;
`;

export const StyledDd = styled.dd`
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #333333;
  margin-bottom: 16px;
`;

export const BackButton = styled(Button)`
  border-radius: 0;
  border: none;
  top: -10px;
  position: absolute;
`;

export const StyledImage = styled(Image)`
  border-radius: 8px;
  width: 248px;
  height: 148px;
  object-fit: cover;
`;

export const ClapButton = styled(Button)(
  ({ theme, hasClapped }: { theme: Theme; hasClapped?: boolean }) => css`
    padding: ${theme.spacings.byte};
    ${hasClapped &&
    css`
      border-width: ${theme.borderWidth.mega};
      border-color: ${theme.colors.warning};
      opacity: 1 !important;
    `}
  `,
);
