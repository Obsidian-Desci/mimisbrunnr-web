import {useState, useCallback, useEffect} from 'react'

import { 
    useAccount,
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
    useBalance,
     } from 'wagmi'


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

const relevantTokens: string[] = [wethAddress, mimisAddress, rscAddress, growAddress, hairAddress, lakeAddress, vitaAddress]


const RSCWETH = "0xeC2061372a02D5e416F5D8905eea64Cab2c10970"
const GROWWETH = "0x61847189477150832D658D8f34f84c603Ac269af"
const HAIRWETH = "0x94DD312F6Cb52C870aACfEEb8bf5E4e28F6952ff"
const LAKEWETH = "0xeFd69F1FF464Ed673dab856c5b9bCA4D2847a74f"
const VITAWETH ="0xcBcC3cBaD991eC59204be2963b4a87951E4d292B"


export const useTokens = () => {
    const { data:rscData, isError: rscError, isLoading: rscLoading } = useBalance({
        address: rscAddress,
    })
    const { data:hairData, isError: hairError, isLoading: hairLoading } = useBalance({
        address: hairAddress
    })
    const { data:growData, isError: growError, isLoading: growLoading } = useBalance({
        address: growAddress
    })
    const { data:lakeData, isError: lakeError, isLoading: lakeLoading } = useBalance({
        address: lakeAddress
    })
    const { data:vitaData, isError: vitaError, isLoading: vitaLoading } = useBalance({
        address: vitaAddress
    })
    const { data:mimisData, isError: mimisError, isLoading: mimisLoading } = useBalance({
        address: mimisAddress
    })
    const { data:wethData, isError: wethError, isLoading: wethLoading } = useBalance({
        address: wethAddress
    })

    return {
        rsc: {rscData, rscError, rscLoading},
        hair: {hairData, hairError, hairLoading},
        grow: {growData, growError, growLoading},
        lake: {lakeData, lakeError, lakeLoading},
        vita: {vitaData, vitaError, vitaLoading},
        mimis: {mimisData, mimisError, mimisLoading},
        weth:{wethData, wethError, wethLoading},
    }

}