import React, { useContext } from "react";

const DataContext = React.createContext([]);
const useData = () => useContext(DataContext);

export { DataContext, useData };
