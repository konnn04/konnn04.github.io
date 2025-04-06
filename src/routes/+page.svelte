<script>
    import { onMount } from "svelte";
    import "animate.css";

    import Header from "$lib/components/Header.svelte";
    import Background from "$lib/components/Background.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import Home from "$lib/components/Home.svelte";
    import Dashboard from "$lib/components/Dashboard.svelte";
    import Projects from "$lib/components/Projects.svelte";
    import Contact from "$lib/components/Contact.svelte";
    import Loading from "$lib/components/Loading.svelte";

    let headerVisible = false;
    function randomAnimation() {
        const animations = [
            "animate__fadeIn",
            "animate__zoomInLeft",
            "animate__zoomInUp",
            "animate__slideInLeft",
            "animate__slideInRight",
            "animate__slideInLeft",
            "animate__rotateInDownLeft",
            "animate__flipInY",
        ];
        return animations[Math.floor(Math.random() * animations.length)];
    }

    onMount(() => {

        // Function to handle scroll event
        window.addEventListener("scroll", () => {
            // Check if the user has scrolled down more than 300 pixels
            headerVisible = window.scrollY > 300;
        });

        setTimeout(() => {
            const wowElements = document.querySelectorAll(".wow");
            wowElements.forEach((element) => {
                if (element.classList.contains("not-random")) return;
                const randomClass = randomAnimation();
                element.classList.add(randomClass);
            });
            // Initialize WOW.js with options
            const wow = new WOW({
                boxClass: "wow",
                animateClass: "animate__animated",
                offset: 0,
                mobile: true,
                live: true,
                callback: function (box) {
                    console.log(
                        "WOW: animating <" + box.tagName.toLowerCase() + ">",
                    );
                },
            });
            wow.init(); // Initialize WOW.js
            wow.sync(); // Sync animations
            wow.start(); // Start WOW.js
        }, 1000);
    });
</script>
<Loading />
<Header {headerVisible} />

<Background />

<Home />

<main>
    <Dashboard />
    <Projects />
    <Contact />
</main>

<Footer />


