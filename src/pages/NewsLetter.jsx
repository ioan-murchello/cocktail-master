import { toast } from 'react-toastify';
import { Form, redirect, useNavigation } from 'react-router-dom';
import axios from 'axios';

const newsletterUrl = 'https://www.course-api.com/cocktails-newsletter';

export const action = async ({ request }) => {
  const data = await request.formData();

  const formData = Object.fromEntries(data);

  try {
    const res = await axios.post(newsletterUrl, formData);

    toast.success(res.data.msg);

    return redirect('/');
  } catch (error) {
    toast.error(error?.response?.data?.msg || 'Could not send data...');

    return error;
  }
};

const NewsLetter = () => {
  const navigation = useNavigation();
  const submitting = navigation.state === 'submitting';
  return (
    <Form className='form' method='POST'>
      <h4>Our newsletter</h4>
      <div className='form-row'>
        <label htmlFor='name' className='form-label'>
          name
        </label>
        <input
          className='form-input'
          name='name'
          id='name'
          type='text'
          placeholder='Jhon Doe'
          required
        />
      </div>
      <div className='form-row'>
        <label htmlFor='lastName' className='form-label'>
          lastName
        </label>
        <input
          className='form-input'
          name='lastName'
          id='lastName'
          type='lastName'
          placeholder='Smith'
          required
        />
      </div>
      <div className='form-row'>
        <label htmlFor='email' className='form-label'>
          email
        </label>
        <input
          className='form-input'
          name='email'
          id='email'
          type='email'
          defaultValue='test@test.com'
          required
        />
      </div>

      <button type='submit' className='btn btn-block' disabled={submitting}>
        {submitting ? 'submitting...' : 'submit'}
      </button>
    </Form>
  );
};

export default NewsLetter;
