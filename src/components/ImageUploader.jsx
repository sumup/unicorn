import { ImageInput, Avatar } from '@sumup/circuit-ui';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { firebase } from '../lib/firebase';
import 'firebase/storage';

const storageRef = firebase
  .app()
  .storage(process.env.NEXT_PUBLIC_FIREBASE_STORAGE)
  .ref();

export const StyledP = styled.p`
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 4px;
`;

export const ImageUploader = ({ onChange, value }) => {
  const [imageUrl, setImageUrl] = useState(value);
  const [error, setError] = useState('');

  /**
   * @param {File} file
   */
  const uploadFile = (file) =>
    storageRef
      .child(`images/${file.name}`)
      .put(file, {
        contentType: file.type,
      })
      .then((snapshot) => snapshot.ref.getDownloadURL());

  const onClear = () => {
    setError('');
    setImageUrl('');
    onChange([]);
  };

  const onInputChange = (file) => {
    setError('');
    setImageUrl('');
    return uploadFile(file)
      .then((remoteImageUrl) => {
        setImageUrl(remoteImageUrl);
        onChange([remoteImageUrl]);
      })
      .catch((e) => {
        console.error(e);
        setError('An error occurred while uploading file!');
      });
  };

  return (
    <>
      <StyledP>Add photo</StyledP>
      <ImageInput
        label="Upload an image"
        multiple
        clearButtonLabel="Clear"
        src={imageUrl}
        onChange={onInputChange}
        onClear={onClear}
        invalid={!!error}
        validationHint={error}
        loadingLabel="Uploading"
        component={Avatar}
      />
    </>
  );
};
