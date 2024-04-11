import express from 'express';
import doctorRoutes from './routes/DoctorRoute';
import appointmentsRoutes from './routes/AppointmentsRoutes';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(doctorRoutes);
app.use(appointmentsRoutes);

app.listen(PORT, () => console.log(`Server rodando na porta:  ${PORT}`));
