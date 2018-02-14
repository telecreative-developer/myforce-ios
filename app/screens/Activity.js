import React, { Component } from 'react'
import {
	StyleSheet,
	Dimensions,
	View,
	TouchableOpacity,
	FlatList,
	Image,
	TextInput,
	Animated,
	Easing,
	BackHandler,
	TouchableHighlight
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
	Label,
	ListItem
} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import LinearGradient from 'react-native-linear-gradient'
import HorizontalJoker from '../components/HorizontalJoker'
import Modal from 'react-native-modal'
import defaultAvatar from '../assets/images/default-avatar.png'
import { connect } from 'react-redux'
import { fetchCustomers, searchCustomersPlace, selectCustomerPlace } from '../actions/customers'
import { setNavigate } from '../actions/processor'
import image from '../assets/images/add-user.png'
import ornament from '../assets/images/ornament.png'

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
			viewDetailPlace: false,
			showBoxContent: false,
			value: '',
			image: true,
			region: {
				latitude: LATITUDE,
				longitude: LONGITUDE,
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA
			}
		}

		this.animatedValue = new Animated.Value(400)
		this.animatedValueDetail = new Animated.Value(0)
	}

	handleShowBoxContent() {
		this.setState({ showBoxContent: true })
		Animated.spring(this.animatedValue, {
			toValue: height / 1.25,
			tension: 50
		}).start()
	}

	handleCloseBoxContent() {
		this.setState({ showBoxContent: false })
		this.setState({ value: '' })
		Animated.timing(this.animatedValue, {
			toValue: 400,
			duration: 200
		}).start()
	}

	async handleOpenDetail(placeId) {
		await this.props.selectCustomerPlace(placeId)
		await this.setState({
			region: {
				latitude: this.props.selectedCustomerPlace.geometry.location.lat,
				longitude: this.props.selectedCustomerPlace.geometry.location.lng,
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA
			}
		})

		await Animated.timing(this.animatedValue, {
			toValue: 0,
			duration: 200
		}).start()

		await Animated.timing(this.animatedValueDetail, {
			toValue: 400,
			duration: 200
		}).start()
	}

	async handleCloseDetail() {
		await Animated.timing(this.animatedValueDetail, {
			toValue: 0,
			duration: 200
		}).start()

		await Animated.timing(this.animatedValue, {
			toValue: height / 1.25,
			duration: 200
		}).start()
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

	handleTypingSearch(value) {
		Animated.spring(this.animatedValue, {
			toValue: height / 1.25,
			tension: 50
		}).start()
		this.setState({ value })
		this.props.searchCustomersPlace(value)
	}

	key = (item, index) => index

	renderItemsCustomer = ({ item }) => (
		<ListItem onPress={() => this.handleOpenDetail(item.place_id)}>
			<Icon name="ios-locate-outline" size={40} />
			<Body>
				<Text style={{ fontWeight: 'bold', fontSize: 18 }}>
					{item.structured_formatting.main_text}
				</Text>
				<Text note style={{ fontSize: 18 }}>
					{item.structured_formatting.secondary_text}
				</Text>
			</Body>
		</ListItem>
	)

	render() {
		const animatedStyle = { height: this.animatedValue }
		const animatedStyleDetail = { height: this.animatedValueDetail }
		return (
			<Container>
				<Header style={styles.header}>
					<Left>
						<TouchableOpacity onPress={() => this.props.setNavigate('Profile')}>
							{this.props.sessionPersistance.avatar === '' ? (
								<Thumbnail rounded small source={defaultAvatar} />
							) : (
								<Thumbnail
									small
									rounded
									source={{ uri: this.props.sessionPersistance.avatar }}
								/>
							)}
						</TouchableOpacity>
					</Left>
					<Body>
						<Text style={styles.title}>ACTIVITY</Text>
					</Body>
					<Right>
						<Button
							transparent
							onPress={() => this.props.setNavigate('Calendar')}>
							<Icon
								name="ios-calendar-outline"
								size={25}
								style={styles.iconCalendar}
								color={'#2D38F9'}
							/>
						</Button>
						<Button
							transparent
							onPress={() => this.props.setNavigate({ link: 'Notifications' })}>
							<Icon name="ios-notifications" size={25} />
						</Button>
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
					<Animated.View style={[styles.footerConfirmation, animatedStyleDetail]}>
						<TouchableHighlight style={{width: '100%', alignItems: 'flex-end'}} onPress={() => this.handleCloseDetail()}>
							<Icon name="ios-close" size={35}/>
						</TouchableHighlight>
						<Text style={styles.addCustomer}>Add Customer Confirmation</Text>
						<Text style={styles.customerName}>{this.props.selectedCustomerPlace.name}</Text>
						<Text style={styles.customerAddress}>{this.props.selectedCustomerPlace.formatted_address}</Text>
						<TouchableOpacity style={styles.centerButton} onPress={() => this.props.setNavigate('AddCustomer', this.props.selectedCustomerPlace)}>
							<LinearGradient colors={['#20E6CD', '#2D38F9']} style={styles.linearGradient}>
								<Text style={styles.buttonText}>CHECK IN</Text>
							</LinearGradient>
						</TouchableOpacity>
					</Animated.View>
					<Animated.View style={[styles.footer, animatedStyle]}>
						{this.state.showBoxContent ? (
							<Icon
								name="ios-arrow-down"
								size={35}
								style={styles.arrow}
								onPress={() => this.handleCloseBoxContent()}
							/>
						) : (
							<Icon
								name="ios-arrow-up"
								size={35}
								style={styles.arrow}
								onPress={() => this.handleShowBoxContent()}
							/>
						)}
						<Text style={styles.find}>Lets Find Your Customer</Text>
						<View style={styles.searchView}>
							<Item style={styles.searchForm} rounded>
								<Input
									placeholder="Search"
									onFocus={() => this.handleShowBoxContent()}
									onChangeText={value => this.handleTypingSearch(value)}
								/>
								<Icon size={25} name="ios-search" />
							</Item>
						</View>
						{this.state.value === '' ? (
							<Image source={ornament} style={styles.ornament} />
						) : (
							<View
								style={{ width: width / 1.5, marginTop: 15, height: height }}>
								<FlatList
									data={this.props.resultCustomersPlace}
									keyExtractor={this.key}
									renderItem={this.renderItemsCustomer}
								/>
							</View>
						)}
					</Animated.View>
				</View>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	customers: state.customers,
	sessionPersistance: state.sessionPersistance,
	resultCustomersPlace: state.resultCustomersPlace,
	selectedCustomerPlace: state.selectedCustomerPlace
})

const mapDispatchToProps = dispatch => ({
	fetchCustomers: accessToken => dispatch(fetchCustomers(accessToken)),
	setNavigate: (link, data) => dispatch(setNavigate(link, data)),
	selectCustomerPlace: (placeId) => dispatch(selectCustomerPlace(placeId)),
	searchCustomersPlace: input => dispatch(searchCustomersPlace(input))
})

const styles = StyleSheet.create({
	footer: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		backgroundColor: '#fff',
		height: height,
		width: width / 1.2,
		position: 'absolute',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		bottom: 0
	},
	footerConfirmation: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		backgroundColor: '#fff',
		height: height,
		width: width / 1.2,
		position: 'absolute',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		paddingHorizontal: width / 12,
		bottom: 0
	},
	buttonPicker: {
		width: width / 3.5,
		height: height / 6,
		margin: 10,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#E0E0E0'
	},
	ornament: {
		marginTop: 0
	},
	find: {
		textAlign: 'center',
		fontWeight: '900',
		fontSize: 24
	},
	addCustomer: {
		textAlign: 'center',
		fontWeight: '900',
		fontSize: 24,
		marginBottom: 20
	},
	customerName: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 22,
		marginBottom: 10 
	},
	customerAddress: {
		textAlign: 'center',
		fontSize: 18,
		marginBottom: 20,
	},
	checkin: {
		width: '70%'
	},
	arrow: {
		marginVertical: 5,
		color: '#c0c0c0'
	},
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
		display: 'flex',
		marginTop: 20
	},
	searchForm: {
		paddingHorizontal: 10,
		borderRadius: 5,
		backgroundColor: '#fafbfd',
		width: width / 1.5
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
	},
	iconCalendar: {
		marginRight: 5
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Activity)
