import React, { useContext, useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [MenuVisible, setMenuVisible] = useState(false);
  const { setShowSearch, showSearch, getCartCount, token, setToken } =
    useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();

  const headerRef = useRef(null);
  const lastScrollY = useRef(0);

  // 🔥 INSTANT SCROLL HIDE / SHOW (your exact requirement)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!headerRef.current) return;

      if (currentScrollY > lastScrollY.current) {
        // Scrolling DOWN → hide header
        headerRef.current.style.transform = "translateY(-125%)";
      } else {
        // Scrolling UP → show header
        headerRef.current.style.transform = "translateY(0)";
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        style={{ "--header-h": "4rem" }}   // 👈 define height once
        className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] sm:w-[90vw] md:w-[86vw] lg:w-[80vw] xl:w-[76vw] 2xl:w-[72vw] z-50 transition-transform duration-300 bg-black rounded-xl h-(--header-h)"
      >
        <div className="px-8">
          <div className="h-16 flex items-center justify-between">

            {/* LOGO (Your existing logo) */}
            <Link to="/" className="flex items-center">
              <img src={assets.logo_ravn} alt="logo" className="w-15" />
              <p className="monoton text-white text-lg font-semibold">RAVN</p>
            </Link>

            {/* DESKTOP NAV */}
            <ul className="hidden sm:flex gap-8 text-sm text-white tracking-wide">
              <NavLink to="/" className="hover:text-gray-300">
                HOME
              </NavLink>
              <NavLink to="/collections" className="hover:text-gray-300">
                COLLECTIONS
              </NavLink>
              <NavLink to="/about" className="hover:text-gray-300">
                ABOUT
              </NavLink>
              <NavLink to="/contact" className="hover:text-gray-300">
                CONTACT
              </NavLink>
            </ul>

            {/* ICONS (Your existing logic kept) */}
            <div className="flex items-center gap-5">

              {/* SEARCH */}
              <img
                src={assets.Search_Glass}
                alt="search"
                className="w-5 cursor-pointer hover:scale-110 transition"
                onClick={() => {
                  if (location.pathname !== "/collections") {
                    navigate("/collections");
                  }
                  setShowSearch(!showSearch);
                }}
              />

              {/* CART */}
              <Link to="/cart" className="relative hover:scale-110 transition">
                <img
                  src={assets.Cart_Btn}
                  alt="cart"
                  className="w-5 cursor-pointer"
                />
                <p className="absolute -bottom-1.5 -right-1.5 bg-white text-black 
                              w-4 h-4 text-xs rounded-full flex items-center 
                              justify-center leading-4">
                  {getCartCount()}
                </p>
              </Link>

              {/* PROFILE */}
              <img
                src={assets.User_Icon}
                alt="profile"
                title={token ? "Profile" : "Login"}
                className="w-5 cursor-pointer hover:scale-110 transition"
                onClick={() => navigate(token ? "/profile" : "/login")}
              />

              {/* MOBILE MENU BUTTON */}
              <img
                onClick={() => setMenuVisible(true)}
                src={assets.Menu_Btn}
                alt="menu"
                className="w-5 cursor-pointer sm:hidden"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Spacer so content doesn't go under navbar */}
      <div className="h-28"></div>

      {/* MOBILE MENU DROPDOWN */}
      {MenuVisible && (
        <>
          {/* Backdrop to close menu on click outside */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setMenuVisible(false)}
          ></div>

          <div className="fixed top-20 right-4 sm:right-[5%] md:right-[7%] lg:right-[10%] w-64 bg-[#1a1a1a] text-gray-200 rounded-xl shadow-2xl border border-white/10 overflow-hidden transform transition-all duration-300 z-50 animate-fade-in">

            <ul className="flex flex-col p-2">
              <NavLink onClick={() => setMenuVisible(false)} to="/" className="py-3 px-4 hover:bg-white/5 rounded-lg transition-colors text-sm font-medium tracking-wide">
                HOME
              </NavLink>
              <NavLink onClick={() => setMenuVisible(false)} to="/collections" className="py-3 px-4 hover:bg-white/5 rounded-lg transition-colors text-sm font-medium tracking-wide">
                COLLECTIONS
              </NavLink>

              {/* Show Orders only if logged in */}
              {token && (
                <NavLink onClick={() => setMenuVisible(false)} to="/orders" className="py-3 px-4 hover:bg-white/5 rounded-lg transition-colors text-sm font-medium tracking-wide">
                  ORDERS
                </NavLink>
              )}

              <NavLink onClick={() => setMenuVisible(false)} to="/about" className="py-3 px-4 hover:bg-white/5 rounded-lg transition-colors text-sm font-medium tracking-wide">
                ABOUT
              </NavLink>
              <NavLink onClick={() => setMenuVisible(false)} to="/contact" className="py-3 px-4 hover:bg-white/5 rounded-lg transition-colors text-sm font-medium tracking-wide">
                CONTACT
              </NavLink>

              {/* DIVIDER */}
              <div className="h-px bg-white/10 my-1 mx-2"></div>

              {/* AUTH ACTION */}
              {token ? (
                <button
                  onClick={() => {
                    setToken('');
                    localStorage.removeItem('token');
                    navigate('/login');
                    setMenuVisible(false);
                  }}
                  className="w-full text-left py-3 px-4 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors text-sm font-semibold tracking-wide uppercase"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate('/login');
                    setMenuVisible(false);
                  }}
                  className="w-full text-left py-3 px-4 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors text-sm font-semibold tracking-wide uppercase"
                >
                  Login
                </button>
              )}

            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
