import "./App.css";
import { useQuery } from "@tanstack/react-query";

const getRandomNumberFromApi = async (): Promise<number> => {
  const response = await fetch(
    "https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new"
  );
  const numberString = await response.text();
  return +numberString;
};

export const App = () => {
  const query = useQuery({
    queryKey: ["randomNumber"],
    queryFn: getRandomNumberFromApi,
  });

  return (
    <div className="App">
      {query.isFetching ? (
        <h2>Cargando...</h2>
      ) : (
        <h1>Numero aleatorio {`${query.data}`}</h1>
      )}

      {!query.isLoading && query.isError && <h3>{`${query.error}`}</h3>}

      <button onClick={() => query.refetch()} disabled={query.isFetching}>
        {query.isFetching ? "Cargando..." : "Nuevo número"}
      </button>
    </div>
  );
};
