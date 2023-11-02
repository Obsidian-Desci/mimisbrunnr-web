import { useToken, Token } from "@/hooks/useTokens"
import { useBalance, useAccount } from "wagmi"
import { formatEther } from "viem"
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
export const Mimis = () => {
    const { balance: wethBalance } = useToken(Token.WETH)
    const { balance: rscBalance } = useToken(Token.RSC)
    const { balance: growBalance } = useToken(Token.GROW)
    const { balance: vitaBalance } = useToken(Token.VITA)
    const { balance: lakeBalance } = useToken(Token.LAKE)
    const { balance: mimisBalance } = useToken(Token.MIMIS)
    return (<>
        <Stat>
            <StatLabel>MIMIS Balance</StatLabel>
            <StatNumber>{formatEther(mimisBalance)}</StatNumber>
            <StatHelpText>Mimisbrunnr</StatHelpText>
        </Stat>
        <Heading>My Balances of Pool Coins</Heading>
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