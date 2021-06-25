import React, { useContext } from 'react'

export const UserContext = React.createContext({
    userAddress: '', 
    setUserAddress: () => [],
    spacepupTokenBalance: '', 
    setSpacePupTokenBalance: () => {},
    stakingBalance: '',
    setStakingBalance: () => {},
    isStaking: '',
    setIsStaking: () => {},
    spaceboneTokenBalance: '',
    setSpaceBoneTokenBalance: () => {},
    spaceboneTokenYield: '',
    setSpaceBoneTokenYield: () => {}
})

export const UserProvider = UserContext.Provider
export const useUser = () => useContext(UserContext)