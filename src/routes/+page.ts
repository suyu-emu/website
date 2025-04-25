import { building } from "$app/environment";

let subredditStats = {
    subscriberCount: 0,
    activeUsers: 0,
};

async function fetchSubredditStats() {
    console.log("Fetching subreddit statistics from r/suyu");

    try {
        const response = await fetch("https://www.reddit.com/r/suyu/about.json", {
            headers: {
                "User-Agent": "suyu-stats-fetcher/1.0"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        subredditStats.subscriberCount = json.data.subscribers || 0;
        subredditStats.activeUsers = json.data.accounts_active || 0;

        console.log("Fetched subreddit statistics:", subredditStats);
    } catch (error) {
        console.error("Error fetching subreddit statistics:", error);
    }
}

export async function load() {
    await fetchSubredditStats();

    return {
        subredditStats,
    };
}
