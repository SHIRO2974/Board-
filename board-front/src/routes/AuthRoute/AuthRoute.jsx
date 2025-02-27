import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage/LoginPage'
import JoinPage from '../../pages/JoinPage/JoinPage'
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import { useUserMeQuery } from '../../queries/userquery';
import { useQueryClient } from '@tanstack/react-query';



function AuthRoute(props) {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const queryState = queryClient.getQueryState(["userMeQuery"]);

    useEffect(() => {

        if(queryState.status === "success") {   // 로그인이 되었을 경우

            navigate("/");  // 홈으로 이동
        }
    }, [queryClient]);

    return queryState.status === "error" &&
        
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/join" element={<JoinPage />} />
                <Route path="/*" element={<NotFoundPage />} />
            </Routes> 
}

export default AuthRoute;