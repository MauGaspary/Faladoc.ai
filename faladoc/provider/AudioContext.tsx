import React, {useState, createContext} from "react";

interface ContextType {
    uriPath: string,
    setUri: (value: string) => void;
  }

const audioContext = createContext<ContextType>({ uriPath: "", setUri: () => {} });

export const MyContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [uriPath, setUri] = useState("");

  return (
    <audioContext.Provider value={{ uriPath, setUri }}>
      {children}
    </audioContext.Provider>
  );
};

export default audioContext;