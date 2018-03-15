import React, { Component } from 'react'
import {
	StyleSheet,
	Dimensions,
	View,
	Image,
	TouchableHighlight,
	ImageBackground,
	FlatList
} from 'react-native'
import {
	Container,
	Content,
	Header,
	Left,
	Body,
	Right,
	Text,
	H1,
	H2,
	H3,
	Footer,
	FooterTab,
	Thumbnail,
	Button
} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { fetchProducts } from '../actions/products'
import { setNavigate } from '../actions/processor'

const { height, width } = Dimensions.get('window')

class Product extends Component {
	state = {
		loading: true
	}

	async componentDidMount() {
		await this.setState({ loading: true })
		await this.props.fetchProducts(this.props.sessionPersistance.accessToken)
		await this.setState({ loading: false })
	}

	renderItems = ({ item }) => {
		return (
			<TouchableHighlight
				underlayColor={'transparent'}
				onPress={() => this.props.setNavigate('SubProduct', item)}>
				<ImageBackground
					source={{ uri: item.picture }}
					imageStyle={styles.cardImage}
					style={styles.productCard}>
					<View style={styles.cardContent}>
						<Text style={styles.cardTitle}>{item.product}</Text>
						<Text style={styles.cardDetail}>{item.description}</Text>
					</View>
				</ImageBackground>
			</TouchableHighlight>
		)
	}

	key = (item, index) => index

	async handleRefresh() {
		await this.setState({ loading: true })
		await this.props.fetchProducts(this.props.sessionPersistance.accessToken)
		await this.setState({ loading: false })
	}

	render() {
		return (
			<Container>
				<Content style={styles.content}>
					<FlatList
						data={this.props.products}
						keyExtractor={this.key}
						renderItem={this.renderItems}
						refreshing={this.state.loading}
						onRefresh={() => this.handleRefresh()}
					/>
				</Content>
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return {
		products: state.products,
		sessionPersistance: state.sessionPersistance,
		loading: state.loading
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setNavigate: (link, data) => dispatch(setNavigate(link, data)),
		fetchProducts: accessToken => dispatch(fetchProducts(accessToken))
	}
}

const styles = StyleSheet.create({
	header: {
		height: 70
	},
	title: {
		fontWeight: 'bold'
	},
	footerWrap: {
		height: 70
	},
	footerText: {
		fontSize: 10,
		marginTop: 5
	},
	content: {
		padding: 35,
		backgroundColor: '#ffffff'
	},
	productCard: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: height / 4,
		marginBottom: '3%',
		backgroundColor: '#000000'
	},
	cardImage: {
		opacity: 0.8
	},
	cardContent: {
		backgroundColor: 'transparent'
	},
	cardTitle: {
		fontSize: 48,
		fontWeight: '900',
		color: '#ffffff',
		fontStyle: 'italic',
		textAlign: 'center'
	},
	cardDetail: {
		color: '#ffffff',
		fontSize: 14,
		textAlign: 'center',
		marginTop: 10
	},
	linearGradient: {
		flex: 1,
		width: '100%',
		display: 'flex',
		justifyContent: 'center'
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
