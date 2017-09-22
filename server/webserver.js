const express = require('express');
var credentials = require('./mysqlCredentials');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const webserver = express();



//webserver.use(cookieParser('testsecret'));
webserver.set('trust proxy', 1);
webserver.use(cookieSession({
    name: 'puzme',
    keys: ['testsecret']
}));
// Andy put this here for dev purposes, will allow Cross-Origin requests, but will most likely need to remove for production
webserver.use(cors());


webserver.use(bodyParser.urlencoded({ extended: false }))
webserver.use(bodyParser.json());
webserver.use(express.static(path.resolve(__dirname, 'public')));

const pool = mysql.createPool(credentials);
pool.getConnection(function(err, conn){
   if(err) console.log("Error connecting to MySQL database");
});

webserver.get('/puzzles', function(req, res){
    console.log("req.query.retrieve is: ", req.query.retrieve);
    if(req.query.retrieve){
        switch(req.query.retrieve) {
            case 'recent10':
                getMostRecent10Puzzles(res);//grab 10 most recent puzzles from database
                break;
            default:
                console.log("unknown query value for puzzles key");
        }
    }
    else{
        console.log("Query key puzzles is not present");
    }
});

function getMostRecent10Puzzles(res){
    var query = "SELECT p.puzzle_name, u.username AS creator, p.type, p.size, p.url_ext, p.likes, p.dislikes, p.date_created " +
                "FROM `puzzles` AS `p` " +
                "JOIN `users` AS `u`" +
                "ON p.creator_id = u.u_id";
    pool.query(query, (err, rows, fields) => {
        if(err) console.log(err);
        else res.end(JSON.stringify({success: true, data: rows}));
    });
}
webserver.post('/login', function(req, res){
    //console.log("We received facebook data: ", req.body);
    //set the session cookie to have the facebook user id.
    var facebook_uid =  req.body.response.authResponse.userID;
    req.session.userid = facebook_uid;
    //check if the user is in the database, if not add them to it
    var query = `SELECT * FROM users WHERE facebook_u_id='${facebook_uid}'`;
    pool.query(query, (err,rows,fields) => {
        console.log("Here are the rows: ", rows);
        if(rows.length === 0){
            query = `INSERT INTO users (facebook_u_id) VALUES (${facebook_uid})`;
            pool.query(query, function(error, results){
                if(error) console.log("Error inserting into users table: ", error);
                else console.log("results.affectedRows is: ", results.affectedRows);
            });
        }
    });
    res.end("Successful Login");
});

webserver.post('/create/word_guessing', function(req, res){

});

webserver.get('/*', function(req, res){
    //console.log('gettting here');
    console.log('req.session is: ', req.session);
    res.sendFile(__dirname + '/public/index.html');
});

webserver.listen(4000, function(){
    console.log('Webserver listening on port 4000');
});

//(To Go elsewhere) If a request is received with a session cookie that doesn't
//have facebook user id, redirect to login page