export class Label
{
    id: string;
    text: string;
    constructor(id: string, text: string) {
        this.id = id;
        this.text = text;
    }
}
export interface IInputProps
{
    id:string,
    idError: string,
    type: "text" | "password",
    setValue(e: string): void,
    label?: Label,
    value: string | null
}