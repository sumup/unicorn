import { useCallback } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { Input, Select, Heading } from "@sumup/circuit-ui";
import { StoreFilled } from "@sumup/icons";
import { PurpleButton } from "../../components/PurpleButton";
import { GeocoderInput } from "../../components/GeoCodeInput/GeocodeInput";
import { ImageUploader } from "../../components/ImageUploader";
import { businessOptions } from "./business-options";

const Container = styled.div(
  () => css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  `
);

const MerchantDetailsWrapper = styled.div(
  ({ theme }) => css`
    width: 320px;
    max-width: 100%;
    ${theme.mq.untilMega} {
      width: 100%;
    }
  `
);

const ImagesWrapper = styled.div(
  ({ theme }) => css`
    width: 320px;
    max-width: 100%;
    ${theme.mq.untilMega} {
      width: 100%;
    }
  `
);

const Form = styled.form(
  ({ theme }) => css`
    display: flex;
    flex-direction: row;
    ${theme.mq.untilMega} {
      flex-direction: column;
    }
  `
);

export const RecommendForm = () => {
  const onSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <Container>
      <Heading size="tera">Add SumUp Merchant</Heading>
      <Form onSubmit={onSubmit}>
        <ImagesWrapper>
          <ImageUploader />
        </ImagesWrapper>
        <MerchantDetailsWrapper>
          <Input
            label="Merchant name"
            name="merchantName"
            placeholder="Brand name"
          />
          <Select label="Type of business" options={businessOptions} />

          <Input
            label="Short description"
            name="description"
            placeholder="Pizza/cocktail bar"
          />
          <GeocoderInput
            country="DE"
            label="Merchant address"
            placeholder="Type to search"
          />
          <Input
            label="Enter the address"
            name="merchantAddress"
            placeholder="Enter merchant address"
          />
          <Input
            label="Phone number for reservations"
            name="phoneNumber"
            placeholder="+49 234 1210 78 44"
          />

          <Input
            label="Website"
            name="merchantWebsite"
            placeholder="https://"
          />

          <Input
            label="Instagram"
            name="merchantInstagram"
            placeholder="https://"
          />

          <Input
            label="Facebook"
            name="merchantFacebook"
            placeholder="https://"
          />

          <PurpleButton
            icon={StoreFilled}
            type="button"
            css={{ width: "100%" }}
          >
            Save Merchant
          </PurpleButton>
        </MerchantDetailsWrapper>
      </Form>
    </Container>
  );
};
