import _uniqBy from 'lodash/uniqBy'
const apiKey = '7035c60c'

export const fetchMovieItem = async (type, title, page) => {
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${title === '' ? 'frozen' : title}&type=${type === 'all' ? '' : type}&page=${page}`;
  try {
    const { data } = await axios.get(url);
    console.log(data)
    return data
  } catch (error) {
    alert(data.Error)
  }
}

export const fetchMovieDetail = async(id) => {
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`;
  try {
    const { data } = await axios.get(url);
    console.log(data)
    return data
  } catch (error) {
    alert(data.Error)
  }
}