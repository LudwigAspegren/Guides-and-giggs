import { writable, type Writable } from "svelte/store";

export const modalTitle: Writable<string | null> = writable()
export const modalMessage: Writable<string | null> = writable()

export const displayModal = (title: string, message: string) => {
    modalTitle.set(title)
    modalMessage.set(message)
}

export const resetModal = () => {
    modalTitle.set(null)
    modalMessage.set(null)
}

enum AlertTypes {
    SUCCESS = 'success',
    WARNING = 'warning',
    ERORR = 'error'
}
type AlertType = keyof typeof AlertTypes;
AlertTypes['WARNING']

export const altertTitle: Writable<string | null> = writable()
export const alertMessage: Writable<string | null> = writable()
export const alertLevel: Writable<string | null> = writable()

export const resetAlert = () => {
    altertTitle.set(null)
    alertMessage.set(null)
    alertLevel.set(null)
}
export const displayalert = (title: string, message: string, alertType: AlertType, resetTime: number = 4000) => {
    altertTitle.set(title)
    alertMessage.set(message)
    alertLevel.set(AlertTypes[alertType])
    setTimeout(() => resetAlert(), resetTime)
}