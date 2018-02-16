import React, { Component } from 'react'
import { StyleSheet, Dimensions, FlatList, View } from 'react-native'
import { Header,
Left,
Button,
Text,
Body,
Right,
Content, 
Container,
Thumbnail,
List, 
ListItem } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import Timeline from 'react-native-timeline-listview'

const { width, height } = Dimensions.get('window')

export default class Calendar extends Component { 
  constructor() {
    super()

    this.data=[
      {time: '11 Maret 2018', title: 'Archery Training', description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',lineColor:'#009688'},
      {time: '8 Maret 2018', title: 'Play Badminton', description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',},
      {time: '28 Februari 2018', title: 'Lunch',},
      {time: '3 Februari 2018', title: 'Watch Soccer', description: 'Team sport played between two teams of eleven players with a spherical ball. ',lineColor:'#009688',},
      {time: '1 Februari 2018', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)',}
    ]
  }

  render() {
    const { navigate, goBack } = this.props.navigation
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left style={styles.backHeader}>
            <Button transparent onPress={() => goBack()}>
              <Icon name="ios-arrow-back" size={25} color="#000000" />
              <Text style={styles.back}>Back</Text>
            </Button>
          </Left>
          <Body>
            <Text style={styles.title}>EVENT CALENDAR</Text>
          </Body>
          <Right style={styles.newEvent}>
            <Button transparent style={{paddingRight: 0, marginRight: 0}} onPress={() => navigate('NewEvent')}>
              <Icon name="ios-add" size={25} color="#000000"/>
              <Text style={styles.new}>New Event</Text>
            </Button>
          </Right>
        </Header>
        <Content style={styles.content}>
        <Timeline
          timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', fontWeight: 'bold', padding:5, borderRadius:100}}
          descriptionStyle={{color:'gray'}}
          timeContainerStyle={{minWidth:150}}
          options={{
            removeClippedSubviews: false
          }}
          innerCircle={'dot'}
          data={this.data}
        />
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  header: {
    height: 70,
  },
  title: {
    fontWeight: 'bold'
  },
  content: {
    paddingRight: width / 6,
    paddingLeft: width / 6,
    paddingTop: height / 58,
    width: '100%',
    backgroundColor: 'transparent'
  },
  listItem: {
    padding: 15, 
  },
  notificationTextStyle: {
    fontWeight: 'bold'
  },
  backHeader: {
    flexDirection: 'row'
  },
  back:{
    fontSize: 18, 
    color: '#000000'
  },
  new: {
    fontSize: 16, 
    color: '#000000',
  }
})