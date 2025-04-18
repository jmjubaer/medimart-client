import LoginForm from "@/components/pages/login";
import { Suspense } from 'react';

const LoginPage = () => {
    return (
        <div>
 <Suspense fallback={<div>Loading login...</div>}>
              <LoginForm/>
    </Suspense>
         
        </div>
    );
};

export default LoginPage;