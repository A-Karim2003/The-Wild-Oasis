import { signUp } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function useSignUp() {
  return useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log(data);
      toast.success("Account successfully created");
    },

    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });
}
