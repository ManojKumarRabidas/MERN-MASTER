// export async function apiCall(path, method, body, headers) {
//     console.log("API Call", { path, method, body, headers });
//     const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000"
//     const siteType = import.meta.env.VITE_SITE_TYPE || "STATIC"
//     if (siteType === "STATIC") return { status: false, msg: "API calls are not allowed in static site type" }

//     let firstParameter = null
//     let secondParameter = null
//     if (method === "GET") { firstParameter = `${apiUrl}/${path}`; secondParameter = { method, headers } }
//     else if (method === "POST" || method === "PUT") { firstParameter = `${apiUrl}/${path}`; secondParameter = { method, headers, body: JSON.stringify(body) } }
//     else if (method === "DELETE") { firstParameter = `${apiUrl}/${path}/${body}`; secondParameter = { method, headers } }
//     else return { status: false, msg: "Invalid method" }
//     console.log("API Call Parameters", { firstParameter, secondParameter });
//     const response = await fetch(firstParameter, secondParameter)
//     console.log("API Response", response);
//     const result = await response.json()
//     if (!response.ok) return { status: false, msg: result.msg }
//     return { status: true, data: result }
// }

import { STATIC_DATA } from '../assets/data.js'
export async function apiCall(path, method, body, headers) {
    console.log("API Call", { path, method, body, headers });
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001"
    const siteType = import.meta.env.VITE_SITE_TYPE || "STATIC"
    console.log("API URL:", apiUrl, "Site Type:", siteType);
    if (siteType === "STATIC") {
        if (method === "GET") {
            const data = STATIC_DATA[path]
            console.log("Static Data Retrieved", data);
            if (!data) return { status: false, data: [], msg: "No data found for the given path" }
            return { status: true, data: { data: data }, msg: "This is a static data response" }
        }
        return { status: false, data: [], msg: "API calls are not allowed in static site type" }
    }


    let firstParameter = null
    let secondParameter = null

    const jsonHeaders = { "Content-Type": "application/json", ...headers } // Fix 1: add Content-Type

    if (method === "GET") { firstParameter = `${apiUrl}/${path}`; secondParameter = { method, headers } }
    else if (method === "POST" || method === "PATCH") { firstParameter = `${apiUrl}/${path}`; secondParameter = { method, headers: jsonHeaders, body: JSON.stringify(body) } }
    else if (method === "DELETE") { firstParameter = `${apiUrl}/${path}/${body}`; secondParameter = { method, headers } }
    else return { status: false, data: [], msg: "Invalid method" }

    console.log("API Call Parameters", { firstParameter, secondParameter });

    try { // Fix 2: wrap in try/catch
        const response = await fetch(firstParameter, secondParameter)
        console.log("API Response", response);
        const result = await response.json()
        if (!response.ok) return { status: false, data: [], msg: result.msg }
        return { status: true, data: result }
    } catch (error) {
        console.log("API Call Failed", error);
        return { status: false, data: [], msg: error.message || "An unexpected error occurred" }
    }
}