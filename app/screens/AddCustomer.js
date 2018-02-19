import React, { Component } from 'react'
import { StyleSheet, Dimensions, View, Image, Alert } from 'react-native'
import {
	Container,
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
	Picker
} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import image from '../assets/images/add-user.png'
import LinearGradient from 'react-native-linear-gradient'
import { isEmpty, isEmail } from 'validator'
import { connect } from 'react-redux'
import { setNavigate } from '../actions/processor'

const { height, width } = Dimensions.get('window')

class AddCustomer extends Component {
	constructor() {
		super()

		this.state = {
			name: '',
			email: '',
			phone: '',
			address: '',
			latitude: '',
			longitude: ''
		}
	}

	componentWillMount() {
		const { params } = this.props.navigation.state
		this.setState({
			name: params.name,
			address: params.formatted_address,
			latitude: params.geometry.location.lat,
			longitude: params.geometry.location.lng
		})
	}

	renderButton() {
		const { name, email, phone } = this.state
		if (!isEmpty(name) && !isEmpty(email) && !isEmpty(phone) && isEmail(email)) {
			return (
				<Button
					primary
					style={styles.button}
					onPress={() => this.validationEmail()}>
					<LinearGradient
						colors={['#20E6CD', '#2D38F9']}
						style={styles.linearGradient}>
						<Text style={styles.buttonText}>NEXT</Text>
					</LinearGradient>
				</Button>
			)
		}

		return (
			<Button
				primary
				style={styles.buttonBefore}>
				<Text style={styles.buttonText}>NEXT</Text>
			</Button>
		)
	}

	validationEmail() {
		const { email, password } = this.state
		if (!isEmail(email)) {
			Alert.alert('Gagal', 'Silahkan masukan alamat email yang valid')
		} else {
			this.props.navigation.navigate('ChoosePic', this.state)
		}
	}

	handleBack() {
		this.props.navigation.goBack()
		this.props.setNavigate('', '')
	}

	render() {
		return (
			<Container style={{ backgroundColor: '#ffffff' }}>
				<Header style={styles.header}>
					<Left style={styles.backHeader}>
						<Button transparent onPress={() => this.handleBack()}>
							<Icon name="ios-arrow-back" size={25} color="#000000" />
							<Text style={styles.back}>Back</Text>
						</Button>
					</Left>
					<Body>
						<Text style={styles.title}>ADD NEW CUSTOMER</Text>
					</Body>
					<Right />
				</Header>
				<Content style={styles.content} scrollEnabled={false}>
					<View style={styles.image}>
						<Image source={image} />
					</View>
					<Form>
						<View style={{ alignItems: 'center', display: 'flex' }}>
							<Text style={{ fontWeight: 'bold', fontSize: 18 }}>
								Customer Data
							</Text>
						</View>
						<Item stackedLabel style={styles.itemForm}>
							<Label>Customer Name</Label>
							<Input value={this.state.name} onChangeText={(name) => this.setState({name})} />
						</Item>
						<Item stackedLabel style={styles.itemForm}>
							<Label>Email</Label>
							<Input value={this.state.email} onChangeText={(email) => this.setState({email})} style={{ paddingVertical: 15 }} autoCapitalize = 'none' uppercase={false}/>
						</Item>
						<Item stackedLabel style={styles.itemForm}>
							<Label>Phone</Label>
							<Input value={this.state.phone} onChangeText={(phone) => this.setState({phone})} style={{ paddingVertical: 15 }} keyboardType='numeric'/>
						</Item>
						<Item stackedLabel style={styles.itemForm}>
							<Label>Address</Label>
							<Input disabled value={this.state.address} multiline={true} style={{ paddingVertical: 15 }} />
						</Item>
					</Form>
					<View style={styles.buttonView}>
						<Button
							primary
							style={styles.buttonBack}
							onPress={() => this.handleBack()}>
							<Text style={styles.buttonText}>BACK</Text>
						</Button>
						{this.renderButton()}
					</View>
				</Content>
			</Container>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	setNavigate: (link, data) => dispatch(setNavigate(link, data))
})

const styles = StyleSheet.create({
	backHeader: {
		flexDirection: 'row'
	},
	header: {
		height: 70
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
		marginTop: 30
	},
	picker: {
		marginLeft: -15
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
		paddingBottom: 0
	},
	buttonBefore: {
		width: '30%',
		paddingTop: 0,
		paddingBottom: 0,
		borderRadius: 0,
		backgroundColor: 'transparent',
		borderColor: '#2D38F9',
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center'
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
	}
})

export default connect(null, mapDispatchToProps)(AddCustomer)