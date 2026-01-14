import {
  ImageIcon,
  Package,
  Box,
  PoundSterling,
  Percent,
  FileText,
} from "lucide-react";

export const columns = [
  {
    accessorKey: "image_url",
    header: () => (
      <div className="flex items-center gap-2">
        <ImageIcon size={16} />
        Image
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: () => (
      <div className="flex items-center gap-2">
        <Package size={16} />
        Name
      </div>
    ),
  },
  {
    accessorKey: "capacity",
    header: () => (
      <div className="flex items-center gap-2">
        <Box size={16} />
        Capacity
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: () => (
      <div className="flex items-center gap-2">
        <PoundSterling size={16} />
        Price
      </div>
    ),
  },
  {
    accessorKey: "discount",
    header: () => (
      <div className="flex items-center gap-2">
        <Percent size={16} />
        Discount
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: () => (
      <div className="flex items-center gap-2">
        <FileText size={16} />
        Description
      </div>
    ),
  },
];
