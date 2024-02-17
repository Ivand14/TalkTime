// "use client"

// import { auth } from "./firebase";
// import firebase from "firebase/compat/app";
// import { useRouter } from "next/navigation";

// const withAuth = (Component: any) => {
//     return () => {
//         const router = useRouter()
//         auth.auth().onAuthStateChanged(user => {
//             if(!user) router.push('/')
//         })

//         return <Component/>

//     }
// }

// export default withAuth