import { createContext, useContext, useState } from "react";

const CabinTableContext = createContext();

export default function CabinTableProvider({ children }) {
  const [sorting, setSorting] = useState([]);

  function sortBy(id, desc) {
    setSorting([{ id, desc }]);
  }

  return (
    <CabinTableContext value={{ sorting, setSorting, sortBy }}>
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
