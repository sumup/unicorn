import React from "react";
import {
  Heading,
  Card,
  SubHeading,
  Text,
  spacing,
  Button,
  IconButton,
} from "@sumup/circuit-ui";
import { css } from "@emotion/core";
import styled from "utils/styled";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from "next-firebase-auth";
import Header from "components/Header";
import getAbsoluteURL from "utils/getAbsoluteURL";
import { Merchant } from "utils/types";
import { Theme } from "@sumup/design-tokens";
import { Facebook, Instagram, Link } from "@sumup/icons";

const Grid = styled.ul(
  ({ theme }) => css`
    margin: ${theme.spacings.giga} 0;
    padding-left: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    grid-gap: 1rem;
  `
);

const Wrapper = styled.div(
  ({ theme }) => css`
    max-width: 1042px;
    margin: ${theme.spacings.tera} auto;
    padding: ${theme.spacings.giga};
  `
);

const StyledCard = styled(Card)`
  padding: 0;
  overflow: hidden;
`;

const Index = ({ merchants }: { merchants: Merchant[] }) => {
  const AuthUser = useAuthUser();
  return (
    <>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <Wrapper>
        <Heading noMargin as="h1" size="giga" css={spacing({ bottom: "kilo" })}>
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
          {merchants.map((merchant) => (
            <StyledCard as="li" key={merchant.name}>
              <img
                src={merchant.imageUrl}
                alt=""
                css={css`
                  max-height: 200px;
                  object-fit: cover;
                `}
              />
              <div css={spacing("kilo")}>
                <Heading
                  as="h3"
                  size="mega"
                  noMargin
                  css={spacing({ bottom: "kilo" })}
                >
                  {merchant.name}
                </Heading>
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
                    label="Clap"
                    css={(theme: Theme) => css`
                      padding: ${theme.spacings.byte};
                    `}
                  >
                    <span
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
                      <Link
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
    </>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req }) => {
  const token = await AuthUser.getIdToken();
  const endpoint = getAbsoluteURL("/api/merchants", req);
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: token || "unauthenticated",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      `Data fetching failed with status ${response.status}: ${JSON.stringify(
        data
      )}`
    );
  }
  return {
    props: {
      merchants: Object.values(data.data),
    },
  };
});

export default withAuthUser<{ merchants: Merchant[] }>({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Index);
