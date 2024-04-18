import React, { useState, createContext } from "react";
import { PatientDTO } from "../types/PatientDTO";
import { AppointmentDTO } from "../types/AppointmentDTO";

interface ContextType {
  uriPath: string;
  setUri: (value: string) => void;
  loggedDoctor: string;
  setLoggedDoctor: (value: string) => void;
  patientInfo: PatientDTO;
  setPatientInfo: (value: PatientDTO) => void;
  appoitmentInfos: AppointmentDTO;
  setAppoitmentInfos: (value: AppointmentDTO) => void;
}

const SessionContext = createContext<ContextType>({
  uriPath: "",
  setUri: () => {},
  loggedDoctor: "", 
  setLoggedDoctor: () => {},
  patientInfo: {
    id: "",
    name: "",
    date_of_birth: "",
    cpf: ""
  },
  setPatientInfo: () => {},
  appoitmentInfos: {
    id: "",
    hospital: "",
    contexto: "",
    duration: "",
  },
  setAppoitmentInfos: () => {},
});

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [uriPath, setUri] = useState("");
  const [loggedDoctor, setLoggedDoctor] = useState("add9827e-3107-4ce7-ab95-6bb140043835");
  const [patientInfo, setPatientInfo] = useState({
    id: "",
    name: "",
    date_of_birth: "",
    cpf: ""
  });
  const [appoitmentInfos, setAppoitmentInfos] = useState({
    id: "",
    hospital: "",
    contexto: "",
    duration: "",
  });

  return (
    <SessionContext.Provider
      value={{
        uriPath,
        setUri,
        patientInfo,
        setPatientInfo,
        appoitmentInfos,
        setAppoitmentInfos,
        loggedDoctor,
        setLoggedDoctor,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
