DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS patients;
DROP TABLE IF EXISTS admins;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS doctors;
DROP TABLE IF EXISTS PasswordReset;
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
  passwordSalt VARCHAR(255) NOT NULL,
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

CREATE TABLE password_resets (
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
ALTER TABLE password_resets ADD FOREIGN KEY (user_id) REFERENCES users (id);

insert into users (id, email, passwordHash, passwordSalt, usertype) values ('add9827e-3107-4ce7-ab95-6bb140043888', 'admin@admin.com', '123e4567-e89b-12d3-a456-426614174002', 'saltexample', 'ADMIN');
insert into users (id, email, passwordHash, passwordSalt, usertype) values ('add9827e-3107-4ce7-ab95-6bb140043835', 'pedrow@admin.com', '123e4567-e89b-12d3-a456-426614174002', 'saltexample', 'DOCTOR');
insert into users (id, email, passwordHash, passwordSalt, usertype) values ('45d282d5-b8ca-4d73-9b88-c0b01c30cb70', 'dra.amanda@gmail.com', '123e4567-e89b-12d3-a456-426614174602', 'saltexample', 'DOCTOR');
insert into users (id, email, passwordHash, passwordSalt, usertype) values ('3bc44001-699f-4abc-bee4-6567913e3ced', 'carlosoli@gmail.com', '123e4567-e89b-12d3-a456-426614174602', 'saltexample', 'DOCTOR');
insert into users (id, email, passwordHash, passwordSalt, usertype) values ('4cd17688-9e25-4b66-8a7e-834ace516984', 'fersantos@gmail.com', '123e4567-e89b-12d3-a456-426614174602', 'saltexample', 'DOCTOR');
insert into users (id, email, passwordHash, passwordSalt, usertype) values ('85a9e691-121b-4609-b9b7-9d2d91f9836c', 'rafaalmeida85@gmail.com', '123e4567-e89b-12d3-a456-426614174602', 'saltexample', 'DOCTOR');
insert into users (id, email, passwordHash, passwordSalt, usertype) values ('4830a33a-b1ad-4b6f-8883-74dca571ebae', 'juu_costa@gmail.com', '123e4567-e89b-12d3-a456-426614174602', 'saltexample' , 'DOCTOR');
insert into users (id, email, passwordHash, passwordSalt, usertype) values ('fbcd681b-e5c0-4f6e-8b68-fc1177d29f6e', 'p.henrique@gmail.com', '123e4567-e89b-12d3-a456-426614174602', 'saltexample', 'DOCTOR');
insert into users (id, email, passwordHash, passwordSalt, usertype) values ('64abddd6-4524-43a4-bf30-5ad9a31fc709', 'lu.oliveira@gmail.com', '123e4567-e89b-12d3-a456-426614174602', 'saltexample', 'DOCTOR');
insert into users (id, email, passwordHash, passwordSalt, usertype) values ('f250caae-2da4-42de-81d0-b766c86343d7', 'guisilva@gmail.com', '123e4567-e89b-12d3-a456-426614174602', 'saltexample', 'DOCTOR');
insert into users (id, email, passwordHash, passwordSalt, usertype) values ('3693bf18-adbb-4cde-b371-cd50a82bb11d', 'mariana.lima@gmail.com', '123e4567-e89b-12d3-a456-426614174602', 'saltexample', 'DOCTOR');
insert into users (id, email, passwordHash, passwordSalt, usertype) values ('baa9e6a1-8ec1-4b9d-9187-74a405643fec', 'felipesantos@gmail.com', '123e4567-e89b-12d3-a456-426614174602', 'saltexample', 'DOCTOR');
insert into users (id, email, passwordHash, passwordSalt, usertype) values ('8c5d6127-b3f2-445e-aa4a-953ba13da12e', 'camialves@gmail.com', '123e4567-e89b-12d3-a456-426614174602', 'saltexample' , 'DOCTOR');
insert into users (id, email, passwordHash, passwordSalt, usertype) values ('71fbc378-890f-4fff-a79d-74efd1d2317c', 'rodrigolia@gmail.com', '123e4567-e89b-12d3-a456-426614174602', 'saltexample', 'DOCTOR');
insert into users (id, email, passwordHash, passwordSalt, usertype) values ('2baebdc7-b02b-4c4d-b049-fa68df9141a9', 'isabela_s@gmail.com', '123e4567-e89b-12d3-a456-426614174602', 'saltexample', 'DOCTOR');
insert into users (id, email, passwordHash, passwordSalt, usertype) values ('41e817a9-d9f5-4248-a278-365ef3caf891', 'guslima@gmail.com', '123e4567-e89b-12d3-a456-426614174602', 'saltexample', 'DOCTOR');
insert into users (id, email, passwordHash, passwordSalt, usertype) values ('172c279a-70b7-437d-b754-4c32c9730407', 'ana.p@gmail.com', '123e4567-e89b-12d3-a456-426614174602', 'saltexample', 'DOCTOR');
insert into users (id, email, passwordHash, passwordSalt, usertype) values ('27733d75-55cb-46f3-a9f2-68f39a29fd3c', 'edu.silva@gmail.com', '123e4567-e89b-12d3-a456-426614174602', 'saltexample', 'DOCTOR');
insert into users (id, email, passwordHash, passwordSalt, usertype) values ('7e1e27e8-1592-4791-97f5-4763e8df5e93', 'carolina.olive@gmail.com', '123e4567-e89b-12d3-a456-426614174602', 'saltexample', 'DOCTOR');
insert into users (id, email, passwordHash, passwordSalt, usertype) values ('445dd62d-b64b-4f3e-9a91-bdd4efa4b8f0', 'paulo_henri@gmail.com', '123e4567-e89b-12d3-a456-426614174602', 'saltexample', 'DOCTOR');
insert into users (id, email, passwordHash, passwordSalt, usertype) values ('3805ad4d-e70d-4a67-b376-82893f7a3c18', 'fercosta2@gmail.com', '123e4567-e89b-12d3-a456-426614174602', 'saltexample', 'DOCTOR');
insert into users (id, email, passwordHash, passwordSalt, usertype) values ('f131f2ad-e3aa-4cce-97dd-c7ab999af9d9', 'lucas_santos@gmail.com', '123e4567-e89b-12d3-a456-426614174602', 'saltexample', 'DOCTOR');


insert into doctors (id, user_id, name, crm, hospital, specialty) values ('add9827e-3107-4ce7-ab95-6bb140043834', 'add9827e-3107-4ce7-ab95-6bb140043835', 'Dr. Pedro', '1234567', 'Hospital A', 'Cardiologista');
insert into doctors (id, user_id, name, crm, hospital, specialty) values ('45d282d5-b8ca-4d73-9b88-c0b01c30cb69','45d282d5-b8ca-4d73-9b88-c0b01c30cb70', 'Amanda Silva Adams', '232326', 'Ernesto Dornelles', 'Clínico Geral');
insert into doctors (id, user_id, name, crm, hospital, specialty) values ('3bc44001-699f-4abc-bee4-6567913e3cec', '3bc44001-699f-4abc-bee4-6567913e3ced', 'Carlos Oliveira Pieber', '654321', 'Ernesto Dornelles', 'Cardiologista');
insert into doctors (id, user_id, name, crm, hospital, specialty) values ('4cd17688-9e25-4b66-8a7e-834ace516983', '4cd17688-9e25-4b66-8a7e-834ace516984', 'Fernanda Santos Alameda', '987654', 'Hospital São Lucas', 'Geral e Ortopedia');
insert into doctors (id, user_id, name, crm, hospital, specialty) values ('85a9e691-121b-4609-b9b7-9d2d91f9836b', '85a9e691-121b-4609-b9b7-9d2d91f9836c', 'Rafael Almeid, user_ida Filho', '246810', 'Hospital Santa Clara', 'Psiquiatra');
insert into doctors (id, user_id, name, crm, hospital, specialty) values ('4830a33a-b1ad-4b6f-8883-74dca571ebad', '4830a33a-b1ad-4b6f-8883-74dca571ebae', 'Juliana Costa Spencer', '135790', 'Hospital Nossa Senhora', 'Clínico Geral');
insert into doctors (id, user_id, name, crm, hospital, specialty) values ('fbcd681b-e5c0-4f6e-8b68-fc1177d29f6d', 'fbcd681b-e5c0-4f6e-8b68-fc1177d29f6e', 'Pedro Henrique da Rosa', '750951', 'Hospital de Clínicas Porto Alegre', 'Clínico Geral');
insert into doctors (id, user_id, name, crm, hospital, specialty) values ('64abddd6-4524-43a4-bf30-5ad9a31fc708', '64abddd6-4524-43a4-bf30-5ad9a31fc709', 'Luiza Oliveira Schneid, user_ider', '369258', 'Hospital São João', 'Clínico Geral');
insert into doctors (id, user_id, name, crm, hospital, specialty) values ('f250caae-2da4-42de-81d0-b766c86343d6', 'f250caae-2da4-42de-81d0-b766c86343d7', 'Guilherme Silva da Silva', '975318', 'Hospital Santa Casa de Misericórdia', 'Urologista');
insert into doctors (id, user_id, name, crm, hospital, specialty) values ('3693bf18-adbb-4cde-b371-cd50a82bb11c', '3693bf18-adbb-4cde-b371-cd50a82bb11d', 'Mariana Lima Portinoli', '123789', 'Hospital de Clínicas Porto Alegre', 'Clínico Geral');
insert into doctors (id, user_id, name, crm, hospital, specialty) values ('baa9e6a1-8ec1-4b9d-9187-74a405643feb', 'baa9e6a1-8ec1-4b9d-9187-74a405643fec', 'Felipe Santos Pereira', '456123', 'Hospital Albert Einstein', 'Clínico Geral');
insert into doctors (id, user_id, name, crm, hospital, specialty) values ('8c5d6127-b3f2-445e-aa4a-953ba13da12d', '8c5d6127-b3f2-445e-aa4a-953ba13da12e', 'Camila Alves da Cunha', '789456', 'Ernesto Dornelles', 'Clínico Geral');
insert into doctors (id, user_id, name, crm, hospital, specialty) values ('71fbc378-890f-4fff-a79d-74efd1d2317b', '71fbc378-890f-4fff-a79d-74efd1d2317c', 'Rodrigo Oliveira Kuhn', '322654', 'Hospital Santa Rita', 'Clínico Geral');
insert into doctors (id, user_id, name, crm, hospital, specialty) values ('2baebdc7-b02b-4c4d-b049-fa68df9141a8', '2baebdc7-b02b-4c4d-b049-fa68df9141a9', 'Isabela Souza Sato', '654977', 'Hospital Santa Mônica', 'Cardiologista');
insert into doctors (id, user_id, name, crm, hospital, specialty) values ('41e817a9-d9f5-4248-a278-365ef3caf890', '41e817a9-d9f5-4248-a278-365ef3caf891', 'Gustavo Lima Lewis', '987321', 'Hospital de Clínicas Porto Alegre', 'Cardiologista');
insert into doctors (id, user_id, name, crm, hospital, specialty) values ('172c279a-70b7-437d-b754-4c32c9730406', '172c279a-70b7-437d-b754-4c32c9730407', 'Ana Paula Terra', '159733', 'Hospital da Criança', 'Neurologista');
insert into doctors (id, user_id, name, crm, hospital, specialty) values ('27733d75-55cb-46f3-a9f2-68f39a29fd3b', '27733d75-55cb-46f3-a9f2-68f39a29fd3c', 'Eduardo Silva Miller', '357159', 'Ernesto Dornelles', 'Urologista');
insert into doctors (id, user_id, name, crm, hospital, specialty) values ('445dd62d-b64b-4f3e-9a91-bdd4efa4b8f1', '445dd62d-b64b-4f3e-9a91-bdd4efa4b8f0', 'Paulo Henrique Kerber', '123357', 'Hospital Santa Casa de Misericórdia', 'Clínico Geral');
insert into doctors (id, user_id, name, crm, hospital, specialty) values ('3805ad4d-e70d-4a67-b376-82893f7a3c17', '3805ad4d-e70d-4a67-b376-82893f7a3c18', 'Fernanda Costa', '246135', 'Hospital de Clínicas Porto Alegre', 'Neurologista');
insert into doctors (id, user_id, name, crm, hospital, specialty) values ('f131f2ad-e3aa-4cce-97dd-c7ab999af9d8', 'f131f2ad-e3aa-4cce-97dd-c7ab999af9d9', 'Lucas Santos', '789455', 'Hospital Santa Casa de Misericórdia', 'Ginecologista');
insert into doctors (id, user_id, name, crm, hospital) values ('7e1e27e8-1592-4791-97f5-4763e8df5e92', '7e1e27e8-1592-4791-97f5-4763e8df5e93', 'Carolina Oliveira Martins', '753159', 'Hospital das Crianças');


insert into admins (user_id, name) values ('add9827e-3107-4ce7-ab95-6bb140043888', 'Felipe');


insert into patients (id, cpf, name, Date_of_birth) values ('123e4567-e89b-12d3-a456-426614174004', '12345678901', 'João', '1990-01-01');
insert into patients (id, cpf, name, Date_of_birth) values ('123e4567-e89b-12d3-a456-426614174003', '23456789012', 'Maria', '1991-02-02');
insert into patients (id, cpf, name, Date_of_birth) values ('123e4567-e89b-12d3-a456-426614174002', '34567890123', 'José', '1992-03-03');
insert into patients (id, cpf, name, Date_of_birth) values ('123e4567-e89b-12d3-a456-426614174001', '12345678902', 'Pedro', '1990-01-01');
insert into patients (id, cpf, name, Date_of_birth) values ('da551dfc-19d5-4507-ba29-d4093bd96007', '42030243078', 'João da Silva', '2021-10-19');
insert into patients (id, cpf, name, Date_of_birth) values ('a145dde7-a9b9-43cb-a545-9b156bafb0fb', '64962658018', 'Ana Clara Fernandes Kliff', '2021-11-18');
insert into patients (id, cpf, name, Date_of_birth) values ('b33a3d14-be4f-47eb-9372-ffbd66e8bb9b', '31941097073', 'José Oliveira dos Santos', '2021-12-18');
insert into patients (id, cpf, name, Date_of_birth) values ('a78c4eb8-edd9-4d67-8a6b-3ad7b26c9b0e', '25469767027', 'Mariana Costa', '2021-10-18');
insert into patients (id, cpf, name, Date_of_birth) values ('a30f9621-c8f3-41e0-b9c6-38213e18c2a4', '18845374050', 'Carlos Eduardo', '2021-10-13');
insert into patients (id, cpf, name, Date_of_birth) values ('ed605fec-8e4d-409b-b058-273da7fb04a6', '69137906003', 'Aline Rodrigues', '2021-10-14');
insert into patients (id, cpf, name, Date_of_birth) values ('e444aa8f-fe32-4c59-8f4c-01cd13a2c847', '40155961020', 'Fernando Almeida', '2021-10-15');
insert into patients (id, cpf, name, Date_of_birth) values ('626fb5aa-3ec4-422b-b240-bf0d381f09a7', '58204184093', 'Luana Oliveira', '2021-10-15');
insert into patients (id, cpf, name, Date_of_birth) values ('716790cd-b3d7-44e5-a118-6a9b20182d17', '10528259075', 'Ricardo Santos', '2021-10-16');
insert into patients (id, cpf, name, Date_of_birth) values ('ea6a892a-ea17-4e45-a1fa-3a35a35950a1', '63611001031', 'Priscila Becker', '2021-12-16');
insert into patients (id, cpf, name, Date_of_birth) values ('a7d4c070-054f-4bd7-b5f7-c23c6a285ca1', '48935448028', 'Martina Koch', '2021-01-08');
insert into patients (id, cpf, name, Date_of_birth) values ('b81491db-dd09-43a0-964e-45835f4a7836', '25276213097', 'Augusto Zimmerman Pilato', '2021-10-17');
insert into patients (id, cpf, name, Date_of_birth) values ('c6d13318-2df8-4bc7-8df8-30691853a699', '58693180096', 'Richard Weber de Souza Santacruz', '2021-10-29');
insert into patients (id, cpf, name, Date_of_birth) values ('42a3b398-31d5-4989-b7ad-89c65c311d53', '86099927050', 'Enzo Portinolli Schneider', '2021-04-18');
insert into patients (id, cpf, name, Date_of_birth) values ('fcad7e5f-9804-4263-9a7b-aac5d517df95', '26107106073', 'Marla Becker', '2021-09-18');


INSERT INTO appointments (doctor_id, patient_id, appointment_context, medical_record_original, medical_record_final,  appointment_date, duration, hospital, appointment_status) values ('45d282d5-b8ca-4d73-9b88-c0b01c30cb69', 'da551dfc-19d5-4507-ba29-d4093bd96007', 'Consulta de pré-natal', 'Gravação original 3', 'Gravação final 3', '2021-06-18', '15', 'Hospital São Lucas', 'WAITING_APPROVAL');
INSERT INTO appointments (doctor_id, patient_id, appointment_context, medical_record_original, medical_record_final,  appointment_date, duration, hospital, appointment_status) values ('3bc44001-699f-4abc-bee4-6567913e3cec', 'a145dde7-a9b9-43cb-a545-9b156bafb0fb', 'Avaliação ortopédica', 'Gravação original 4', 'Gravação final 4', '2021-03-21', '60', 'Hospital Santa Clara', 'APPROVED');
INSERT INTO appointments (doctor_id, patient_id, appointment_context, medical_record_original, medical_record_final,  appointment_date, duration, hospital, appointment_status) values  ('85a9e691-121b-4609-b9b7-9d2d91f9836b', 'b33a3d14-be4f-47eb-9372-ffbd66e8bb9b', 'Consulta dermatológica', 'Gravação original 5', 'Gravação final 5', '2021-10-02', '53', 'Hospital Nossa Senhora', 'WAITING_APPROVAL');
INSERT INTO appointments (doctor_id, patient_id, appointment_context, medical_record_original, medical_record_final,  appointment_date, duration, hospital, appointment_status) values ('4830a33a-b1ad-4b6f-8883-74dca571ebad', 'a78c4eb8-edd9-4d67-8a6b-3ad7b26c9b0e', 'Avaliação cardiológica', 'Gravação original 6', 'Gravação final 6', '2021-08-01', '44', 'Hospital do Coração', 'PROCESSING');
INSERT INTO appointments (doctor_id, patient_id, appointment_context, medical_record_original, medical_record_final,  appointment_date, duration, hospital, appointment_status) values ('fbcd681b-e5c0-4f6e-8b68-fc1177d29f6d', 'a30f9621-c8f3-41e0-b9c6-38213e18c2a4', 'Consulta pediátrica', 'Gravação original 7', 'Gravação final 7', '2021-08-23', '15', 'Hospital São João', 'APPROVED');
INSERT INTO appointments (doctor_id, patient_id, appointment_context, medical_record_original, medical_record_final,  appointment_date, duration, hospital, appointment_status) values ('64abddd6-4524-43a4-bf30-5ad9a31fc708', 'ed605fec-8e4d-409b-b058-273da7fb04a6', 'Exame de ultrassom', 'Gravação original 8', 'Gravação final 8', '2021-03-04', '55', 'Hospital Samaritano', 'APPROVED');
INSERT INTO appointments (doctor_id, patient_id, appointment_context, medical_record_original, medical_record_final,  appointment_date, duration, hospital, appointment_status) values ('f250caae-2da4-42de-81d0-b766c86343d6', 'e444aa8f-fe32-4c59-8f4c-01cd13a2c847', 'Consulta ginecológica', 'Gravação original 9', 'Gravação final 9', '2021-03-01', '20', 'Hospital das Clínicas', 'WAITING_APPROVAL');
INSERT INTO appointments (doctor_id, patient_id, appointment_context, medical_record_original, medical_record_final,  appointment_date, duration, hospital, appointment_status) values ('3693bf18-adbb-4cde-b371-cd50a82bb11c', '626fb5aa-3ec4-422b-b240-bf0d381f09a7', 'Avaliação neurológica', 'Gravação original 10', 'Gravação final 10', '2021-08-01', '45', 'Hospital Albert Einstein', 'PROCESSING');
INSERT INTO appointments (doctor_id, patient_id, appointment_context, medical_record_original, medical_record_final,  appointment_date, duration, hospital, appointment_status) values ('baa9e6a1-8ec1-4b9d-9187-74a405643feb', '716790cd-b3d7-44e5-a118-6a9b20182d17', 'Consulta oftalmológica', 'Gravação original 11', 'Gravação final 11', '2021-04-01', '53', 'Hospital Memorial', 'APPROVED');
INSERT INTO appointments (doctor_id, patient_id, appointment_context, medical_record_original, medical_record_final,  appointment_date, duration, hospital, appointment_status) values ('8c5d6127-b3f2-445e-aa4a-953ba13da12d', 'ea6a892a-ea17-4e45-a1fa-3a35a35950a1', 'Avaliação odontológica', 'Gravação original 12', 'Gravação final 12', '2021-04-01', '44', 'Hospital Santa Rita', 'WAITING_APPROVAL');
INSERT INTO appointments (doctor_id, patient_id, appointment_context, medical_record_original, medical_record_final,  appointment_date, duration, hospital, appointment_status) values ('8c5d6127-b3f2-445e-aa4a-953ba13da12d', 'ea6a892a-ea17-4e45-a1fa-3a35a35950a1', 'Consulta psicológica', 'Gravação original 13', 'Gravação final 13', '2021-03-01', '15', 'Hospital Santa Mônica', 'WAITING_APPROVAL');
INSERT INTO appointments (doctor_id, patient_id, appointment_context, medical_record_original, medical_record_final,  appointment_date, duration, hospital, appointment_status) values ('8c5d6127-b3f2-445e-aa4a-953ba13da12d', 'a7d4c070-054f-4bd7-b5f7-c23c6a285ca1', 'Consulta gastroenterológica', 'Gravação original 14', 'Gravação final 14', '2021-04-09', '55', 'Hospital do Trabalhador', 'APPROVED');
INSERT INTO appointments (doctor_id, patient_id, appointment_context, medical_record_original, medical_record_final,  appointment_date, duration, hospital, appointment_status) values ('71fbc378-890f-4fff-a79d-74efd1d2317b', 'b81491db-dd09-43a0-964e-45835f4a7836', 'Consulta endocrinológica', 'Gravação original 15', 'Gravação final 15', '2021-03-08', '20', 'Hospital da Criança', 'PROCESSING');
INSERT INTO appointments (doctor_id, patient_id, appointment_context, medical_record_original, medical_record_final,  appointment_date, duration, hospital, appointment_status) values ('7e1e27e8-1592-4791-97f5-4763e8df5e92', 'c6d13318-2df8-4bc7-8df8-30691853a699', 'Avaliação reumatológica', 'Gravação original 16', 'Gravação final 16', '2021-04-08', '65', 'Hospital Esperança', 'ERROR');
INSERT INTO appointments (doctor_id, patient_id, appointment_context, medical_record_original, medical_record_final,  appointment_date, duration, hospital, appointment_status) values ('7e1e27e8-1592-4791-97f5-4763e8df5e92', '42a3b398-31d5-4989-b7ad-89c65c311d53', 'Consulta urológica', 'Gravação original 17', 'Gravação final 17', '2021-03-08', '53', 'Hospital das Crianças', 'APPROVED');
INSERT INTO appointments (doctor_id, patient_id, appointment_context, medical_record_original, medical_record_final,  appointment_date, duration, hospital, appointment_status) values ('445dd62d-b64b-4f3e-9a91-bdd4efa4b8f1', 'fcad7e5f-9804-4263-9a7b-aac5d517df95', 'Consulta oftalmológica', 'Gravação original 18', 'Gravação final 18', '2021-06-21', '15', 'Hospital dos Olhos', 'PROCESSING');
INSERT INTO appointments (doctor_id, patient_id, appointment_context, medical_record_original, medical_record_final,  appointment_date, duration, hospital, appointment_status) values ('3805ad4d-e70d-4a67-b376-82893f7a3c17', 'fcad7e5f-9804-4263-9a7b-aac5d517df95', 'Consulta ortopédica', 'Gravação original 19', 'Gravação final 19', '2021-10-01', '20', 'Hospital das Clínicas', 'APPROVED');
INSERT INTO appointments (doctor_id, patient_id, appointment_context, medical_record_original, medical_record_final,  appointment_date, duration, hospital, appointment_status) values ('f131f2ad-e3aa-4cce-97dd-c7ab999af9d8', 'fcad7e5f-9804-4263-9a7b-aac5d517df95', 'Exame de imagem', 'Gravação original 20', 'Gravação final 20', '2021-03-01', '44', 'Hospital São Francisco', 'ERROR');


INSERT INTO password_resets (user_id, token, expiration_date) VALUES ('add9827e-3107-4ce7-ab95-6bb140043835', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', '2024-12-31');
INSERT INTO password_resets (user_id, token, expiration_date) VALUES ('45d282d5-b8ca-4d73-9b88-c0b01c30cb70', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', '2024-12-31');
INSERT INTO password_resets (user_id, token, expiration_date) VALUES ('3bc44001-699f-4abc-bee4-6567913e3ced', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', '2024-12-31');
INSERT INTO password_resets (user_id, token, expiration_date) VALUES ('4cd17688-9e25-4b66-8a7e-834ace516984', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', '2024-12-31');
INSERT INTO password_resets (user_id, token, expiration_date) VALUES ('85a9e691-121b-4609-b9b7-9d2d91f9836c', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', '2024-12-31');
INSERT INTO password_resets (user_id, token, expiration_date) VALUES ('4830a33a-b1ad-4b6f-8883-74dca571ebae', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', '2024-12-31');
INSERT INTO password_resets (user_id, token, expiration_date) VALUES ('fbcd681b-e5c0-4f6e-8b68-fc1177d29f6e', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', '2024-12-31');
INSERT INTO password_resets (user_id, token, expiration_date) VALUES ('64abddd6-4524-43a4-bf30-5ad9a31fc709', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', '2024-12-31');
INSERT INTO password_resets (user_id, token, expiration_date) VALUES ('f250caae-2da4-42de-81d0-b766c86343d7', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', '2024-12-31');
INSERT INTO password_resets (user_id, token, expiration_date) VALUES ('3693bf18-adbb-4cde-b371-cd50a82bb11d', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', '2024-12-31');
INSERT INTO password_resets (user_id, token, expiration_date) VALUES ('baa9e6a1-8ec1-4b9d-9187-74a405643fec', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', '2024-12-31');
INSERT INTO password_resets (user_id, token, expiration_date) VALUES ('8c5d6127-b3f2-445e-aa4a-953ba13da12e', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', '2024-12-31');
INSERT INTO password_resets (user_id, token, expiration_date) VALUES ('71fbc378-890f-4fff-a79d-74efd1d2317c', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', '2024-12-31');
INSERT INTO password_resets (user_id, token, expiration_date) VALUES ('2baebdc7-b02b-4c4d-b049-fa68df9141a9', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', '2024-12-31');
INSERT INTO password_resets (user_id, token, expiration_date) VALUES ('41e817a9-d9f5-4248-a278-365ef3caf891', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', '2024-12-31');
INSERT INTO password_resets (user_id, token, expiration_date) VALUES ('172c279a-70b7-437d-b754-4c32c9730407', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', '2024-12-31');
INSERT INTO password_resets (user_id, token, expiration_date) VALUES ('27733d75-55cb-46f3-a9f2-68f39a29fd3c', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', '2024-12-31');
INSERT INTO password_resets (user_id, token, expiration_date) VALUES ('7e1e27e8-1592-4791-97f5-4763e8df5e93', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', '2024-12-31');
INSERT INTO password_resets (user_id, token, expiration_date) VALUES ('445dd62d-b64b-4f3e-9a91-bdd4efa4b8f0', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', '2024-12-31');
INSERT INTO password_resets (user_id, token, expiration_date) VALUES ('3805ad4d-e70d-4a67-b376-82893f7a3c18', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', '2024-12-31');
INSERT INTO password_resets (user_id, token, expiration_date) VALUES ('f131f2ad-e3aa-4cce-97dd-c7ab999af9d9', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', '2024-12-31');
