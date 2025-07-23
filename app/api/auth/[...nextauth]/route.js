import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
console.log(
    {
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }
)
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        })
    ],
    async session({session}){

    },
    async sighIn({profile}){
        try {

        }catch (error){

        }
    }
})

export { handler as GET, handler as POST };