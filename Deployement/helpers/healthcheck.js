// This is a helper script to prevent render scaling down the dyno between 6am and 8pm.
// start command: node healthcheck.js
const http = require('http')

const url = 'http://localhost:3000/healthcheck'
//https://linky-backend.onrender.com

setInterval(() => {
  const currentTime = new Date().getTime();
  const startTime = new Date(currentTime).setHours(6, 0, 0, 0)
  const endTime = new Date(currentTime).setHours(20, 0, 0, 0)
  
  if (currentTime >= startTime && currentTime <= endTime) {
    http.get(url, (res) => {
      if (res.statusCode === 200 || res.statusCode === 201) {
        console.log('API is available')
      } else {
        console.log('API is unavailable')
      }
    })
  }
}, 2 * 60 * 1000);  // 2 minutes checking
