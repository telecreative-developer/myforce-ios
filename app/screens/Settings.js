import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'
import {
	StyleSheet,
	Alert,
	AsyncStorage,
	TouchableHighlight
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
	List,
	ListItem
} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

class Settings extends Component {
	handleConfirmLogout() {
		Alert.alert(
			'Logout',
			'Are you sure want to logout from this app?',
			[
				{
					text: 'Cancel',
					onPress: () => {},
					style: 'cancel'
				},
				{ text: 'Logout', onPress: () => this.handleLogout() }
			],
			{ cancelable: false }
		)
	}

	handleLogout() {
		AsyncStorage.removeItem('session')
		this.props.navigation.dispatch(
			NavigationActions.reset({
				index: 0,
				actions: [NavigationActions.navigate({ routeName: 'Start' })]
			})
		)
	}

	render() {
		const { navigate, goBack } = this.props.navigation
		return (
			<Container style={styles.container}>
				<Header style={styles.header}>
					<Left style={styles.backHeader}>
						<Button transparent onPress={() => goBack()}>
							<Icon name="ios-arrow-back" size={25} color="#000000" />
							<Text style={styles.back}>Back</Text>
						</Button>
					</Left>
					<Body>
						<Text style={styles.title}>SETTINGS</Text>
					</Body>
					<Right />
				</Header>
				<Content style={styles.container}>
					<List>
						<ListItem icon onPress={() => navigate('EditProfile')}>
							<Left>
								<Icon name="md-create" size={25} />
							</Left>
							<Body>
								<Text>Edit Profile</Text>
							</Body>
							<TouchableHighlight underlayColor={'transparent'}>
								<Right>
									<Icon name="ios-arrow-forward" size={25} />
								</Right>
							</TouchableHighlight>
						</ListItem>
						<ListItem icon onPress={() => navigate('ChangePassword')}>
							<Left>
								<Icon name="ios-lock" size={25} />
							</Left>
							<Body>
								<Text>Change Password</Text>
							</Body>
							<Right>
								<Icon name="ios-arrow-forward" size={25} />
							</Right>
						</ListItem>
						<ListItem icon onPress={() => this.handleConfirmLogout()}>
							<Left>
								<Icon name="ios-log-out" size={25} />
							</Left>
							<Body>
								<Text>Logout</Text>
							</Body>
							<Right />
						</ListItem>
					</List>
				</Content>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#ffffff'
	},
	header: {
		height: 70
	},
	backHeader: {
		flexDirection: 'row'
	},
	back: {
		fontSize: 18,
		color: '#000000'
	},
	title: {
		fontWeight: 'bold'
	}
})

export default Settings
