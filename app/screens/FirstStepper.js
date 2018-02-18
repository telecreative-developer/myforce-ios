import React, { Component } from 'react'
import {
	Dimensions,
	StyleSheet,
	ImageBackground,
	View,
	TouchableOpacity,
	Image
} from 'react-native'
import { Container, Text, Header, Left, Button, H3 } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'
import bg from '../assets/images/meeting.jpg'

const { width, height } = Dimensions.get('window')

export default class FirstStepper extends Component {
	render() {
		const { navigate, goBack } = this.props.navigation
		return (
			<Container>
				<Header hasTabs style={styles.header}>
					<Left style={styles.backHeader}>
						<Button transparent onPress={() => goBack()}>
							<Icon name="ios-arrow-back" size={25} color="#ffffff" />
							<Text style={{ fontSize: 18, color: '#ffffff' }}>Back</Text>
						</Button>
					</Left>
				</Header>
				<View style={styles.contentWrapper}>
					<Image source={bg} style={styles.cardImage} />
					<View style={styles.contentView}>
						<View style={styles.content}>
							<Text style={styles.step}>STEP 1</Text>
							<Text style={styles.title}>DEVELOP CRITERIA</Text>
							<Text style={styles.description}>Client Buying Process: Recognize Change</Text>
							<View style={styles.activityContentView}>
								<Text style={styles.contentDescription}> - Pada kondisi ini, Client Anda mulai merasakan adanya ketidakberesan, rasa kurang nyaman, dan keinginan untuk berubah dari kondisi dan cara kerja saat ini. Mungkin karena mereka merasa agak boros, kurang simple, atau mulai kerepotan dengan semakin meningkatnya load pekerjaan mereka.
								- Dari permasalahan itu, tidak semua Client Anda mengerti solusi apa yang terbaik untuk menyelesaikannya. Disinilah mereka memulai Buying Process, ketika mereka mulai memiliki keinginan untuk keluar dari masalah mereka.
								</Text>
								<Text style={styles.goal}>Your Goal:  Mengidentifikasi adanya kesempatan untuk membantu mereka</Text>
								<Text style={styles.advice}>Kesempatan ini mungkin tidak secara lugas akan disampaikan oleh Client Anda, sebaliknya, tugas Anda untuk selalu mencari dan terus mencari, hingga banyak peluang terbuka bagi Anda.</Text>
							</View>
						</View>
					</View>
					<TouchableOpacity
						style={styles.centerButton}
						onPress={() => navigate('QuestionPage')}>
						<LinearGradient
							colors={['#20E6CD', '#2D38F9']}
							style={styles.linearGradient}>
							<Text style={styles.buttonText}>GO!</Text>
						</LinearGradient>
					</TouchableOpacity>
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
		zIndex: -20,
		backgroundColor: '#000000',
	},
	cardImage: {
		width: '100%',
		height: '100%',
		opacity: 0.5
	},
	contentView: {
		position: 'absolute',
		zIndex: 2,
		top: height / 10,
		left: 0,
		right: 0,
		bottom: 0,
		alignItems: 'center',
		backgroundColor: 'transparent'
	},
	content: {
		width: width / 1.2,
		minHeight: height / 1.5,
		height: 'auto',
	},
	title: {
		fontSize: 40,
		fontWeight: '900',
		color: '#ffffff',
		fontStyle: 'italic', 
		textAlign: 'center'
	},
	description: {
		fontSize: 18,
		color: '#ffffff',
		marginTop: 10,
		textAlign: 'center'
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
		borderRadius: 100,
		display: 'flex',
		justifyContent: 'center'
	},
	centerButton: {
		width: 100,
		height: 100,
		borderRadius: 100,
		bottom: height / 5,
		zIndex: 30
	},
	newsWrapper: {
		width: '100%',
		height: height / 8,
		backgroundColor: '#2d3ad2',
		paddingLeft: 40,
		paddingRight: 40,
		display: 'flex',
		justifyContent: 'center',
		top: height / 15,
		zIndex: 0,
		position: 'absolute'
	},
	newsTitle: {
		color: '#ffffff',
		fontWeight: 'bold',
		fontSize: 14
	},
	closeIcon: {
		textAlign: 'right'
	},
	newsText: {
		fontSize: 12,
		color: '#ffffff',
		textAlign: 'left',
		marginBottom: 10
	},
	readMore: {
		color: '#ffffff',
		fontWeight: 'bold',
		fontSize: 12,
		textAlign: 'right'
	},
	newsDirection: {
		display: 'flex',
		flexDirection: 'row',
		marginBottom: 10
	},
	titleFlex: {
		display: 'flex',
		justifyContent: 'flex-start'
	},
	iconFlex: {
		flex: 1,
		display: 'flex',
		justifyContent: 'flex-end'
	},
	backHeader: {
		flexDirection: 'row'
	},
	step: {
		fontSize: 40,
		fontWeight: '900',
		color: '#db0000',
		fontStyle: 'italic', 
		textAlign: 'center'
	},
	activityContentView: {
		marginTop: 30
	},
	contentDescription: {
		color: '#fff'
	},
	goal: {
		color: '#fff',
		marginTop: 30
	},
	advice: {
		color: '#fff',
		marginTop: 30
	}
})
