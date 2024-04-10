import { getServerSession } from "next-auth/next";
import { authOptions } from "./authOptions";

export const getSessionUser = async () => {

    try {
        const session = await getServerSession(authOptions);
        if(!session || !session.user || !session.user.id) {
            return null
        }
        return {
            user: session.user,
            userId: session.user.id,
        };
    } catch (error) {
        console.log(error)
        return null;
    }


}