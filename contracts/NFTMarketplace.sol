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
        uint256 tokenId;
        address owner;
        address seller;
        uint256 price;
        uint256 likes;
        bool isListed;
    }

    mapping(uint256 => ListedNFT) ListedNFTId;
    mapping(uint256 => address) userSoldItems;

    event ListingNFT(
        uint256 indexed tokenId,
        address owner,
        address seller,
        uint256 price,
        uint256 likes,
        bool isListed
    );

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

    function createNFT(string memory _tokenURI, uint256 _price)
        public
        payable
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newTokenID = _tokenIds.current();

        _setTokenURI(newTokenID, _tokenURI);
        _safeMint(msg.sender, newTokenID);

        listNFT(_price, newTokenID);
        return newTokenID;
    }

    function listNFT(uint256 _price, uint256 _tokenID) internal {
        ListedNFTId[_tokenID] = ListedNFT({
            tokenId: _tokenID,
            owner: address(this),
            seller: msg.sender,
            price: _price,
            likes: 0,
            isListed: true
        });
        _transfer(payable(msg.sender), address(this), _tokenID);
        emit ListingNFT(_tokenID, address(this), msg.sender, _price, 0, true);
    }

    function getAllNFTs() public view returns (ListedNFT[] memory) {
        uint256 currentTokenID = _tokenIds.current();
        ListedNFT[] memory allNFTs = new ListedNFT[](currentTokenID);

        for (uint256 i = 0; i < currentTokenID; i++) {
            allNFTs[i] = ListedNFTId[i + 1];
        }
        return allNFTs;
    }
}
