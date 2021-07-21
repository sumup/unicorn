import { ImageInput, Avatar } from '@sumup/circuit-ui';
import React, { useState } from 'react';
import firebase from 'firebase';
import 'firebase/storage';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
}

const storageRef = firebase
  .app()
  .storage(process.env.NEXT_PUBLIC_FIREBASE_STORAGE)
  .ref();

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
      <p>Add photos</p>
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
