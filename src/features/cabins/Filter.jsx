import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router";

const tabTriggerClass = `rounded-lg font-medium text-sm data-[state=active]:bg-gradient-to-br data-[state=active]:from-gold data-[state=active]:to-gold-accent
  data-[state=active]:text-primary data-[state=active]:shadow-lg data-[state=active]:shadow-gold/25
  data-[state=inactive]:text-gold-dark dark:data-[state=inactive]:text-gold-light/70
  data-[state=inactive]:hover:text-gold data-[state=inactive]:hover:bg-gold/5
  transition-all duration-300`;

export default function Filter({ filterOptions, paramName, defaultValue }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(paramName) || defaultValue;

  function handleFilter(value) {
    setSearchParams((params) => {
      if (value === defaultValue) params.delete(paramName);
      else params.set(paramName, value);
      return params;
    });
  }

  return (
    <Tabs value={currentFilter} onValueChange={handleFilter}>
      <TabsList className="bg-gold-light/20 dark:bg-gold/10 rounded-xl border border-gold/20 dark:border-gold/30">
        {filterOptions.map((option) => (
          <TabsTrigger
            key={option.value}
            value={option.value}
            className={tabTriggerClass}
          >
            {option.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
