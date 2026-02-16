import useUser from "@/features/authentication/hooks/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Spinner } from "./ui/spinner";

export default function ProtectedRoute({ children }) {
  //? Load authenticated user
  const { data: user, isPending } = useUser();
  const navigate = useNavigate();

  //? Redirect to login if user is not authenticated
  useEffect(() => {
    if (!isPending && !user) navigate("/login", { replace: true });
  }, [user, isPending, navigate]);

  //* Show loading state while checking authentication to prevents flashing protected content before redirect

  if (isPending)
    return (
      <div className="h-screen w-full flex items-center">
        <Spinner className="size-18 text-amber-600 m-auto" />
      </div>
    );

  if (!user) return null;

  // User is authenticated, render protected content
  return children;
}
