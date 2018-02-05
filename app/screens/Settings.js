import React, { Component } from 'react'
import { StyleSheet, TouchableHighlight } from 'react-native'
import { Container,
Header,
Left,
Body,
Right,
Text,
Button,
Content,
List,
ListItem } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

export default class Settings extends Component {
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
            <Text style={styles.title}>SETTINGS</Text>
          </Body>
          <Right>
            <TouchableHighlight onPress={() => navigate('Notifications')}>
              <Icon name="ios-notifications" size={25}></Icon>
            </TouchableHighlight>
          </Right>
        </Header>
        <Content style={styles.container}>
          <List>
            <ListItem icon onPress={() => navigate('EditProfile')}>
              <Left>
                <Icon name="md-create" size={25} />
              </Left>
              <Body>
                <Text>Edit Profile</Text>
              </Body>
              <TouchableHighlight>
                <Right>
                  <Icon name="ios-arrow-forward" size={25}/>
                </Right>
              </TouchableHighlight>
            </ListItem>
            <ListItem icon onPress={() => navigate('ChangePassword')}>
              <Left>
                <Icon name="ios-lock" size={25} />
              </Left>
              <Body>
                <Text>Change Password</Text>
              </Body>
              <Right>
                <Icon name="ios-arrow-forward" size={25}/>
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="ios-log-out" size={25} />
              </Left>
              <Body>
                <Text>Logout</Text>
              </Body>
              <Right>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff'
  },
  header: {
    height: 70,
  },
  backHeader: {
    flexDirection: 'row'
  },
  back: {
    fontSize: 18, 
    color: '#000000'
  },
  title: {
    fontWeight: 'bold'
  },
})