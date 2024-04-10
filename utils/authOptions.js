
import GoogleProvider from "next-auth/providers/google";
import ConnectDb from "./../config/db";
import User from "./../models/user.model";


export const authOptions = {
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
        authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code"
            }
          },
      })
  ],

  callbacks: {
    // Invoked on success signin
    async signIn({ account, profile }) {
        // 1. connect to database
        await ConnectDb();
        // 2. check if user exist
        const userExist = await User.findOne({email: profile.email});

        if(!userExist) {
            // Truncate user name if name too long
            const username = profile.name.slice(0, 20);
            // 3. if not then add user to database
            await User.create({ 
                email: profile.email,
                username,
                image: profile.picture,
             });
        // 4. Return true to allow signin user
    }
    
        return true;

    },

    async session({session}) {
        // 1. Get user from database
        const user = await User.findOne({email: session.user.email});
        // 2. Assign userId to the session
        session.user.id = user._id.toString();
        // return session
        return session;
    },   
  },


}