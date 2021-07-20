import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { StoreFilled } from '@sumup/icons';
import { RainbowButton } from '../src/components/RainbowButton';

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
		margin: 0;
		padding: 0;
		border: none;
	`
);

const RecommendButton = styled(RainbowButton)(
	({ theme }) => css`
		${theme.mq.untilMega} {
			display: none;
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
					<RecommendButton type='button'>
						<span>
							<Link href='/recommend'>
								<>
									<StoreFilled />
									<a>&nbsp; Recommend a business</a>
								</>
							</Link>
						</span>
					</RecommendButton>
					&nbsp;
					<Image src='/avatar.svg' alt='avatar' width='50' height='50' />
				</>
			) : (
				<>
					<p>You are not signed in.</p>
					<Link href='/auth'>
						<a>
							<RainbowButton type='button'>Sign in</RainbowButton>
						</a>
					</Link>
				</>
			)}
		</HeaderContainer>
		<Rainbow />
	</>
);

export default Header;
