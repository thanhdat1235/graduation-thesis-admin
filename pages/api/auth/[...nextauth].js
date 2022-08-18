import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "553984763604-u8cq3gqc7ffnni0v7ojhgh6urrlslta7.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  jwt: {
    encryption: true,
  },
  secret: "secret token",
  callbacks: {
    async jwt(token, account) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      console.log(account, token);
      return token;
    },
    redirect: async (url, _baseUrl) => {
      if (url === "/user") {
        return Promise.resolve("/login");
      }
      return Promise.resolve("/login");
    },
  },
});
