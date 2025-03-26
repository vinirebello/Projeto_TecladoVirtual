# Projeto: Teclado virtual para acesso bancário
## Integrantes : Vinicius Rogerio Rebello, Inácio Tomazelli

## Visão Geral
Este projeto consiste em um sistema de autenticação segura utilizando um teclado virtual dinâmico. Ele é composto por um **backend** desenvolvido em **FastAPI** com um banco de dados **MongoDB**, e um **frontend** desenvolvido em **React**.

O sistema gera combinações aleatórias de pares de números e as apresenta ao usuário, que deve selecionar os números correspondentes à sua senha cadastrada. Caso a senha esteja incorreta, uma nova combinação é gerada automaticamente.

## Obervações
- Não foi implementado criptografia entre frontend e backend.
- As combinações não são desativadas após o uso ou quando o usuário errar a senha.

## Tecnologias Utilizadas

### Backend:
- **Python**
- **FastAPI**
- **MongoDB**
- **Pymongo**
- **CORS Middleware**
- **Hashlib**

### Frontend:
- **React.js**
- **Tailwind CSS**
- **Axios**

## Conexão com o banco

Para conectar ao banco deverá ter instalado o MongoDBCompass

Link: https://www.mongodb.com/try/download/compass

Na aba Overview do MongoDB Atlas irá aparecer o Cluster, clique em Connect e em seguida escolha a opção Compass

![Sem título](https://github.com/user-attachments/assets/4625f937-8c47-4be6-88d6-c186a99ca4a4)

![Sem título](https://github.com/user-attachments/assets/569518eb-17fb-4313-ab62-1ead62f507a1)

Selecione a opção "I have a MongoDB Compass installed", e copie a string de conexão logo abaixo

![Sem título](https://github.com/user-attachments/assets/ccfbb821-97a4-457a-a01c-1081e66370dd)

Com o Compass instalado, clique em add new connection

![image](https://github.com/user-attachments/assets/cc0357b0-553d-4ec8-8e15-f1590e6b6409)

Cole a string de conexão no campo de URI e substitua o <db_username> e <db_password> pelo User e Password abaixo:

Acesso ao banco:

User: MartimAdmin

Password : 12345

![Sem título](https://github.com/user-attachments/assets/4db2157f-7b94-46ac-bf4c-de1326e1a69d)

As coleções do banco estarao dentro de ProjectDB

![image](https://github.com/user-attachments/assets/6a3a0277-c1bb-471a-a399-0b2397263e79)

Case de erro na conexão vá no Atlas na aba Network Acess e adicione seu IP da rede

![Sem título](https://github.com/user-attachments/assets/04b24e4d-5ceb-47c1-a875-e164065a4958)


---------------

## Instalação e Execução

### Backend
1. Instale as dependências do Python:
   ```sh
   pip install fastapi uvicorn pymongo
   ```
2. Execute o backend com o comando:
   ```sh
   uvicorn main:app --reload
   ```
3. O backend rodará na porta **8000**.

### Frontend
1. Instale as dependências do projeto:
   ```sh
   npm install
   ```
2. Execute o frontend com:
   ```sh
   npm start
   ```
3. O frontend rodará na porta **3000**.

---

## Funcionamento

### Backend
#### **Rota `GET /getCombination`**
- Retorna uma combinação aleatória de pares de números do banco de dados.

#### **Rota `GET /getUserPassword`**
- Retorna a senha cadastrada do usuário para validação.

#### **Rota `POST /passwordValidation`**
- Recebe a senha digitada pelo usuário e verifica se está correta.
- Se correta, retorna sucesso.
- Se incorreta, retorna erro e uma nova combinação aleatória.

### Frontend
1. Ao carregar a página, busca uma combinação aleatória do backend.
2. O usuário digita sua senha escolhendo entre os pares apresentados.
3. Ao confirmar a senha:
   - Se correta, exibe um modal de "Acesso Autorizado".
   - Se incorreta, exibe uma mensagem de erro e gera uma nova combinação.

---

## Estrutura do Banco de Dados

### Coleções:
1. **Users**:
   ```json
   {
       "id": 1,
       "nome": "Usuarioteste",
       "senha": [1,2,3,4,5]
   }
   ```

2. **Combinations**:
   ```json
   {
       "hash": "abc123...",
       "combination": [[0,9], [3,7], [4,8], [2,6], [1,5]]
   }
   ```


