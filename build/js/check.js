function getMessage(a, b) {
  var sum = 0;
  var length = 0;
  var minLength = 0;
      
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
          minLength = Math.min(a.length, b.length);
          
          for(var i = 0; i < minLength; i++){
              length += a[i] * b[i];
          }
      
          return 'Я прошёл ' + length + ' метров';
      }
      
      for(var i = 0; i < a.length; i++){
          sum += Math.abs(a[i]);	    
	  }
      
      return 'Я прошёл ' + sum + ' шагов';
  }
}
