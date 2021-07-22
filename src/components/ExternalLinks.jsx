import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Anchor } from '@sumup/circuit-ui';
import { Facebook, Instagram, Link } from '@sumup/icons';

export const PhoneSvgIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M11.3053 11.3052C9.62289 12.9875 7.67468 14.5957 6.90479 13.8256C5.80213 12.7232 5.12234 11.7629 2.69197 13.7162C0.261389 15.6703 2.12821 16.9723 3.19623 18.0407C4.42874 19.273 9.02321 18.1055 13.5646 13.5649C18.1053 9.02321 19.2736 4.42881 18.0402 3.1959C16.972 2.12768 15.67 0.261532 13.7167 2.69228C11.763 5.12197 12.7228 5.80196 13.8257 6.90461C14.5954 7.6747 12.9876 9.62266 11.3053 11.3052Z"
      stroke="#333333"
      strokeWidth="2"
    />
  </svg>
);

const StyledAnchor = styled(Anchor)`
  color: #000;
  line-height: 0 !important;
  padding: 4px;
  margin-left: 8px;
  svg {
    width: 24px;
    height: 24px;
  }
`;

const StyledAnchorForLink = styled(StyledAnchor)`
  svg {
    top: -2px;
    height: 19px;
    width: 19px;
    position: relative;
  }
`;

export const ExternalLinks = ({ website, facebook, instagram, phone }) => (
  <div
    css={(theme) => css`
      display: flex;
      gap: ${theme.spacings.byte};
      justify-content: flex-end;
    `}
  >
    {/* <Button
      css={(theme) => css`
        padding: ${theme.spacings.byte};
      `}
    >
      <span
        role="img"
        aria-label="Clap"
        css={(theme) => css`
          display: block;
          height: ${theme.iconSizes.mega};
          width: ${theme.iconSizes.mega};
        `}
      >
        👏
      </span>
    </Button> */}
    <span>
      {website && (
        <StyledAnchorForLink
          size="kilo"
          label="Website"
          href={website}
          target="_blank"
        >
          <Link />
        </StyledAnchorForLink>
      )}

      {instagram && (
        <StyledAnchor
          size="kilo"
          label="Instagram"
          href={instagram}
          target="_blank"
        >
          <Instagram />
        </StyledAnchor>
      )}
      {facebook && (
        <StyledAnchor
          size="kilo"
          label="Facebook"
          href={facebook}
          target="_blank"
        >
          <Facebook />
        </StyledAnchor>
      )}
      {phone && (
        <StyledAnchor
          size="kilo"
          label="Phone number"
          href={`tel:${phone.replace(/ /g, '')}`}
        >
          <PhoneSvgIcon />
        </StyledAnchor>
      )}
    </span>
  </div>
);
