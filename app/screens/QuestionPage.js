import React, { Component } from 'react'
import {
	Dimensions,
	StyleSheet,
	ImageBackground,
	View,
	TouchableOpacity,
	Image,
	ScrollView
} from 'react-native'
import {
	Container,
	Text,
	Header,
	Left,
	Button,
	H3,
	Form,
	Item,
	Input,
	Footer,
	FooterTab,
	ListItem,
	Body,
	input,
	Label,
	CheckBox
} from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'
import bg from '../assets/images/meeting.jpg'
import Modal from 'react-native-modal'

const { width, height } = Dimensions.get('window')

export default class QuestionPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isModalVisible: false
		}
	}

	render() {
		const { navigate, goBack } = this.props.navigation
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
							<Text style={styles.modalTitle}>Confirm Answer</Text>
							<Text style={styles.modalAsk}>
								Are you sure to submit your answer ?
							</Text>
						</View>
						<Footer>
							<FooterTab>
								<Button
									onPress={() => this.setState({ isModalVisible: false })}>
									<Text note style={styles.modalCancelButton}>
										Cancel
									</Text>
								</Button>
								<Button
									onPress={() => {
										navigate('CustomerProfile')
										this.setState({ isModalVisible: false })
									}}>
									<Text style={styles.modalYesButton}>Yes, Submit Answer</Text>
								</Button>
							</FooterTab>
						</Footer>
					</View>
				</Modal>
				<Header hasTabs style={styles.header}>
					<Left style={styles.backHeader}>
						<Button transparent onPress={() => goBack()}>
							<Icon name="ios-arrow-back" size={25} color="#ffffff" />
							<Text style={styles.back}>Back</Text>
						</Button>
					</Left>
				</Header>
				<View style={styles.contentWrapper}>
					<Image source={bg} style={styles.cardImage} />
					<View style={styles.questionBox}>
						<Text style={styles.greeting}>Hai, Ridho</Text>
						<Text style={styles.command}>
							Pada tahap ini coba lengkapi pertanyaan berikut yaa...
						</Text>
						<Text style={styles.question}>
							Kriteria apa saja yang mereka butuhkan dari solusi yang akan kita
							tawarkan?
						</Text>
						<View style={styles.container}>
							<Item bordered regular>
								<Input
									multiline={true}
									placeholder="Silahkan isi dengan jawaban anda"
									style={styles.answer}
								/>
							</Item>
						</View>
						<View style={styles.buttonView}>
							<Button
								primary
								style={styles.buttonBack}
								onPress={() => navigate('QuestionPage1')}>
								<Text style={styles.buttonText}>BACK</Text>
							</Button>
							<Button
								primary
								style={styles.button}
								onPress={() => this.setState({ isModalVisible: true })}>
								<LinearGradient
									colors={['#20E6CD', '#2D38F9']}
									style={styles.linearGradient}>
									<Text style={styles.buttonText}>FINISH</Text>
								</LinearGradient>
							</Button>
						</View>
						<View style={styles.save}>
							<TouchableOpacity>
								<Text style={styles.saveText}>Save My Answer</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: 'transparent',
		position: 'absolute',
		zIndex: 100,
		top: 0,
		left: 0,
		right: 0
	},
	contentWrapper: {
		alignItems: 'center',
		flex: 1,
		zIndex: -1,
		backgroundColor: '#000000'
	},
	cardImage: {
		width: '100%',
		height: '100%',
		opacity: 0.5
	},
	titleView: {
		position: 'absolute',
		zIndex: 2,
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent'
	},
	title: {
		fontSize: 40,
		fontWeight: '900',
		color: '#ffffff',
		fontStyle: 'italic'
	},
	description: {
		fontSize: 14,
		color: '#ffffff',
		marginTop: 10
	},
	buttonText: {
		textAlign: 'center',
		backgroundColor: 'transparent',
		color: '#000000',
		fontWeight: '800',
		fontStyle: 'italic',
		fontSize: 24
	},
	linearGradient: {
		flex: 1,
		width: '100%',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	centerButton: {
		width: 100,
		height: 100,
		borderRadius: 100,
		bottom: height / 3,
		zIndex: 30
	},
	questionBox: {
		width: width / 1.2,
		height: height / 2.2,
		backgroundColor: '#ffffff',
		position: 'absolute',
		zIndex: 1,
		top: height / 3,
		padding: 40
	},
	greeting: {
		fontSize: 14,
		color: '#2f4f4f',
		fontWeight: '900',
		marginBottom: 3
	},
	command: {
		fontSize: 14,
		color: '#2f4f4f'
	},
	question: {
		fontSize: 14,
		color: '#2f4f4f'
	},
	questionList: {
		paddingTop: 4,
		paddingBottom: 4
	},
	item: {
		flexDirection: 'column'
	},
	line: {
		flex: 1,
		height: 0.3
	},
	container: {
		flex: 1,
		marginTop: 30
	},
	back: {
		fontSize: 18,
		color: '#ffffff'
	},
	questionContent: {
		flexDirection: 'row',
		alignItems: 'center',
		display: 'flex'
	},
	inputItem: {
		width: '40%',
		flexDirection: 'row',
		marginRight: 10
	},
	input: {
		fontSize: 14,
		marginLeft: -4
	},
	buttonView: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	button: {
		width: '30%',
		paddingTop: 0,
		paddingBottom: 0
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
	buttonText: {
		fontWeight: '900',
		fontSize: 16,
		fontStyle: 'italic',
		color: 'black'
	},
	save: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 20
	},
	saveText: {
		color: '#000080'
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
	backHeader: {
		flexDirection: 'row'
	},
	answer: {
		borderRadius: 0,
		height: 180,
		fontSize: 14
	},
	greeting: {
		fontSize: 14,
		color: '#2f4f4f',
		fontWeight: '900',
		marginBottom: 3
	}
})
