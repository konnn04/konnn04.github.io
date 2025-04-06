<script>
    import { onMount } from "svelte";
    import Fork from "$lib/icons/Fork.svelte";

    /**
     * @type {any[]}
     */
    let pinned_repositories = [];
    let isLoading = true;
    let error = null;

    onMount(async () => {
        try {
            isLoading = true;
            const response = await fetch(
                "https://konnn04.is-a.dev/konnn04/generated/github_stats.json",
            );
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.status}`);
            }
            const data = await response.json();
            pinned_repositories = data.pinned_repositories;
        } catch (err) {
            error = err.message;
            console.error("Error fetching data:", err);
        } finally {
            isLoading = false;
        }
    });

    const languageColor = {
        JavaScript: "#f1e05a",
        Python: "#3572A5",
        Java: "#b07219",
        "C++": "#f34b7d",
        HTML: "#e44b23",
        CSS: "#563d7c",
        PHP: "#4F5D95",
        Ruby: "#701516",
        Go: "#00ADD8",
        TypeScript: "#2b7489",
        Svelte: "#ff3e00",
        "C#": "#178600",
        Shell: "#89e051",
        Dart: "#00B4AB",
    };
</script>

<section id="projects" class="container" style="padding-top: 100px;">
    <div class="section-header text-center mb-5">
        <h2 class="section-title wow">My Projects</h2>
        <p class="section-description wow">
            Here are some of my pinned repositories from GitHub. You can find
            more on my profile.
        </p>
    </div>

    {#if isLoading}
        <div class="loading-container">
            <i class="bi bi-github loading-icon"></i>
            <p>Loading repositories...</p>
        </div>
    {:else if error}
        <div class="error-container">
            <i class="bi bi-exclamation-triangle"></i>
            <p>Failed to load GitHub repositories: {error}</p>
        </div>
    {:else if pinned_repositories.length === 0}
        <div class="empty-container">
            <i class="bi bi-folder"></i>
            <p>No repositories found</p>
        </div>
    {:else}
        <div class="projects-grid">
            {#each pinned_repositories as project}
                <div class="project-card wow">
                    <div class="project-body ">
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="project-title mb-2"
                        >
                            <i class="bi bi-github me-2"></i>
                            {project.name}
                        </a>
                        <p class="project-description">
                            {project.description || "No description available"}
                        </p>
                    </div>
                    <div class="project-footer">
                        <div class="project-language">
                            <span
                                class="language-dot"
                                style="background-color: {languageColor[
                                    project.language.name
                                ] || '#808080'}"
                            ></span>
                            <span class="language-name"
                                >{project.language.name}</span
                            >
                        </div>
                        <div class="project-stats">
                            <div class="stat-item" title="Stars">
                                <i class="bi bi-star-fill"></i>
                                <span>{project.stars}</span>
                            </div>
                            <div class="stat-item" title="Forks">
                                <i class="bi bi-diagram-2"></i>
                                <span>{project.forks}</span>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</section>

<style>
    .section-title {
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 1rem;
        /* background: linear-gradient(45deg, #00c4ef, #2e70ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text; */
        color: var(--text-color);
    }

    .section-description {
        font-size: 1.1rem;
        opacity: 0.8;
        max-width: 700px;
        margin: 0 auto;
    }

    .loading-container,
    .error-container,
    .empty-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 3rem;
        text-align: center;
        color: var(--text-color);
        background: rgba(0, 0, 0, 0.2);
        border-radius: 1rem;
    }

    .loading-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
        animation: spin 2s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .error-container i,
    .empty-container i {
        font-size: 3rem;
        margin-bottom: 1rem;
        opacity: 0.7;
    }

    .projects-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(300px, 1fr));
        gap: 1.5rem;
        width: 100%;
    }

    .project-card {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 1rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .project-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    }

    .project-header {
        padding: 1.2rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .project-title {
        font-size: 1.2rem;
        font-weight: 600;
        color: #439bff;
        text-decoration: none;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: color 0.2s ease;
    }

    .project-title:hover {
        color: #2e70ff;
    }

    .project-body {
        padding: 1.2rem;
        flex-grow: 1;
    }

    .project-description {
        opacity: 0.9;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        line-height: 1.5;
    }

    .project-footer {
        padding: 1rem 1.2rem;
        background: rgba(0, 0, 0, 0.2);
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: none;
    }

    .project-language {
        display: flex;
        align-items: center;
    }

    .language-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin-right: 6px;
    }

    .language-name {
        font-size: 0.85rem;
        opacity: 0.85;
    }

    .project-stats {
        display: flex;
        gap: 1rem;
    }

    .stat-item {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 0.85rem;
        opacity: 0.85;
    }

    @media (max-width: 950px) {
        .projects-grid {
            grid-template-columns: repeat(2, minmax(250px, 1fr));
        }
    }

    @media (max-width: 480px) {
        .projects-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
