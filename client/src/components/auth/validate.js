export const validateSignup = ({ email, password, userName }) => {
    let errors = {};
    if (!email) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Invalid email address";
    }

    if (!password) {
        errors.password = "Password is required";
    } else if (password.length < 4) {
        errors.password = "Password must be at least 4 characters";
    }

    if (!userName) {
        errors.userName = "Username is required";
    }

    return errors;
};

export const validateLogin = ({ email, password }) => {
    let errors = {};
    if (!email) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Invalid email address";
    }

    if (!password) {
        errors.password = "Password is required";
    } else if (password.length < 4) {
        errors.password = "Password must be at least 4 characters";
    }

    return errors;
};
