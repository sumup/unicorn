import React, { useEffect, useState } from 'react';
import Confetti from 'react-canvas-confetti';
import { Heading, spacing, TextArea } from '@sumup/circuit-ui';
import { css } from '@emotion/core';
import {
  withAuthUser,
  AuthAction,
  withAuthUserTokenSSR,
  useAuthUser,
} from 'next-firebase-auth';
import { ArrowLeft, PaperPlane } from '@sumup/icons';
import Link from 'next/link';
import { CardIconSvg } from 'src/pages/business/svg-icons';
import { ExternalLinks } from 'src/components/ExternalLinks';
import { Clap, Merchant } from 'utils/types';
import getAbsoluteURL from 'utils/getAbsoluteURL';
import { Theme } from '@sumup/design-tokens';
import { groupBy, orderBy } from 'lodash';
import { PurpleButton } from 'src/components/PurpleButton';

import { CommentRow } from '../../src/pages/business/comment';
import {
  Wrapper,
  StyledCard,
  BackButton,
  ClapButton,
  StyledDd,
  StyledDt,
  StyledImage,
  StyledSubheading,
} from '../../src/pages/business/business-page.styles';
import { firebase } from '../../src/lib/firebase';
import 'firebase/database';

const BusinessPage = ({ merchant, id }: { merchant: Merchant; id: string }) => {
  const [claps, setClaps] = useState<{ [key: string]: Clap[] }>({});
  const [isFiring, setFiring] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(
    orderBy(Object.values(merchant.comments || {}), 'dateAdded', 'desc'),
  );

  const AuthUser = useAuthUser();

  const handleFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!comment.trim().length) {
      return;
    }

    const commentId = new Date().getTime();

    await firebase
      .database()
      .ref(`merchants/${id}/comments/${commentId}`)
      .set({
        id: commentId.toString(),
        comment,
        dateAdded: commentId,
        user: {
          id: AuthUser.id,
          displayName: AuthUser.displayName,
          photoUrl: AuthUser.photoURL,
        },
      });

    setComment('');
  };

  useEffect(() => {
    const commentsRef = firebase.database().ref(`merchants/${id}/comments`);

    commentsRef.on('value', (snapshot) => {
      const data: any[] = Object.values(snapshot.val() || {});
      setComments(orderBy(data, 'dateAdded', 'desc'));
    });

    return () => commentsRef.off('value');
  }, []);

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
      <div
        css={css`
          width: 100%;
        `}
      >
        <Heading size="tera">Photos</Heading>
        <StyledImage src={merchant.imageUrl || ''} alt={merchant.name} />
        <Heading css={{ marginTop: 48 }} size="tera">
          Comments
        </Heading>
        <form
          onSubmit={handleFormSubmit}
          css={css`
            position: relative;
            margin-bottom: 24px;
          `}
        >
          <TextArea
            css={css`
              height: 72px;
              padding-right: 135px;
              margin: 0;
            `}
            placeholder="Write something about the business"
            value={comment}
            onChange={(e) => {
              setComment(e.currentTarget.value);
            }}
          />

          <PurpleButton
            css={css`
              position: absolute;
              right: 12px;
              top: 50%;
              transform: translateY(-50%);
            `}
            type="submit"
            icon={PaperPlane}
            loadingLabel="Loading..."
          >
            Send
          </PurpleButton>
        </form>
        {/* COMMENTS LIST */}
        <div>
          {comments.map((item) => (
            <CommentRow key={item.id} comment={item} />
            // <div key={item.id}>{item.comment}</div>
          ))}
        </div>
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
