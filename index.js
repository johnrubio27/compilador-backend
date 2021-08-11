const express = require('express');
const bodyparser = require('body-parser')
const cors = require('cors');
var app = express();

const port = process.env.PORT || 5000

//app.use(bodyparser.json())
app.use(bodyparser.json({ limit: '50mb', extended: true }));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));
//app.use(bodyparser.urlencoded({ extended: false }))
app.use(cors({ origin: 'http://localhost:4200' }))

app.get('/welcome', (req,res) =>{
    res.send({message: 'Bienvenidos'});
});

app.post('/compile', (req, res) => {
    const parser = require('./grammar');
    try {
        var count = parser.parse(req.body.code);
        res.send({ output: count.getOutput(), errors: count.getError(), symbols: count.getSymbol() });
    } catch (e) {
        console.log(e)
        res.send({ output: '#*\n' + e + '\n*#',errors: [], symbols: [] });
    }

})

app.listen(port, () => {
    console.log('on port 3000')
})