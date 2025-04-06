<script>
    import { onMount } from 'svelte';
    import profile from '../../data/profile.json';
    import Clock from './Clock.svelte';
    import Discord from './Discord.svelte';
    import Weather from './Weather.svelte';
    import DiscordServer from './DiscordServer.svelte';
    import GithubStat from './GithubStat.svelte';

    let currentTime = new Date();
</script>

<div class="container my-5">
    <div class="row g-4">
        <!-- Social Media Links -->
        <div class="col-12">
            <div class="social-links-container d-flex flex-wrap justify-content-center gap-4">
                <div class="social-link github wow">
                    <a href="{profile.socials.github.link}" target="_blank" class="d-flex flex-column align-items-center">
                        <i class="bi bi-github"></i>
                        <span>{profile.socials.github.username}</span>
                    </a>
                </div>
                
                <div class="social-link discord wow">
                    <a href="{profile.socials.discord.link}" target="_blank" class="d-flex flex-column align-items-center">
                        <i class="bi bi-discord"></i>
                        <span>{profile.socials.discord.username}</span>
                    </a>
                </div>
                
                <div class="social-link facebook wow">
                    <a href="{profile.socials.facebook.link}" target="_blank" class="d-flex flex-column align-items-center">
                        <i class="bi bi-facebook"></i>
                        <span>{profile.socials.facebook.username}</span>
                    </a>
                </div>
                
                <div class="social-link youtube wow">
                    <a href="{profile.socials.youtube.link}" target="_blank" class="d-flex flex-column align-items-center">
                        <i class="bi bi-youtube"></i>
                        <span>{profile.socials.youtube.username}</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
    
    <div class="masonry-container">   
        <!-- Discord Server -->
        <div class="masonry-item wow">
            <div class="dashboard-card">
                <DiscordServer />
            </div>
        </div>

        <!-- Discord Status -->
        <div class="masonry-item wow">
            <div class="dashboard-card">
                <Discord />
            </div>
        </div>

        <!-- Clock -->
        <div class="masonry-item wow">
            <div class="dashboard-card">
                <Clock />
            </div>
        </div>

        <!-- Github Stats chiếm -->
        <div class="masonry-item wow" >
            <div class="dashboard-card">
                <GithubStat/>
            </div>
        </div>

        <!-- Weather -->
        <div class="masonry-item wow">
            <div class="dashboard-card loading-card">
                <Weather isShowDetails={true} isShowForecast={false} />
            </div>
        </div>

        <!-- Visitor Count -->
        <div class="masonry-item wow">
            <div class="dashboard-card visitor-card">
                <img src="https://count.getloli.com/get/@konnn04?theme=rule34" alt="Visitor Count" />
            </div>
        </div>
    </div>
</div>

<style>
    .gradient-text {
        background: linear-gradient(to right, #9c27b0, #3f51b5);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        display: inline-block;
    }

    /* Social Links */
    .social-links-container {
        margin-bottom: 2rem;
    }

    .social-link {
        padding: 1.2rem;
        border-radius: 1rem;
        min-width: 120px;
        transition: transform 0.2s, box-shadow 0.3s;
        backdrop-filter: blur(5px);
        background-color: rgba(255, 255, 255, 0.1);
    }

    .social-link:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }

    .social-link a {
        text-decoration: none;
        color: white;
    }

    .social-link i {
        font-size: 2rem;
        margin-bottom: 0.5rem;
    }

    .github:hover {
        background-color: rgba(51, 51, 51, 0.7);
    }

    .discord:hover {
        background-color: rgba(88, 101, 242, 0.7);
    }

    .facebook:hover {
        background-color: rgba(59, 89, 152, 0.7);
    }

    .youtube:hover {
        background-color: rgba(255, 0, 0, 0.7);
    }

    /* Dashboard Cards */
    .dashboard-card {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 1rem;
        padding: 1.5rem;
        transition: transform 0.3s, box-shadow 0.3s;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        height: 100%;
    }

    .dashboard-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    }


    /* Visitor Count */
    .visitor-card {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

    .visitor-card img {
        max-width: 100%;
        border-radius: 0.5rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    /* Loading Card */
    .loading-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        height: 100%;
        min-height: 150px;
    }

    .loading-card i {
        font-size: 2rem;
        animation: spin 2s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    /* Masonry layout */
    .masonry-container {
        columns: 3 300px;
        column-gap: 1.5rem;
        width: 100%;
        margin: 1.5rem 0;
    }
    
    .masonry-item {
        break-inside: avoid;
        margin-bottom: 1.5rem;
        display: inline-block;
        width: 100%;
    }
    
    .social-links-wrapper {
        column-span: all;
    }
    
    /* Điều chỉnh cho màn hình nhỏ */
    @media (min-width: 1200px) {
        .masonry-container {
            columns: 3;
        }
    }
    
    @media (max-width: 1199px) and (min-width: 768px) {
        .masonry-container {
            columns: 2;
        }
    }
    
    @media (max-width: 767px) {
        .masonry-container {
            columns: 1;
        }
    }
</style>