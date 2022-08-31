import type { Profile } from "$lib/data/validation";

export const deltaDate = (date: string): string => {
    const msPerDay = 1000 * 60 * 60 * 24;
    const a = new Date(date);
    const b = new Date();
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    const deltaDays = Math.floor((utc2 - utc1) / msPerDay);
    if (deltaDays === 0) return 'today';
    if (deltaDays === 1) return 'yesterday';
    return `${deltaDays} days ago`;
};
export const getAuthor = (messageProfile: Profile, ticketProfile: Profile): string | null => {
    if (messageProfile.id === ticketProfile.id) return 'OP';

    // Check aditional claims
    return null;
};