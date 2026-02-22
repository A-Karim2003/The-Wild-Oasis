import { SalesChart } from "@/features/dashboard/SalesChart/SalesChart";
import EmailConfirmation from "@/features/users/EmailConfirmation";
import SignupForm from "@/features/users/SignupForm";
import { useState } from "react";

export default function Users() {
  const [showEmailConfirm, setShowEmailConfirm] = useState(false);
  return (
    <div>
      <h2 className="text-4xl font-bold max-sm:hidden mb-4">
        Create a new user
      </h2>
      {!showEmailConfirm ? (
        <SignupForm setShowEmailConfirm={setShowEmailConfirm} />
      ) : (
        <EmailConfirmation />
      )}
    </div>
  );
}
