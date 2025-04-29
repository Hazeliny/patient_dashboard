const port = process.env.PORT || 8080;
const server = require('http').createServer();
const WebSocket = require('ws');

//const wss = new WebSocket.Server({ port: 8080 });
const wss = new WebSocket.Server({ server });

// Generate a random set of sensor data
function generateSensorData() {
  return {
    temperature: (30 + Math.random() * 12).toFixed(1), // 30°C - 42°C
    heartRate: Math.floor(38 + Math.random() * 83),    // 38 - 120 bpm
    bloodPressure: {
      systolic: Math.floor(70 + Math.random() * 81),   // 70 - 150 mmHg
      diastolic: Math.floor(50 + Math.random() * 51),   // 50 - 100 mmHg
    },
    oxygenSaturation: Math.floor(80 + Math.random() * 21), // 80% - 100%
    respiratoryRate: Math.floor(8 + Math.random() * 18),  // 8 - 25 breaths/min
    bloodGlucose: (Math.floor(Math.random() * 71) + 20) / 10, // 2.0 ≤ x < 9.0 mg/dL
    timestamp: new Date().toISOString(), // Send a timestamp (for frontend processing)
  };
}

// Everytime a client connects
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send new random sensor data every 3sec
  const interval = setInterval(() => {
    const sensorData = generateSensorData();
    ws.send(JSON.stringify(sensorData)); // Send to frontend
  }, 3000);

  // Clear the timer when the client disconnects
  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

server.listen(port, () => {
    console.log(`Mock sensor WebSocket server is running on port ${port}`);
});
