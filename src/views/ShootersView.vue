<template>
  <div class="shooters-container">
    <div class="header">
      <button class="burger-menu" @click="toggleMenu">☰</button>
      <h1><span class="app-icon">🔫</span> Shooter Timer</h1>
      <div class="menu-placeholder"></div>
    </div>

    <div class="menu" :class="{ open: menuOpen }">
      <div class="menu-content">
        <button class="menu-close" @click="toggleMenu">✕</button>

        <div class="menu-section">
          <h3>Add Shooter</h3>
          <input
            v-model="newShooter"
            type="text"
            class="menu-input"
            placeholder="Shooter name"
          />
          <button @click="addShooter" class="menu-button">Add Shooter</button>
        </div>

        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd" />

        <div class="menu-section">
          <h3>Full Reset</h3>
          <p style="font-size: 12px; color: #666; margin: 0 0 10px 0">
            Clear all shooters and times
          </p>
          <button @click="fullReset" class="menu-button danger">
            Full Reset (Clear All)
          </button>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="shooter-controls">
        <select v-model="selectedShooter" id="shooterSelect">
          <option value="">-- Select Shooter --</option>
          <option v-for="shooter in shooters" :key="shooter" :value="shooter">
            {{ shooter }}
          </option>
        </select>
        <input
          v-model.number="countdown"
          type="number"
          placeholder="Countdown (seconds)"
          min="1"
        />
      </div>

      <div>
        <button @click="startTimer" :disabled="isRunning">Start</button>
        <button @click="stopTimer" :disabled="!isRunning">Stop</button>
        <button @click="resetTimer">Reset</button>
      </div>

      <div id="timer">{{ timerDisplay }}</div>

      <h2>Leaderboard</h2>
      <div id="leaderboard">
        <table id="leaderboardTable">
          <thead>
            <tr>
              <th>Place</th>
              <th>Shooter</th>
              <th>Time (s)</th>
            </tr>
          </thead>
          <tbody id="leaderboardBody">
            <tr
              v-for="(attempt, index) in sortedAttempts"
              :key="index"
              :class="{ latest: attempt.isLatest }"
            >
              <td>{{ index + 1 }}.</td>
              <td>{{ attempt.shooter }}</td>
              <td>{{ attempt.time.toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Attempt {
  shooter: string;
  time: number;
  isLatest: boolean;
}

export default defineComponent({
  name: 'ShootersView',

  data() {
    return {
      menuOpen: false,
      shooters: [] as string[],
      selectedShooter: '',
      countdown: 3,
      newShooter: '',
      timerDisplay: '0.00',
      isRunning: false,
      startTime: 0,
      attempts: {} as { [key: string]: number[] },
      countdownInterval: null as NodeJS.Timeout | null,
      timerInterval: null as NodeJS.Timeout | null,
    };
  },

  computed: {
    sortedAttempts(): Attempt[] {
      const allAttempts: Attempt[] = [];

      for (const [shooter, times] of Object.entries(this.attempts)) {
        times.forEach((time, index) => {
          allAttempts.push({
            shooter,
            time,
            isLatest: index === times.length - 1,
          });
        });
      }

      allAttempts.sort((a, b) => a.time - b.time);
      return allAttempts;
    },
  },

  mounted() {
    this.loadFromLocalStorage();
  },

  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },

    closeMenu() {
      this.menuOpen = false;
    },

    loadFromLocalStorage() {
      const savedShooters = localStorage.getItem('shooters');
      const savedAttempts = localStorage.getItem('shooterAttempts');

      if (savedShooters) {
        this.shooters = JSON.parse(savedShooters);
      }

      if (savedAttempts) {
        this.attempts = JSON.parse(savedAttempts);
      }
    },

    saveToLocalStorage() {
      localStorage.setItem('shooters', JSON.stringify(this.shooters));
      localStorage.setItem('shooterAttempts', JSON.stringify(this.attempts));
    },

    addShooter() {
      const trimmedName = this.newShooter.trim();

      if (trimmedName && !this.shooters.includes(trimmedName)) {
        this.shooters.push(trimmedName);
        this.newShooter = '';
        this.saveToLocalStorage();
        this.closeMenu();
      }
    },

    startTimer() {
      if (!this.isRunning && this.selectedShooter && this.countdown > 0) {
        this.isRunning = true;
        this.startCountdown();
      }
    },

    startCountdown() {
      let remaining = this.countdown;
      this.timerDisplay = remaining.toFixed(2);

      this.countdownInterval = setInterval(() => {
        remaining -= 0.01;
        this.timerDisplay = remaining.toFixed(2);

        if (remaining <= 0) {
          if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
          }
          this.playBeep();
          this.beginTimer();
        }
      }, 10);
    },

    beginTimer() {
      this.startTime = Date.now();

      this.timerInterval = setInterval(() => {
        const elapsed = (Date.now() - this.startTime) / 1000;
        this.timerDisplay = elapsed.toFixed(2);
      }, 10);
    },

    stopTimer() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }

      const elapsed = parseFloat(this.timerDisplay);

      if (this.selectedShooter) {
        if (!this.attempts[this.selectedShooter]) {
          this.attempts[this.selectedShooter] = [];
        }
        this.attempts[this.selectedShooter].push(elapsed);
        this.saveToLocalStorage();
      }

      this.isRunning = false;
    },

    resetTimer() {
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
      }

      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }

      this.timerDisplay = '0.00';
      this.isRunning = false;
    },

    fullReset() {
      if (confirm('Are you sure you want to clear all shooters and times?')) {
        localStorage.clear();
        this.shooters = [];
        this.attempts = {};
        this.selectedShooter = '';
        this.timerDisplay = '0.00';
        this.closeMenu();
        alert('All data has been cleared.');
      }
    },

    playBeep() {
      try {
        const audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sine' as OscillatorType;
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
        oscillator.connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
      } catch (e) {
        console.log('Could not play beep sound');
      }
    },
  },
});
</script>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  text-align: center;
  margin: 0;
  padding: 0;
  background-color: #f4f4f9;
}

