/* eslint-disable no-undef */
const TokenFarm = artifacts.require("TokenFarm")
const SpaceBoneToken = artifacts.require("SpaceBoneToken")

//
//use correct SpacePup address with corresponding network
//
//Kovan Testnet address below
//

const spacepupTokenAddress = "0x0f822f49BB60f0dA96f7156231C6DA42cb4ecEd2"

module.exports = async (deployer, network, accounts) => {
  // Deploy SpaceBone Token
  await deployer.deploy(SpaceBoneToken)
  const spaceboneToken = await SpaceBoneToken.deployed()

  // Deploy TokenFarm
  await deployer.deploy(TokenFarm, spaceboneToken.address, spacepupTokenAddress)
  const tokenFarm = await TokenFarm.deployed()

  // Transfer some tokens to TokenFarm (70 billion)
  await spaceboneToken.transfer(tokenFarm.address, '70000000000000000000000000000')

}