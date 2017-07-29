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

function transferWine( request, response ) {
    var barcode = request.params.barcode;
    var reciverAddress = request.params.reciverAddress;

    // Transfer Wine

    response.writeHead( 200, {
        'Content-Type' : 'text/plain'
    });
    var json = JSON.stringify({
        txHash: "0xdd094993a095c6d947aa7d2eb8b9be8b7ba546024c8942b05a1fec7efa4683ac"
    });
    response.end( json );
}
router.get( '/transferWine/:barcode/:reciverAddress', transferWine);

function queryWine( request, response ) {
    var barcode = request.params.barcode;

    // Query Wine

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
