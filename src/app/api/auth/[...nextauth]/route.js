import NextAuth from "next-auth/next";
import { CredentialsProvider } from "next-auth/providers";
import bcrypt from "bcrypt";
import User from "@/DB/models/User";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email address",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        let user;

        user = await User.findOne({ email: credentials.email });
        if (!user) return null;
        const match = await bcrypt.compare(credentials.password, user.password);
        if (!match) return null;
        return { name: user.name, email: user.email };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
