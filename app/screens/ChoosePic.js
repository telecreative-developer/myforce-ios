import React, { Component } from 'react'
import { StyleSheet, Dimensions, View, Image, FlatList } from 'react-native'
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
	List,
	ListItem,
	CheckBox,
	Icon
} from 'native-base'
import image from '../assets/images/add-user.png'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import { removePic } from '../actions/pics'

const { height, width } = Dimensions.get('window')

class ChoosePic extends Component {
	key = (item, index) => index

	renderItems = ({ item }) => (
		<ListItem style={{ paddingHorizontal: 10 }}>
			<Body>
				<Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left' }}>
					{item.name}
				</Text>
				<Text style={{ fontSize: 14, textAlign: 'left' }}>{item.job}</Text>
				<Text style={{ fontSize: 14, textAlign: 'left' }}>{item.company}</Text>
			</Body>
			<Right>
				<Button onPress={() => this.props.removePic(item)}>
					<Icon name="close" />
				</Button>
			</Right>
		</ListItem>
	)

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
						<Text style={styles.title}>
							CHOOSE PIC ({this.props.pics.length})
						</Text>
					</Body>
					<Right>
						{this.props.pics.length === 0 ? (
							<Button transparent badge style={{ paddingRight: 0 }}>
								<Text note style={styles.back}>
									Preview
								</Text>
							</Button>
						) : (
							<Button
								transparent
								badge
								onPress={() =>
									this.props.navigation.navigate(
										'AddCustomerPreview',
										this.props.navigation.state.params
									)
								}
								style={{ paddingRight: 0 }}>
								<Text note style={styles.back}>
									Preview
								</Text>
							</Button>
						)}
					</Right>
				</Header>
				<View style={styles.buttonView}>
					<Button
						bordered
						style={styles.buttonBack}
						onPress={() =>
							this.props.navigation.navigate(
								'AddNewPic',
								this.props.navigation.state.params
							)
						}>
						<Icon name="ios-add" size={25} color="#2D38F9" />
						<Text style={styles.buttonText}>Add New PIC</Text>
					</Button>
				</View>
				<Content style={styles.content}>
					<FlatList
						data={this.props.pics.reverse()}
						keyExtractor={this.key}
						renderItem={this.renderItems}
					/>
				</Content>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	sessionPersistance: state.sessionPersistance,
	pics: state.pics
})

const mapDispatchToProps = dispatch => ({
	removePic: data => dispatch(removePic(data))
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
		paddingHorizontal: 0
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
		marginVertical: 5
	},
	button: {
		width: '30%',
		paddingTop: 0,
		paddingBottom: 0
	},
	buttonText: {
		fontWeight: '900',
		fontSize: 16,
		fontStyle: 'italic',
		color: '#2D38F9'
	},
	buttonBack: {
		marginRight: 10,
		marginLeft: 10,
		borderRadius: 0,
		marginTop: height / 28,
		width: '30%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent',
		borderColor: '#2D38F9'
	},
	linearGradient: {
		flex: 1,
		width: '100%',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	searchView: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 20
	},
	searchForm: {
		paddingHorizontal: 10,
		borderRadius: 5,
		backgroundColor: '#ffffff',
		width: width / 1.5
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(ChoosePic)
