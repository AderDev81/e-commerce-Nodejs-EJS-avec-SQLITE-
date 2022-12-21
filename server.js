const express = require('express');
const app = express();
const path = require("path");
const sqlite3 = require("sqlite3").verbose();


app.set('views','./views');
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));

// Connexion à la base de donnée SQlite
const db_name = path.join(__dirname, "", "produit.db");
const db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connexion réussie à la base de données 'produit.db'");
});

app.get('/ListeProd', (req,res)=>{
    const sql = "SELECT * FROM Produits ";
    db.all(sql, (err, rows) => {
        if (err) {
        return console.error(err.message);
        }
        res.render("pages/ListeProd", { produits: rows });
    });
});
app.get('/', (req,res)=>{
  const sql = "SELECT * FROM Produits ";
  db.all(sql, (err, rows) => {
      if (err) {
      return console.error(err.message);
      }
      res.render("pages/index", { produits: rows });
  });
});
app.get('/itemprod/:REF', (req,res)=>{
  const REF = req.params.REF;
  const sql = "SELECT * FROM Produits where Ref= ?";
  db.get(sql,REF, (err, rows) => {
      if (err) {
      return console.error(err.message);
      }
      res.render("pages/itemprod", { produit: rows });
  });
});
app.get('/apropos', (req,res)=>{
  res.render("pages/apropos");
});





app.listen(3000 , ()=>{console.log('serveur en cours d\'exécusion' )});

