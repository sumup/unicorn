import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const HeaderContainer = styled.div(
	({ theme }) => css`
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: ${theme.spacings.mega};
	`
);

const UnicornStyle = styled.div(
	({ theme }) => css`
		color: #a22bda;
		font-weight: ${theme.fontWeight.bold};
		font-size: ${theme.typography.headings.tera.fontSize};
		margin-left: 0;
		margin-right: auto;
	`
);

const Rainbow = styled.hr(
	({ theme }) => css`
		height: ${theme.borderWidth.mega};
		width: 100%;
		background: linear-gradient(
			to right,
			#f9ad9d,
			#f6ba84,
			#f8c863,
			#f3e175,
			#e9e68a,
			#cfe6b0,
			#a1e09a,
			#72dad3,
			#69c4ea,
			#5bbdec,
			#8261d4,
			#e457a9
		);
		margin: 0;
		padding: 0;
		border: none;
	`
);

const Button = styled.button(
	({ theme }) => css`
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
			display: inline-block;
			background: #fff;
			padding: 12px 24px;
			border-radius: 95px;
		}
	`
);

const unicorn = '🦄 Unicorn';

const Header = ({ email, signOut }) => (
	<>
		<HeaderContainer>
			<UnicornStyle>{unicorn}</UnicornStyle>
			{email ? (
				<>
					<p>Signed in as {email}</p>
					<Button
						type='button'
						onClick={() => {
							signOut();
						}}
					>
						<span>Sign out</span>
					</Button>
				</>
			) : (
				<>
					<p>You are not signed in.</p>
					<Link href='/auth'>
						<a>
							<button type='button' style={styles.button}>
								Sign in
							</button>
						</a>
					</Link>
				</>
			)}
		</HeaderContainer>
		<Rainbow />
	</>
);

export default Header;
