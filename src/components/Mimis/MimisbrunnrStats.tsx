
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
    Wrap,
    WrapItem,
    Heading,
    Box
} from '@chakra-ui/react'

import { formatEther } from "viem"
import { useToken } from 'wagmi'

import { MIMIS_ADDR, Pool, Token, PoolInfo, Position } from '@/hooks/constants'
import { useGetPoolInfo } from '@/hooks/usePools'

const StatBox = (
    { token, poolInfo, help, description, }:
        { token: string, poolInfo: PoolInfo | null, help: string, description: string }
) => {
    return (
        <Box w="735px">
            <StatGroup>
                <Stat>
                    <StatLabel>{token} pool</StatLabel>
                    {poolInfo ?
                        (<StatNumber>{Number(poolInfo?.protocolOwnedLiquidity)}</StatNumber>) :
                        (<StatNumber>Loading...</StatNumber>)
                    }
                    <StatHelpText>{help}</StatHelpText>
                </Stat>
                <Stat>
                    <StatLabel>{token} Position</StatLabel>
                    {poolInfo ?
                        (<a
                            href={`https://app.uniswap.org/pools/${Number(poolInfo.mimisPosition)}`}
                            target="_blank"
                        >
                            <StatNumber
                                _hover={{ color: "purple.600" }}
                                color={"purple.400"}
                            >
                                {Number(poolInfo?.mimisPosition)}
                            </StatNumber>
                        </a>) :
                        (<StatNumber>Loading...</StatNumber>)
                    }
                    <StatHelpText>{description}</StatHelpText>
                </Stat>
            </StatGroup>
        </Box>
    )
}
export const MimisbrunnrStats = () => {
    const { data, isError, isLoading } = useToken({ address: MIMIS_ADDR as `0x${string}` })
    const { poolInfo: rscPoolInfo } = useGetPoolInfo(Token.RSC)
    const { poolInfo: hairPoolInfo } = useGetPoolInfo(Token.HAIR)
    const { poolInfo: growPoolInfo } = useGetPoolInfo(Token.GROW)
    const { poolInfo: vitaPoolInfo } = useGetPoolInfo(Token.VITA)
    const { poolInfo: lakePoolInfo } = useGetPoolInfo(Token.LAKE)

    return (<>
        <Heading>Mimisbrunnr Stats</Heading>
        <Stat>
            <StatLabel>Total Supply</StatLabel>
            {isLoading ? (<StatNumber>Loading</StatNumber>) :
                (<StatNumber>{formatEther(data?.totalSupply.value)}</StatNumber>)
            }
            <StatHelpText>Total supply is also the sum of all liquidity</StatHelpText>
        </Stat>
        <StatBox
            token="RSC"
            poolInfo={rscPoolInfo}
            help="Amount of liquidity in the RSC/WETH pool"
            description="The Uniswap V3 Position used by Mimisbrunnr for RSC"
        />
        <StatBox
            token="HAIR"
            poolInfo={hairPoolInfo}
            help="Amount of liquidity in the HAIR/WETH pool"
            description="The Uniswap V3 Position used by Mimisbrunnr for HAIR"
        />
        <StatBox
            token="GROW"
            poolInfo={growPoolInfo}
            help="Amount of liquidity in the GROW/WETH pool"
            description="The Uniswap V3 Position used by Mimisbrunnr for GROW"
        />
        <StatBox
            token="VITA"
            poolInfo={vitaPoolInfo}
            help="Amount of liquidity in the VITA/WETH pool"
            description="The Uniswap V3 Position used by Mimisbrunnr for VITA"
        />
        <StatBox
            token="LAKE"
            poolInfo={lakePoolInfo}
            help="Amount of liquidity in the LAKE/WETH pool"
            description="The Uniswap V3 Position used by Mimisbrunnr for LAKE"
        />
    </>)
}