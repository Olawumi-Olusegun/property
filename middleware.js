
export {default} from "next-auth/middleware";

export const config = {
    matcher: [
        '/profile',
        '/messages',
        '/properties/add',
        '/properties/saved',
    ]
}