function getMessage(a, b) {
  var sum = 0;
  var length = 0;
      
  if(typeof a === 'boolean') {
      if(a) {
          return 'Я попал в ' + b;
      }
      else{
          return 'Я никуда не попал';          
      }
  }
  
  if(typeof a === 'number') {
      return 'Я прыгнул на '  + a * 100 +  ' сантиметров';
  }
  
  if(Array.isArray(a)) {
      if(Array.isArray(b)) {
          if((a.length < b.length)){
              for(var i = 0; i < a.length; i++){
                  length += a[i] * b[i];
              }
          }
          else{
              for(var i = 0; i < b.length; i++){
                  length += a[i] * b[i];	
               }
          }
          
          return 'Я прошёл ' + length + ' метров';
      }
      
      for(var i = 0; i < a.length; i++){
          sum += Math.abs(a[i]);	    
	  }
      
      return 'Я прошёл ' + sum + ' шагов';
  }
}
