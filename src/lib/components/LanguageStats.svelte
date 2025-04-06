<script>
    /**
     * @type {Object}
     */
    export let languages = {};
    
    // Process languages to create sorted array for display
    $: sortedLanguages = Object.entries(languages)
        .map(([name, data]) => ({
            name,
            size: data.size,
            color: data.color,
            percentage: data.prop
        }))
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 8); // Limit to top 8 languages
    
    // Calculate total for the top languages
    $: totalSize = sortedLanguages.reduce((sum, lang) => sum + lang.size, 0);
    
    // Format percentage
    function formatPercentage(value) {
        return value.toFixed(1) + '%';
    }
</script>

<div class="language-stats">
    <div class="language-bar">
        {#each sortedLanguages as language}
            <div 
                class="language-segment" 
                style="width: {language.percentage}%; background-color: {language.color}"
                title="{language.name}: {formatPercentage(language.percentage)}"
            ></div>
        {/each}
    </div>
    
    <div class="language-list">
        {#each sortedLanguages as language}
            <div class="language-item">
                <div class="language-color" style="background-color: {language.color}"></div>
                <div class="language-name">{language.name}</div>
                <div class="language-percentage">{formatPercentage(language.percentage)}</div>
            </div>
        {/each}
    </div>
</div>

<style>
    .language-stats {
        width: 100%;
        
    }
    
    .language-bar {
        width: 100%;
        height: 10px;
        display: flex;
        border-radius: 5px;
        overflow: hidden;
        margin-bottom: 1rem;
    }
    
    .language-segment {
        height: 100%;
    }
    
    .language-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 0.75rem 1rem;
    }
    
    .language-item {
        display: flex;
        align-items: center;
        font-size: 0.85rem;
    }
    
    .language-color {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin-right: 0.5rem;
        flex-shrink: 0;
    }
    
    .language-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 0.5rem;
    }
    
    .language-percentage {
        opacity: 0.8;
        font-size: 0.75rem;
        margin-left: auto;
    }
    
    @media (max-width: 480px) {
        .language-list {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>