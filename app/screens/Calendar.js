import React, { Component } from 'react'
import { StyleSheet, Dimensions, FlatList, View } from 'react-native'
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
	ListItem
} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import Timeline from 'react-native-timeline-listview'
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
					<Timeline
						timeStyle={{
							textAlign: 'center',
							backgroundColor: '#ff9797',
							color: 'white',
							fontWeight: 'bold',
							padding: 5,
							borderRadius: 100
						}}
						descriptionStyle={{ color: 'gray' }}
						timeContainerStyle={{ minWidth: 150 }}
						options={{ removeClippedSubviews: false }}
						innerCircle={'dot'}
						data={this.props.events.reverse()}
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
	content: {
		paddingRight: width / 6,
		paddingLeft: width / 6,
		paddingTop: height / 58,
		width: '100%',
		backgroundColor: 'transparent'
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
