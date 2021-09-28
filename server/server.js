//requires
const express = require('express')
const app = express ();
const bodyParser = require( 'body-parser' );

//uses

app.use( express.static( 'server/public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );

//globals
const PORT = 5000;
let history = [];



//spin up server 
app.listen(PORT, ()=>{
    console.log('server up on:', PORT);

})

// routes
app.get('/history', ( req, res )=>{
    console.log( 'history GET hit');
    res.send( history );
}) 

app.post( '/history', ( req, res )=>{
    console.log( 'history POST hit:', req.body );
    equation = req.body;
    
   console.log(equation);
   //equation +
   if (equation.operator === '+'){
       equation.total = parseInt(equation.num1, 10) + parseInt(equation.num2, 10);
   }
   //equation -
   else if (equation.operator === '-'){
    equation.total = parseInt(equation.num1, 10) - parseInt(equation.num2, 10);

   }
   // equation *
   else if (equation.operator === '*'){
    equation.total = parseInt(equation.num1, 10) * parseInt(equation.num2, 10);

   }
   
   // equation /
   else if (equation.operator === '/'){
    equation.total = parseInt(equation.num1, 10) / parseInt(equation.num2, 10);

   }

    history.push(equation);


    res.sendStatus( 200 ); // 200 = generic OK, 201 = created
})
//Logic
