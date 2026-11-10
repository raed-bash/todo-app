import { Box, Pagination, Paper, Typography } from "@mui/material";
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
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: "hidden" }}>
      <DataGrid
        columns={columns}
        rows={rows}
        slots={{
          pagination: () => (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mx: 2 }}>
              <Pagination
                count={Math.ceil(total / perPage)}
                onChange={(_, value) => onChangePage(value)}
                defaultPage={defaultPage}
              />
              <Typography variant="body2" color="text.secondary">
                Total: {total}
              </Typography>
            </Box>
          ),
        }}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        disableColumnFilter
        disableColumnMenu
        {...otherProps}
        sx={{
          border: 0,
          "& .MuiDataGrid-columnHeaders": { bgcolor: "action.hover" },
          "& .MuiDataGrid-columnHeaderTitle": { fontWeight: 600 },
          "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
          ...otherProps.sx,
        }}
      />
    </Paper>
  );
}

export default Table;
