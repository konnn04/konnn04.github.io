<script>
  import { onMount } from 'svelte';

  let time = new Date();
  let timeZone = 7; // Default timezone +7 (Vietnam)
  let days = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
  let months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  let activeDayIndex = time.getDay();
  
  // Update time every second
  let interval;
  
  function updateTime() {
      time = new Date();
      activeDayIndex = time.getDay();
  }
  
  function formatTimeWithOffset(date, offset) {
      // Tạo bản sao của date
      const d = new Date(date);
      // Lấy timezone offset của local (in minutes)
      const localOffset = d.getTimezoneOffset() * 60000;
      // Tạo date mới với UTC + offset (convert to ms)
      const newDate = new Date(d.getTime() + localOffset + (3600000 * offset));
      return newDate;
  }

  function formatTime(date) {
      const adjustedTime = formatTimeWithOffset(date, timeZone);
      return {
          hours: String(adjustedTime.getHours()).padStart(2, '0'),
          minutes: String(adjustedTime.getMinutes()).padStart(2, '0'),
          seconds: String(adjustedTime.getSeconds()).padStart(2, '0'),
          day: adjustedTime.getDate(),
          month: months[adjustedTime.getMonth()],
          year: adjustedTime.getFullYear(),
          dayOfWeek: adjustedTime.getDay(),
      };
  }
  
  function updateTimeZone(increment) {
      timeZone += increment;
      if (timeZone > 14) timeZone = -12;
      if (timeZone < -12) timeZone = 14;
  }
  
  onMount(() => {
      interval = setInterval(updateTime, 1000);
      return () => clearInterval(interval);
  });
  
  $: formattedTime = formatTime(time);
</script>

<div class="modern-clock">
  <div class="clock-container">
      <div class="days-column">
          {#each days as day, index}
              <div class="day-item {index === formattedTime.dayOfWeek ? 'active' : ''}">
                  {day}
              </div>
          {/each}
      </div>
      
      <div class="time-display">
          <div class="digital-time">
              <span class="hours">{formattedTime.hours}</span>
              <span class="separator blink">:</span>
              <span class="minutes">{formattedTime.minutes}</span>
              <span class="separator blink">:</span>
              <span class="seconds">{formattedTime.seconds}</span>
          </div>
          
          <div class="date-display">
              <span class="date">{formattedTime.day}</span>
              <span class="month">{formattedTime.month}</span>
              <span class="year">{formattedTime.year}</span>
          </div>
          
          <div class="timezone-control">
              <button on:click={() => updateTimeZone(-1)} class="timezone-btn">-</button>
              <span class="timezone">
                  GMT{timeZone >= 0 ? '+' : ''}{timeZone}
              </span>
              <button on:click={() => updateTimeZone(1)} class="timezone-btn">+</button>
          </div>
      </div>
  </div>
</div>

<style>
  .modern-clock {
      font-family: 'Inter', 'Roboto', sans-serif;
      color: white;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 16px;
      padding: 25px;
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      width: 100%;
      overflow: hidden;
  }

  .clock-container {
      display: flex;
      align-items: stretch;
  }
  
  /* Days column */
  .days-column {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-right: 20px;
      margin-right: 20px;
      border-right: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .day-item {
      padding: 3px 10px;
      font-weight: 600;
      font-size: 14px;
      opacity: 0.6;
      border-radius: 6px;
      text-align: center;
      transition: all 0.3s ease;
  }
  
  .day-item.active {
      background: linear-gradient(135deg, #1f84ff, #94dbff);
      opacity: 1;
      box-shadow: 0 2px 10px rgba(93, 38, 193, 0.4);
      transform: scale(1.05);
  }
  
  /* Time display */
  .time-display {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
  }
  
  .digital-time {
      font-size: 3.2rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      font-variant-numeric: tabular-nums;
  }
  
  .separator {
      margin: 0 5px;
  }
  
  .seconds {
      font-size: 2.2rem;
      opacity: 0.8;
  }
  
  .blink {
      animation: blink 1s infinite;
  }
  
  @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
  }
  
  .date-display {
      font-size: 1.2rem;
      margin-bottom: 15px;
      opacity: 0.9;
      font-weight: 500;
  }
  
  .date::after {
      content: " ";
  }
  
  .month::after {
      content: ", ";
  }
  
  /* Timezone control */
  .timezone-control {
      display: flex;
      align-items: center;
      margin-top: auto;
  }
  
  .timezone {
      font-size: 1rem;
      font-weight: 500;
      padding: 0 15px;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.1);
      padding: 5px 15px;
  }
  
  .timezone-btn {
      background: rgba(255, 255, 255, 0.15);
      border: none;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      color: white;
      font-weight: bold;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 8px;
      transition: all 0.2s ease;
  }
  
  .timezone-btn:hover {
      background: rgba(255, 255, 255, 0.3);
  }
  
  .timezone-btn:active {
      transform: scale(0.95);
  }
  
  /* Media Query for Responsive Design */
  @media (max-width: 768px) {
      .clock-container {
          flex-direction: column;
      }
      
      .days-column {
          flex-direction: row;
          padding-right: 0;
          margin-right: 0;
          border-right: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          padding-bottom: 15px;
          margin-bottom: 15px;
      }
      
      .day-item {
          padding: 10px;
          font-size: 12px;
      }
      
      .digital-time {
          font-size: 2.5rem;
      }
      
      .seconds {
          font-size: 1.8rem;
      }
  }
</style>