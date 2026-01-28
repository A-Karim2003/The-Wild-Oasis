import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {},
    onMutate: () => {},
    onSuccess: () => {},
    onError: () => {},
  });
}
