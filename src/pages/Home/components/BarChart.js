// 柱状图
// 功能代码，把可变部分抽象成 props 参数
import * as echarts from 'echarts'; 
import { useEffect, useRef } from 'react';

const BarChart = () => {
  const chartRef = useRef(null)
  useEffect(() => {
    // 保证 dom 可用，才进行图表渲染
    const chartDom = chartRef.current
    const myChart = echarts.init(chartDom);
    
    
    const option = {
     title: {
       text: '三大框架满意度'
     },
      xAxis: {
        type: 'category',
        data: ['Vue', 'React', 'Angular']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    };
    
    option && myChart.setOption(option);
 })
 return <div ref={chartRef} style={{width: '500px', height: '400px'}} ></div>
}

export default BarChart