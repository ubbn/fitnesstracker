import React, {Component} from 'react'
import { 
  View, 
  Text, 
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { connect } from 'react-redux'

import { getMetricMetaInfo, timeToString, getDailyReminderValue } from '../utils/helpers'
import { submitEntry, removeEntry } from '../utils/api'
import { purple, white } from '../utils/colors'
import DateHeader from './DateHeader'
import UdaStepper from './UdaStepper'
import UdaSlider from './UdaSlider'
import TextButton from './TextButton'
import { addEntry } from '../actions'

function SubmitBtn({ onPress }){
  return (
    <TouchableOpacity onPress={onPress}
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitButton}>
      <Text style={styles.submitBtnText}>SUBMIT</Text>
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
    this.props.dispatch(addEntry({
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
    this.props.dispatch(addEntry({
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
        <View style={styles.center}>
          <Ionicons 
            name={Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy'}
            size={100}
          />
          <Text>You alread logged your information to today</Text>
          <TextButton style={{padding: 10}} onPress={this.reset}>
            Reset
          </TextButton>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <DateHeader date={(new Date().toLocaleDateString())} />
        {Object.keys(metaInfo).map(key => {
          const { getIcon, type, ...rest } = metaInfo[key]
          const value = this.state[key]

          return (
            <View key={key} style={styles.row}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
})

function mapStateToProps(state){
  const key = timeToString()

  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  }
}

export default connect(mapStateToProps)(AddEntry)