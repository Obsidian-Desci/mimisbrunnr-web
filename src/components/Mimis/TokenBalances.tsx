import { useToken } from "@/hooks/useTokens"
import { Token } from '@/hooks/constants'

import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
    Wrap,
    WrapItem,
    Heading
} from '@chakra-ui/react'

import { formatEther } from "viem"

export const TokenBalances = () => {
    const { balance: wethBalance } = useToken(Token.WETH)
    const { balance: rscBalance } = useToken(Token.RSC)
    const { balance: growBalance } = useToken(Token.GROW)
    const { balance: vitaBalance } = useToken(Token.VITA)
    const { balance: lakeBalance } = useToken(Token.LAKE)
    const { balance: hairBalance} = useToken(Token.HAIR)
    const { balance: mimisBalance } = useToken(Token.MIMIS)

    return (<>
        <Heading>My Balances</Heading>
        <Stat>
            <StatLabel>MIMIS Balance</StatLabel>
            <StatNumber>{formatEther(mimisBalance)}</StatNumber>
            <StatHelpText>Mimisbrunnr</StatHelpText>
        </Stat>
        <Wrap direction={['column', 'row']} spacing={4}>
            <WrapItem width="300px">
                <Stat>
                    <StatLabel>Weth Balance</StatLabel>
                    <StatNumber>{formatEther(wethBalance)}</StatNumber>
                    <StatHelpText>Wrapped Ether</StatHelpText>
                </Stat>
            </WrapItem>
            <WrapItem width="300px">
                <Stat>
                    <StatLabel>RSC Balance</StatLabel>
                    <StatNumber>{formatEther(rscBalance)}</StatNumber>
                    <StatHelpText>Research Coin</StatHelpText>
                </Stat>
            </WrapItem>
            <WrapItem width="300px">
                <Stat>
                    <StatLabel>HAIR Balance</StatLabel>
                    <StatNumber>{formatEther(hairBalance)}</StatNumber>
                    <StatHelpText>Hair Dao</StatHelpText>
                </Stat>
            </WrapItem>
            <WrapItem width="300px">
                <Stat>
                    <StatLabel>GROW Balance</StatLabel>
                    <StatNumber>{formatEther(growBalance)}</StatNumber>
                    <StatHelpText>Valley Dao</StatHelpText>
                </Stat>
            </WrapItem>
            <WrapItem width="300px">
                <Stat>
                    <StatLabel>VITA Balance</StatLabel>
                    <StatNumber>{formatEther(vitaBalance)}</StatNumber>
                    <StatHelpText>VITA Dao</StatHelpText>
                </Stat>
            </WrapItem>
            <WrapItem width="300px">
                <Stat>
                    <StatLabel>LAKE Balance</StatLabel>
                    <StatNumber>{formatEther(lakeBalance)}</StatNumber>
                    <StatHelpText>Data Lake</StatHelpText>
                </Stat>
            </WrapItem>
        </Wrap>
    </>)
}