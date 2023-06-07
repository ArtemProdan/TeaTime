export const required = value => {
    if (value) return undefined
    return 'Надо что-то в это поле ввести полюбас'
} 

export const maxLengthCreator = (maxLength) => (value) => {
    if (value && value.length > maxLength)  return `АШИПКА!!! Max length is ${maxLength} symbols`
    return undefined
} 

export const emailValidator = (values, error) => (value) => {
    if (!values.email) { error.email = `Required`} 
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) return `Invalid email address`
} 

// export const minLength2  = value => {
//     if (value) return undefined
//     return 'ОШИБОНЬКА Field is required'
// } 