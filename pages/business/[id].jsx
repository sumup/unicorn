import React from 'react';
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
} from 'next-firebase-auth';
import { ArrowLeft } from '@sumup/icons';
import Link from 'next/link';

import { CardIconSvg } from '../../src/pages/business/svg-icons';
import styled from '../../utils/styled';
import { firebase } from '../../src/lib/firebase';
import 'firebase/database';
import { ExternalLinks } from '../../src/components/ExternalLinks';

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

const BusinessPage = ({ merchant }) => (
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
        <div>
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
      <StyledImage src={merchant.imageUrl} atl={merchant.name} />
      <Heading css={{ marginTop: 48 }} size="tera">
        Comments
      </Heading>
    </div>
  </Wrapper>
);

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ query }) => {
  const dbRef = firebase.app().database().ref();
  const snapshot = await dbRef.child('merchants').child(query.id).get();
  if (!snapshot.exists()) {
    return {
      notFound: true,
    };
  }

  return {
    props: { merchant: snapshot.val() },
  };
});

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(BusinessPage);
