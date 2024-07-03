// Function to format date to 'yyyy-MM-dd' format
const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
};

const getInitialValues = (data = {}) => {
    return {
        name: data.name || '',
        description: data.description || '',
        formation: data.formation || '3-3-4',
        coach: {
            fullName: data.coach?.fullName || '',
            address: data.coach?.address || '',
        },
        bankInfo: {
            paynowNumber: data.bankInfo?.paynowNumber || '',
            bankCardNumber: data.bankInfo?.bankCardNumber || '',
            bankNumber: data.bankInfo?.bankNumber || '',
        },
        sponsor: {
            name: data.sponsor?.name || '',
            contact: data.sponsor?.contact || '',
            amount: data.sponsor?.amount || '',
            period: {
                startDate: formatDate(data.sponsor?.period?.startDate),
                endDate: formatDate(data.sponsor?.period?.endDate),
            },
        },
    };
};

export default getInitialValues;
