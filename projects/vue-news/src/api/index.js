import axios from 'axios'; //기본적으로 node_modules에 설치된 라이브러리를 가져온다.

// 1. HTTP Request & Response와 관련된 기본 설정
const config = {
    baseUrl: 'https://api.hnpwa.com/v0/'
}

// 2. API 함수들을 정리
function fetchNewsList() {
    // return axios.get(config.baseUrl + 'news/1.json');
    return axios.get(`${config.baseUrl}news/1.json`); //ES6 - backtick을 이용해서 변수와 문자열 연결
}

function fetchAskList() {
    return axios.get(`${config.baseUrl}ask/1.json`);
}

function fetchJobsList() {
    return axios.get(`${config.baseUrl}jobs/1.json`);
}

function fetchUserInfo(userName) {
    return axios.get(`${config.baseUrl}user/${userName}.json`);
}

export {
    fetchNewsList, 
    fetchAskList,
    fetchJobsList,
    fetchUserInfo
}
