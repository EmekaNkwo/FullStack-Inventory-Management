"use client";

import { useGetProductsQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CustomTable } from "@/shared";

const columns: GridColDef[] = [
  { field: "productId", headerName: "ID", flex: 2, minWidth: 50 },
  { field: "name", headerName: "Product Name", flex: 3, minWidth: 200 },
  {
    field: "price",
    headerName: "Price",
    flex: 2, // This will make the column dynamically resize
    minWidth: 50,
    type: "number",
    valueGetter: (value, row) => `$${row.price}`,
  },
  {
    field: "rating",
    headerName: "Rating",
    flex: 1, // This will make the column dynamically resize
    minWidth: 50,
    type: "number",
    valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    flex: 2, // This will make the column dynamically resize
    minWidth: 50,
    type: "number",
  },
];

const Inventory = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery();

  if (isError) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
      <CustomTable
        rows={products}
        columns={columns}
        getRowId={(row) => row.productId}
        checkboxSelection
        loading={isLoading}
      />
    </div>
  );
};

export default Inventory;
