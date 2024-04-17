import { View, Text, ActivityIndicator, Dimensions } from "react-native";
import { HomeButton } from "..//components/homebutton";
import { useEffect } from "react";
import axios from 'axios';

type props = {
    patient : string
    hospital: string;
    contexto : string;
    duration : string;
    appointment_id: string;
};
const styles = StyleSheet.arguments({
    container: {
        alignContent: 'flex-start',
        backgroundColor: '#afeeee',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 0,
    },
    text: {
        color: '#000000',
        marginVertical:1,
        padding:   40,
        textAlign: 'left',
        fontSize : 22,
    },
})

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

    const { width, height } = Dimensions.get('window');

    return(
        <View style={[styles.container, {width, height}]}>
            <Text style={styles.text}>
                    {"\n\n"}
                     Paciente: {patient}{"\n"}
                     Hospital: {hospital}{"\n"}
                     Contexto: {contexto}{"\n"}
                     ID: {appointment_id}{"\n\n"}
                     Duração: {duration}{"\n\n\n "}
                     Processando
            </Text>
            <ActivityIndicator size={70} color={'grey'}/>
            <Text>
                {"\n\n"}
            </Text>
            <HomeButton name='Voltar para a tela inicial'/>
            <Text>
                {"\n\n"}
            </Text>
        </View>
    )
}
