export interface MsalContext {
    instance: PublicClientApplication,
    accounts: AccountInfo[],
    inProgress: InteractionStatus
}

interface ImportMetaEnv {
    MSAL_CLIENT_SECRET: string,
    MSAL_CLIENT_ID: string,
    MSAL_AUTHORITY: string
    API_URI: string
    API_BASE_URI: string

}
interface ImportMeta {
    readonly env: ImportMetaEnv
}