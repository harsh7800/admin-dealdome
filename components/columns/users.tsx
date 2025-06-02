import { AuthUser } from "@/interfaces/auth";
import { ColumnDef } from "@tanstack/react-table";

export const userColumns:ColumnDef<AuthUser>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "phoneNo", header: "Phone" },
  { accessorKey: "age", header: "Age" },
  {
    accessorKey: "role.name",
    header: "Role",
    cell: ({ row }) => row.original.role?.name ?? "-",
  },
  {
    accessorKey: "isVerified",
    header: "Verified",
    cell: ({ row }) =>
      row.original.isVerified ||
      row.original.phoneVerified ||
      row.original.emailVerified
        ? "✅"
        : "❌",
  },
  {
    accessorKey: "isSeller",
    header: "Seller",
    cell: ({ row }) => (row.original.isSeller ? "✅" : "❌"),
  },
  {
    accessorKey: "adsCount",
    header: "Ads Count",
    cell: ({ row }) => row.original.adsCount ?? "-",
  },
];
