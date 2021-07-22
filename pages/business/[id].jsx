import React from 'react';
import { Card, Heading, SubHeading, spacing } from '@sumup/circuit-ui';
import { css } from '@emotion/core';
import {
  withAuthUser,
  AuthAction,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';

import { CardIconSvg } from '../../src/pages/business/svg-icons';
import styled from '../../utils/styled';
import { firebase } from '../../src/lib/firebase';
import 'firebase/database';
import { ExternalLinks } from '../../src/components/ExternalLinks';

const Wrapper = styled.div(
  () => css`
    max-width: 1170px;
    margin: 24px auto 0;
    display: flex;
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

const BusinessPage = ({ merchant }) => (
  <Wrapper>
    <div>
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
    <div>content hello world</div>
  </Wrapper>
);

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ query }) => {
  const dbRef = firebase.database().ref();
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
