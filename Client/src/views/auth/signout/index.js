import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../../../store/actions';
import { useEffect } from 'react';
import { API_SERVER } from '../../../config/constant';
import axios from 'axios';
const headers = {
  'x-api-key': "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  'Content-Type': 'application/json'
};

const Logout = () => {

    const dispatcher = useDispatch();

    const handleLogout = () => {

        const storeSystemAuditLog = async () => {
                await axios
                .post(API_SERVER + '/api/store-system-audit-logs', {
                    user_id: JSON.parse(localStorage.getItem("userInfo")).id,
                    page_accessed: "Logout",
                    page_url: "/logout"
                }, { headers })
                .then(function (response) {
                    // console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
            
            storeSystemAuditLog();

        dispatcher({ type: LOGOUT });
        window.location.reload();
    };

    return ( handleLogout() );
  }

  export default Logout;