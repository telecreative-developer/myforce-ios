import React, { Component } from 'react'
import {
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	View,
	Image
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
	Form,
	Label,
	Input,
	Item
} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import image from '../assets/images/password.png'

const { width, height } = Dimensions.get('window')

export default class ChangePassword extends Component {
	render() {
		const { navigate, goBack } = this.props.navigation
		return (
			<Container style={styles.container}>
				<Header style={styles.header}>
					<Left style={styles.backHeader} />
					<Body>
						<Text style={styles.title}>CHANGE PASSWORD</Text>
					</Body>
					<Right>
						<TouchableOpacity onPress={() => goBack()}>
							<Text style={styles.cancel}>Cancel</Text>
						</TouchableOpacity>
					</Right>
				</Header>
				<View style={styles.image}>
					<Image source={image} />
				</View>
				<View style={styles.paragraphView}>
					<Text style={styles.paragraph}>
						Hey, Kevin! Please enter your new password
					</Text>
				</View>
				<Content scrollEnabled={false}>
					<View style={styles.profileInfoView}>
						<Form>
							<Item stackedLabel style={styles.itemForm}>
								<Label style={styles.labelText}>Current Password</Label>
								<Input secureTextEntry />
							</Item>
							<Item stackedLabel style={styles.itemForm}>
								<Label style={styles.labelText}>New Password</Label>
								<Input secureTextEntry />
							</Item>
							<Item stackedLabel style={styles.itemForm}>
								<Label style={styles.labelText}>Verify Password</Label>
								<Input secureTextEntry />
							</Item>
						</Form>
					</View>
					<View style={styles.buttonView}>
						<Button primary style={styles.button}>
							<LinearGradient
								colors={['#20E6CD', '#2D38F9']}
								style={styles.linearGradient}>
								<Text style={styles.buttonText}>CHANGE PASSWORD</Text>
							</LinearGradient>
						</Button>
					</View>
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
	cancel: {
		fontSize: 16,
		color: '#000000',
		textAlign: 'right'
	},
	title: {
		fontWeight: 'bold'
	},
	paragraph: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 16,
		color: '#000'
	},
	paragraphView: {
		marginTop: height / 30
	},
	profileInfoView: {
		paddingHorizontal: width / 6,
		paddingVertical: height / 30
	},
	labelText: {
		fontWeight: 'bold',
		color: '#000000'
	},
	linearGradient: {
		flex: 1,
		width: '100%',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5
	},
	buttonView: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20
	},
	button: {
		width: '30%',
		paddingTop: 0,
		paddingBottom: 0,
		borderRadius: 5
	},
	buttonText: {
		fontWeight: 'bold',
		fontSize: 16,
		color: 'black'
	},
	itemForm: {
		marginTop: 10
	},
	image: {
		display: 'flex',
		alignItems: 'center',
		marginTop: height / 20
	}
})
