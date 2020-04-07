
const { Client } = require('pg');

const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000


  
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
  rejectUnauthorized: false
});





console.log ( process.env.DATABASE_URL)



express()
  .use(express.static(path.join(__dirname, '')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('index.html'))
  .get('/cool', (req, res) => res.send(cool()))
  .get('/times', (req, res) => res.send(showTimes()))
  
  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
	  
client.query('INSERT INTO logaccess (nom,dateacces,Stamp) VALUES (\'mon nom1\',\'2020-07-04\',\'2020-07-04\'::timestamp);', (err, res) => {
	   console.log( " erreur sql");
	   console.log( res);
	   console.log( err); 

	});
	 
	  
      const result = await client.query('SELECT * FROM logaccess');
      const results = { 'results': (result) ? result.rows : null};
	  res.send ( results)
   //   res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

  
  

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  
  showTimes = () => {
  let result = ''
  
  let date_ob = new Date();
  
  return date_ob;
}






/*


const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

  
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
  rejectUnauthorized: false
});


   
 
// vous pouvez passer le paramètre en ligne de commande. ex. node static_server.js 3000
var port =  process.env.PORT || 80;

http.createServer(function (req, res) {
  console.log(`${req.method} ${req.url}`);
  // découpe l'URL
  const parsedUrl = url.parse(req.url);
  // Extrait le chemin de l'URL
  let pathname = `.${parsedUrl.pathname}`;
  // Associe le type MIME par rapport au suffixe du fichier demandé
  const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.md': 'text/html',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'application/font-sfnt'
  };
  fs.exists(pathname, function (exist) {
    if(!exist) {
      // si le fichier n'existe pas, renvoie 404
      res.statusCode = 404;
 	  console.log(process.env.DATABASE_URL)
   
   
     const client = await pool.connect()
	  
client.query('INSERT INTO logaccess (nom,dateacces,Stamp) VALUES (\'mon nom1\',\'2020-07-04\',\'2020-07-04\'::timestamp);', (err, res) => {
	   console.log( " erreur sql");
	   console.log( res);
	   console.log( err); 

	});
	 
	 
      const result = await client.query('SELECT * FROM logaccess');
      const results = { 'results': (result) ? result.rows : null};
	  res.end ( results)

	 
      client.release();
    
	
	
	//   res.end(`File ${pathname} not found!`);
  	


      return;
    }
    // s'il s'agit d'un répertoire, on tente d'y trouver un fichier index.html
    if (fs.statSync(pathname).isDirectory()) {
      pathname += '/index.html';
	

    }
    // lecture du fichier local
    fs.readFile(pathname, function(err, data){
      if(err){
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        // extraction du suffixe de fichier selon le chemin basé sur l'URL fournie. ex. .js, .doc, ...
        const ext = path.parse(pathname).ext;
        // si le fichier est trouvé, définit le content-type et envoie les données
        res.setHeader('Content-type', mimeType[ext] || 'text/plain' );
        res.end(data);
		
	
		
      }
    });
  });
}).listen(parseInt(port));
console.log(`Le serveur ecoute sur le port ${port}`);
 

*/




/*



drop table logaccess;
CREATE TABLE logaccess
(
    ID  SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    dateacces DATE,
    version VARCHAR(100),
    ulr VARCHAR(1000),
    Stamp TIMESTAMP

    
 );
 


GRANT ALL privileges on DATABASE da67rapi6q2i9 to mrhklehbbeihyj;

INSERT INTO logaccess (nom,dateacces,Stamp) VALUES ('mon nom ','2020-07-04','2020-07-04'::timestamp);
INSERT INTO logaccess (nom,dateacces) VALUES ('mon nom1 ','2020-07-02');
SELECT * FROM logaccess;
*/
