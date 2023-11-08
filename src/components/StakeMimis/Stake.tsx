import { useEffect } from 'react'
import { useStakeLP, useUnstake, useClaimRewards } from '@/hooks/useStaker'
import { useForm, Resolver } from 'react-hook-form';
import { useApprovePosition } from '@/hooks/usePools';
import { SuccessModal } from '@/components/SuccessModal';
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    useDisclosure
} from '@chakra-ui/react'


type FormValues = {
    tokenId: string;
};
const resolver: Resolver<FormValues> = async (values) => {
    return {
        values: values.tokenId ? values : {},
        errors: !values.tokenId
            ? {
                tokenId: {
                    type: 'required',
                    message: 'This is required.',
                },
            }
            : {},
    };
};
export const Stake = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const {fetchStakeLP, result:stakeResult, hash:stakeHash} = useStakeLP()
    //const { approved, fetchApprovalsForNFT, fetchApproveNFT } = useApprovePosition()
    //const {fetchSellLP, result, hash} = useSellLP()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver });
    const onSubmit = handleSubmit((data) => {
        fetchStakeLP(data.tokenId)
    });

    useEffect(() => {
        if (stakeResult) onOpen()
    }, [stakeResult])
    return (<>
        <p>Stake Your MIMIS/WETH LP for Mimisbrunnrs LP rewards</p>
        <form onSubmit={onSubmit}>
            <FormControl isInvalid={errors.tokenId}>
                <FormLabel htmlFor='name'></FormLabel>

                <Input
                    id="tokenId"
                    {...register("tokenId")}
                    onChange={(e) => {
                        //fetchApprovalsForNFT(e.target.value)
                    }}
                    placeholder="Uniswap V3 LP NFT Id"
                />
                <FormErrorMessage>
                    {errors?.tokenId && <p>{errors.tokenId.message}</p>}
                </FormErrorMessage>
                <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                    Submit
                </Button>
            </FormControl>
        </form>
        <SuccessModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>)
}