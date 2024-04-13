import { View, Text } from "react-native";
import {styles} from './styles'

import { HomeButton } from "../../components/homebutton";

type props = {
    patient : string
    hospital: string;
    contexto : string;
    duration : string;
    
};

export function ProcessingScreen( { patient, hospital, contexto, duration}: props ){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>
                     Paciente: {patient}{"\n"}
                     Hospital: {hospital}{"\n"}
                     Contexto: {contexto}{"\n \n"}
                     Duração: {duration}
            </Text>
            <HomeButton name='Voltar para a tela inicial'/>
        </View>
    )
}
