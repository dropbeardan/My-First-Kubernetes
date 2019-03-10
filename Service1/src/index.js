const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const sequelize = require('sequelize');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = new sequelize(
	process.env.DB_NAME,
	process.env.DB_USERNAME,
	process.env.DB_PASSWORD,
	{
		dialect: 'postgres',
		host: '127.0.0.1',
		port: 5432,
		dialectOptions: {
			socketPath:
				'/cloudsql/my-first-kube-233907:australia-southeast1:postgresql-test-1'
		}
	}
);

const Service1 = connection.define('Service1', {
	name: { type: sequelize.STRING, allowNull: false }
});

const Service2 = connection.define('Service2', {
	name: { type: sequelize.STRING, allowNull: false }
});

connection
	.sync()
	.then(() => console.log('IT CONNECTED'))
	.catch(err => console.log('FAILED TO CONNECT TO SEQUELIZE', err));

app.get('/', (req, res) => {
	res.json({
		Service: 'Service 1',
		COMMIT_REF: process.env.APP_COMMIT_REF,
		BUILD_DATE: process.env.APP_BUILD_DATE,
		DB_NAME: process.env.DB_NAME,
		DB_USERNAME: process.env.DB_USERNAME,
		DB_PASSWORD: process.env.DB_PASSWORD
	});
});

const HOST = 'http://35.189.3.100/';

app.get('/service2', async (req, res) => {
	const { data: response } = await axios({
		method: 'get',
		url: HOST
	});

	res.send(response);
});

app.get('/data', async (req, res) => {
	const service1data = await Service1.findAll({});
	const service2data = await Service2.findAll({});

	return Promise.all([service1data, service2data]).then(
		(service1response, service2response) => {
			res.json({
				service1: service1response.map(response => response.dataValues),
				service2: service2response.map(response => response.dataValues)
			});
		}
	);
});

app.get('/createData', async (req, res) => {
	await Service1.create({ name: 'Service1' });

	res.send('DATA PRIMED!');
});

const PORT = process.env.port || 8080;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}...`);
});
