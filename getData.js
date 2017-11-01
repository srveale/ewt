const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

const { Log } = require('./db/logModel');
const regionURLS = require('./constants').regionURLS;

const writeLog = async (id, name, waitTime, currentDate) => {
  db.ref('logs/' + String(id)).set({
    name,
    waitTime,
    currentDate: String(currentDate)
  })
  .catch((err) => console.log("ErOrOroOROR", err));
}

const scrapePage = async (regionURL) => {
    await new Promise(request(regionURL, (error, response, responseHtml) =>{
    	const $ = cheerio.load(responseHtml);
    	const hospitalData = getHospitalData($, responseHtml);
    	console.log("hospitalData", hospitalData.length);

    	return Promise.all(Array.from(hospitalData).map(async hospital => {
			const hospitalLog = new Log();
			hospitalLog.name = hospital.name;
			hospitalLog.waitTime = hospital.waitTime;
			hospitalLog.currentTime = hospital.currentTime;
	   		await hospitalLog.save((err) => {
	   			console.log('saved')
				if (err) return console.error(err);
			});
	   	}))
	   	resolve();
    }));
    Promise.resolve()
}

const getHospitalData = ($, html) => {
	// find every hospital name in the html
	// return array of names
	const hospitalElements = $('.publicRepacSiteText')

	const firstDigits = getDigits($, 'One')
	const secondDigits = getDigits($, 'Two')
	const thirdDigits = getDigits($, 'Three')
	const fourthDigits = getDigits($, 'Four')

	const hospitalData = hospitalElements.map((i, element) => {
	// const hospitalData = Array.from(hospitalElements).map((i, element) => {
		const name = element.children[0].data;
		const waitTime = `${firstDigits[i]}${secondDigits[i]}:${thirdDigits[i]}${fourthDigits[i]}`;
		return {name, waitTime, currentTime: new Date()};
	})
	// console.log('hospital data in getHospitalData', hospitalData)
	return hospitalData;
} 

const getDigits = ($, digitOrder) => {
	digitValues = []
	$(`.publicClockNumber${digitOrder}Gif`).each((i, gif)=> {
		digitValues.push(gif.children[1].attribs.alt)
	})
	return digitValues;
}

const getData = () => mongoose.connect('mongodb://localhost/ewt',  {}, (err) => {
	// loop through the urls, get hospital name and wait time, save to db, close connection
	Promise.all(regionURLS.map(regionURL => {
		return new Promise((resolve, reject) => {
			console.log('before scraping page')
			resolve(scrapePage(regionURL));
		})
	}))
	// TODO: get the damn promises to work
	setTimeout(()=> mongoose.disconnect(), 3000)
});




setInterval(getData, 120000);