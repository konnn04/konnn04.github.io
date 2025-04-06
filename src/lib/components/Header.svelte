<script>
    export let headerVisible = false;
</script>

<header class="{headerVisible ? '' : 'hide'}">
    <div class="container d-flex justify-content-between align-items-center">
        <div class="h-l d-flex align-items-center gap-2">
            <img src="./img/logo.png" alt="" srcset="" width="50" height="50">
            <h1 class="mb-0">Konnn04</h1>
        </div>
        <nav>
            <a href="#home">Home</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
        </nav>
    </div>
</header>

<style>
    @media (max-width: 768px) {
        h1{
            display: none;
        }
    }
</style>