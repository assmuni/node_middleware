// ### PURE NODE JS
// var http = require('http');
// var fs = require('fs');

// var server = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-type': 'text/plain'});
//     // res.write('IAM THE PURES NODE SERVER');
//     // res.end();
//     fs.createReadStream(__dirname+'/files/about.txt').pipe(res);
// });

// server.listen(3000, '127.0.0.1', () => { console.log(`Server e mlaku dab!!`) });



// ### NODE JS + EXPRESS + EJS

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// # berguna sebagai middleware untuk mengencode body pada url (data sebuah from) yg akan di parse
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');

// # ini contoh middleware
// # next di gunakan utuk memberitahu jika suda selesai dengan proses ini lanjutkan ke proses berikutnya (get('/'))
// app.use('/assets', function(req, res, next){
//     console.log(req.url);
//     next();
// });

// # express.static di gunakan untuk meload file static
// # param_1 : routing directory yg di butuhkan ntuk dapat menggukan file static bisanya berupa 
// file css yg diload pada halaman frontend (assets/style.css)
// # param_2 : nama folder yg digunakan untuk menampung file static tadi 
app.use('/assets', express.static('assets'));

app.get('/', function(req, res) {
    // res.send('IAM THE SERVER FROM EXPRESS');
    var homeData = {
        name: 'wawan tanujaya',
        gender: 'male'
    }
    res.render('home', {data: homeData});
});

// # Way #1
// # how we catch the query string
app.get('/query', function(req, res){
    // console.log(req.query);

    res.render('query', {qs: req.query, qs2: JSON.stringify(req.query) });
});

// # Way #2
// # mengahandle post data dengan bantuan middleware dari body-parser agar dapat mengambildata dari req.body
app.post('/query', urlencodedParser, function(req, res){
    console.log(req.body);

    res.render('query', {qs: JSON.stringify(req.body) });
});

app.listen(3000, () => {
    console.log(`Server e mlaku gaes!!`);
});

// ### CAUNTION:
// # MIDLEWARE: is a the code that runs between the request and response or code in the middle
// # static files: is a file like css, image