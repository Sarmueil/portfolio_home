import { useState, createContext, useContext, ReactNode } from "react";

interface State {
  isLightTheme: boolean;
  isModalOpen:boolean;
}

interface ContextValue extends State {
  lightTheme: boolean;
  switchLightTheme: () => void;
  switchDarkTheme: () => void;
  open:boolean;
  openModal: () => void;
  closenModal: () => void;
}

const initialState: State = {
  isLightTheme: false,
  isModalOpen:false
};

const StoreContext = createContext<ContextValue | undefined>(undefined);

export const useStoreContext = (): ContextValue => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStoreContext must be used within a StoreContextProvider");
  }
  return context;
};

interface StoreContextProviderProps {
  children: ReactNode;
}

export const StoreContextProvider = ({ children }: StoreContextProviderProps) => {
  const [lightTheme, setLightTheme] = useState(initialState.isLightTheme);
  const [open, setOpen] = useState(initialState.isModalOpen)

  const switchLightTheme = () => {
    setLightTheme(true);
  };

  const switchDarkTheme = () => {
    setLightTheme(false);
  }

  const openModal = () => {
    setOpen(true)
  }

  const closenModal = () => {
    setOpen(false)
  }

  const contextValue: ContextValue = {
    ...initialState,
    lightTheme,
    switchLightTheme,
    switchDarkTheme,
    open,
    openModal,
    closenModal
  };

  return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
};
