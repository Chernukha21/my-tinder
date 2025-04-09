import Credentials from "next-auth/providers/credentials";
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