<script>
    import { onMount } from "svelte";
   

    onMount(() => {
        // Hiệu ứng scroll cho logo
        const logo = document.getElementById("logo");
        const logoHeight = logo?.getBoundingClientRect().height || 0;
        const homeSection = document.getElementById("home");
        const nextSection = document.querySelector("#home + *");
        window.addEventListener("scroll", () => {
            const scrollY = window.scrollY;
            const nextSectionTop = nextSection?.offsetTop || 0;
            logo?.style.setProperty(
                "transform",
                `translateY(${Math.min(scrollY, nextSectionTop / 2 - 20)}px)`,
            );
        });

    
    });
</script>

<section
    id="home"
    style="min-height: 100vh;"
    class="d-flex justify-content-center align-items-center"
>
    <div style="width: 100%; max-width: 800px; text-align: center;" class="wow  animate__zoomInDown not-random">
        <object
            id="logo"
            type="image/svg+xml"
            data="./img/main.svg"
            style="width: 100%; height: auto; max-width: 800px; margin: 0 auto;"
            class="img-fluid"
            alt="Logo"
        ></object>
    </div>
</section>

<style>

</style>
