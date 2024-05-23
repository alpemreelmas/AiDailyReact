import { twMerge } from 'tailwind-merge'
import { cx } from 'classix'
import {toast} from "react-toastify";

export function cn(...args) {
    return twMerge(cx(...args))
}

export function ctoast(text, opts){
    return toast(text,{...opts, theme: "dark"})
}