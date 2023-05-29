export function CheckOnLength(text: string, minLength: number = 1): boolean{
    return text.trim().length >= minLength;
}