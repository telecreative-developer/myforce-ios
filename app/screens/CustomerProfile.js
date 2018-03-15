import React, { Component } from 'react'
import {
	StyleSheet,
	Dimensions,
	View,
	TouchableOpacity,
	Image,
	ImageBackground,
	FlatList,
	TouchableHighlight,
	Alert
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
	Grid,
	Col,
	Footer,
	FooterTab,
	Thumbnail,
	Button,
	Form,
	Item,
	Input,
	Label,
	Badge,
	Picker
} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import PipelineProgress from '../components/PipelineProgress'
import { fetchPicsWithIDCustomer } from '../actions/pics'
import {
	fetchPipelines,
	postPipeline,
	fetchPipelinesRealtime
} from '../actions/pipelines'
import image from '../assets/images/add.png'
import { isEmpty } from 'validator'
import { NavigationActions } from 'react-navigation'
import { setNavigate } from '../actions/processor'
import bg from '../assets/images/meeting.jpg'
import LinearGradient from 'react-native-linear-gradient'

const { height, width } = Dimensions.get('window')

class CustomerProfile extends Component {
	constructor() {
		super()

		this.state = {
			id_pic: '',
			isModalVisible: false,
			modalNewPipeline: false,
			modalPic: false,
			pipelineTabs: 'active',
			pipeline: '',
			id_pipeline: '',
			step: ''
		}
	}

	async componentWillMount() {
		await this.props.fetchPipelines(
			this.props.navigation.state.params.id_customer,
			this.props.sessionPersistance.accessToken
		)
		await this.props.fetchPicsWithIDCustomer(
			this.props.navigation.state.params.id_customer,
			this.props.sessionPersistance.accessToken
		)
		await this.props.fetchPipelinesRealtime(
			this.props.navigation.state.params.id_customer,
			this.props.sessionPersistance.accessToken
		)
		await this.setState({ id_pic: this.props.picsCustomers[0].id_pic })
	}

	componentWillReceiveProps(props) {
		if (
			props.success.condition === true &&
			props.success.process_on === 'POST_PIPELINE'
		) {
			Alert.alert('Success Add Pipeline', 'Your pipeline has been added')
		}
	}

	async handleSubmitPipeline() {
		if (!isEmpty(this.state.pipeline)) {
			await this.setState({ modalNewPipeline: false })
			await this.props.postPipeline(
				{
					pipeline: this.state.pipeline,
					id_customer: this.props.navigation.state.params.id_customer,
					id_pic: this.state.id_pic,
					id: this.props.sessionPersistance.id,
					id_branch: this.props.sessionPersistance.id_branch
				},
				this.props.sessionPersistance.accessToken
			)
			await this.setState({ pipeline: '' })
		}
	}

	handleCheckStepper(step, id_pipeline, in_process) {
		if (in_process) {
			Alert.alert(
				'Pipeline in Progress',
				'Please wait a confirmation from your manager to take the next step'
			)
		} else {
			this.handleSetStep(step, id_pipeline)
		}
	}

	renderPipelineTabs() {
		if (this.state.pipelineTabs === 'active') {
			return (
				<View>
					{this.props.sessionPersistance.id ===
						this.props.navigation.state.params.id && (
						<View style={styles.addPipeline}>
							<Button
								full
								style={styles.addPipelineDirection}
								onPress={() => this.setState({ modalNewPipeline: true })}>
								<Icon name="md-add" size={20} color={'#ffffff'} />
								<Text style={styles.addPipelineText}>Add Pipeline</Text>
							</Button>
						</View>
					)}
					<FlatList
						data={this.props.pipelines.filter(
							p => p.step !== 7 && p.lose === false
						)}
						keyExtractor={this.key}
						renderItem={this.renderItemsActive}
					/>
				</View>
			)
		} else if (this.state.pipelineTabs === 'close') {
			return (
				<FlatList
					data={this.props.pipelines.filter(
						p => p.step === 7 && p.lose === false
					)}
					keyExtractor={this.key}
					renderItem={this.renderItemsClose}
				/>
			)
		} else if (this.state.pipelineTabs === 'lose') {
			return (
				<FlatList
					data={this.props.pipelines.filter(p => p.lose === true)}
					keyExtractor={this.key}
					renderItem={this.renderItemsLose}
				/>
			)
		}
	}

