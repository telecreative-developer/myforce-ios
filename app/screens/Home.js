import React, { Component } from 'react'
import {
	StyleSheet,
	Dimensions,
	View,
	TouchableOpacity,
	FlatList
} from 'react-native'
import {
	Container,
	Content,
	Header,
	Item,
	Input,
	Footer,
	FooterTab,
	Left,
	Body,
	H1,
	H2,
	Right,
	Text,
	Thumbnail,
	Button,
	Icon
} from 'native-base'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import LinearGradient from 'react-native-linear-gradient'
import Modal from 'react-native-modal'
import { setActivePageHome } from '../actions/processor'
import { connect } from 'react-redux'
import { fetchUsers } from '../actions/users'
import Achievement from './Achievement'
import CustomerList from './CustomerList'
import Activity from './Activity'
import Product from './Product'
import Club from './Club'

const { width, height } = Dimensions.get('window')

class Home extends Component {
	componentDidMount() {
		this.props.fetchUsers(this.props.sessionPersistance.accessToken)
	}

	renderContent() {
		const { active } = this.props.activePageHome
		if (active === 2) {
			return <CustomerList />
		} else if (active === 3) {
			return (
				<Activity
					navigateToAddCustomer={() =>
						this.props.navigation.navigate('AddCustomer')
					}
				/>
			)
		} else if (active === 4) {
			return <Product />
		} else if (active === 5) {
			return <Club />
		}
		return <Achievement />
	}

	handleActivePageFirst() {
		this.props.setActivePageHome({
			active: 1,
			activePageFirst: true,
			activePageSecond: false,
			activePageThird: false,
			activePageFourth: false,
			activePageFifth: false,
			title: 'Achievment'
		})
	}

	handleActivePageSecond() {
		this.props.setActivePageHome({
			active: 2,
			activePageFirst: false,
			activePageSecond: true,
			activePageThird: false,
			activePageFourth: false,
			activePageFifth: false,
			title: 'Customer List'
		})
	}

	handleActivePageThird() {
		this.props.setActivePageHome({
			active: 3,
			activePageFirst: false,
			activePageSecond: false,
			activePageThird: true,
			activePageFourth: false,
			activePageFifth: false,
			title: 'Activity'
		})
	}

	handleActivePageFourth() {
		this.props.setActivePageHome({
			active: 4,
			activePageFirst: false,
			activePageSecond: false,
			activePageThird: false,
			activePageFourth: true,
			activePageFifth: false,
			title: 'Product'
		})
	}

	handleActivePageFifth() {
		this.props.setActivePageHome({
			active: 5,
			activePageFirst: false,
			activePageSecond: false,
			activePageThird: false,
			activePageFourth: false,
			activePageFifth: true,
			title: 'AG Club'
		})
	}

