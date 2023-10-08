import { createContext, useContext } from "react";

interface IAppContext {
  form: FormFormElement | FormWrapperElement | null;
}

export const AppContext = createContext<IAppContext>({ form: null });

export const useAppContext = () => useContext(AppContext);
