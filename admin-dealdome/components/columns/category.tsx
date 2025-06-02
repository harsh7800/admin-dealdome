import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Category } from "@/interfaces/category";
import { ChevronDown, ChevronUp, EditIcon, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import DeleteCategory from "@/app/(dashboard)/categories/_components/delete-category";
import Link from "next/link";

// Drag handle component
// function DragHandle({ id }: { id: UniqueIdentifier }) {
//   const { attributes, listeners } = useSortable({ id });
//   return (
//     <Button
//       {...attributes}
//       {...listeners}
//       variant="ghost"
//       size="icon"
//       className="size-7 text-muted-foreground hover:bg-transparent"
//     >
//       <GripVerticalIcon className="size-3" />
//       <span className="sr-only">Drag to reorder</span>
//     </Button>
//   );
// }

export const columns = ({
  onDelete,
  isLoading = false,
}: {
  onDelete: (id: string) => void;
  isLoading?: boolean;
}): ColumnDef<Category>[] => [
  {
    id: "expander",
    header: () => <span className="invisible">Toggle</span>, // invisible but still renders for layout
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <button
          onClick={row.getToggleExpandedHandler()}
          className={cn(
            "cursor-pointer text-blue-600 w-fit",
            row.depth > 0 ? "pl-4" : ""
          )}
        >
          {row.getIsExpanded() ? <ChevronUp /> : <ChevronDown />}
        </button>
      ) : null;
    },
  },
  {
    accessorKey: "name",
    header: "Category Name",
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  },
  {
    accessorKey: "desc",
    header: "Description",
    cell: ({ row }) => row.original.desc || "-",
  },
  {
    id: "isLeaf",
    header: "Leaf",
    cell: ({ row }) =>
      row.original.fields.length > 0 ? (
        <span className="text-green-600">Yes</span>
      ) : (
        <span className="text-gray-500">No</span>
      ),
  },
  {
    accessorFn: (row) => row.fields.length,
    header: "Fields Count",
    cell: ({ row }) => row.original.fields.length || "-",
  },
  {
    accessorFn: (row) => row.brands.length,
    header: "Brands Count",
    cell: ({ row }) => row.original.brands.length || "-",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-0 mx-auto">
        <Link href={`/categories/add/${row.original._id}`}>
          <Button
            size="sm"
            variant={"ghost"}
            disabled={row.original.fields.length !== 0}
            className={cn(
              "text-blue-500 hover:bg-blue-100 hover:text-blue-700"
              // row.original.fields.length === 0 && "invisible"
            )}
          >
            <PlusIcon />
          </Button>
        </Link>
        <Link href={`/categories/edit/${row.original._id}`}>
          <Button
            size="sm"
            className="
          text-yellow-500 hover:bg-yellow-100 hover:text-yellow-700"
            variant={"ghost"}
          >
            <EditIcon />
          </Button>
        </Link>
        <DeleteCategory
          onDelete={async () => onDelete(row.original._id)}
          isLoading={isLoading}
        />
      </div>
    ),
  },
];
