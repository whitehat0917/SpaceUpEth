import React, { useEffect, useCallback } from 'react'
import styled from 'styled-components'
import Web3 from 'web3'

import { useUser } from '../context/UserContext'
import { useContract } from '../context/ContractContext'

import SpacePupToken from '../abi/SpacePupToken.json'
import SpaceBoneToken from '../abi/SpaceBoneToken.json'
import TokenFarm from '../abi/TokenFarm.json'

import NavBar from './NavBar'
import StakeBox from './StakeBox'
import YieldBox from './YieldBox'


const Container = styled.div`
    margin-top: 2rem;
    width: 100%;
    height: 25rem;
`;

const Boxes = styled.div`
    display: flex;
    justify-content: space-around;
`;


/**
 * @notice The contract variables are declared. ** Kovan Network
 */

const web3 = new Web3(Web3.givenProvider)
const tokenFarmAddress = '';
const spaceboneTokenAddress = '';
const spacepupTokenAddress = ''
const spacepupToken = new web3.eth.Contract(SpacePupToken.abi, spacepupTokenAddress)
const spaceboneToken = new web3.eth.Contract(SpaceBoneToken.abi, spaceboneTokenAddress)
const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmAddress)


/**
 * @notice These functions convert to/from wei from/to eth.
 * @param {*} n This is the number to convert.
 */

const toWei = (n) => {
    return web3.utils.toWei(n, 'ether')
}

const fromWei = (n) => {
    return web3.utils.fromWei(n, 'ether')
}


