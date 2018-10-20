var express = require ('express');
var pgp = require('pg-promise')();
//var db =pgp(process.env.DATABASE_URL);
var db  =pgp('postgres://mjqgxubthwcnsp:e43040cad549a99461fd2210bf9f63773e37498abc3bdd2df51b3057c3ca167b@ec2-107-20-249-48.compute-1.amazonaws.com:5432/d6cv4bbortkf2b?ssl=true');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 





  //app.use(express.static('static'));
  app.set('view engine', 'ejs');


  app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/about', function(req, res) {
  var name = 'Tanawat Monpipat';
  var hobbies =['Music','Movie','Programming']
  var bdate = '18/04/1997'
  res.render('pages/about',{fullname : name,hobbies :hobbies,bdate:bdate});
  
});
 //display all products
app.get('/products/:pid', function(req, res) {
   var pid = req.params.pid;
   var sql = "select * from products where id =" + pid;
   db.any(sql)
   .then(function(data){
       
      
       res.render('pages/product_edit',{products: data[0]});
   })
   .catch(function(error){
       console.log('ERROR:'+error);
   })
    




});


//Display all products
app.get('/products', function(req, res) {
    var id = req.param('id');
    var sql='select* from products';
        if(id){
            sql += ' where id ='+id +' order by id ASC';
        }
   db.any(sql+' order by id ASC')
    .then(function(data){
        console.log('DATA:'+data);
        res.render('pages/products',{products: data})
        
    })
    .catch(function(error){
        console.log('ERROR:'+error);
    })

});
//user
app.get('/users/:id', function(req, res) {
  var id = req.params.id;
  var sql = 'select * from users';
  if(id){
      sql += ' where id ='+ id;


  }

 db.any(sql)
    .then(function(data){
        console.log('DATA:'+ data);
        res.render('pages/users',{users : data})

    })
    .catch(function(error){
        console.log('ERROR:'+ error);

    })
});
// user 
app.get('/users', function(req, res) {
    var id = req.params.id;
    var sql = 'select * from users';
    if(id){
        sql += ' where id ='+ id;
  
  
    }
  
   db.any(sql)
      .then(function(data){
          console.log('DATA:'+ data);
          res.render('pages/users',{users : data})
  
      })
      .catch(function(error){
          console.log('ERROR:'+ error);
  
      })
  });

//update data
app.post('/products/update',function(req, res){
    var id = req.body.id;
    var title = req.body.title;
    var price = req.body.price;

    var sql = `update products set title =  '${title}', price = '${price}' where id = ${id}`;

// db.none
     db.none(sql);
       console.log('UPDATE: ' + sql);
    res.redirect('/products');
     db.none(sql);
       console.log('UPDATE: ' + sql);
    res.redirect('/products');
    


    
});

 // delete
app.get('/product_delete/:pid',function (req, res) {
    var id = req.params.pid;
    var sql = 'DELETE FROM products';
    if (id){
            sql += ' where id ='+ id;
    }
    db.any(sql)
        .then(function(data){
            console.log('DATA:'+data);
            res.render('pages/products',{products : data});
            
        })
        .catch(function(data){
                console.log('ERROR:'+console.error);
                
    })
 });
 
 //add Product
app.get('/insert',function (req, res) {
    res.render('pages/insert'); 
})
app.post('/products/insert', function (req, res) {
    var id = req.body.id;
    var title = req.body.title;
    var price = req.body.price;
    var sql = `INSERT INTO products (id,title,price)
    VALUES ('${id}', '${title}', '${price}')`;
    //db.none
    console.log('UPDATE:' + sql);
    db.any(sql)
        .then(function (data) {
            console.log('DATA:' + data);
            res.redirect('/products')
        })

        .catch(function (error) {
            console.log('ERROR:' + error);
        })
});


var port = process.env.PORT || 8080;
app.listen(port, function() {
console.log('App is running on http://localhost:' + port);
});