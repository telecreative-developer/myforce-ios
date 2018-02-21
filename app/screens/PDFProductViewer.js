import React from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Header, Text, Left, Body, Right, Container, Button } from 'native-base'
import Pdf from 'react-native-pdf'
import { url } from '../lib/server'

class PDFProductViewer extends React.Component {
  render() {
    const source = {
      uri: `${url}${this.props.navigation.state.params.file}`,
      cache:true
    }

    return (
      <Container>
        <Header style={styles.header}>
          <Left style={{ flexDirection: 'row' }}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" size={25} color="#000000" />
              <Text style={{ fontSize: 18, color: '#000000', marginLeft: 15 }}>
                Back
              </Text>
            </Button>
          </Left>
          <Body>
            <Text style={styles.title}>
              {this.props.navigation.state.params.title}
            </Text>
          </Body>
          <Right/>
        </Header>
        <Pdf fitWidth={true} scale={1.15} source={source} style={styles.pdf}/>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  title: {
		fontWeight: 'bold',
		fontSize: 16
	},
  pdf: {
    flex:1,
    width:Dimensions.get('window').width,
  },
  header: {
		height: 70
	},
})

export default PDFProductViewer