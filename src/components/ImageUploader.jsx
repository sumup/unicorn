import { ImageInput, Avatar } from "@sumup/circuit-ui";
import { useState } from "react";
import firebase from "firebase";
import "firebase/storage";

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

export const ImageUploader = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  /**
   * @param {File} file
   */
  const uploadFile = (file) => {
    return storageRef
      .child(`images/${file.name}`)
      .put(file, {
        contentType: file.type,
      })
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL();
      });
  };

  const onClear = () => {
    setError("");
    setImageUrl("");
  };

  const onChange = (file) => {
    onClear();
    return uploadFile(file)
      .then((remoteImageUrl) => {
        setImageUrl(remoteImageUrl);
      })
      .catch((e) => {
        console.error(e);
        setError("An error occurred while uploading file!");
      });
  };

  return (
    <ImageInput
      label="Upload an image"
      multiple
      clearButtonLabel="Clear"
      src={imageUrl}
      onChange={onChange}
      onClear={onClear}
      invalid={!!error}
      validationHint={error}
      loadingLabel="Uploading"
      component={Avatar}
    />
  );
};
