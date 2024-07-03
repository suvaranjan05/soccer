import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Team name is required'),
    // avatar: Yup.string().required('Team avatar is required'),
    description: Yup.string().required('Team description is required'),
    coach: Yup.object().shape({
        name: Yup.string().required('Coach name is required'),
        // avatar: Yup.string().required('Coach avatar is required'),
        address: Yup.string().required('Coach address is required'),
    }),
    bankInfo: Yup.object().shape({
        paynowNumber: Yup.string().required('PayNow number is required'),
        bankCardNumber: Yup.string().required('Bank card number is required'),
        bankNumber: Yup.string().required('Bank number is required'),
    }),
    sponsor: Yup.object().shape({
        name: Yup.string().required('Sponsor name is required'),
        contact: Yup.string().required('Sponsor contact information is required'),
        amount: Yup.string().required('Sponsorship amount is required'),
        period: Yup.object().shape({
            startDate: Yup.date()
                .required('Start date is required')
                .min(new Date(), 'Start date must be in the future'),
            endDate: Yup.date()
                .required('End date is required')
                .min(Yup.ref('startDate'), 'End date must be after start date')
        }).required('Sponsorship period is required'),
    }),
});

export default validationSchema;