export default function Main() {


    /**
     * @notice This lists the dApp's state fetched from useContext.
     *         The UserContext is declared first.
     */
    const {
        userAddress,
        setUserAddress,
        setSpacePupTokenBalance,
        stakingBalance,
        setStakingBalance,
        isStaking,
        setIsStaking,
        setSpaceBoneTokenBalance,
        setSpaceBoneTokenYield,
        spaceboneTokenYield
    } = useUser();

    /**
     * @notice The following declares the ContractContext.
     */
    
    const {
        setNetwork,
        sentStake,
        setSentStake,
        sentUnstake,
        setSentUnstake,
        sentWithdrawal,
        setSentWithdrawal
    } = useContract();


    /**
     * @notice The following functions are used for fetching both user
     *         and contract data. These functions are read-only regarding 
     *         the blockchain.
     */

    const loadUser = async() => {
        let accounts = await web3.eth.getAccounts()
        let account = accounts[0]
        return account
    }


    const loadNetwork = useCallback(async() => {
        let num = await web3.currentProvider.chainId;
        if(num === '0x1'){
            setNetwork('Mainnet')
        } else if(num === '0x3'){
            setNetwork('Ropsten')
        } else if(num === '0x4'){
            setNetwork('Rinkeby')
        } else if(num === '0x5'){
            setNetwork('Goerli')
        } else if(num === '0x2a'){
            setNetwork('Kovan')
        } else {
            setNetwork('N/A')
        }
    }, [setNetwork])


    const loadSpacePupTokenBalance = useCallback(async(usr) => {
        console.log(usr)
        let bal = await spacepupToken.methods.balanceOf(usr.toString()).call()
        let formatBal = fromWei(bal)
        if(formatBal.length > 5){
            setSpacePupTokenBalance(Number.parseFloat(formatBal).toPrecision(4))
        } else {
            setSpacePupTokenBalance(formatBal)
        }
    }, [setSpacePupTokenBalance])


    const loadStakingBalance = useCallback(async(usr) => {
        let bal = await tokenFarm.methods.stakingBalance(usr.toString()).call()
        let formatBal = fromWei(bal)
        if(formatBal.length > 5) {
            setStakingBalance(Number.parseFloat(fromWei(bal)).toPrecision(4))
        } else {
            setStakingBalance(formatBal)
        }
        if ( bal > 0){
            return true
        } else {
            return false
        }
    }, [setStakingBalance])

/**
 * @notice This function fetches the current yield accrued by user's stake.
 * @dev    This operates almost exactly as in the Solidity contract for 
 *         withdrawing yield. First, we fetch the number of minutes staked. Then,
 *         it saves the quotient of dividing the product (staking balance times 
 *         the number of minutes) by 100 (creating 1% of staked balance per minute).
 * 
 *          Before adding the initYield with the savedYield, they're both multiplied
 *          by one. This turns the string balances into numbers; otherwise, they concatenate.
 */
    const loadSpaceBoneTokenYield = useCallback(async(usr) => {
        let numOfMinutes = await tokenFarm.methods.calculateYieldTime(usr).call()
        let initYield = ((stakingBalance * numOfMinutes) / 100)
        let savedYield = await tokenFarm.methods.spaceboneTokenBalance(usr).call()

        let balA = (initYield)*1      //These variables convert the fetched strings into numbers
        let balB = (fromWei(savedYield))*1
        let totalYield = (balA + balB)

        if(totalYield.toString().length > 5) {
            return(Number.parseFloat(totalYield).toPrecision(3))
        } else {
            return totalYield
        }
    }, [stakingBalance])


    const loadSpaceBoneTokenBalance = useCallback(async(usr) => {
        let bal = await spaceboneToken.methods.balanceOf(usr).call()
        let formatBal = fromWei(bal)
        if(formatBal.length > 5) {
            return(Number.parseFloat(fromWei(bal)).toFixed(4))
        } else {
            return formatBal
        }
    }, [])



    /**
     * @notice The componentDidMount function initializes all of the previous
     *         functions for the useEffect hook.
     */

    const componentDidMount = useCallback(async() => {
        await loadNetwork()
        await loadUser().then(response => {
            setUserAddress(response)
            loadSpacePupTokenBalance(response)
            loadSpaceBoneTokenYield(response)
            loadSpaceBoneTokenBalance(response).then(response => {
                setSpaceBoneTokenBalance(response)
            })
            loadStakingBalance(response).then(response => {
                setIsStaking(response)
            })
        })
    }, [ 
        loadSpacePupTokenBalance, 
        loadStakingBalance, 
        loadNetwork,
        loadSpaceBoneTokenYield,
        loadSpaceBoneTokenBalance,
        setUserAddress,
        setSpaceBoneTokenBalance,
        setIsStaking,
    ])


    useEffect(() => {
        if(userAddress === ''){
            componentDidMount()
        }
    }, [userAddress, componentDidMount])

    /**
     * @notice This useEffect hook fetches the side effects of the loadHodlYield
     *         function in order to display the user's current yield.
     */

    useEffect(() => {
        if(stakingBalance > 0 || userAddress !== ''){
            loadSpaceBoneTokenYield(userAddress).then(response => {
                setSpaceBoneTokenYield(response)
            })
        }
    }, [userAddress, stakingBalance, spaceboneTokenYield, isStaking, setSpaceBoneTokenYield, loadSpaceBoneTokenYield, setIsStaking])

    /**
     * @notice This useEffect creates a 60 second timer when the staking mechanism
     *          is triggered.
     */
    useEffect(() => {
        let interval = null
        if(isStaking){
            interval = setInterval(() => {
                loadSpaceBoneTokenYield(userAddress).then(response => {
                    setSpaceBoneTokenYield(response)
                })
            }, 60000)
        }
        return () => clearInterval(interval)
    }, [isStaking, userAddress, loadSpaceBoneTokenYield, setSpaceBoneTokenYield])

   /**
    * @notice The following functions write to the smart contract.
    * 
    * 
    * @notice This function locks up ('stakes') Dai in the contract.
    * @dev    The sentStake, sentUnstake, and sentWithdrawal boolean values 
    *         are used as signals for the useEffect hook. Instead of setting
    *         their default value to false, they're triggered to false in the
    *         beginning of the function call. Upon receipt, they're switched to 
    *         'on.'
    * @param {*This is the amount of Dai to stake in the contract.} x 
    */

    const stake = async(x) => {
        setSentStake(false)
        let utils = { from: userAddress }
        let bal = toWei(x)
        await spacepupToken.methods.approve(tokenFarmAddress, bal).send(utils)
        await tokenFarm.methods.stake(bal).send(utils)
        .on('receipt', function(receipt){
            console.log(receipt)
            setSentStake(true)
        })
        setIsStaking(true)
    }

    const unstake = async() => {
        setSentUnstake(false)
        let utils = { from: userAddress }
        await tokenFarm.methods.unstake().send(utils)
        .on('receipt', function(receipt){
            console.log(receipt)
            setSentUnstake(true)
        })
        setIsStaking(false)
    }

    const withdrawYield = async() => {
        setSentWithdrawal(false)
        let utils = { from: userAddress }
        await tokenFarm.methods.withdrawYield().send(utils)
        .on('receipt', function(receipt){
            console.log(receipt)
            setSentWithdrawal(true)
        })
    }


    //
    //waiting to fetch new balance after function call
    //

    //for dai

    /**
     * @notice These useEffect hooks are triggered by the preceding functions.
     *         The former hook fetches the SpacePup Token balances (SpacePup balance and stakingBalance).
     *         The latter effect fetches the SpaceBone Token balance and current yield.
     */

    useEffect(() => {
        if(sentStake || sentUnstake){
            loadSpacePupTokenBalance(userAddress)
            loadStakingBalance(userAddress)
        }
    }, [sentStake, sentUnstake, userAddress, loadSpacePupTokenBalance, loadStakingBalance])


        useEffect(() => {
        if(sentWithdrawal){
            loadSpaceBoneTokenBalance(userAddress).then(res => {
                setSpaceBoneTokenBalance(res)
            })
            setSpaceBoneTokenYield(0)
        }
    }, [sentWithdrawal, userAddress, loadSpaceBoneTokenBalance, setSpaceBoneTokenYield, setSpaceBoneTokenBalance])

    return (
        <div>
            <NavBar/>
            <Container>
                <Boxes>
                    <StakeBox  
                        stake={stake} 
                        unstake={unstake}
                    />
                    <YieldBox withdrawYield={withdrawYield}/> 
                </Boxes>
            </Container>
        </div>
    )
}
