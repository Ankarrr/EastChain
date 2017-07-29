var Web3 = require('web3');
var provider = new Web3.providers.HttpProvider("http://localhost:8545");
var WineContract = require('../build/contracts/Wine.json');
var contract = require('truffle-contract');

var wine = contract(WineContract);

wine.setProvider(provider);

console.log(wine.isDeployed());

wine.deployed().then(function(instance){

    console.log(`Wine Address: ${instance.address}`);
});


wine.deployed().then((instance)=>{
    instance.createSorghum(
        1, "0xb04affc47f725165d5b55ea2f7567764e0eea70a", "Normal", "20170729", "Kinmen", 100, "Wedding", "description"
    );
});


wine.deployed().then((instance)=>{
    //instance.transferSunghum
});