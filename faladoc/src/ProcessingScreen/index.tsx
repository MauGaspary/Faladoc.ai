import { View, Text, ActivityIndicator } from "react-native";
import {styles} from './styles'
import { HomeButton } from "../../components/homebutton";
import { useEffect } from "react";
import axios from 'axios';

type props = {
    patient : string
    hospital: string;
    contexto : string;
    duration : string;
    appointment_id: string;
};

export function ProcessingScreen( {patient, hospital, contexto, duration, appointment_id}: props ){

    useEffect(() => {
        updateAppointment()
    }, [])

    const updateAppointment = async () => {
        try {
            const body = {
                medical_record_original: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam dignissimos inventore porro tenetur iusto, quae tempora numquam corrupti dolor voluptas soluta commodi neque aperiam earum accusantium ipsa? Et, quae esse Reprehenderit corporis corrupti ullam, aut fuga nulla deleniti ducimus modi error quam possimus sunt explicabo nobis consectetur veritatis vitae id sequi in aspernatur commodi aperiam qui inventore maiores. Distinctio, ex",
                duration: 35
            }
            // const res = await axios.patch(`http://localhost:3000/appointments/${appointment_id}`, body)
            const res = await axios.patch(`http://localhost:3000/appointments/580f652d-7db8-4354-aebf-dcdd16639674`, body)
            console.log(res.data)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.text}>
                     Paciente: {patient}{"\n"}
                     Hospital: {hospital}{"\n"}
                     Contexto: {contexto}{"\n"}
                     ID: {appointment_id}{"\n \n"}
                     Duração: {duration}
            </Text>
            <ActivityIndicator size={70} color={'grey'}/>
            <Text>
                {"\n \n"}
            </Text>
            <HomeButton name='Voltar para a tela inicial'/>
        </View>
    )
}
