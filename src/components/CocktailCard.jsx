import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/CocktailCard';

const CocktailCard = ({
  idDrink: id,
  strGlass: glass,
  strDrink: name, 
  strDrinkThumb: image,
  strInstructions: info
}) => {
  return <Wrapper>
    <div className="img-container">
        <img className='img' src={image} alt={name} />
    </div>
    <div className="footer">
        <h4>{name}</h4>
        <h5>Glass: {glass}</h5>
        <p>{info}</p> 
        <Link className='drink-data' to={`/cocktail/${id}`}>Details</Link>
    </div>
  </Wrapper>;
};

export default CocktailCard;
