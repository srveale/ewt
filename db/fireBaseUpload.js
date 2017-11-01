const firebase = require('firebase');

const config = {
	apiKey: "AIzaSyBOou3E7jaSSjG7XEpwqrzWvpAQJBLW5UE",
	authDomain: "emerg-wait-times.firebaseapp.com",
	databaseURL: "https://emerg-wait-times.firebaseio.com",
	projectId: "emerg-wait-times",
	storageBucket: "emerg-wait-times.appspot.com",
	messagingSenderId: "968155776299"
};

firebase.initializeApp(config);

const db = firebase.database();

function writeLog(id, name, waitTime, currentDate) {
  db.ref('logs/' + String(id)).set({
    name,
    waitTime,
    currentDate: String(currentDate)
  })
  .catch((err) => console.log("ErOrOroOROR", err));
}

writeLog("4n9t230hg394gb3w59gb2", "test hospital", '12:34', new Date());