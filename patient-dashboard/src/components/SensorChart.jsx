import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'

// Register Chart.js plugin
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
        systolic: data.bloodPressure?.systolic,
        diastolic: data.bloodPressure?.diastolic,
      },
      unit: 'mmHg',
      color: '#f87171',
      min: { systolic: 90, diastolic: 60 }, // Reasonable lower limit of blood pressure
      max: { systolic: 140, diastolic: 90 }, // Reasonable upper limit of blood pressure
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-1 bg-gray-100 shadow rounded">
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
              {/* Tile */}
              <h4 className="text-lg font-semibold mb-0">{card.title}</h4>

              {/* Vertical legend in the upper right corner */}
              <div className="absolute top-9.2 right-2 flex flex-col items-start space-y-0 text-xs">
                <div className="flex items-right space-x-0.5">
                  <div className="w-3 h-2 bg-red-500 rounded-sm" />
                  <span className="text-xs">Above Normal</span>
                </div>
                <div className="flex items-right space-x-1">
                  <div className="w-3 h-2 bg-yellow-300 rounded-sm" />
                  <span className="text-xs">Below Normal</span>
                </div>
                <div className="flex items-right space-x-1">
                  <div className="w-3 h-2 bg-blue-500 rounded-sm" />
                  <span className="text-xs">Normal</span>
                </div>
              </div>

              {/* Two small bloodPressure bars */}
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
                        barThickness: 26,
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
                      top: 28, // Add space to the top of the chart area
                      bottom: 0, // Add space to the bottom of the chart area
                      left: -6, // Add space to the left of the chart area
                      },
                    },
                  }

                  return (
                    <div key={subIndex} className="h-50 w-56" style={{ marginTop: '30px' }}>
                      <Bar data={chartData} options={options} />
                      {/* Values shown below */}
                      <div className="text-center mt-1 text-sm text-gray-600">
                        {item.value} {card.unit}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        } else {
          // Handle all the cards except for bloodPressure card
          const chartData = {
            labels: [card.title],
            datasets: [
              {
                label: card.title,
                data: [card.value],
                backgroundColor: getColor(card.value, card.min, card.max),
                borderRadius: 8,
                barThickness: 26,
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
                top: 0,
                bottom: 0,
                left: -6,
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
                  <div className="w-3 h-2 bg-yellow-300 rounded-sm" />
                  <span className="text-xs">Below Normal</span>
                </div>
                <div className="flex items-right space-x-0.5">
                  <div className="w-3 h-2 bg-blue-500 rounded-sm" />
                  <span className="text-xs">Normal</span>
                </div>
              </div>

              <div className="h-50 w-30" style={{ marginTop: '120px' }}>
                <Bar data={chartData} options={options} />
              </div>

              {/* Data shown below */}
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
