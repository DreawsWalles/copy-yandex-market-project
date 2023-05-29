export type action = () => void
export interface IMenuProps
{
    id: string,
    actions: action[]
}