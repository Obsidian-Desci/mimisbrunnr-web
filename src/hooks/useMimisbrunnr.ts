import {useState, useCallback, useEffect} from 'react'
import { getContract, parseEther, formatEther, zeroAddress } from 'viem'

import { 
    useAccount,
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
    useContractRead,
    usePublicClient,
    useContractEvent,
    useWalletClient
} from 'wagmi'

import {  abi as mimisAbi} from "@/assets/abi/Mimisbrunnr.json"
import { 
    Pool,
    WETH_ADDR,
    MIMIS_ADDR,
    PoolInfo,
    Position,
    structPoolInfo,
    structPosition
} from './constants'


export const useSellLP = () => {
    const publicClient  = usePublicClient()
    const { data: walletClient, isError, isLoading } = useWalletClient()
    const { address, isConnecting, isDisconnected } = useAccount()
    const [result, setResult] = useState(null)
    const [hash, setHash] = useState(null)
    const fetchSellLP = useCallback(async (
        tokenId: string,
    ) => {
        if (publicClient && address && walletClient) {
            const mimisbrunnr = getContract({
                address: MIMIS_ADDR,
                abi: mimisAbi,
                publicClient,
                walletClient
            })

            const hash = await mimisbrunnr.write.sellLP([tokenId])
            setHash(hash)
            const unwatch = await mimisbrunnr.watchEvent.Transfer({
                to: address
            }, {
                onLogs: (logs) => {
                    console.log(logs)
                    setResult(logs)
                }
            })
        }
    }, [publicClient, address, walletClient])
    return {
        fetchSellLP,
        hash,
        result
    }
}


export const useUnwrapMimis = () => {
    const publicClient  = usePublicClient()
    const { data: walletClient, isError, isLoading } = useWalletClient()
    const { address, isConnecting, isDisconnected } = useAccount()
    const [result, setResult] = useState(null)
    const [hash, setHash] = useState(null)
    const fetchUnwrapMimis = useCallback(async (
        amount: string,
    ) => {
        if (publicClient && address && walletClient) {
            const mimisbrunnr = getContract({
                address: MIMIS_ADDR,
                abi: mimisAbi,
                publicClient,
                walletClient
            })

            const hash = await mimisbrunnr.write.unwrapMims([parseEther(amount)])
            setHash(hash)
            const unwatch = await mimisbrunnr.watchEvent.Transfer({
                to: zeroAddress
            }, {
                onLogs: (logs) => {
                    console.log('logs', logs)
                    setResult(logs)
                }
            })
        }
    }, [publicClient, address, walletClient])
    return {
        fetchUnwrapMimis,
        hash,
        result
    }
}