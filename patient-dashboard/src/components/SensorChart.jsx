import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'

// 注册 Chart.js 插件
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
)

export default function SensorChart({ data }) {
  const cards = [
    {
      title: 'Temperature (°C)',
      value: data.temperature,
      unit: '°C',
      color: '#60a5fa',
      min: 36.1,
      max: 37.2,
    },
    {
      title: 'Heart Rate (bpm)',
      value: data.heartRate,
      unit: 'bpm',
      color: '#34d399',
      min: 60,
      max: 100,
    },
    {
      title: 'Blood Pressure (mmHg)',
      value: {
        systolic: data.bloodPressureSystolic,
        diastolic: data.bloodPressureDiastolic,
      },
      unit: 'mmHg',
      color: '#f87171',
      min: { systolic: 90, diastolic: 60 }, // 血压的合理下限
      max: { systolic: 140, diastolic: 90 },
    },
    {
      title: 'Oxygen Saturation (HbO₂/(HbO₂ + Hb)%)',
      value: data.oxygenSaturation,
      unit: '%',
      color: '#fbbf24',
      min: 95,
      max: 100,
    },
    {
      title: 'Respiratory Rate (breaths/min)',
      value: data.respiratoryRate,
      unit: 'breaths/min',
      color: '#a78bfa',
      min: 12,
      max: 20,
    },
    {
      title: 'Blood Glucose (mmol/L)',
      value: data.bloodGlucose,
      unit: 'mmol/L',
      color: '#fb923c',
      min: 3.9,
      max: 6.1,
    },
  ]

  const getColor = (value, min, max) => {
    if (value > max) return 'red'
    if (value < min) return 'yellow'
    return '#3b82f6' //blue
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-1 bg-white shadow rounded">
      {cards.map((card, index) => {
        const isBloodPressure = card.title.includes('Blood Pressure')

        if (isBloodPressure) {
          // Specially deal with bloodpressure card
          const systolicValue = card.value.systolic
          const diastolicValue = card.value.diastolic

          const bloodPressureCharts = [
            { label: 'Systolic', value: systolicValue, min: card.min.systolic, max: card.max.systolic },
            { label: 'Diastolic', value: diastolicValue, min: card.min.diastolic, max: card.max.diastolic },
          ]

          return (
            <div key={index} className="p-4 border rounded shadow-sm relative">
              {/* tile */}
              <h4 className="text-lg font-semibold mb-0">{card.title}</h4>

              {/* Vertical legend in the upper right corner */}
              <div className="absolute top-9.2 right-2 flex flex-col items-start space-y-0 text-xs">
                <div className="flex items-right space-x-0.5">
                  <div className="w-3 h-2 bg-red-500 rounded-sm" />
                  <span className="text-xs">Above Normal</span>
                </div>
                <div className="flex items-right space-x-1">
                  <div className="w-3 h-2 bg-yellow-400 rounded-sm" />
                  <span className="text-xs">Below Normal</span>
                </div>
                <div className="flex items-right space-x-1">
                  <div className="w-3 h-2 bg-blue-500 rounded-sm" />
                  <span className="text-xs">Normal</span>
                </div>
              </div>

              {/* two small bars */}
              <div className="grid grid-cols-2.5 gap-0.5 mt-11">
                {bloodPressureCharts.map((item, subIndex) => {
                  const chartData = {
                    labels: [item.label],
                    datasets: [
                      {
                        label: item.label,
                        data: [item.value],
                        backgroundColor: getColor(item.value, item.min, item.max),
                        borderRadius: 8,
                        barThickness: 30,
                      },
                    ],
                  }

                  const options = {
                    responsive: true,
                    plugins: {
                      legend: { display: false },
                      tooltip: { enabled: true },
                      annotation: {
                        annotations: {
                          maxLine: {
                            type: 'line',
                            yMin: item.max,
                            yMax: item.max,
                            borderColor: 'red',
                            borderWidth: 2,
                            label: {
                              enabled: true,
                              content: `Max ${item.max}${card.unit}`,
                              position: 'start',
                            },
                          },
                          minLine: {
                            type: 'line',
                            yMin: item.min,
                            yMax: item.min,
                            borderColor: 'yellow',
                            borderWidth: 2,
                            label: {
                              enabled: true,
                              content: `Min ${item.min}${card.unit}`,
                              position: 'start',
                            },
                          },
                        },
                      },
                    },
                    scales: {
                      x: {
                        display: true,
                      },
                      y: {
                        title: {
                          display: true,
                          text: card.unit,
                        },
                        suggestedMin: 0,
                      },
                    },
                    layout: {
                      padding: {
                      top: 38, // 为图表区域顶部增加空隙
                      bottom: 0, // 为图表区域底部增加空隙
                      },
                    },
                  }

                  return (
                    <div key={subIndex} className="h-50 w-56" style={{ marginTop: '80px' }}>
                      <Bar data={chartData} options={options} />
                      {/* 下面显示数值 */}
                      <div className="text-center mt-3 text-sm text-gray-600">
                        {item.value} {card.unit}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        } else {
          // 其他普通卡片
          const chartData = {
            labels: [card.title],
            datasets: [
              {
                label: card.title,
                data: [card.value],
                backgroundColor: getColor(card.value, card.min, card.max),
                borderRadius: 8,
                barThickness: 30,
              },
            ],
          }

          const options = {
            responsive: true,
            plugins: {
              legend: { display: false },
              tooltip: { enabled: true },
              annotation: {
                annotations: {
                  maxLine: {
                    type: 'line',
                    yMin: card.max,
                    yMax: card.max,
                    borderColor: 'red',
                    borderWidth: 2,
                    label: {
                      enabled: true,
                      content: `Max: ${card.max}${card.unit}`,
                      position: 'start',
                    },
                  },
                  minLine: {
                    type: 'line',
                    yMin: card.min,
                    yMax: card.min,
                    borderColor: 'yellow',
                    borderWidth: 2,
                    label: {
                      enabled: true,
                      content: `Min: ${card.min}${card.unit}`,
                      position: 'start',
                    },
                  },
                },
              },
            },
            scales: {
              x: {
                display: false,
              },
              y: {
                title: {
                  display: true,
                  text: card.unit,
                },
                suggestedMin: 0,
              },
            },
            layout: {
              padding: {
                top: 0, // 为图表区域顶部增加空隙
                bottom: 0, // 为图表区域底部增加空隙
              },
            },
          }

          return (
            <div key={index} className="p-4 border rounded shadow-sm relative">
              <h4 className="text-lg font-semibold mb-4">{card.title}</h4>

              {/* Vertical legend in the upper right croner */}
              <div className="absolute top-13 right-2 flex flex-col items-start space-y-0 text-xs">
                <div className="flex items-right space-x-0.5">
                  <div className="w-3 h-2 bg-red-500 rounded-sm" />
                  <span className="text-xs">Above Normal</span>
                </div>
                <div className="flex items-right space-x-0.5">
                  <div className="w-3 h-2 bg-yellow-400 rounded-sm" />
                  <span className="text-xs">Below Normal</span>
                </div>
                <div className="flex items-right space-x-0.5">
                  <div className="w-3 h-2 bg-blue-500 rounded-sm" />
                  <span className="text-xs">Normal</span>
                </div>
              </div>

              <div className="h-50 w-30" style={{ marginTop: '200px' }}>
                <Bar data={chartData} options={options} />
              </div>

              {/* 显示数值 */}
              <div className="text-center mt-3 text-sm text-gray-600">
                {card.value} {card.unit}
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}

/*
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'

// 注册 Chart.js 插件
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
)

export default function SensorChart({ data }) {
  const cards = [
    {
      title: 'Temperature (°C)',
      value: data.temperature,
      unit: '°C',
      color: '#60a5fa',
      min: 36.1,
      max: 37.2,
    },
    {
      title: 'Heart Rate (bpm)',
      value: data.heartRate,
      unit: 'bpm',
      color: '#34d399',
      min: 60,
      max: 100,
    },
    {
      title: 'Blood Pressure (mmHg)',
      value: [data.bloodPressureSystolic, data.bloodPressureDiastolic],
      unit: 'mmHg',
      color: '#f87171',
      min: [0, 0], // 只检测最大
      max: [140, 90],
    },
    {
      title: 'Oxygen Saturation (%)',
      value: data.oxygenSaturation,
      unit: '%',
      color: '#fbbf24',
      min: 95,
      max: 100,
    },
    {
      title: 'Respiratory Rate (breaths/min)',
      value: data.respiratoryRate,
      unit: 'breaths/min',
      color: '#a78bfa',
      min: 12,
      max: 20,
    },
    {
      title: 'Blood Glucose (mmol/L)',
      value: data.bloodGlucose,
      unit: 'mmol/L',
      color: '#fb923c',
      min: 3.9,
      max: 6.1,
    },
  ]

  const getColor = (value, min, max, defaultColor) => {
    if (value > max) return 'red'
    if (value < min) return 'yellow'
    return defaultColor
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-white shadow rounded">
      {cards.map((card, index) => {
        const isBloodPressure = Array.isArray(card.value)
        const labels = isBloodPressure ? ['Systolic', 'Diastolic'] : [card.title]
        const values = isBloodPressure ? card.value : [card.value]

        const barColors = values.map((v, i) => {
          if (isBloodPressure) {
            const max = card.max[i]
            const min = card.min[i]
            return getColor(v, min, max, card.color)
          } else {
            return getColor(v, card.min, card.max, card.color)
          }
        })

        const chartData = {
          labels: labels,
          datasets: [
            {
              label: card.title,
              data: values,
              backgroundColor: barColors,
              borderRadius: 8,
              barThickness: 20,
            },
          ],
        }

        const yMin = isBloodPressure ? Math.min(...card.min) : card.min
        const yMax = isBloodPressure ? Math.max(...card.max) : card.max

        const annotations = {
          annotations: {},
        }

        if (isBloodPressure) {
          annotations.annotations = {
            systolicLine: {
              type: 'line',
              yMin: card.max[0],
              yMax: card.max[0],
              borderColor: 'red',
              borderWidth: 2,
              label: {
                enabled: true,
                content: `140 ${card.unit}`,
                position: 'start',
              },
            },
            diastolicLine: {
              type: 'line',
              yMin: card.max[1],
              yMax: card.max[1],
              borderColor: 'red',
              borderWidth: 2,
              label: {
                enabled: true,
                content: `90 ${card.unit}`,
                position: 'start',
              },
            },
            // 低值参考线
            systolicMinLine: {
              type: 'line',
              yMin: card.min[0],
              yMax: card.min[0],
              borderColor: 'yellow',
              borderWidth: 2,
              label: {
                enabled: false,
              },
            },
            diastolicMinLine: {
              type: 'line',
              yMin: card.min[1],
              yMax: card.min[1],
              borderColor: 'yellow',
              borderWidth: 2,
              label: {
                enabled: false,
              },
            },
          }
        } else {
          annotations.annotations = {
            maxLine: {
              type: 'line',
              yMin: card.max,
              yMax: card.max,
              borderColor: 'red',
              borderWidth: 2,
              label: {
                enabled: true,
                content: `Max: ${card.max}${card.unit}`,
                position: 'start',
              },
            },
            minLine: {
              type: 'line',
              yMin: card.min,
              yMax: card.min,
              borderColor: 'yellow',
              borderWidth: 2,
              label: {
                enabled: true,
                content: `Min: ${card.min}${card.unit}`,
                position: 'start',
              },
            },
          }
        }

        const options = {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: false },
            tooltip: { enabled: true },
            ...annotations,
          },
          scales: {
            x: {
              display: true,
              ticks: {
                callback: function (val, index) {
                  return labels[index] + (isBloodPressure ? ` (${card.unit})` : '')
                },
              },
            },
            y: {
              title: {
                display: true,
                text: card.unit,
              },
              suggestedMin: 0,
            },
          },
        }

        return (
          <div key={index} className="p-4 border rounded shadow-sm relative">
            <h4 className="text-lg font-semibold mb-2">{card.title}</h4>

            <div className="absolute top-2 right-2 flex items-center space-x-2 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-sm" />
                <span>Above Normal</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-yellow-400 rounded-sm" />
                <span>Below Normal</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3" style={{ backgroundColor: card.color }} />
                <span>Normal</span>
              </div>
            </div>

            <div className="h-40">
              <Bar data={chartData} options={options} />
            </div>

            {!isBloodPressure && (
              <div className="text-center mt-2 text-sm text-gray-600">
                {card.value} {card.unit}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
*/