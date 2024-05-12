import { getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage();

export const uploadFile = (file) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `/files/${file.name}`);

    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!", snapshot);
    });
  });
};
