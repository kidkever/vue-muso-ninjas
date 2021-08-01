import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import { projectFirestore } from "../firebase/config";

const getCollection = (collection, query) => {
  const documents = ref(null);
  const error = ref(null);

  let collectionRef = projectFirestore
    .collection(collection)
    .orderBy("createdAt");

  if (query) {
    collectionRef = collectionRef.where(...query);
  }

  const unsub = collectionRef.onSnapshot(
    (snap) => {
      let results = [];
      snap.docs.forEach((doc) => {
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
      });
      documents.value = results;
      error.value = null;
    },
    (err) => {
      documents.value = null;
      console.log(err.message);
      error.value = "Could not fetch the data";
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { documents, error, unsub };
};

export default getCollection;
