import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu as HeadlessMenu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Bars3Icon } from "@heroicons/react/24/outline";
import logo from "../assets/Course_HUB.png";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "./ui/sheet";
import DarkMode from "@/DarkMode";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Add a class to the body when the component mounts
    document.body.classList.add('scroll-smooth');
    
    // Calculate scrollbar width and add it as a CSS variable
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.classList.remove('scroll-smooth');
    };
  }, []);

  useEffect(() => {
    const match = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(match.matches);
    const handler = (e) => setIsDark(e.matches);
    match.addEventListener('change', handler);
    return () => match.removeEventListener('change', handler);
  }, []);

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out.");
      navigate("/login");
    }
  }, [isSuccess, data, navigate]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[hsl(231,53%,55%)] shadow-lg' : 'bg-transparent'
      }`}
      style={{ 
        width: '100%',
      }}
    >
      <div className={`max-w-7xl flex items-center justify-between mx-auto px-4 pt-1 `}>
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-3 ml-2">
          <span className={`inline-flex items-center rounded-xl p-2 transition-colors `}>
            <img src={logo} className="h-11" alt="coursehub logo" />
            <span className={` ml-2 text-2xl font-semibold whitespace-nowrap transition-colors duration-300 ${scrolled ? 'text-[hsl(224,24%,13%)]' : 'text-[hsl(231,53%,55%)]'}`}>
              Course <span className="font-bold text-green-600">HUB</span>
            </span>
          </span>
        </Link>

        {/* Mobile toggle button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg lg:hidden focus:outline-none transition-colors duration-300 ${
            scrolled 
              ? 'text-white hover:bg-white/10' 
              : 'text-[hsl(231,53%,55%)] hover:bg-[hsl(231,53%,55%)]/10 dark:text-white'
          }`}
          aria-expanded={mobileMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon className="h-6 w-6" />
        </button>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center gap-8">
          {user ? (
            <ul className="flex items-center gap-8">
              <li>
                <Link
                  to="/"
                  className={`text-sm font-medium transition-colors duration-300 ${
                    scrolled 
                      ? 'text-white hover:text-white/80' 
                      : 'text-[hsl(231,53%,55%)] hover:text-[hsl(231,53%,45%)] dark:text-white'
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/my-learning"
                  className={`text-sm font-medium transition-colors duration-300 ${
                    scrolled 
                      ? 'text-white hover:text-white/80' 
                      : 'text-[hsl(231,53%,55%)] hover:text-[hsl(231,53%,45%)] dark:text-white'
                  }`}
                >
                  Progress
                </Link>
              </li>
              <li>
                <Link
                  to="/gamification"
                  className={`text-sm font-medium transition-colors duration-300 ${
                    scrolled 
                      ? 'text-white hover:text-white/80' 
                      : 'text-[hsl(231,53%,55%)] hover:text-[hsl(231,53%,45%)] dark:text-white'
                  }`}
                >
                  Scoreboard
                </Link>
              </li>
              <li>
                <Link
                  to="/CourseRecommendationForm"
                  className={`text-sm font-medium transition-colors duration-300 ${
                    scrolled 
                      ? 'text-white hover:text-white/80' 
                      : 'text-[hsl(231,53%,55%)] hover:text-[hsl(231,53%,45%)] dark:text-white'
                  }`}
                >
                  Course Recommender
                </Link>
              </li>

              {/* Profile Dropdown */}
              <li>
                <HeadlessMenu as="div" className="relative">
                  <MenuButton className={`flex items-center focus:outline-none transition-colors duration-300 ${
                    scrolled 
                      ? 'text-white hover:text-white/80' 
                      : 'text-[hsl(231,53%,55%)] hover:text-[hsl(231,53%,45%)] dark:text-white'
                  }`}>
                    <span className="text-sm font-medium">Account</span>
                    <ChevronDownIcon className="h-4 w-4 ml-1" />
                  </MenuButton>
                  <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 focus:outline-none overflow-hidden">
                    <div className="py-1">
                      <MenuItem>
                        {({ active }) => (
                          <Link
                            to="/profile"
                            className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                              active ? 'bg-[hsl(231,53%,55%)] text-white' : 'text-gray-700 dark:text-gray-200'
                            }`}
                          >
                            Profile
                          </Link>
                        )}
                      </MenuItem>
                      {user?.role === "instructor" && (
                        <MenuItem>
                          {({ active }) => (
                            <Link
                              to="/admin/dashboard"
                              className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                                active ? 'bg-[hsl(231,53%,55%)] text-white' : 'text-gray-700 dark:text-gray-200'
                              }`}
                            >
                              Dashboard
                            </Link>
                          )}
                        </MenuItem>
                      )}
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={logoutHandler}
                            className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                              active ? 'bg-[hsl(231,53%,55%)] text-white' : 'text-gray-700 dark:text-gray-200'
                            }`}
                          >
                            Sign out
                          </button>
                        )}
                      </MenuItem>
                    </div>
                  </MenuItems>
                </HeadlessMenu>
              </li>
            </ul>
          ) : (
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/login")}
                className={`transition-colors duration-300 ${
                  scrolled 
                    ? 'text-white hover:bg-white/10' 
                    : 'text-[hsl(231,53%,55%)] hover:bg-[hsl(231,53%,55%)]/10'
                }`}
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate("/login")}
                className={`transition-colors duration-300 ${
                  scrolled 
                    ? 'bg-white text-[hsl(231,53%,55%)] hover:bg-white/90' 
                    : 'bg-[hsl(231,53%,55%)] text-white hover:bg-[hsl(231,53%,45%)]'
                }`}
              >
                Sign up
              </Button>
            </div>
          )}

          {/* Dark Mode Toggle */}
          <div className="ml-2">
            <DarkMode 
              buttonBg={scrolled 
                ? (isDark ? 'bg-[#1e293b]' : 'bg-[hsl(231,53%,45%)]') 
                : (isDark ? 'bg-[#1e293b]' : 'bg-white')
              }
              buttonText={scrolled ? 'text-white' : (isDark ? 'text-white' : 'text-[hsl(231,53%,55%)]')}
            />
          </div>
        </div>

        {/* Mobile Navbar */}
        {mobileMenuOpen && (
          <MobileNavbar setMobileMenuOpen={setMobileMenuOpen} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;

const MobileNavbar = ({ setMobileMenuOpen }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <Sheet open={true} onOpenChange={() => setMobileMenuOpen(false)}>
      <SheetContent className="flex flex-col bg-white dark:bg-gray-900">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle className="text-[hsl(231,53%,55%)] dark:text-white">
            <Link to="/">Course HUB</Link>
          </SheetTitle>
          <DarkMode />
        </SheetHeader>
        <nav className="flex flex-col space-y-4 mt-6">
          <Link 
            to="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-[hsl(231,53%,55%)] hover:text-[hsl(231,53%,45%)] dark:text-white transition-colors duration-200"
          >
            Home
          </Link>
          <Link 
            to="/my-learning" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-[hsl(231,53%,55%)] hover:text-[hsl(231,53%,45%)] dark:text-white transition-colors duration-200"
          >
            Progress
          </Link>
          <Link 
            to="/gamification" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-[hsl(231,53%,55%)] hover:text-[hsl(231,53%,45%)] dark:text-white transition-colors duration-200"
          >
            Scoreboard
          </Link>
          <Link 
            to="/CourseRecommendationForm" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-[hsl(231,53%,55%)] hover:text-[hsl(231,53%,45%)] dark:text-white transition-colors duration-200"
          >
            Course Recommender
          </Link>
          {user && (
            <>
              <Link 
                to="/profile" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-[hsl(231,53%,55%)] hover:text-[hsl(231,53%,45%)] dark:text-white transition-colors duration-200"
              >
                Profile
              </Link>
              {user.role === "instructor" && (
                <Link 
                  to="/admin/dashboard" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[hsl(231,53%,55%)] hover:text-[hsl(231,53%,45%)] dark:text-white transition-colors duration-200"
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={() => {
                  logoutHandler();
                  setMobileMenuOpen(false);
                }}
                className="text-red-500 hover:text-red-600 text-left transition-colors duration-200"
              >
                Sign out
              </button>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
