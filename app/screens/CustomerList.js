import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import {
	Container,
	Content,
	Header,
	Left,
	H3,
	Body,
	Right,
	Thumbnail,
	View,
	Item,
	Input,
	Text
} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import ContactCard from '../components/ContactCard'
import { connect } from 'react-redux'
import { filterCustomersWithId } from '../actions/customers'
import { fetchPipelinesWithUserId } from '../actions/pipelines'
import { fetchPics } from '../actions/pics'
import FlatList from 'searchable-flatlist'
import { setNavigate } from '../actions/processor'
import defaultAvatar from '../assets/images/default-avatar.png'

const { width, height } = Dimensions.get('window')

class CustomerList extends Component {
	constructor() {
		super()

		this.state = {
			search: ''
		}
	}

	componentDidMount() {
		const { id, accessToken } = this.props.sessionPersistance
		this.props.filterCustomersWithId(id)
		this.props.fetchPics(accessToken)
		this.props.fetchPipelinesWithUserId(id, accessToken)
	}

	key = (item, index) => index

	renderItems = ({ item }) => (
		<TouchableOpacity
			onPress={() => this.props.setNavigate('CustomerProfile', item)}>
			<View style={styles.card}>
				<View style={styles.contentCard}>
					<View style={styles.cardHeader}>
						<H3 style={styles.textTitle}>{item.name}</H3>
						{this.props.resultPics.filter(data => data.id_customer === item.id_customer).map((d, index) => (
							<View style={styles.viewPerson} key={index}>
								<Icon name="ios-person" color="#000000" size={15} />
								<Text style={styles.textPerson}>{d.name}</Text>
							</View>
						))}
						{this.props.pipelinesWithUserId.filter(data => data.id_customer === item.id_customer).splice(0, 1).map((d, index) => (
							<Text key={index} style={styles.text}>{d.pipeline}</Text>
						))}
					</View>
				</View>
			</View>
		</TouchableOpacity>
	)

	render() {
		return (
			<Container>
				<Header style={styles.header}>
					<Left>
						<TouchableOpacity
							onPress={() => this.props.setNavigate('Profile', '')}>
							{this.props.sessionPersistance.avatar === '' ? (
								<Thumbnail rounded small source={defaultAvatar} />
							) : (
								<Thumbnail
									small
									rounded
									source={{ uri: this.props.sessionPersistance.avatar }} />
							)}
						</TouchableOpacity>
					</Left>
					<Body>
						<Text style={styles.title}>CUSTOMERS</Text>
					</Body>
					<Right>
						{/* <TouchableOpacity onPress={() => this.props.setNavigate('Profile')}>
							<Icon name="ios-notifications" size={25} />
						</TouchableOpacity> */}
					</Right>
				</Header>
				<View style={styles.searchView}>
					<Item style={styles.searchForm} rounded>
						<Input
							placeholder="Search"
							onChangeText={name => this.setState({ search: name })} />
						<Icon size={25} name="ios-search" />
					</Item>
				</View>
				<Content style={styles.content}>
					<FlatList
						searchProperty={'name'}
						searchTerm={this.state.search}
						data={this.props.customers}
						keyExtractor={this.key}
						renderItem={this.renderItems} />
				</Content>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	customers: state.customers,
	sessionPersistance: state.sessionPersistance,
	resultPics: state.resultPics,
	pipelinesWithUserId: state.pipelinesWithUserId
})

const mapDispatchToProps = dispatch => {
	return {
		setNavigate: (link, data) => dispatch(setNavigate(link, data)),
		filterCustomersWithId: id => dispatch(filterCustomersWithId(id)),
		filterCustomersWithName: name => dispatch(filterCustomersWithName(name)),
		fetchPics: (accessToken) => dispatch(fetchPics(accessToken)),
		fetchPipelinesWithUserId: (id, accessToken) => dispatch(fetchPipelinesWithUserId(id, accessToken))
	}
}

const styles = StyleSheet.create({
	card: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
		borderRadius: 5,
		height: height / 8,
		backgroundColor: '#ffffff',
		marginBottom: '3%'
	},
	contentCard: {
		display: 'flex',
		flexDirection: 'row',
		paddingRight: 90,
		paddingLeft: 20
	},
	viewPerson: {
		flexDirection: 'row',
		marginTop: 3
	},
	textTitle: {
		color: '#000000',
		fontSize: 18,
		fontWeight: 'bold'
	},
	textPerson: {
		color: '#000000',
		marginLeft: 5,
		fontSize: 14
	},
	text: {
		color: '#000000',
		fontSize: 11,
		marginTop: 5
	},
	cardHeader: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		marginLeft: 15,
		paddingBottom: 5
	},
	header: {
		height: 70
	},
	title: {
		fontWeight: 'bold'
	},
	content: {
		paddingRight: width / 6,
		paddingLeft: width / 6
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList)
