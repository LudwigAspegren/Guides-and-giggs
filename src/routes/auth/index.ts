import { cca } from "$lib/auth/msal-node";
import { variables } from "$lib/variables";
import { ResponseMode, type AuthorizationUrlRequest } from "@azure/msal-node";
import type { RequestHandler } from "@sveltejs/kit";



export const GET: RequestHandler = async ({ params, request, url }) => {

    const previousPage = url.searchParams.get("callback")

    const authCodeUrlParameters: AuthorizationUrlRequest = {
        scopes: ["api://1b54cdba-21ce-429c-b73f-2c9b49013160/api.read"],
        redirectUri: variables.baseUri + "auth/server-redirect",
        responseMode: ResponseMode.FORM_POST,
        state: previousPage ?? "/"
    };

    // Generate auth code url and redirect the user
    try {
        const response = (await cca.getAuthCodeUrl(authCodeUrlParameters))
        console.log("response")
        console.log(response)
        return {
            headers: { location: response },
            status: 302
        }
    }
    catch (e) {
        console.error(e)
        return {
            status: 404

        }
    }
}