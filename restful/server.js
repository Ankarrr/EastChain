// ------
// Server
// ------

var cors = require('cors')
var express = require('express');
var app = express()
app.use(cors())

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

// -----------
// app.methods
// -----------

app.listen(7698, function () {
  console.log('CORS-enabled web server listening on port 7698')
})

app.get('/queryWine/:barcode', function (req, res, next) {
    // query by barcode
    res.json({
        owner: "0xc39f297a170f250ca99ee92beec0414b297f7e9b",
        name: "KINMEN WEDDING LIQUOR",
        productType: "Wine",
        date: "20170309",
        origin: "Taiwan Kinmen",
        price: 2500,
        purpose: "Wedding",
        description: "600ml, 58 degrees, contact: 0800-033-823"
    });
})

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

function queryWineHistory( request, response ) {
    var barcode = request.params.barcode;

    // Query Wine History
    var txs = [
        {"name": "Anderson", "address": "0x3be418402d328b84973a3fb4f5cef84d9419296b", "tx_hash": "0x027f0fc3deb1f60cee1a27063a005425400d65b3a248bebe7b29856f80c72582"},
        {"name": "EastSun", "address": "0xb1e63296dd87308bc69d9dc329a70e1e70a6283db94142e884e834e2d7f979c7", "address": "0xae12aa5f569e48d245c016e65974b08a01025a4a4ddaa0c91ea6cd7ebc5c6b46"},
    ];

    response.writeHead( 200, {
        'Content-Type' : 'text/plain'
    });
    var json = JSON.stringify({
        txHistory: txs
    });
    response.end( json );
}
router.get( '/queryWineHistory/:barcode', queryWineHistory );
