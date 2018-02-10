import React, { Component } from 'react'
import { StyleSheet, Dimensions, View, Image } from 'react-native' 
import { Container,
Content,
Header,
Left,
Body,
Right,
Text,
Button,
Form,
Item,
Label,
Input,
Picker } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import image from '../assets/images/add-user.png'
import LinearGradient from 'react-native-linear-gradient'

const { height, width } = Dimensions.get('window')

export default class AddCustomer extends Component {
  constructor() {
    super()

    this.state = {
      picName: "Nando Reza Pratama",
    }
  }
  render() {
    return (
      <Container style={{backgroundColor:'#ffffff'}}>
        <Header style={styles.header}>
          <Left style={styles.backHeader}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" size={25} color="#000000" />
              <Text style={styles.back}>Back</Text>
            </Button>
          </Left>
          <Body>
            <Text style={styles.title}>ADD NEW CUSTOMER</Text>
          </Body>
          <Right>
            <Button transparent badge onPress={() => navigate('Cart')}>
              <Icon name="ios-notifications" size={25} />
            </Button>
          </Right>
        </Header>
        <Content style={styles.content}>
          <View style={styles.image}>
            <Image source={image}/>
          </View>
          <Form>
            <View style={{alignItems: 'center', display: 'flex'}}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>Customer Data</Text>
            </View>
            <Item stackedLabel style={styles.itemForm}>
              <Label>Customer Name</Label>
              <Input />
            </Item>
            <Item stackedLabel style={styles.itemForm}>
              <Label>Address</Label>
              <Input multiline={true} style={{paddingVertical: 15}}/>
            </Item>
            <View style={styles.pickerView}>
              <Text style={styles.pickerText}>PIC Name</Text>
              <Picker
                style={styles.picker}
                mode="dropdown"
                iosHeader="PIC Name"
                selectedValue={this.state.picName}
                onValueChange={(picName) => (picName === 'Others') ? this.setState({picName: '', picName_other: true}) : this.setState({picName})}>
                <Item label="Nando Reza Pratama" value="Nando Reza Pratama" />
                <Item label="Kevon Hermawan" value="Kevin Hermawan" />
                <Item label="Rendi Simamora" value="Rendi Simamora" />
                <Item label="Yonathan" value="Yonathan" />
                <Item label="Dicky" value="Dicky" />
                <Item label="Others" value="Others" />
              </Picker>
            </View>
            <View style={{alignItems: 'center', display: 'flex', marginTop: 30}}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>Create New PIC</Text>
            </View>
            <Item stackedLabel style={styles.itemForm}>
              <Label>New PIC Name</Label>
              <Input />
            </Item>
            <Item stackedLabel style={styles.itemForm}>
              <Label>PIC Phone Number</Label>
              <Input />
            </Item>
            <Item stackedLabel style={styles.itemForm}>
              <Label>PIC Email</Label>
              <Input />
            </Item>
            <Item stackedLabel style={styles.itemForm}>
              <Label>PIC Address</Label>
              <Input multiline={true} style={{paddingVertical: 15}}/>
            </Item>
          </Form>
          <View style={styles.buttonView}>
            <Button primary style={styles.buttonBack} onPress={() => this.props.navigation.navigate('Activity')}>
              <Text style={styles.buttonText}>BACK</Text>
            </Button>
            <Button primary style={styles.button} onPress={() => this.props.navigation.navigate('AddCustomerPreview')}>
              <LinearGradient 
                colors={['#20E6CD', '#2D38F9']} 
                style={styles.linearGradient}>
                <Text style={styles.buttonText}>PREVIEW</Text>
              </LinearGradient>
            </Button>
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  backHeader: {
    flexDirection: 'row'
  },
  header: {
    height: 70,
  },
  title: {
    fontWeight: 'bold'
  },
  back: {
    fontSize: 18, 
    color: '#000000'
  },
  content: {
    paddingHorizontal: 30
  },
  image: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30
  },
  itemForm: {
    marginTop: 20
  },
  pickerView: {
    marginLeft: 15,
    marginTop: 30,
  },
  picker: {
    marginLeft:-15,
  },
  pickerText: {
    color: '#666',
    fontSize: 17
  },
  buttonView: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginVertical: 40
  },
  button: {
    width: '30%', 
    paddingTop: 0, 
    paddingBottom: 0,
  },
  buttonText: {
    fontWeight: '900', 
    fontSize: 16, 
    fontStyle: 'italic', 
    color: 'black'
  },
  buttonBack: {
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 0,
    width: '30%',
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#e8649d'
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
})