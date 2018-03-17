import React, { Component } from 'react'
import {
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	View,
	Image,
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
	Spinner
} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import image from '../assets/images/password.png'
import { connect } from 'react-redux'
import { updatePassword } from '../actions/users'

const { width, height } = Dimensions.get('window')

class ChangePassword extends Component {
	constructor() {
		super()

		this.state = {
			password: '',
			confirmPassword: ''
		}
	}

	componentWillReceiveProps(props) {
		if (
			props.loading.condition === false &&
			props.loading.process_on === 'LOADING_UPDATE_PASSWORD' &&
			props.failed.condition === true &&
			props.failed.process_on === 'FAILED_UPDATE_PASSWORD'
		) {
			Alert.alert('Failed update password')
		} else if (
			props.loading.condition === false &&
			props.loading.process_on === 'LOADING_UPDATE_PASSWORD' &&
			props.success.condition === true &&
			props.success.process_on === 'SUCCESS_UPDATE_PASSWORD'
		) {
			props.navigation.goBack()
			Alert.alert('Password updated', 'Your password has been updated')
		}
	}

	renderButtons() {
		const { password, confirmPassword } = this.state
		const { sessionPersistance } = this.props
		if(password !== '' && confirmPassword !== '') {
			if(password === confirmPassword) {
				return (
					this.props.loading.condition === true && this.props.loading.process_on === 'LOADING_UPDATE_PASSWORD' ? (
						<Button primary style={styles.button}>
							<Spinner color='#FFFFFF' />
						</Button>
					) : (
						<Button primary style={styles.button} onPress={() => this.props.updatePassword(sessionPersistance.id, sessionPersistance.email, password, sessionPersistance.accessToken)}>
							<LinearGradient
								colors={['#20E6CD', '#2D38F9']}
								style={styles.linearGradient}>
								<Text style={styles.buttonText}>CHANGE PASSWORD</Text>
							</LinearGradient>
						</Button>
					)
				)
			}else{
				return (
					<Button bordered>
						<Text style={styles.buttonText}>CHANGE PASSWORD</Text>
					</Button>
				)
			}
		}else {
			return (
				<Button bordered>
					<Text style={styles.buttonText}>CHANGE PASSWORD</Text>
				</Button>
			)
		}
	}

	render() {
		const { navigate, goBack } = this.props.navigation
		return (
			<Container style={styles.container}>
				<Header style={styles.header}>
					<Left>
						<Button transparent onPress={() => goBack()} style={{paddingLeft: 0}}>
							<Text style={styles.cancel}>Cancel</Text>
						</Button>
					</Left>
					<Body>
						<Text style={styles.title}>CHANGE PASSWORD</Text>
					</Body>
					<Right />
				</Header>
				<View style={styles.image}>
					<Image source={image} />
				</View>
				<View style={styles.paragraphView}>
					<Text style={styles.paragraph}>
						Please enter your new password
					</Text>
				</View>
				<Content scrollEnabled={false}>
					<View style={styles.profileInfoView}>
						<Form>
							<Item stackedLabel style={styles.itemForm}>
								<Label style={styles.labelText}>New Password</Label>
								<Input value={this.state.password} onChangeText={(password) => this.setState({password})} secureTextEntry />
							</Item>
							<Item stackedLabel style={styles.itemForm}>
								<Label style={styles.labelText}>Verify Password</Label>
								<Input value={this.state.confirmPassword} onChangeText={(confirmPassword) => this.setState({confirmPassword})} secureTextEntry />
							</Item>
						</Form>
					</View>
					<View style={styles.buttonView}>
						{this.renderButtons()}
					</View>
				</Content>
			</Container>
		)
	}
}

const mapStateToProps = (state) => ({
	loading: state.loading,
	success: state.success,
	failed: state.failed,
	sessionPersistance: state.sessionPersistance
})

const mapDispatchToProps = (dispatch) => ({
	updatePassword: (id, email, password, accessToken) => dispatch(updatePassword(id, email, password, accessToken))
})

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
	paragraph: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 16,
		color: '#000'
	},
	paragraphView: {
		marginTop: height / 30
	},
	profileInfoView: {
		paddingHorizontal: width / 6,
		paddingVertical: height / 30
	},
	labelText: {
		fontWeight: 'bold',
		color: '#000000'
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
		alignItems: 'center',
		marginTop: 20
	},
	button: {
		width: '30%',
		paddingTop: 0,
		paddingBottom: 0,
		borderRadius: 5
	},
	buttonText: {
		fontWeight: 'bold',
		fontSize: 16,
		color: 'black'
	},
	itemForm: {
		marginTop: 10
	},
	image: {
		display: 'flex',
		alignItems: 'center',
		marginTop: height / 20
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)