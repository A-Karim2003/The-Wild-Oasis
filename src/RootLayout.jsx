import { Outlet } from "react-router";
import Navbar from "./features/appLayout/Navbar";
import { SidebarProvider } from "./components/ui/sidebar";
import Cookies from "js-cookie";
import { AppSidebar } from "./features/appLayout/AppSidebar";
import { useState } from "react";
import { Bounce, ToastContainer } from "react-toastify";

function RootLayout() {
  const [open, setOpen] = useState(() => {
    const saved = Cookies.get("sidebar-open");
    return saved ? JSON.parse(saved) : true;
  });

  function handleOpenChange(newOpen) {
    setOpen(newOpen);
    Cookies.set("sidebar-open", newOpen, { expires: 10 });
  }

  return (
    <SidebarProvider open={open} onOpenChange={handleOpenChange}>
      <AppSidebar />
      <main className="h-screen w-full overflow-hidden bg-gold-glow flex flex-col">
        <Navbar />
        <div className="flex-1 p-4 max-w-360 flex flex-col min-h-0">
          <Outlet />
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="colored"
            transition={Bounce}
            className={"z-50"}
          />
        </div>
      </main>
    </SidebarProvider>
  );
}

export default RootLayout;
