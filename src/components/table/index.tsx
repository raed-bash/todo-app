import { Pagination } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type Props = {
  readonly columns: GridColDef[];
  /**
   * rows contain data
   */
  rows: any[];
  /**
   * the total number of pages
   * @default 0
   */
  total?: number;
  /**
   *
   * @param numberPage - number of page
   * @returns
   */
  onChangePage?: (numberPage: number) => void;
  /**
   * The page selected by default when the component is uncontrolled.
   * @default 1
   */
  defaultPage?: number;
  /**
   * per page
   * @default 10
   */
  perPage?: number;
};

function Table(props: Props) {
  const {
    columns,
    rows,
    total = 0,
    onChangePage = () => undefined,
    defaultPage,
    perPage = 10,
  } = props;

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      slots={{
        pagination: () => (
          <Pagination
            count={Math.ceil(total / perPage)}
            onChange={(_, value) => onChangePage(value)}
            defaultPage={defaultPage}
          />
        ),
      }}
      initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
      disableColumnFilter
      disableColumnMenu
    />
  );
}

export default Table;
