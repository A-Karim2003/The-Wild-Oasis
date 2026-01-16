import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const tabTriggerClass = `rounded-lg font-medium text-sm 
    data-[state=active]:bg-gradient-to-br data-[state=active]:from-gold data-[state=active]:to-gold-accent
    data-[state=active]:text-primary data-[state=active]:shadow-lg data-[state=active]:shadow-gold/25
    data-[state=inactive]:text-gold-dark dark:data-[state=inactive]:text-gold-light/70
    data-[state=inactive]:hover:text-gold data-[state=inactive]:hover:bg-gold/5
    transition-all duration-300`;

const dropdownTriggerClass = `
text-muted-foreground inline-flex h-9 w-fit items-center justify-center
p-[3px] bg-gold-light/20 dark:bg-gold/10 rounded-xl border border-gold/20 dark:border-gold/30 text-primary
`;

const dropdownItemClass = `
  rounded-lg font-medium text-sm
  text-gold-dark hover:bg-gold/5
  transition-all duration-300
`;

const options = {
  "date-recent": "Sort by date (recent first)",
  "amount-high": "Sort by amount (highest first)",
  "amount-low": "Sort by amount (lowest first)",
};

export default function SortBy() {
  const [selectedMenu, setSelectedMenu] = useState("date-recent");
  const [isSmall, setIsSmall] = useState(false);

  //* Effect checks where screen size is greater/less than 768px
  useEffect(() => {
    const media = window.matchMedia("(max-width: 924px)");
    const handleChange = () => setIsSmall(media.matches);
    handleChange();
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`${dropdownTriggerClass} px-4 flex items-center gap-4`}
      >
        {isSmall && (
          <span className="text-nowrap">
            {options[selectedMenu].split("(")[0]}
          </span>
        )}

        {!isSmall && (
          <span className="text-nowrap"> {options[selectedMenu]}</span>
        )}

        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className={dropdownItemClass}
          onClick={() => setSelectedMenu("date-recent")}
        >
          Sort by date (recent first)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSelectedMenu("amount-high")}>
          Sort by amount (highest first)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSelectedMenu("amount-low")}>
          Sort by amount (lowest first)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
