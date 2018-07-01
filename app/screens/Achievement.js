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
import PieCharts from '../components/PieCharts'
import AnimatedBar from 'react-native-animated-bar'
import { setNavigate } from '../actions/processor'
import { accounting } from 'accounting'

const { height, width } = Dimensions.get('window')

class Achievements extends Component {
	constructor() {
		super()

		this.state = {
			pipelineTabs: 'active',
			progress: 40
		}
	}

	resultCompleteRevenueMonth() {
		let revenueMonth = 0
		this.props.pipelinesWithUserId
			.filter(
				data => data.month === parseInt(moment().format('M')) && data.step === 7 && data.role === 'SALLES'
			)
			.map(data => (revenueMonth += data.total))
		return revenueMonth
	}

	resultCompleteRevenueYear() {
		let revenueYear = 0
		this.props.pipelinesWithUserId
			.filter(
				data =>
					data.year === parseInt(moment().format('YYYY')) && data.step === 7 && data.role === 'SALLES'
			)
			.map(data => (revenueYear += data.total))
		return revenueYear
	}

	resultCompletePipelineRevenueMonth(){
		let pipelineRevenueMonth = 0
		this.props.pipelinesWithUserId
			.filter(
				data =>
					data.month === parseInt(moment().format('M')) &&
					data.probability === 'S' || data.probability === 'A' || data.probability === 'B' && 
					data.role === 'SALLES'
			)
			.map(data => (pipelineRevenueMonth += data.total))
		return pipelineRevenueMonth
	}

