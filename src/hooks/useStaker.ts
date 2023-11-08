import {useState, useCallback} from 'react'
import { getContract, parseEther, zeroAddress } from 'viem'
import { address as nfpmAddr, abi as nfpmAbi} from "@/assets/abi/NonFungiblePositionManager.json"
import { 
    useAccount,
    usePublicClient,
    useWalletClient
} from 'wagmi'

import {  address as stakerAddr, abi as stakerAbi} from "@/assets/abi/Staker.json"

import { address as mimisAddress, abi as mimisAbi} from "@/assets/abi/MimisbrunnrV2.json"
export const useStakeLP = () => {

    const publicClient  = usePublicClient()
    const { data: walletClient, isError, isLoading } = useWalletClient()
    const { address, isConnecting, isDisconnected } = useAccount()
    const [result, setResult] = useState(null)
    const [hash, setHash] = useState(null)

    const fetchStakeLP = useCallback(async (
        tokenId: string,
    ) => {
        if (publicClient && address && walletClient) {
            const nfpm = getContract({
                address: nfpmAddr as `0x${string}`,
                abi: nfpmAbi,
                publicClient,
                walletClient
            })

            const hash = await nfpm.write.safeTransferFrom([
                address, stakerAddr, tokenId, "0x00"
            ])
            setHash(hash)
            const unwatch = await nfpm.watchEvent.Transfer({
                from: nfpmAddr,
                to: stakerAddr
            }, {
                onLogs: (logs) => {
                    console.log(logs)
                    setResult(logs)
                }
            })
        }
    },[publicClient, address, walletClient])

    return {
        fetchStakeLP,
        hash,
        result
    }
}

export const useUnstake = () => {
    const publicClient  = usePublicClient()
    const { data: walletClient, isError, isLoading } = useWalletClient()
    const { address, isConnecting, isDisconnected } = useAccount()
    const [result, setResult] = useState(null)
    const [hash, setHash] = useState(null)

    const fetchUnstake = useCallback(async (
        tokenId: string,
    ) => {
        if (publicClient && address && walletClient) {
            const staker = getContract({
                address: stakerAddr as `0x${string}`,
                abi: stakerAbi,
                publicClient,
                walletClient
            })

            const hash = await nfpm.write.unstake([
                tokenId
            ])
            setHash(hash)
            const unwatch = await staker.watchEvent.TokenUnstaked({
                tokenId: tokenId,
            }, {
                onLogs: (logs) => {
                    console.log(logs)
                    setResult(logs)
                }
            })
        }
    },[publicClient, address, walletClient])

    return {
        fetchUnstake,
        hash,
        result
    }
}


export const claimRewards = () => {
    const publicClient  = usePublicClient()
    const { data: walletClient, isError, isLoading } = useWalletClient()
    const { address, isConnecting, isDisconnected } = useAccount()
    const [result, setResult] = useState(null)
    const [hash, setHash] = useState(null)

    const fetchClaimRewards = useCallback(async (
        to?: string,
    ) => {
        if (!to) to = address
        if (publicClient && address && walletClient) {
            const staker = getContract({
                address: stakerAddr as `0x${string}`,
                abi: stakerAbi,
                publicClient,
                walletClient
            })

            const hash = await nfpm.write.claimRewards([
                to
            ])
            setHash(hash)
            const unwatch = await staker.watchEvent.RewardClaimed({
                to
            }, {
                onLogs: (logs) => {
                    console.log(logs)
                    setResult(logs)
                }
            })
        }
    },[publicClient, address, walletClient])

    return {
        fetchClaimRewards,
        hash,
        result
    }
}

export const useGetRewards = () => {
    const publicClient  = usePublicClient()
    const { data: walletClient, isError, isLoading } = useWalletClient()
    const { address, isConnecting, isDisconnected } = useAccount()
    const [result, setResult] = useState(null)
    const [hash, setHash] = useState(null)

    const fetchGetRewards = useCallback(async (
        tokenId: string,
    ) => {
        if (publicClient && address && walletClient) {
            const staker = getContract({
                address: stakerAddr as `0x${string}`,
                abi: stakerAbi,
                publicClient,
                walletClient
            })
            const result = await staker.read.rewards([
                address,
                tokenId
            ])
            setResult(result)
        }
    }, [publicClient, address, walletClient])

    return {
        fetchGetRewards,
        result
    }
}


