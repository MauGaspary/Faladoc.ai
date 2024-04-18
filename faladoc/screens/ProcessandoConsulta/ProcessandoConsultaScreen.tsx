import { View, Text, ActivityIndicator, Dimensions } from "react-native";
import {styles} from './styles'
import  HomeButton  from "../../components/Homebutton";
import { useContext, useEffect } from "react";
import axios from 'axios';
import SessionContext from "../../provider/sessionContext";

export default function ProcessandoConsultaScreen( {navigation}:any){
  
  const { appoitmentInfos, patientInfo, setAppoitmentInfos, setPatientInfo } = useContext(SessionContext);

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
            const res = await axios.patch(`http://localhost:3000/appointments/${appoitmentInfos.id}`, body)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const { width, height } = Dimensions.get('window');
    
    const handleHomeButton = () => {
      setAppoitmentInfos({
        id: '',
        duration: '',
        hospital: '',
        contexto: '',
      });
      setPatientInfo({
        id: '',
        name: '',
        date_of_birth: '',
        cpf: '',
      });
        navigation.navigate('Iniciar nova Consulta')
    }

    return(
        <View style={[styles.container, {width, height}]}>
            <Text style={styles.text}>
                    {"\n\n"}
                     Paciente: {patientInfo.name}{"\n"}
                     Hospital: {appoitmentInfos.hospital}{"\n"}
                     Contexto: {appoitmentInfos.contexto}{"\n"}
                     Duração: {appoitmentInfos.duration}{"\n\n\n "}
                     Processando
            </Text>
            <ActivityIndicator size={70} color={'grey'}/>
            <Text>
                {"\n\n"}
            </Text>
            <HomeButton name='Voltar para a tela inicial' onPress={handleHomeButton} />
            <Text>
                {"\n\n"}
            </Text>
        </View>
    )
}
