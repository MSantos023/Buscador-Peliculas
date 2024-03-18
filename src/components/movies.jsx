export function ListMovies({ movies }) {
  return (
    <ul className="movies">
      {movies.map((movie) => (
        <li key={movie.id} className="movie">
          <h3>{movie.title}</h3>
          <h4>{movie.type}</h4>
          <p>{movie.year}</p>
          <img src={movie.image} alt={movie.title} />
        </li>
      ))}
    </ul>
  );
}

export function NoMoviesResults() {
  return <p>No se encontraron resultados para esta pelicula</p>;
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0;

  return hasMovies ? <ListMovies movies={movies} /> : <NoMoviesResults />;
}
