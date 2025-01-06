"use client";

import { useGetProductsQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { GridColDef } from "@mui/x-data-grid";
import { Box, LinearProgress, Pagination } from "@mui/material";
import { usePagination } from "@/shared/hooks/usePagination";

const columns: GridColDef[] = [
  { field: "productId", headerName: "ID" },
  { field: "name", headerName: "Product Name" },
  {
    field: "price",
    headerName: "Price",

    type: "number",
    valueGetter: (value, row) => `$${row.price}`,
  },
  {
    field: "rating",
    headerName: "Rating",

    type: "number",
    valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    type: "number",
  },
];

const Inventory = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery();

  const {
    page,
    paginatedData: paginatedProducts,
    totalPages,
    handlePageChange,
  } = usePagination(products);
  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
      {isError ? (
        <div className="text-center text-red-500 py-4">
          Failed to fetch products
        </div>
      ) : (
        <>
          {isLoading ? (
            <Box sx={{ width: "100%" }} mt={5}>
              <LinearProgress />
            </Box>
          ) : (
            <TableContainer component={Paper} className="mt-5">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {columns.map((item, index) => (
                      <TableCell key={index}>{item.headerName}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedProducts?.map((row) => (
                    <TableRow
                      key={row.productId}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.productId}
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.price}</TableCell>
                      <TableCell align="left">{row.rating}</TableCell>
                      <TableCell align="left">{row.stockQuantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {!isLoading && products && (
            <div className="flex justify-center items-center my-[2rem]">
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Inventory;
