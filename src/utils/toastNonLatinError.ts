import { toast } from 'react-toastify';

const toastNonLatinError = () => {
  toast.error('Only Latin letters are allowed');
};

export default toastNonLatinError;
