import { useEffect } from 'react'
import { Token } from '@/hooks/useTokens'
import { useSellLP } from '@/hooks/useMimisbrunnr'
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
export const BYOL = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const { approved, fetchApprovalsForNFT, fetchApproveNFT } = useApprovePosition()
    const {fetchSellLP, result, hash} = useSellLP()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver });
    const onSubmit = handleSubmit((data) => {
        if (approved) {
            fetchSellLP(data.tokenId)
        } else {
            fetchApproveNFT(data.tokenId)
        }
        console.log(data)
    });

    useEffect(() => {
        if (result) onOpen()
    }, [result])
    return (<>
        <p>Sell your unconcentrated Desci/WETH LP for Mimis</p>
        <form onSubmit={onSubmit}>
            <FormControl isInvalid={errors.tokenId}>
                <FormLabel htmlFor='name'></FormLabel>

                <Input
                    id="tokenId"
                    {...register("tokenId")}
                    onChange={(e) => {
                        fetchApprovalsForNFT(e.target.value)
                    }}
                    placeholder="Uniswap V3 LP NFT Id"
                />
                <FormErrorMessage>
                    {errors?.tokenId && <p>{errors.tokenId.message}</p>}
                </FormErrorMessage>
                { approved ? 
                (<Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                    Submit
                </Button>) :
                (<Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                    Approve
                </Button>) 

                }
            </FormControl>
        </form>
        <SuccessModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>)
}