import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { LoadingButton, LoadingButtonProps } from "@sumup/circuit-ui";

const StyledLoadingButton = styled(LoadingButton)(
  () => css`
    background-color: #a22bda;
    border-color: #a22bda;
    color: #fff;
    padding-top: 11px;
    padding-bottom: 11px;
    &:hover,
    &:focus,
    &:active {
      background-color: #a22bda;
      border-color: #a22bda;
      color: #fff;
    }
  `
);

/**
 *
 * @param {LoadingButtonProps} props
 */
export const PurpleButton = (props) => {
  return <StyledLoadingButton {...props}></StyledLoadingButton>;
};
