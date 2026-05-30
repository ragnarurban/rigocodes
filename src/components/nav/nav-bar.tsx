import SideMenu from "../sidemenu";
import { ModeToggle } from "../themetoggle";
import Logo from "./logo";
import SiteNav from "./site-nav";
import LangPicker from "../ui/lang-picker";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="flex col h-20 border-mist-800 border-b-2 justify-between items-center">
      <div className="pl-4 md:pl-12 flex-2 md:flex-0">
        <Logo />
      </div>

      <div className="flex pr-8 md:pr-8 justify-end md:justify-between flex-1 md:flex-2">
        <SiteNav />
        <div className="flex flex-row">
          <ModeToggle />
          <LangPicker />
          <SideMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
