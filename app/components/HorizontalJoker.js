/**
 * HorizontalJoker
 * A horizontal card for React Native
 * Copyright (c) 2017 Kevin Hermawan
 */
import React, { Component } from 'react'
import { FlatList, View, Text, StyleSheet, Image } from 'react-native'
import PropTypes from 'prop-types'
import { Container, Content, List, H1, H2, H3, Footer, Thumbnail } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

const HorizontalJoker = (props) => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Thumbnail source={{uri: props.avatar}} />
        <View style={styles.cardHeader}>
          <H3 style={styles.textTitle}>{props.title}</H3>
          <View style={styles.viewLocation}>
            <Icon name='ios-person' color="#000000" size={15} />
            <Text style={styles.textLocation}>{props.person}</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardText}>
        <Text style={styles.text}>{props.description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    borderRadius: 5,
    width: 330,
    height: 130,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#ffffff',
  },
  content: {
    marginTop: '5%',
    marginLeft: 15,
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'row'
  },
  viewLocation: {
    flexDirection: 'row',
    marginTop: 3,
  },
  textTitle: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold'
  },
  textLocation: {
    color: '#000000',
    marginLeft: 5
  },
  text: {
    color: '#000000',
    fontSize: 10
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 15,
    paddingTop: 5,
    paddingBottom: 5
  },
  cardText: {
    marginTop: '3%',
    marginLeft: 20,
    backgroundColor: 'transparent',
  }
})

HorizontalJoker.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  key: PropTypes.string,
  items: PropTypes.node,
  horizontalIndicator: PropTypes.bool
}

HorizontalJoker.defaultProps = {
  horizontalIndicator: false
}

export default HorizontalJoker
