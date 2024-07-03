import { formatMatchDate } from "./formatDate";

export function generateRepeatText(repeat, startDateTime) {
    if (!repeat || !repeat.type) {
        return '';
    }

    let startText = '';
    if (startDateTime) {
        startText = `starting on ${formatMatchDate(startDateTime)}`;
    }

    switch (repeat.type) {
        case 'minute':
            return `Reminder is running every ${repeat.every} minute${repeat.every > 1 ? 's' : ''}, ${startText}`;
        case 'hourly':
            return `Reminder is running every ${repeat.every} hour${repeat.every > 1 ? 's' : ''}, ${startText}`;
        case 'daily':
            return `Reminder is running daily, ${startText}`;
        case 'weekly':
            return `Reminder is running weekly, ${startText}`;
        case 'weekdays':
            if (repeat.weekdays && repeat.weekdays.length > 0) {
                const weekdaysList = repeat.weekdays.map(day => day.charAt(0).toUpperCase() + day.slice(1)).join(', ');
                return `Reminder is running on weekdays. Days are: ${weekdaysList}, ${startText}`;
            } else {
                return `Reminder is running on weekdays, ${startText}`;
            }
        case 'monthly':
            return `Reminder is running monthly, ${startText}`;
        case 'yearly':
            return `Reminder is running yearly, ${startText}`;
        default:
            return '';
    }
}