.shooters-container {
  font-family: Arial, sans-serif;
  background-color: #f4f4f9;
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #333;
  color: white;
  padding: 15px 20px;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.burger-menu {
  background: none;
  border: none;
  color: white;
  font-size: 28px;
  cursor: pointer;
  padding: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header h1 {
  margin: 0;
  font-size: 24px;
  flex-grow: 1;
  margin-left: 10px;
}

.app-icon {
  font-size: 28px;
  margin-right: 8px;
  display: inline-block;
}

.menu-placeholder {
  width: 40px;
}

.menu {
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.menu.open {
  display: block;
}

.menu-content {
  position: absolute;
  left: 0;
  top: 0;
  width: 250px;
  height: 100%;
  background-color: white;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  padding: 20px 0;
  overflow-y: auto;
}

.menu-close {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  width: 100%;
  text-align: right;
  padding: 15px 20px;
  margin-bottom: 20px;
}

.menu-section {
  padding: 0 20px;
  margin-bottom: 20px;
  text-align: left;
}

.menu-section h3 {
  margin: 10px 0 15px 0;
  font-size: 16px;
  color: #333;
}

.menu-input {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

.menu-button {
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  background-color: #4caf50;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

.menu-button:disabled {
  background-color: #cccccc;
}

.menu-button.danger {
  background-color: #f44336;
}

.container {
  max-width: 500px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}

button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 5px;
  cursor: pointer;
  border-radius: 5px;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

input,
select {
  padding: 10px;
  margin: 10px 0;
  width: 80%;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

#timer {
  font-size: 48px;
  margin: 20px 0;
  font-weight: bold;
}

#leaderboard {
  margin-top: 20px;
  text-align: left;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.latest {
  background-color: #ffeb3b;
}

.shooter-controls {
  margin-bottom: 15px;
}

@media (max-width: 600px) {
  .container {
    margin-top: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 15px;
  }

  body {
    padding: 0;
  }

  input,
  select {
    width: 90%;
  }

  button {
    padding: 10px 20px;
    font-size: 14px;
    margin: 8px 3px;
  }

  #timer {
    font-size: 40px;
  }
}
</style>
