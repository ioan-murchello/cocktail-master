import axios from 'axios';
import { Link, Navigate, useLoaderData } from 'react-router-dom';
import Wrapper from '../assets/wrappers/CocktailPage';
import { useQuery } from '@tanstack/react-query';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const getCocktailDetailsQuery = (id) => {
  return {
    queryKey: ['cocktail',id],
    queryFn: async () => {

      const {data} = await axios.get(`${url}${id}`);
      console.log(data)
      return data.drinks
    }
  }
}

export const loader = (queryClient) => async ({ params }) => {

  const { id } = params;
  

    await queryClient.ensureQueryData(getCocktailDetailsQuery(id))

    return {id}
};
const Cocktail = () => {

  const {id} = useLoaderData();
  

  const {data} = useQuery(getCocktailDetailsQuery(id))
 
  if(!data) return <Navigate to='/'/>

  const ingridients = Object.keys(data[0]).filter(key => key.includes('strIngredient') && data[0][key] !== null).map(key => data[0][key])

  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = data[0];
  return (
    <Wrapper>
      <header>
        <Link className='btn' to='/'>
          back home
        </Link>
        <h3>{name}</h3>
      </header>
      <div className='drink'>
        <img src={image} alt={name} className='img' />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>Name: </span>
            {name}
          </p>
          <p>
            <span className='drink-data'>Category: </span>
            {category}
          </p>
          <p>
            <span className='drink-data'>Glass: </span>
            {glass}
          </p>
          <p>
            <span className='drink-data'>Alcoholic: </span>
            {info}
          </p>
          <p>
            <span className='drink-data'>Ingridients: </span>
            {ingridients.map((el, index) => {
                return <span key={index}>{el}{index < ingridients.length - 1 ? ',':'.'} </span>
            })}
          </p>
          <p>
            <span className='drink-data'>Instructions: </span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Cocktail;
