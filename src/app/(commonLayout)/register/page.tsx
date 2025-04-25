import RegisterForm from "@/components/pages/register";
import React, { Suspense } from "react";

const RegisterPage = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading login...</div>}>
                <RegisterForm />
            </Suspense>
        </div>
    );
};

export default RegisterPage;
