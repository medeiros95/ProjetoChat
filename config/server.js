//importar framework express

let express =require('express');

//importar consing
let consing = require('consign');

//importar body-parser
let bodyParser = require('body-parser');

//importar express validator
let expressValidator = require('express-validator');

//iniciar objeto express
let app = express();


//setar variaveis -- view engine e views do express
app.set('view engine', 'ejs');
app.set('views', './app/views');

//configurar midleware express static
app.use(express.static('./app/public'))

//configurar midleware body parser
app.use(bodyParser.urlencoded({extended: true}));

//configurar midleware express validator
app.use(expressValidator());

//efetua o autoload das rotas - modulos e controles para APP
consing()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);


//exportanto obj app
module.exports = app;
