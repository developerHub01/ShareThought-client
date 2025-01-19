import TableBackground from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/TableBackground";
import TableTextColor from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/TableTextColor";
import TableBorder from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/TableBorder";
import TableStripedRow from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/TableStripedRow";
import TableRowCounter from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/TableRowCounter";
import TableColumnCounter from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/TableColumnCounter";

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
