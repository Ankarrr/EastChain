var Wine = artifacts.require('./Wine.sol');

contract('Wine', function(addresses) {
    
    var g_owner = addresses[0];
    var g_recevier = addresses [1];
    it("CreateSorghum", function () {
        var wine;
        return Wine.deployed().then(function (instance) {
                wine = instance;
                return instance.createSorghum(1, 
                                        g_owner,
                                        "Sorghum", 
                                        "normal",
                                        "201707290",
                                        "Kinmen",
                                        100,
                                        "wedding",
                                        "description");
                
                 
        }).then(function () {

            return wine.SorgHums(1);
        }).then(function(sorghum){

            var [recevier, name, productType, date, origin, price, purpose, description]
                = sorghum;
            assert.equal(recevier, g_owner, "Check Owner Error");
            assert.equal(name, "Sorghum", "Check Name Error");
            assert.equal(productType, "normal", "Check productType Error");
            assert.equal(date, "201707290", "Check date Error");
            assert.equal(origin, "Kinmen", "Check origin Error");
            assert.equal(price, 100, "Check price Error");
            assert.equal(purpose, "wedding", "Check purpose Error");
            assert.equal(description, "description", "Check description Error");
        });
    });

    it("transferSunghum", function () {
        var wine ;

        return Wine.deployed().then(function (instance) {
            wine = instance;

            return instance.createSorghum(1, 
                        g_owner,
                        "Sorghum", 
                        "normal",
                        "201707290",
                        "Kinmen",
                        100,
                        "wedding",
                        "description");
        }).then(function () {
            return wine.transferSunghum(1, g_recevier);
        }).then(function () {
            return wine.SorgHums(1);
        }).then(function (sorghum) {
            var [owner, name, productType, date, origin, price, purpose, description]
                = sorghum;
            assert.equal(g_recevier, owner, "Check Owner Error");
        });
    });
});