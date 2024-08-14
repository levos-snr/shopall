import { Heart, Search, ShoppingCart, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white flex justify-between p-8 items-center">
      <NavLink
        to="/"
        className="flex justify-start items-center text-2xl md:font-bold"
      >
        SHOPALL
      </NavLink>
      <ul className="flex justify-end italic text-xl">
        <NavLink to="/products" className="mr-4 cursor-pointer">
          Products
        </NavLink>
        <NavLink to="/category" className="mr-4 cursor-pointer">
          Categories
        </NavLink>
        <NavLink to="/customers" className="mr-4 cursor-pointer">
          Customers
        </NavLink>
        <NavLink to="/orders" className="mr-4 cursor-pointer">
          Orders
        </NavLink>
        <NavLink to="/support" className="mr-4 cursor-pointer">
          Support
        </NavLink>
        <Search className="mr-4" />
        <Heart className="mr-4" />
        <ShoppingCart className="mr-4" />
        <UserRound />
      </ul>
    </nav>
  );
};

export default Navbar;
