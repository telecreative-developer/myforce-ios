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

const { width, height } = Dimensions.get('window')

const data = [
	{
		key: 'Fuji Xerox C3020',
		picture:
			'https://lscdn.blob.core.windows.net/products/photocopier/images/Canon-imageRUNNER-C3020-Multifunctional-Photocopier.jpg'
	},
	{
		key: 'Fuji Xerox 2204N Mono Photocopier',
		picture:
			'https://lscdn.blob.core.windows.net/products/photocopier/images/Canon-imageRUNNER-2204N-Mono-Photocopier.jpg'
	},
	{
		key: 'Fuji Xerox 2004N Mono Photocopier',
		picture:
			'https://lscdn.blob.core.windows.net/products/photocopier/images/Canon-imageRUNNER-2004N-Mono-Photocopier.jpg'
	},
	{
		key: 'Fuji Xerox C3020',
		picture:
			'https://lscdn.blob.core.windows.net/products/photocopier/images/Canon-imageRUNNER-2002-Multifunctional-Photocopier.jpg'
	}
]

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
export default class Cart extends Component {
	renderItem = ({ item, index }) => {
		if (item.empty === true) {
			return <View style={[styles.item, styles.itemInvisible]} />
		}
		return (
			<ImageBackground
				source={{ uri: item.picture }}
				imageStyle={styles.cardImage}
				style={styles.item}>
				<TouchableHighlight underlayColor={'transparent'}>
					<Text style={styles.itemText}>{item.key}</Text>
				</TouchableHighlight>
				<Footer style={styles.cardFooter}>
					<Button full style={styles.cardButton}>
						<Icon name="ios-close" size={20} color={'#ffffff'} />
						<Text>Cancel</Text>
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
						<Text style={styles.title}>CART</Text>
					</Body>
					<Right>
						<Button transparent badge onPress={() => navigate('Cart')}>
							<Icon name="ios-cart" size={25} />
						</Button>
					</Right>
				</Header>
				<Content style={styles.content}>
					<FlatList
						data={formatData(data, numColumns)}
						style={styles.container}
						renderItem={this.renderItem}
						numColumns={numColumns}
					/>
				</Content>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	content: {
		backgroundColor: '#ffffff',
		padding: 5
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
	image: {
		display: 'flex',
		alignItems: 'center',
		marginTop: height / 20
	},
	container: {
		flex: 1,
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
	cardFooter: {
		position: 'absolute',
		bottom: 0,
		height: '20%',
		backgroundColor: 'transparent'
	},
	cardButton: {
		backgroundColor: '#ff6961',
		width: '100%',
		height: '100%',
		flexDirection: 'row',
		borderRadius: 0
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
})
