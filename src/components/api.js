import apiKey from "./apikey";

export const fetchMovieItem = async (type, title, page) => {
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${title === '' ? 'frozen' : title}&type=${type === 'all' ? '' : type}&page=${page}`;
  try {
    const { data } = await axios.get(url);
    if(data.Response === 'False') {
      alert(data.Error)
    }
    return data
  } catch (error) {
    alert(data.Error)
  }
}

export const fetchMovieDetail = async(id) => {
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`;
  try {
    const { data } = await axios.get(url);
    return data
  } catch (error) {
    alert(data.Error)
  }
}