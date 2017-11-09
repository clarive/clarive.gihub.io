
var pending = 0;
var errors = 0;
var cnt = 0;

$('td[url]').each( function(){

    var url = $( this ).attr('url');
    if ( ! url ) return;
    var file = $( this ).attr('file') || '/favicon.ico';

    var statusResult = $( this ).siblings();
    pending++;
    cnt++;

    var p = new Ping({ favicon: file });
    p.ping( url, function(err, data) {
      if (err) {
          data = data + " " + err;
          statusResult.html( '  ERROR' );
          statusResult.addClass('error-result');
          errors++;
      }
      else {
          statusResult.html( '  OK' );
      }
      setTimeout(function(){
          pending--;
          if ( pending == 0 ) {
              if( errors ) {
                  $( '#final-status').html( errors + '/' + cnt +  " problem(s) detected in our online systems" );
              }
              else {
                  $( '#final-status').html( "All Clarive websites are operating normally" );
              }
          }
      }, 800 );
    });
});

