import React from 'react';
import Link from 'next/link';
import {
  Heading,
  Card,
  SubHeading,
  Text,
  spacing,
  Button,
  IconButton,
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
import { Facebook, Instagram, Link as LinkIcon } from '@sumup/icons';
import getAbsoluteURL from 'utils/getAbsoluteURL';
import { Merchant } from 'utils/types';
import styled from 'utils/styled';

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
                {merchant.links?.website && (
                  <IconButton
                    size="kilo"
                    label="Website"
                    href={merchant.links.website}
                  >
                    <LinkIcon
                      css={(theme: Theme) => css`
                        margin: 0 ${theme.spacings.bit}; // the Link icon only comes in 16px so we adapt its padding
                      `}
                    />
                  </IconButton>
                )}
                {merchant.links?.instagram && (
                  <IconButton
                    size="kilo"
                    label="Instagram"
                    href={merchant.links.instagram}
                  >
                    <Instagram />
                  </IconButton>
                )}
                {merchant.links?.facebook && (
                  <IconButton
                    size="kilo"
                    label="Facebook"
                    href={merchant.links.facebook}
                  >
                    <Facebook />
                  </IconButton>
                )}
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
