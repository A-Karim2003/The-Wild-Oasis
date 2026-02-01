import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useCabinTable } from "./context/CabinTableProvider";

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
  "name-asc": "Sort by name (Asc)",
  "name-desc": "Sort by name (Desc)",

  "price-asc": "Sort by price (Asc)",
  "price-desc": "Sort by price (Desc)",

  "date-recent": "Sort by date (recent first)",

  "price-high": "Sort by price (highest first)",
  "price-low": "Sort by price (lowest first)",
};

export default function SortBy() {
  const { sortBy } = useCabinTable();

  const [selectedMenu, setSelectedMenu] = useState("date-recent");

  function handleSort(key, id, desc) {
    // Handles sorting state for table
    sortBy(id, desc);

    // Handles Dropdown ui
    setSelectedMenu(key);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`${dropdownTriggerClass} px-4 flex items-center gap-4 text-sm`}
      >
        <span className="text-nowrap">{options[selectedMenu]}</span>
        <ChevronDown />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          className={dropdownItemClass}
          onClick={() => handleSort("name-asc", "name", false)}
        >
          Sort by name (Asc)
        </DropdownMenuItem>

        <DropdownMenuItem
          className={dropdownItemClass}
          onClick={() => handleSort("name-desc", "name", true)}
        >
          Sort by name (Desc)
        </DropdownMenuItem>

        <DropdownMenuItem
          className={dropdownItemClass}
          onClick={() => handleSort("date-recent", "created_at", true)}
        >
          Sort by date (recent first)
        </DropdownMenuItem>

        <DropdownMenuItem
          className={dropdownItemClass}
          onClick={() => handleSort("price-high", "price", true)}
        >
          Sort by price (highest first)
        </DropdownMenuItem>

        <DropdownMenuItem
          className={dropdownItemClass}
          onClick={() => handleSort("price-low", "price", false)}
        >
          Sort by price (lowest first)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
