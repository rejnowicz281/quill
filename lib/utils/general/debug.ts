class debug {
    static log(...args: any[]): void {
        if (process.env.NODE_ENV === "development") console.log(...args);
    }

    static error(...args: any[]): void {
        if (process.env.NODE_ENV === "development") console.error(...args);
    }
}

export default debug;
