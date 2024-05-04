function Validation(values) {
    let error = {}
    const email_pattern  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.email === ""){
        error.email = "Email cannot be empty"
    }else if(!email_pattern.test(values.email)){
        error.email =  "Email Did not match"
    }else {
        error.email = ""
    }

    if (values.password === "") {
        error.password = "Password cannot be empty"
    }else if (!password_pattern.test(values.password)){
        error.password = "Password did not match"
    }
    else{
        error.password = ""
    }
    if (values.name === "") {
        error.name = "Name cannot be empty an empty field"
    }else {
        error.name = ""
    }
    if (values.username === "") {
        error.username = "Must have a username"
    }else {
        error.username = ""
    }
    return error;
}
export default Validation;