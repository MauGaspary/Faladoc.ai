import express from 'express';
import doctorRoutes from './routes/DoctorRoute';
import appointmentsRoutes from './routes/AppointmentsRoutes';
import patientsRoutes from './routes/PatientsRoutes';
import passwordResetRoutes from './routes/PasswordResetRoutes';
import userRoutes from './routes/UserRoutes';
import bodyParser from 'body-parser';
import loginRoutes from './routes/LoginRoutes';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
 cors({
   credentials: true,
   origin: process.env.CORS_ORIGIN
 })
);
app.use(doctorRoutes);
app.use(appointmentsRoutes);
app.use(patientsRoutes);
app.use(userRoutes);
<<<<<<< HEAD
app.use(passwordResetRoutes);
=======
app.use(loginRoutes);
>>>>>>> fee513781c85f56a38cc16451d9de1f1386e9cd5

app.listen(PORT, () => console.log(`Server rodando na porta:  ${PORT}`));
