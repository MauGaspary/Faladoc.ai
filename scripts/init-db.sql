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
  id SERIAL PRIMARY KEY,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  crm VARCHAR(255) NOT NULL,
  hospital VARCHAR(255),
  userType UserType NOT NULL
);

CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  userType UserType NOT NULL
);

CREATE TABLE patients (
  cpf VARCHAR(255) PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  Date_of_birth DATE NOT NULL
);

CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  doctor_id INTEGER NOT NULL,
  patient_cpf VARCHAR(255) NOT NULL,
  appointment_context TEXT,
  medical_record_original TEXT,
  medical_record_final TEXT,
  date DATE NOT NULL,
  duration TIME NOT NULL,
  hospital varchar(255),
  status Status NOT NULL
);

ALTER TABLE appointments ADD FOREIGN KEY (doctor_id) REFERENCES doctors (id);
ALTER TABLE appointments ADD FOREIGN KEY (patient_cpf) REFERENCES patients (cpf);

INSERT INTO doctors (password, name, email, crm, userType) VALUES
('tainha', 'Doutor Joao Neto', 'clientemeunaomata@gmail.com', 'CRM1234', 'DOCTOR'),
('tilapia', 'Doutor Saul Goodman', 'foiojimmy@gmail.com', 'CRM5678', 'DOCTOR'),
('tucupi', 'Doutor Sean Murphy', 'imasurgeondrhan@gmail.com', 'CRM9101', 'DOCTOR'),
('traira', 'Doutor Gregory House', 'tododiaumprocesso@gmail.com', 'CRM1121', 'DOCTOR'),
('tucunaré', 'Doutora Meredith Grey', 'essaserienaoacaba@gmail.com', 'CRM3141', 'DOCTOR');
