import { useEffect, useState } from "react";
import axios from "axios";
import MoonLoader from "react-spinners/MoonLoader";
import iconDice from "../../assets/icon-dice.svg";
import "./App.scss";

interface AdviceDataDTO {
  id: number;
  advice: string;
}

function App() {
  const [adviceData, setAdviceData] = useState<AdviceDataDTO>({
    id: 0,
    advice: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchAdvice = () => {
    setIsLoading(true);

    const getData = setTimeout(() => {
      axios
        .get("https://api.adviceslip.com/advice")
        .then((response) => {
          setAdviceData(response.data.slip);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }, 1000);

    return () => clearTimeout(getData);
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <main className="main">
      {!isLoading ? (
        <div className="container">
          <div className="container__header">Advice #{adviceData.id}</div>

          <p className="container__paragraph">{adviceData.advice}</p>

          <div className="divider" />

          <div className="container__button">
            <button className="button" onClick={fetchAdvice}>
              <img src={iconDice} alt="Icon dice" />
            </button>
          </div>
        </div>
      ) : (
        <MoonLoader color="#fff" loading={isLoading} />
      )}
    </main>
  );
}

export default App;
