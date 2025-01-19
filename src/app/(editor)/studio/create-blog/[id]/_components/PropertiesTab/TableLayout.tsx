import Border from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Border";
import ColumnCounter from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ColumnCounter";
import RowCounter from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/RowCounter";
import TextColor from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/TextColor";
import StripedRow from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/StripedRow";
import TableBackground from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/TableBackground";

const TableLayout = () => {
  return (
    <div className="flex flex-col h-full">
      <ColumnCounter />
      <RowCounter />
      <Border />
      <TableBackground />
      <TextColor />
      <StripedRow />
    </div>
  );
};

export default TableLayout;
