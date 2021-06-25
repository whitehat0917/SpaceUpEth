import React, { useState } from 'react'
import Main from './components/Main'
import styled from 'styled-components'
import grass from './grass.jpg'

import { UserProvider } from './context/UserContext'
import { ContractProvider } from './context/ContractContext'

const Img = styled.div`
  border: 1px solid #000;
  background-image: url(${grass});
  background-size: cover;
  width: 99/8%;
  height: 955px;
  opacity: 1.0;
`;

function App() {

  //user state
  const [ userAddress, setUserAddress ] = useState('');
  const [ spacepupTokenBalance, setSpacePupTokenBalance ] = useState('');
  const [ stakingBalance, setStakingBalance ] = useState('');
  const [ isStaking, setIsStaking ] = useState('');
  const [ spaceboneTokenBalance, setSpaceBoneTokenBalance ] = useState('');
  const [ spaceboneTokenYield, setSpaceBoneTokenYield ] = useState('');


  const userState = {
    userAddress,
    setUserAddress,
    spacepupTokenBalance,
    setSpacePupTokenBalance,
    stakingBalance,
    setStakingBalance,
    isStaking,
    setIsStaking,
    spaceboneTokenBalance,
    setSpaceBoneTokenBalance,
    spaceboneTokenYield,
    setSpaceBoneTokenYield,
  }


  //contract state
  const [ tokenFarmAddress, setTokenFarmAddress ] = useState('');
  const [ spaceboneTokenAddress, setSpaceBoneTokenAddress ] = useState('');
  const [ spacepupTokenAddress, setSpacePupTokenAddress ] = useState('');
  const [ tokenFarm, setTokenFarm ] = useState('');
  const [ spaceboneToken, setSpaceBoneToken ] = useState('');
  const [ spacepupToken, setSpacePupToken ] = useState('');
  const [ tokenFarmBalance, setTokenFarmBalance ] = useState('');
  const [ network, setNetwork ] = useState('');
  const [ web3, setWeb3 ] = useState('');
  //calls to update balances
  const [ sentStake, setSentStake ] = useState('');
  const [ sentUnstake, setSentUnstake ] = useState('');
  const [ sentWithdrawal, setSentWithdrawal ] = useState('');


  const contractState = {
    tokenFarmAddress,
    setTokenFarmAddress,
    spaceboneTokenAddress,
    setSpaceBoneTokenAddress,
    spacepupTokenAddress,
    setSpacePupTokenAddress,
    tokenFarm,
    setTokenFarm,
    spaceboneToken,
    setSpaceBoneToken,
    spacepupToken,
    setSpacePupToken,
    tokenFarmBalance,
    setTokenFarmBalance,
    network,
    setNetwork,
    web3,
    setWeb3,
    //calls to update balances
    sentStake,
    setSentStake,
    sentUnstake,
    setSentUnstake,
    sentWithdrawal,
    setSentWithdrawal
  }




  return (
    <Img>
      <UserProvider value={userState}>
        <ContractProvider value={contractState}>
          <Main/>
        </ContractProvider>
      </UserProvider>
    </Img>
  )
}

export default App;

