import { DataGrid, DataGridProps, GridPaginationModel } from "@mui/x-data-grid";
import { useState } from "react";

export const CustomTable = ({ ...props }: DataGridProps) => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 15,
    page: 0,
  });

  const handlePaginationModelChange = (newModel: GridPaginationModel) => {
    setPaginationModel(newModel);
  };
  return (
    <DataGrid
      className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      pagination
      paginationModel={paginationModel}
      onPaginationModelChange={handlePaginationModelChange}
      pageSizeOptions={[20, 50, 100]}
      {...props}
    />
  );
};
