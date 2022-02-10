/* Global Variables */
const apiKey = '&appid=ff4732f8cd68b7052fbe226850ba23a4&units=imperial';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const SERVER = 'http://localhost:5500';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
let myData = {};

const zipTXT = document.getElementById('zip');
const feelingsTXT = document.getElementById('feelings');
const generateBTN = document.getElementById('generate');
const dateElement = document.getElementById('date');
const tempElement = document.getElementById('temp');
const contentElement = document.getElementById('content');

generateBTN.addEventListener('click', (e) => {
    e.preventDefault();
    RefreshPage();
    getData_FromAPI(baseURL + zipTXT.value + apiKey).then((userData) => {
        myData.Temprature = userData.main.temp;
        myData.Date = newDate;
        myData.Feeling = feelingsTXT.value;
        postData(SERVER + '/addWeatherData', myData);
    }).then((projectData) => {
        getAllData('/all');
    });
    
});

/* get api data (baseURL + zipTXT.value + apiKey) */
const getData_FromAPI = async (url='') =>{
    const response = await fetch(url);
    try{
        const userData = await response.json();
        if (userData.cod != 404)    //FOUND
            return userData;
        throw userData.message;     //NOT FOUND
    }
    catch(error){
        DisplayError(error);
    }
};

const postData = async (url='', userData={}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(userData)
    });
    try{
        const projectData = await response.json();
        return projectData;
    }catch(error){
        console.log('cannot be added: ', error);
    }
}

/* Get All the available data and display it/ */
const getAllData = async (url='') => {
    const response = await fetch(url);
    try{
        const data = await response.json();
        tempElement.innerText = 'Temp: ' + Math.round(data.Temprature) + ' degrees';
        contentElement.innerText = 'Feels: ' + data.Feeling;
        dateElement.innerText = "Today's Date:  " + data.Date;
    }
    catch(error){
        console.log('getALLDataError! : ', error);
    }
}

function DisplayError(message){
    const error = document.getElementById('error');
    error.innerText = message;
    error.style.color = "red"
}

function RefreshPage(){
    const error = document.getElementById('error');
    error.innerText ='';
    tempElement.innerText = '';
    contentElement.innerText = '';
    dateElement.innerText = '';
}