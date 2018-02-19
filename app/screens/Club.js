import React, { Component } from 'react'
import {
	StyleSheet,
	TouchableOpacity,
	TouchableHighlight,
	Dimensions,
	FlatList,
	TouchableNativeFeedback
} from 'react-native'
import {
	Container,
	Content,
	Header,
	Left,
	Body,
	Right,
	Thumbnail,
	Text,
	View,
	H1,
	H2,
	H3,
	Grid,
	Col
} from 'native-base'
import { connect } from 'react-redux'
import moment from 'moment'
import Icon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import HorizontalJoker from '../components/HorizontalJokerTeam'
import { fetchUsers } from '../actions/users'
import { fetchTeamUpdatesWithBranch } from '../actions/updates'
import defaultAvatar from '../assets/images/default-avatar.png'

const { height, width } = Dimensions.get('window')

class Club extends Component {
	constructor() {
		super()

		this.state = {
			isModalVisible: false
		}
	}

	componentWillMount() {
		const { sessionPersistance } = this.props
		this.props.fetchTeamUpdatesWithBranch(sessionPersistance.id_branch, sessionPersistance.accessToken)
	}

	key = (item, index) => index

	renderItems = ({ item }) => (
		<TouchableOpacity>
			<HorizontalJoker
				name={item.users[0].first_name}
				company={item.customers[0].name}
				pipeline={item.pipelines[0].pipeline}
				avatar={item.users[0].avatar}
				step={item.pipelines[0].step} />
		</TouchableOpacity>
	)

	renderItemUsers = ({ item, index }) => (
		<View
			style={{
				display: 'flex',
				flexDirection: 'row',
				marginTop: 30,
				alignItems: 'center'
			}}>
			<Text style={{ fontSize: 16, fontWeight: 'bold', marginRight: 15 }}>
				{index + 1}
			</Text>
			{item.avatar === '' ? (
				<Thumbnail small source={defaultAvatar} style={{ marginRight: 10 }} />
			) : (
				<Thumbnail
					small
					source={{ uri: item.avatar }}
					style={{ marginRight: 10 }}
				/>
			)}
			<View>
				<Text style={{ fontSize: 16, fontWeight: 'bold' }}>{`${
					item.first_name
				} ${item.last_name}`}</Text>
				<Text style={{ fontSize: 14 }}>
					{JSON.stringify(item.point)} Points
				</Text>
			</View>
		</View>
	)

