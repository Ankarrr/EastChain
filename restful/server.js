// ------
// Server
// ------

var cors = require('cors')
var express = require('express');
var app = express()
app.use(cors())

app.listen(7698, function () {
  console.log('CORS-enabled web server listening on port 7698')
})

var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
console.log(web3.version);

var abi = [ { "constant": true, "inputs": [], "name": "creator", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "barcode", "type": "uint256" } ], "name": "querySorghum", "outputs": [ { "name": "ownerAddress", "type": "address" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "SorgHums", "outputs": [ { "name": "owner", "type": "address" }, { "name": "name", "type": "string" }, { "name": "productType", "type": "string" }, { "name": "date", "type": "string" }, { "name": "origin", "type": "string" }, { "name": "price", "type": "uint256" }, { "name": "purpose", "type": "string" }, { "name": "description", "type": "string" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "barcode", "type": "uint256" }, { "name": "receiver", "type": "address" } ], "name": "transferSunghum", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "barcode", "type": "uint256" }, { "name": "owner", "type": "address" }, { "name": "name", "type": "string" }, { "name": "productType", "type": "string" }, { "name": "date", "type": "string" }, { "name": "origin", "type": "string" }, { "name": "price", "type": "uint256" }, { "name": "purpose", "type": "string" }, { "name": "description", "type": "string" } ], "name": "createSorghum", "outputs": [], "payable": false, "type": "function" }, { "inputs": [], "payable": false, "type": "constructor" } ];

var wineContract = new web3.eth.Contract(abi, "0x19e424a5703994f8e590b0a5263229ab8bf7683e");

// ------
/*
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
*/

// ---------
// test data
// ---------
var txs = [
    {"name": "Kinmen Kaoliang Liquor Inc.", "receiverAddress": "0x3be418402d328b84973a3fb4f5cef84d9419296b", "txHash": "0x027f0fc3deb1f60cee1a27063a005425400d65b3a248bebe7b29856f80c72582"},
    {"name": "Anderson", "receiverAddress": "0xc39f297a170f250ca99ee92beec0414b297f7e9b", "txHash": "0x9fb326551cc66b6cd1d4d23733e174ea01d2072f3151317fe70685a74d66c4b7"}
];

var wineInfo = {
    owner: "0xc39f297a170f250ca99ee92beec0414b297f7e9b",
    name: "KINMEN WEDDING LIQUOR",
    productType: "Sorghum wine",
    date: "20170309",
    origin: "Taiwan, Kinmen",
    price: 2500,
    purpose: "Business",
    description: "Ingredients: sorghum and wheat, Volume: 600 ml, ABV: 58 degrees, Contact information: 0800-033-823"
};

// ---------------
// Methods for app
// ---------------

app.get('/queryWine/:barcode', function (req, res, next) {
    var barcode = req.params.barcode;
    // query by barcode
    var wineInfo = QueryWine(barcode);
    res.json(wineInfo);
})

app.get('/transferWine/:barcode/:receiverAddress', function (req, res, next) {
    var barcode = req.params.barcode;
    var receiverAddress = req.params.receiverAddress;
    // transfer Wine
    var txHash = TransferWine(barcode, receiverAddress);
    res.json({
        txHash: txHash
    });
});

app.get('/queryWineHistory/:barcode', function (req, res, next) {
    var barcode = req.params.barcode;
    // query wine history by barcode
    var txs = QueryWineHistory(barcode);
    res.json({
        txHistory: txs
    });
})

function QueryWine(barcode) {
    // wineContract.methods.SorgHums(barcode).call().then(function(result){
    //     return result;
    // });
    return wineInfo;
};

function TransferWine(barcode, receiverAddress) {
    // wineContract.methods.transferSunghum(4719433007925, "0x0f8ea307971588205dae85f25371b0659c372456").call().then(function(result){
    //      return result;
    // });
    var newTxHash = "0xdd094993a095c6d947aa7d2eb8b9be8b7ba546024c8942b05a1fec7efa4683ac";
    txs.push({"name": "EastSun", "receiverAddress": "0x0f8ea307971588205dae85f25371b0659c372456", "txHash": newTxHash});
    return newTxHash;
}

function QueryWineHistory(barcode) {
    return txs;
}

// -------
// Methods
// -------
/*
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
*/
