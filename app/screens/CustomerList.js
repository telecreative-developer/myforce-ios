import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import {
	Container,
	Content,
	Header,
	Left,
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
		this.props.filterCustomersWithId(this.props.sessionPersistance.id)
	}

	key = (item, index) => index

	renderItems = ({ item }) => (
		<TouchableOpacity
			onPress={() => this.props.setNavigate('CustomerProfile', item)}>
			<ContactCard
				title={item.name}
				description={item.description}
				avatar={item.avatar}
			/>
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
									source={{ uri: this.props.sessionPersistance.avatar }}
								/>
							)}
						</TouchableOpacity>
					</Left>
					<Body>
						<Text style={styles.title}>CUSTOMERS</Text>
					</Body>
					<Right>
						<TouchableOpacity onPress={() => this.props.setNavigate('Profile')}>
							<Icon name="ios-notifications" size={25} />
						</TouchableOpacity>
					</Right>
				</Header>
				<View style={styles.searchView}>
					<Item style={styles.searchForm} rounded>
						<Input
							placeholder="Search"
							onChangeText={name => this.setState({ search: name })}
						/>
						<Icon size={25} name="ios-search" />
					</Item>
				</View>
				<Content style={styles.content}>
					<FlatList
						searchProperty={'name'}
						searchTerm={this.state.search}
						data={this.props.customers}
						keyExtractor={this.key}
						renderItem={this.renderItems}
					/>
				</Content>
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return {
		customers: state.customers,
		sessionPersistance: state.sessionPersistance
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setNavigate: (link, data) => dispatch(setNavigate(link, data)),
		filterCustomersWithId: id => dispatch(filterCustomersWithId(id)),
		filterCustomersWithName: name => dispatch(filterCustomersWithName(name))
	}
}

const styles = StyleSheet.create({
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
