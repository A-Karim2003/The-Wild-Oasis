import { ThemeToggle } from "@/components/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut, User2 } from "lucide-react";
import useLogout from "../authentication/hooks/useLogout";
import useUser from "../authentication/hooks/useUser";
import { Spinner } from "@/components/ui/spinner";

export default function Navbar() {
  const { mutate: logoutMutation } = useLogout();
  const { data: user, isPending } = useUser();

  return (
    <header className="h-18 w-full  items-center flex justify-between px-6">
      <SidebarTrigger />
      <nav className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          {isPending && <Spinner />}

          {!isPending && (
            <>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
              <span>{user.email.split("@")[0]}</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <User2 className="w-6 h-6 text-gold-dark cursor-pointer" />
          <ThemeToggle />
          <LogOut className="cursor-pointer" onClick={logoutMutation} />
        </div>
      </nav>
    </header>
  );
}
