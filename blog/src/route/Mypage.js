import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
function Mypage(props) {
    let [유저, 유저변경] = useState('')
    useEffect(() => {
        axios.get('http://localhost:8080/mypage'
        ).then((결과) => {
            console.log(결과.data)
            유저변경(결과.data.사용자)
        }).catch(() => { (console.log('에러')) });
    }, [])
    return (
        <div>
            <h2>{유저}의 마이페이지입니다</h2>
        </div>
    );
}

export default Mypage;