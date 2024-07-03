import * as Yup from "yup";

const validationSchema = Yup.object({
    name: Yup.string().required("Field name is required"),
    location: Yup.string().required("Location is required"),
    postalCode: Yup.string().required("Postal code is required"),
    // photo: Yup.string().url("Must be a valid URL").required("Photo URL is required"),
    fee: Yup.number().min(0, "Fee cannot be negative").required("Fee is required"),
    shower: Yup.boolean().required("Shower availability is required"),
    toilet: Yup.boolean().required("Toilet availability is required"),
    childrenPlayground: Yup.boolean().required("Children playground availability is required"),
    foodCourtNearby: Yup.boolean().required("Food court availability is required"),
});

export default validationSchema;
