import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import MetricCard from './MetricCard'
import { white } from '../utils/helpers'

class EntryDetail extends Component {
  static navigationOptions = ({navigation}) => {
    const { entryId } = navigation.state.params
    
    const year = entryId.slice(0,4)
    const month = entryId.slice(5,7)
    const day = entryId.slice(8)

    return {
      title: `${day}/${month}/${year}`
    }
  }

  render() {
    const { metrics } = this.props

    return (
      <View styke={styles.container}>
        <MetricCard metrics={metrics} />
        <Text>Entry Detail - {JSON.stringify(this.props.navigation.state.params.entryId)}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
})

const mapStateToProps = (state, {navigation}) => {
  const { entryId } = navigation.state.params

  return {
    entryId,
    metrics: state[entryId]
  }
}

export default connect(mapStateToProps)(EntryDetail)