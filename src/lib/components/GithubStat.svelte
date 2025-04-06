<script>
    import { onMount } from 'svelte';
    import LanguageStats from './LanguageStats.svelte';
    
    /**
     * @type {Object}
     */
    export let data = null;
    let loading = true;
    let error = null;
    
    async function fetchGitHubData() {
        try {
            if (data) {
                loading = false;
                return;
            }
            
            loading = true;
            const response = await fetch('https://konnn04.github.io/konnn04/generated/github_stats.json');
            
            if (!response.ok) {
                throw new Error(`Failed to fetch GitHub stats: ${response.status}`);
            }
            
            data = await response.json();

            // Tạo ngoại lệ cho các ngôn ngữ không cần thiết
            const except_languages = ['HTML', 'CSS', 'JSON', 'S'];
            data.languages = Object.fromEntries(
                Object.entries(data.languages).filter(([key]) => !except_languages.includes(key))
            );
            // Tính lại tỉ lệ phần trăm cho các ngôn ngữ
            const totalSize = Object.values(data.languages).reduce((sum, lang) => sum + lang.size, 0);
            for (const lang in data.languages) {
                data.languages[lang].prop = (data.languages[lang].size / totalSize) * 100;
            }
            
            loading = false;
        } catch (err) {
            console.error('Error fetching GitHub stats:', err);
            error = err.message;
            loading = false;
        }
    }
    
    function formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num;
    }
    
    onMount(() => {
        fetchGitHubData();
    });
</script>

<div class="github-stats-wrapper">
    {#if loading}
        <div class="loading-container">
            <i class="bi bi-github loading-icon"></i>
            <p>Loading GitHub stats...</p>
        </div>
    {:else if error}
        <div class="error-container">
            <i class="bi bi-exclamation-triangle"></i>
            <p>Failed to load GitHub stats: {error}</p>
        </div>
    {:else if data}
        <div class="github-profile">
            <!-- <div class="profile-header">
                <div class="github-icon">
                    <i class="bi bi-github"></i>
                </div>
                <div class="github-info">
                    <h3>{data.name}</h3>
                    <a href="https://github.com/{data.username}" target="_blank" class="github-username">@{data.username}</a>
                </div>
            </div> -->
            
            <div class="stats-grid">
                <div class="stats-list">
                    <div class="stat-item">
                        <span class="stat-key">
                            <i class="bi bi-star-fill"></i>Total Stars
                        </span>
                        <span class="stat-value">{formatNumber(data.stats.total_stars)}</span>
                    </div>
                    
                    <div class="stat-item">
                        <span><i class="bi bi-diagram-2"></i>Total Forks</span>
                        <span class="stat-value">{formatNumber(data.stats.total_forks)}</span>
                    </div>
                    
                    <div class="stat-item">
                        <span><i class="bi bi-code-slash"></i> Contributions</span>
                        <span class="stat-value">{formatNumber(data.stats.total_contributions)}</span>
                    </div>
                    
                    <div class="stat-item">
                        <span><i class="bi bi-star-fill"></i> Total Repositories</span>
                        <span class="stat-value">{formatNumber(data.stats.total_repositories)}</span>
                    </div>
                    
                    <div class="stat-item">
                        <span><i class="bi bi-eye"></i> Total Views</span>
                        <span class="stat-value">{formatNumber(data.stats.views)}</span>
                    </div>

                    <div class="stat-item">
                        <span><i class="bi bi-calendar"></i> Total Commits This Year</span>
                        <span class="stat-value">{formatNumber(data.stats.total_commits_this_year)}</span>
                    </div>
                    <hr>
                </div>
            </div>
            
            <div class="language-section">
                <LanguageStats languages={data.languages} />
            </div>
            
            <!-- <div class="github-footer">
                <a href="https://github.com/{data.username}" target="_blank" class="github-link">
                    <i class="bi bi-box-arrow-up-right"></i>
                    View GitHub Profile
                </a>
                <small class="update-time">Last updated: {new Date(data.generated_at).toLocaleString()}</small>
            </div> -->
        </div>
    {:else}
        <div class="empty-container">
            <i class="bi bi-github"></i>
            <p>No GitHub data available</p>
        </div>
    {/if}
</div>

<style>
    .github-stats-wrapper {
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
        color: white;
    }
    
    .loading-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        animation: spin 2s linear infinite;
        color: #f0f6fc;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .error-container i, .empty-container i {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        opacity: 0.7;
    }
    
    /* GitHub Profile Card */
    .github-profile {
        background: rgba(0, 0, 0, 0.4);
        border-radius: 16px;
        padding: 1.5rem;
        color: white;
        backdrop-filter: blur(10px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    }
    
    .profile-header {
        display: flex;
        align-items: center;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .github-icon {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: linear-gradient(135deg, #2b3137, #24292e);
        margin-right: 1rem;
        flex-shrink: 0;
    }
    
    .github-icon i {
        font-size: 1.8rem;
        color: white;
    }
    
    .github-info h3 {
        margin: 0;
        font-size: 1.4rem;
        font-weight: 600;
    }
    
    .github-username {
        color: #7d8590;
        text-decoration: none;
        font-size: 0.95rem;
    }
    
    .github-username:hover {
        color: #58a6ff;
        text-decoration: underline;
    }
    
    /* Stats Grid */
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 1rem;
    }
    
    .stat-item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 5px;
        font-size: 0.9rem;
    }
    
    /* Language Section */
    .language-section {
        margin-bottom: 1.5rem;
    }
    
    .language-section h4 {
        margin-top: 0;
        margin-bottom: 1rem;
        font-size: 1.1rem;
        color: #c9d1d9;
    }
    


    
</style>