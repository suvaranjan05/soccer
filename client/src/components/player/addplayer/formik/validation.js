// validationSchema.js
import * as Yup from "yup";

export const validation = Yup.object({
    fullName: Yup.string().required("Required"),
    age: Yup.string().required("Required"),
    dateOfBirth: Yup.string().required("dateOfBirth"),
    gender: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
});
