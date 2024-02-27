export function getHourAndMinute(): string {
    const now = new Date();
    const hours = now.getHours();
    const formattedHours = hours.toString().padStart(2, '0');
    const minutes = now.getMinutes();
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
}
