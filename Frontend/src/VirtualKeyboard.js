import { useState, useEffect } from "react";
import axios from 'axios'

export default function VirtualKeyboard() {
    const [combination, setCombination] = useState([]);
    const [password, setPassword] = useState([]);
    const [userPassword, setUserPassword] = useState([]);
    const [digitedNumber, setDigitedNumber] = useState([])
    const [message, setMessage] = useState("");
    const [modalOpen, setModalOpen] = useState(false)
 
    useEffect(() => {
        fetchCombination()
        fetchUserPassword();
    }, []);
 
    const fetchCombination = async () => {
        try {
            const response = await axios.get("http://localhost:8000/getCombination");
            if (Array.isArray(response.data.combination)){
              setCombination(response.data.combination);
              setPassword([]);
              setMessage("");
            } else {
              console.error("Erro: Dados inválidos recebidos do backend");
            }
        } catch (error) {
            setMessage("Erro ao buscar combinação.");
        }
    };
 
    const fetchUserPassword = async () => {
        try {
            const response = await axios.get("http://localhost:8000/getUserPassword");
            setUserPassword(response.data)
        } catch (error) {
 
        }
    }
 
    const handleInput = (pair) => {

      const value = pair[0]
      setDigitedNumber(prev => ([...prev, value]))

      const nextIndex = password.length;
      const nextCorrectDigit = userPassword[nextIndex];

      if (pair[0] === nextCorrectDigit) {
          setPassword([...password, pair[0]]);
      } else if (pair[1] === nextCorrectDigit) {
          setPassword([...password, pair[1]]);
      }
    };
 
    const handleConfirm = async () => {
        if (password.join("") === userPassword.join("")) {
            setModalOpen(true)
        } else {
            setMessage("Senha incorreta! Tente novamente.");
            setPassword([]);
            setDigitedNumber([]);
            setTimeout(() => {
              fetchCombination()
            }, 2000);
        }
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-full text-center p-4">
            {message && <p className="mt-2 text-red-500">{message}</p>}
          </div>
          <input
            type="password"
            value={"*".repeat(digitedNumber.length)}
            readOnly
            className="w-full text-center p-4 border border-gray-700 rounded-full text-2xl font-semibold"
            placeholder="Digite sua senha"
          />
          <div className="grid grid-cols-2 gap-4 w-full">
            {combination.map((pair, index) => (
              <button
                key={index}
                onClick={() => handleInput(pair)}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                className="w-full bg-white text-black border border-black rounded-full text-[17px] font-semibold px-8 py-4 bg-white text-black border border-black rounded-full text-[17px] font-semibold px-8 py-4 cursor-pointer transition-all duration-300 ease-in-out shadow-none hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-[2px_5px_0_0_black] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none"
              >
                {pair[0]} ou {pair[1]}
              </button>
            ))}
              <button
                onClick={() => setDigitedNumber(digitedNumber.slice(0, -1))}
                className="w-full p-4 border border-red-500 bg-white text-red rounded-full bg-white text-black border border-black rounded-full text-[17px] font-semibold px-8 py-4 cursor-pointer transition-all duration-300 ease-in-out shadow-none hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-[2px_5px_0_0_red] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none"
              >
                Apagar
              </button>
          </div>
          <div className="flex space-x-4 w-full justify-center">
            <button
              onClick={handleConfirm}
              className="w-full p-4 bg-white border border-green-500 text-green rounded-full shadow-lg bg-white text-black border border-black rounded-full text-[17px] font-semibold px-8 py-4 cursor-pointer transition-all duration-300 ease-in-out shadow-none hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-[2px_5px_0_0_green] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none"
            >
              Acessar
            </button>
          </div>
          {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl font-bold text-green-600">Acesso Autorizado!</h2>
                        <button 
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md" 
                            onClick={() => setModalOpen(false)}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
