import Credentials from "next-auth/providers/credentials";
<<<<<<< HEAD
import { loginSchema } from "./lib/schemas/loginSchema";
import { getUserByEmail } from "./app/actions/authActions";
import { compare } from "bcryptjs";
const authConfig = {
    providers: [
        Credentials({
            name: "credentials",
            async authorize(creds) {
                const validate = loginSchema.safeParse(creds);
                if (validate.success) {
                    const { email, password } = validate.data;
                    const user = await getUserByEmail(email);
                    if (!user || !(await compare(password, user.passwordHash)))
                        return null;

                    return user;
                }

                return null;
            },
        }),
    ],
};

export default authConfig;
=======
import type {NextAuthConfig} from "next-auth"
import {loginSchema} from "@/lib/schemas/loginSchema";
import {getUserByEmail} from "@/app/actions/authActions";
import {compare} from "bcryptjs";

export default {
    providers: [Credentials({
        name: 'credentials',
        async authorize(creds){
            const validated = loginSchema.safeParse(creds);
            if(validated.success){
                const {email, password} = validated.data;
                const user =  await getUserByEmail(email);
                if(!user || (!await compare(password, user.passwordHash))) return null;
                return user;
            }
            return null;
        }
    })],
} satisfies NextAuthConfig
>>>>>>> 50deb1af6e9ea6480a47b99c817a5c399138bfb4
