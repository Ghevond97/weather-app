import React from 'react';
import { Group } from '@vx/group';
import { scaleTime, scaleLinear } from '@vx/scale';
import { AreaClosed } from '@vx/shape';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { GradientOrangeRed } from '@vx/gradient';
import { extent, max } from 'd3-array';

const WeatherGraph = props => {
  if (!props.weatherData) return null;

  let data = props.weatherData.list.map(el => {
    return { date: el.dt * 1000, temp: el.main.temp };
  });

  const width = 750;
  const height = 400;

  const xStock = d => {
    return new Date(d.date);
  };
  const yStock = d => {
    return d.temp;
  };

  // Bounds
  const margin = {
    top: 60,
    bottom: 60,
    left: 80,
    right: 80,
  };
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, xStock),
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [0, max(data, yStock)],
  });

  return (
    <div className="graph-area">
      <svg width={width} height={height}>
        <GradientOrangeRed id="OrangeRed" />
        <Group top={margin.top} left={margin.left}>
          <AreaClosed
            data={data}
            x={d => xScale(xStock(d))}
            y={d => yScale(yStock(d))}
            yScale={yScale}
            fill={`url(#OrangeRed)`}
            stroke={''}
          />

          <AxisLeft
            scale={yScale}
            top={0}
            left={0}
            label={'Weather in °C'}
            stroke={'#1b1a1e'}
            tickTextFill={'#1b1a1e'}
            tickStroke="orange"
            tickLabelProps={(value, index) => ({
              fill: 'orange',
              fontSize: 13,
              letterSpacing: 2,
              textAnchor: 'end',
              dy: '0.33em',
            })}
          />

          <AxisBottom
            scale={xScale}
            top={yMax}
            label={'Week Days'}
            stroke={'#1b1a1e'}
            tickTextFill={'#1b1a1e'}
            tickTextFill={'#1b1a1e'}
            tickStroke="orange"
            tickLabelProps={(value, index) => ({
              fill: 'orange',
              fontSize: 13,
              letterSpacing: 2,
              textAnchor: 'end',
              dy: '0.33em',
            })}
          />
        </Group>
      </svg>
    </div>
  );
};

export default WeatherGraph;
