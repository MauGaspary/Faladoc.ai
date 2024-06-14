import axios from "axios";
import { parseString } from 'xml2js';

interface DoctorCfmData {
    crm: string;
    lastUpdated: string;
    speciality: string;
    name: string;
    type: string;
}

const createSoapEnvelope = (crm : string, state : string): string => {
    return `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servico.cfm.org.br/">
       <soapenv:Header/>
       <soapenv:Body>
          <ser:Consultar>
             <crm>${crm}</crm>
             <uf>${state}</uf>
             <chave>${process.env.CFM_KEY}</chave>
          </ser:Consultar>
       </soapenv:Body>
    </soapenv:Envelope>
    `;
};

export class CfmService {
    public static async findDoctorData(crm: string, state: string) {
      try {
        const xmlData = createSoapEnvelope(crm, state);
        const response = await axios.post(process.env.CFM_API_URL, xmlData);
        const jsonData = await parseXml(response.data);

        if (!jsonData['soap:Envelope'] ||
            !jsonData['soap:Envelope']['soap:Body'] ||
            !jsonData['soap:Envelope']['soap:Body'][0]['ns2:ConsultarResponse'] ||
            !jsonData['soap:Envelope']['soap:Body'][0]['ns2:ConsultarResponse'][0]['dadosMedico']) {
            return null;
        }

        const doctorCfmData: DoctorCfmData = {
            crm: jsonData['soap:Envelope']['soap:Body'][0]['ns2:ConsultarResponse'][0]['dadosMedico'][0]['crm'][0],
            lastUpdated: jsonData['soap:Envelope']['soap:Body'][0]['ns2:ConsultarResponse'][0]['dadosMedico'][0]['dataAtualizacao'][0],
            speciality: jsonData['soap:Envelope']['soap:Body'][0]['ns2:ConsultarResponse'][0]['dadosMedico'][0]['especialidade'][0],
            name: jsonData['soap:Envelope']['soap:Body'][0]['ns2:ConsultarResponse'][0]['dadosMedico'][0]['nome'][0],
            type: jsonData['soap:Envelope']['soap:Body'][0]['ns2:ConsultarResponse'][0]['dadosMedico'][0]['tipoInscricao'][0]
        };
        
        return doctorCfmData;
      } catch (error) {
        console.error(error);
        throw new Error("Erro ao buscar dados na API do CFM");
      }
    }
  }

  const parseXml = (xmlData: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        parseString(xmlData, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};