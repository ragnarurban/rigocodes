import { getCategories } from "@/lib/category";

import SideMenu from "../sidemenu";
import { ModeToggle } from "../themetoggle";
import Logo from "./logo";
import SiteNav from "./site-nav";
import LangPicker from "../lang-picker";

const Navbar = async () => {
  const categories = await getCategories();
  return (
    <nav className="flex col h-20 border-mist-800 border-b-2 justify-between items-center">
      <div className="pl-4 md:pl-12 flex-2 md:flex-0">
        <Logo />
      </div>

      <div className="flex pr-8 md:pr-8 justify-end md:justify-between flex-1 md:flex-2">
        <SiteNav categories={categories} />
        <div className="flex flex-row">
          <ModeToggle />
          <LangPicker />
          <SideMenu categories={categories} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
