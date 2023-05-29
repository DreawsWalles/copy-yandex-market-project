export interface IButtonIconProps
{
    id: string,
    icon: string,
    width: number
    height?: number,
    onClick() : void,
    theme?: "Success" | "Cancel"
}