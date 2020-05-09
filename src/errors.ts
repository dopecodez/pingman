export class IpError extends Error {
    code?: string;
    constructor(message: string, code?: string) {
        super(message);
        this.name = 'IpError';
        this.code = code;
    }
}