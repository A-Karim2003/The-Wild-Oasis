import { logout } from "@/services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export default function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Remove user data from cache to clear all auth state
      queryClient.removeQueries({ queryKey: ["user"] });

      navigate("/login", { replace: true });
    },

    onError: (error) => {
      toast.error(error.message || "Failed to logout");
    },
  });
}
