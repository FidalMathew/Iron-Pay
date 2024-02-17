import { createContext, useContext } from "react";

export const IronfishAccountContext = createContext();

export const useIronfishAccountContext = () =>
  useContext(IronfishAccountContext);
