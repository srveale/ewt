const mongoose = require ('mongoose');
const _ = require('lodash');
const { Log } = require('./db/logModel');

const hospital = "Medicine Hat Regional Hospital";

const graphTimes = (hospital) => {
	mongoose.connect('mongodb://localhost/ewt',  {}, async (err) => {
		console.log('hospital', hospital)
		const logs = await Log.find({ "name": hospital });
		console.log('logs', logs.length);
		// let minutes = Number(log.waitTime.split(':')[0])*60 + Number(log.waitTime.split(':')[1])
		logs.map(log => {
			const [hours, minutes] = log.waitTime.split(':');
			const totalTime = Number(hours) * 60 + Number(minutes);
			console.log(totalTime + ' ')
		})
	})
}
graphTimes(hospital);