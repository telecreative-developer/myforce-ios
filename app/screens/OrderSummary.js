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
import Modal from 'react-native-modal'

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

class SearchableFlatlist extends Component {
	static INCLUDES = 'includes'
	static WORDS = 'words'
	getFilteredResults() {
		let { data, type, searchProperty, searchTerm } = this.props
		return data.filter(
			item =>
				type && type === SearchableFlatlist.WORDS
					? new RegExp(`\\b${searchTerm}`, 'gi').test(item[searchProperty])
					: new RegExp(`${searchTerm}`, 'gi').test(item[searchProperty])
		)
	}
	render() {
		return <FlatList {...this.props} data={this.getFilteredResults()} />
	}
}

class OrderSummary extends Component {
	constructor() {
		super()

		this.state = {
			id_product: '',
			totalPrice: 0,
			quantity: 1,
			isModalVisibleCart: false,
			isModalVisibleQty: false,
			search: '',
			subproducts: {}
		}
	}

	async componentWillMount() {
		const { accessToken } = await this.props.sessionPersistance
		await this.props.fetchProducts(accessToken)
		await this.setState({ id_product: this.props.products[0].id_product })
		await this.props.fetchSubproducts(
			this.props.products[0].id_product,
			accessToken
		)
	}

	handleSelectCategory(id_product) {
		const { accessToken } = this.props.sessionPersistance
		this.props.fetchSubproducts(id_product, accessToken)
		this.setState({ id_product })
	}

	renderItem = ({ item, index }) => {
		return (
			<ImageBackground
				source={{ uri: item.picture }}
				imageStyle={styles.cardImage}
				style={styles.item}>
				<TouchableOpacity underlayColor={'transparent'}>
					<Text style={styles.itemText}>{item.subproduct}</Text>
					<Text style={styles.itemText}>Rp. {item.price}</Text>
				</TouchableOpacity>
				<Footer style={styles.cardFooter}>
					<Button
						full
						style={styles.cardButton}
						onPress={() => this.setState({isModalVisibleQty: true, subproducts: item})}>
						<Icon name="md-add" size={20} color={'#ffffff'} />
						<Text>Add</Text>
					</Button>
				</Footer>
			</ImageBackground>
		)
	}

	renderItemCart = ({ item }) => {
		return (
			<ImageBackground
				source={{ uri: item.picture }}
				imageStyle={styles.cardImage}
				style={styles.itemCart}>
				<View>
					<Text style={styles.itemText}>{item.subproduct}</Text>
					<Text>QTY: {item.quantity}</Text>
				</View>
				<Footer style={styles.cardFooterCart}>
					<Button
						full
						style={styles.cardButtonCart}
						onPress={() => this.props.removeProductFromCart(item.id_index)}>
						<Icon name="ios-close" size={20} color={'#ffffff'} />
						<Text>Cancel</Text>
					</Button>
				</Footer>
			</ImageBackground>
		)
	}

	key = (item, index) => index

