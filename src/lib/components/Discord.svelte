<script>
    import { onMount } from "svelte";
    let discordData = null;

    // Fetch Discord data
    async function fetchDiscordData() {
        try {
            const response = await fetch(
                "https://api.lanyard.rest/v1/users/732157441889927239",
            );
            const data = await response.json();
            discordData = data.success ? data.data : null;
        } catch (error) {
            console.error("Error fetching Discord data:", error);
        }
    }

    onMount(() => {
        fetchDiscordData();
    });
</script>

{#if discordData}
    <div class="discord-card">
        <div class="discord-header">
            <img
                src={`https://cdn.discordapp.com/avatars/${discordData.discord_user.id}/${discordData.discord_user.avatar}.png`}
                alt="Discord Avatar"
                class="avatar"
            />
            <div class="discord-user">
                <h4>
                    {discordData.discord_user.global_name ||
                        discordData.discord_user.username}
                </h4>
                <p>@{discordData.discord_user.username}</p>
            </div>
        </div>
        <div class="discord-status-info">
            <div class="status-badge {discordData.discord_status}">
                <i class="bi bi-circle-fill"></i>
                <span>{discordData.discord_status}</span>
            </div>
            <div class="platform">
                {#if discordData.active_on_discord_desktop}
                    <i class="bi bi-pc-display"></i> Desktop
                {:else if discordData.active_on_discord_mobile}
                    <i class="bi bi-phone"></i> Mobile
                {:else if discordData.active_on_discord_web}
                    <i class="bi bi-globe"></i> Web
                {/if}
            </div>
        </div>
        <!-- Activity section - Game or Spotify -->
        {#if discordData.activities && discordData.activities.length > 0}
            <div class="discord-activity">
                {#if discordData.listening_to_spotify && discordData.spotify}
                    <!-- Spotify Activity -->
                    <div class="activity spotify">
                        <div class="activity-icon">
                            <img
                                src={discordData.spotify.album_art_url}
                                alt="Album Art"
                            />
                        </div>
                        <div class="activity-details">
                            <div class="activity-title">
                                Listening to Spotify
                            </div>
                            <div class="activity-name">
                                {discordData.spotify.song}
                            </div>
                            <div class="activity-subtitle">
                                by {discordData.spotify.artist}
                            </div>
                            <div class="activity-album">
                                on {discordData.spotify.album}
                            </div>
                        </div>
                    </div>
                {:else}
                    <!-- Game or Other Activity -->
                    {#each discordData.activities.filter((a) => a.type === 0) as activity}
                        <div class="activity game">
                            {#if activity.assets?.large_image}
                                <div class="activity-icon">
                                    <img
                                        src={activity.assets.large_image.startsWith(
                                            "mp:",
                                        )
                                            ? `https://media.discordapp.net/${activity.assets.large_image.substring(3)}`
                                            : activity.assets.large_image.match(
                                                    /^\d+$/,
                                                )
                                              ? `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`
                                              : activity.assets.large_image}
                                        alt="Game Icon"
                                    />
                                </div>
                            {/if}
                            <div class="activity-details">
                                <div class="activity-title">Playing</div>
                                <div class="activity-name">{activity.name}</div>
                                {#if activity.details}
                                    <div class="activity-subtitle">
                                        {activity.details}
                                    </div>
                                {/if}
                                {#if activity.state}
                                    <div class="activity-state">
                                        {activity.state}
                                    </div>
                                {/if}
                            </div>
                        </div>
                    {/each}
                {/if}
            </div>
        {:else}
            <div class="no-activity">
                <i class="bi bi-controller"></i>
                <span>Not playing anything</span>
            </div>
        {/if}
    </div>
{:else}
    <div class="loading-card">
        <i class="bi bi-hourglass-split"></i>
        <p>Loading Discord status...</p>
    </div>
{/if}

<style>
    /* Discord Status */
    .discord-card {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .discord-header {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid rgba(255, 255, 255, 0.3);
    }

    .discord-user h4 {
        margin: 0;
        font-weight: 600;
    }

    .discord-user p {
        margin: 0.2rem 0 0;
        font-size: 0.9rem;
        opacity: 0.8;
    }

    .discord-status-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 0.5rem;
        padding: 0.8rem;
    }

    .status-badge {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.3rem 0.7rem;
        border-radius: 1rem;
        font-size: 0.9rem;
        background: rgba(0, 0, 0, 0.3);
    }

    .status-badge.online i {
        color: #43b581;
    }

    .status-badge.idle i {
        color: #faa61a;
    }

    .status-badge.dnd i {
        color: #f04747;
    }

    .status-badge.offline i {
        color: #747f8d;
    }

    .platform {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
    }

    /* Activity styles */
    .discord-activity {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 0.5rem;
        padding: 0.8rem;
    }

    .activity {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .activity-icon {
        width: 60px;
        height: 60px;
        border-radius: 0.5rem;
        overflow: hidden;
        flex-shrink: 0;
    }

    .activity-icon img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .activity-details {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        flex-grow: 1;
        overflow: hidden;
    }

    .activity-title {
        font-size: 0.8rem;
        opacity: 0.7;
    }

    .activity-name {
        font-weight: 600;
        font-size: 1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .activity-subtitle, .activity-state, .activity-album {
        font-size: 0.85rem;
        opacity: 0.8;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .no-activity {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 0.5rem;
        padding: 1rem;
        text-align: center;
        color: rgba(255, 255, 255, 0.6);
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        align-items: center;
    }

    .no-activity i {
        font-size: 1.5rem;
        opacity: 0.7;
    }
</style>
