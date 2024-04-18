import React, {useState, createContext} from "react";

interface ContextType {
    uriPath: string,
    setUri: (value: string) => void;
    selectedPatient: string,
    setSelectedPatient: (value: string) => void;
  }

const SessionContext = createContext<ContextType>({
  uriPath: "", 
  setUri: () => { },
  selectedPatient: "",
  setSelectedPatient: () => { },
});

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [uriPath, setUri] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");

  return (
    <SessionContext.Provider value={{ uriPath, setUri, selectedPatient, setSelectedPatient }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;