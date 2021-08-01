import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import { projectFirestore } from "../firebase/config";

const getDocument = (collection, id) => {
  const document = ref(null);
  const error = ref(null);

  let documentRef = projectFirestore.collection(collection).doc(id);

  const unsub = documentRef.onSnapshot(
    (doc) => {
      if (doc.data()) {
        document.value = { ...doc.data(), id: doc.id };
        error.value = null;
      } else {
        error.value = "That document doesn't exist.";
      }
    },
    (err) => {
      document.value = null;
      console.log(err.message);
      error.value = "Could not fetch the data";
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { document, error, unsub };
};

export default getDocument;
