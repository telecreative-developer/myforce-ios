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
import { setNavigate } from '../actions/processor'
import { fetchPoints } from '../actions/points'
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
		this.props.fetchTeamUpdatesWithBranch(
			sessionPersistance.id_branch,
			sessionPersistance.accessToken
		)
		this.props.fetchPoints(sessionPersistance.accessToken)
	}

	key = (item, index) => index

	renderItems = ({ item }) => (
		<TouchableOpacity
			onPress={() =>
				this.props.setNavigate('CustomerProfile', item.customers[0])
			}>
			<HorizontalJoker
				name={item.users[0].first_name}
				company={item.customers[0].name}
				pipeline={item.pipelines[0].pipeline}
				avatar={item.users[0].avatar}
				step={item.pipelines[0].step}
			/>
		</TouchableOpacity>
	)

	renderItemsRank = ({ item, index }) => (
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
			{item.users[0].avatar === '' || item.users[0].avatar === null ? (
				<Thumbnail small source={defaultAvatar} style={{ marginRight: 10 }} />
			) : (
				<Thumbnail
					small
					source={{ uri: item.users[0].avatar }}
					style={{ marginRight: 10 }}
				/>
			)}
			<View>
				<Text style={{ fontSize: 16, fontWeight: 'bold' }}>{`${
					item.users[0].first_name
				} ${item.users[0].last_name}`}</Text>
				<Text style={{ fontSize: 14 }}>
					{JSON.stringify(item.point)} Points
				</Text>
			</View>
		</View>
	)

	render() {
		const { sessionPersistance } = this.props
		return (
			<Container>
				<View style={styles.customerHeader}>
					<LinearGradient
						start={{ x: 0.0, y: 0.25 }}
						end={{ x: 1.5, y: 1 }}
						locations={[0, 0.5, 0.6]}
						colors={['#ee8084', '#dc6cbe', '#dc6cbe']}
						style={styles.linearGradient}>
						<Grid>
							<Col style={styles.leftCol}>
								<View style={styles.headerDirection}>
									{sessionPersistance.avatar === '' ? (
										<Thumbnail rounded large source={defaultAvatar} />
									) : (
										<Thumbnail
											rounded
											large
											source={{ uri: sessionPersistance.avatar }}
										/>
									)}
									<View style={{ justifyContent: 'center' }}>
										<TouchableOpacity
											onPress={() => this.props.setNavigate('Profile')}>
											<H3 style={styles.profileName}>{`${
												sessionPersistance.first_name
											} ${sessionPersistance.last_name}`}</H3>
										</TouchableOpacity>
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
								{this.props.sessionPersistance.branches[0].branch} Leaderboard
							</Text>
							<FlatList
								data={this.props.points
									.filter(d => d.id_branch === sessionPersistance.id_branch)
									.sort((a, b) => a.point - b.point)
									.slice(0, 5)
									.reverse()}
								keyExtractor={this.key}
								renderItem={this.renderItemsRank}
							/>
						</View>
						<View style={styles.leaderboard}>
							<Text style={styles.leaderboardTitle}>National Leaderboard</Text>
							<FlatList
								data={this.props.points
									.sort((a, b) => a.point - b.point)
									.slice(0, 5)
									.reverse()}
								keyExtractor={this.key}
								renderItem={this.renderItemsRank}
							/>
						</View>
					</View>
					<View style={styles.team}>
						<Text style={styles.teamUpdate}>Team Updates</Text>
						<FlatList
							horizontal={true}
							showsHorizontalScrollIndicator={false}
							data={this.props.teamUpdatesWithBranch}
							keyExtractor={this.key}
							renderItem={this.renderItems}
						/>
					</View>
				</View>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	teamUpdatesWithBranch: state.teamUpdatesWithBranch,
	sessionPersistance: state.sessionPersistance,
	points: state.points
})

const mapDispatchToProps = dispatch => ({
	setNavigate: (link, data) => dispatch(setNavigate(link, data)),
	fetchPoints: accessToken => dispatch(fetchPoints(accessToken)),
	fetchTeamUpdatesWithBranch: (id_branch, accessToken) =>
		dispatch(fetchTeamUpdatesWithBranch(id_branch, accessToken))
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
		fontWeight: 'bold',
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
		fontSize: 16,
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
