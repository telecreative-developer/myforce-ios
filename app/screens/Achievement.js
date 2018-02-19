import React, { Component } from 'react'
import {
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	FlatList
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
	Col,
	Badge
} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import PipelineProgress from '../components/PipelineProgress'
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment'
import defaultAvatar from '../assets/images/default-avatar.png'

const { height, width } = Dimensions.get('window')

class Achievements extends Component {
	constructor() {
		super()

		this.state = {
			pipelineTabs: 'active'
		}
	}
	renderPipelineTabs() {
		if (this.state.pipelineTabs === 'active') {
			return (
				<View>
					<FlatList
						data={this.props.pipelinesWithUserId.filter(p => p.step !== 7 && p.lose === false)}
						keyExtractor={this.key}
						renderItem={this.renderItemsActive} />
				</View>
			)
		} else if (this.state.pipelineTabs === 'close') {
			return (
				<FlatList
					data={this.props.pipelinesWithUserId.filter(p => p.step === 7 && p.lose === false)}
					keyExtractor={this.key}
					renderItem={this.renderItemsClose} />
			)
		} else if (this.state.pipelineTabs === 'lose') {
			return (
				<FlatList
					data={this.props.pipelinesWithUserId.filter(p => p.lose === true)}
					keyExtractor={this.key}
					renderItem={this.renderItemsLose} />
			)
		}
	}

	key = (item, index) => index

	renderItemsActive = ({ item }) => (
		<View style={styles.customerPipeline}>
			<View style={styles.pipelineContent}>
				<View style={styles.leftPipeline}>
					<View style={styles.pipelineTitleDirection}>
						<View style={styles.titleFlex}>
							<H2>{item.pipeline}</H2>
						</View>
						<View style={styles.badgeFlex}>
							{item.step_process && (
								<Badge style={styles.pipelineBadgeNew}>
									<Text>In progress</Text>
								</Badge>
							)}
						</View>
					</View>
					<View style={styles.picDirection}>
						<Icon name="md-contact" size={15} />
						<View style={styles.picDirection}>
							{item.pics.map((data, index) => (
								<Text key={index} style={styles.data}>{data.name}</Text>
							))}
						</View>
					</View>
				</View>
				<View>
					<PipelineProgress currentPosition={item.step-1} />
				</View>
			</View>
		</View>
	)

	renderItemsClose = ({ item }) => (
		<View style={styles.customerPipeline}>
			<View style={styles.pipelineContent}>
				<View style={styles.leftPipeline}>
					<View style={styles.pipelineTitleDirection}>
						<View style={styles.titleFlex}>
							<H2>{item.pipeline}</H2>
						</View>
						<View style={styles.badgeFlex}>
							{item.step_process && (
								<Badge style={styles.pipelineBadgeNew}>
									<Text>In progress</Text>
								</Badge>
							)}
						</View>
					</View>
					<View style={styles.picDirection}>
						<Icon name="md-contact" size={15} />
						<View style={styles.picDirection}>
							{item.pics.map((data, index) => (
								<Text key={index} style={styles.data}>{data.name}</Text>
							))}
						</View>
					</View>
				</View>
				<View>
					<PipelineProgress currentPosition={item.step-1} />
				</View>
			</View>
		</View>
	)

	renderItemsLose = ({ item }) => (
		<View style={styles.customerPipeline}>
			<View style={styles.pipelineContent}>
				<View style={styles.leftPipeline}>
					<View style={styles.pipelineTitleDirection}>
						<View style={styles.titleFlex}>
							<H2>{item.pipeline}</H2>
						</View>
						<View style={styles.badgeFlex}>
							{item.step_process && (
								<Badge style={styles.pipelineBadgeNew}>
									<Text>In progress</Text>
								</Badge>
							)}
						</View>
					</View>
					<View style={styles.picDirection}>
						<Icon name="md-contact" size={15} />
						<View style={styles.picDirection}>
							{item.pics.map((data, index) => (
								<Text key={index} style={styles.data}>{data.name}</Text>
							))}
						</View>
					</View>
				</View>
				<View>
					<PipelineProgress currentPosition={item.step-1} />
				</View>
			</View>
		</View>
	)

