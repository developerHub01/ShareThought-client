import ColumnCounter from "./ColumnCounter";
import RowCountr from "./RowCountr";

const TableLayout = () => {
  return (
    <div className="flex flex-col gap-1">
      <ColumnCounter />
      <RowCountr />
    </div>
  );
};

export default TableLayout;
