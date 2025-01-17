import Border from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Border";
import ColumnCounter from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ColumnCounter";
import RowCounter from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/RowCounter";
import BackgroundColor from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/BackgroundColor";
import TextColor from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/TextColor";
import StripedRow from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/StripedRow";

const TableLayout = () => {
  return (
    <div className="flex flex-col gap-1">
      <ColumnCounter />
      <RowCounter />
      <Border />
      <BackgroundColor />
      <TextColor />
      <StripedRow />
      <StripedRow />
      <StripedRow />
      <StripedRow />
    </div>
  );
};

export default TableLayout;
