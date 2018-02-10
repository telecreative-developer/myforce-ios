import React, { Component } from 'react'
import {  StyleSheet, View, TouchableOpacity, Dimensions, Alert} from 'react-native'
import { Content, Form, Item, Input, Label, Button, Text, Spinner } from 'native-base'
import { isEmpty, isEmail } from 'validator'
import { login } from '../actions/login'
import { connect } from 'react-redux'
import { setNavigate } from '../actions/processor'

class Login extends Component {
  constructor() {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  componentWillReceiveProps(props) {
    if(props.loading.condition === false && props.loading.process_on === 'login' && props.failed.condition === true) {
      Alert.alert('Login failed', props.failed.message)
    }else if(props.loading.condition === false && props.loading.process_on === 'fetch_user_with_email' && props.failed.condition === false) {
      this.props.setNavigate({link: 'Home', data: ''})
    }
  }

  renderButtons() {
    const { email, password } = this.state
    if(!isEmpty(email) && !isEmpty(password)) {
      return (
        <Button rounded style={styles.loginButton} onPress={() => this.handleLoginValidation()}>
          {(this.props.loading.condition === true && this.props.loading.process_on === 'login') ? (
            <Spinner color='#FFFFFF' />
          ) : (
            <Text>Login</Text>
          )}
        </Button>
      )
    }else{
      return (
        <Button rounded bordered style={styles.loginButton}>
          <Text>Login</Text>
        </Button>
      )
    }
  }

  handleLoginValidation() {
    const { email, password } = this.state
    if(!isEmail(email)) {
      Alert.alert('Login Failed', 'Please input valid email address')
    } else {
      this.props.login(email, password)
    }
  }

  render() {
    return (
      <Content style={styles.paddingForm}>
        <Text style={{fontWeight: '900', fontSize: 28, marginBottom: 20, color: '#2f2f4f', textAlign: 'center'}}>Login</Text>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input value={this.state.email} onChangeText={(email) => this.setState({email})} />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input secureTextEntry value={this.state.password} onChangeText={(password) => this.setState({password})} />
          </Item>
        </Form>
        <View style={styles.button}>
          {this.renderButtons()}
        </View>
        <View style={styles.textForgot}>
          <TouchableOpacity onPress={this.props.forgotPassword}>
            <Text>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    failed: state.failed
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password)),
    setNavigate: (navigate) => dispatch(setNavigate(navigate))
  }
}

const styles = StyleSheet.create({
  paddingForm: {
    paddingHorizontal: 150,
    paddingVertical: 100
  },
  button: {
    display: 'flex', 
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30
  },
  textForgot: {
    display: 'flex', 
    justifyContent: 'center', 
    flexDirection: 'row',
    marginTop: 20
  },
  loginButton: {
    paddingHorizontal: 40
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
