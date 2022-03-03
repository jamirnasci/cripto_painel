const express = require("express")
const bodyParser = require('body-parser')
const axios = require("axios")
const cheerio = require("cheerio")
const ejs = require("ejs")
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', './views')

var real;
axios("https://br.investing.com/currencies/usd-brl")
    .then((response) => {
        var $ = cheerio.load(response.data)
        real = $('[data-test="instrument-price-last"]').text()
        console.log(real)
    })

var precosRender;
function ajustData(dados, criptoPrice, nome) {
    precosRender = {
        capitalizacao: dados[0],
        circulacao: dados[1],
        max: dados[2],
        vol: dados[3],
        diaria: dados[4],
        var7d: dados[5],
        price: '$' + criptoPrice,
        criptonome: nome,
        real: real
    }
}
app.get("/main", (req, res) => {
    axios("https://br.investing.com/crypto/" + 'bitcoin')
        .then((response) => {
            var arrayData = []
            var $ = cheerio.load(response.data)
            var preco = $("#last_last").text()
            var nome = $('[class="float_lang_base_1 relativeAttr"]').text()
            var dados = $(".dataItem").each(function (i, el) {
                arrayData.push($(this).text())
            })
            console.log(nome)
            ajustData(arrayData, preco, nome)
        })
        .then(function () { res.render('main', { precosRender }) })
})
/*-----------------------------------------------------------*/
app.get("/ethereum", (req, res) => {
    axios("https://br.investing.com/crypto/" + 'ethereum')
        .then((response) => {
            var arrayData = []
            var $ = cheerio.load(response.data)
            var preco = $("#last_last").text()
            var nome = $('[class="float_lang_base_1 relativeAttr"]').text()
            var dados = $(".dataItem").each(function (i, el) {
                arrayData.push($(this).text())
            })
            console.log(nome)
            ajustData(arrayData, preco, nome)
        })
        .then(function () { res.render('ethereum', { precosRender }) })
})
/*-----------------------------------------------------------*/
app.get("/tether", (req, res) => {
    axios("https://br.investing.com/crypto/" + 'tether')
        .then((response) => {
            var arrayData = []
            var $ = cheerio.load(response.data)
            var preco = $("#last_last").text()
            var nome = $('[class="float_lang_base_1 relativeAttr"]').text()
            var dados = $(".dataItem").each(function (i, el) {
                arrayData.push($(this).text())
            })
            console.log(nome)
            ajustData(arrayData, preco, nome)
        })
        .then(function () { res.render('tether', { precosRender }) })
})
/*-----------------------------------------------------------*/
app.get("/bnb", (req, res) => {
    axios("https://br.investing.com/crypto/" + 'bnb')
        .then((response) => {
            var arrayData = []
            var $ = cheerio.load(response.data)
            var preco = $("#last_last").text()
            var nome = $('[class="float_lang_base_1 relativeAttr"]').text()
            var dados = $(".dataItem").each(function (i, el) {
                arrayData.push($(this).text())
            })
            console.log(nome)
            ajustData(arrayData, preco, nome)
        })
        .then(function () { res.render('bnb', { precosRender }) })
})
/*-----------------------------------------------------------*/
app.get("/usd-coin", (req, res) => {
    axios("https://br.investing.com/crypto/" + 'usd-coin')
        .then((response) => {
            var arrayData = []
            var $ = cheerio.load(response.data)
            var preco = $("#last_last").text()
            var nome = $('[class="float_lang_base_1 relativeAttr"]').text()
            var dados = $(".dataItem").each(function (i, el) {
                arrayData.push($(this).text())
            })
            console.log(nome)
            ajustData(arrayData, preco, nome)
        })
        .then(function () { res.render('usd-coin', { precosRender }) })
})
/*-----------------------------------------------------------*/
app.listen(5555)