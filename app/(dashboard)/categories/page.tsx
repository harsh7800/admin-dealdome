"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCategories, deleteCategory } from "@/app/api/categories";
import { DataTable } from "@/components/data-table";
import { columns as rawColumns } from "@/components/columns/category";
import { useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function CategoriesTable() {
  const queryClient = useQueryClient();

  const {
    data: categories,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 0,
  });

  const { mutate: handleDelete } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      refetch();
      toast.success("Category deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
        refetchType: "active", // forces immediate refetch of active queries
      });
      queryClient.refetchQueries({ queryKey: ["categories"] }); // force refetch
    },
  });

  // Pass the delete function to the column definition
  const columns = useMemo(
    () => rawColumns({ onDelete: handleDelete }),
    [handleDelete]
  );

  return (
    <div className="p-4 w-full">
      <div className="w-full flex items-center justify-end mb-4">
        <Button asChild variant="default">
          <Link href={"/categories/new"} className="text-sm">
            Add New Category
          </Link>
        </Button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading categories</p>
      ) : (
        <DataTable
          showPagination={false}
          data={categories}
          columns={columns}
          pageSize={1000}
        />
      )}
    </div>
  );
}
