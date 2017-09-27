const express = require('express');

const app = express();

app.use(express.static('web/out/'));


app.get('/api/recipes', (req, res) => {
    res.send([{ name: 'Coffee oatmeal brown ale' }, { name: 'New Year Pale Ale' }]);
});

app.listen(8888, () => {
    console.log('Listening on 8888');
});

