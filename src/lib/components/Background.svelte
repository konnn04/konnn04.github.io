<script>
    import { onMount } from 'svelte';

    onMount(() => {
        const bg = document.getElementById('bg');
        // Function to handle scroll event
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                bg.style.filter = 'blur(10px) brightness(0.5)';
            } else {
                bg.style.filter = 'blur(0px) brightness(1)';
            }
        });

        // Following mouse to move background      
        const moveBackground = (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            bg.style.transform = `translate(${x * 2}rem, ${y * 2}rem)`;
        };
        window.addEventListener('mousemove', moveBackground);
    });
</script>

<div id="bg" class="d-flex justify-content-center align-items-center">
    <img src="./img/bg.jpg" alt="Background" srcset="">
</div>