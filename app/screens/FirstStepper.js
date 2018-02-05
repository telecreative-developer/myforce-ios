import React, { Component } from 'react'
import { Dimensions, StyleSheet, ImageBackground, View, TouchableOpacity, Image } from 'react-native'
import { Container,
Text,
Header,
Left,
Button,
H3 } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'
import bg from '../assets/images/meeting.jpg'

const { width, height } = Dimensions.get('window')

export default class FirstStepper extends Component {
  render() {
    const { navigate, goBack } = this.props.navigation
    return (
      <Container>
        <Header hasTabs style={styles.header}>
          <Left style={styles.backHeader}>
            <Button transparent onPress={() => goBack()}>
              <Icon name="ios-arrow-back" size={25} color="#ffffff" />
              <Text style={{fontSize: 18, color: '#ffffff'}}>Back</Text>
            </Button>
          </Left>
        </Header>
        <View style={styles.newsWrapper}>
          <View style={styles.newsDirection}>
            <View style={styles.titleFlex}>
              <H3 style={styles.newsTitle}>Latest News</H3>
            </View>
            <TouchableOpacity style={styles.iconFlex}>
              <Icon style={styles.closeIcon} name="ios-close-circle-outline" size={20} color={'#ffffff'} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.newsText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. when an unknown printer took a galley of type and scrambled it.</Text>
            <TouchableOpacity>
              <Text style={styles.readMore}>Read More</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.contentWrapper}>  
          <Image source={bg} style={styles.cardImage} />
          <View style={styles.titleView}>
            <Text style={styles.title}>DEVELOP CRITERIA</Text>
            <Text style={styles.description}>Lorem Ipsum is simply dummy text of the printing.</Text>
          </View>
          <TouchableOpacity 
            style={styles.centerButton} 
            onPress={() => navigate('QuestionPage')}>
            <LinearGradient 
              colors={['#20E6CD', '#2D38F9']} 
              style={styles.linearGradient}>
              <Text style={styles.buttonText}>GO!</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0
  },
  contentWrapper: {
    alignItems: 'center',
    flex: 1,
    zIndex: -20,
    backgroundColor: '#000000'
  },
  cardImage: {
    width: '100%',
    height: '100%',
    opacity: 0.5
  },
  titleView: {
    position: 'absolute', 
    zIndex: 2,
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor:'transparent',
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: '#ffffff',
    fontStyle: 'italic',
  },
  description: {
    fontSize: 14,
    color: '#ffffff',
    marginTop: 10
  },
  buttonText: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: '#000000',
    fontWeight: '800',
    fontStyle: 'italic',
    fontSize: 24
  },
  linearGradient: {
    flex: 1,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center'
  },
  centerButton: {
    width: 100,
    height: 100,
    borderRadius: 100,
    bottom: height / 3,
    zIndex: 30,
  },
  newsWrapper: {
    width: '100%',
    height: height / 8,
    backgroundColor: '#2d3ad2',
    paddingLeft: 40,
    paddingRight: 40,
    display: 'flex',
    justifyContent: 'center',
    top: height / 15,
    zIndex: 0,
    position: 'absolute'
  },
  newsTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  closeIcon: {
    textAlign: 'right',
  },
  newsText: {
    fontSize: 12,
    color: '#ffffff',
    textAlign: 'left',
    marginBottom: 10
  },
  readMore: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'right'
  },
  newsDirection: {
    display: 'flex', 
    flexDirection: 'row',
    marginBottom: 10
  },
  titleFlex: {
    display: 'flex', 
    justifyContent: 'flex-start'
  },
  iconFlex: {
    flex: 1, 
    display: 'flex', 
    justifyContent: 'flex-end'
  },
  backHeader: {
    flexDirection: 'row'
  }
})