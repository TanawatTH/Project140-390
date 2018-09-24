var express = require ('express');
var pgp = require('pg-promise')();
var db  =pgp('postgres://nkwnjxuiidwrns:b72b4de42f726173c9acee8a85dd10ed1c8dc1a2ab7402a6feebbbccb8b14f85@ec2-54-163-245-44.compute-1.amazonaws.com:5432/d34ii1v5fr4h1e?ssl=true');
var app = express();

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
            sql += ' where id ='+id;
        }
   db.any(sql)
    .then(function(data){
        console.log('DATA:'+data);
        res.render('pages/products',{products: data})
        
    })
    .catch(function(error){
        console.log('ERROR:'+error);
    })

});

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
console.log('App is running at http://localhost:8080');

app.listen(8080);