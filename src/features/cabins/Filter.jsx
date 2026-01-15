import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
const tabTriggerClass = `rounded-lg font-medium text-sm 
    data-[state=active]:bg-gradient-to-br data-[state=active]:from-gold data-[state=active]:to-gold-accent
    data-[state=active]:text-primary data-[state=active]:shadow-lg data-[state=active]:shadow-gold/25
    data-[state=inactive]:text-gold-dark dark:data-[state=inactive]:text-gold-light/70
    data-[state=inactive]:hover:text-gold data-[state=inactive]:hover:bg-gold/5
    transition-all duration-300`;

export default function Filter() {
  return (
    <Tabs defaultValue="account">
      <TabsList className="bg-gold-light/20 dark:bg-gold/10 rounded-xl border border-gold/20 dark:border-gold/30">
        <TabsTrigger value="account" className={tabTriggerClass}>
          Account
        </TabsTrigger>
        <TabsTrigger value="password" className={tabTriggerClass}>
          Password
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
