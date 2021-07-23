import React, { useEffect, useState } from 'react';
import Confetti from 'react-canvas-confetti';
import {
  Card,
  Heading,
  SubHeading,
  spacing,
  Button,
  Image,
} from '@sumup/circuit-ui';
import { css } from '@emotion/core';
import {
  withAuthUser,
  AuthAction,
  withAuthUserTokenSSR,
  useAuthUser,
} from 'next-firebase-auth';
import { ArrowLeft } from '@sumup/icons';
import Link from 'next/link';
import { CardIconSvg } from 'src/pages/business/svg-icons';
import styled from 'utils/styled';
import { ExternalLinks } from 'src/components/ExternalLinks';
import { Clap, Merchant } from 'utils/types';
import getAbsoluteURL from 'utils/getAbsoluteURL';
import { Theme } from '@sumup/design-tokens';
import { groupBy } from 'lodash';

const Wrapper = styled.div(
  () => css`
    max-width: 1170px;
    margin: 0 auto;
    display: flex;
    position: relative;
    padding-top: 46px;
  `,
);

const StyledCard = styled(Card)(
  () => css`
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    max-width: 100%;
    width: 375px;
    overflow: hidden;
    margin-right: 32px;
  `,
);

const StyledSubheading = styled(SubHeading)(
  () => css`
    text-transform: none;
    font-size: 20px;
    line-height: 24px;
    color: #666666;
    font-weight: normal;
    margin-bottom: 24px;
  `,
);

const StyledDt = styled.dt`
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #666666;
`;

const StyledDd = styled.dd`
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #333333;
  margin-bottom: 16px;
`;

const BackButton = styled(Button)`
  border-radius: 0;
  border: none;
  top: -10px;
  position: absolute;
`;

const StyledImage = styled(Image)`
  border-radius: 8px;
  width: 248px;
  height: 148px;
  object-fit: cover;
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

const BusinessPage = ({ merchant, id }: { merchant: Merchant; id: string }) => {
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

  const numberOfClaps = claps[id]?.length;
  const hasClapped = !!claps[id]?.find((clap) => clap.userId === AuthUser.id);

  return (
    <Wrapper>
      <div>
        <Link href="/">
          <a css={{ textDecoration: 'none' }}>
            <BackButton icon={ArrowLeft}>Back</BackButton>
          </a>
        </Link>
        <StyledCard>
          <CardIconSvg />

          <Heading
            size="tera"
            noMargin
            css={spacing({ top: 'giga', bottom: 'bit' })}
          >
            {merchant.name}
          </Heading>
          <StyledSubheading>{merchant.description}</StyledSubheading>
          <dl>
            <StyledDt>Location</StyledDt>
            <StyledDd>{merchant.address.place_name}</StyledDd>
            <StyledDt>Merchant category</StyledDt>
            <StyledDd>{merchant.category}</StyledDd>
          </dl>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
            `}
          >
            <div>
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
              {!!numberOfClaps && (
                <span
                  css={css`
                    margin-left: 8px;
                  `}
                >
                  {numberOfClaps}
                </span>
              )}
            </div>
            <ExternalLinks
              facebook={merchant.links?.facebook}
              instagram={merchant.links?.instagram}
              phone={merchant?.phone}
              website={merchant.links?.website}
            />
          </div>
        </StyledCard>
      </div>
      <div>
        <Heading size="tera">Photos</Heading>
        <StyledImage src={merchant.imageUrl || ''} alt={merchant.name} />
        <Heading css={{ marginTop: 48 }} size="tera">
          Comments
        </Heading>
      </div>
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
    </Wrapper>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ query, AuthUser, req }) => {
  const token = await AuthUser.getIdToken();
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const endpoint = getAbsoluteURL(`/api/merchants/${query.id}`, req);
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: { Authorization: token || '' },
  });
  if (!response.ok) {
    throw new Error(`Data fetching failed with status ${response.status}`);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const merchant: Merchant = await response.json();
  return {
    props: { merchant, id: query.id },
  };
});

export default withAuthUser<{ merchant: Merchant; id: string }>({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(BusinessPage);
