import { Toaster } from 'react-hot-toast';

const CustomToaster = () => (
  <Toaster
    position="bottom-right"
    reverseOrder={false}
    gutter={20}
    toastOptions={{
      duration: 4000,
      style: {
        background: '#ffffff',
        color: '#000112',
        fontSize: 15,
      },
    }}
  />
);

export default CustomToaster;
