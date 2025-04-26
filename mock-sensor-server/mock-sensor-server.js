// mock-sensor-server.js

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

console.log('Mock sensor WebSocket server is running on ws://localhost:8080');

// 生成一组随机的传感器数据
function generateSensorData() {
  return {
    temperature: (36 + Math.random() * 2).toFixed(1), // 36°C - 38°C
    heartRate: Math.floor(60 + Math.random() * 40),    // 60 - 100 bpm
    bloodPressure: {
      systolic: Math.floor(100 + Math.random() * 30),   // 100 - 130 mmHg
      diastolic: Math.floor(60 + Math.random() * 20),   // 60 - 80 mmHg
    },
    oxygenSaturation: Math.floor(95 + Math.random() * 5), // 95% - 100%
    respiratoryRate: Math.floor(12 + Math.random() * 8),  // 12 - 20 breaths/min
    bloodGlucose: (Math.floor(Math.random() * 71) + 20) / 10, // 2.0 ≤ x < 9.0 mg/dL
    timestamp: new Date().toISOString(), // 发送一个时间戳（方便前端处理）
  };
}

// 每次有客户端连接
wss.on('connection', (ws) => {
  console.log('Client connected');

  // 每3秒钟发送一次新的随机数据
  const interval = setInterval(() => {
    const sensorData = generateSensorData();
    ws.send(JSON.stringify(sensorData)); // 发送给前端
  }, 3000);

  // 客户端断开时，清除定时器
  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});
