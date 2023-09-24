import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '38682723-ccb8378626c039a4163c61aff';

export const getPhoto = async (query, page) => {
  const { data } = await axios(
    `?key=${API_KEY}&q=${query}&page=${page}&orientation=horizontal&per_page=12&image_type=photo`
  );
  return data;
};
