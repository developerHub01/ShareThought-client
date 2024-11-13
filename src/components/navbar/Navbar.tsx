import NavLeft from "@/components/navbar/NavLeft";
import Searchbar from "@/components/navbar/Searchbar";
import NavRight from "@/components/navbar/NavRight";

const Navbar = () => {
  return (
    <header className="w-full p-2 sticky top-0 z-50">
      <div className="flex justify-between items-center gap-2 w-full mx-auto px-1 sm:px-5 shadow-lg rounded-sm p-2 border bg-white relative overflow-hidden">
        <NavLeft />
        <Searchbar />
        <NavRight />
      </div>
    </header>
  );
};

export default Navbar;
