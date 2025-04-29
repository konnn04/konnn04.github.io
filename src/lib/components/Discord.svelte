<script>
    import { onMount } from "svelte";
    import { slide } from 'svelte/transition';
    
    let discordData = null;
    let showAllActivities = false;

    // Fetch Discord data
    async function fetchDiscordData() {
        try {
            const response = await fetch(
                "https://api.lanyard.rest/v1/users/732157441889927239",
            );
            const data = await response.json();
            discordData = data.success ? data.data : null;
            console.log("Discord data:", discordData);
        } catch (error) {
            console.error("Error fetching Discord data:", error);
        }
    }

    function toggleActivities() {
        showAllActivities = !showAllActivities;
    }
    
    function getStatusColor(status) {
        switch (status) {
            case 'online': return '#43b581';
            case 'idle': return '#faa61a';
            case 'dnd': return '#f04747';
            case 'offline': 
            default: return '#747f8d';
        }
    }
    
    onMount(() => {
        fetchDiscordData();
        // Refresh data every 2 minutes
        const interval = setInterval(fetchDiscordData, 2 * 60 * 1000);
        return () => clearInterval(interval);
    });
</script>

{#if discordData}
    <div class="discord-card">
        <!-- Header with Avatar and User Info -->
        <div class="discord-header">
            <div class="avatar-container">
                <!-- Base avatar -->
                <img
                    src={`
                    https://cdn.discordapp.com/avatars/${discordData.discord_user.id}/${discordData.discord_user.avatar}.png?size=128`}
                    alt="Discord Avatar"
                    class="avatar"
                />
                
                <!-- Avatar decoration if available -->
                {#if discordData.discord_user.avatar_decoration_data}
                    <img 
                        src={`https://cdn.discordapp.com/avatar-decoration-presets/${discordData.discord_user.avatar_decoration_data.asset}.png`}
                        alt="Avatar Decoration"
                        class="avatar-decoration"
                    />
                {/if}
                
                <!-- Status indicator dot -->
                <div 
                    class="status-dot" 
                    style="background-color: {getStatusColor(discordData.discord_status)}"
                >
                    {#if discordData.active_on_discord_mobile}
                        <i class="bi bi-phone-fill status-icon"></i>
                    {/if}
                </div>
            </div>
            
            <div class="user-info">
                <div class="discord-user">
                    <h4>
                        {discordData.discord_user.global_name || discordData.discord_user.username}
                    </h4>
                    <p>@{discordData.discord_user.username}</p>
                </div>
                
                <!-- Server/Clan badge if available -->
                {#if discordData.discord_user.clan}
                    <div class="clan-badge">
                        {#if discordData.discord_user.clan.badge}
                            <img 
                                src={`https://cdn.discordapp.com/clan-badges/${discordData.discord_user.clan.identity_guild_id}/${discordData.discord_user.clan.badge}.png`}
                                alt="Clan Badge"
                                class="clan-icon"
                            />
                        {/if}
                        <span>{discordData.discord_user.clan.tag}</span>
                    </div>
                {/if}
            </div>
        </div>
        
        <!-- Activities Section -->
        {#if discordData.activities && discordData.activities.length > 0}
            <div class="activities-container">
                <!-- Always show first 2 activities -->
                {#each discordData.activities.slice(0, showAllActivities ? discordData.activities.length : 2) as activity, i}
                    <div class="activity-item" transition:slide|local={{ duration: 300 }}>
                        <!-- Custom Status -->
                        {#if activity.type === 4}
                            <div class="activity custom-status">
                                <div class="activity-details">
                                    <div class="activity-name">{activity.state || ""}</div>
                                </div>
                            </div>
                        
                        <!-- Listening (Spotify or YouTube Music) -->
                        {:else if activity.type === 2}
                            <div class="activity listening">
                                <div class="activity-icon">
                                    {#if activity.assets?.large_image}
                                        <img
                                            src={activity.assets.large_image.startsWith("mp:")
                                                ? `https://media.discordapp.net/${activity.assets.large_image.substring(3)}`
                                                : activity.assets.large_image}
                                            alt="Music Cover"
                                            loading="lazy"
                                        />
                                    {:else}
                                        <i class="bi bi-music-note-beamed"></i>
                                    {/if}
                                </div>
                                <div class="activity-details">
                                    <div class="activity-title">
                                        Listening to {activity.name}
                                    </div>
                                    <div class="activity-name">{activity.details || ""}</div>
                                    {#if activity.state}
                                        <div class="activity-subtitle">{activity.state}</div>
                                    {/if}
                                </div>
                            </div>
                        
                        <!-- Gaming or other activities -->
                        {:else}
                            <div class="activity game">
                                <div class="activity-icon">
                                    {#if activity.assets?.large_image}
                                        <img
                                            src={activity.assets.large_image.startsWith("mp:")
                                                ? `https://media.discordapp.net/${activity.assets.large_image.substring(3)}`
                                                : activity.assets.large_image.match(/^\d+$/)
                                                  ? `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`
                                                  : activity.assets.large_image}
                                            alt="Activity Icon"
                                            loading="lazy"
                                        />
                                    {:else}
                                        <i class="bi bi-controller"></i>
                                    {/if}
                                </div>
                                <div class="activity-details">
                                    <div class="activity-title">
                                        {activity.type === 0 ? "Playing" : "Activity"}
                                    </div>
                                    <div class="activity-name">{activity.name}</div>
                                    {#if activity.details}
                                        <div class="activity-subtitle">{activity.details}</div>
                                    {/if}
                                    {#if activity.state}
                                        <div class="activity-state">{activity.state}</div>
                                    {/if}
                                </div>
                            </div>
                        {/if}
                    </div>
                {/each}
                
                <!-- Show/Hide button if there are more than 2 activities -->
                {#if discordData.activities.length > 2}
                    <button class="toggle-activities" on:click={toggleActivities}>
                        {#if showAllActivities}
                            <i class="bi bi-chevron-up"></i> Show Less
                        {:else}
                            <i class="bi bi-chevron-down"></i> Show All ({discordData.activities.length})
                        {/if}
                    </button>
                {/if}
            </div>
        {:else}
            <div class="no-activity">
                <i class="bi bi-hourglass"></i>
                <span>No current activity</span>
            </div>
        {/if}
    </div>
{:else}
    <div class="loading-card">
        <i class="bi bi-discord loading-icon"></i>
        <p>Loading Discord status...</p>
    </div>
{/if}

<style>
    /* Discord Card */
    .discord-card {
        background: rgba(0, 0, 0, 0.4);
        border-radius: 16px;
        padding: 1.25rem;
        color: white;
        backdrop-filter: blur(10px);
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .loading-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        padding: 2rem;
        text-align: center;
        color: white;
    }
    
    .loading-icon {
        font-size: 2rem;
        color: #5865F2;
        animation: pulse 1.5s infinite;
    }
    
    @keyframes pulse {
        0% { opacity: 0.6; }
        50% { opacity: 1; }
        100% { opacity: 0.6; }
    }

    /* Header Section */
    .discord-header {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .avatar-container {
        position: relative;
        width: 64px;
        height: 64px;
        flex-shrink: 0;
    }
    
    .avatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid rgba(255, 255, 255, 0.2);
    }
    
    .avatar-decoration {
        position: absolute;
        top: -15%;
        left: -15%;
        width: 130%;
        height: 130%;
        pointer-events: none;
    }
    
    .status-dot {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .status-icon {
        font-size: 8px;
        color: white;
    }
    
    .user-info {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    .discord-user h4 {
        margin: 0;
        font-weight: 600;
        font-size: 1.1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .discord-user p {
        margin: 0.1rem 0 0;
        font-size: 0.85rem;
        opacity: 0.7;
    }
    
    .clan-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba(78, 80, 88, 0.4);
        border-radius: 0.5rem;
        padding: 0.2rem 0.6rem;
        margin-top: 0.5rem;
        font-size: 0.8rem;
        font-weight: 600;
        width: fit-content;
    }
    
    .clan-icon {
        width: 16px;
        height: 16px;
    }
    
    /* Activities Section */
    .activities-container {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .activity-item {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 0.5rem;
        position: relative;
        /* overflow: hidden; */
    }
    
    .activity {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem;
    }
    
    .activity-icon {
        width: 40px;
        height: 40px;
        border-radius: 6px;
        overflow: hidden;
        flex-shrink: 0;
        background: rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .activity-icon img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .activity-icon i {
        font-size: 1.2rem;
        color: #ffffff;
    }
    
    .activity-details {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
        flex-grow: 1;
        overflow: hidden;
    }

   
    
    .activity-title {
        font-size: 0.75rem;
        opacity: 0.7;
    }
    
    .activity-name {
        font-weight: 600;
        font-size: 0.95rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    .activity-subtitle, .activity-state {
        font-size: 0.8rem;
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
    
    .toggle-activities {
        background: rgba(0, 0, 0, 0.2);
        border: none;
        color: #5865F2;
        padding: 0.5rem;
        border-radius: 0.5rem;
        font-size: 0.85rem;
        cursor: pointer;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        transition: background-color 0.2s;
    }
    
    .toggle-activities:hover {
        background: rgba(0, 0, 0, 0.3);
    }
    
    /* Special activity styles */
    .custom-status .activity-icon {
        background: rgba(88, 101, 242, 0.3);
    }
    
    .listening .activity-icon {
        background: rgba(29, 185, 84, 0.3);
    }
    
    .game .activity-icon {
        background: rgba(114, 137, 218, 0.3);
    }
</style>
