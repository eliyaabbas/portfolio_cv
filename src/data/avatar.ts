// Hero avatar: shown at 150–195px on phones and 255px on desktop (75% of .avatar-wrapper),
// so serve resized copies instead of the 1024px original. Shared by the Hero <img> and its <link rel="preload">.
export const AVATAR_SRCSET = '/avatar-256.webp 256w, /avatar-400.webp 400w, /avatar-600.webp 600w';
export const AVATAR_SIZES = '(min-width: 900px) 255px, min(43.5vw, 195px)';
