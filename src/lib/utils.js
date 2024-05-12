import { twMerge } from 'tailwind-merge'
import { cx } from 'classix'

export function cn(...args) {
    return twMerge(cx(...args))
}