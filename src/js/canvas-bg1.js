const canvas = document.getElementById('bg1');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const balls = [];

    function randomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    function createBall() {
      const ball = {
        x: canvas.width/2,
        y: canvas.height/2,
        radius: 200,
        color: randomColor(),
        speed: {
          x: (Math.random() - 0.5) * 20, // Tốc độ ngẫu nhiên tuyến tính
          y: (Math.random() - 0.5) * 20,
        },
      };
      balls.push(ball);
    }

    function moveBalls() {
        balls.forEach(ball => {
        ball.x += ball.speed.x;
        ball.y += ball.speed.y;

        // Đảm bảo bóng không vượt ra khỏi ranh giới của canvas
        if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
          ball.speed.x *= -1;
          changeColors(ball)
        }
        if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
          ball.speed.y *= -1;
          changeColors(ball)
        }

      });
    }

    function drawBalls() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      balls.forEach(ball => {
        // Tạo gradient mờ cho bóng
        const gradient = ctx.createRadialGradient(ball.x, ball.y, 0, ball.x, ball.y, ball.radius);
        gradient.addColorStop(0, ball.color);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();
      });
    }

    function changeColors(ball) {
    //   balls.forEach(ball => {
        ball.color = randomColor();
    //   });
    }

    function animate() {
      moveBalls();
      drawBalls();      
    }

    // Tạo các bóng từ đầu
    for (let i = 0; i < 3; i++) {
      createBall();
    }

    setInterval(()=>{
        animate()        
    },50)