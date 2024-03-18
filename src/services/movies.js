const API_Key= '62864319'

export const searchMovies = async ({search}) =>{

    if (search === '') return null

    try{
        const response =  await fetch(`https://www.omdbapi.com/?apikey=${API_Key}&s=${search}`)
        const json = await response.json()
        const movies = json.Search

        return movies?.map(movie => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            image: movie.Poster,
            type: movie.Type,
            }));
    }catch(e){
        throw new Error('Error searching movies')
    } 
}