import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({ token,req }) => {
        const {pathname} = req.nextUrl;
        // allowed routes
        if(
            pathname === "/api/auth" ||
            pathname === "/login" ||
            pathname === "/register"
        ) return true;
        // public routes
        if(pathname === '/' || pathname.startsWith("/api/video")) return true
        return !! token
      },
    },
  },
)

export const config = { matcher: ["/admin","/"] }