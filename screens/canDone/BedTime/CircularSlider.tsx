import React from 'react';
import {View} from 'react-native';
import Animated, { useAnimatedProps, useDerivedValue } from 'react-native-reanimated';
import { polar2Canvas } from 'react-native-redash';
import Svg, {Defs, Mask, Path} from 'react-native-svg';
import { absoluteDuration, CENTER, PI, R, SIZE, STROKE } from './Contants';
import Cursor from './Cursor';
import Gesture from './Gesture';
import Quadrant from './Quadrant';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface CircularSliderProps {
  start: Animated.SharedValue<number>;
  end: Animated.SharedValue<number>;
};

const CircularSlider: React.FC<CircularSliderProps> = props => {
  const {start, end} = props;
  const startPos = useDerivedValue(() => {
    return polar2Canvas({
      theta: start.value,
      radius: R
    }, CENTER);
  });
  const endPos = useDerivedValue(() => {
    return polar2Canvas({
      theta: end.value,
      radius: R
    }, CENTER);
  });

  const animatedProps = useAnimatedProps(() => {
    const duration = absoluteDuration(start.value, end.value);
    return {
      d: `M ${startPos.value.x} ${startPos.value.y} A ${R} ${R} 0 ${duration < PI ? '0' : '1'} 0 ${endPos.value.x} ${endPos.value.y}`,
    }
  })

  return ( 
    <View>
      <Svg width={SIZE} height={SIZE}>
        <Defs>
          <Mask id="mask">
            <AnimatedPath
              animatedProps={animatedProps}
              stroke={'cyan'}
              strokeWidth={STROKE}
            />
          </Mask>
        </Defs>
        <Quadrant />
        <Cursor pos={startPos} />
        <Cursor pos={endPos} />
      </Svg>
      <Gesture
        {...{start, startPos, end, endPos}}
      />
    </View>
  )
};

export default CircularSlider;
