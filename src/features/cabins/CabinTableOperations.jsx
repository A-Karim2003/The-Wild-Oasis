import Filter from "./Filter";
import SortBy from "./SortBy";

export default function CabinTableOperations() {
  return (
    <div className="flex gap-4 items-center flex-wrap justify-end">
      <Filter />
      <SortBy />
    </div>
  );
}
