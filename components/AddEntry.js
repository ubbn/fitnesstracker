import React, {Component} from 'react'
import { 
  View, 
  Text, 
  TouchableOpacity
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { connect } from 'react-redux'

import { getMetricMetaInfo, timeToString, getDailyReminderValue } from '../utils/helpers'
import { submitEntry, removeEntry } from '../utils/api'
import DateHeader from './DateHeader'
import UdaStepper from './UdaStepper'
import UdaSlider from './UdaSlider'
import TextButton from './TextButton'
import { addEntry } from '../actions'

function SubmitBtn({ onPress }){
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>SUBMIT</Text>
    </TouchableOpacity>
  )
}

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

  submit = () => {
    const key = timeToString()
    const entry = this.state

    // access Redux
    console.log(this.props)
    console.log(key)
    console.log(entry)

    this.props.dispath(addEntry({
      [key]: entry
    }))

    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0      
    })

    // Navigate

    // Save to db
    submitEntry({key, entry})

    // Clean local notifications

  }

  reset = () => {
    const key = timeToString()

    // Update redux
    this.props.dispath(addEntry({
      [key]: getDailyReminderValue()
    }))

    // Route to HOME

    // Update to db
    removeEntry(key)
  }

  render () {
    const metaInfo = getMetricMetaInfo()

    if (this.props.alreadyLogged) {
      return (
        <View>
          <Ionicons 
            name="ios-happy-outline"
            size={100}
          />
          <Text>You alread logged your information to today</Text>
          <TextButton onPress={this.reset}>
            Reset
          </TextButton>
        </View>
      )
    }

    return (
      <View>
        <DateHeader date={(new Date().toLocaleDateString())} />
        <Text>{JSON.stringify(this.state)}</Text>
        {Object.keys(metaInfo).map(key => {
          const { getIcon, type, ...rest } = metaInfo[key]
          const value = this.state[key]

          return (
            <View key={key}>
              {getIcon()}
              {type === 'slider'
                ? <UdaSlider 
                    value={value}
                    onChange={(value) => this.slide(key, value)}
                    {...rest}
                  />
                : <UdaStepper
                    value={value}
                    onIncrement={() => this.increment(key)}
                    onDecrement={() => this.decrement(key)}
                    {...rest}
                  />
              }
            </View>
          )
        })}
        <SubmitBtn onPress={this.submit}/>
      </View>
    )
  }
}

function mapStateToProps(state){
  const key = timeToString()

  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  }
}

export default connect(mapStateToProps)(AddEntry)