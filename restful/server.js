// ------
// Server
// ------

var BodyParser = require( 'body-parser' );

var Http = require( 'http' ),
    Router = require( 'router' ),
    server,
    router;
router = new Router();
 
server = Http.createServer( function( request, response ) {
  router( request, response, function( error ) {
    if ( !error ) {
      response.writeHead( 404 );
    } else {
      // Handle errors
      console.log( error.message, error.stack );
      response.writeHead( 400 );
    }
    response.end( 'RESTful API Server is running!' );
  });
});
 
server.listen( 3000, function() {
  console.log( 'Listening on port 3000' );
});

router.use( BodyParser.text() );

// -------
// Methods
// -------

function queryWine( request, response ) {
    var barcode = request.params.barcode;
    response.writeHead( 200, {
        'Content-Type' : 'text/plain'
    });
    var json = JSON.stringify({ 
        owner: "0xc39f297a170f250ca99ee92beec0414b297f7e9b",
        name: "KINMEN WEDDING LIQUOR",
        productType: "Wine",
        date: "20170309",
        origin: "Taiwan Kinmen",
        price: 2500,
        purpose: "Wedding",
        description: "600ml, 58 degrees, contact: 0800-033-823"
    });
    response.end( json );
}
router.get( '/queryWine/:barcode', queryWine );
