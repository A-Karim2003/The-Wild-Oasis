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
  "name-asc": "Sort by name (Asc)",
  "name-desc": "Sort by name (Desc)",

  "price-asc": "Sort by price (Asc)",
  "price-desc": "Sort by price (Desc)",

  "date-recent": "Sort by date (recent first)",

  "amount-high": "Sort by amount (highest first)",
  "amount-low": "Sort by amount (lowest first)",
};

export default function SortBy({ isMobileScreen }) {
  const [selectedMenu, setSelectedMenu] = useState("date-recent");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`${dropdownTriggerClass} px-4 flex items-center gap-4 ${
          isMobileScreen ? "text-xs" : "text-sm"
        }`}
      >
        <span className="text-nowrap"> {options[selectedMenu]}</span>

        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className={dropdownItemClass}
          onClick={() => setSelectedMenu("name-asc")}
        >
          Sort by name (Asc)
        </DropdownMenuItem>

        <DropdownMenuItem
          className={dropdownItemClass}
          onClick={() => setSelectedMenu("name-desc")}
        >
          Sort by name (Desc)
        </DropdownMenuItem>

        <DropdownMenuItem
          className={dropdownItemClass}
          onClick={() => setSelectedMenu("price-asc")}
        >
          Sort by price (Asc)
        </DropdownMenuItem>

        <DropdownMenuItem
          className={dropdownItemClass}
          onClick={() => setSelectedMenu("price-desc")}
        >
          Sort by price (Desc)
        </DropdownMenuItem>

        <DropdownMenuItem
          className={dropdownItemClass}
          onClick={() => setSelectedMenu("date-recent")}
        >
          Sort by date (recent first)
        </DropdownMenuItem>

        <DropdownMenuItem
          className={dropdownItemClass}
          onClick={() => setSelectedMenu("amount-high")}
        >
          Sort by amount (highest first)
        </DropdownMenuItem>

        <DropdownMenuItem
          className={dropdownItemClass}
          onClick={() => setSelectedMenu("amount-low")}
        >
          Sort by amount (lowest first)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
