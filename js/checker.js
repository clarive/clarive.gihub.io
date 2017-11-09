
var pending = 0;
var errors = 0;
var cnt = 0;

function sumCheck(){
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
}

$('td[url]').each( function(){

    var url = $( this ).attr('url');
    if ( ! url ) return;

    var statusResult = $( this ).siblings();
    pending++;
    cnt++;

    $.ajax({
        url: url,
        type: 'HEAD',
        success: function(result){
            statusResult.html( '  OK ' );
            sumCheck();
        },
        error: function(result){
          // data = data + " " + err;
          statusResult.html( '  ERROR' );
          statusResult.addClass('error-result');
          errors++;
          sumCheck();
        }
    });
});

