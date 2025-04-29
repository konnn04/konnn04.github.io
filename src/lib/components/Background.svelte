<script>
    import { onMount } from 'svelte';

    const defaultBg = "bg.jpg";
    const timeZone = +7; // GMT+7
    const specialDays = [
        {
            from: {
                day: 28,
                month: 4,
                hour: 0,
                minute: 0,
            },
            to: {
                day: 30,
                month: 4,
                hour: 23,
                minute: 59,
            },
            title: 'Ngày lễ 30/4',
            description: 'Kỷ niệm ngày Giải phóng miền Nam thống nhất đất nước',
            color: '#ff0000',
            bg: "30-4.jpg",
        }, {
            from: {
                day: 1,
                month: 5,
                hour: 0,
                minute: 0,
            },
            to: {
                day: 1,
                month: 5,
                hour: 23,
                minute: 59,
            },
            title: 'Ngày lễ 1/5',
            description: 'Kỷ niệm ngày Quốc tế Lao động',
            color: '#ff0000',
            bg: "1-5.jpg",
        }, {
            from: {
                day: 1,
                month: 9,
                hour: 0,
                minute: 0,
            },
            to: {
                day: 3,
                month: 9,
                hour: 23,
                minute: 59,
            },
            title: 'Ngày lễ Quốc khánh',
            description: 'Kỷ niệm ngày Quốc khánh Việt Nam',
            color: '#ff0000',
            bg: "2-9.jpg",
        }
    ];

    // Function to check if current date is a special day
    function getBackgroundImage() {
        // Get current date and time
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1; // getMonth() returns 0-11
        const currentDay = now.getDate();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        
        // Check if today is a special day
        for (const specialDay of specialDays) {
            const fromMonth = specialDay.from.month;
            const fromDay = specialDay.from.day;
            const fromHour = specialDay.from.hour;
            const fromMinute = specialDay.from.minute;
            
            const toMonth = specialDay.to.month;
            const toDay = specialDay.to.day;
            const toHour = specialDay.to.hour;
            const toMinute = specialDay.to.minute;
            
            // Check if current date and time is within special day range
            const isAfterStart = 
                (currentMonth > fromMonth) || 
                (currentMonth === fromMonth && currentDay > fromDay) ||
                (currentMonth === fromMonth && currentDay === fromDay && 
                   (currentHour > fromHour || 
                    (currentHour === fromHour && currentMinute >= fromMinute)));
            
            const isBeforeEnd = 
                (currentMonth < toMonth) || 
                (currentMonth === toMonth && currentDay < toDay) ||
                (currentMonth === toMonth && currentDay === toDay && 
                   (currentHour < toHour || 
                    (currentHour === toHour && currentMinute <= toMinute)));
            
            if (isAfterStart && isBeforeEnd) {
                return specialDay.bg;
            }
        }
        
        // If no special day matches, return default background
        return defaultBg;
    }
    
    // Get the background image path when component initializes
    const backgroundImage = getBackgroundImage();
    
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
    <img src={`./img/${backgroundImage}`} alt="Background" srcset="">
</div>