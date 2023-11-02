import {useState, useCallback, useEffect} from 'react'

import { 
    useAccount,
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
    useBalance,
} from 'wagmi'



import { address as wethAddress, abi as wethAbi } from "@/assets/abi/WETH.json"
import { address as rscAddress, abi as rscAbi } from "@/assets/abi/RSC.json"
import { address as growAddress, abi as growAbi } from "@/assets/abi/GROW.json"
import { address as hairAddress, abi as hairAbi } from "@/assets/abi/HAIR.json"
import { address as lakeAddress, abi as lakeAbi } from "@/assets/abi/LAKE.json"
import { address as vitaAddress,  abi as vitaAbi } from "@/assets/abi/VITA.json"
import { address as mimisAddress, abi as mimisAbi} from "@/assets/abi/Mimisbrunnr.json"

export const useTokens = () => {
    return {
        rsc: useBalance({address: rscAddress as `0x${string}`}),
        grow: useBalance({address: growAddress as `0x${string}` }),
        hair: useBalance({address: hairAddress as `0x${string}` }),
        lake: useBalance({address: lakeAddress as `0x${string}` }),
        vita: useBalance({address: vitaAddress as `0x${string}` }),
        mimis: useBalance({address: mimisAddress as `0x${string}` }),
        weth: useBalance({address: wethAddress as `0x${string}` }),
    }
}

export enum Token {
    RSC=rscAddress,
    GROW=growAddress,
    HAIR=hairAddress,
    LAKE=lakeAddress,
    VITA=vitaAddress,
    MIMIS=mimisAddress,
}

export const depositWeth = (amount:number) => {
    const { config, error } = usePrepareContractWrite({
        address: wethAddress as `0x${string}`,
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
        address: mimisAddress as `0x${string}`,
        abi: mimisAddress,
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
