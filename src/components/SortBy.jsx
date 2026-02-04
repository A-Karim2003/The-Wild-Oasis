import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useSearchParams } from "react-router";

const dropdownTriggerClass = `
text-muted-foreground inline-flex h-9 w-fit items-center justify-center
p-[3px] bg-gold-light/20 dark:bg-gold/10 rounded-xl border border-gold/20 dark:border-gold/30 text-primary
`;

const dropdownItemClass = `
  rounded-lg font-medium text-sm
  text-gold-dark hover:bg-gold/5
  transition-all duration-300
`;

export default function SortBy({ sortOptions, paramName, defaultValue }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read current sort from URL for and handles Dropdown ui
  const currentSort = searchParams.get(paramName) || defaultValue;

  // Find the current option's label from the sortOptions array
  const currentLabel = sortOptions.find(
    (option) => option.value === currentSort,
  )?.label;

  //* Updates url when user selects a sort option
  function handleSort(sortValue) {
    // sets param without replacing other search params
    setSearchParams((params) => {
      params.set(paramName, sortValue);
      return params;
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`${dropdownTriggerClass} px-4 flex items-center gap-4 text-sm`}
      >
        <span className="text-nowrap">{currentLabel}</span>
        <ChevronDown />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className={dropdownItemClass}
            onClick={() => handleSort(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
