import React from 'react';
import { Link } from "react-router-dom";
function LogIn(props) {
    return (
        <div className="content ">
            <div className="login-wrap">
                <div className="header">
                    <Link to="/" className='logo' >
                        Home
                    </Link></div>
                <form action="/login" method='POST' className='login-form'>
                    <div className="form-group input_row ">
                        <label htmlFor="id"></label>
                        <input type="text" id="id" name="id" placeholder='아이디' />
                    </div>
                    <div className="form-group input_row">
                        <label htmlFor="pw"></label>
                        <input type="password" id="pw" name="pw" placeholder='비밀번호' />
                    </div>
                    <button className='btn-login'>
                        <span>로그인</span>
                    </button>
                </form>
                <div className="signin">
                    <Link to="/signin" className="item">
                        회원가입
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LogIn;