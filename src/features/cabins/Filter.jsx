import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Filter({ isMobileScreen }) {
  const tabTriggerClass = `rounded-lg font-medium ${
    isMobileScreen ? "text-xs" : "text-sm"
  }
    data-[state=active]:bg-gradient-to-br data-[state=active]:from-gold data-[state=active]:to-gold-accent
    data-[state=active]:text-primary data-[state=active]:shadow-lg data-[state=active]:shadow-gold/25
    data-[state=inactive]:text-gold-dark dark:data-[state=inactive]:text-gold-light/70
    data-[state=inactive]:hover:text-gold data-[state=inactive]:hover:bg-gold/5
    transition-all duration-300`;

  return (
    <Tabs defaultValue="all">
      <TabsList className="bg-gold-light/20 dark:bg-gold/10 rounded-xl border border-gold/20 dark:border-gold/30">
        <TabsTrigger value="all" className={tabTriggerClass}>
          All
        </TabsTrigger>
        <TabsTrigger value="checkedOut" className={tabTriggerClass}>
          Checked out
        </TabsTrigger>
        <TabsTrigger value="checkedIn" className={tabTriggerClass}>
          Checked out
        </TabsTrigger>
        <TabsTrigger value="unconfirmed" className={tabTriggerClass}>
          Unconfirmed
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
