import { login } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

export function useLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
