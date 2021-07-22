import React from 'react';
import Link from 'next/link';
import {
  Headline,
  Card,
  SubHeadline,
  Body,
  spacing,
  Button,
  Anchor,
} from '@sumup/circuit-ui';
import { css } from '@emotion/core';
import {
  useAuthUser,
  withAuthUser,
  AuthAction,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { Theme } from '@sumup/design-tokens';
import getAbsoluteURL from 'utils/getAbsoluteURL';
import { Merchant } from 'utils/types';
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

type IndexProps = { merchants: { [key: number]: Merchant } };

const Index = ({ merchants }: IndexProps) => {
  const AuthUser = useAuthUser();
  return (
    <Wrapper>
      <Headline noMargin as="h1" size="three" css={spacing({ bottom: 'kilo' })}>
        {AuthUser.displayName}, welcome to the SumUp Unicorn universe
      </Headline>
      <SubHeadline
        as="h2"
        noMargin
        css={(theme: Theme) =>
          css`
            color: ${theme.colors.n500};
          `
        }
      >
        Explore, add, share, and visit your favorite merchants
      </SubHeadline>
      <Grid>
        {Object.entries(merchants).map(([id, merchant]) => (
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
                  <Headline
                    as="h3"
                    size="four"
                    noMargin
                    css={spacing({ bottom: 'kilo' })}
                  >
                    {merchant.name}
                  </Headline>
                </Anchor>
              </Link>
              <Body
                noMargin
                css={(theme: Theme) =>
                  css`
                    color: ${theme.colors.n500};
                    margin-bottom: ${theme.spacings.kilo};
                  `
                }
              >
                {merchant.description}
              </Body>
              <div
                css={(theme: Theme) => css`
                  display: flex;
                  gap: ${theme.spacings.byte};
                  justify-content: space-between;
                `}
              >
                <Button
                  css={(theme: Theme) => css`
                    padding: ${theme.spacings.byte};
                  `}
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
                </Button>
                <ExternalLinks
                  facebook={merchant.links?.facebook}
                  instagram={merchant.links?.instagram}
                  phone={merchant?.phone}
                  website={merchant.links?.website}
                />
              </div>
            </div>
          </StyledCard>
        ))}
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
