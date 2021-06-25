import React, { useContext } from 'react'

export const ContractContext = React.createContext({
    tokenFarmAddress: '',
    setTokenFarmAddress: () => {},
    spaceboneTokenAddress: '',
    setSpaceBoneTokenAddress: () => {},
    spacepupAddress: '',
    setSpacePupAddress: () => {},
    tokenFarm: '',
    setTokenFarm: () => {},
    spaceboneToken: '',
    setSpaceBoneToken: () => {},
    spacepupToken: '',
    setSpacePupToken: () => {},
    tokenFarmBalance: '',
    setTokenFarmBalance: () => {},
    network: '',
    setNetwork: () => {},
    web3: '',
    setWeb3: () => {},
    //calls to update balances
    sentStake: '',
    setSentStake: () => {},
    sentUnstake: '',
    setSentUnstake: () => {},
    sentWithdrawal: '',
    setSentWithdrawal: () => {}
})

export const ContractProvider = ContractContext.Provider
export const useContract = () => useContext(ContractContext)