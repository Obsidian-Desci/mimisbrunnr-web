import {useState, useCallback, useEffect} from 'react'

import { 
    useAccount,
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
    usePublicClient,
    useBalance,
} from 'wagmi'



import { address as wethAddress, abi as wethAbi } from "@/assets/abi/WETH.json"
import { address as rscAddress, abi as rscAbi } from "@/assets/abi/RSC.json"
import { address as growAddress, abi as growAbi } from "@/assets/abi/GROW.json"
import { address as hairAddress, abi as hairAbi } from "@/assets/abi/HAIR.json"
import { address as lakeAddress, abi as lakeAbi } from "@/assets/abi/LAKE.json"
import { address as vitaAddress,  abi as vitaAbi } from "@/assets/abi/VITA.json"
import { address as mimisAddress, abi as mimisAbi} from "@/assets/abi/Mimisbrunnr.json"
import { getContract } from 'viem'

export enum Token {
    GROW="0x761A3557184cbC07b7493da0661c41177b2f97fA",
    HAIR="0x9Ce115f0341ae5daBC8B477b74E83db2018A6f42",
    LAKE="0xF9Ca9523E5b5A42C3018C62B084Db8543478C400",
    VITA="0x81f8f0bb1cB2A06649E51913A151F0E7Ef6FA321",
    RSC="0xD101dCC414F310268c37eEb4cD376CcFA507F571",
    WETH="0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    MIMIS="0x8c117C89225baA3d2be118892aAfAe0f89fb9f6f"    
}

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
        balance
    }

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
