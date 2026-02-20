import { updateCurrentUser } from "@/services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function useUpdateAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Account successfully updated");
    },

    onError: (error) => {
      console.error(error);
      toast.success(error.message);
    },
  });
}
