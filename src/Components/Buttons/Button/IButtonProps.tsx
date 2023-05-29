export interface IButtonProps
{
    id: string,
    text: string,
    size: "s",
    theme: "white" | "dark",
    onClick(): void,
    disabled: boolean
}