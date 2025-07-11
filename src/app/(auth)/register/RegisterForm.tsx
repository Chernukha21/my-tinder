'use client';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { GiPadlock } from 'react-icons/gi';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {registerSchema, RegisterSchema} from "@/lib/schemas/registerSchema";
import {registerUser} from "@/app/actions/authActions";
import {handleServerErrors} from "@/lib/util";


export default function RegisterForm() {
    const {register, setError, handleSubmit, formState: {
        errors, isValid, isSubmitting
    }} = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: "onTouched"
    });

    const onSubmit = async (data: RegisterSchema) => {
        const result = await registerUser(data);
        if(result.status === 'success'){
            console.log('User registered successfully')
        }else {
           handleServerErrors(result, setError);
        }
    }

    return (
        <Card className='w-2/5 mx-auto'>
            <CardHeader className='flex flex-col items-center justify-center'>
                <div className='flex flex-col gap-2 items-center text-secondary'>
                    <div className='flex flex-row gap-3 items-center'>
                        <GiPadlock size={30}/>
                        <h1 className='text-3xl font-semibold'>Register</h1>
                    </div>
                    <p className='text-neutral-500'>We glad to see you</p>
                </div>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='space-y-4'>
                        <Input
                            defaultValue=''
                            label='Name'
                            variant='bordered'
                            {...register('name')}
                            isInvalid={!!errors.name}
                            errorMessage={errors.name?.message as string}
                        />
                        <Input
                            defaultValue=''
                            label='Email'
                            variant='bordered'
                            {...register('email')}
                            isInvalid={!!errors.email}
                            errorMessage={errors.email?.message as string}
                        />
                        <Input
                            defaultValue=''
                            label='Password'
                            variant='bordered'
                            type='password'
                            {...register('password')}
                            isInvalid={!!errors.password}
                            errorMessage={errors.password?.message as string}
                        />
                        {errors.root?.serverError && <p className='text-danger text-sm'>{errors.root?.serverError.message}</p>}
                        <Button
                            isLoading={isSubmitting}
                            disabled={!isValid}
                            fullWidth
                            color='secondary'
                            type='submit'>
                            Register
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}
