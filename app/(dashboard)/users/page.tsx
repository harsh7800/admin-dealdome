"use client";
import React from "react";
import { DataTable } from "@/components/data-table";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/app/api/users";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
      <div className="w-full flex items-center justify-end mb-4">
        <Button asChild variant="default">
          <Link href={"/categories/new-category"} className="text-sm">
            Add New Category
          </Link>
        </Button>
      </div>
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
