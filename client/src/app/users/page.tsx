"use client";

import { useGetUsersQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { GridColDef } from "@mui/x-data-grid";
import { CustomTable } from "@/shared";

const columns: GridColDef[] = [
  {
    field: "userId",
    headerName: "ID",
    flex: 2, // This will make the column dynamically resize
    minWidth: 50,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 3, // Larger flex value to give more space
    minWidth: 150,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 3, // Larger flex value to give more space
    minWidth: 150,
  },
];

const Users = () => {
  const { data: users, isError, isLoading } = useGetUsersQuery();

  return (
    <div className="flex flex-col">
      <Header name="Users" />
      {isError ? (
        <div className="text-center text-red-500 py-4">
          Failed to fetch users
        </div>
      ) : (
        <CustomTable
          rows={users}
          columns={columns}
          getRowId={(row) => row.userId}
          checkboxSelection
          loading={isLoading}
        />
      )}
    </div>
  );
};

export default Users;
