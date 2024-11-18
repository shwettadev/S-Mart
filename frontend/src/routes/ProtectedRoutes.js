import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { authActions } from '../redux/reducer/auth.reducer';
import { checkUserToken } from '../utility/common';

export default function ProtectedRoute({ Component, type, from }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        checkUserToken((res) => {
            if (res) {
                dispatch(authActions.login());
            } else {
                dispatch(authActions.logout());
                navigate("/dashboard", {
                    state: {
                        path: location.pathname
                    }
                })
            };
        });
    }, [Component]);

    return (
        <React.Fragment>
            {
                <Component type={type} from={from} />
            }
        </React.Fragment>
    );
}
