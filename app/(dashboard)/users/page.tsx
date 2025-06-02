"use client";
import React from "react";
import { DataTable } from "@/components/data-table";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/app/api/users";
import { userColumns } from "@/components/columns/users";

const Page = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return (
    <section className="p-4 w-full">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading categories</p>
      ) : (
        <DataTable data={users} columns={userColumns} />
      )}
    </section>
  );
};

export default Page;
