import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';

function List(props) {
    let [list, setList] = useState([]);
    let 안녕 = [];
    useEffect(() => {
        axios.get('http://localhost:8080/list'
        ).then((결과) => {
            console.log(결과.data)
            안녕 = [...결과.data.post];
            setList([...list, ...안녕]);
            console.log(안녕);
            console.log(list);
        }).catch(() => { (console.log('에러')) });
    }, [])
    return (
        <div>
            <div className='content'>
                {list.map(function (a, i) {
                    return (
                        <div className='list-item'>
                            <div className="list-title">
                                <h4>{list[i]['제목']}</h4></div>
                            <div className="list-content">
                                <p>{list[i]['내용']}</p></div>
                        </div>)
                })}
            </div>
        </div>
    );
}

export default List;