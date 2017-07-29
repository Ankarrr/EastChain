pragma solidity ^0.4.4;

contract Wine {
    struct  Sorghum{
        address owner;
        string name;
        string productType;
        string date;
        string origin;
        uint price;
        string purpose; // e.g. general, wedding
        string description;
    }

    address public creator;
    // (barcode => Sorghum)
    mapping (uint => Sorghum) public SorgHums;

    function Wine() {  
        creator = msg.sender;    
    }

    function createSorghum(
        uint barcode,
        address owner,
        string name,
        string productType,
        string date,
        string origin,
        uint price,
        string purpose,
        string description) {
        SorgHums[barcode] = Sorghum(
            owner, name, productType, date, origin, price, purpose, description);
    }

    function transferSunghum(uint barcode, address receiver){
        require(SorgHums[barcode].owner == msg.sender);
        SorgHums[barcode].owner = receiver;
    }
}