	render() {
		return (
			<Container>
				<Header style={styles.header}>
					<Left />
					<Body>
						<Text style={styles.title}>AG CLUB</Text>
					</Body>
					<Right>
						<TouchableOpacity>
							<Icon name="ios-notifications" size={25} />
						</TouchableOpacity>
					</Right>
				</Header>
				<View style={styles.customerHeader}>
					<LinearGradient
						colors={['#ee8084', '#dc6cbe']}
						style={styles.linearGradient}>
						<Grid>
							<Col style={styles.leftCol}>
								<View style={styles.headerDirection}>
									{this.props.sessionPersistance.avatar === '' ? (
										<Thumbnail rounded large source={defaultAvatar} />
									) : (
										<Thumbnail
											rounded
											large
											source={{
												uri: this.props.sessionPersistance.avatar
											}}
										/>
									)}
									<View>
										<TouchableOpacity>
											<H3 style={styles.profileName}>{`${
												this.props.sessionPersistance.first_name
											} ${this.props.sessionPersistance.last_name}`}</H3>
										</TouchableOpacity>
										<View style={styles.headerDirection}>
											<Text style={styles.Data}>
												{this.props.sessionPersistance.bio}
											</Text>
										</View>
										<View style={styles.headerDirection}>
											<Text style={styles.Data}>20 Pipeline Created</Text>
										</View>
									</View>
								</View>
							</Col>
							<Col style={styles.rightCol}>
								<Text style={styles.periodeText}>Year of Periode</Text>
								<H1 style={styles.year}>{moment().format('YYYY')}</H1>
							</Col>
						</Grid>
					</LinearGradient>
				</View>
				<View style={styles.content}>
					<View style={styles.boardDirection}>
						<View style={styles.leaderboard}>
							<Text style={styles.leaderboardTitle}>
								{this.props.sessionPersistance.regionals[0].region} Leaderboard
							</Text>
							<FlatList
								data={this.props.users.filter(u => u.id_region === this.props.sessionPersistance.regionals[0].id_region).slice(0, 5)}
								keyExtractor={this.key}
								renderItem={this.renderItemUsers} />
							{/* <TouchableOpacity>
								<Text style={styles.see}>See Complete Table</Text>
							</TouchableOpacity> */}
						</View>
						<View style={styles.leaderboard}>
							<Text style={styles.leaderboardTitle}>National Leaderboard</Text>
							<FlatList
								data={this.props.users.slice(0, 5)}
								keyExtractor={this.key}
								renderItem={this.renderItemUsers}
							/>
							{/* <TouchableOpacity>
								<Text style={styles.see}>See Complete Table</Text>
							</TouchableOpacity> */}
						</View>
					</View>
					<View style={styles.team}>
						<Text style={styles.teamUpdate}>Team Updates</Text>
						<FlatList
							horizontal={true}
							showsHorizontalScrollIndicator={false}
							data={this.props.teamUpdatesWithBranch}
							keyExtractor={this.key}
							renderItem={this.renderItems} />
					</View>
				</View>
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return {
		users: state.users,
		teamUpdatesWithBranch: state.teamUpdatesWithBranch,
		sessionPersistance: state.sessionPersistance
	}
}

const mapDispatchToProps = dispatch => ({
	fetchTeamUpdatesWithBranch: (id_branch, accessToken) => dispatch(fetchTeamUpdatesWithBranch(id_branch, accessToken)),
})

const styles = StyleSheet.create({
	header: {
		height: 70
	},
	title: {
		fontWeight: 'bold'
	},
	boardDirection: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	customerHeader: {
		backgroundColor: '#ffffff',
		width: '100%',
		height: height / 7.6
	},
	headerDirection: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: 5,
		marginLeft: 25
	},
	profileName: {
		marginTop: 5,
		marginLeft: 25,
		color: '#ffffff',
		backgroundColor: 'transparent'
	},
	totalText: {
		textAlign: 'center',
		color: '#ffffff',
		margin: 3
	},
	Data: {
		fontSize: 14,
		color: '#ffffff',
		backgroundColor: 'transparent'
	},
	linearGradient: {
		flex: 1,
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		padding: 20
	},
	year: {
		color: '#ffffff',
		fontSize: 32,
		fontWeight: '900',
		backgroundColor: 'transparent',
		marginTop: 5,
		textAlign: 'center'
	},
	periodeText: {
		fontSize: 14,
		backgroundColor: 'transparent',
		color: '#ffffff',
		textAlign: 'center'
	},
	leaderboard: {
		backgroundColor: '#ffffff',
		width: width / 2.1,
		height: height / 2.2,
		marginHorizontal: 5,
		padding: 20
	},
	leaderboardTitle: {
		fontSize: 18,
		fontWeight: '800',
		color: '#181818',
		marginBottom: 10
	},
	teamUpdate: {
		fontSize: 18,
		fontWeight: '800',
		color: '#181818',
		marginBottom: 20,
		marginTop: 10
	},
	team: {
		backgroundColor: '#ffffff',
		width: '100%',
		height: height / 4.5,
		padding: 20,
		marginTop: 15,
		display: 'flex',
		justifyContent: 'center'
	},
	see: {
		textAlign: 'right',
		fontSize: 12
	},
	leftCol: {
		flex: 0.8
	},
	rightCol: {
		flex: 0.2,
		display: 'flex',
		justifyContent: 'center'
	},
	content: {
		padding: 15
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Club)
