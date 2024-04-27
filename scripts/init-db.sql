DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS patients;
DROP TABLE IF EXISTS admins;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS doctors;
DROP TYPE IF EXISTS Status;
DROP TYPE IF EXISTS UserType;


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
  user_id uuid NOT NULL,
  name VARCHAR(255) NOT NULL,
  crm VARCHAR(255) UNIQUE NOT NULL,
  hospital VARCHAR(255),
  specialty VARCHAR(255)
);

CREATE TABLE users (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  passwordHash VARCHAR(255) NOT NULL,
  passwordSalt VARCHAR(255) NOT NULL
  userType UserType NOT NULL
);

CREATE TABLE admins (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE patients (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  cpf VARCHAR(11) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL
);

CREATE TABLE appointments (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  doctor uuid NOT NULL,
  patient_id uuid NOT NULL,
  appointment_context TEXT,
  medical_record_original TEXT,
  medical_record_final TEXT,
  appointment_date DATE NOT NULL,
  duration integer NOT NULL,
  hospital varchar(255),
  appointment_status Status NOT NULL
);

CREATE TABLE PasswordReset (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid NOT NULL,
  token VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  expiration_date DATE NOT NULL
);

ALTER TABLE doctors ADD CONSTRAINT fk_doctors_user_id FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE admins ADD CONSTRAINT fk_admins_user_id FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE appointments ADD FOREIGN KEY (doctor_id) REFERENCES doctors (id);
ALTER TABLE appointments ADD FOREIGN KEY (patient_id) REFERENCES patients (id);
ALTER TABLE PasswordReset ADD FOREIGN KEY (user_id) REFERENCES users (id);
