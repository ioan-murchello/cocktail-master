 
import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HomeLayout = () => {
    const {state} = useNavigation()
    const isLoading = state === 'loading'
  return (
    <div>
      <Navbar />
      <section className='page'>
        {isLoading ? <div className='loading' /> : <Outlet />}
      </section>
    </div>
  );
};

export default HomeLayout;
