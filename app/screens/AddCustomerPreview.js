import React, { Component } from 'react'
import { StyleSheet, Dimensions, View, Image, FlatList } from 'react-native'
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
import { connect } from 'react-redux'
import image from '../assets/images/add-user.png'
import LinearGradient from 'react-native-linear-gradient'
import { postCustomer } from '../actions/customers'

const { height, width } = Dimensions.get('window')

class AddCustomerPreview extends Component {
	constructor() {
		super()

		this.state = {
			id: '',
			name: '',
			email: '',
			phone: '',
			address: '',
			latitude: '',
			longitude: ''
		}
	}

	componentWillReceiveProps(props) {
		if(props.success.condition === true && props.success.process_on === 'SUCCESS_ADD_CUSTOMER') {
			this.props.navigation.navigate('CustomerProfile')
		}
	}

	componentWillMount() {
		const { params } = this.props.navigation.state
		const { id } = this.props.sessionPersistance
		this.setState({
			id: id,
			name: params.name,
			email: params.email,
			phone: params.phone,
			address: params.address,
			latitude: params.latitude,
			longitude: params.longitude
		})
	}

	key = (item,index) => index

	renderItems = ({item}) => (
		<View style={styles.headerDirection}>
			<Icon name="md-contact" size={18} />
			<Text style={styles.data}>{item.name}</Text>
		</View>
	)

	async handlePostCustomer() {
		const { sessionPersistance } = await this.props
		await this.props.postCustomer(this.state, this.props.pics, sessionPersistance.accessToken)
	}

	render() {
		return (
			<Container style={{ backgroundColor: '#ffffff' }}>
				<Header style={styles.header}>
					<Left style={styles.backHeader}>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Icon name="ios-arrow-back" size={25} color="#000000" />
							<Text style={styles.back}>Back</Text>
						</Button>
					</Left>
					<Body>
						<Text style={styles.title}>CUSTOMER PREVIEW</Text>
					</Body>
					<Right>
						<Button transparent badge onPress={() => navigate('Cart')}>
							<Icon name="ios-notifications" size={25} />
						</Button>
					</Right>
				</Header>
				<Content style={styles.content}>
					<Form>
						<Item stackedLabel disabled style={styles.itemForm}>
							<Label>Customer Name</Label>
							<Input disabled value={this.state.name} />
						</Item>
						<Item stackedLabel disabled style={styles.itemForm}>
							<Label>Email</Label>
							<Input disabled value={this.state.email} />
						</Item>
						<Item stackedLabel disabled style={styles.itemForm}>
							<Label>Phone</Label>
							<Input disabled value={this.state.phone} />
						</Item>
						<Item stackedLabel disabled style={styles.itemForm}>
							<Label>Address</Label>
							<Input
								disabled
								multiline={true}
								value={this.state.address}
								style={{ paddingVertical: 15 }}
							/>
						</Item>
					</Form>
					<Text style={{color: '#575757', fontSize: 14, marginLeft: 15, marginTop: 20, marginBottom: 5}}>PIC Name</Text>
					<FlatList 
						data={this.props.pics}
						keyExtractor={this.key}
						renderItem={this.renderItems} />
					<View style={styles.buttonView}>
						<Button
							primary
							style={styles.buttonBack}
							onPress={() => this.props.navigation.goBack()}>
							<Text style={styles.buttonText}>BACK</Text>
						</Button>
						<Button
							primary
							style={styles.button}
							onPress={() => this.handlePostCustomer()}>
							<LinearGradient
								colors={['#20E6CD', '#2D38F9']}
								style={styles.linearGradient}>
								<Text style={styles.buttonText}>SUBMIT</Text>
							</LinearGradient>
						</Button>
					</View>
				</Content>
			</Container>
		)
	}
}

const mapStateToProps = (state) => ({
	sessionPersistance: state.sessionPersistance,
	pics: state.pics
})

const mapDispatchToProps = (dispatch) => ({
	postCustomer: (data, dataPic, accessToken) => dispatch(postCustomer(data, dataPic, accessToken))
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
	headerDirection: {
		display: 'flex',
		flexDirection: 'row',
		marginLeft: 20,
		marginTop: 10
	},
	data: {
		fontSize: 14,
		color: '#181818',
		marginLeft: 5
	},
	headerDirection: {
		display: 'flex',
		flexDirection: 'row',
		marginLeft: 15,
		marginTop: 10
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomerPreview)
