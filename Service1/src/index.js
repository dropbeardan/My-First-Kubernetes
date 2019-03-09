const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const commitRef = process.env.APP_COMMIT_REF || 'N/A';
const buildDate = process.env.APP_BUILD_DATE || new Date().toISOString();

app.get('/', (req, res) => {
	res.send(
		`You have landed on Service 1.\n
		Commit: ${commitRef}\n
		Build Date: ${buildDate}`
	);
});

const HOST = '35.189.1.114';

app.get('/service2', async (req, res) => {
	const { data: response } = await axios({
		method: 'get',
		url: `http://${HOST}`
	});

	res.send(response);
});

const PORT = process.env.port || 8080;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}...`);
});
