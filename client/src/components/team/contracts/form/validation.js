import * as Yup from 'yup';

const validation = Yup.object().shape({
    role: Yup.string().required('Role is required'),
    period: Yup.object().shape({
        startDate: Yup.date().required('Start Date is required'),
        endDate: Yup.date().required('End Date is required')
    }),
    borrowFee: Yup.number().required('Borrow Fee is required'),
    sellingFee: Yup.number().required('Selling Fee is required'),
    commissionOnRenting: Yup.number().required('Commission on Renting is required'),
    commissionOnWinning: Yup.number().required('Commission on Winning is required'),
    jerseyNumber: Yup.number().required('Jersey Number is required')
});

export default validation;
