import { useEffect } from 'react'
import { useSellLP } from '@/hooks/useMimisbrunnr'
import { useForm, Resolver } from 'react-hook-form';
import { useSwapExactInputSingle, useMint } from '@/hooks/usePools';
import { useDepositWeth, useApprove } from '@/hooks/useTokens'
import { SuccessModal } from '@/components/SuccessModal';
import { WETH_ADDR, Token } from '../../hooks/constants'
import { useBalance, useAccount, useToken } from 'wagmi';
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    useDisclosure,
    Select
} from '@chakra-ui/react'


type FormValues = {
    token: string;
    weth: string;
};
const resolver: Resolver<FormValues> = async (values) => {
    return {
        values: values.token ? values : {},
        errors: !values.token
            ? {
                token: {
                    type: 'required',
                    message: 'This is required.',
                },
                weth: {
                    type: 'required',
                    message: 'This is required.',
                }
            }
            : {},
    };
};
export const Zap = () => {
    const { address } = useAccount()
    const {
         data:ethData,
         isLoading:ethLoading,
         isError: ethError
    } = useBalance({addressOrName: address})
    const {
        data: wethData,
        isLoading: wethLoading,
        isError: wethError
    } = useBalance({
        addressOrName: address,
        token: WETH_ADDR
    })

    const {
        fetchUseApprove,
        result: approveResult,
        hash: approveHash
    } = useApprove()

    const {
        data: wethDepositData,
        isLoading: wethDepositLoading,
        write: wethDepositWrite,
        isSuccess: wethDepositSuccess
    } = useDepositWeth()

    const {
        data: wethSwapData,
        isLoading: wethSwapLoading,
        write: wethSwapWrite,
        isSuccess: wethSwapSuccess
    } = useSwapExactInputSingle()

    const {
        fetchUseMint,
        result: mintResult,
        hash: mintHash
    } = useMint()

    const { fetchSellLP, result, hash } = useSellLP()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver });
    const onSubmit = handleSubmit((data) => {
        console.log(
            ethData,
            wethDepositData,
            wethSwapData,
            mintResult,
            approveResult
        )
            fetchSellLP(data.token)
        console.log(data)
    });

    const { isOpen, onOpen, onClose } = useDisclosure()
    useEffect(() => {
        if (result) onOpen()
    }, [result])
    return (<>
        <p>Sell your unconcentrated Desci/WETH LP for Mimis</p>
        <form onSubmit={onSubmit}>
            <FormControl isInvalid={errors.token}>
                <FormLabel htmlFor='name'></FormLabel>

                <Select
                    id="token"
                    {...register("token")}
                    onChange={(e) => {
                        fetchApprovalsForNFT(e.target.value)
                    }}
                    placeholder="zap with..."
                >
                    <option value={Token.RSC}>RSC</option>
                    <option value={Token.GROW}>GROW</option>
                    <options value={Token.HAIR}>HAIR</options>
                    <options value={Token.VITA}>VITA</options>
                    <options value={Token.LAKE}>LAKE</options>

                </Select>
                <Input
                    id="weth"
                    {...register("weth")}
                    onChange={(e) => {
                        fetchApprovalsForNFT(e.target.value)
                    }}
                    placeholder="Amount Eth provided"
                />
                <FormErrorMessage>
                    {errors?.tokenId && <p>{errors.tokenId.message}</p>}
                </FormErrorMessage>
                (<Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                    Submit
                </Button>
                (<Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                    Approve
                </Button>)

            </FormControl>
        </form>
        <SuccessModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>)
}