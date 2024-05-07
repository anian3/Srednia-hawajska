//index.html
import React, {useEffect, useState } from 'react';
import { UUID } from 'crypto';

const SERVER_URL = "http://localhost:8080";
const QUIZ_ENDPOINT = SERVER_URL + "/quiz";

const MainPage = () => {
    
    const [quiz,setQuiz] = useState<string>(null);

    useEffect(() => {
        fetch(QUIZ_ENDPOINT,{
            method : "GET"
        })
        .then(rs => rs.text())
        .then(text => setQuiz(text));
    },[])

    return (
    <div className="mainContainer">
        <p>{quiz}</p>
    </div>
    );
}

export default MainPage;