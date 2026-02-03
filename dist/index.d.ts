type logLevel = {
    color: string;
    prefix: string;
};
declare class log {
    private level;
    Info(msg: string): void;
    Alert(msg: string): void;
    Error(msg: string): void;
}

export { log, type logLevel };