	renderPipelineTabs() {
		if (this.state.pipelineTabs === 'active') {
			return (
				<View>
					<FlatList
						data={this.props.pipelinesWithUserId.filter(
							p => p.step !== 7 && p.lose === false && p.role === 'SALLES'
						)}
						keyExtractor={this.key}
						renderItem={this.renderItemsActive}
					/>
				</View>
			)
		} else if (this.state.pipelineTabs === 'close') {
			return (
				<View>
					<FlatList
						data={this.props.pipelinesWithUserId.filter(
							p => p.step === 7 && p.lose === false && p.role === 'SALLES'
						)}
						keyExtractor={this.key}
						renderItem={this.renderItemsClose}
					/>
				</View>
			)
		} else if (this.state.pipelineTabs === 'lose') {
			return (
				<View>
					<FlatList
						data={this.props.pipelinesWithUserId.filter(p => p.lose === true &&
									p.role === 'SALLES'
						)}
						keyExtractor={this.key}
						renderItem={this.renderItemsLose}
					/>
				</View>
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
									<Text>Waiting for approval</Text>
								</Badge>
							)}
						</View>
					</View>
					<View style={styles.picDirection}>
						<Icon name="md-contact" size={18} />
						<View>
							{item.pics.map((data, index) => (
								<Text key={index} style={styles.data}>
									{data.name}
								</Text>
							))}
						</View>
					</View>
				</View>
				<View>
					<PipelineProgress currentPosition={item.step - 1} />
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
									<Text>Waiting for approval</Text>
								</Badge>
							)}
						</View>
					</View>
					<View>
						<Icon name="md-contact" size={18} />
						<View style={styles.picDirection}>
							{item.pics.map((data, index) => (
								<Text key={index} style={styles.data}>
									{data.name}
								</Text>
							))}
						</View>
					</View>
				</View>
				<View>
					<PipelineProgress currentPosition={item.step - 1} />
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
									<Text>Waiting for approval</Text>
								</Badge>
							)}
						</View>
					</View>
					<View style={styles.picDirection}>
						<Icon name="md-contact" size={18} />
						<View>
							{item.pics.map((data, index) => (
								<Text key={index} style={styles.data}>
									{data.name}
								</Text>
							))}
						</View>
					</View>
				</View>
				<View>
					<PipelineProgress currentPosition={item.step - 1} />
				</View>
			</View>
		</View>
	)

	render() {
		console.log('isi data :' , this.props.pipelinesWithUserId)
		return (
			<Container>
				<View style={styles.customerHeader}>
					<LinearGradient
						start={{ x: 0.0, y: 0.25 }}
						end={{ x: 1.5, y: 1 }}
						locations={[0, 0.6]}
						colors={['#20E6CD', '#2D38F9']}
						style={styles.linearGradient}>
						<Grid>
							<Col style={styles.leftCol}>
								<View style={styles.headerDirection}>
									{this.props.sessionPersistance.avatar === '' ||
									this.props.sessionPersistance.avatar === null ? (
										<Thumbnail rounded large source={defaultAvatar} />
									) : (
										<Thumbnail
											rounded
											large
											source={{ uri: this.props.sessionPersistance.avatar }}
										/>
									)}
									<View style={{ justifyContent: 'center' }}>
										<TouchableOpacity
											onPress={() => this.props.setNavigate('Profile')}>
											<H3 style={styles.profileName}>{`${
												this.props.sessionPersistance.first_name
											} ${this.props.sessionPersistance.last_name}`}</H3>
										</TouchableOpacity>
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
					<Grid style={styles.chartsDirection}>
						<Col style={styles.leftCharts}>
							<PieCharts
								target={this.props.target.target_month}
								completed={
									this.props.pipelinesWithUserId.filter(
										data =>
											data.month === parseInt(moment().format('M')) &&
											data.step === 7 && 
											data.role === 'SALLES'
									).length
								}
							/>
						</Col>
						<Col style={styles.rightCharts}>
							<Text style={styles.chartTitle}>Gross In</Text>
							<Text style={styles.chartMonth}>Monthly</Text>
							<Text style={styles.chartPercentage}>
								{parseFloat(
									parseFloat(
										this.props.pipelinesWithUserId.filter(
											data =>
												data.month === parseInt(moment().format('M')) &&
												data.step === 7 && 
												data.role === 'SALLES'
										).length / this.props.target.target_month
									) * 100
								).toFixed(2)} %
							</Text>
							<Text style={styles.chartTargetUnder}>
								{this.props.pipelinesWithUserId.filter(
										data =>
											data.month === parseInt(moment().format('M')) &&
											data.step === 7 && 
											data.role === 'SALLES'
									).length
								} of {this.props.target.target_month} unit targets
							</Text>
							<Text style={styles.chartYear}>Yearly</Text>
							<AnimatedBar
								progress={parseFloat(
									parseFloat(
										parseFloat(
											this.props.pipelinesWithUserId.filter(
												data =>
													data.year === parseInt(moment().format('YYYY')) &&
													data.step === 7 && 
													data.role === 'SALLES'
											).length / this.props.target.target_year
										) * 100
									).toFixed(2) / 100
								)}
								style={styles.bar}
								height={40}
								borderColor="#DDD"
								barColor="tomato"
								fillColor="grey"
								borderRadius={5}
								borderWidth={5}>
								<View style={styles.row}>
									<Text style={styles.barText}>
										{parseFloat(
											parseFloat(
												this.props.pipelinesWithUserId.filter(
													data =>
														data.year === parseInt(moment().format('YYYY')) &&
														data.step === 7 && 
														data.role === 'SALLES'
												).length / this.props.target.target_year
											) * 100
										).toFixed(2)} %
									</Text>
								</View>
							</AnimatedBar>
							<Text style={styles.chartTarget}>
								{
									this.props.pipelinesWithUserId.filter(
										data =>
											data.year === parseInt(moment().format('YYYY')) &&
											data.step === 7 && 
											data.role === 'SALLES'
									).length
								} of {this.props.target.target_year} unit targets
							</Text>
						</Col>
					</Grid>
					<Grid style={styles.chartsDirection}>
						<Col style={styles.leftCharts}>
							<PieCharts
								target={this.props.target.target_revenue_month}
								completed={
									this.resultCompleteRevenueMonth()} />
						</Col>
						<Col style={styles.rightCharts}>
							<Text style={styles.chartTitle}>Revenue ORS</Text>
							<Text style={styles.chartMonth}>Monthly</Text>
							<Text style={styles.chartPercentage}>
								{parseFloat(
									parseFloat(
										this.resultCompleteRevenueMonth() / this.props.target.target_revenue_month
									) * 100
								).toFixed(2)} %
							</Text>
							<Text style={styles.chartTarget}>
								{accounting.formatMoney(this.resultCompleteRevenueMonth())} of
							</Text>
							<Text style={styles.chartTargetUnder}>
								{accounting.formatMoney(this.props.target.target_revenue_month)} targets
							</Text>
							<Text style={styles.chartYear}>Yearly</Text>
							<AnimatedBar
								progress={parseFloat(
									parseFloat(
										parseFloat(
											this.resultCompleteRevenueYear() / this.props.target.target_revenue_year
										) * 100
									).toFixed(2) / 100
								)}
								style={styles.bar}
								height={40}
								borderColor="#DDD"
								barColor="tomato"
								fillColor="grey"
								borderRadius={5}
								borderWidth={5}>
								<View style={styles.row}>
									<Text style={styles.barText}>
										{parseFloat(
											parseFloat(this.resultCompleteRevenueYear() / this.props.target.target_revenue_year
											) * 100
										).toFixed(2)} %
									</Text>
								</View>
							</AnimatedBar>
							<Text style={styles.chartTarget}>
								{accounting.formatMoney(this.resultCompleteRevenueYear())} of
							</Text>
							<Text style={styles.chartTarget}>
								{accounting.formatMoney(this.props.target.target_revenue_year)} targets
							</Text>
						</Col>
					</Grid>

					<Grid style={styles.chartsDirection}>
						<Col style={styles.leftCharts}>
							<PieCharts
								target={this.props.target.target_month}
								completed={
									this.props.pipelinesWithUserId.filter(
										data =>
											data.month === parseInt(moment().format('M')) &&
											data.probability === 'S' || data.probability === 'A' || data.probability === 'B'
											&& data.role === 'SALLES'
									).length
								}
							/>
						</Col>
						<Col style={styles.rightCharts}>
							<Text style={styles.chartTitle}>Pipeline Gross In</Text>
							<Text style={styles.chartMonth}>Monthly</Text>
							<Text style={styles.chartPercentage}>
								{parseFloat(
									parseFloat(
										this.props.pipelinesWithUserId.filter(
											data =>
												data.month === parseInt(moment().format('M')) &&
												data.probability === 'S' || data.probability === 'A' || data.probability === 'B'
												&& data.role === 'SALLES'
										).length / this.props.target.target_pipeline_month
									) * 100
								).toFixed(2)} %
							</Text>
							<Text style={styles.chartTargetUnder}>
								{this.props.pipelinesWithUserId.filter(
										data =>
											data.month === parseInt(moment().format('M')) &&
											data.probability === 'S' || data.probability === 'A' || data.probability === 'B'
											&& data.role === 'SALLES'
									).length
								} of {this.props.target.target_pipeline_month} unit targets
							</Text>
						</Col>
					</Grid>

					<Grid style={styles.chartsDirection}>
						<Col style={styles.leftCharts}>
							<PieCharts
								target={this.props.target.target_pipeline_revenue_month}
								completed={
									this.resultCompletePipelineRevenueMonth()
								}
							/>
						</Col>
						<Col style={styles.rightCharts}>
							<Text style={styles.chartTitle}>Pipeline Revenue ORS</Text>
							<Text style={styles.chartMonth}>Yearly</Text>
							<Text style={styles.chartPercentage}>
								{parseFloat(
									parseFloat(
										this.resultCompletePipelineRevenueMonth() / this.props.target.target_pipeline_revenue_month
									) * 100
								).toFixed(2)} %
							</Text>
							<Text style={styles.chartTargetUnder}>
								 {accounting.formatMoney(this.resultCompletePipelineRevenueMonth())} of
								 {accounting.formatMoney(this.props.target.target_pipeline_revenue_month)} targets
							</Text>
						</Col>
					</Grid>

					<View style={styles.customerTotal}>
						<Grid style={{ display: 'flex', alignItems: 'center' }}>
							<Col>
								<TouchableOpacity
									onPress={() => this.setState({ pipelineTabs: 'active' })}>
									<H1 style={styles.totalText}>
										{JSON.stringify(
											this.props.pipelinesWithUserId.filter(
												p => p.step !== 7 && p.lose === false &&
												p.role === 'SALLES'
											).length
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
											this.props.pipelinesWithUserId.filter(
												p => p.step === 7 && p.lose === false &&
												p.role === 'SALLES'
											).length
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
											this.props.pipelinesWithUserId.filter(
												p => p.lose === true && 
												p.role === 'SALLES'
											).length
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
	target: state.target,
	sessionPersistance: state.sessionPersistance,
	pipelinesWithUserId: state.pipelinesWithUserId
})

const mapDispatchToProps = dispatch => ({
	setNavigate: (link, data) => dispatch(setNavigate(link, data))
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
		fontWeight: 'bold',
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
		fontSize: 16,
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
		height: height / 3,
		backgroundColor: '#fff',
		marginBottom: 10
	},
	leftCharts: {
		flex: 0.5
	},
	rightCharts: {
		flex: 0.5,
		justifyContent: 'center'
	},
	bar: {
		width: width / 2.5,
		marginVertical: 10
	},
	barText: {
		fontSize: 18,
		backgroundColor: 'transparent',
		color: '#FFF',
		textAlign: 'center'
	},
	row: {
		display: 'flex',
		flex: 1,
		justifyContent: 'center'
	},
	chartTitle: {
		fontSize: 26,
		fontWeight: '900',
		marginBottom: 15
	},
	chartMonth: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	chartPercentage: {
		fontSize: 34,
		fontWeight: 'bold',
		color: '#e87e04'
	},
	chartTarget: {
		fontSize: 18,
	},
	chartTargetUnder: {
		fontSize: 18,
		marginBottom: 15
	},
	chartYear: {
		fontSize: 20,
		fontWeight: 'bold'
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
		fontSize: 16,
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
		fontSize: 16,
		marginLeft: 5,
		color: '#000'
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Achievements)
