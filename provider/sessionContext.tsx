import React, { useState, createContext } from "react";
import { PatientDTO } from "../types/PatientDTO";
import { AppointmentDTO } from "../types/AppointmentDTO";
import { DoctorDTO } from "../types/DoctorDTO";

interface ContextType {
  uriPath: string;
  setUri: (value: string) => void;
  patientInfo: PatientDTO;
  setPatientInfo: (value: PatientDTO) => void;
  appoitmentInfos: AppointmentDTO;
  setAppoitmentInfos: (value: AppointmentDTO) => void;
  doctorInfo: DoctorDTO;
  setDoctorInfo: (value: DoctorDTO) => void;
}

const SessionContext = createContext<ContextType>({
  uriPath: "",
  setUri: () => {},
  patientInfo: {
    id: "",
    name: "",
    date_of_birth: "",
    cpf: "",
  },
  setPatientInfo: () => {},
  appoitmentInfos: {
    id: "",
    hospital: "",
    contexto: "",
    duration: 0,
  },
  setAppoitmentInfos: () => {},
  doctorInfo: {
    id: "",
    name: "",
    crm: "",
    state: "",
  },
  setDoctorInfo: () => {},
});

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [uriPath, setUri] = useState("");
  const [patientInfo, setPatientInfo] = useState<PatientDTO>({
    id: "",
    name: "",
    date_of_birth: "",
    cpf: "",
  });
  const [appoitmentInfos, setAppoitmentInfos] = useState<AppointmentDTO>({
    id: "",
    hospital: "",
    contexto: "",
    duration: 0,
  });
  const [doctorInfo, setDoctorInfo] = useState<DoctorDTO>({
    id: "",
    name: "",
    crm: "",
    state: "",
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
        doctorInfo,
        setDoctorInfo,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
