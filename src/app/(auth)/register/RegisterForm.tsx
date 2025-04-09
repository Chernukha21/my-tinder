"use client";
import {useForm} from "react-hook-form";
import {Card, CardBody, CardHeader} from "@heroui/card";
import {GiPadlock} from "react-icons/gi";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import {registerSchema, RegisterSchema} from "@/lib/schemas/registerSchema";
import {registerUser} from "@/app/actions/authActions";
import {zodResolver} from "@hookform/resolvers/zod";

const RegisterForm = () => {
    const {register,
        setError,
        handleSubmit,
        formState: {errors, isValid, isSubmitting}} = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: "onTouched"
    });
    const onSubmit = async (data:RegisterSchema) => {
        const result = await registerUser(data);
        if(result.status === 'success'){
            console.log("User created");
        }else {
            if(Array.isArray(result.error)){
                result.error.forEach(e => {
                    const fieldName = e.path.join('.') as 'email' | 'password' | 'name';
                    setError(fieldName, {message: e.message});
                })
            }else{
                setError('root.serverError', {message: result.error});
            }
        }
    }
    return (
        <Card className="w-2/5 mx-auto">
            <CardHeader className="flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-2 text-secondary">
                    <div className="flex flex-row items-center gap-3">
                        <GiPadlock size={30} />
                        <h1 className="text-3xl font-semibold">Register</h1>
                    </div>
                    <p className="text-neutral-500">Welcome to NextMatch</p>
                </div>
            </CardHeader>
            <CardBody>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        defaultValue=''
                        label='Name'
                        variant='bordered'
                        {...register('name')}
                        isInvalid={!!errors.name}
                        errorMessage={errors.name?.message}
                    />
                    <Input
                        label="Email"
                        defaultValue=''
                        variant="bordered"
                        {...register('email')}
                        isInvalid={!!errors.email}
                        errorMessage={errors.email?.message}
                    />
                    <Input
                        label="Password"
                        defaultValue=''
                        type="password"
                        variant="bordered"
                        {...register('password')}
                        isInvalid={!!errors.password}
                        errorMessage={errors.password?.message}
                    />
                    {errors.root?.serverError && (<p className="text-danger text-sm">{errors.root?.serverError.message}</p>)}
                    <Button isLoading={isSubmitting} isDisabled={!isValid} color="secondary" fullWidth type="submit">Register</Button>
                </form>
            </CardBody>
        </Card>
    );
};

export default RegisterForm;