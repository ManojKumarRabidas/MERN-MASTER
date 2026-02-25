import { STATIC_DATA } from '../assets/data.js'
export async function apiCall(path, method, body, headers) {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001"
    const siteType = import.meta.env.VITE_SITE_TYPE || "STATIC"
    if (siteType === "STATIC") {
        if (method === "GET") {
            const [base_path, category, id] = path.split('/').filter(Boolean).slice(-3);
            if (category === "details" && id) {
                const item = STATIC_DATA[base_path]?.find(entry => entry._id == id);
                if (!item) return { status: false, data: [], msg: "No data found for the given ID" }
                return { status: true, data: { data: item }, msg: "This is a static data response" }
            }
            if (category === "list") {
                const data = STATIC_DATA[base_path]
                if (!data) return { status: false, data: [], msg: "No data found for the given path" }
                return { status: true, data: { data: data }, msg: "This is a static data response" }
            }
        }
        return { status: false, data: [], msg: "API calls are not allowed in static site type" }
    }

    let firstParameter = null
    let secondParameter = null

    const jsonHeaders = { "Content-Type": "application/json", ...headers }

    if (method === "GET") { firstParameter = `${apiUrl}/${path}`; secondParameter = { method, headers } }
    else if (method === "POST" || method === "PATCH") { firstParameter = `${apiUrl}/${path}`; secondParameter = { method, headers: jsonHeaders, body: JSON.stringify(body) } }
    else if (method === "DELETE") { firstParameter = `${apiUrl}/${path}/${body}`; secondParameter = { method, headers } }
    else return { status: false, data: [], msg: "Invalid method" }

    try {
        const response = await fetch(firstParameter, secondParameter)
        const result = await response.json()
        if (!response.ok) return { status: false, data: [], msg: result.msg }
        return { status: true, data: result }
    } catch (error) {
        return { status: false, data: [], msg: error.message || "An unexpected error occurred" }
    }
}