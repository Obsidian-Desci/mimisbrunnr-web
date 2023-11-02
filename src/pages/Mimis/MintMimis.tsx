import { Token } from '@/hooks/useTokens'

import { useForm, Resolver } from 'react-hook-form';
type FormValues = {
    firstName: string;
    lastName: string;
};
const resolver: Resolver<FormValues> = async (values) => {
    return {
        values: values.firstName ? values : {},
        errors: !values.firstName
            ? {
                firstName: {
                    type: 'required',
                    message: 'This is required.',
                },
            }
            : {},
    };
};
export const MintMimis = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver });
    const onSubmit = handleSubmit((data) => console.log(data));

    return (<>
        <p>Mint Mimis</p>
        <form onSubmit={onSubmit}>
            <input {...register("firstName")} placeholder="Bill" />
            {errors?.firstName && <p>{errors.firstName.message}</p>}

            <input {...register("lastName")} placeholder="Luo" />

            <input type="submit" />
        </form>
    </>)
}