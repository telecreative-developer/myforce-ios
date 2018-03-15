import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Pie } from 'react-native-pathjs-charts'

export default class PieCharts extends Component {
  render() {
    let data = [{
      "name": "Target",
      "percentage": this.props.target
    }, {
      "name": "Completed",
      "percentage": this.props.completed
    }]

    let dataTarget = [{
      "name": "Target",
      "percentage": this.props.target
    }]
  
    let options = {
      margin: {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20
      },
      width: 350,
      height: 350,
      color: '#2980B9',
      r: 0,
      R: 0,
      legendPosition: 'topLeft',
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 16,
        fontWeight: true,
        color: '#ECF0F1'
      }
    }
    return (
      <View style={styles.container}>
        <Pie data={this.props.completed === 0 ? dataTarget : data}
          options={options}
          accessorKey="percentage"
          margin={{top: 20, left: 20, right: 20, bottom: 20}}
          color="#2980B9"
          pallete={
            [
              {'r':25,'g':99,'b':201},
              {'r':24,'g':175,'b':35},
              {'r':190,'g':31,'b':69},
              {'r':100,'g':36,'b':199},
              {'r':214,'g':207,'b':32},
              {'r':198,'g':84,'b':45}
            ]
          }
          r={0}
          R={150}
          legendPosition="topLeft"
          label={{
            fontFamily: 'Arial',
            fontSize: 16,
            fontWeight: true,
            color: '#ECF0F1'
          }}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
})