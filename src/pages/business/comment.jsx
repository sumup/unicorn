import { Avatar, Heading } from '@sumup/circuit-ui';
import { css } from '@emotion/core';

export const CommentRow = ({ comment }) => (
  <div
    css={css`
      margin-bottom: 24px;
    `}
  >
    <div
      css={css`
        display: flex;
        align-items: center;
      `}
    >
      <Avatar
        css={css`
          margin-right: 12px;
          width: 32px;
          height: 32px;
        `}
        src={comment.user.photoUrl}
        variant="identity"
        size="giga"
      />
      <Heading noMargin size="mega">
        {comment.user.displayName}
      </Heading>
    </div>
    <div
      css={css`
        margin-top: 4px;
      `}
    >
      {comment.comment}
    </div>
  </div>
);
