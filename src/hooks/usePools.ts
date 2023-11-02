
import {useState, useCallback, useEffect} from 'react'
import { getContract, parseEther, zeroAddress } from 'viem'
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

import { address as factoryAddress, abi as factoryAbi } from "@/assets/abi/UniswapV3Factory.json"
import { address as nfpmAddress, abi as nfpmAbi } from "@/assets/abi/NonFungiblePositionManager.json"
import { address as swapAddress, abi as swapAbi } from '@/assets/abi/SwapRouter.json'
import {abi as poolAbi} from "@/assets/abi/UniswapV3Pool.json"

import { abi as wethAbi } from "@/assets/abi/WETH.json"
import { address as rscAddress, abi as rscAbi } from "@/assets/abi/RSC.json"
import { address as growAddress, abi as growAbi } from "@/assets/abi/GROW.json"
import { address as hairAddress, abi as hairAbi } from "@/assets/abi/HAIR.json"
import { address as lakeAddress, abi as lakeAbi } from "@/assets/abi/LAKE.json"
import { address as vitaAddress,  abi as vitaAbi } from "@/assets/abi/VITA.json"
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

export const useGetPoolInfo = (token:Token) => {
    const publicClient  = usePublicClient()
    const [poolInfo, setPoolInfo] = useState<PoolInfo|null>(null)
    const [positionData, setPositionData] = useState<Position|null>(null)

    const fetchPoolInfo = useCallback(async () => {
        if (publicClient) {
            const mimisbrunnr = getContract({
                address: MIMIS_ADDR,
                abi: mimisAbi,
                publicClient: publicClient
            })
            console.log('token', token)
            const poolData = structPoolInfo(await mimisbrunnr.read.pools([token]))
            setPoolInfo(poolData)
            const nfpm = getContract({
                address: nfpmAddress,
                abi: nfpmAbi,
                publicClient: publicClient
            })
            console.log(poolData)
            const positionData = structPosition(await nfpm.read.positions([poolData.mimisPosition]))
            console.log(positionData)
            setPositionData(positionData)

        }

    }, [publicClient, poolInfo, positionData])

    useEffect(() => {
        if (poolInfo == null) {
            fetchPoolInfo()
        }
    }, [publicClient])

    return {
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
                WETH_ADDR,
                token,
                fee,
                address,
                Math.floor(new Date().getTime() / 1000) + 3600,
                parseEther(amount),
                0,
                0
            ])

            const unwatch = await pool.watchEvent.Swap({
                sender: address,
                recepient: address
            },
            {
                onLogs: logs => console.log(logs)
            })


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
                address: nfpmAddress as `0x${string}`,
                abi: nfpmAbi,
                publicClient,
                walletClient
            })
            const hash = await nfpm.write.mint([
                token0,
                token1,
                fee,
                Math.ceil(-887272 / tickSpacing) * tickSpacing,
                Math.floor(887272 / tickSpacing) * tickSpacing,
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
            {
                onLogs: logs => console.log(logs)
            })
        }
    },[])
}


export const useApprovePosition = () => {
    const publicClient  = usePublicClient()
    const { data: walletClient, isError, isLoading } = useWalletClient()
    const { address, isConnecting, isDisconnected } = useAccount()
    const [approved, setApproved] = useState(false)
    const fetchApproveNFT = useCallback(async (
        tokenId: string,
    ) => {
        if (publicClient && address && walletClient) {
            const nfpm = getContract({
                address: nfpmAddress,
                abi: nfpmAbi,
                publicClient,
                walletClient
            })

            const hash = await nfpm.write.approve([MIMIS_ADDR, tokenId])
            const unwatch = await nfpm.watchEvent.Approval({
                owner: address,
                approved: nfpmAddress,
                tokenId: tokenId
            }, {
                onLogs: (logs) => {
                    console.log(logs)
                    fetchApprovalsForNFT(MIMIS_ADDR)
                }
            })
        }
    }, [publicClient, address, walletClient])

    const fetchApprovalsForNFT = useCallback(async (tokenId: string) => {
        if (publicClient && address && walletClient) {
            const nfpm = getContract({
                address: nfpmAddress,
                abi: nfpmAbi,
                publicClient,
                walletClient
            })
            const approve = await nfpm.read.getApproved([tokenId])
            console.log('approved', approve)

            if (approve === MIMIS_ADDR) {
                setApproved(true)
            }
        }
    }, [publicClient, address, walletClient])

    return {
        fetchApprovalsForNFT,
        fetchApproveNFT,
        approved
    }

}