	render() {
		return (
			<Container>
				<Header style={styles.header}>
					<Left />
					<Body>
						<Text style={styles.title}>ACHIEVEMENTS</Text>
					</Body>
					<Right>
						<TouchableOpacity>
							<Icon name="ios-notifications" size={25} />
						</TouchableOpacity>
					</Right>
				</Header>
				<View style={styles.customerHeader}>
					<LinearGradient
						colors={['#20E6CD', '#2D38F9']}
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
											<Text style={styles.dataBio}>
												{this.props.sessionPersistance.bio}
											</Text>
										</View>
										<View style={styles.headerDirection}>
											<Text style={styles.dataPipeline}>
												{this.props.pipelinesWithUserId.length} Pipeline Created
											</Text>
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
				<Content style={styles.content}>
					<View style={styles.chartsDirection}>
						<View style={styles.leftCharts} />
						<View style={styles.rightCharts} />
					</View>
					<View style={styles.customerTotal}>
						<Grid style={{ display: 'flex', alignItems: 'center' }}>
							<Col>
								<TouchableOpacity
									onPress={() => this.setState({ pipelineTabs: 'active' })}>
									<H1 style={styles.totalText}>
										{JSON.stringify(
											this.props.pipelinesWithUserId.filter(p => p.step !== 7 && p.lose === false).length
										)}
									</H1>
									<Text style={styles.totalText}>ACTIVE</Text>
								</TouchableOpacity>
							</Col>
							<Col>
								<TouchableOpacity
									onPress={() => this.setState({ pipelineTabs: 'close' })}>
									<H1 style={styles.totalText}>
										{JSON.stringify(
											this.props.pipelinesWithUserId.filter(p => p.step === 7 && p.lose === false).length
										)}
									</H1>
									<Text style={styles.totalText}>CLOSE</Text>
								</TouchableOpacity>
							</Col>
							<Col>
								<TouchableOpacity
									onPress={() => this.setState({ pipelineTabs: 'lose' })}>
									<H1 style={styles.totalText}>
										{JSON.stringify(
											this.props.pipelinesWithUserId.filter(p => p.lose === true).length
										)}
									</H1>
									<Text style={styles.totalText}>LOSE</Text>
								</TouchableOpacity>
							</Col>
						</Grid>
					</View>
					{this.renderPipelineTabs()}
				</Content>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	sessionPersistance: state.sessionPersistance,
	pipelinesWithUserId: state.pipelinesWithUserId
})

const mapDispatchToProps = dispatch => ({
	fetchPipelinesWithUserId: (id, accessToken) => dispatch(fetchPipelinesWithUserId(id, accessToken))
})

const styles = StyleSheet.create({
	header: {
		height: 70
	},
	title: {
		fontWeight: 'bold'
	},
	customerHeader: {
		backgroundColor: '#ffffff',
		width: '100%',
		height: height / 7.6,
		marginBottom: 15
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
	customerTotal: {
		width: '100%',
		height: height / 10,
		backgroundColor: '#4a4a4a',
		display: 'flex',
		flexDirection: 'row'
	},
	totalText: {
		textAlign: 'center',
		color: '#ffffff',
		margin: 3
	},
	dataBio: {
		fontSize: 14,
		color: '#ffffff',
		backgroundColor: 'transparent'
	},
	dataPipeline: {
		fontSize: 14,
		color: '#ffffff',
		backgroundColor: 'transparent'
	},
	dataPic: {
		fontSize: 14,
		color: '#181818'
	},
	content: {
		paddingHorizontal: 15
	},
	chartsDirection: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		paddingBottom: 15
	},
	customerTotal: {
		width: '100%',
		height: height / 10,
		backgroundColor: '#4a4a4a',
		display: 'flex',
		flexDirection: 'row'
	},
	totalText: {
		textAlign: 'center',
		color: '#ffffff',
		margin: 3,
		fontSize: 14
	},
	customerPipeline: {
		width: '100%',
		height: height / 5,
		backgroundColor: '#ffffff',
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
		marginTop: 15
	},
	picDirection: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: 5,
		marginLeft: 3
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
	leftCol: {
		flex: 0.8
	},
	rightCol: {
		flex: 0.2,
		display: 'flex',
		justifyContent: 'center'
	},
	leftCharts: {
		backgroundColor: '#ffffff',
		width: width / 2.1,
		height: height / 4,
		marginRight: 10
	},
	rightCharts: {
		backgroundColor: '#ffffff',
		width: width / 2.1,
		height: height / 4
	},
	progressView: {
		flex: 1
	},
	progressContent: {
		padding: 30
	},
	addPipeline: {
		width: '100%',
		height: height / 5,
		backgroundColor: '#ffffff',
		marginTop: '2%',
		marginBottom: '10%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	customerPipeline: {
		width: '100%',
		height: height / 5,
		backgroundColor: '#ffffff',
		marginBottom: '2%',
		flex: 1,
		display: 'flex',
		flexDirection: 'row'
	},
	pipelineContent: {
		flex: 1
	},
	leftPipeline: {
		padding: 30
	},
	pipelineBadgeNew: {
		backgroundColor: '#20E6CD',
		marginLeft: 15
	},
	pipelineBadgeProduct: {
		backgroundColor: '#20E6CD',
		marginLeft: 15
	},
	pipelineTitleDirection: {
		flexDirection: 'row'
	},
	titleFlex: {
		flex: 0.8
	},
	badgeFlex: {
		flex: 0.2
	},
	picDirection: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: 5,
		marginLeft: 3
	},
	data: {
		fontSize: 12,
		color: '#181818',
		marginLeft: 5
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Achievements)
