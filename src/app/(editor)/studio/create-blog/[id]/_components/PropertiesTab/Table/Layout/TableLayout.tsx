import TableBackground from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/Layout/TableBackground";
import TableTextColor from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/Layout/TableTextColor";
import TableBorder from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/Layout/TableBorder";
import TableStripedRow from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/Layout/TableStripedRow";
import TableRowCounter from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/Layout/TableRowCounter";
import TableColumnCounter from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/Layout/TableColumnCounter";

const TableLayout = () => {
  return (
    <div className="flex flex-col h-full">
      <TableColumnCounter />
      <TableRowCounter />
      <TableBorder />
      <TableBackground />
      <TableTextColor />
      <TableStripedRow />
    </div>
  );
};

export default TableLayout;
