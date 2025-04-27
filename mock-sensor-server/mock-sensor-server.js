const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

console.log('Mock sensor WebSocket server is running on ws://localhost:8080');

// 生成一组随机的传感器数据
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
