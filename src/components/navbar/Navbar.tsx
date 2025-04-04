import NavLeft from "@/components/navbar/left/NavLeft";
import Searchbar from "@/components/navbar/searchbar/Searchbar";
import NavRight from "@/components/navbar/right/NavRight";

const Navbar = () => {
  return (
    <header className="w-full p-1.5 sm:p-2 md:pl-0 sticky top-0 z-50 pb-3 sm:pb-4">
      <div className="flex justify-between items-center gap-1 sm:gap-2 w-full mx-auto px-1 sm:px-5 shadow-lg rounded-sm p-1.5 sm:p-2 border bg-primary-foreground relative overflow-hidden">
        <NavLeft />
        <Searchbar />
        <NavRight />
      </div>
    </header>
  );
};

export default Navbar;
