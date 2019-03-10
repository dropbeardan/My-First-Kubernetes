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
		host: 'localhost',
		port: 5432
	}
);

const Service1 = connection.define('Service1', {
	id: {
		type: sequelize.UUID,
		defaultValue: sequelize.UUIDV4,
		primaryKey: true
	},
	name: { type: sequelize.STRING, allowNull: false }
});

const Service2 = connection.define('Service2', {
	id: {
		type: sequelize.UUID,
		defaultValue: sequelize.UUIDV4,
		primaryKey: true
	},
	name: { type: sequelize.STRING, allowNull: false }
});

connection
	.sync()
	.then(() => console.log('IT CONNECTED'))
	.catch(err => console.log('FAILED TO CONNECT TO SEQUELIZE', err));

app.get('/', (req, res) => {
	res.json({
		Service: 'Service 2',
		COMMIT_REF: process.env.APP_COMMIT_REF,
		BUILD_DATE: process.env.APP_BUILD_DATE,
		DB_NAME: process.env.DB_NAME,
		DB_USERNAME: process.env.DB_USERNAME,
		DB_PASSWORD: process.env.DB_PASSWORD
	});
});

app.get('/data', async (req, res) => {
	try {
		const service1data = await Service1.findAll({});
		const service2data = await Service2.findAll({});

		res.json({
			service1: service1data.map(response => response.dataValues),
			service2: service2data.map(response => response.dataValues)
		});
	} catch (err) {
		res.send(err);
	}
});

app.get('/createData', async (req, res) => {
	try {
		await Service2.create({ name: 'Service2' });

		res.send('DATA PRIMED!');
	} catch (err) {
		res.send(err);
	}
});

const PORT = process.env.port || 8080;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}...`);
});
