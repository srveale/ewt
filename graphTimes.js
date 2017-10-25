const mongoose = require ('mongoose');
const _ = require('lodash');
const { Log } = require('./db/logModel');

const hospital = "Alberta Children's Hospital";

const graphTimes = (hospital) => {
	mongoose.connect('mongodb://localhost/ewt')
	.then(()=> {
		const logs = Log.find({ "name": hospital })
		.then((logs) => {
			logs.map(log => {
				const [hours, minutes] = log.waitTime.split(':');
				const totalTime = Number(hours) * 60 + Number(minutes);
				console.log(totalTime + " ");
			})
		})
		.then(() => {
			mongoose.disconnect();
		})
	})
}

graphTimes(hospital)