	render() {
		const { navigate, goBack } = this.props.navigation
		const { params } = this.props.navigation.state
		return (
			<Container>
				<Modal
					isVisible={this.state.isModalVisibleQty}
					style={styles.modal}
					onBackdropPress={() => this.setState({ isModalVisibleQty: false })}>
					<View style={styles.viewModalQty}>
						<View style={styles.viewWrapModalQty}>
							<View style={styles.flexOnly2}>
								<Button
									style={styles.btnMinQty}
									onPress={() => this.setState({quantity: this.state.quantity-1})}>
									<Text>-</Text>
								</Button>
							</View>
							<View style={styles.flexOnly6}>
								<Item stackedLabel style={styles.itemQty}>
									<Label style={styles.productCategory}>Quantity</Label>
									<Input keyboardType='numeric' value={JSON.stringify(this.state.quantity)} onChangeText={(quantity) => this.setState({quantity})} />
								</Item>
							</View>
							<View style={styles.flexOnly2}>
								<Button
									style={styles.btnPlusQty}
									onPress={() => this.setState({quantity: this.state.quantity+1})}>
									<Text>+</Text>
								</Button>
							</View>
						</View>
						<View style={styles.viewFooterQty}>
							<View style={styles.flexOnly7}>
								<Button onPress={() => this.setState({isModalVisibleQty: false})} style={styles.btnCancelQty}><Text>Batal</Text></Button>
							</View>
							<View style={styles.flexOnly3}>
								<Button
									onPress={async () => {
										await this.props.addProductToCart({...this.state.subproducts, quantity: this.state.quantity})
										await this.setState({subproducts: {}, isModalVisibleQty: false})
									}}
									style={styles.btnSubmitQty}>
									<Text>Oke</Text>
								</Button>
							</View>
						</View>
					</View>
				</Modal>
				<Modal
					isVisible={this.state.isModalVisibleCart}
					style={styles.modal}
					onBackdropPress={() => this.setState({ isModalVisibleCart: false })}>
					<View style={styles.cartContent}>
						<View
							style={{
								width: '100%',
								alignItems: 'flex-end',
								paddingHorizontal: 20,
								paddingTop: 10
							}}>
							<TouchableOpacity
								underlayColor={'transparent'}
								onPress={() => this.setState({ isModalVisibleCart: false })}>
								<Icon name="ios-close" size={35} />
							</TouchableOpacity>
						</View>
						<Text style={styles.modalTitle}>Order Cart</Text>
						<Text style={styles.modalTotal}>Total Item: {this.props.cartProducts.length}</Text>
						<View style={{width: width / 1.3}}>
							<Item stackedLabel style={styles.itemForm}>
								<Label style={styles.productCategory}>Total Price</Label>
								<Input value={this.state.totalPrice} onChangeText={(totalPrice) => this.setState({totalPrice})} keyboardType='numeric'/>
							</Item>
						</View>
						<View>
							<FlatList
								showsVerticalScrollIndicator={false}
								data={this.props.cartProducts}
								style={styles.container}
								keyExtractor={this.key}
								renderItem={this.renderItemCart}
							/>
						</View>
					</View>
				</Modal>
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
						<Button
							transparent
							onPress={() => this.setState({ isModalVisibleCart: true })}>
							{this.props.cartProducts.length !== 0 ? (
								<Badge>
									<Text>{this.props.cartProducts.length}</Text>
								</Badge>
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
								onValueChange={id_product =>
									this.handleSelectCategory(id_product)
								}>
								{this.props.products.map((data, index) => (
									<Item
									key={index}
									label={data.product}
									value={data.id_product}
									/>
								))}
							</Picker>
							<Item stackedLabel style={styles.itemForm}>
								<Label style={styles.productCategory}>Total Price</Label>
								<Input
									value={this.state.totalPrice}
									onChangeText={totalPrice => this.setState({ totalPrice })}
									keyboardType="numeric"
								/>
							</Item>
						</View>
						<View>
							<Item>
								<Input placeholder="Search" value={this.state.search} onChangeText={(search) => this.setState({search})} />
							</Item>
						</View>
					</Form>
					<SearchableFlatlist
						data={formatData(this.props.subproducts, numColumns)}
						style={styles.container}
						searchProperty="subproduct"
						searchTerm={this.state.search}
						keyExtractor={(item, index) => index}
						renderItem={this.renderItem}
						numColumns={numColumns}
					/>
				</Content>
				<Footer>
					{this.props.cartProducts.length !== 0 ? (
						<Button
							full
							style={styles.footerButton}
							onPress={() =>
								navigate('QuestionPage', {
									step: params.step,
									id_pipeline: params.id_pipeline,
									id_customer: params.id_customer,
									total: this.state.totalPrice
								})
							}>
							<Text style={styles.submit}>SUBMIT</Text>
						</Button>
					) : (
						<Button
							full
							style={[styles.footerButton, { backgroundColor: '#999999' }]}>
							<Text style={styles.submit}>SUBMIT</Text>
						</Button>
					)}
				</Footer>
			</Container>
		)
	}
}

const mapStateToProps = state => {
	console.log(state.cartProducts)
	return {
		sessionPersistance: state.sessionPersistance,
		products: state.products,
		subproducts: state.subproducts,
		cartProducts: state.cartProducts
	}
}

const mapDispatchToProps = dispatch => ({
	addProductToCart: data => dispatch(addProductToCart(data)),
	removeProductFromCart: id_subproduct =>
		dispatch(removeProductFromCart(id_subproduct)),
	fetchProducts: accessToken => dispatch(fetchProducts(accessToken)),
	fetchSubproducts: (id, accessToken) =>
		dispatch(fetchSubproducts(id, accessToken))
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
	itemCart: {
		backgroundColor: '#000000',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		marginBottom: 10,
		paddingHorizontal: 20,
		height: Dimensions.get('window').width / 4,
		width: width / 1.3
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
	footerButtonCart: {
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
	},
	cardFooterCart: {
		position: 'absolute',
		bottom: 0,
		height: '25%',
		backgroundColor: 'transparent'
	},
	cardButtonCart: {
		backgroundColor: '#ff6961',
		width: '100%',
		height: '100%',
		flexDirection: 'row',
		borderRadius: 0
	},
	modalCart: {
		padding: 0,
		margin: 0,
		width: '100%',
		height: '100%'
	},
	cartContent: {
		width: '100%',
		height: '100%',
		flex: 1,
		backgroundColor: '#ffffff',
		margin: 0,
		alignItems: 'center',
		overflow: 'hidden'
	},
	viewModalQty:{
		backgroundColor: '#FFFFFF', 
		height: 150
	},
	viewWrapModalQty:{
		flexDirection: 'row',
		marginTop: 10, 
		alignItems: 'center'
	},
	flexOnly2:{
		flex: 0.2
	},
	flexOnly3:{
		flex: 0.3
	},
	flexOnly6:{
		flex: 0.6
	},
	flexOnly7:{
		flex: 0.7
	},
	itemQty:{
		marginLeft: 10, 
		marginRight: 10
	},
	btnMinQty:{
		alignSelf: 'flex-end', 
		backgroundColor: '#20E6CD', 
		borderRadius: 100
	},
	btnPlusQty:{
		backgroundColor: '#20E6CD', 
		borderRadius: 100
	},
	btnCancelQty:{
		alignSelf: 'flex-end', 
		marginRight: 10, 
		backgroundColor: '#20E6CD'
	},
	btnSubmitQty:{
		backgroundColor: '#20E6CD'
	},
	viewFooterQty:{
		flexDirection: 'row', 
		paddingTop: 10
	},
	modalTitle: {
		fontSize: 28,
		fontWeight: 'bold'
	},
	modalTotal: {
		fontSize: 22,
		marginTop: 5
	},
	itemForm: {
		marginTop: 20,
		marginLeft: 0,
		marginBottom: 20
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary)
