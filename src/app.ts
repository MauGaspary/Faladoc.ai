import express from 'express';
import doctorRoutes from './routes/DoctorRoute';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(doctorRoutes);

app.listen(PORT, () => console.log(`Server rodando na porta:  ${PORT}`));
