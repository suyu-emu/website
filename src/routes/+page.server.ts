import { building } from "$app/environment";
import fetch from "node-fetch";
import cheerio from "cheerio";

let subredditStats = {
    subscriberCount: 0,
    activeUsers: 0,
};

async function fetchSubredditStats() {
    console.log("Fetching subreddit statistics from r/suyu");

    try {
        // Fetch the HTML of the subreddit
        const response = await fetch("https://www.reddit.com/r/suyu/");
        const html = await response.text();

        // Load the HTML into Cheerio
        const $ = cheerio.load(html);

        // Extract statistics
        const subscriberText = $("._3XFx6CfPlg-4Usgxm0gK8R").first().text(); // Subscriber count
        const activeUserText = $("._3XFx6CfPlg-4Usgxm0gK8R").last().text(); // Active user count

        // Parse numbers from the text
        subredditStats.subscriberCount = parseInt(subscriberText.replace(/\D/g, ""), 10) || 0;
        subredditStats.activeUsers = parseInt(activeUserText.replace(/\D/g, ""), 10) || 0;

        console.log("Fetched subreddit statistics:", subredditStats);
    } catch (error) {
        console.error("Error scraping subreddit statistics:", error);
    }
}

if (!building) {
    await fetchSubredditStats();
    setInterval(fetchSubredditStats, 1000 * 60 * 10); // Refresh every 10 minutes
}

export async function load() {
    return {
        subredditStats,
    };
}
