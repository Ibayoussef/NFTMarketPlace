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

    mapping(uint256 => ListedNFT) public ListedNFTId;
    mapping(address => uint256) userSoldItems;
    mapping(uint256 => mapping(address => bool)) userLikedItem;

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

        _safeMint(msg.sender, newTokenID);
        _setTokenURI(newTokenID, _tokenURI);
        listNFT(_price, newTokenID);
        return newTokenID;
    }

    function listNFT(uint256 _price, uint256 _tokenID) internal {
        require(msg.value == feePrice);
        require(_price > 0);
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
        uint256 currentId;
        uint256 currentIndex = 0;
        ListedNFT[] memory allNFTs = new ListedNFT[](currentTokenID);

        for (uint256 i = 0; i < currentTokenID; i++) {
            currentId = i + 1;
            ListedNFT storage currentItem = ListedNFTId[currentId];
            allNFTs[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return allNFTs;
    }

    function getUserNFTS() public view returns (ListedNFT[] memory) {
        uint256 currentTokenID = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;
        uint256 currentId;
        for (uint256 i = 0; i < currentTokenID; i++) {
            if (
                ListedNFTId[i + 1].owner == msg.sender ||
                ListedNFTId[i + 1].seller == msg.sender
            ) {
                itemCount += 1;
            }
        }
        ListedNFT[] memory allUserNFTs = new ListedNFT[](itemCount);
        for (uint256 i = 0; i < currentTokenID; i++) {
            if (
                ListedNFTId[i + 1].owner == msg.sender ||
                ListedNFTId[i + 1].seller == msg.sender
            ) {
                currentId = i + 1;
                ListedNFT storage currentItem = ListedNFTId[currentId];
                allUserNFTs[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return allUserNFTs;
    }

    function addLikeToNft(uint256 _tokenID) public {
        require(!userLikedItem[_tokenID][msg.sender]);
        ListedNFTId[_tokenID].likes += 1;
        userLikedItem[_tokenID][msg.sender] = true;
    }

    function excuteSale(uint256 _tokenID) public payable {
        uint256 price = ListedNFTId[_tokenID].price;
        address seller = ListedNFTId[_tokenID].seller;
        require(msg.value >= price, "Insufficient funds to purchase");
        userSoldItems[seller] += 1;
        ListedNFTId[_tokenID].seller = payable(msg.sender);
        _transfer(address(this), payable(msg.sender), _tokenID);
        approve(address(this), _tokenID);
        payable(owner).transfer(feePrice);
        payable(seller).transfer(price);
    }
}
