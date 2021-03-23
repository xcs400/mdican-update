
const { Client } = require('pg');

const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT 


  
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
   ssl: { rejectUnauthorized: false },
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

  
    .get('/cre', async (req, res) => {
      console.log(`Listening on ${ PORT }`);
      console.log( process.env.DATABASE_URL );
       res.send ( `Listening on ${ PORT }` )
    }
  )

  

   .get('/log', async (req, res) => {
    try {
      const client = await pool.connect()

 	  
 let date_ob = new Date();

	 var sql= 'INSERT INTO logaccess (nom ,dateacces,url,Recorddate,version) VALUES ( ' 
	 sql =sql+ '\''+  req.query.nom  + '\' ,'
	 sql =sql+ '\''+  req.query.dateacces  + '\' ,'
	 sql =sql+ '\''+  req.query.url   + '\' ,'
	 sql =sql+ '\''+  date_ob   + '\' ,'
	 sql =sql+ '\''+  req.query.version  + '\' '
	 	 
	 sql =sql + ');'
	 
	 console.log (sql)
		
	client.query(sql, (err, res) => {
		 if (err) {
		   console.log( " erreur sql");
		   console.log( res);
		   console.log( err); 
		 }

	});
	
		if (req.query.deploy=="yes")
			res.send("<h1> The update is being deployed, the application should start automatically</h1>" )
		else
		   res.sendFile('./version.html',  { root: __dirname })
	   
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




drop table logaccess;
CREATE TABLE logaccess
(
    ID  SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    dateacces VARCHAR(100),
    version VARCHAR(100),
    url VARCHAR(1000),
    Recorddate  VARCHAR(100)

    
 );
 

GRANT ALL privileges on DATABASE da67rapi6q2i9 to mrhklehbbeihyj;

INSERT INTO logaccess (nom,dateacces) VALUES ('mon nom ','2020-07-04');
SELECT * FROM logaccess;
*/
