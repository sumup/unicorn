import styled from "@emotion/styled";
import { css } from "@emotion/core";
import {
  Input,
  Select,
  TextArea,
  LoadingButton,
  Heading,
} from "@sumup/circuit-ui";
import { StoreFilled } from "@sumup/icons";
import { useCallback } from "react";

const businessOptions = [
  { value: "5921", label: "Alcohol store" },
  { value: "5691", label: "Apparel" },
  { value: "5971", label: "Art Dealers and Galleries" },
  { value: "5912", label: "Drugstores, Chemists, Pharmacies" },
  { value: "5411", label: "Food / Grocery" },
  { value: "5994", label: "Newsstand / Magazines" },
  { value: "5999", label: "Other Retail" },
  { value: "5399", label: "Outdoor Market" },
  { value: "5993", label: "Tobacco and eCigarettes" },
  { value: "7210", label: "Cleaning Services" },
  { value: "7392", label: "Consulting" },
  { value: "1520", label: "Craftsman / Contractor" },
  { value: "8299", label: "Education" },
  { value: "6513", label: "Letting agents" },
  { value: "4214", label: "Motor Freight Carriers and Trucking" },
  { value: "8999", label: "Professional Services" },
  { value: "4121", label: "Taxi / Limo" },
  { value: "7230", label: "Beauty / Barber" },
  { value: "8021", label: "Dentistry" },
  { value: "7298", label: "Fitness / Wellness / Spa" },
  { value: "8011", label: "Medical Practitioner" },
  { value: "8099", label: "Medical Services" },
  { value: "0742", label: "Veterinary" },
  { value: "7922", label: "Music / Concerts / Cinema" },
  { value: "7999", label: "Recreation / Entertainment" },
  { value: "7991", label: "Tourism" },
  { value: "5813", label: "Bar / Club" },
  { value: "5812", label: "Café / Restaurant" },
  { value: "5811", label: "Catering / Delivery" },
  { value: "5814", label: "Fast Food Restaurant" },
  { value: "5499", label: "Food Truck / Cart" },
  { value: "7011", label: "Hotel / Accommodation" },
  { value: "8398", label: "Charitable Organisation" },
  { value: "8699", label: "Membership Organisation" },
  { value: "8651", label: "Political Organisation" },
];

const Container = styled.div(
  () => css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  `
);

const MerchantDetailsWrapper = styled.div(
  () => css`
    width: 320px;
    max-width: 100%;
  `
);

const ImagesWrapper = styled.div(
  () => css`
    width: 320px;
    max-width: 100%;
  `
);

const Form = styled.form(
  () => css`
    display: flex;
    flex-direction: row;
  `
);

const RecommendButton = styled(LoadingButton)(
  () => css`
    background-color: #a22bda;
    border-color: #a22bda;
    &:hover,
    &:focus,
    &:active {
      background-color: #a22bda;
      border-color: #a22bda;
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
        <ImagesWrapper>Image uploader</ImagesWrapper>
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

          <RecommendButton icon={StoreFilled} type="button" variant="primary">
            Recommend
          </RecommendButton>
        </MerchantDetailsWrapper>
      </Form>
    </Container>
  );
};
