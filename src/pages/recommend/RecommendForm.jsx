import React, { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Select, Heading, TextArea, spacing } from '@sumup/circuit-ui';
import { StoreFilled } from '@sumup/icons';

import { PurpleButton } from '../../components/PurpleButton';
import { GeocoderInput } from '../../components/GeoCodeInput/GeocodeInput';
import { ImageUploader } from '../../components/ImageUploader';

import { businessOptions } from './business-options';
import {
  Container,
  Form,
  ImagesWrapper,
  MerchantDetailsWrapper,
} from './RecommendForm.styles';

const errorMessageByType = {
  required: 'This field is required',
};

export const RecommendForm = ({ isLoading = false, handleFormSubmit }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = useCallback(
    (data) => {
      const merchant = {
        // map to match the Merchant type
        category: data.businessType,
        name: data.merchantName,
        description: data.description,
        imageUrl: data.images?.[0],
        address: data.address,
        phone: data.phoneNumber,
        links: {
          website: data.merchantWebsite,
          instagram: data.merchantInstagram,
          facebook: data.merchantFacebook,
        },
      };
      handleFormSubmit(merchant);
    },
    [handleFormSubmit],
  );

  return (
    <Container>
      <Heading noMargin css={spacing({ bottom: 'tera' })} size="giga">
        Recommend a SumUp Merchant
      </Heading>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ImagesWrapper>
          <Controller
            name="images"
            control={control}
            render={({ field }) => <ImageUploader {...field} />}
          />
        </ImagesWrapper>
        <MerchantDetailsWrapper>
          <Input
            noMargin
            css={spacing({ bottom: 'mega' })}
            label="Merchant name"
            placeholder="Brand name"
            validationHint={errorMessageByType[errors?.merchantName?.type]}
            invalid={!!errors.merchantName}
            {...register('merchantName', { required: true })}
          />
          <Select
            noMargin
            css={spacing({ bottom: 'mega' })}
            label="Type of business"
            options={businessOptions}
            validationHint={errorMessageByType[errors?.businessType?.type]}
            invalid={!!errors.businessType}
            {...register('businessType', { required: true })}
          />

          <TextArea
            noMargin
            css={spacing({ bottom: 'mega' })}
            label="Short description"
            placeholder="Pizza/cocktail bar"
            validationHint={errorMessageByType[errors?.description?.type]}
            invalid={!!errors.description}
            {...register('description', { required: true })}
          />

          <Controller
            name="address"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <GeocoderInput
                country="DE"
                label="Merchant address"
                placeholder="Type to search"
                invalid={!!errors.address}
                validationHint={errorMessageByType[errors?.address?.type]}
                {...field}
              />
            )}
          />

          <Input
            label="Phone number for reservations"
            placeholder="+49 234 1210 78 44"
            optionalLabel={'optional'}
            {...register('phoneNumber')}
          />

          <Input
            label="Website"
            placeholder="https://"
            optionalLabel={'optional'}
            {...register('merchantWebsite')}
          />

          <Input
            label="Instagram"
            placeholder="https://"
            optionalLabel={'optional'}
            {...register('merchantInstagram')}
          />

          <Input
            label="Facebook"
            placeholder="https://"
            optionalLabel={'optional'}
            {...register('merchantFacebook')}
          />

          <PurpleButton
            icon={StoreFilled}
            type="submit"
            css={{ width: '100%' }}
            isLoading={isLoading}
          >
            Save Merchant
          </PurpleButton>
        </MerchantDetailsWrapper>
      </Form>
    </Container>
  );
};
