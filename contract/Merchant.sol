// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface wironContract {
    function balanceOf(address account) external returns (uint256);
    function transfer(address to, uint256 amount) external;
    function transferFrom(address from, address to, uint256 amount) external;
    function approve(address spender, uint256 amount) external;
    function transferWithMetadata(
        address to,
        uint256 amount,
        bytes memory metadata
    ) external;
}

contract Merchant {
    address public wironContractAddress =
        0x3dE166740d64d522AbFDa77D9d878dfedfDEEEDE;
    wironContract public wContract;

    // mapping(bytes=>uint256) private balance;

    struct Product {
        string productId;
        uint256 price;
        uint256 quantity;
        uint256 timestamp;
        bytes owner;
    }

    Product[] private transactions;

    constructor() {
        wContract = wironContract(wironContractAddress);
    }

    function transferWIRON(
        address to,
        uint256 amount,
        bytes memory metadata,
        string memory productId,
        uint256 price,
        uint256 quantity
    ) external {
        require(amount == price * quantity, "invalid amount");
        wContract.transferWithMetadata(to, amount, metadata);
        // balance[metadata]+=amount;

        transactions.push(
            Product(productId, price, quantity, block.timestamp, metadata)
        );
    }

    function withdrawWIRON(address to, uint256 amount) public {
        wContract.transfer(to, amount);
    }

    // function allowWIRON(uint256 amount) public {
    //     wContract.approve(address(this), amount);
    // }

    function sendWIRON(uint256 amount) public {
        wContract.transferFrom(msg.sender, address(this), amount);
    }

    // function balanceOfWIRON() public returns (uint256){
    //     return wContract.balanceOf(address(this));
    // }

    mapping(address => bytes[]) addressMap;

    function registerShop(bytes memory _ironAddress) public {
        addressMap[msg.sender].push(_ironAddress);
    }

    function addressAccounts() public view returns (bytes[] memory) {
        bytes[] memory temp = addressMap[msg.sender];
        return temp;
    }

    function viewTransactions() public view returns (Product[] memory) {
        bytes[] memory _owners = addressMap[msg.sender];

        uint256 count = 0;

        for (uint256 i = 0; i < transactions.length; i++) {
            for (uint256 j = 0; j < _owners.length; j++) {
                if (compareBytes(transactions[i].owner, _owners[j])) {
                    count++;
                }
            }
        }

        Product[] memory result = new Product[](count);

        uint256 index = 0;
        for (uint256 i = 0; i < transactions.length; i++) {
            for (uint256 j = 0; j < _owners.length; j++) {
                if (compareBytes(transactions[i].owner, _owners[j])) {
                    result[index] = transactions[i];
                    index++;
                }
            }
        }

        return result;
    }

    function compareBytes(
        bytes memory a,
        bytes memory b
    ) private pure returns (bool) {
        if (a.length != b.length) {
            return false;
        }

        for (uint256 i = 0; i < a.length; i++) {
            if (a[i] != b[i]) {
                return false;
            }
        }
        return true;
    }
}
