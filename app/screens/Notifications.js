import React, { Component } from 'react'
import { StyleSheet, Dimensions, FlatList } from 'react-native'
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

const { width, height } = Dimensions.get('window')

export default class Notifications extends Component {
	constructor() {
		super()

		this.state = {
			data: [
				{
					notificationImage:
						'https://exelord.github.io/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg',
					notificationText:
						'Congratulation, your pipeline progress has stepped up in PT Astra Graphia',
					notificationTime: '3:43 pm'
				},
				{
					notificationImage:
						'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAzFAAAAJDNhM2YxYzcwLTlkYTUtNDNhYi1iOGY0LTFkZGY1NzdiMWNjZg.jpg',
					notificationText: 'Kevin Hermawan has been added a New Customer',
					notificationTime: '3:43 pm'
				},
				{
					notificationImage:
						'https://exelord.github.io/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg',
					notificationText:
						"Hey, Nando.. You're ready to get a next pipeline progress",
					notificationTime: '3:43 pm'
				}
			]
		}
	}

	key = (item, index) => index

	renderItems = ({ item }) => (
		<ListItem avatar style={styles.listItem}>
			<Left>
				<Thumbnail source={{ uri: item.notificationImage }} />
			</Left>
			<Body>
				<Text style={styles.notificationTextStyle}>
					{item.notificationText}
				</Text>
			</Body>
			<Right>
				<Text note>{item.notificationTime}</Text>
			</Right>
		</ListItem>
	)

	render() {
		const { goBack } = this.props.navigation
		return (
			<Container>
				<Header style={styles.header}>
					<Left style={styles.backHeader}>
						<Button transparent onPress={() => goBack()}>
							<Icon name="ios-arrow-back" size={25} color="#000000" />
							<Text style={styles.back}>Back</Text>
						</Button>
					</Left>
					<Body>
						<Text style={styles.title}>NOTIFICATIONS</Text>
					</Body>
					<Right />
				</Header>
				<Content style={styles.content}>
					<List>
						<FlatList
							data={this.state.data}
							keyExtractor={this.key}
							renderItem={this.renderItems}
						/>
					</List>
				</Content>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
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
		width: '100%'
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
	}
})
