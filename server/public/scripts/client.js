
$(document).ready(onReady);

function onReady() {
    console.log('JQ');
    getHistory();
    
    $('#equalsButton').on('click', addHistory);
    $('#plusButton').on('click',plus);
    $('#subtractButton').on('click',subtract);
    $('#multiplyButton').on('click',multiply);
    $('#divideButton').on('click',divide);
    $('#clearButton').on('click',clear);

   
    
}
//global
let operator = '+';



//functions

function clear() {
    $('#num1In').val('');
    $('#num2In').val('');
    plus();
    
    
}

function plus(){
    operator = '+';
    console.log('+');
    $('#subtractButton').removeClass('active');
    $('#multiplyButton').removeClass('active');
    $('#divideButton').removeClass('active');
    $('#plusButton').addClass('active');
}

function subtract() {
    operator = '-';
    console.log('-');
    $('#plusButton').removeClass('active');
    $('#multiplyButton').removeClass('active');
    $('#divideButton').removeClass('active');
    $(this).addClass('active');
}

function multiply() {
    operator = '*';
    console.log('*');
    $('#subtractButton').removeClass('active');
    $('#plusButton').removeClass('active');
    $('#divideButton').removeClass('active');
    $(this).addClass('active');
}

function divide() {
    operator = '/';
    console.log('/');
    $('#subtractButton').removeClass('active');
    $('#multiplyButton').removeClass('active');
    $('#plusButton').removeClass('active');
    $(this).addClass('active');
}

function getHistory(){
    console.log('in getHistory');
    $.ajax({
        method: 'GET',
        url: '/history'
    }).then(function(response){
        console.log('back from server:', response);
        
        //append total if there is a history
        if (response.length > 0){ 
            let el2 = $('#total');
            el2.empty();
            el2.append(`<h3>${response[response.length-1].total}</h3>`);
        }
       

        let el = $('#history')
        el.empty();
        for(let i=0; i<response.length; i++){ 
            el.append( `<li>${response[i].num1} ${ response[i].operator} ${response[i].num2} = ${response[i].total}</li>`)};
    }).catch(function(err){
        alert('not working');
        console.log(`error`);
    })

}//end getHistory

function addHistory() {
    //collect user data as an object
    let objectToSend = {
        num1: $('#num1In').val(),
        num2: $('#num2In').val(),
        operator: operator
    }
    console.log('sending:', objectToSend);
    //console.log the object
    //add ajax post call:
    $.ajax({
        method: 'POST',
        url: '/history',
        data: objectToSend 
    }).then(function(response){
        console.log("passed test");
        getHistory();
    }).catch(function(err){
    alert('error:');
    console.log(err); 
    })//end ajax

    

    }

