import Border from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Border";
import ColumnCounter from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ColumnCounter";
import RowCountr from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/RowCountr";

const TableLayout = () => {
  return (
    <div className="flex flex-col gap-1">
      <ColumnCounter />
      <RowCountr />
      <Border />
    </div>
  );
};

export default TableLayout;
