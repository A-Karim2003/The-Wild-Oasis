import { Outlet } from "react-router";
import Navbar from "./features/appLayout/Navbar";
import ThemeProvider from "./components/context/ThemeProvider";
import { SidebarProvider } from "./components/ui/sidebar";
import Cookies from "js-cookie";
import { AppSidebar } from "./features/appLayout/AppSidebar";
import { useState } from "react";
import { supabase } from "./lib/supabaseClient.js";

console.log(supabase);

function RootLayout() {
  const [open, setOpen] = useState(() => {
    const saved = Cookies.get("sidebar-open");
    return saved ? JSON.parse(saved) : true;
  });

  function handleOpenChange(newOpen) {
    setOpen(newOpen);
    Cookies.set("sidebar-open", newOpen, { expires: 10 });
  }

  async function fetch() {
    let { data: cabins, error } = await supabase.from("cabins").select("*");
    console.log(cabins);
  }

  fetch();

  return (
    <ThemeProvider>
      <SidebarProvider open={open} onOpenChange={handleOpenChange}>
        <AppSidebar />
        <main className="w-screen h-screen bg-gold-glow flex flex-col">
          <Navbar />
          <div className="flex-1 p-4 max-w-360">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default RootLayout;
