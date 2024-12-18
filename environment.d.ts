declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DESTINY_API_KEY: string;
        }
    }
}

export {};