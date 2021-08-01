import { ref } from "@vue/runtime-dom";
import { projectStorage } from "../firebase/config";
import getUser from "./getUser";

const { user } = getUser();

const useStorage = () => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);
  const isPending = ref(false);

  const uploadImage = async (file) => {
    filePath.value = `covers/${user.value.uid}/${file.name}`;
    const storageRef = projectStorage.ref(filePath.value);
    isPending.value = true;

    try {
      const res = await storageRef.put(file);
      url.value = await res.ref.getDownloadURL();
      isPending.value = false;
    } catch (err) {
      console.log(err.message);
      error.value = "Could not upload the image";
      isPending.value = false;
    }
  };

  const deleteImage = async (path) => {
    const storageRef = projectStorage.ref(path);
    isPending.value = true;

    try {
      await storageRef.delete();
      isPending.value = false;
    } catch (err) {
      console.log(err.message);
      error.value = "Could not delete the image";
      isPending.value = false;
    }
  };

  return { error, url, filePath, uploadImage, deleteImage, isPending };
};

export default useStorage;
