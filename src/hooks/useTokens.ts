import {useState, useCallback, useEffect} from 'react'

import { 
    useAccount,
    usePrepareContractWrite,
    useContractWrite,
    usePublicClient,
    useWalletClient
} from 'wagmi'
import { parseEther } from 'viem'


import { abi as wethAbi } from "@/assets/abi/WETH.json"
import { address as rscAddress, abi as rscAbi } from "@/assets/abi/RSC.json"
import { address as growAddress, abi as growAbi } from "@/assets/abi/GROW.json"
import { address as hairAddress, abi as hairAbi } from "@/assets/abi/HAIR.json"
import { address as lakeAddress, abi as lakeAbi } from "@/assets/abi/LAKE.json"
import { address as vitaAddress,  abi as vitaAbi } from "@/assets/abi/VITA.json"
import { address as MIMIS_ADDR, abi as mimisAbi} from "@/assets/abi/MimisbrunnrV2.json"
import { address as swapAddress} from '@/assets/abi/SwapRouter.json'
import { getContract } from 'viem'
import {Token, /*MIMIS_ADDR,*/ WETH_ADDR} from './constants'

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

export const useDepositWeth = (amount:number) => {
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


export const useApprove = () => {
    const publicClient  = usePublicClient()
    const { data: walletClient, isError, isLoading } = useWalletClient()
    const { address, isConnecting, isDisconnected } = useAccount()
    const [result, setResult] = useState(null)
    const [hash, setHash] = useState(null)

    const fetchUseApprove = useCallback(async (
        token: Token,
        amount: string,
        for: string
    ) => {
        if (publicClient && address && walletClient) {
            const token = getContract({
                address: token,
                abi: mimisAbi,
                publicClient,
                walletClient
            })

            const hash = await token.write.approve([
               for,
               parseEther(amount)
            ])
            setHash(hash)
            const unwatch = await token.watchEvent.Approval({
                owner: address,
                approved: for
            }, {
                onLogs: (logs) => {
                    console.log('approvals logs', logs)
                    setResult(logs)
                }
            })
    }, [publicClient, address, walletClient])

    return {
        fetchUseApprove,
        hash,
        result
    }

}
