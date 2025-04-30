import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
});

export const getAllMeals = async () => {
  const response = await instance.get('/search.php?f=c');
  return response.data.meals;
};

export const getMealDetail = async (id: any) => {
  const response = await instance.get(`/lookup.php?i=${id}`);
  return response.data.meals[0];
};

