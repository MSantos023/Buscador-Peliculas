import "./App.css";
import { useMovies } from "./hooks/useMoviesApi.js";
import { Movies } from "./components/movies.jsx";
import { useState, useEffect, useRef, useCallback } from "react";
import debounce from "just-debounce-it";

function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirtsinput = useRef(true);

  useEffect(() => {
    if (isFirtsinput.current) {
      isFirtsinput.current = search === "";
      return;
    }

    if (search === "") {
      setError("No se puede buscar una pelicula de campo vacio");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("No se puede buscar una pelicula con un numero");
      return;
    }

    if (search.length < 3) {
      setError("La busqueda debe tener al menos 3 caracteres");
      return;
    }

    setError(null);
  }, [search]);
  return { search, error, updateSearch };
}

function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSearch, error } = useSearch();
  const { movies, loading, getMovies } = useMovies({ search, sort });

  const handleSort = () => {
    setSort(!sort);
  };

  const debounceGetMovies = useCallback(
    debounce(search => {
      getMovies({ search });
    }, 300)
    ,[getMovies]);

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies(search);
    /*tambien se puede hacer sin usar useref directamente con el event, seria:
        const fields = new FormData(event.target)
        const query = fields.get("NOMBRE DEL INPUT")
      Asi se haria con Javascript sin depender de REACT 
      si fueran mas inputs podria crearse un objeto y recuperar todo desde ahi de la siguiente manera
        const fields = Object.fromEntries(new window.FormData(event.target))
      dentro de fields(nombre al azar) se recuperaria todo
    */
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
    debounceGetMovies(newSearch);
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de Peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            name="query"
            value={search}
            onChange={handleChange}
            placeholder="Avenger, Star wars, The lord of the rings..."
            style={{
              border: "1px solid transparent",
              borderColor: error ? "red" : "transparent",
            }}
          />
          <label>Ordenar Alfabeticamente</label>
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
