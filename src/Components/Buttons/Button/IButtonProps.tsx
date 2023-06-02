export interface IButtonProps
{
    id: string,
    text: string,
    size: "s",
    theme: "white" | "dark" | "success" | "cancel",
    onClick(e?: any): void,
    disabled: boolean
}