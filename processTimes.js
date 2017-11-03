const moment = require('moment')
const timeData = require('./times-nov-1');

// create an array of times five minutes apart, counting from 12:05 am to 11:55 pm
const timeRange = [...Array(288).keys()].map(key => key * 5);

const averageTime = (dates, timeData) => {

	let sum = 0;
	let count = 0;
	dates.filter(date => !isNaN(timeData[date])).map(date => {
		sum += timeData[date];
		count ++;
	})

	return sum / count;
}

const averageTimes = [];
timeRange.map(minute => {
	if (minute === 0) return;
	console.log("minute", minute);

	const min = minute - 5;
	const max = minute + 5;
	
	logs = Object.keys(timeData).filter(logTime => {
		logTimeFromMidnight = moment(logTime).minutes() + moment(logTime).hours() * 60
		return logTimeFromMidnight > min && logTimeFromMidnight < max
	})

	averageTimes.push(averageTime(logs, timeData).toFixed(0));
})

for (let time of averageTimes) {
	console.log(time);
}
