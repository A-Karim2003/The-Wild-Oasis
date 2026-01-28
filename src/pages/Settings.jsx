import { Spinner } from "@/components/ui/spinner";
import useSettings from "@/features/settings/hooks/useSettings";
import SettingsForm from "@/features/settings/SettingsForm";

export default function Settings() {
  const { data, isPending } = useSettings();

  return (
    <div>
      <h2 className="text-4xl font-bold max-sm:hidden mb-4">
        Update hotel settings
      </h2>
      {isPending ? (
        <Spinner className="size-18 text-amber-600 m-auto" />
      ) : (
        <SettingsForm settings={data} />
      )}
    </div>
  );
}
