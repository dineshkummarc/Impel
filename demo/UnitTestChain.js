var AsyncUnitTestChain=new Class({Implements:[Chain,Events],length:0,num_run:0,total_time:0,failures:[],successes:[],initialize:function(){this.length=arguments.length;this.chain(arguments)},startTimer:function(a){a=(a==null)?"start_time":a;this[a]=new Date().valueOf()},stopTimer:function(c){c=(c==null)?"start_time":c;var b=new Date().valueOf();if(this[c]==null||this[c]==0){throw ("Timer "+c+" not found")}var a=b-this[c];this[c]=b;return a+"ms"},failure:function(a){a=($type(a)!="string")?"undefined":a;a=a+" "+this.stopTimer();this.failures.push(a);this.next()},success:function(a){a=($type(a)!="string")?"undefined":a;a=a+" "+this.stopTimer();this.successes.push(a);this.next()},next:function(){if(this.num_run==0){this.startTimer("total_time");this.startTimer()}if(this.num_run>=this.length){this.total_time=this.stopTimer("total_time");this.fireEvent("complete")}else{this.num_run++}try{this.callChain(this)}catch(a){console.log("unreported failure: "+a);this.next()}},showResults:function(){try{console.group("Unit Test Results")}catch(b){console.log("Unit Test Results")}console.log("Executed "+this.num_run+" unit tests in "+this.total_time);console.log("  Failed: "+this.failures.length);this.failures.each(function(c){console.log("    "+c)});console.log("  Succeeded: "+this.successes.length);this.successes.each(function(c){console.log("    "+c)});var a=this.num_run-(this.successes.length+this.failures.length);console.log("  Unreported: "+a);try{console.groupEnd()}catch(b){console.log("End of Unit Test Results")}}});