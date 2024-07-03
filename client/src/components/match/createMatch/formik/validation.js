import * as Yup from 'yup';

const validation = Yup.object().shape({
    referee: Yup.string().required('Referee is required'),
    date: Yup.date().required('Match date is required'),
    location: Yup.string().required('Match location is required'),
    type: Yup.string().required('Match type is required'),
    field: Yup.string().required('Field is required'),
    fees: Yup.object().shape({
        // fieldFee: Yup.number().required('Field fee is required').min(0, 'Field fee cannot be negative'),
        // refFee: Yup.number().required('Referee fee is required').min(0, 'Referee fee cannot be negative'),
        titleFee: Yup.number().required('Title fee is required').min(0, 'Title fee cannot be negative'),
        joiningFee: Yup.number().required('Joining fee is required').min(0, 'Joining fee cannot be negative')
    }),
    description: Yup.string().required('Match description is required'),
    // matchPhoto: Yup.string().url('Match photo must be a valid URL').required('Match photo is required'),
    playerNeed: Yup.number().required('Player need is required').min(1, 'At least one player is needed'),
});

export default validation;
