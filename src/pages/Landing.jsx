import axios from 'axios';
import { useLoaderData} from 'react-router-dom';
import CocktailList from '../components/CocktailList';
import SearchForm from '../components/SearchForm';
import { useQuery } from '@tanstack/react-query';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey:['images', searchTerm || 'all'],
    queryFn: async () => {
      const res = await axios.get(`${url}${searchTerm}`)

      return res.data.drinks
    }
  }
}

export const loader = (queryClient) => async ({ request }) => {
  const url1 = new URL(request.url);

  const searchTerm = url1.searchParams.get('search') || '';

  // if data is alredy present, do not request
  await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm))

  return { searchTerm };

};

const Landing = () => {
  const { searchTerm } = useLoaderData();
   const {data:drinks} = useQuery(searchCocktailsQuery(searchTerm))
  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  );
};

export default Landing;
