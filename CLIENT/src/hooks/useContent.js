import { useEffect, useState } from "react"

const STATIC_DATA = {
    "users/list": [
        {
            _id: 0,
            name: "Ram",
            email: "ram@m.in",
            age: 50,
        },
        {
            _id: 1,
            name: "Shyam",
            email: "shyam@m.in",
            age: 20,
        },
        {
            _id: 2,
            name: "Sudama",
            email: "sudama@m.in",
            age: 42,
        },
        {
            _id: 3,
            name: "Arjun",
            email: "arjun@m.in",
            age: 13,
        },
    ],
    posts: [
        {
            title: "Portfolio Website",
            content: "Professional, fast-loading websites showcasing your business to the world.",
            price: "From ₹ 25,000",
        },
        {
            title: "Local Growth Package",
            content: "SEO optimization, local listings, and marketing integration for growth.",
            price: "From ₹ 15,000/mo",
        },
        {
            title: "ERP & Business Optimization",
            content: "Custom enterprise systems for invoicing, inventory, and operations.",
            price: "From ₹ 50,000",
        },
        {
            title: "AI Integration",
            content: "Intelligent chatbots, analytics, and automated workflows.",
            price: "From ₹ 30,000",
        },
        {
            title: "Maintenance & Support",
            content: "Ongoing support, updates, and performance monitoring.",
            price: "From ₹ 1000/mo",
        },
        {
            title: "Custom Development",
            content: "Bespoke solutions tailored to your unique business needs.",
            price: "From ₹ 20,000",
        },
    ],
}

export function useContent(path, method, body, headers) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const siteType = import.meta.env.VITE_SITE_TYPE || "STATIC"
                const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000"

                if (siteType === "STATIC") {
                    if (!method || method !== "GET") { setLoading(false); setError("Only GET method is allowed for static content"); return }
                    setData(STATIC_DATA[path] || [])
                }
                else {
                    const response = await fetch(`${apiUrl}/${path}`, {
                        method: method,
                        body: body,
                        headers: headers,
                    });
                    const result = await response.json();
                    if (!response.ok) { setError(result.msg) }
                    else { setData(result); setError(""); }
                }
            }
            catch (err) { setError(err.message) }
            finally { setLoading(false) }
        }

        setTimeout(() => {
            fetchData()
        }, 300);
    }, [path, method, body, headers])

    return { data, loading, error }
}