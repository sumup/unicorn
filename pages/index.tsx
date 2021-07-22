import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { groupBy } from 'lodash';
import {
  Heading,
  Card,
  SubHeading,
  Text,
  spacing,
  Button,
  Anchor,
} from '@sumup/circuit-ui';
import { css } from '@emotion/core';
import Confetti from 'react-canvas-confetti';
import {
  useAuthUser,
  withAuthUser,
  AuthAction,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { Theme } from '@sumup/design-tokens';
import getAbsoluteURL from 'utils/getAbsoluteURL';
import { Merchant, Clap } from 'utils/types';
import styled from 'utils/styled';

import { ExternalLinks } from '../src/components/ExternalLinks';

const Grid = styled.ul(
  ({ theme }) => css`
    margin: ${theme.spacings.giga} 0;
    padding-left: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    grid-gap: 1rem;
  `,
);

const Wrapper = styled.div(
  ({ theme }) => css`
    max-width: 1042px;
    margin: auto;
    padding: 0 ${theme.spacings.giga};
  `,
);

const StyledCard = styled(Card)`
  padding: 0;
  overflow: hidden;
`;

const ClapButton = styled(Button)(
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

type IndexProps = { merchants: { [key: string]: Merchant } };

const Index = ({ merchants }: IndexProps) => {
  const [claps, setClaps] = useState<{ [key: string]: Clap[] }>({});
  const [isFiring, setFiring] = useState<boolean>(false);
  const AuthUser = useAuthUser();
  const getClaps = async () => {
    const token = await AuthUser.getIdToken();
    const res = await fetch('/api/clap', {
      method: 'GET',
      headers: { Authorization: token || '' },
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data }: { data: { [key: string]: Clap } } = await res.json();
    const clapsByMerchant: { [key: string]: Clap[] } = groupBy(
      Object.values(data),
      'merchantId',
    );
    setClaps(clapsByMerchant);
  };

  useEffect(() => {
    getClaps().catch((e) => console.error(e));
  }, []);

  // useEffect(() => {
  //   if (isFiring === true) {
  //     getClaps().then((data) => {
  //       const clapsByMerchant = groupBy(Object.values(data), 'merchantId');
  //       setClaps(clapsByMerchant);
  //     });
  //   }
  // }, [isFiring]);

  return (
    <Wrapper>
      <Heading noMargin as="h1" size="giga" css={spacing({ bottom: 'kilo' })}>
        {AuthUser.displayName}, welcome to the SumUp Unicorn universe
      </Heading>
      <SubHeading
        noMargin
        size="mega"
        css={(theme: Theme) =>
          css`
            color: ${theme.colors.n500};
          `
        }
      >
        Explore, add, share, and visit your favorite merchants
      </SubHeading>
      <Grid>
        {Object.entries(merchants).map(([id, merchant]) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const numberOfClaps = claps[id]?.length;
          const hasClapped = !!claps[id]?.find(
            (clap) => clap.userId === AuthUser.id,
          );
          return (
            <StyledCard as="li" key={id}>
              <img
                src={merchant.imageUrl}
                alt=""
                css={css`
                  max-height: 200px;
                  object-fit: cover;
                `}
              />
              <div css={spacing('kilo')}>
                <Link href={`/business/${id}`} passHref>
                  <Anchor
                    css={css`
                      text-decoration: none;
                    `}
                  >
                    <Heading
                      size="mega"
                      noMargin
                      css={spacing({ bottom: 'kilo' })}
                    >
                      {merchant.name}
                    </Heading>
                  </Anchor>
                </Link>
                <Text
                  noMargin
                  css={(theme: Theme) =>
                    css`
                      color: ${theme.colors.n500};
                      margin-bottom: ${theme.spacings.kilo};
                    `
                  }
                >
                  {merchant.description}
                </Text>
                <div
                  css={(theme: Theme) => css`
                    display: flex;
                    gap: ${theme.spacings.byte};
                    justify-content: space-between;
                  `}
                >
                  <ClapButton
                    hasClapped={hasClapped}
                    disabled={hasClapped}
                    onClick={async () => {
                      setFiring(true);
                      const token = await AuthUser.getIdToken();
                      await fetch(`/api/clap/${id}`, {
                        headers: { Authorization: token || 'unauthorized' },
                        method: 'POST',
                      });
                      return getClaps();
                    }}
                  >
                    <span
                      role="img"
                      aria-label="Clap"
                      css={(theme: Theme) => css`
                        display: block;
                        height: ${theme.iconSizes.mega};
                        width: ${theme.iconSizes.mega};
                      `}
                    >
                      👏
                    </span>
                  </ClapButton>
                  {numberOfClaps}

                  <ExternalLinks
                    facebook={merchant.links?.facebook}
                    instagram={merchant.links?.instagram}
                    phone={merchant?.phone}
                    website={merchant.links?.website}
                  />
                </div>
              </div>
            </StyledCard>
          );
        })}
        <Confetti
          css={css`
            position: fixed;
            width: 100vw;
            height: 100vh;
            top: 0;
            left: 0;
            pointer-events: none;
          `}
          fire={isFiring}
          onDecay={() => setFiring(false)}
          particleCount={300}
          angle={90}
          startVelocity={60}
          spread={150}
        />
      </Grid>
    </Wrapper>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req }) => {
  const token = await AuthUser.getIdToken();
  const endpoint = getAbsoluteURL('/api/merchants', req);
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Authorization: token || 'unauthenticated',
    },
  });
  if (!response.ok) {
    throw new Error(`Data fetching failed with status ${response.status}`);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: merchants }: { data: IndexProps } = await response.json();
  return {
    props: {
      merchants,
    },
  };
});

export default withAuthUser<IndexProps>({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Index);
