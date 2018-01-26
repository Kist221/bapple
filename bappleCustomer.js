var mysql = require("mysql");
var inquire = require("inquire");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "top_songsDB"
});
connection.connect();

function listSongs() {
  connection.query('SELECT * FROM top5000', function (error, res, fields) {
    if (error) throw error;
    console.log("\n\n\nLIST ALL SONGS\n\n\n");
    for (var i = 0; i < res.length; i++) {
    	console.log("\nPosition: " + res[i].position);
    	console.log("Artist: " + res[i].artist);
    	console.log("Song: " + res[i].song);
    	console.log("Released: " + res[i].released);
    }
    console.log(res.length);
  });
};

function findArtist(input) {
  connection.query('SELECT * FROM top5000 WHERE artist = ?', [input], function (error, res, fields) {
    if (error) throw error;
    console.log("\n\nSEARCHING FOR ARTIST: " + input.toUpperCase() + "\n\n");
    for (var i = 0; i < res.length; i++) {
    	console.log("\nPosition: " + res[i].position);
    	console.log("Artist: " + res[i].artist);
    	console.log("Song: " + res[i].song);
    	console.log("Released: " + res[i].released);
    }
    console.log(res.length);
  });
};

function findSong(input) {
  connection.query('SELECT * FROM top5000 WHERE song = ?', [input], function (error, res, fields) {
    if (error) throw error;
    console.log("\n\nSEARCHING FOR SONG: " + input.toUpperCase() + "\n\n");
    for (var i = 0; i < res.length; i++) {
    	console.log("\nPosition: " + res[i].position);
    	console.log("Artist: " + res[i].artist);
    	console.log("Song: " + res[i].song);
    	console.log("Released: " + res[i].released);
    }
    console.log(res.length);
  });
};

function listRange(first, second) {
  connection.query('SELECT * FROM top5000 WHERE position >= ? AND position <= ?', [first, second], function (error, res, fields) {
    if (error) throw error;
    console.log("\n\nSEARCHING FOR RANGE: " + first + " THROUGH " + second + "\n\n");
    for (var i = 0; i < res.length; i++) {
    	console.log("\nPosition: " + res[i].position);
    	console.log("Artist: " + res[i].artist);
    	console.log("Song: " + res[i].song);
    	console.log("Released: " + res[i].released);
    }
    console.log(res.length);
  });
};

function listDuplicates() {
  connection.query('SELECT artist FROM top5000 GROUP BY artist HAVING COUNT(*)>1', function (error, res, fields) {
    if (error) throw error;
    console.log("\n\nSEARCHING FOR DUPLICATES\n\n");
    for (var i = 0; i < res.length; i++) {
    	console.log("Artist: " + res[i].artist);
    }
    console.log(res.length);
  });
};

function joinTables() {
  connection.query('SELECT * FROM top_5000_songs INNER JOIN top_3000_albums ON top_5000_songs.artist = top_3000_albums.artist AND top_5000_songs.released = top_3000_albums.released', function (error, res, fields) {
    if (error) throw error;
    // console.log(res);
    for (var i = 0; i < res.length; i++) {
      console.log("\nPosition: " + res[i].position);
      console.log("Artist: " + res[i].artist);      
      console.log("Song: " + res[i].song);
      console.log("Album: " + res[i].album);
      console.log("Released: " + res[i].released);
    }
    console.log(res.length);
  });
};
