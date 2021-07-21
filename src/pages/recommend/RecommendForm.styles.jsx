import styled from "@emotion/styled";
import { css } from "@emotion/core";

export const Container = styled.div(
  () => css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  `
);

export const MerchantDetailsWrapper = styled.div(
  ({ theme }) => css`
    width: 320px;
    max-width: 100%;
    ${theme.mq.untilMega} {
      width: 100%;
    }
  `
);

export const ImagesWrapper = styled.div(
  ({ theme }) => css`
    width: 320px;
    max-width: 100%;
    ${theme.mq.untilMega} {
      width: 100%;
    }
  `
);

export const Form = styled.form(
  ({ theme }) => css`
    display: flex;
    flex-direction: row;
    ${theme.mq.untilMega} {
      flex-direction: column;
    }
  `
);
