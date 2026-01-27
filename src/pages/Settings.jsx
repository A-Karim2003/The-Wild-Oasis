import useSettings from "@/features/settings/hooks/useSettings";
import SettingsForm from "@/features/settings/SettingsForm";

export default function Settings() {
  const { data, isPending } = useSettings();
  console.log(isPending, data);

  return (
    <div>
      <h2 className="text-4xl font-bold max-sm:hidden mb-4">
        Update hotel settings
      </h2>
      <SettingsForm settings={data} />
    </div>
  );
}
