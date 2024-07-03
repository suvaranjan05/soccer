import * as Yup from 'yup';

const validation = Yup.object().shape({
    name: Yup.string()
        .required('Team name is required')
        .min(2, 'Team name must be at least 2 characters'),
    description: Yup.string()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters'),
    formation: Yup.string().required('Formation is required'),
    coach: Yup.object().shape({
        fullName: Yup.string()
            .required('Coach name is required')
            .min(2, 'Coach name must be at least 2 characters'),
        address: Yup.string()
            .required('Coach address is required')
            .min(5, 'Coach address must be at least 5 characters'),
    }),
    bankInfo: Yup.object().shape({
        paynowNumber: Yup.string()
            .required('PayNow number is required'),
        // .matches(/^\d{10}$/, 'Invalid PayNow number'),
        bankCardNumber: Yup.string()
            .required('Bank card number is required'),
        // .matches(/^\d{10}$/, 'Invalid bank card number'),
        bankNumber: Yup.string()
            .required('Bank number is required'),
        // .matches(/^\d{10}$/, 'Invalid bank number'),
    }),
    sponsor: Yup.object().shape({
        name: Yup.string()
            .required('Sponsor name is required')
            .min(2, 'Sponsor name must be at least 2 characters'),
        contact: Yup.string()
            .required('Contact information is required'),
        // .matches(/^\d{10}$/, 'Invalid contact number'),
        amount: Yup.string().required('Sponsor amount is required'),
        period: Yup.object().shape({
            startDate: Yup.date()
                .required('Start date is required')
                .typeError('Start date must be a valid date'),
            // .min(new Date(), 'Start date must be today or later'),
            endDate: Yup.date()
                .required('End date is required')
                .typeError('End date must be a valid date')
            // .min(Yup.ref('startDate'), 'End date must be after start date'),
        }),
    }),
});

export default validation;
