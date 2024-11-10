export interface Wallpaper {
    url: string,
    name: string
}

export interface FullWallpaper extends Wallpaper {
    liked: boolean,
    suggested: boolean,
    library: boolean,
}

export function useLikedWallpapers(): FullWallpaper[] {
    const wallpapers = useWallpapers();
    return wallpapers.filter((w) => w.liked == true);
}

export function useLibraryWallpapers(): FullWallpaper[] {
    const wallpapers = useWallpapers();
    return wallpapers.filter((w) => w.library == true);
}

export function useSuggestedWallpapers(): FullWallpaper[] {
    const wallpapers = useWallpapers();
    return wallpapers.filter((w) => w.suggested == true);
}

export default function useWallpapers(): FullWallpaper[] {
    return [
        {
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/SuVYPOauSE2GESq0tyYFbQ",
            name: "abstract",
            liked: true,
            suggested: false,
            library: false,
        },
        {
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/AlkAmpzzQticCTG0D0HfbQ",
            name: "elephantiger",
            liked: true,
            suggested: true,
            library: false,
        },
        {
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/ha7f6agHTFyXZ7VTs9mg4w",
            name: "river",
            liked: false,
            suggested: true,
            library: false,
        },
        {
            url: "https://ideogram.ai/assets/image/lossless/response/baduALyUTcu9VMAFrkWP-Q",
            name: "room",
            liked: false,
            suggested: true,
            library: true,
        },
        {
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/JCfsKB_8QUWaMdVa1ZBu2A",
            name: "Lord Shiva",
            liked: false,
            suggested: true,
            library: true,
        },
        {
            url: "https://ideogram.ai/assets/progressive-image/balanced/response/AhOLD0JdTzKHHjBQZyGpOA",
            name: "flowers",
            liked: false,
            suggested: true,
            library: true,
        },
    ]
}