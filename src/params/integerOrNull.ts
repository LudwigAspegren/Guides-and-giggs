export function match(param: string) {
    if (param === '') return true
    return /^\d+$/.test(param);
}