import express from 'express';
const app = express();

app.set('view engine', 'ejs')

app.use("/assets", express.static('./assets/'));

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(3000)