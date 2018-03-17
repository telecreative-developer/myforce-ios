import React, { Component } from 'react'
import { StyleSheet, Alert, Dimensions, FlatList, View } from 'react-native'
import {
	Header,
	Left,
	Button,
	Text,
	Body,
	Right,
	Content,
	Container,
	Thumbnail,
	List,
	ListItem,
	H1,
	SwipeRow,
	Icon,
	Badge
} from 'native-base'
import moment from 'moment'
import { connect } from 'react-redux'
import { fetchEvents } from '../actions/events'
import { setNavigate } from '../actions/processor'

const { width, height } = Dimensions.get('window')

class Calendar extends Component {
	componentWillMount() {
		const { id, accessToken } = this.props.sessionPersistance
		this.props.fetchEvents(id, accessToken)
	}

	handleBack() {
		this.props.setNavigate('', '')
		this.props.navigation.goBack()
	}

	handleDeleteEvent(id_event) {
		Alert.alert(
			'Delete Event',
			'Are you sure want to delete this event?',
			[
				{text: 'Cancel', onPress: () => {}, style: 'cancel'},
				{text: 'OK', onPress: () => this.props.deleteEvent(id_event)},
			],
			{ cancelable: false }
		)
	}

	renderEvents({item}) {
		return (
			<SwipeRow
				leftOpenValue={75}
				rightOpenValue={-75}
				disableRightSwipe={true}
				body={
					<Body>
						<View style={{flexDirection: 'column', alignItems: 'flex-start', marginBottom: 30}}>
							<Text style={{fontWeight: 'bold', fontSize: 20}}>{moment(item.time).format('LT')}</Text>
							<Text note style={{fontWeight: 'bold', fontSize: 15}}>{moment(item.time).format('LL')}</Text>
						</View>
						<Text style={{fontSize: 30}}>{item.title}</Text>
						<Text note style={{fontSize: 25}}>{item.description}</Text>
					</Body>
				}
				right={
					<Button danger onPress={() => this.handleDeleteEvent(item.id_event)}>
						<Icon active name="trash" />
					</Button>
				}
			/>
		)
	}

	render() {
		const { navigate } = this.props.navigation
		return (
			<Container style={styles.container}>
				<Header style={styles.header}>
					<Left style={styles.backHeader}>
						<Button transparent onPress={() => this.handleBack()}>
							<Icon name="ios-arrow-back" size={25} color="#000000" />
							<Text style={styles.back}>Back</Text>
						</Button>
					</Left>
					<Body>
						<Text style={styles.title}>EVENT CALENDAR</Text>
					</Body>
					<Right style={styles.newEvent}>
						<Button
							transparent
							style={{ paddingRight: 0, marginRight: 0 }}
							onPress={() => navigate('NewEvent')}>
							<Icon name="ios-add" size={25} color="#000000" />
							<Text style={styles.new}>New Event</Text>
						</Button>
					</Right>
				</Header>
				<Content style={styles.content}>
					<FlatList
						data={this.props.events}
						keyExtractor={(item, index) => index}
						renderItem={this.renderEvents}
					/>
				</Content>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	events: state.events,
	sessionPersistance: state.sessionPersistance
})

const mapDispatchToProps = dispatch => ({
	setNavigate: (link, data) => dispatch(setNavigate(link, data)),
	fetchEvents: (id, accessToken) => dispatch(fetchEvents(id, accessToken))
})

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff'
	},
	header: {
		height: 70
	},
	title: {
		fontWeight: 'bold'
	},
	listItem: {
		padding: 15
	},
	notificationTextStyle: {
		fontWeight: 'bold'
	},
	backHeader: {
		flexDirection: 'row'
	},
	back: {
		fontSize: 18,
		color: '#000000'
	},
	new: {
		fontSize: 16,
		color: '#000000'
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
