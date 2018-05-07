import React, { Component } from 'react'
import {
	StyleSheet,
	TouchableHighlight,
	Dimensions,
	View,
	Image,
	Alert
} from 'react-native'
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
	Picker,
	Spinner
} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import image from '../assets/images/add-user.png'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import { isEmpty, isEmail } from 'validator'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'
import { postEvent } from '../actions/events'

const { height, width } = Dimensions.get('window')

class NewEvent extends Component {
	constructor() {
		super()

		this.state = {
			title: '',
			description: '',
			time: moment().format('LLL'),
			isDateTimePickerVisible: false
		}
	}

	componentWillReceiveProps(props) {
		if (
			props.success.condition === true &&
			props.success.process_on === 'SUCCESS_POST_EVENT'
		) {
			this.setState({
				title: '',
				description: '',
				time: moment().format('LLL')
			})
			props.navigation.goBack()
		}
	}

	showDateTimePicker() {
		this.setState({isDateTimePickerVisible: true})
	}

	hideDateTimePicker() {
		this.setState({ isDateTimePickerVisible: false })
	}

	handleDatePicked = time => {
		this.setState({ time })
		this.hideDateTimePicker()
	}

	handlePostEvent() {
		const { title, description, time } = this.state
		const { id, accessToken } = this.props.sessionPersistance
		this.props.postEvent({ title, description, time, id }, accessToken)
	}

	renderButton() {
		const { title, description, time } = this.state
		if (!isEmpty(title) && !isEmpty(description) && !isEmpty(time)) {
			return (
				<Button
					primary
					style={styles.button}
					onPress={() => this.handlePostEvent()}>
					<LinearGradient
						colors={['#20E6CD', '#2D38F9']}
						style={styles.linearGradient}>
						<Text style={styles.buttonText}>NEXT</Text>
					</LinearGradient>
				</Button>
			)
		}

		return (
			<Button primary style={styles.buttonBefore}>
				<Text style={styles.buttonText}>NEXT</Text>
			</Button>
		)
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
						<Text style={styles.title}>NEW EVENT</Text>
					</Body>
					<Right />
				</Header>
				<Content style={styles.content} scrollEnabled={false}>
					<View style={styles.image}>
						<Image source={image} />
					</View>
					<Form>
						<Item stackedLabel style={styles.itemForm}>
							<Label>Event Name</Label>
							<Input value={this.state.title} onChangeText={title => this.setState({ title })} />
						</Item>
						<Item stackedLabel style={styles.itemForm}>
							<Label>Description</Label>
							<Input
								value={this.state.description}
								multiline={true}
								onChangeText={description => this.setState({ description })}
								style={{ paddingVertical: 15 }}
							/>
						</Item>
						<Item stackedLabel onPress={() => this.showDateTimePicker()}>
							<Label>Date</Label>
							<View>
								<Text>{moment(this.state.time).format('LLL')}</Text>
							</View>
						</Item>
						<DateTimePicker
							mode="datetime"
							isVisible={this.state.isDateTimePickerVisible}
							onConfirm={this.handleDatePicked}
							onCancel={this.hideDateTimePicker} />
					</Form>
					{this.props.loading.condition === true &&
					this.props.loading.process_on === 'LOADING_POST_EVENT' ? (
						<View style={styles.buttonView}>
							<Spinner color="#999999" />
						</View>
					) : (
						<View style={styles.buttonView}>
							<Button
								primary
								style={styles.buttonBack}
								onPress={() => this.props.navigation.goBack()}>
								<Text style={styles.buttonText}>BACK</Text>
							</Button>
							{this.renderButton()}
						</View>
					)}
				</Content>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	success: state.success,
	loading: state.loading,
	sessionPersistance: state.sessionPersistance
})

const mapDispatchToProps = dispatch => ({
	postEvent: (data, accessToken) => dispatch(postEvent(data, accessToken))
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

export default connect(mapStateToProps, mapDispatchToProps)(NewEvent)
