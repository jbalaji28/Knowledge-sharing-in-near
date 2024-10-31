// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OneTimeConsultingToken is ERC20 {
    address public owner;

    constructor() ERC20("OneTimeConsultingToken", "OTCT") {
        owner = msg.sender;
    }

    function mintTokens(address to, uint256 amount) public {
        require(msg.sender == owner, "Only owner can mint tokens");
        _mint(to, amount);
    }

    function buyTokens(uint256 amount) public payable {
        require(msg.value == amount * 0.01 ether, "Incorrect ETH value sent");
        _mint(msg.sender, amount);
    }

    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }
}
