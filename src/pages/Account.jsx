import UpdatePasswordForm from "@/features/Account/UpdatePasswordForm";
import UpdateUserDataForm from "@/features/Account/UpdateUserDataForm";

export default function Account() {
  return (
    <div className="space-y-6">
      <UpdateUserDataForm />
      <UpdatePasswordForm />
    </div>
  );
}
