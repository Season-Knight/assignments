
// for (var=1; i<=100; i++){
// var = output
    // if ( i % 3 == 0) && ( i % 5 == {
        // console.log("FizzBuzz")
    // }
// }




  
    for (r = 1; r <=100; r++) { 
      var output = '';
  if (r % 3 == 0) {output += 'Fizz';}
  if (r % 5 == 0) {output += 'Buzz';}
 // else if (r % 5 && r % 3 == 0) {output += 'FizzBuzz';}
  if (output == '') {output = r;}
  console.log(output)
    }
  
