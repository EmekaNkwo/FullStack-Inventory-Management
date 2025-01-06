"use client";

import { useGetUsersQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { GridColDef } from "@mui/x-data-grid";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, LinearProgress, Pagination } from "@mui/material";
import { useState } from "react";
import { usePagination } from "@/shared/hooks/usePagination";

const columns: GridColDef[] = [
  {
    field: "userId",
    headerName: "ID",
  },
  {
    field: "name",
    headerName: "Name",
  },
  {
    field: "email",
    headerName: "Email",
  },
];

const Users = () => {
  const { data: users, isError, isLoading } = useGetUsersQuery();

  const {
    page,
    paginatedData: paginatedUsers,
    totalPages,
    handlePageChange,
  } = usePagination(users);
  return (
    <div className="flex flex-col w-full">
      <Header name="Users" />
      {isError ? (
        <div className="text-center text-red-500 py-4">
          Failed to fetch users
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
                    {columns.map((item) => (
                      <TableCell>{item.headerName}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedUsers?.map((row) => (
                    <TableRow
                      key={row.userId}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.userId}
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {isLoading
            ? null
            : users && (
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

export default Users;
