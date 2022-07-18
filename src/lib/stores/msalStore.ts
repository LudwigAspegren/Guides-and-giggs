
import { apiRead, msalConfig } from "$lib/auth/config";
import type { User } from "$lib/types";
import { variables } from "$lib/variables";
import { InteractionRequiredAuthError, PublicClientApplication, type AccountInfo, type AuthenticationResult } from "@azure/msal-browser";
import { writable, type Writable } from "svelte/store";
import { storageInSession } from "./store";



export interface msalContext {
    sid: string,
    isAuthenticated: boolean,
    code: string,
    loginHint: string,
    preferredUsername: string,
    token: string
}

export const emptyMsalContext: msalContext = {
    sid: "",
    isAuthenticated: false,
    code: "",
    loginHint: "",
    preferredUsername: "",
    token: ""

}

export const AuthModule = (() => {
    const afterAuthenticationUrl: Writable<string> = writable("/")
    const user: Writable<User | null> = storageInSession("user", null)
    const msalInstance = new PublicClientApplication(msalConfig)
    const token: Writable<string> = writable()
    const isAuthenticated: Writable<boolean> = storageInSession("is_authenticated", false)
    const code: Writable<string> = writable("");
    const loginRequest = {
        scopes: apiRead
    }
    const getAccount = (): AccountInfo | null => {
        // need to call getAccount here?
        const currentAccounts = msalInstance.getAllAccounts();
        if (currentAccounts.length < 1) {
            console.log("No accounts detected");
            return null;
        }

        if (currentAccounts.length > 1) {
            // Add choose account code here
            console.log("Multiple accounts detected, need to add choose account code.");
            return currentAccounts[0];
        }
        return currentAccounts[0];
    }
    const handleResponse = (response: AuthenticationResult | null) => {

    }
    const loadAuthModule = async (): Promise<void> => {
        try {
            const response = await msalInstance.handleRedirectPromise()

            handleResponse(response)
        } catch (e) {
            console.log(e)
        }
    }
    const accuireToken = async (code: string): Promise<AuthenticationResult | undefined> => {
        try {
            const result = await msalInstance.acquireTokenByCode({
                code,
                ...loginRequest
            });
            console.log('MSAL: acquireTokenByCode completed successfully', result);
            token.set(result.accessToken)
            isAuthenticated.set(true)
            return result;
        } catch (error) {
            console.error('MSAL: acquireTokenByCode failed', error);

            if (error instanceof InteractionRequiredAuthError) {
                console.log('MSAL: acquireTokenByCode failed, redirecting');
                // Use loginHint from server to ensure same user
                await msalInstance.loginRedirect({
                    ...loginRequest
                });
                //need to handle this case
            }
        }
    }
    const silentTokenRequest = async () => {
        const currentAccount = getAccount()
        if (currentAccount === null) {
            return null
        }
        var silentRequest = {
            scopes: apiRead,
            account: currentAccount,
            forceRefresh: false
        };

        var request = {
            scopes: apiRead,
            loginHint: currentAccount.username // For v1 endpoints, use upn from idToken claims
        };
        try {
            isAuthenticated.set(true)
            const tokenResponse = await msalInstance.acquireTokenSilent(silentRequest)
            token.set(tokenResponse.accessToken)
            return tokenResponse
        } catch (error) {
            if (error instanceof InteractionRequiredAuthError) {
                // fallback to interaction when silent call fails
                try {
                    const response = await msalInstance.acquireTokenRedirect(request)
                } catch (error) {
                    isAuthenticated.set(false)
                }
            }
            isAuthenticated.set(false)

        }

    }

    const resetAuth = () => {
        isAuthenticated.set(false)
        user.set(null)
    }
    const logout = async () => {
        resetAuth()
        try {
            await msalInstance.logoutRedirect({
                postLogoutRedirectUri: variables.baseUri
            });
        }
        catch (error) {
            console.log(error)
        }
    }
    return {
        accuireToken,
        loadAuthModule,
        silentTokenRequest,
        getAccount,
        logout,
        isAuthenticated,
        token,
        code,
        afterAuthenticationUrl,
        user

    }
})()

// export const currentAccount: Writable<AccountInfo | null> = storageInLocal("current_account", null);


export const resetStore = () => {

}