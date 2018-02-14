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
	BackHandler
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
import { fetchCustomers } from '../actions/customers'
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
			showImagePicker: false,
			isModalVisible: false,
			value:'',
			image: true,
			region: {
				latitude: LATITUDE,
				longitude: LONGITUDE,
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA
			},
			dataCustomer: [
				{
					customerName: 'PT Frisian Flag',
					customerAddress: 'Jl. Lorem Ipsum dolor sit Amet',
				},
				{
					customerName: 'PT Frisian Flag',
					customerAddress: 'Jl. Lorem Ipsum dolor sit Amet',
				},
				{
					customerName: 'PT Frisian Flag',
					customerAddress: 'Jl. Lorem Ipsum dolor sit Amet',
				},
				{
					customerName: 'PT Frisian Flag',
					customerAddress: 'Jl. Lorem Ipsum dolor sit Amet',
				}
			]
		},
		this.animatedValue1 = new Animated.Value(400)
    this.animatedValue2 = new Animated.Value(0)
	}

	componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if(this.state.showImagePicker) {
        this.handleCloseImagePicker()
        return true
      }else{
        return false
      }
    })
  }

  handleShowImagePicker() {
    this.setState({showImagePicker: true})
    Animated.spring(this.animatedValue1, {
      toValue: height / 1.25,
      tension: 50
    }).start()

    Animated.spring(this.animatedValue2, {
      toValue: 120,
      tension: 50
    }).start()
  }

  handleCloseImagePicker() {
    this.setState({showImagePicker: false, image: true, value: ''})
    Animated.timing(this.animatedValue1, {
      toValue: 400,
			duration: 200,
		}).start()

    Animated.timing(this.animatedValue2, {
      toValue: 0,
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

	key = (item, index) => index

	renderItemsCustomer = ({ item }) => (
		<ListItem onPress={() => this.handleCloseImagePicker()}>
			<Icon name="ios-locate-outline" size={40}/>
			<Body>
				<Text style={{fontWeight: 'bold', fontSize: 18}}>{item.customerName}</Text>
				<Text note style={{fontSize: 18}}>{item.customerAddress}</Text>
			</Body>
		</ListItem>
	)

	handleAddCustomer() {
		this.props.navigateToAddCustomer()
		this.setState({ isModalVisible: false })
	}

	render() {
		const animatedStyle1 = { height: this.animatedValue1 }
    const animatedStyle2 = { height: this.animatedValue2 }
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
								<Button onPress={() => this.handleAddCustomer()}>
									<Text style={styles.modalYesButton}>Take the next step.</Text>
								</Button>
							</FooterTab>
						</Footer>
					</View>
				</Modal>
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
							onPress={() => this.props.setNavigate({ link: 'Calendar' })}>
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
					<Animated.View style={[styles.footer, animatedStyle1]}>
						{this.state.showImagePicker === true ? 
						<Icon name="ios-arrow-down" size={35} style={styles.arrow} onPress={() => this.handleCloseImagePicker()}/> :
						<Icon name="ios-arrow-up" size={35} style={styles.arrow} onPress={() => this.handleShowImagePicker()}/> }
						<Text style={styles.find}>Let's Find Your Customer</Text>
						<View style={styles.searchView}>
							<Item style={styles.searchForm} rounded>
								<Input placeholder="Search" value={this.state.value} onFocus={() => this.handleShowImagePicker()} onChangeText={(value) => this.setState({value})}/>
								<Icon size={25} name="ios-search"/>
							</Item>
						</View>
						{this.state.image === true && this.state.value === '' ? 
							<Image source={ornament} style={styles.ornament}/> :
							<View style={{width: width / 1.5, marginTop: 15, height: height}}>
								<FlatList 
									data={this.state.dataCustomer}
									keyExtractor={this.key}
									renderItem={this.renderItemsCustomer}
								/>
							</View>
						}
					</Animated.View>
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
		setNavigate: (link, data) => dispatch(setNavigate(link, data))
	}
}

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
		fontSize: 24,
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
	},
	iconCalendar: {
		marginRight: 5
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Activity)
