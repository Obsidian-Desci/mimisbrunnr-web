import {useState, useCallback, useEffect} from 'react'

import { 
    useAccount,
    usePrepareContractWrite,
    useContractWrite,
    usePublicClient,
} from 'wagmi'



import { abi as wethAbi } from "@/assets/abi/WETH.json"
import { address as rscAddress, abi as rscAbi } from "@/assets/abi/RSC.json"
import { address as growAddress, abi as growAbi } from "@/assets/abi/GROW.json"
import { address as hairAddress, abi as hairAbi } from "@/assets/abi/HAIR.json"
import { address as lakeAddress, abi as lakeAbi } from "@/assets/abi/LAKE.json"
import { address as vitaAddress,  abi as vitaAbi } from "@/assets/abi/VITA.json"
import { abi as mimisAbi} from "@/assets/abi/Mimisbrunnr.json"

import { getContract } from 'viem'
import {Token, MIMIS_ADDR, WETH_ADDR} from './constants'

export const useToken = (token:Token) => {
    const publicClient = usePublicClient()
    const [balance, setBalance] = useState(0)
    const {address} = useAccount()

    const fetchTokenBalance = useCallback(async () => {
        if (address) {
            const instance = getContract({
                address: token,
                abi: wethAbi,
                publicClient 
            })
            const balance = await instance.read.balanceOf([address as `0x${string}`])
            console.log('baalnce', balance)
            setBalance(balance)
        }
    }, [address])

    useEffect(() => {
        if (address) {
            fetchTokenBalance()
        }
    }, [address])

    return {
        fetchTokenBalance,
        balance
    }

}

export const depositWeth = (amount:number) => {
    const { config, error } = usePrepareContractWrite({
        address: WETH_ADDR as `0x${string}`,
        abi: wethAbi,
        functionName: 'deposit',
        args: [amount]
    })

    const { data, isLoading, isSuccess, write } = useContractWrite(config)

    return {
        data,
        isLoading,
        isSuccess,
        write
    }
}


export const useApprove = (token:Token) => {
    const { config, error } = usePrepareContractWrite({
        address: MIMIS_ADDR as `0x${string}`,
        abi: mimisAbi,
        functionName: 'approve',
    })

    const { data, isLoading, isSuccess, write } = useContractWrite(config)

    return {
        data,
        isLoading,
        isSuccess,
        write
    }
}
