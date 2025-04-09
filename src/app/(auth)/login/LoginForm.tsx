"use client";
import {Card, CardBody, CardHeader} from "@heroui/card";
import {GiPadlock} from "react-icons/gi";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import {useForm} from "react-hook-form";
import {LoginSchema, loginSchema} from "@/lib/schemas/loginSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {singInUser} from "@/app/actions/authActions";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";

const LoginForm = () => {
    const router = useRouter();
    const {register,
        handleSubmit,
        formState: {errors, isValid, isSubmitting}} = useForm<LoginSchema>({
            resolver: zodResolver(loginSchema),
            mode: "onTouched"
    });
    const onSubmit = async (data:LoginSchema) => {
<<<<<<< HEAD
=======
        console.log(data);
>>>>>>> 50deb1af6e9ea6480a47b99c817a5c399138bfb4
        const result = await singInUser(data);
        if(result.status === 'success'){
            router.push('/members');
            router.refresh();
        }else{
           toast.error(result.error as string);
        }
    }
    return (
        <Card className="w-2/5 mx-auto">
            <CardHeader className="flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-2 text-secondary">
                   <div className="flex flex-row items-center gap-3">
                       <GiPadlock size={30} />
                       <h1 className="text-3xl font-semibold">Login</h1>
                   </div>
                    <p className="text-neutral-500">Welcome back to NextMatch</p>
                </div>
            </CardHeader>
            <CardBody>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <Input label="Email"
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
                    <Button isLoading={isSubmitting} isDisabled={!isValid} color="secondary" fullWidth type="submit">Login</Button>
                </form>
            </CardBody>
        </Card>
    );
};

export default LoginForm;