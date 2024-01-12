import Wrapper from '../assets/wrappers/ErrorPage';
import notFoundImg from '../assets/not-found.svg';
import { Link, useRouteError } from 'react-router-dom';

const Error = () => {

    const error = useRouteError()

    if(error.status === 404){
        return <Wrapper>
            <div>
                <img src={notFoundImg} alt="Page not found" />
                <h3>Ohh..</h3>
                <p>We can't seem to find page you are looking for</p>
                <Link to='/'>back home</Link>
            </div>
        </Wrapper>
    }

  return <Wrapper>
    <div>
        <h3>Something went wrong</h3>
    </div>
  </Wrapper>;
};

export default Error;
