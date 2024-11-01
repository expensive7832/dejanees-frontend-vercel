/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images:{
        domains:[
            "storage.googleapis.com",
            "res.cloudinary.com",
            "localhost",
            "backend.dejaneesconcepts.com.ng"
        ]
    },
    // typescript:{
    //     ignoreBuildErrors: true
    // }
};

export default nextConfig;
