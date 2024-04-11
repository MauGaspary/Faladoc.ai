import { View, Text } from "react-native";
import {styles} from './styles'
import { HomeButton } from "../../components/homebutton";

type props = {
    patient : string
    hospital: string;
    contexto : string; 
};

export function ProcessingScreen( { patient, hospital, contexto}: props ){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>
                     Paciente: {patient}
                     Hospital: {hospital}
                     Contexto: {contexto}
            </Text>
            <HomeButton name='Voltar para a tela inicial'/>
        </View>
    )
}
