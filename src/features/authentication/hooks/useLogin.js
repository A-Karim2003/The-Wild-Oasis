import { login } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message || "Invalid credentials");
    },
  });
}
