import React, { Component } from 'react'
import {
	StyleSheet,
	Dimensions,
	View,
	TouchableOpacity,
	Image,
	ImageBackground,
	FlatList,
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
	Badge,
	Item,
	Content,
	Form,
	Label,
	Input,
	Picker,
	Footer
} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import image from '../assets/images/shopping-cart.png'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import { fetchProducts } from '../actions/products'
import { fetchSubproducts } from '../actions/subproducts'
import { addProductToCart, removeProductFromCart } from '../actions/cart'

const { width, height } = Dimensions.get('window')

const formatData = (data, numColumns) => {
	const numberOfFullRows = Math.floor(data.length / numColumns)

	let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns
	while (
		numberOfElementsLastRow !== numColumns &&
		numberOfElementsLastRow !== 0
	) {
		data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true })
		numberOfElementsLastRow++
	}

	return data
}

const numColumns = 3

class OrderSummary extends Component {
	constructor() {
		super()

		this.state = {
			id_product: ''
		}
	}

	async componentWillMount() {
		const { accessToken } = await this.props.sessionPersistance
		await this.props.fetchProducts(accessToken)
		await this.setState({id_product: this.props.products[0].id_product})
		await this.props.fetchSubproducts(this.props.products[0].id_product, accessToken)
	}

	handleSelectCategory(id_product) {
		const { accessToken } = this.props.sessionPersistance
		this.props.fetchSubproducts(id_product, accessToken)
		this.setState({id_product})
	}

	renderItem = ({ item, index }) => {
		return (
			<ImageBackground
				source={{uri: item.picture}}
				imageStyle={styles.cardImage}
				style={styles.item}>
				<TouchableHighlight>
					<Text style={styles.itemText}>{item.subproduct}</Text>
				</TouchableHighlight>
				<Footer style={styles.cardFooter}>
					<Button full style={styles.cardButton} onPress={() => this.props.addProductToCart(item)}>
						<Icon name="md-add" size={20} color={'#ffffff'} />
						<Text>Add</Text>
					</Button>
				</Footer>
			</ImageBackground>
		)
	}

	render() {
		const { navigate, goBack } = this.props.navigation
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
						<Text style={styles.title}>ORDER SUMMARY</Text>
					</Body>
					<Right>
						<Button transparent>
							{this.props.cartProducts.length !== 0 ? (
								<Badge><Text>{this.props.cartProducts.length}</Text></Badge>
							) : (
								<Icon name="ios-cart" size={25} />
							)}
						</Button>
					</Right>
				</Header>
				<Content style={styles.content}>
					<View style={styles.image}>
						<Image source={image} />
					</View>
					<Form>
						<View style={styles.productCategoryView}>
							<Label style={styles.productCategory}>Product Category</Label>
							<Picker
								style={styles.picker}
								mode="dropdown"
								iosHeader="Product Category"
								selectedValue={this.state.id_product}
								onValueChange={id_product => this.handleSelectCategory(id_product)}>
								{this.props.products.map((data, index) => (
									<Item key={index} label={data.product} value={data.id_product} />
								))}
							</Picker>
						</View>
					</Form>
					<FlatList
						data={formatData(this.props.subproducts, numColumns)}
						style={styles.container}
						keyExtractor={(item, index) => index}
						renderItem={this.renderItem}
						numColumns={numColumns} />
				</Content>
				<Footer>
					<Button full style={styles.footerButton} onPress={() => navigate('Cart')}>
						<Text style={styles.submit}>SUBMIT</Text>
					</Button>
				</Footer>
			</Container>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		sessionPersistance: state.sessionPersistance,
		products: state.products,
		subproducts: state.subproducts,
		cartProducts: state.cartProducts
	}
}

const mapDispatchToProps = (dispatch) => ({
	addProductToCart: (data) => dispatch(addProductToCart(data)),
	removeProductFromCart: (id_subproduct) => dispatch(removeProductFromCart(id_subproduct)),
	fetchProducts: (accessToken) => dispatch(fetchProducts(accessToken)),
	fetchSubproducts: (id, accessToken) => dispatch(fetchSubproducts(id, accessToken))
})

const styles = StyleSheet.create({
	content: {
		backgroundColor: '#ffffff',
		paddingHorizontal: width / 12
	},
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
	productCategory: {
		fontSize: 18,
		color: '#696969'
	},
	productCategoryView: {
		marginLeft: 15,
		marginTop: 30
	},
	picker: {
		marginLeft: -15
	},
	image: {
		display: 'flex',
		alignItems: 'center',
		marginTop: height / 20
	},
	container: {
		flex: 1,
		marginTop: 20,
		marginBottom: 40
	},
	item: {
		backgroundColor: '#000000',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		margin: 2,
		paddingHorizontal: 20,
		height: Dimensions.get('window').width / 4
	},
	itemInvisible: {
		backgroundColor: 'transparent'
	},
	itemText: {
		color: '#fff',
		textAlign: 'center',
		backgroundColor: 'transparent'
	},
	productImage: {
		opacity: 0.5
	},
	cardImage: {
		opacity: 0.5
	},
	footerButton: {
		backgroundColor: '#2D38F9',
		flexDirection: 'row',
		justifyContent: 'center',
		flex: 1,
		height: '100%'
	},
	submit: {
		fontWeight: 'bold'
	},
	cardFooter: {
		position: 'absolute',
		bottom: 0,
		height: '20%',
		backgroundColor: 'transparent'
	},
	cardButton: {
		backgroundColor: '#20E6CD',
		width: '100%',
		height: '100%',
		flexDirection: 'row',
		borderRadius: 0
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary)
