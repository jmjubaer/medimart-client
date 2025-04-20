'use client';
import UserProvider from '@/context/UserContext';
import {  store } from '@/redux/store';
import { Provider } from 'react-redux'
import CartHydrator from './CartHydrator';

const Providers = ({children}:{children:React.ReactNode}) => {
  return <Provider store={store}>
      <CartHydrator />
         <UserProvider>
         {children}
        </UserProvider>
         </Provider>;
};

export default Providers;