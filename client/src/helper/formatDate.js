export function formatDate(dateString) {
    const date = new Date(dateString); // Parse the ISO 8601 date string
    const day = date.getDate().toString().padStart(2, '0'); // Get day and pad with leading zero if necessary
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month (add 1 because January is 0) and pad with leading zero if necessary
    const year = date.getFullYear().toString(); // Get full year

    return `${day}/${month}/${year}`; // Format the date as dd/mm/yyyy
}

export function convertToISODateString(dateString) {
    // Split the formatted date string into day, month, and year parts
    const parts = dateString.split('/');

    // Extract day, month, and year
    const day = parts[0].padStart(2, '0'); // Ensure day is always two digits
    const month = parts[1].padStart(2, '0'); // Ensure month is always two digits
    const year = parts[2]; // Year remains unchanged

    // Construct the ISO 8601 date string format
    return `${year}-${month}-${day}T00:00:00.000Z`;
}

export function simplifyISODateString(isoDateString) {
    // Extract the date part from the ISO 8601 string
    const datePart = isoDateString.split('T')[0]; // Split at 'T' and take the first part

    return datePart;
}

export function formatMatchDate(isoString) {
    const date = new Date(isoString);

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };

    const formattedDate = date.toLocaleString('en-US', options);

    return formattedDate.replace(',', ',').replace(':', '.');
}