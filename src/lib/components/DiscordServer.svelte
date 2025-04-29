<script>
    import { onMount } from 'svelte';
    
    export let guildId = '994243227764936744';
    let serverData = null;
    let isLoading = true;
    let error = null;
    
    // Format timestamp to a readable date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
    
    // Convert verification level to readable text
    function getVerificationLevel(level) {
        const levels = {
            0: 'None',
            1: 'Low',
            2: 'Medium',
            3: 'High',
            4: 'Highest'
        };
        return levels[level] || 'Unknown';
    }

    async function fetchServerData() {
        try {
            isLoading = true;
            const response = await fetch(`https://coloured-robinet-konnn-28196a57.koyeb.app/guilds?guildId=${guildId}`);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch server data: ${response.status}`);
            }
            
            serverData = await response.json();
        } catch (err) {
            error = err.message;
            console.error('Error fetching Discord server data:', err);
        } finally {
            isLoading = false;
        }
    }

    onMount(() => {
        fetchServerData();
        // Refresh data every 5 minutes
        const interval = setInterval(fetchServerData, 5 * 60 * 1000);
        return () => clearInterval(interval);
    });
</script>

<div class="discord-server-widget">
    {#if isLoading}
        <div class="loading-container">
            <i class="bi bi-discord loading-icon"></i>
            <p>Loading server information...</p>
        </div>
    {:else if error}
        <div class="error-container">
            <i class="bi bi-exclamation-triangle"></i>
            <p>Failed to load server: {error}</p>
        </div>
    {:else if serverData}
        <div class="discord-server">
            <div class="server-header">
                {#if serverData.iconURL}
                    <img src={serverData.iconURL} alt="Server Icon" class="server-icon" />
                {:else}
                    <div class="server-icon-placeholder">
                        <i class="bi bi-discord"></i>
                    </div>
                {/if}
                
                <div class="server-title">
                    <h3>{serverData.name}</h3>
                    <div class="server-badge">
                        <i class="bi bi-people-fill"></i>
                        <span>{serverData.memberCount} members</span>
                    </div>
                </div>
            </div>
            
            <div class="server-details">
                <div class="detail-item">
                    <i class="bi bi-person-fill"></i>
                    <div>
                        <span class="detail-label">Role</span>
                        <span class="detail-value">Riikon 👑 </span>
                    </div>
                </div>

                <div class="detail-item">
                    <i class="bi bi-calendar-event"></i>
                    <div>
                        <span class="detail-label">Created on</span>
                        <span class="detail-value">{formatDate(serverData.createdAt)}</span>
                    </div>
                </div>
                
                <!-- <div class="detail-item">
                    <i class="bi bi-shield-lock"></i>
                    <div>
                        <span class="detail-label">Verification</span>
                        <span class="detail-value">{getVerificationLevel(serverData.verificationLevel)}</span>
                    </div>
                </div> -->
            </div>
            
            <div class="server-footer">
                {#if serverData.invite}
                    <a href={`https://discord.gg/${serverData.invite}`} target="_blank" class="join-button">
                        <i class="bi bi-box-arrow-in-right"></i>
                        Join Server
                    </a>
                {:else}
                    <!-- <button class="refresh-button" on:click={fetchServerData}>
                        <i class="bi bi-arrow-clockwise"></i>
                        Refresh
                    </button> -->
                {/if}
            </div>
        </div>
    {:else}
        <div class="empty-container">
            <i class="bi bi-discord"></i>
            <p>No server information available</p>
        </div>
    {/if}
</div>

<style>
    .discord-server-widget {
        width: 100%;
        font-family: 'Inter', 'Roboto', sans-serif;
    }
    
    .loading-container, .error-container, .empty-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        text-align: center;
    }
    
    .loading-icon {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: #5865F2;
        animation: pulse 1.5s infinite;
    }
    
    @keyframes pulse {
        0% { opacity: 0.6; }
        50% { opacity: 1; }
        100% { opacity: 0.6; }
    }
    
    .discord-server {
        background: rgba(0, 0, 0, 0.4);
        border-radius: 16px;
        padding: 1.5rem;
        color: white;
        backdrop-filter: blur(10px);
    }
    
    .server-header {
        display: flex;
        align-items: center;
        margin-bottom: 1.5rem;
    }
    
    .server-icon {
        width: 64px;
        height: 64px;
        border-radius: 16px;
        margin-right: 1rem;
        border: 2px solid rgba(255, 255, 255, 0.2);
        object-fit: cover;
    }
    
    .server-icon-placeholder {
        width: 64px;
        height: 64px;
        border-radius: 16px;
        margin-right: 1rem;
        background: rgba(88, 101, 242, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        color: #5865F2;
    }
    
    .server-title h3 {
        margin: 0;
        font-size: 1.4rem;
        font-weight: 600;
        margin-bottom: 0.3rem;
    }
    
    .server-badge {
        display: inline-flex;
        align-items: center;
        background: rgba(255, 255, 255, 0.1);
        padding: 0.3rem 0.8rem;
        border-radius: 1rem;
        font-size: 0.85rem;
    }
    
    .server-badge i {
        margin-right: 0.4rem;
        color: #ffffff;
    }
    
    .server-details {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 12px;
        padding: 1rem;
        margin-bottom: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .detail-item {
        display: flex;
        align-items: center;
    }
    
    .detail-item i {
        font-size: 1.2rem;
        margin-right: 1rem;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        color: #ffffff;
    }
    
    .detail-label {
        display: block;
        font-size: 0.8rem;
        opacity: 0.7;
    }
    
    .detail-value {
        display: block;
        font-weight: 500;
    }
    
    .server-footer {
        display: flex;
        justify-content: center;
    }
    
    .join-button, .refresh-button {
        background: #ffffff;
        color: white;
        border: none;
        padding: 0.7rem 1.5rem;
        border-radius: 4px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        text-decoration: none;
        font-size: 0.95rem;
        transition: all 0.2s ease;
    }
    
    .join-button:hover, .refresh-button:hover {
        background: #ffffff;
        transform: translateY(-2px);
    }
    
    .refresh-button {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .refresh-button:hover {
        background: rgba(255, 255, 255, 0.3);
    }
    
    /* Error styling */
    .error-container i {
        font-size: 2rem;
        color: #ED4245;
        margin-bottom: 1rem;
    }
    
    .empty-container i {
        font-size: 2rem;
        color: #ffffff;
        margin-bottom: 1rem;
        opacity: 0.7;
    }
</style>