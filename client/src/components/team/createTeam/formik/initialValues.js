export const initialValues = {
    name: '',
    avatar: '',
    description: '',
    coach: {
        name: '',
        avatar: '',
        address: '',
    },
    bankInfo: {
        paynowNumber: '',
        bankCardNumber: '',
        bankNumber: '',
    },
    sponsor: {
        name: '',
        contact: '',
        amount: '',
        period: {
            startDate: "",
            endDate: "",
        },
    },
};

export default initialValues;
