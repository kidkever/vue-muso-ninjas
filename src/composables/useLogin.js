import { ref } from "@vue/reactivity";
import { projectAuth } from "../firebase/config";

const error = ref(null);
const isPending = ref(false);

const login = async (email, password) => {
  error.value = null;
  isPending.value = true;
  try {
    const res = await projectAuth.signInWithEmailAndPassword(email, password);
    error.value = null;
    isPending.value = false;
    return res;
  } catch (err) {
    console.log(err.message);
    isPending.value = false;
    error.value = "Incorrect login credentials";
  }
};

const useLogin = () => {
  return { login, error, isPending };
};

export default useLogin;
