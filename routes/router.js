const express = require('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
router.use(express.static('public'));

const recipieRoutes = require('./api/monsterRoutes');

router.use('/monsters', recipieRoutes);

router.get('/', (req, res) => {
    const url = 'https://api.sampleapis.com/monstersanctuary/monsters';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.render('pages/home', {
                title: 'Monster Mash',
                name: 'Lets get ready to rumble',
                data
            });
        })
        .catch(error => {
            console.log('Error', error)
        });
});

router.get('*', (req, res) => {
    if(req.url == '/favico/ico') {
        res.end();
    } else {
        res.render('pages/error', {
            title: `Error 404`,
            name: 404,
        })
    }
})

module.exports = router;