import Border from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Border";
import ColumnCounter from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ColumnCounter";
import RowCounter from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/RowCounter";
import BackgroundColor from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/BackgroundColor";

const TableLayout = () => {
  return (
    <div className="flex flex-col gap-1">
      <ColumnCounter />
      <RowCounter />
      <Border />
      <BackgroundColor />
    </div>
  );
};

export default TableLayout;