	key = (item, index) => index

	handleBackButton() {
		this.props.setNavigate('')
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: 'Home' })]
		})
		this.props.navigation.dispatch(resetAction)
	}

	handleSetStep(step, id_pipeline) {
		this.setState({ isModalVisible: true, step, id_pipeline })
	}

	confirmToNextStep() {
		this.setState({ isModalVisible: false })
		this.props.navigation.navigate('Stepper', {
			step: this.state.step,
			id_pipeline: this.state.id_pipeline,
			id_customer: this.props.navigation.state.params.id_customer
		})
	}

	renderTextSellingProccess() {
		const { step } = this.state
		if (step === 1) {
			return (
				<View>
					<Text style={styles.step}>STEP 1</Text>
					<Text style={styles.titleModal}>Identify Opportunities</Text>
				</View>
			)
		} else if (step === 2) {
			return (
				<View>
					<Text style={styles.step}>STEP 2</Text>
					<Text style={styles.titleModal}>Clarify Needs</Text>
				</View>
			)
		} else if (step === 3) {
			return (
				<View>
					<Text style={styles.step}>STEP 3</Text>
					<Text style={styles.titleModal}>IDENTIFY OPPORTUNITIES</Text>
				</View>
			)
		} else if (step === 4) {
			return (
				<View>
					<Text style={styles.step}>STEP 4</Text>
					<Text style={styles.titleModal}>Develop Criteria</Text>
				</View>
			)
		} else if (step === 5) {
			return (
				<View>
					<Text style={styles.step}>STEP 5</Text>
					<Text style={styles.titleModal}>Gain Commitment</Text>
				</View>
			)
		} else if (step === 6) {
			return (
				<View>
					<Text style={styles.step}>STEP 6</Text>
					<Text style={styles.titleModal}>Manage Implementation</Text>
				</View>
			)
		}
	}

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
						<Icon name="md-contact" size={18} color={'#000'}/>
						{item.pics.map((data, index) => (
							<Text key={index} style={styles.data}>
								{data.name}
							</Text>
						))}
					</View>
				</View>
				<View>
					{this.props.sessionPersistance.id ===
					this.props.navigation.state.params.id ? (
						<PipelineProgress
							onPress={() =>
								this.handleCheckStepper(
									item.step,
									item.id_pipeline,
									item.step_process
								)
							}
							currentPosition={item.step - 1}
						/>
					) : (
						<PipelineProgress currentPosition={item.step - 1} />
					)}
				</View>
				<View style={{justifyContent: 'center', flexDirection: 'row', display: 'flex', width: '100%', paddingVertical: 20}}>
					<Button small style={{backgroundColor: '#2D38F9', height: 40 }}>
						<Text style={{fontSize: 14}}>Order Summary</Text>
					</Button>
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
						{item.pics.map((data, index) => (
							<Text key={index} style={styles.data}>
								{data.name}
							</Text>
						))}
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
									<Text>In progress</Text>
								</Badge>
							)}
						</View>
					</View>
					<View style={styles.picDirection}>
						{item.pics.map((data, index) => (
							<Text key={index} style={styles.data}>
								{data.name}
							</Text>
						))}
					</View>
				</View>
				<View>
					<PipelineProgress currentPosition={item.step - 1} />
				</View>
			</View>
		</View>
	)

	renderItemsPic = ({ item }) => (
		<TouchableOpacity style={styles.headerDirection}>
			<Icon name="md-contact" size={15} color={'#fff'}/>
			<Text style={styles.data}>{item.name}</Text>
		</TouchableOpacity>
	)

	render() {
		const { navigate, goBack, state } = this.props.navigation
		return (
			<Container>
				<Modal isVisible={this.state.modalNewPipeline}>
					<View style={styles.modalWrapperAddPipeline}>
						<View style={styles.imageModal}>
							<Image source={image} />
							<Text style={styles.pipelineModalText}>ADD NEW PIPELINE</Text>
						</View>
						<View style={styles.formDirection}>
							<Form>
								<Item floatingLabel>
									<Label>Pipeline Title</Label>
									<Input
										value={this.state.pipeline}
										onChangeText={pipeline => this.setState({ pipeline })}
									/>
								</Item>
								<View style={styles.productCategoryView}>
									<Label>PIC Name</Label>
									<Picker
										style={styles.picker}
										mode="dropdown"
										iosHeader="PIC Name"
										selectedValue={this.state.id_pic}
										onValueChange={id_pic => this.setState({ id_pic })}>
										{this.props.picsCustomers.map((data, index) => (
											<Item key={index} label={data.name} value={data.id_pic} />
										))}
									</Picker>
								</View>
							</Form>
						</View>
						<Footer>
							<FooterTab>
								<Button
									onPress={() => this.setState({ modalNewPipeline: false })}>
									<Text note style={styles.modalCancelButton}>
										Cancel
									</Text>
								</Button>
								<Button onPress={() => this.handleSubmitPipeline()}>
									<Text style={styles.modalYesButton}>Submit</Text>
								</Button>
							</FooterTab>
						</Footer>
					</View>
				</Modal>
				<Modal isVisible={this.state.modalPic}>
					<View style={styles.modalWrapperAddPipeline}>
						<View style={styles.imageModal}>
							<Text style={styles.pipelineModalText}>PIC INFO</Text>
						</View>
						<Content>
							<View style={styles.formPicDirection}>
								<Form>
									<Item floatingLabel>
										<Label>PIC Name</Label>
										<Input value="Rizaldi Halim" />
									</Item>
									<Item floatingLabel>
										<Label>Job</Label>
										<Input value="Branch Manager" />
									</Item>
									<Item floatingLabel>
										<Label>Phone Number</Label>
										<Input value="+62 859 8006 4003" />
									</Item>
									<Item floatingLabel>
										<Label>Email</Label>
										<Input value="nando@gmail.com" />
									</Item>
									<Item floatingLabel>
										<Label>Address</Label>
										<Input
											multiline={true}
											value="JL. Pegangsaan 2, Jakarta Utara"
											style={styles.picAddress}
										/>
									</Item>
								</Form>
							</View>
						</Content>
						<Footer>
							<FooterTab>
								<Button onPress={() => this.setState({ modalPic: false })}>
									<Text note style={styles.modalCancelButton}>
										Cancel
									</Text>
								</Button>
								<Button onPress={() => this.setState({ modalPic: false })}>
									<Text style={styles.modalYesButton}>Save Changes</Text>
								</Button>
							</FooterTab>
						</Footer>
					</View>
				</Modal>
				<Modal style={styles.modal} isVisible={this.state.isModalVisible}>
					<View style={styles.modalWrapper}>
						<View>
							<ImageBackground
								source={bg}
								imageStyle={styles.cardImage}
								style={styles.card}>
								{this.renderTextSellingProccess()}
							</ImageBackground>
						</View>
						<Footer>
							<FooterTab>
								<Button
									onPress={() => this.setState({ isModalVisible: false })}>
									<Text note style={styles.modalCancelButton}>
										Cancel
									</Text>
								</Button>
								<Button onPress={() => this.confirmToNextStep()}>
									<Text style={styles.modalYesButton}>Take the next step.</Text>
								</Button>
							</FooterTab>
						</Footer>
					</View>
				</Modal>
				<Header style={styles.header}>
					<Left style={{ flexDirection: 'row' }}>
						<Button transparent onPress={() => this.handleBackButton()}>
							<Icon name="ios-arrow-back" size={25} color="#000000" />
							<Text style={{ fontSize: 18, color: '#000000' }}>Back</Text>
						</Button>
					</Left>
					<Body>
						<Text style={styles.title}>CUSTOMER PROFILE</Text>
					</Body>
					<Right />
				</Header>
				<Content style={styles.content} showsVerticalScrollIndicator={false}>
					<View style={styles.customerHeader}>
					<LinearGradient
						start={{ x: 0.0, y: 0.25 }}
						end={{ x: 1.5, y: 1 }}
						locations={[0, 0.5, 0.6]}
						colors={['#20E6CD', '#2D38F9', '#2D38F9']}
						style={styles.linearGradient}>
						<View style={styles.headerDirectionTitle}>
							<View style={{backgroundColor: 'transparent'}}>
								<TouchableHighlight underlayColor={'transparent'}>
									<H3 style={styles.headerDirectionTitle}>
										{state.params.name}
									</H3>
								</TouchableHighlight>
								<View style={styles.headerDirection}>
									<Icon name="md-pin" size={15} />
									<Text style={styles.dataAddress}>{state.params.address}</Text>
								</View>
								<Text style={{ fontSize: 12, paddingTop: 15, paddingLeft: 20 }}>
									PIC List:
								</Text>
								<FlatList
									data={this.props.picsCustomers}
									keyExtractor={this.key}
									renderItem={this.renderItemsPic}
								/>
								{/* <TouchableOpacity
									style={styles.headerDirection}
									onPress={() => navigate('ChoosePic')}>
									<Icon name="md-add" size={15} color={'#2D38F9'}/>
									<Text style={styles.dataAddPic}>Add More PIC</Text>
								</TouchableOpacity> */}
							</View>
						</View>
						</LinearGradient>
					</View>
					<View style={styles.customerTotal}>
						<Grid style={{ display: 'flex', alignItems: 'center' }}>
							<Col>
								<TouchableOpacity
									onPress={() => this.setState({ pipelineTabs: 'active' })}>
									<H1 style={styles.totalText}>
										{JSON.stringify(
											this.props.pipelines.filter(p => p.step !== 7).length
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
											this.props.pipelines.filter(
												p => p.step === 7 && p.lose === false
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
											this.props.pipelines.filter(p => p.lose === true).length
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
	pipelines: state.pipelines,
	sessionPersistance: state.sessionPersistance,
	picsCustomers: state.picsCustomers,
	success: state.success
})

const mapDispatchToProps = dispatch => {
	return {
		setNavigate: (link, data) => dispatch(setNavigate(link, data)),
		fetchPipelines: (id, accessToken) =>
			dispatch(fetchPipelines(id, accessToken)),
		fetchPipelinesRealtime: (id, accessToken) =>
			dispatch(fetchPipelinesRealtime(id, accessToken)),
		postPipeline: (data, accessToken) =>
			dispatch(postPipeline(data, accessToken)),
		fetchPicsWithIDCustomer: (id, accessToken) =>
			dispatch(fetchPicsWithIDCustomer(id, accessToken))
	}
}

const styles = StyleSheet.create({
	productCategoryView: {
		marginLeft: 15,
		marginTop: 30
	},
	picker: {
		marginLeft: -15
	},
	card: {
		display: 'flex',
		width: width / 1.2,
		justifyContent: 'center',
		flex: 1,
		backgroundColor: '#000000'
	},
	cardImage: {
		opacity: 0.5
	},
	header: {
		height: 70
	},
	title: {
		fontWeight: 'bold'
	},
	content: {
		paddingRight: 40,
		paddingLeft: 40,
		paddingBottom: 40,
		paddingTop: 20
	},
	footerWrap: {
		height: 70
	},
	footerText: {
		fontSize: 10,
		marginTop: 5
	},
	newsWrapper: {
		width: '100%',
		height: height / 8,
		backgroundColor: '#2d3ad2',
		paddingLeft: 40,
		paddingRight: 40,
		marginBottom: 20,
		display: 'flex',
		justifyContent: 'center'
	},
	picDirection: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: 5,
		marginLeft: 3
	},
	newsTitle: {
		color: '#ffffff',
		fontWeight: 'bold',
		fontSize: 14
	},
	closeIcon: {
		textAlign: 'right'
	},
	newsText: {
		fontSize: 12,
		color: '#ffffff',
		textAlign: 'left',
		marginBottom: 10
	},
	readMore: {
		color: '#ffffff',
		fontWeight: 'bold',
		fontSize: 12,
		textAlign: 'right'
	},
	newsDirection: {
		display: 'flex',
		flexDirection: 'row',
		marginBottom: 10
	},
	customerHeader: {
		backgroundColor: '#ffffff',
		width: '100%',
		height: 'auto',
		justifyContent: 'center'
	},
	linearGradient: {
		width: '100%',
		height: 'auto',
		paddingVertical: 20,
	},
	headerDirection: {
		display: 'flex',
		flexDirection: 'row',
		marginLeft: 20,
		marginTop: 10
	},
	headerDirectionTitle: {
		display: 'flex',
		flexDirection: 'row',
		marginLeft: 20,
		color: '#fff',
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
		minHeight: height / 5,
		height: 'auto',
		backgroundColor: '#ffffff',
		marginBottom: '2%',
		flex: 1,
		display: 'flex',
		flexDirection: 'row'
	},
	addPipeline: {
		marginTop: '1%',
		marginBottom: '1%',
		display: 'flex'
	},
	addPipelineText: {
		fontWeight: 'bold',
		fontSize: 18,
		marginLeft: 10
	},
	addPipelineDirection: {
		flexDirection: 'row',
		backgroundColor: '#2D38F9',
		height: 60
	},
	lastVisited: {
		textAlign: 'right',
		fontSize: 10
	},
	data: {
		fontSize: 14,
		color: '#fff',
		marginLeft: 5
	},
	dataPic: {
		fontSize: 16,
		marginLeft: 5
	},
	dataAddress: {
		fontSize: 14,
		color: '#fff',
		marginLeft: 5,
		maxWidth: width / 1.5
	},
	dataAddPic: {
		fontSize: 12,
		color: '#2D38F9',
		marginLeft: 5
	},
	titleFlex: {
		display: 'flex',
		justifyContent: 'flex-start'
	},
	iconFlex: {
		flex: 1,
		display: 'flex',
		justifyContent: 'flex-end'
	},
	modal: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	modalWrapper: {
		width: width / 1.2,
		height: height / 3,
		backgroundColor: '#ffffff',
		borderRadius: 5,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	modalWrapperAddPipeline: {
		width: width / 1.1,
		height: height / 1.9,
		backgroundColor: '#ffffff',
		borderRadius: 5,
		display: 'flex'
	},
	pipelineModalText: {
		marginTop: 20,
		fontSize: 18
	},
	imageModal: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 20,
		flexDirection: 'column'
	},
	modalCancelButton: {
		fontSize: 16
	},
	modalYesButton: {
		fontSize: 16,
		fontWeight: 'bold',
		backgroundColor: 'transparent'
	},
	pipelineContent: {
		flex: 1
	},
	leftPipeline: {
		padding: 30
	},
	formDirection: {
		flex: 1,
		paddingHorizontal: 30
	},
	formPicDirection: {
		flex: 1,
		paddingHorizontal: 30
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
	rowDirection: {
		display: 'flex',
		flexDirection: 'row'
	},
	picAddress: {
		borderRadius: 0,
		height: 50
	},
	step: {
		fontSize: 35,
		fontWeight: '900',
		color: '#20E6CD',
		fontStyle: 'italic',
		textAlign: 'center',
		backgroundColor: 'transparent'
	},
	titleModal: {
		fontSize: 35,
		fontWeight: '900',
		color: '#ffffff',
		fontStyle: 'italic',
		textAlign: 'center',
		backgroundColor: 'transparent'
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerProfile)
