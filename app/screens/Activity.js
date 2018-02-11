import React, { Component } from 'react'
import {
	StyleSheet,
	Dimensions,
	View,
	TouchableOpacity,
	FlatList,
	Image,
	TextInput
} from 'react-native'
import {
	Container,
	Content,
	Header,
	Footer,
	FooterTab,
	Left,
	Body,
	H1,
	H2,
	Right,
	Text,
	Thumbnail,
	Button,
	Form,
	Input,
	Item,
	Label
} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import LinearGradient from 'react-native-linear-gradient'
import HorizontalJoker from '../components/HorizontalJoker'
import Modal from 'react-native-modal'
import defaultAvatar from '../assets/images/default-avatar.png'
import { connect } from 'react-redux'
import { fetchCustomers } from '../actions/customers'
import { setNavigate } from '../actions/processor'
import image from '../assets/images/add-user.png'

const { width, height } = Dimensions.get('window')

const ASPECT_RATIO = width / height
const LATITUDE = 0
const LONGITUDE = 0
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class Activity extends Component {
	constructor() {
		super()

		this.state = {
			isModalVisible: false,
			region: {
				latitude: LATITUDE,
				longitude: LONGITUDE,
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA
			}
		}
	}

	componentDidMount() {
		this.props.fetchCustomers(this.props.sessionPersistance.accessToken)
		navigator.geolocation.getCurrentPosition(
			position => {
				this.setState({
					region: {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						latitudeDelta: LATITUDE_DELTA,
						longitudeDelta: LONGITUDE_DELTA
					}
				})
			},
			error => console.log(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		)
		this.watchID = navigator.geolocation.watchPosition(position => {
			this.setState({
				region: {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					latitudeDelta: LATITUDE_DELTA,
					longitudeDelta: LONGITUDE_DELTA
				}
			})
		})
	}

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchID)
	}

	key = (item, index) => index

	renderItems = ({ item }) => (
		<TouchableOpacity style={styles.card}>
			<HorizontalJoker
				title={item.name}
				person={item.pic}
				description={item.description}
				avatar={item.avatar}
			/>
		</TouchableOpacity>
	)

	render() {
		return (
			<Container>
				<Modal style={styles.modal} isVisible={this.state.isModalVisible}>
					<View style={styles.modalWrapper}>
						<View
							style={{
								flex: 1,
								backgroundColor: 'transparent',
								justifyContent: 'center',
								flexDirection: 'column',
								alignItems: 'center'
							}}>
							<Text style={styles.modalTitle}>Confirm Checkin</Text>
							<Text style={styles.modalAsk}>Checkin at a New Customer ?</Text>
						</View>
						<Footer>
							<FooterTab>
								<Button
									onPress={() => this.setState({ isModalVisible: false })}>
									<Text note style={styles.modalCancelButton}>
										Cancel
									</Text>
								</Button>
								<Button onPress={this.props.navigateToAddCustomer}>
									<Text style={styles.modalYesButton}>Take the next step.</Text>
								</Button>
							</FooterTab>
						</Footer>
					</View>
				</Modal>
				<Header style={styles.header}>
					<Left>
						<TouchableOpacity
							onPress={() => this.props.setNavigate({ link: 'Profile' })}>
							{this.props.sessionPersistance.data.avatar === '' ? (
								<Thumbnail rounded small source={defaultAvatar} />
							) : (
								<Thumbnail
									small
									rounded
									source={{ uri: this.props.sessionPersistance.data.avatar }}
								/>
							)}
						</TouchableOpacity>
					</Left>
					<Body>
						<Text style={styles.title}>ACTIVITY</Text>
					</Body>
					<Right>
						<TouchableOpacity>
							<Icon name="ios-notifications" size={25} />
						</TouchableOpacity>
					</Right>
				</Header>
				<View style={styles.wrapperView}>
					<MapView
						provider={PROVIDER_GOOGLE}
						style={styles.maps}
						showsUserLocation={true}
						region={this.state.region}
						onRegionChange={region => this.setState({ region })}
						onRegionChangeComplete={region => this.setState({ region })}>
						{this.props.customers.map((data, index) => (
							<MapView.Marker
								key={index}
								coordinate={{
									longitude: data.longitude,
									latitude: data.latitude
								}}
								title={data.name}
								description={data.description}
							/>
						))}
					</MapView>
					<View style={styles.searchView}>
						<Item style={styles.searchForm} rounded>
							<Input placeholder="Search" />
							<Icon size={25} name="ios-search" />
						</Item>
					</View>
					<TouchableOpacity
						style={styles.centerButton}
						onPress={() => this.setState({ isModalVisible: true })}>
						<LinearGradient
							colors={['#20E6CD', '#2D38F9']}
							style={styles.linearGradient}>
							<Text style={styles.buttonText}>CHECK IN</Text>
						</LinearGradient>
					</TouchableOpacity>
				</View>
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return {
		customers: state.customers,
		sessionPersistance: state.sessionPersistance
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchCustomers: accessToken => dispatch(fetchCustomers(accessToken)),
		setNavigate: navigate => dispatch(setNavigate(navigate))
	}
}

const styles = StyleSheet.create({
	header: {
		height: 70
	},
	title: {
		fontWeight: 'bold'
	},
	footerWrap: {
		height: 70
	},
	footerText: {
		fontSize: 10,
		marginTop: 5
	},
	wrapperView: {
		flex: 1,
		display: 'flex',
		alignItems: 'center'
	},
	searchView: {
		marginTop: height / 40,
		position: 'absolute',
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	searchForm: {
		paddingHorizontal: 10,
		borderRadius: 5,
		backgroundColor: '#ffffff',
		width: width / 1.8
	},
	maps: {
		height: height,
		width: width,
		zIndex: 0,
		flex: 1
	},
	position: {
		position: 'absolute',
		top: height / 12
	},
	centerButton: {
		width: 100,
		height: 100,
		borderRadius: 100,
		position: 'absolute',
		bottom: height / 12
	},
	buttonText: {
		textAlign: 'center',
		backgroundColor: 'transparent',
		color: '#000000',
		fontWeight: '800',
		fontStyle: 'italic'
	},
	linearGradient: {
		flex: 1,
		borderRadius: 100,
		display: 'flex',
		justifyContent: 'center'
	},
	modal: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	modalWrapper: {
		width: width / 2,
		height: height / 5,
		backgroundColor: '#ffffff',
		borderRadius: 5,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	modalCancelButton: {
		fontSize: 16
	},
	modalYesButton: {
		fontSize: 16,
		fontWeight: 'bold',
		backgroundColor: 'transparent'
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	modalAsk: {
		fontSize: 16,
		textAlign: 'center',
		marginTop: 10
	},
	cancelText: {
		color: '#ffffff'
	},
	yesText: {
		color: '#ffffff',
		fontWeight: 'bold'
	},
	card: {
		marginTop: 15
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Activity)
