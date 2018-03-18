import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Dimensions,
	Image,
	TouchableHighlight,
	ImageBackground
} from 'react-native'
import {
	Header,
	Left,
	Body,
	Right,
	Container,
	Button,
	TouchableOpacity
} from 'native-base'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { fetchSubproducts } from '../actions/subproducts'
import { setNavigate } from '../actions/processor'

class SubProduct extends Component {
	constructor() {
		super()

		this.state = {
			loading: false,
			isModalZoomVisible: false,
			dataZoom: {}
		}
	}

	async componentDidMount() {
		await this.setState({ loading: true })
		await this.props.fetchSubproducts(
			this.props.navigation.state.params.id_product,
			this.props.sessionPersistance.accessToken
		)
		await this.setState({ loading: false })
	}

	handleZoomProduct(item) {
		this.setState({isModalZoomVisible: true, dataZoom: item})
	}

	renderItem = ({ item }) => (
		<ImageBackground
			source={{ uri: item.picture }}
			imageStyle={styles.cardImage}
			style={styles.item}>
			<TouchableHighlight
				underlayColor={'transparent'}
				style={{justifyContent: 'center'}}>
				<Text style={styles.itemText}>{item.subproduct}</Text>
			</TouchableHighlight>
			<View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
				<Button style={{backgroundColor: '#2D38F9'}} onPress={() => this.handleZoomProduct(item)}>
					<Text style={{paddingHorizontal: 10, color: '#fff'}}>Zoom Image</Text>
				</Button>
			</View>
		</ImageBackground>
	)

	key = (item, key) => key

	async handleBackButton() {
		await this.props.setNavigate()
		await this.props.navigation.goBack()
	}

	async handleRefresh() {
		await this.setState({ loading: true })
		await this.props.fetchSubproducts(
			this.props.navigation.state.params.id_product,
			this.props.sessionPersistance.accessToken
		)
		await this.setState({ loading: false })
	}

	renderModalZoom() {
		return (
			<Modal
				onBackdropPress={() => this.setState({isModalZoomVisible: false})}
				isVisible={this.state.isModalZoomVisible}>
				<View style={styles.modalContent}>
					<Text style={{marginBottom: 20, fontWeight: 'bold'}}>{this.state.dataZoom.subproduct}</Text>
					<Image style={{width: 200, height: 200}} source={{uri: this.state.dataZoom.picture}} />
				</View>
			</Modal>
		)
	}

	render() {
		const { navigate, goBack } = this.props.navigation
		return (
			<Container>
				{this.renderModalZoom()}
				<Header style={styles.header}>
					<Left style={{ flexDirection: 'row' }}>
						<Button transparent onPress={() => this.handleBackButton()}>
							<Icon name="ios-arrow-back" size={25} color="#000000" />
							<Text style={{ fontSize: 18, color: '#000000', marginLeft: 15 }}>
								Back
							</Text>
						</Button>
					</Left>
					<Body>
						<Text style={styles.title}>
							{this.props.navigation.state.params.product}
						</Text>
					</Body>
					<Right />
				</Header>
				<FlatList
					refreshing={this.state.loading}
					onRefresh={() => this.handleRefresh()}
					keyExtractor={this.key}
					data={this.props.subproducts}
					style={styles.container}
					renderItem={this.renderItem}
					numColumns={3}
				/>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	subproducts: state.subproducts,
	sessionPersistance: state.sessionPersistance
})

const mapDispatchToProps = dispacth => ({
	setNavigate: (link, data) => dispacth(setNavigate(link, data)),
	fetchSubproducts: (id, accessToken) =>
		dispacth(fetchSubproducts(id, accessToken))
})

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 2
	},
	modalContent: {
    backgroundColor: '#FFFFFF',
		padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
	item: {
		backgroundColor: '#000000',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		margin: 2,
		paddingHorizontal: 20,
		height: Dimensions.get('window').width / 3
	},
	itemInvisible: {
		backgroundColor: 'transparent'
	},
	itemText: {
		color: '#fff',
		textAlign: 'center',
		backgroundColor: 'transparent',
		fontWeight: 'bold'
	},
	header: {
		height: 70
	},
	title: {
		fontWeight: 'bold',
		fontSize: 16
	},
	backHeader: {
		flexDirection: 'row'
	},
	back: {
		fontSize: 18
	},
	productImage: {
		opacity: 0.5
	},
	cardImage: {
		opacity: 0.5
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(SubProduct)
