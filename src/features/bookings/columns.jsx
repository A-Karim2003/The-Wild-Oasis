const headerStyles = "flex items-center gap-2 text-sm md:text-lg";

const statusStyles = {
  "checked-in":
    "px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200",
  "checked-out":
    "px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200",
  unconfirmed:
    "px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200",
};

export const columns = [
  {
    accessorFn: (row) => row.cabins?.name,
    id: "cabin",
    header: () => <div className={headerStyles}>CABIN</div>,
    cell: (info) => (
      <span className="whitespace-normal">{info.getValue() || "N/A"}</span>
    ),
  },

  {
    accessorFn: (row) => row.guests?.name,
    id: "guest",
    header: () => <div className={headerStyles}>GUEST</div>,
    cell: (info) => (
      <span className="whitespace-normal">{info.getValue() || "N/A"}</span>
    ),
  },

  {
    accessorFn: (row) => row.start_date,
    id: "dates",
    header: () => <div className={headerStyles}>DATES</div>,
    cell: (info) => {
      const row = info.row.original;
      const startDate = new Date(row.start_date).toLocaleDateString();
      const endDate = new Date(row.end_date).toLocaleDateString();
      return (
        <span className="whitespace-normal">
          {startDate} - {endDate}
        </span>
      );
    },
  },

  {
    accessorKey: "status",
    header: () => <div className={headerStyles}>STATUS</div>,
    cell: (info) => {
      const status = info.getValue();
      console.log(status);

      return (
        <span className="whitespace-normal capitalize">{info.getValue()}</span>
      );
    },
  },

  {
    accessorFn: (row) => row.cabin_price + row.extras_price,
    id: "amount",
    header: () => <div className={headerStyles}>AMOUNT</div>,
    cell: (info) => (
      <span className="whitespace-normal">${info.getValue().toFixed(2)}</span>
    ),
  },
];
