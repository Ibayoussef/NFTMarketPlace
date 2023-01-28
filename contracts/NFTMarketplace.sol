// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address owner;
    uint256 feePrice = 0.01 ether;

    struct ListedNFT {
        address owner;
        address seller;
        uint price;
        uint likes;
        bool islisted;
    }

    mapping (uint256, ListedNFT) ListedNFTId;
    mapping (uint256, address) userSoldItems;

    constructor(address _owner) ERC721("NFTify NFT", "NFY") {
        owner = _owner;
    }
}
