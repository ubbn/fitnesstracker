import React, {Component} from 'react'
import { View, Text, Button } from 'react-native'

import { getMetricMetaInfo } from '../utils/helpers'
import DateHeader from './DateHeader'
import Stepper from './Stepper'
import Slider from './Slider'

class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  }

  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric)

    this.setState(state => {
      const count = state[metric] + step
      return {
        ...state,
        [metric]: Math.min(count, max)
      }
    })
  }

  decrement = (metric) => {
    this.setState(state => {
      const count = state[metric] + getMetricMetaInfo(metric).step
      return {
        ...state,
        [metric]: Math.max(0, count)
      }
    })
  }

  slide = (metric, value) => {
    this.setState({
      [metric]: value
    })
  }

  render () {
    const metaInfo = getMetricMetaInfo()

    return (
      <View>
        <DateHeader date={(new Date().toLocaleDateString())} />
        {Object.keys(metaInfo).map(key => {
          const { getIcon, type, ...rest } = metaInfo[key]
          const value = this.state[key]

          return (
            <View key={key}>
              {getIcon()}
              {type === 'steppers'
                ? <Stepper
                    value={value}
                    onChange={(value) => this.slide(key, value)}
                    {...rest}
                  />
                : <Slider 
                    value={value}
                    onIncrement={() => this.increment(key)}
                    onDecrement={() => this.decrement(key)}
                    {...rest}
                  />
              }
            </View>
          )
        })}
      </View>
    )
  }
}

export default AddEntry