const { Client } = require("discord.js-selfbot-v13");
const prompt = require("prompt-sync")();

const token = prompt("Please enter your Discord token: ");

const client = new Client();

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  prompt(
    "Are you sure you want to fuck this account up (THERE IS NO GOING BACK AFTER THIS) IF NO, CLOSE THIS"
  );
  fucker();
});

client.login(token).catch((err) => {
  console.error("Failed to login:", err.message);
  process.exit(1);
});

async function fucker() {
  console.log("Attempting to leave all servers...");
  await leaveServers();
  console.log("Attempting to remove all friends...");
  await removeAllFriends();
  console.log("Attempting to clear all dms...");
  await closeAllDMs();
}

async function leaveServers() {
  try {
    const guilds = client.guilds.cache;

    for (const guild of guilds.values()) {
      try {
        console.log(`Leaving server: ${guild.name}`);
        await guild.leave();
      } catch (error) {
        console.error(`Error leaving server ${guild.name}:`, error.message);
      }
    }
  } catch (error) {
    console.error("Error fetching guilds:", error.message);
  }
}

async function removeAllFriends() {
  try {
    const friends = client.relationships.friendCache;

    if (!friends || friends.size === 0) return;

    const friendIds = Array.from(friends.keys());

    for (const id of friendIds) {
      if (id !== client.user.id) {
        try {
          await client.relationships.deleteRelationship(id.toString());
        } catch (error) {
          console.error(`Error removing friend with ID ${id}:`, error.message);
        }
      }
    }
  } catch (error) {
    console.error("Error removing friends:", error.message);
  }
}

async function closeAllDMs() {
  try {
    const dmChannels = client.channels.cache.filter(
      (channel) => channel.type === "DM"
    );

    for (const dmChannel of dmChannels.values()) {
      console.log(`Closing DM channel: ${dmChannel.id}`);
      await dmChannel.delete();
    }
  } catch (error) {
    console.error("Error closing DMs:", error.message);
  }
}
