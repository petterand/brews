const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.static('web/out/'));

app.post('/api/recipe', (req, res) => {
    res.send({ status: 'added' });
});

app.get('/api/recipe', (req, res) => {
    res.send([{ name: 'Coffee oatmeal brown ale' }, { name: 'New Year Pale Ale' }]);
});

app.listen(8888, () => {
    console.log('Listening on 8888');
});

