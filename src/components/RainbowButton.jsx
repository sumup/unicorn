import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Button, ButtonProps } from '@sumup/circuit-ui';

const StyledButton = styled(Button)(
	() => css`
		background-image: linear-gradient(
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
		cursor: pointer;
		border: none;
		position: relative;
		padding: 1px;
		display: inline-block;
		border-radius: 100px;
		font-size: 16px;
		line-height: 24px;
		span {
			display: flex;
			align-items: center;
			background: #fff;
			padding: 12px 24px;
			border-radius: 95px;
		}
	`
);

/**
 *
 * @param {ButtonProps} props
 */
export const RainbowButton = (props) => {
	return <StyledButton {...props} />;
};
