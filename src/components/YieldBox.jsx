import React from 'react'
import styled from 'styled-components'

import { useUser } from '../context/UserContext'

const YieldContainer = styled.div`
    background-color: dark;
    width: 30rem;
    height: 16rem;
    margin-top: 2rem;
    opacity: 0.9;
    color: white;
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const WithdrawButton = styled.button`
    width: 15rem;
    height: 3rem;
    margin-top: 1rem;
    font-size: 2rem;
    background-color: orange;
    color: white;
    margin-top: 2rem;
`;

const Center = styled.div`
    margin-top: 2rem;
`;

export default function YieldBox(props) {

    const {
        spaceboneTokenYield,
        spaceboneTokenBalance
    } = useUser()


    const withdrawYield = () => {
        props.withdrawYield()
    }


    return (
        <div>
            <YieldContainer>
                <Center>
                    SpaceBone Balance: {spaceboneTokenBalance}
                    <div/>
                    SpaceBone Yield: {spaceboneTokenYield}
                    <div/>
                    <WithdrawButton onClick={withdrawYield}>
                        Withdraw
                    </WithdrawButton>
                </Center>
            </YieldContainer>
        </div>
    )
}
