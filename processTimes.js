const moment = require('moment')
const timeData = require('./times-nov-1');

// create an array of times five minutes apart, counting from 12:05 am to 11:55 pm
const timeRange = [...Array(288).keys()].map(key => key * 5);

timeRange.map(minute => {
	if (minute === 0) return;

	const min = minute - 5;
	const max = minute + 5;


	console.log('typeof timeData', typeof timeData)
	logs = Object.keys(timeData).find(log => {
		
		console.log('log', log);
	})
})
