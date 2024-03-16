import { useState, useEffect, useReducer } from "react";
import "./App.css";

const getRandomNumberFromApi = async (): Promise<number> => {
  const response = await fetch(
    "https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new"
  );
  const numberString = await response.text();
  return +numberString;
};

export const App = () => {
  const [number, setNumber] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [key, forceRefresh] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    getRandomNumberFromApi()
      .then(setNumber)
      .catch((error) => setError(error.message));
  }, [key]);

  useEffect(() => {
    if (number) {
      setIsLoading(false);
    }
  }, [number]);

  useEffect(() => {
    if (error) {
      setIsLoading(false);
    }
  }, [error]);

  return (
    <div className="App">
      {isLoading ? <h2>Cargando...</h2> : <h1>Numero aleatorio {number}</h1>}
      {!isLoading && error && <h3>{error}</h3>}
      <button onClick={forceRefresh} disabled={isLoading}>
        {isLoading ? "Cargando..." : 'Nuevo número'}
      </button>
    </div>
  );
};
