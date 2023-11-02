
import {useState, useCallback, useEffect} from 'react'
import { getContract, parseEther } from 'viem'

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

const RSCWETH = "0xeC2061372a02D5e416F5D8905eea64Cab2c10970"
const GROWWETH = "0x61847189477150832D658D8f34f84c603Ac269af"
const HAIRWETH = "0x94DD312F6Cb52C870aACfEEb8bf5E4e28F6952ff"
const LAKEWETH = "0xeFd69F1FF464Ed673dab856c5b9bCA4D2847a74f"
const VITAWETH ="0xcBcC3cBaD991eC59204be2963b4a87951E4d292B"
const MIMISWETH='0x0000000000000000000000000000000000000000'

import { address as factoryAddress, abi as factoryAbi } from "@/assets/abi/UniswapV3Factory.json"
import { address as nfpmAddress, abi as nfpmAbi } from "@/assets/abi/NonFungiblePositionManager.json"
import { address as swapAddress, abi as swapAbi } from '@/assets/abi/SwapRouter.json'
import {abi as poolAbi} from "@/assets/abi/UniswapV3Pool.json"

import { address as wethAddress, abi as wethAbi } from "@/assets/abi/WETH.json"
import { address as rscAddress, abi as rscAbi } from "@/assets/abi/RSC.json"
import { address as growAddress, abi as growAbi } from "@/assets/abi/GROW.json"
import { address as hairAddress, abi as hairAbi } from "@/assets/abi/HAIR.json"
import { address as lakeAddress, abi as lakeAbi } from "@/assets/abi/LAKE.json"
import { address as vitaAddress,  abi as vitaAbi } from "@/assets/abi/VITA.json"
import { address as mimisAddress, abi as mimisAbi} from "@/assets/abi/Mimisbrunnr.json"

enum Pool {
    RSC=RSCWETH,
    GROW=GROWWETH,
    HAIR=HAIRWETH,
    LAKE=LAKEWETH,
    VITA=VITAWETH,
    MIMIS=MIMISWETH,
}

export const useGetPoolInfo = async () => {
    const publicClient  = usePublicClient()
    const [poolInfo, setPoolInfo] = useState<unknown|null>(null)
    const [positionData, setPositionData] = useState<unknown|null>(null)

    const fetchPoolInfo = useCallback(async (pool:Pool) => {
        if (publicClient) {
            const mimisbrunnr = getContract({
                address: mimisAddress,
                abi: mimisAbi,
                publicClient: publicClient
            })
            const poolData = await mimisbrunnr.read.getPool([pool])
            setPoolInfo(poolData)
            const nfpm = getContract({
                address: nfpmAddress,
                abi: nfpmAbi,
                publicClient: publicClient
            })
            const positionData = await nfpm.read.positions([poolData.mimisPosition])
            setPositionData(positionData)

        }

    }, [publicClient, poolInfo, positionData])

    return {
        fetchPoolInfo,
        poolInfo,
        positionData
    }
}




export const swapExactInputSingle = async () => {
    const publicClient  = usePublicClient()
    const { data: walletClient, isError, isLoading } = useWalletClient()
    const { address, isConnecting, isDisconnected } = useAccount()

    const fetchSwapExactInputSingle = useCallback(async (token: string, pool: Pool, amount: string) => {
        if (publicClient && address && walletClient) {
            const pool = getContract({
                address: pool,
                abi: poolAbi,
                publicClient: publicClient
            })
            const fee = await pool.read.fee()
            const tickSpacing = await pool.read.tickSpacing()

            const swapRouter = getContract({
                address: swapAddress,
                abi: swapAbi,
                publicClient,
                walletClient
            })

            const swapTx = await swapRouter.write.exactInputSingle([
                wethAddress,
                token,
                fee,
                address,
                Math.floor(new Date().getTime() / 1000) + 3600,
                parseEther(amount),
                0,
                0
            ])

            const unwatch = await pool.events.Swap({
                sender: address,
                recepient: address
            },
            onLogs: logs => console.log(logs))


        }
    }, [])
}


export const mint = () => {
    const publicClient  = usePublicClient()
    const { data: walletClient, isError, isLoading } = useWalletClient()
    const { address, isConnecting, isDisconnected } = useAccount()

    const fetchMint = useCallback(async (pool: Pool, wethDesired: string, tokenDesired: string) => {
        if (publicClient && address && walletClient) {
            const poolInstance = getContract({
                address: pool,
                abi: poolAbi,
                publicClient: publicClient
            })
            const fee = await poolInstance.read.fee()
            const tickSpacing = await poolInstance.read.tickSpacing()
            const token0 = await poolInstance.read.token0()
            const token1 = await poolInstance.read.token1()
            const nfpm = getContract({
                address: nfpmAddress,
                abi: nfpmAbi,
                publicClient,
                walletClient
            })
            const hash = await nfpm.write.mint([
                token0,
                token1,
                fee,
                tickLower: Math.ceil(-887272 / tickSpacing) * tickSpacing,
                tickUpper: Math.floor(887272 / tickSpacing) * tickSpacing,
                (token0 === wethAddress ? wethDesired : tokenDesired),
                (token0 === wethAddress ? tokenDesired : wethDesired),
                0,
                0,
                address,
                Math.floor(new Date().getTime() / 1000) + 3600
            ])

            const unwatch = await nfpm.watchEvent.Transfer({
                from: nfpm.address,
                to: address
            },
            onLogs: logs => console.log(logs))
        }
    },[])
}


export const sellLP = () => {
    const publicClient  = usePublicClient()
    const { data: walletClient, isError, isLoading } = useWalletClient()
    const { address, isConnecting, isDisconnected } = useAccount()

    const fetchSellLP = useCallback(async (
        tokenId: string,
    ) => {
        if (publicClient && address && walletClient) {
            const mimisbrunnr = getContract({
                address: mimisAddress,
                abi: mimisAbi,
                publicClient,
                walletClient
            })

            const hash = await mimisbrunnr.write.sellLP([tokenId])
            const unwatch = await mimisbrunnr.watchEvent.Transfer({
                to: address
            },
            onLogs: logs => console.log(logs))
        }
    }, [])
}