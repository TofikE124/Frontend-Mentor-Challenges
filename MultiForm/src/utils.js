export function validateName(name){
    return name.length!=0
}

export function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

export function validatePhone(phone){
    return /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
        .test(phone)
        &&phone.length>8
}