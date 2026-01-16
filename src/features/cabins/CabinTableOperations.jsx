import { useEffect, useState } from "react";
import Filter from "./Filter";
import SortBy from "./SortBy";

export default function CabinTableOperations() {
  const [isScreenSmall, setIsScreenSmall] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 480px)");
    const handle = () => setIsScreenSmall(media.matches);
    handle();

    media.addEventListener("change", handle);

    return () => window.addEventListener("change", handle);
  }, []);
  return (
    <div className="flex gap-4 items-center flex-wrap">
      <Filter isMobileScreen={isScreenSmall} />
      <SortBy isMobileScreen={isScreenSmall} />
    </div>
  );
}
