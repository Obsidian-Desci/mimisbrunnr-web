import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
} from '@chakra-ui/react'

import { Token } from "@/hooks/constants"
import { useToken } from "@/hooks/useTokens"

import { useForm, Resolver } from 'react-hook-form';

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

    const { balance: mimisBalance } = useToken(Token.MIMIS)
    const {fetchUnwrapMimis, result, hash} = useUnwrapMimis()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver });
    const onSubmit = handleSubmit((data) => {
        fetchUnwrapMimis(data.amount)
    });


    return (<>
        <p>Sell your unconcentrated Desci/WETH LP for Mimis</p>
        <form onSubmit={onSubmit}>
            <FormControl isInvalid={errors.tokenId}>
                <FormLabel htmlFor='name'></FormLabel>

                <Input
                    id="amount"
                    {...register("amount")}
                    placeholder="amount"
                />
                <FormErrorMessage>
                    {errors?.amount && <p>{errors.amount.message}</p>}
                </FormErrorMessage>
                <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                    Submit
                </Button>)
            </FormControl>
        </form>
    </>)
}