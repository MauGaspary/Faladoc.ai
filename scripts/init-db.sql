CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE UserType AS ENUM (
  'ADMIN',
  'DOCTOR'
);

CREATE TYPE Status AS ENUM (
  'PROCESSING',
  'ERROR',
  'WAITING_APPROVAL',
  'APPROVED'
);

CREATE TABLE doctors (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  crm VARCHAR(255) UNIQUE NOT NULL,
  hospital VARCHAR(255),
  specialty VARCHAR(255),
  userType UserType NOT NULL
);

CREATE TABLE login (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid,
  admin_id uuid,
  email VARCHAR(255) NOT NULL,
  passwordHash VARCHAR(255) NOT NULL,
  passwordSalt VARCHAR(255) NOT NULL
);

CREATE TABLE admins (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  userType UserType NOT NULL
);

CREATE TABLE patients (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  cpf VARCHAR(11) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  Date_of_birth DATE NOT NULL
);

CREATE TABLE appointments (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  doctor_id uuid NOT NULL,
  patient_id uuid NOT NULL,
  appointment_context TEXT,
  medical_record_original TEXT,
  medical_record_final TEXT,
  appointment_date DATE NOT NULL,
  duration integer NOT NULL,
  hospital varchar(255),
  appointment_status Status NOT NULL
);

ALTER TABLE appointments ADD FOREIGN KEY (doctor_id) REFERENCES doctors (id);
ALTER TABLE appointments ADD FOREIGN KEY (patient_id) REFERENCES patients (id);
ALTER TABLE login ADD FOREIGN KEY (user_id) REFERENCES doctors (id);
ALTER TABLE login ADD FOREIGN KEY (admin_id) REFERENCES admins (id);


insert into doctors (name, crm, hospital, specialty, userType) values ('
Dr. João', '123456', 'Hospital A', 'Cardiologista', 'DOCTOR');
insert into doctors (name, crm, hospital, specialty, userType) values ('
Dr. Maria', '654321', 'Hospital B', 'Pediatra', 'DOCTOR');
insert into doctors (name, crm, hospital, specialty, userType) values ('
Dr. José', '987654', 'Hospital C', 'Ortopedista', 'DOCTOR');
insert into doctors (id, name, crm, hospital, specialty, userType) values ('add9827e-3107-4ce7-ab95-6bb140043835', 'Dr. Pedro', '1234567', 'Hospital A', 'Cardiologista', 'DOCTOR');

insert into patients (cpf, name, Date_of_birth) values ('12345678901', 'João', '1990-01-01');
insert into patients (cpf, name, Date_of_birth) values ('23456789012', 'Maria', '1991-02-02');
insert into patients (cpf, name, Date_of_birth) values ('34567890123', 'José', '1992-03-03');
insert into patients (id, cpf, name, Date_of_birth) values ('123e4567-e89b-12d3-a456-426614174001', '12345678902', 'Pedro', '1990-01-01');

insert into appointments (doctor_id, patient_id, appointment_context, medical_record_original, medical_record_final, appointment_date, duration, hospital, appointment_status) values ('add9827e-3107-4ce7-ab95-6bb140043835', '123e4567-e89b-12d3-a456-426614174001', 'Consulta de rotina', 'Paciente com pressão alta', 'Paciente com pressão alta', '2021-01-01', '30', 'Hospital A', 'PROCESSING');
