import React, { Component } from 'react'
import {
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	AsyncStorage,
	View,
	Alert
} from 'react-native'
import {
	Container,
	Header,
	Left,
	Body,
	Right,
	Text,
	Button,
	Content,
	Form,
	Label,
	Input,
	Item,
	Picker,
	Spinner
} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import { isEmpty, isEmail } from 'validator'
import { updateUser } from '../actions/users'
import { login } from '../actions/login'

const { width, height } = Dimensions.get('window')

class EditProfile extends Component {
	constructor() {
		super()

		this.state = {
			first_name: '',
			last_name: '',
			username: '',
			gender: '',
			email: '',
			id_region: '',
			address: '',
			phone: ''
		}
	}

	componentWillMount() {
		this.setState({
			first_name: this.props.sessionPersistance.first_name,
			last_name: this.props.sessionPersistance.last_name,
			username: this.props.sessionPersistance.username,
			gender: this.props.sessionPersistance.gender,
			email: this.props.sessionPersistance.email,
			id_region: this.props.sessionPersistance.id_region,
			address: this.props.sessionPersistance.address,
			phone: this.props.sessionPersistance.phone
		})
	}

	componentWillReceiveProps(props) {
		if (
			props.loading.condition === false &&
			props.loading.process_on === 'UPDATE_USER' &&
			props.failed.condition === true &&
			props.failed.process_on === 'UPDATE_USER'
		) {
			Alert.alert('Failed update profile', props.failed.message)
		} else if (
			props.loading.condition === false &&
			props.loading.process_on === 'UPDATE_USER' &&
			props.success.condition === true &&
			props.success.process_on === 'UPDATE_USER'
		) {
			props.navigation.goBack()
			Alert.alert('Profile updated', 'Your profile has been updated')
		}
	}

	async componentWillUnmount() {
		const response = await AsyncStorage.getItem('session')
		const data = await JSON.parse(response)
		await this.props.login(data.email, data.password)
	}

	renderButton() {
		const {
			first_name,
			last_name,
			username,
			email,
			address,
			phone
		} = this.state
		if (
			!isEmpty(first_name) &&
			!isEmpty(last_name) &&
			!isEmpty(username) &&
			!isEmpty(email) &&
			!isEmpty(address) &&
			!isEmpty(phone)
		) {
			return (
				<Button large block onPress={() => this.handleValidation()}>
					{this.props.loading.condition === true &&
					this.props.loading.process_on === 'UPDATE_USER' ? (
						<Spinner color="#FFFFFF" />
					) : (
						<Text style={styles.buttonText}>Update Profile</Text>
					)}
				</Button>
			)
		} else {
			return (
				<Button large bordered>
					<Text style={styles.buttonText}>Update Profile</Text>
				</Button>
			)
		}
	}

	handleValidation() {
		const {
			first_name,
			last_name,
			username,
			gender,
			id_region,
			email,
			address,
			phone
		} = this.state
		if (!isEmail(email)) {
			Alert.alert('Update failed', 'Please input valid email')
		} else {
			this.props.updateUser(
				this.props.sessionPersistance.id,
				{
					first_name,
					last_name,
					email,
					username,
					gender,
					id_region,
					address,
					phone
				},
				this.props.sessionPersistance.accessToken
			)
		}
	}

	render() {
		const { navigate, goBack } = this.props.navigation
		return (
			<Container style={styles.container}>
				<Header style={styles.header}>
					<Left style={styles.backHeader} />
					<Body>
						<Text style={styles.title}>EDIT PROFILE</Text>
					</Body>
					<Right>
						<TouchableOpacity onPress={() => goBack()}>
							<Text style={styles.cancel}>Cancel</Text>
						</TouchableOpacity>
					</Right>
				</Header>
				<Content>
					<View style={styles.profileInfoView}>
						<Form>
							<Item stackedLabel>
								<Label style={styles.labelText}>First Name</Label>
								<Input
									value={this.state.first_name}
									onChangeText={first_name => this.setState({ first_name })}
								/>
							</Item>
							<Item stackedLabel>
								<Label style={styles.labelText}>Last Name</Label>
								<Input
									value={this.state.last_name}
									onChangeText={last_name => this.setState({ last_name })}
								/>
							</Item>
							<Item stackedLabel style={styles.itemForm}>
								<Label style={styles.labelText}>Username</Label>
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
									<Item label="Male" value={1} />
									<Item label="Female" value={2} />
								</Picker>
							</View>
							<Item stackedLabel style={styles.itemForm}>
								<Label style={styles.labelText}>Email</Label>
								<Input
									value={this.state.email}
									onChangeText={email => this.setState({ email })}
								/>
							</Item>
							<View style={styles.genderView}>
								<Text style={styles.gender}>Region</Text>
								<Picker
									style={styles.picker}
									mode="dropdown"
									iosHeader="region"
									selectedValue={this.state.id_region}
									onValueChange={id_region => this.setState({ id_region })}>
									{this.props.regions.map((data, index) => (
										<Item
											key={index}
											label={data.region}
											value={data.id_region}
										/>
									))}
								</Picker>
							</View>
							<Item stackedLabel style={styles.itemForm}>
								<Label style={styles.labelText}>Address</Label>
								<Input
									value={this.state.address}
									onChangeText={address => this.setState({ address })}
								/>
							</Item>
							<Item stackedLabel style={styles.itemForm}>
								<Label style={styles.labelText}>Phone Number</Label>
								<Input
									value={this.state.phone}
									onChangeText={phone => this.setState({ phone })}
								/>
							</Item>
						</Form>
					</View>
					<View style={styles.buttonView}>{this.renderButton()}</View>
				</Content>
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return {
		regions: state.regionals,
		loading: state.loading,
		success: state.success,
		failed: state.failed,
		sessionPersistance: state.sessionPersistance
	}
}

const mapDipatchToProps = dispatch => {
	return {
		login: (email, password) => dispatch(login(email, password)),
		updateUser: (id, data, accessToken) =>
			dispatch(updateUser(id, data, accessToken))
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#ffffff'
	},
	header: {
		height: 70
	},
	cancel: {
		fontSize: 16,
		color: '#000000',
		textAlign: 'right'
	},
	title: {
		fontWeight: 'bold'
	},
	profileInfoView: {
		paddingHorizontal: width / 20,
		paddingVertical: height / 30
	},
	labelText: {
		fontWeight: 'bold',
		color: '#000000'
	},
	itemForm: {
		marginTop: 10
	},
	linearGradient: {
		flex: 1,
		width: '100%',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5
	},
	buttonView: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	button: {
		width: '30%',
		height: '35%',
		paddingTop: 0,
		paddingBottom: 0
	},
	buttonText: {
		fontWeight: 'bold',
		fontSize: 16
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

export default connect(mapStateToProps, mapDipatchToProps)(EditProfile)
