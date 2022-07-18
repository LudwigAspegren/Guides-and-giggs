import { variables } from "$lib/variables";

import * as msalNode from "@azure/msal-node";
import 'dotenv/config';

export const cca = new msalNode.ConfidentialClientApplication({
    auth: {
        clientId: variables.msalClientId,
        authority: variables.msalAuthority,
        clientSecret: process.env.MSAL_CLIENT_SECRET
    },
    system: {
        loggerOptions: {
            loggerCallback: (level: msalNode.LogLevel, message: string, containsPii: boolean): void => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case msalNode.LogLevel.Error:
                        console.error(message);
                        return;
                    case msalNode.LogLevel.Info:
                        console.info(message);
                        return;
                    case msalNode.LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case msalNode.LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            },
            piiLoggingEnabled: true,
            logLevel: msalNode.LogLevel.Verbose,
        }
    }
});



