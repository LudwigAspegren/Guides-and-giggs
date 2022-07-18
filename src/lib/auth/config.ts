import { variables } from "$lib/variables";
import { LogLevel, type Configuration } from "@azure/msal-browser";

export const apiRead = ['api://1b54cdba-21ce-429c-b73f-2c9b49013160/api.read']

export const msalConfig: Configuration = {
    auth: {
        clientId: variables.msalClientId,
        redirectUri: variables.baseUri + "auth/client-redirect",
        authority: variables.msalAuthority
    },
    system: {
        loggerOptions: {
            loggerCallback: (level: LogLevel, message: string, containsPii: boolean): void => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            },
            piiLoggingEnabled: false
        },
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
        secureCookies: false
    },
}