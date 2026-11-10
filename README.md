# Faladoc.ai: voice to value in healthcare

Aplicativo mobile para médicos que **capta o áudio da consulta** e, ao final, entrega o **prontuário pronto**, gerado por Inteligência Artificial. Assim o médico atende o paciente sem precisar fazer anotações.

Escrever o prontuário toma tempo e atenção do médico e está sujeito a erros e omissões, com implicações técnicas, éticas e jurídicas. A Faladoc.ai está construindo uma solução que automatiza a documentação clínica usando processamento de linguagem natural sobre o áudio ambiente da consulta, o que aumenta a produtividade e reduz o tempo de tela do médico.

Projeto desenvolvido na **AGES (Agência Experimental de Engenharia de Software) da PUCRS** no 1º semestre de 2024 (março a julho), em parceria com a Faladoc.ai.

## Estrutura do repositório

Este repositório junta os dois repositórios originais do projeto, com o histórico de commits preservado:

| Pasta | Descrição | Stack |
|---|---|---|
| [`backend/`](backend) | API REST de médicos, pacientes e consultas | TypeScript, Node.js, Express, Sequelize, PostgreSQL, Docker |
| [`frontend/`](frontend) | App mobile usado pelo médico (Android e iOS) | TypeScript, React Native, Expo, NativeWind |

## Funcionalidades

| User story | Descrição |
|---|---|
| US01 - Login | Acesso de usuários cadastrados |
| US02 - Cadastro de médico | Cadastro a partir do CRM do médico |
| US03 - Tela home | Resumo das funcionalidades e das últimas atividades |
| US04 - Iniciar consulta | Informar os dados do paciente e iniciar a consulta |
| US05 - Consulta em andamento | Captura do áudio, com opção de pausar e retomar |
| US06 - Término de consulta | Processamento do áudio e geração automática do prontuário por IA |
| US07 - Visualização e edição de prontuário | Revisar o prontuário e corrigir eventuais erros da IA |
| US08 - Listagem de pacientes | Buscar entre os pacientes já atendidos |
| US09 / US10 - Listagem de prontuários | Prontuários por paciente e prontuários gerais |

## Arquitetura

- **Backend:** padrão MVC (Models, Controllers e Routes) com Express e Sequelize sobre PostgreSQL, rodando em containers Docker.
- **Frontend:** React Native com Expo. A escolha foi feita porque o app precisava de captação de áudio nativa no celular, o que seria mais difícil numa plataforma web.
- **Infraestrutura:** deploy na AWS (EC2).

## Como rodar

**Backend** (requer Node.js 20.11.1 e Docker):

```sh
cd backend/docker
docker compose up
```

**Frontend:**

```sh
cd frontend
npm install
npx expo start
```

As credenciais originais (`.env`) foram removidas do histórico. Para rodar o projeto, configure as suas próprias variáveis de ambiente.

## Branches

A branch `main` tem o estado final de cada repositório (`main` do backend e `dev` do frontend). As demais branches originais foram mantidas com o nome da pasta como prefixo, por exemplo `frontend/feature/NovoPaciente` e `backend/dev`.

## Equipe

**Professor orientador:** Michael Mora
**Stakeholders:** Felipe Morsch, Guilherme Brito

| Nível | Integrantes |
|---|---|
| AGES I | Arthur Greco, Giordano Hübner Casaril, Luana Farias da Silva, Murilo Machado, Pedro Henrique Kertesz de Oliveira, Vicenzo Frusciante |
| AGES II | Gabriel Bohn, Guilherme Poglia Barreto, João Victor Rhoden Machado, Leonardo Bertoletti, Lucas Pinto Vieira, Maria Eduarda Menezes de Lemos, Maurício Gaspary |
| AGES III | Arthur Pereira Viegas, Matheus Oliveira dos Santos |
| AGES IV | Lucas Leifheit Nardon, Vitor Felipe Leitenski Delela |

---

Repositórios originais: [tools.ages.pucrs.br/faladoc.ai](https://tools.ages.pucrs.br/faladoc.ai)
