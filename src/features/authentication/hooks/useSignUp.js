import { signUp } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";

export default function useSignUp() {
  return useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log(data);
    },
  });
}
