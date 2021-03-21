export class pingError extends Error {
    code?: string;
    constructor(message: string, code?: string) {
        super(message);
        this.name = 'pingError';
        this.code = code;
    }
}

export class ipError extends pingError {
    constructor(message: string) {
        super(message);
        this.name = 'ipError';
    }
}

export class supportedError extends pingError {
    constructor(message: string) {
        super(message);
        this.name = 'platformNotSupportedError';
    }
}