import { GoogleLogin } from '@react-oauth/google';
import bcrypt from 'bcryptjs';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';
import React from 'react';
import { NotificationManager } from "react-notifications";
import { useDispatch } from 'react-redux';
import './App.css';
import { loginGG, setTimeHash } from './features/slices';
import { Box } from '@mui/material';

const Login = () => {
  const dispatch = useDispatch()
  const saltRounds = 10;
  return (
    <Box className="centered-box" >
      <h1 style={{ display: "flex" }}>
        <span class="gradient-text">C</span>
        <span class="gradient-text">R</span>
        <span class="gradient-text">A</span>
        <span class="gradient-text">W</span>
        <span class="gradient-text" style={{ marginRight: 8 }}>L  </span>

        <span style={{ marginRight: 8 }}>for  </span>
        <img src='/woo.png' style={{ height: 40 }}></img>
      </h1>
      <h3 style={{ margin: 10, color: "red" }}>Đăng nhập bằng google để sử dụng!</h3>

      <GoogleLogin
        onSuccess={credentialResponse => {
          var decoded = jwtDecode(credentialResponse.credential);
          bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(decoded.email, salt, async (err, hash) => {
              const time = moment().unix()
              const res = await dispatch(loginGG(`${hash}${time}`))
              if (res.payload?.status == 0) {
                dispatch(setTimeHash({ time: parseInt(time), hash: hash, email: decoded.email }));
              }
            });
          });
        }}
        onError={() => {
          NotificationManager.error('Đăng nhập không thành công!', 'Error', 3000);
        }} />
      <p style={{ margin: 20, marginTop: 10, textAlign: "center" }}>
        <span>Chỉ có thành viên mới sử dụng được!</span><br></br>
        <span><strong style={{ color: "red" }}>Liên hệ:</strong> (Telegram) 0394 829 195</span><br></br>
      </p>
    </Box>

  );
};
export default Login;
