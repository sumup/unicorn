import React from 'react';
import Link from 'next/link';
import { withAuthUser, useAuthUser } from 'next-firebase-auth';
import styled from 'utils/styled';
import { css } from '@emotion/core';
import { Plus } from '@sumup/icons';
import { Avatar } from '@sumup/circuit-ui';
import { RainbowButton } from 'src/components/RainbowButton';

const HeaderContainer = styled.div(
  ({ theme }) => css`
    height: 80px; // hardcoding height to remove loading layout shift
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: ${theme.spacings.mega};
  `,
);

const UnicornStyle = styled.a(
  ({ theme }) => css`
    text-decoration: none;
    color: #a22bda;
    font-weight: ${theme.fontWeight.bold};
    font-size: ${theme.typography.headline.one.fontSize};
    margin-left: 0;
    margin-right: auto;
  `,
);

const RainbowSeparator = styled.hr(
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
    margin: 0 0 ${theme.spacings.exa};
    padding: 0;
    border: none;
  `,
);

const RecommendButton = styled(RainbowButton)(
  ({ theme }) => css`
    margin-right: ${theme.spacings.mega};
    ${theme.mq.untilMega} {
      display: none;
    }
  `,
);

const Header = () => {
  const { email, photoURL, clientInitialized } = useAuthUser();
  return (
    <>
      <HeaderContainer>
        <Link href="/" passHref>
          <UnicornStyle>
            <span role="img" aria-label="Unicorn">
              🦄
            </span>{' '}
            Unicorn
          </UnicornStyle>
        </Link>
        {clientInitialized && (
          <>
            {email ? (
              <>
                <Link href="/recommend" passHref>
                  <RecommendButton
                    icon={(props) => <Plus size="small" {...props} />}
                  >
                    Recommend a business
                  </RecommendButton>
                </Link>
                <Avatar
                  src={photoURL || '/avatar.svg'}
                  variant="identity"
                  size="giga"
                  alt=""
                  // @ts-expect-error TODO the Avatar should be an img
                  referrerPolicy="no-referrer"
                />
              </>
            ) : (
              <Link href="/auth" passHref>
                <RainbowButton>Sign in</RainbowButton>
              </Link>
            )}
          </>
        )}
      </HeaderContainer>
      <RainbowSeparator />
    </>
  );
};

export default withAuthUser()(Header);
