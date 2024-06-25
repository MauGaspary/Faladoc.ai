import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import doctorRoutes from './routes/DoctorRoute';
import appointmentsRoutes from './routes/AppointmentsRoutes';
import patientsRoutes from './routes/PatientsRoutes';
import passwordResetRoutes from './routes/PasswordResetRoutes';
import userRoutes from './routes/UserRoutes';
import loginRoutes from './routes/LoginRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Recebendo AQUI requisição para ${req.path}`);
  console.log('Body:', req.body);
  next();
});

// Rotas
app.use(doctorRoutes);
app.use(appointmentsRoutes);
app.use(patientsRoutes);
app.use(passwordResetRoutes);
app.use(userRoutes);
app.use(loginRoutes);

app.listen(PORT, () => console.log(`Server rodando na porta: ${PORT}`));
