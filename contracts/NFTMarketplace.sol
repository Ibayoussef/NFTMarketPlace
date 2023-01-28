// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

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
        uint256 price;
        uint256 likes;
        bool islisted;
    }

    mapping(uint256 => ListedNFT) ListedNFTId;
    mapping(uint256 => address) userSoldItems;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor(address _owner) ERC721("NFTify NFT", "NFY") {
        owner = _owner;
    }

    function setFeePrice(uint256 _newFee) public onlyOwner {
        feePrice = _newFee;
    }

    function getFeePrice() public view returns (uint256) {
        return feePrice;
    }

    function getNFTbyID(uint256 _tokenID)
        public
        view
        returns (ListedNFT memory)
    {
        return ListedNFTId[_tokenID];
    }

    function lastNFTListd() public view returns (ListedNFT memory) {
        uint256 currentToken = _tokenIds.current();
        return ListedNFTId[currentToken];
    }

    function getCurrentTokenID() public view returns (uint256) {
        return _tokenIds.current();
    }
}
