import { cca } from "$lib/auth/msal-node";
import { variables } from "$lib/variables";
import type { AuthorizationCodeRequest } from "@azure/msal-node";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ params, request, locals }) => {
    const requestFormData = await request.formData()
    console.log(requestFormData)
    const code = requestFormData.get("code")?.toString();
    const callback = requestFormData.get("state")?.toString();
    if (!code) {
        throw "No code returned"
    }
    const tokenRequest: AuthorizationCodeRequest = {
        code: code,
        scopes: ["api://1b54cdba-21ce-429c-b73f-2c9b49013160/api.read"],
        redirectUri: variables.baseUri + "auth/server-redirect",
        enableSpaAuthorizationCode: true
    };
    // tokenRequest.tokenQueryParameters = {
    //     dc: "ESTS-PUB-WUS2-AZ1-FD000-TEST1",
    //     hybridspa: "true"
    // }
    try {
        console.log("hej________")
        console.log(tokenRequest)
        const response = await cca.acquireTokenByCode(tokenRequest)
        console.log(response)
        if (!response) {
            return {

            }
        }
        const { code } = response
        if (!code) {
            throw "No code returned"
        }
        return {
            status: 200,
            body: {
                code,
                callback
            },

        }
    }
    catch (e) {

        console.error(e)
    }

    // .then((response) => {
    //     const {
    //         sid, // Session ID claim, used for non-hybrid
    //         login_hint: loginHint, // New login_hint claim (used instead of sid or email)
    //         preferred_username: preferredUsername // Email
    //     } = response.idTokenClaims;

    //     // Spa auth code that will be redeemed by MSAL.js v2 client-side
    //     const { code } = response;

    //     // Attach auth artifacts to session to they can be rendered downstream
    //     req.session.isAuthenticated = true;
    //     req.session.code = code;
    //     req.session.sid = sid;
    //     req.session.loginHint = loginHint;
    //     req.session.preferredUsername = preferredUsername;

    //     res.redirect(`/auth/client-redirect`)
    // })
    // .catch((error) => {
    //     console.timeEnd(timeLabel)
    //     console.log(error);
    //     res.status(500).send(error);
    // });
    return {
        status: 404,
    }
}
