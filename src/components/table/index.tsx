import { Box, Pagination } from "@mui/material";
import { DataGrid, DataGridProps, GridColDef } from "@mui/x-data-grid";

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
} & DataGridProps &
  React.RefAttributes<HTMLDivElement>;

function Table(props: Props) {
  const {
    columns,
    rows,
    total = 0,
    onChangePage = () => undefined,
    defaultPage,
    perPage = 10,
    ...otherProps
  } = props;

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      slots={{
        pagination: () => (
          <Box sx={{ display: "flex", alignItems: "center", mx: 2 }}>
            <Pagination
              count={Math.ceil(total / perPage)}
              onChange={(_, value) => onChangePage(value)}
              defaultPage={defaultPage}
            />
            Total: {total}
          </Box>
        ),
      }}
      initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
      disableColumnFilter
      disableColumnMenu
      {...otherProps}
    />
  );
}

export default Table;