	render() {
		const { title } = this.props.activePageHome
		if (this.props.navigate.link === 'SubProduct') {
			this.props.navigation.navigate(
				this.props.navigate.link,
				this.props.navigate.data
			)
		} else if (this.props.navigate.link === 'AddCustomer') {
			this.props.navigation.navigate(
				this.props.navigate.link,
				this.props.navigate.data
			)
		} else if (this.props.navigate.link === 'Profile') {
			this.props.navigation.navigate(
				this.props.navigate.link,
				this.props.navigate.data
			)
		} else if (this.props.navigate.link === 'CustomerProfile') {
			this.props.navigation.navigate(
				this.props.navigate.link,
				this.props.navigate.data
			)
		} else if (this.props.navigate.link === 'Notifications') {
			this.props.navigation.navigate(this.props.navigate.link)
		} else if (this.props.navigate.link === 'NewEvent') {
			this.props.navigation.navigate(this.props.navigate.link)
		}
		return (
			<Container>
				<Header style={styles.header}>
					<Left />
					<Body>
						<Text style={styles.title}>{title}</Text>
					</Body>
					<Right>
						<Button transparent onPress={() => this.props.navigation.navigate('Calendar')}>
							<Icon name='calendar' />
						</Button>
					</Right>
				</Header>
				{this.props.sessionPersistance.id_check !== null && (
					<Header style={styles.headerCheckIn} hasTabs>
						<Left />
						<Body>
							<Text>Check In</Text>
						</Body>
						<Right />
					</Header>
				)}
				{this.renderContent()}
				<Footer style={styles.footerWrap}>
					<FooterTab>
						<Button
							vertical
							style={styles.button}
							active={this.props.activePageHome.activePageFirst}
							onPress={() => this.handleActivePageFirst()}>
							<Icon
								name="ios-ribbon"
								size={25}
								style={{
									color: this.props.activePageHome.activePageFirst
										? '#2d84f6'
										: '#000000'
								}}
							/>
							<Text
								style={[
									styles.footerText,
									{
										color: this.props.activePageHome.activePageFirst
											? '#2d84f6'
											: '#000000'
									}
								]}>
								ACHIEVEMENTS
							</Text>
						</Button>
						<Button
							vertical
							style={styles.button}
							active={this.props.activePageHome.activePageSecond}
							onPress={() => this.handleActivePageSecond()}>
							<Icon
								name="ios-people"
								size={25}
								style={{
									color: this.props.activePageHome.activePageSecond
										? '#2d84f6'
										: '#000000'
								}}
							/>
							<Text
								style={[
									styles.footerText,
									{
										color: this.props.activePageHome.activePageSecond
											? '#2d84f6'
											: '#000000'
									}
								]}>
								CUSTOMERS
							</Text>
						</Button>
						<Button
							vertical
							style={styles.button}
							active={this.props.activePageHome.activePageThird}
							onPress={() => this.handleActivePageThird()}>
							<Icon
								active
								name="md-pulse"
								size={25}
								style={{
									color: this.props.activePageHome.activePageThird
										? '#2d84f6'
										: '#000000'
								}}
							/>
							<Text
								style={[
									styles.footerText,
									{
										color: this.props.activePageHome.activePageThird
											? '#2d84f6'
											: '#000000'
									}
								]}>
								ACTIVITY
							</Text>
						</Button>
						<Button
							vertical
							style={styles.button}
							active={this.props.activePageHome.activePageFourth}
							onPress={() => this.handleActivePageFourth()}>
							<Icon
								name="ios-albums"
								size={25}
								style={{
									color: this.props.activePageHome.activePageFourth
										? '#2d84f6'
										: '#000000'
								}}
							/>
							<Text
								style={[
									styles.footerText,
									{
										color: this.props.activePageHome.activePageFourth
											? '#2d84f6'
											: '#000000'
									}
								]}>
								PRODUCT
							</Text>
						</Button>
						<Button
							vertical
							style={styles.button}
							active={this.props.activePageHome.activePageFifth}
							onPress={() => this.handleActivePageFifth()}>
							<Icon
								name="ios-star"
								size={25}
								style={{
									color: this.props.activePageHome.activePageFifth
										? '#2d84f6'
										: '#000000'
								}}
							/>
							<Text
								style={[
									styles.footerText,
									{
										color: this.props.activePageHome.activePageFifth
											? '#2d84f6'
											: '#000000'
									}
								]}>
								AG CLUB
							</Text>
						</Button>
					</FooterTab>
				</Footer>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	sessionPersistance: state.sessionPersistance,
	activePageHome: state.activePageHome,
	navigate: state.navigate
})

const mapDispatchToProps = dispatch => ({
	fetchUsers: accessToken => dispatch(fetchUsers(accessToken)),
	setActivePageHome: activePageHome =>
		dispatch(setActivePageHome(activePageHome))
})

const styles = StyleSheet.create({
	footerWrap: {
		height: 70
	},
	title: {
		fontWeight: 'bold'
	},
	headerCheckIn: {
		height: 50,
		backgroundColor: '#FFAB00'
	},
	footerText: {
		fontSize: 10,
		marginTop: 5
	},
	button: {
		backgroundColor: 'transparent'
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
