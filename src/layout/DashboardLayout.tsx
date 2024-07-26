import { Link, Navigate, Outlet } from "react-router-dom";
import {
  Bell,
  CircleUser,
  HomeIcon,
  Menu,
  Package,
  Package2,
  Search,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import useTokenStore from "@/store";
import logo from '../assets/logo.png'


const DashboardLayout = () => {
  const token = useTokenStore((state) => state.token);

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  const handleLogout = () => {
    useTokenStore.setState({ token: "" });
    <Navigate to="/auth/login" replace />;
  };

  return (
    <div className="-grid -min-h-screen -w-full md:-grid-cols-[220px_1fr] lg:-grid-cols-[280px_1fr] -bg-gray-50">
      <div className="-hidden -border-r -bg-gray-100 md:-block">
        <div className="-flex -h-full -max-h-screen -flex-col -gap-2">
          <div className="-flex -h-14 -items-center -border-b -px-4 lg:-h-[60px] lg:-px-6 -bg-white">
            <Link to="/" className="-flex -items-center -gap-2 -font-semibold">
              <img
                src={logo}
                alt="Icreativez Logo"
                className="-mr-2 -h-10 -w-auto -pt-1"
              />

              <span className="-text-[#A22B2D] -text-4xl -font-extrabold -font-serif -transition-colors -duration-200">
                I
              </span>
              <span className="-text-black -text-xl -font-extrabold -transition-colors -duration-200">
                Creative
              </span>
              <span className="-text-[#A22B2D] -text-4xl -font-serif -font-extrabold -transition-colors -duration-200">
                Z
              </span>
            </Link>
            <Button
              variant="outline"
              size="icon"
              className="-ml-auto -h-8 -w-8"
            >
              <Bell className="-h-4 -w-4 -text-gray-500" />
              <span className="-sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="-flex-1">
            <nav className="-grid -items-start -px-2 -text-sm -font-medium lg:-px-4">
              <Link
                to="/dashboard/home"
                className="-flex -items-center -gap-3 -rounded-lg -px-3 -py-4 -text-gray-700 -transition-all hover:-bg-blue-50 hover:-text-blue-600"
              >
                <HomeIcon className="-h-5 -w-5" />
                Home
              </Link>
              <Link
                to="/dashboard/books"
                className="-flex -items-center -gap-3 -rounded-lg -px-3 -py-4 -text-gray-700 -transition-all hover:-bg-blue-50 hover:-text-blue-600"
              >
                <Package className="-h-4 -w-4" />
                Books
              </Link>
              <Link
                to="/dashboard/projects"
                className="-flex -items-center -gap-3 -rounded-lg -px-3 -py-4 -text-gray-700 -transition-all hover:-bg-blue-50 hover:-text-blue-600"
              >
                <Package className="-h-4 -w-4" />
                Manage Projects
              </Link>
              <Link
                to="/dashboard/users"
                className="-flex -items-center -gap-3 -rounded-lg -px-3 -py-4 -text-gray-700 -transition-all hover:-bg-blue-50 hover:-text-blue-600"
              >
                <User className="-h-4 -w-4" />
                Manage Users
              </Link>
              <Link
                to="/dashboard/leave"
                className="-flex -items-center -gap-3 -rounded-lg -px-3 -py-4 -text-gray-700 -transition-all hover:-bg-blue-50 hover:-text-blue-600"
              >
                <Package className="-h-4 -w-4" />
                Manage Leave
              </Link>
              <Link
                to="/dashboard/performance"
                className="-flex -items-center -gap-3 -rounded-lg -px-3 -py-4 -text-gray-700 -transition-all hover:-bg-blue-50 hover:-text-blue-600"
              >
                <Package className="-h-4 -w-4" />
                Performance
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="-flex -flex-col">
        <header className="-flex -h-14 -items-center -gap-4 -border-b -bg-gray-100 -px-4 lg:-h-[60px] lg:-px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="-shrink-0 md:-hidden"
              >
                <Menu className="-h-5 -w-5 -text-gray-500" />
                <span className="-sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="-flex -flex-col -bg-white">
              <nav className="-grid -gap-2 -text-lg -font-medium">
                <Link
                  to="#"
                  className="-flex -items-center -gap-2 -text-lg -font-semibold"
                >
                  <Package2 className="-h-6 -w-6 -text-blue-500" />
                  <span>Professor Dashboard</span>
                </Link>
                <Link
                  to="/dashboard/home"
                  className="-flex -items-center -gap-3 -rounded-lg -px-3 -py-4 -text-gray-700 -transition-all hover:-bg-blue-50 hover:-text-blue-600"
                >
                  <HomeIcon className="-h-5 -w-5" />
                  Home
                </Link>

                <Link
                  to="/dashboard/books"
                  className="-flex -items-center -gap-3 -rounded-lg -px-3 -py-4 -text-gray-700 -transition-all hover:-bg-blue-50 hover:-text-blue-600"
                >
                  <Package className="-h-4 -w-4" />
                  Books
                </Link>
                <Link
                  to="/dashboard/projects"
                  className="-flex -items-center -gap-3 -rounded-lg -px-3 -py-4 -text-gray-700 -transition-all hover:-bg-blue-50 hover:-text-blue-600"
                >
                  <Package className="-h-4 -w-4" />
                  Manage Projects
                </Link>
                <Link
                  to="/dashboard/users"
                  className="-flex -items-center -gap-3 -rounded-lg -px-3 -py-4 -text-gray-700 -transition-all hover:-bg-blue-50 hover:-text-blue-600"
                >
                  <User className="-h-4 -w-4" />
                  Manage Users
                </Link>
                <Link
                  to="/dashboard/leave"
                  className="-flex -items-center -gap-3 -rounded-lg -px-3 -py-4 -text-gray-700 -transition-all hover:-bg-blue-50 hover:-text-blue-600"
                >
                  <Package className="-h-4 -w-4" />
                  Manage Leave
                </Link>
                <Link
                  to="/dashboard/performance"
                  className="-flex -items-center -gap-3 -rounded-lg -px-3 -py-4 -text-gray-700 -transition-all hover:-bg-blue-50 hover:-text-blue-600"
                >
                  <Package className="-h-4 -w-4" />
                  Performance
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="-w-full -flex-1">
            <form>
              <div className="-relative">
                <Search className="-absolute -left-2.5 -top-2.5 -h-4 -w-4 -text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search Projects ...."
                  className="-w-full -appearance-none -bg-white -pl-8 -shadow-none md:-w-2/3 lg:-w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="-rounded-full">
                <CircleUser className="-h-5 -w-5 -text-gray-500" />
                <span className="-sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="-bg-white">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <Button variant="link">Logout</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="-flex -flex-1 -flex-col -gap-4 -p-4 lg:-gap-6 lg:-p-6 -bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
