// components/SensorChart.jsx
import React, { useState, useEffect }  from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

// 注册 Chart.js 插件和功能
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function SensorChart({ data }) {
  // 模拟的传感器数据，用于构建图表
  const chartData = {
    labels: ['1 min', '2 min', '3 min'], // X 轴标签
    datasets: [
      {
        label: 'Temperature',
        data: [data.temperature, data.heartRate, data.bloodPressure], // Y 轴数据
        borderColor: '#8884d8',
        backgroundColor: 'rgba(136, 132, 216, 0.2)', // 背景色
        fill: true, // 是否填充颜色
      },
    ],
  }

  const options = {
    responsive: true,  // 让图表在不同屏幕上自适应
    plugins: {
      title: {
        display: true,
        text: 'Sensor Data Chart', // 图表标题
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Values',
        },
      },
    },
  }

  return (
    <div className="p-4 bg-white shadow rounded">
      <h3 className="text-xl font-semibold mb-3">Sensor Chart</h3>
      {/* 这里使用 react-chartjs-2 提供的 Chart 组件来渲染图表 */}
      <Line data={chartData} options={options} />
    </div>
  )
}
