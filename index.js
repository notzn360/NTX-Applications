const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const app = express();
const port = 3000; // você pode alterar

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Página inicial
app.get('/', (req, res) => {
    const bots = fs.readJsonSync('./bots/bots.json'); // lista de bots
    res.render('index', { bots });
});

// Alterar token, dono, ligar/desligar bot
app.post('/update-bot', (req, res) => {
    const { botId, token, owner } = req.body;
    let bots = fs.readJsonSync('./bots/bots.json');
    if(bots[botId]){
        bots[botId].token = token;
        bots[botId].owner = owner;
        fs.writeJsonSync('./bots/bots.json', bots);
    }
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`🌐 Site rodando em http://localhost:${port}`);
});
