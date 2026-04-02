export class Guid {
   
    readonly Value: string;

    constructor(value: string) {
        if (!Guid.ValidateGuid(value)) {
            throw new Error('Invalid GUID format');
        }
        this.Value = value;
    }

    static newGuid(): Guid {
        var randomGuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        return new Guid(randomGuid);
    }

    private static ValidateGuid(value: string): boolean {
        const guidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return guidV4Regex.test(value);
    }

    equals(other: Guid): boolean {
        return this.Value === other.Value;
    }

}