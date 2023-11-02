import {useEffect} from 'react'
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    useDisclosure
} from '@chakra-ui/react'

import { Token } from "@/hooks/constants"
import { useToken } from "@/hooks/useTokens"
import { formatEther } from 'viem';
import { useForm, Resolver } from 'react-hook-form';
import { SuccessModal } from '@/components/SuccessModal';
import { useUnwrapMimis } from '@/hooks/useMimisbrunnr';
type FormValues = {
    amount: string;
};
const resolver: Resolver<FormValues> = async (values) => {
    return {
        values: values.amount ? values : {},
        errors: !values.amount
            ? {
                amount: {
                    type: 'required',
                    message: 'This is required.',
                },
            }
            : {},
    };
};

export const UnwrapForm = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const { balance: mimisBalance, fetchTokenBalance } = useToken(Token.MIMIS)
    const {fetchUnwrapMimis, result, hash} = useUnwrapMimis()
    const { register, setValue, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver });
    const onSubmit = handleSubmit((data) => {
        fetchUnwrapMimis(data.amount)
    });

    useEffect(() => {
        if (result) fetchTokenBalance()
    }, [result])

    useEffect(() => {
        if (result) onOpen()
    }, [result])

    return (<>
        <p>Burn your MIMIS and receive Desci Tokens</p>
        <form onSubmit={onSubmit}>
            <FormControl isInvalid={errors.tokenId}>
                <FormLabel htmlFor='name'></FormLabel>
                <Input
                    w="80%"
                    id="amount"
                    {...register("amount")}
                    placeholder="amount"
                />
                <Button
                 mx={1}
                 onClick={() => {
                    setValue('amount', formatEther(mimisBalance))
                 }}
                colorScheme='purple'>
                    Max
                </Button>
                <FormErrorMessage>
                    {errors?.amount && <p>{errors.amount.message}</p>}
                </FormErrorMessage>
                <Button mt={4} colorScheme='purple' isLoading={isSubmitting} type='submit'>
                    Submit
                </Button>
                <p>MIMIS Balance: {formatEther(mimisBalance)}</p>
            </FormControl>
        </form>
        <SuccessModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>)
}