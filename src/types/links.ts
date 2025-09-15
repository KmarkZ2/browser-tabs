export type Link = {
    href: string,
    label?: string,
    icon: string,
    id?: string
    pinned: boolean
}
export type LocalStorageLinks = {
    visible: Link[],
    overflow: Link[]
}