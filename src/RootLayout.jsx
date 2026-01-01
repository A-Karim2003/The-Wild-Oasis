import { Outlet } from "react-router";
import Navbar from "./features/appLayout/Navbar";
import ThemeProvider from "./components/context/ThemeProvider";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./features/appLayout/AppSidebar";

function RootLayout() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-screen h-screen">
          <Navbar />
          <div>
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default RootLayout;
