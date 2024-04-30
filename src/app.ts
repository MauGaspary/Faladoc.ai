import express from 'express';
import doctorRoutes from './routes/DoctorRoute';
import appointmentsRoutes from './routes/AppointmentsRoutes';
import patientsRoutes from './routes/PatientsRoutes';
import userRoutes from './routes/UserRoutes';
import bodyParser from 'body-parser';
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
// TODO: trocar "users" para "user"
app.use('/users', userRoutes);

app.listen(PORT, () => console.log(`Server rodando na porta:  ${PORT}`));
