const headerStyles = "flex items-center gap-2 text-sm md:text-lg ";

export const columns = [
  {
    accessorKey: "cabinName",
    header: () => <div className={headerStyles}>CABIN</div>,
    cell: (info) => (
      <span className="whitespace-normal">{info.getValue()}</span>
    ),
  },
];
