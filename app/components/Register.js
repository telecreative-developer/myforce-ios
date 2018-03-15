import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import {
	Content,
	Form,
	Item,
	Input,
	Label,
	Button,
	Text,
	Picker,
	Spinner
} from 'native-base'
import { isEmpty, isEmail } from 'validator'
import { connect } from 'react-redux'
import { register } from '../actions/register'

class Register extends Component {
	constructor() {
		super()

		this.state = {
			first_name: '',
			last_name: '',
			username: '',
			gender: '1',
			email: '',
			address: '',
			point: 0,
			phone_number: '',
			bank_name: 'BCA',
			bank_name_other: false,
			rekening_number: '',
			password: '',
			confirm_password: ''
		}
	}

	componentWillReceiveProps(props) {
		if (
			props.loading.condition === false &&
			props.loading.process_on === 'register' &&
			props.failed.condition === true
		) {
			Alert.alert('Register failed', props.failed.message)
		} else if (
			props.loading.condition === false &&
			props.loading.process_on === 'register' &&
			props.failed.condition === false
		) {
			this.setState({
				first_name: '',
				last_name: '',
				username: '',
				gender: 1,
				email: '',
				address: '',
				point: 0,
				phone_number: '',
				bank_name: 'BCA',
				bank_name_other: false,
				rekening_number: '',
				password: '',
				confirm_password: ''
			})
			Alert.alert('Register Sucsess', 'Your data has been registered')
		}
	}

	handleRegisterValidation() {
		const {
			first_name,
			last_name,
			username,
			gender,
			email,
			address,
			point,
			phone_number,
			bank_name,
			rekening_number,
			password,
			confirm_password
		} = this.state
		if (!isEmail(email)) {
			Alert.alert('Register Failed', 'Please input valid email address')
		} else if (password !== confirm_password) {
			Alert.alert(
				'Register Failed',
				'Your password and confirmation password do not match'
			)
		} else {
			this.props.register({
				first_name,
				last_name,
				username,
				gender,
				email,
				address,
				point,
				phone: phone_number,
				bank_name,
				no_rek: rekening_number,
				password
			})
		}
	}

	renderButtons() {
		const {
			first_name,
			last_name,
			username,
			email,
			address,
			phone_number,
			bank_name,
			rekening_number,
			password,
			confirm_password
		} = this.state
		if (
			!isEmpty(first_name) &&
			!isEmpty(last_name) &&
			!isEmpty(username) &&
			!isEmpty(email) &&
			!isEmpty(address) &&
			!isEmpty(phone_number) &&
			!isEmpty(bank_name) &&
			!isEmpty(rekening_number) &&
			!isEmpty(password) &&
			!isEmpty(confirm_password)
		) {
			return (
				<Button
					rounded
					style={styles.registerButton}
					onPress={() => this.handleRegisterValidation()}>
					{this.props.loading.condition === true &&
					this.props.loading.process_on === 'register' ? (
						<Spinner color="#FFFFFF" />
					) : (
						<Text>Make an Account</Text>
					)}
				</Button>
			)
		} else {
			return (
				<Button rounded bordered style={styles.registerButton}>
					<Text>Make an Account</Text>
				</Button>
			)
		}
	}

	render() {
		return (
			<Content style={styles.paddingForm}>
				<Form>
					<Item floatingLabel>
						<Label>First Name</Label>
						<Input
							value={this.state.first_name}
							onChangeText={first_name => this.setState({ first_name })}
						/>
					</Item>
					<Item floatingLabel>
						<Label>Last Name</Label>
						<Input
							value={this.state.last_name}
							onChangeText={last_name => this.setState({ last_name })}
						/>
					</Item>
					<Item floatingLabel>
						<Label>Username</Label>
						<Input
							value={this.state.username}
							onChangeText={username => this.setState({ username })}
						/>
					</Item>
					<View style={styles.genderView}>
						<Text style={styles.gender}>Gender</Text>
						<Picker
							style={styles.picker}
							mode="dropdown"
							iosHeader="Gender"
							selectedValue={this.state.gender}
							onValueChange={gender => this.setState({ gender })}>
							<Item label="Male" value="1" />
							<Item label="Female" value="2" />
						</Picker>
					</View>
					<Item floatingLabel>
						<Label>Email</Label>
						<Input
							value={this.state.email}
							onChangeText={email => this.setState({ email })}
						/>
					</Item>
					<Item floatingLabel>
						<Label>Address</Label>
						<Input
							value={this.state.address}
							onChangeText={address => this.setState({ address })}
						/>
					</Item>
					<Item floatingLabel>
						<Label>Phone Number</Label>
						<Input
							value={this.state.phone_number}
							onChangeText={phone_number => this.setState({ phone_number })}
						/>
					</Item>
					{this.state.bank_name_other ? (
						<Item floatingLabel>
							<Label>Bank Name</Label>
							<Input
								value={this.state.bank_name}
								onChangeText={bank_name => this.setState({ bank_name })}
							/>
						</Item>
					) : (
						<View style={styles.genderView}>
							<Text style={styles.gender}>Bank Name</Text>
							<Picker
								style={styles.picker}
								mode="dropdown"
								iosHeader="Bank Name"
								selectedValue={this.state.bank_name}
								onValueChange={bank_name =>
									bank_name === 'Others'
										? this.setState({ bank_name: '', bank_name_other: true })
										: this.setState({ bank_name })
								}>
								<Item label="BCA" value="BCA" />
								<Item label="BNI" value="BNI" />
								<Item label="BRI" value="BRI" />
								<Item label="CIMB Niaga" value="CIMB Niaga" />
								<Item label="Mandiri" value="Mandiri" />
								<Item label="Others" value="Others" />
							</Picker>
						</View>
					)}
					<Item floatingLabel>
						<Label>Rekening Number</Label>
						<Input
							keyboardType="numeric"
							value={this.state.rekening_number}
							onChangeText={rekening_number =>
								this.setState({ rekening_number })
							}
						/>
					</Item>
					<Item floatingLabel last>
						<Label>Password</Label>
						<Input
							secureTextEntry
							value={this.state.password}
							onChangeText={password => this.setState({ password })}
						/>
					</Item>
					<Item floatingLabel>
						<Label>Confirm Password</Label>
						<Input
							secureTextEntry
							value={this.state.confirm_password}
							onChangeText={confirm_password =>
								this.setState({ confirm_password })
							}
						/>
					</Item>
				</Form>
				<View style={styles.button}>{this.renderButtons()}</View>
			</Content>
		)
	}
}

const mapStateToProps = state => ({
	loading: state.loading,
	failed: state.failed
})

const mapDispatchToProps = dispatch => ({
	register: data => dispatch(register(data))
})

const styles = StyleSheet.create({
	paddingForm: {
		paddingHorizontal: 150
	},
	button: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'row',
		marginTop: 30,
		marginBottom: 50
	},
	textForgot: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'row',
		marginTop: 25,
		marginBottom: 30
	},
	registerButton: {
		paddingHorizontal: 40
	},
	gender: {
		color: '#666',
		fontSize: 17
	},
	genderView: {
		marginLeft: 15,
		marginTop: 30
	},
	picker: {
		marginLeft: -15
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
