import { createContext, useContext, useState } from "react";

const CabinTableContext = createContext();

export default function CabinTableProvider({ children }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState();

  function sortBy(id, desc) {
    setSorting([{ id, desc }]);
  }
  function handleFilter(value) {
    switch (value) {
      case "with-discount":
        setColumnFilters([{ id: "discount", value }]);
        return;
      case "no-discount":
        setColumnFilters([{ id: "discount", value }]);
        return;
      case "all":
        setColumnFilters([]);
        return;
    }
  }

  return (
    <CabinTableContext
      value={{
        sorting,
        setSorting,
        sortBy,
        columnFilters,
        handleFilter,
      }}
    >
      {children}
    </CabinTableContext>
  );
}

export function useCabinTable() {
  const context = useContext(CabinTableContext);
  if (!context)
    throw new Error("useCabinTable must be used within a CabinTableProvider");
  return context;
}
