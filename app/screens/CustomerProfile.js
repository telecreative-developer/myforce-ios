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
	Picker,
	ListItem,
	Radio
} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import PipelineProgress from '../components/PipelineProgress'
import { fetchPicsWithIDCustomer } from '../actions/pics'
import { fetchPipelines, postPipeline, fetchPipelineProducts, updatePipeline } from '../actions/pipelines'
import image from '../assets/images/add.png'
import { isEmpty } from 'validator'
import { NavigationActions } from 'react-navigation'
import { setNavigate } from '../actions/processor'
import bg from '../assets/images/meeting.jpg'
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment'

const { height, width } = Dimensions.get('window')

class CustomerProfile extends Component {
	constructor() {
		super()

		this.state = {
			id_pic: '',
			isModalVisibleCart: false,
			isModalVisible: false,
			modalNewPipeline: false,
			isModalVisibleUpdate: false,
			modalPic: false,
			pipelineTabs: 'active',
			pipeline: '',
			totalPrice: 0,
			id_pipeline: '',
			step: '',
			rejectModal: false,
			rejectMessage: '',
			cartProducts: [
				{
					picture: 'http://www.nusacopy.com/images/a/produk/rental-fotocopy-warna.jpg',
					subproduct: 'Test'
				}
			],
			dataPic: {},
			pipelines:{},
			probability:'',
			project_type:'',
			statedrop:false,
			stateclose:false,
			stateactive:false,
			stateloose:false,

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
		await this.setState({ id_pic: this.props.picsCustomers[0].id_pic })
	}

	componentWillReceiveProps(props) {
		if (props.success.condition === true && props.success.process_on === 'POST_PIPELINE') {
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
					{this.props.sessionPersistance.checks[0] !== undefined &&
						(this.props.sessionPersistance.checks[0].id_customer ===
							this.props.navigation.state.params.id_customer && (
							<View style={styles.addPipeline}>
								<Button
									full
									style={styles.addPipelineDirection}
									onPress={() => this.setState({ modalNewPipeline: true })}>
									<Icon name="md-add" size={20} color={'#ffffff'} />
									<Text style={styles.addPipelineText}>Add Pipeline</Text>
								</Button>
							</View>
						))}
					<FlatList
						data={this.props.pipelines.filter(
							p => (p.step !== 7 && p.lose === false && p.drop === false) || (p.step === 7 && p.step_process === true)
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
						p => p.step === 7 && p.lose === false && p.step_process === false
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
		} else if (this.state.pipelineTabs === 'drop'){
			return (
				<FlatList 
					data={this.props.pipelines.filter(p => p.drop === true )}
					keyExtractor={this.key}
					renderItem={this.renderItemsDrop}
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

	async handleOpenOrderCart(id_pipeline, totalPrice) {
		const { accessToken } = await this.props.sessionPersistance
		await this.setState({ totalPrice, isModalVisibleCart: true })
		await this.props.fetchPipelineProducts(id_pipeline, accessToken)
	}

	handleUpdatePipeline(item){
		this.setState({isModalVisibleUpdate:true, pipelines: item, pipeline: item.pipeline})
	}

	async handeSaveUpdatePipeline(){
		await this.props.updatePipeline(
			{
				...this.state.pipelines, 
				pipeline: this.state.pipeline,
				probability: this.state.probability,
				close: this.state.stateclose,
				drop: this.state.statedrop,
				lose: this.state.stateloose,
				project_type: this.state.project_type,
			}, 
			this.props.sessionPersistance.accessToken)
		await this.setState({ pipeline: '', isModalVisibleUpdate:false })
	}

	setActive(){
		this.setState({
			stateactive: true,
			stateloose: false,
			statedrop: false,
			stateclose: false,
		})
	}

	setClose(){
		this.setState({
			stateactive: false,
			stateclose: true,
			statedrop: false,
			stateloose: false
		})
	}

	setDrope(){
		this.setState({
			stateactive: false,
			statedrop: true,
			stateclose: false,
			stateloose: false
		})
	}

	setLoose(){
		this.setState({
			stateactive: false,
			stateloose: true,
			stateclose: false,
			statedrop: false,
		})
	}

	setA(){
		this.setState({
			probability: "A"
		})
	}

	setB(){
		this.setState({
			probability: "B"
		})
	}

	setC(){
		this.setState({
			probability: "C"
		})
	}

	setProjectORS(){
		this.setState({
			project_type: 'ORS'
		})
	}

	setProjectRENT(){
		this.setState({
			project_type: 'RENT'
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
					<Text style={styles.titleModal}>Develop Criteria</Text>
				</View>
			)
		} else if (step === 4) {
			return (
				<View>
					<Text style={styles.step}>STEP 4</Text>
					<Text style={styles.titleModal}>Recommend Solution</Text>
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
		
		<TouchableOpacity style={styles.customerPipeline} onPress={()=> this.handleSetStep(item.step, item.id_pipeline)}>
			{console.log(item)}
			<View style={styles.pipelineContent}>
				<View style={styles.leftPipeline}>
					<View style={styles.pipelineTitleDirection}>
						<View style={styles.picDirection}>
							<Icon name="md-contact" size={18} color={'#000'} />
							{item.pics.map((data, index) => (
								<Text key={index} style={styles.dataPic}>
									{data.name}
								</Text>
							))}
						</View>
						<View style={styles.titleFlex}>
							<View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 15, left: 5}}>
								<Text style={{alignSelf: 'flex-start', fontSize: 16}}>Title : <Text style={{fontWeight: 'bold'}}>{item.pipeline}</Text></Text>
								<Text style={{alignSelf: 'center', fontSize: 16}}>Probability : <Text style={{fontWeight: 'bold'}}>{item.probability}</Text></Text>
								<Text style={{alignSelf: 'flex-end', fontSize: 16}}>Project Type : <Text style={{fontWeight: 'bold'}}>{item.project_type}</Text></Text>
							</View>
						</View>
					</View>
				</View>
				<View>
					{this.props.sessionPersistance.id === this.props.navigation.state.params.id ? (
						<PipelineProgress
							onPress={() =>
								this.handleCheckStepper(item.step, item.id_pipeline, item.step_process)
							}
							currentPosition={item.step - 1}
						/>
					) : (
						<PipelineProgress currentPosition={item.step - 1} />
					)}
				</View>
				<View
					style={{
						justifyContent: 'center',
						flexDirection: 'row',
						display: 'flex',
						width: '100%',
						paddingVertical: 20
					}}>
					{item.step >= 4 && (
						<Button
							small
							style={{ backgroundColor: '#2D38F9', height: 40 }}
							onPress={() => this.handleOpenOrderCart(item.id_pipeline, item.total)}>
							<Text style={{ fontSize: 14 }}>Order Summary</Text>
						</Button>
					)}
				</View>
				<View style={{margin: 10, flexDirection:'row', justifyContent: 'space-between'}}>
					<View>
						<Text>{moment(item.createdAt).format('LLL')}</Text>
					</View>
					<TouchableOpacity onPress={()=> this.handleUpdatePipeline(item)}>
						<Text style={{color: 'blue'}}>Edit</Text>
					</TouchableOpacity>
				</View>
				<View style={{ margin: 10, backgroundColor: '#20E6CD', width: 200 }}>
					{item.step_process && (
						<Text style={{padding: 10, textAlign: 'center', color: '#2a2a2a'}}>Waiting for approval</Text>
					)}
					{item.reject_status && (
						<TouchableOpacity
							onPress={() =>
								this.setState({ rejectModal: true, rejectMessage: item.reject_message })
							}>
							<Text>Rejected</Text>
						</TouchableOpacity>
					)}
				</View>
			</View>
		</TouchableOpacity>
	)

	renderItemsClose = ({ item }) => (
		<TouchableOpacity style={styles.customerPipeline} onPress={()=> this.handleSetStep(item.step, item.id_pipeline)} >
			<View style={styles.pipelineContent}>
				<View style={styles.leftPipeline}>
					<View style={styles.pipelineTitleDirection}>
						<View style={styles.picDirection}>
							<Icon name="md-contact" size={18} color={'#000'} />
							{item.pics.map((data, index) => (
								<Text key={index} style={styles.dataPic}>
									{data.name}
								</Text>
							))}
						</View>
						<View style={styles.titleFlex}>
							<View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 15, left: 5}}>
								<Text style={{alignSelf: 'flex-start', fontSize: 16}}>Title : <Text style={{fontWeight: 'bold'}}>{item.pipeline}</Text></Text>
								<Text style={{alignSelf: 'center', fontSize: 16}}>Probability : <Text style={{fontWeight: 'bold'}}>{item.probability}</Text></Text>
								<Text style={{alignSelf: 'flex-end', fontSize: 16}}>Project Type : <Text style={{fontWeight: 'bold'}}>{item.project_type}</Text></Text>
							</View>
						</View>
					</View>
				</View>
				<View>
					{this.props.sessionPersistance.id === this.props.navigation.state.params.id ? (
						<PipelineProgress
							onPress={() =>
								this.handleCheckStepper(item.step, item.id_pipeline, item.step_process)
							}
							currentPosition={item.step - 1}
						/>
					) : (
						<PipelineProgress currentPosition={item.step - 1} />
					)}
				</View>
				<View style={{margin: 10, flexDirection:'row', justifyContent: 'space-between'}}>
					<View>
						<Text>{moment(item.createdAt).format('LLL')}</Text>
					</View>
					<TouchableOpacity onPress={()=> this.handleUpdatePipeline(item)}>
						<Text style={{color: 'blue'}}>Edit</Text>
					</TouchableOpacity>
				</View>
				<Button full style={{ backgroundColor: '#2D38F9', margin: 10 }}>
					<Text style={{ fontSize: 16, textAlign: 'center' }}>Order Summary</Text>
				</Button>
			</View>
		</TouchableOpacity>
	)

	renderItemsLose = ({ item }) => (
		<TouchableOpacity style={styles.customerPipeline} onPress={()=> this.handleSetStep(item.step, item.id_pipeline)}>
			<View style={styles.pipelineContent}>
				<View style={styles.leftPipeline}>
					<View style={styles.pipelineTitleDirection}>
						<View style={styles.picDirection}>
							<Icon name="md-contact" size={18} color={'#000'} />
							{item.pics.map((data, index) => (
								<Text key={index} style={styles.dataPic}>
									{data.name}
								</Text>
							))}
						</View>
						<View style={styles.titleFlex}>
							<View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 15, left: 5}}>
								<Text style={{alignSelf: 'flex-start', fontSize: 16}}>Title : <Text style={{fontWeight: 'bold'}}>{item.pipeline}</Text></Text>
								<Text style={{alignSelf: 'center', fontSize: 16}}>Probability : <Text style={{fontWeight: 'bold'}}>{item.probability}</Text></Text>
								<Text style={{alignSelf: 'flex-end', fontSize: 16}}>Project Type : <Text style={{fontWeight: 'bold'}}>{item.project_type}</Text></Text>
							</View>
						</View>
					</View>
				</View>
				<View>
					{this.props.sessionPersistance.id === this.props.navigation.state.params.id ? (
						<PipelineProgress
							onPress={() =>
								this.handleCheckStepper(item.step, item.id_pipeline, item.step_process)
							}
							currentPosition={item.step - 1}
						/>
					) : (
						<PipelineProgress currentPosition={item.step - 1} />
					)}
				</View>
				<View style={{margin: 10, flexDirection:'row', justifyContent: 'space-between'}}>
					<View>
						<Text>{moment(item.createdAt).format('LLL')}</Text>
					</View>
					<TouchableOpacity onPress={()=> this.handleUpdatePipeline(item)}>
						<Text style={{color: 'blue'}}>Edit</Text>
					</TouchableOpacity>
				</View>
				<Button full style={{ backgroundColor: '#2D38F9', margin: 10 }}>
					<Text style={{ fontSize: 16, textAlign: 'center' }}>Order Summary</Text>
				</Button>
			</View>
		</TouchableOpacity>
	)

	renderItemsDrop = ({ item }) => (
		<TouchableOpacity style={styles.customerPipeline} onPress={()=> this.handleSetStep(item.step, item.id_pipeline)}>
			<View style={styles.pipelineContent}>
				<View style={styles.leftPipeline}>
					<View style={styles.pipelineTitleDirection}>
						<View style={styles.picDirection}>
							<Icon name="md-contact" size={18} color={'#000'} />
							{item.pics.map((data, index) => (
								<Text key={index} style={styles.dataPic}>
									{data.name}
								</Text>
							))}
						</View>
						<View style={styles.titleFlex}>
							<View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 15, left: 5}}>
								<Text style={{alignSelf: 'flex-start', fontSize: 16}}>Title : <Text style={{fontWeight: 'bold'}}>{item.pipeline}</Text></Text>
								<Text style={{alignSelf: 'center', fontSize: 16}}>Probability : <Text style={{fontWeight: 'bold'}}>{item.probability}</Text></Text>
								<Text style={{alignSelf: 'flex-end', fontSize: 16}}>Project Type : <Text style={{fontWeight: 'bold'}}>{item.project_type}</Text></Text>
							</View>
						</View>
					</View>
				</View>
				<View>
					{this.props.sessionPersistance.id === this.props.navigation.state.params.id ? (
						<PipelineProgress
							onPress={() =>
								this.handleCheckStepper(item.step, item.id_pipeline, item.step_process)
							}
							currentPosition={item.step - 1}
						/>
					) : (
						<PipelineProgress currentPosition={item.step - 1} />
					)}
				</View>
				<View style={{margin: 10, flexDirection:'row', justifyContent: 'space-between'}}>
					<View>
						<Text>{moment(item.createdAt).format('LLL')}</Text>
					</View>
					<TouchableOpacity onPress={()=> this.handleUpdatePipeline(item)}>
						<Text style={{color: 'blue'}}>Edit</Text>
					</TouchableOpacity>
				</View>
				<Button full style={{ backgroundColor: '#2D38F9', margin: 10 }}>
					<Text style={{ fontSize: 16, textAlign: 'center' }}>Order Summary</Text>
				</Button>
			</View>
		</TouchableOpacity>
	)

	renderItemsPic = ({ item }) => (
		<TouchableOpacity
			style={styles.headerDirection}
			onPress={() => this.setState({ modalPic: true, dataPic: item })}>
			<Icon name="md-contact" size={15} color={'#fff'} />
			<Text style={styles.data}>{item.name}</Text>
		</TouchableOpacity>
	)

	renderItemCart = ({ item }) => {
		return (
			<ImageBackground
				source={{ uri: item.subproducts[0].picture }}
				imageStyle={styles.cardImage}
				style={styles.itemCart}>
				<TouchableHighlight underlayColor={'transparent'}>
					<Text style={styles.itemText}>{item.subproducts[0].subproduct}</Text>
				</TouchableHighlight>
			</ImageBackground>
		)
	}

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
								<Button onPress={() => this.setState({ modalNewPipeline: false })}>
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

				<Modal isVisible={this.state.isModalVisibleUpdate}>
						<View style={styles.modalWrapperAddPipeline}>
							<Content>
								<View style={styles.imageModal}>
									<Image source={image} />
									<Text style={styles.pipelineModalText}>UPDATE PIPELINE</Text>
								</View>
								<View style={styles.formDirection}>
									<Form>
										<Item stackedLabel>
											<Label style={{color: 'blue', fontSize: 16}}>Pipeline Title</Label>
											<Input
												value={this.state.pipeline}
												onChangeText={pipeline => this.setState({ pipeline })}
											/>
										</Item>
										<View style={styles.productCategoryView}>
											<Label style={{color: 'blue'}}>PIC Name</Label>
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
										<View>
											<Text style={{paddingLeft: 10, color: 'blue'}}>Status Pipeline</Text>
											<View style={{paddingLeft: 15}}>
												<ListItem onPress={() => this.setActive()}>
													<Text>Active</Text>
													<Right>
														<Radio 
															selected={this.state.stateactive}
														/>
													</Right>
												</ListItem>
												<ListItem onPress={() => this.setClose()}>
													<Text>Close</Text>
													<Right>
														<Radio 
															selected={this.state.stateclose}
														/>
													</Right>
												</ListItem>
												<ListItem onPress={() => this.setDrope()}>
													<Text>Drope</Text>
													<Right>
														<Radio 
															selected={this.state.statedrop}
														/>
													</Right>
												</ListItem>
												<ListItem onPress={() => this.setLoose()}>
													<Text>Loose</Text>
													<Right>
														<Radio 
															selected={this.state.stateloose}
														/>
													</Right>
												</ListItem>
											</View>
											<View>
												<Text style={{paddingLeft: 10, paddingTop: 15, color: 'blue'}}>Probability</Text>
												<View style={{paddingLeft: 15}}>
													<ListItem onPress={() => this.setA()}>
														<Text>A</Text>
														<Right>
															<Radio 
																selected={this.state.probability === 'A' ? true : false}
															/>
														</Right>
													</ListItem>
													<ListItem onPress={() => this.setB()}>
														<Text>B</Text>
														<Right>
															<Radio 
																selected={this.state.probability === 'B' ? true : false}
															/>
														</Right>
													</ListItem>
													<ListItem onPress={() => this.setC()}>
														<Text>C</Text>
														<Right>
															<Radio 
																selected={this.state.probability === 'C' ? true : false}
															/>
														</Right>
													</ListItem>
												</View>
											</View>

											<View>
												<Text style={{paddingLeft: 10, paddingTop: 15, color: 'blue'}}>Project Type</Text>
												<View style={{paddingLeft: 15}}>
													<ListItem onPress={() => this.setProjectORS()}>
															<Text>ORS</Text>
															<Right>
																<Radio 
																	selected={this.state.project_type === 'ORS' ? true : false}
																/>
															</Right>
														</ListItem>
														<ListItem onPress={() => this.setProjectRENT()}>
															<Text>RENT</Text>
															<Right>
																<Radio 
																	selected={this.state.project_type === 'RENT' ? true : false}
																/>
															</Right>
														</ListItem>
												</View>
											</View>
										</View>
									</Form>
								</View>
							</Content>
							<Footer>
								<FooterTab>
									<Button onPress={() => this.setState({ isModalVisibleUpdate: false })}>
										<Text note style={styles.modalCancelButton}>
											Cancel
										</Text>
									</Button>
									<Button onPress={() => this.handeSaveUpdatePipeline()}>
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
									<Item floatingLabel style={{ borderColor: 'transparent' }}>
										<Label>PIC Name</Label>
										<Input value={this.state.dataPic.name} />
									</Item>
									<Item floatingLabel style={{ borderColor: 'transparent' }}>
										<Label>Job</Label>
										<Input value={this.state.dataPic.job} />
									</Item>
									<Item floatingLabel style={{ borderColor: 'transparent' }}>
										<Label>Phone Number</Label>
										<Input value={this.state.dataPic.phone} />
									</Item>
									<Item floatingLabel style={{ borderColor: 'transparent' }}>
										<Label>Email</Label>
										<Input value={this.state.dataPic.email} />
									</Item>
									<Item floatingLabel style={{ borderColor: 'transparent' }}>
										<Label>Address</Label>
										<Input
											multiline={true}
											value={this.state.dataPic.address}
											style={styles.picAddress}
										/>
									</Item>
								</Form>
							</View>
						</Content>
						<Footer>
							<FooterTab>
								<Button onPress={() => this.setState({ modalPic: false })}>
									<Text style={styles.modalYesButton}>OKE</Text>
								</Button>
							</FooterTab>
						</Footer>
					</View>
				</Modal>
				<Modal style={styles.modal} isVisible={this.state.isModalVisible}>
					<View style={styles.modalWrapper}>
						<View>
							<ImageBackground source={bg} imageStyle={styles.cardImage} style={styles.card}>
								{this.renderTextSellingProccess()}
							</ImageBackground>
						</View>
						<Footer>
							<FooterTab>
								<Button onPress={() => this.setState({ isModalVisible: false })}>
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
				<Modal
					isVisible={this.state.isModalVisibleCart}
					style={styles.modal}
					onBackdropPress={() => this.setState({ isModalVisibleCart: false })}>
					<View style={styles.cartContent}>
						<View
							style={{
								width: '100%',
								alignItems: 'flex-end',
								paddingHorizontal: 20,
								paddingTop: 10
							}}>
							<TouchableHighlight
								underlayColor={'transparent'}
								onPress={() => this.setState({ isModalVisibleCart: false })}>
								<Icon name="ios-close" size={35} />
							</TouchableHighlight>
						</View>
						<Text style={styles.modalTitle}>Order Cart</Text>
						<Text style={styles.modalTotal}>Total Item: {this.props.pipelineProducts.length}</Text>
						<View style={{ width: width / 1.3 }}>
							<Item stackedLabel style={styles.itemForm}>
								<Label style={styles.productCategory}>Total Price</Label>
								<Input disabled value={`Rp. ${JSON.stringify(this.state.totalPrice)}`} />
							</Item>
						</View>
						<View>
							<FlatList
								showsVerticalScrollIndicator={false}
								data={this.props.pipelineProducts}
								style={styles.container}
								keyExtractor={this.key}
								renderItem={this.renderItemCart}
							/>
						</View>
					</View>
				</Modal>
				<Modal isVisible={this.state.rejectModal}>
					<View style={styles.modalWrapperAddPipeline}>
						<View style={styles.imageModal}>
							<Text style={styles.pipelineModalText}>REJECTED INFO</Text>
						</View>
						<Content style={{ padding: 50 }}>
							<Text>{this.state.rejectMessage}</Text>
						</Content>
						<Footer>
							<FooterTab>
								<Button onPress={() => this.setState({ rejectModal: false })}>
									<Text style={styles.modalYesButton}>OKE</Text>
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
								<View style={{ backgroundColor: 'transparent' }}>
									<TouchableHighlight underlayColor={'transparent'}>
										<H3 style={styles.headerDirectionTitle}>{state.params.name}</H3>
									</TouchableHighlight>
									<View style={styles.headerDirection}>
										<Icon name="md-pin" size={15} color={'#fff'} />
										<Text style={styles.dataAddress}>{state.params.address}</Text>
									</View>
									<Text
										style={{
											fontSize: 16,
											color: '#fff',
											fontWeight: 'bold',
											paddingTop: 15,
											paddingLeft: 20
										}}>
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
									<Icon name="md-add" size={13} color={'#fff'}/>
									<Text style={styles.dataAddPic}>Add More PIC</Text>
								</TouchableOpacity> */}
								</View>
							</View>
						</LinearGradient>
					</View>
					<View style={styles.customerTotal}>
						<Grid style={{ display: 'flex', alignItems: 'center' }}>
							<Col>
								<TouchableOpacity onPress={() => this.setState({ pipelineTabs: 'active' })}>
									<H1 style={styles.totalText}>
										{JSON.stringify(
											this.props.pipelines.filter(
												p =>
													(p.step !== 7 && p.lose === false && p.drop === false) ||
													(p.step === 7 && p.step_process === true)
											).length
										)}
									</H1>
									<Text style={styles.totalText}>ACTIVE</Text>
								</TouchableOpacity>
							</Col>
							<Col>
								<TouchableOpacity onPress={() => this.setState({ pipelineTabs: 'close' })}>
									<H1 style={styles.totalText}>
										{JSON.stringify(
											this.props.pipelines.filter(
												p => p.step === 7 && p.lose === false && p.step_process === false
											).length
										)}
									</H1>
									<Text style={styles.totalText}>CLOSE</Text>
								</TouchableOpacity>
							</Col>
							<Col>
								<TouchableOpacity onPress={() => this.setState({ pipelineTabs: 'lose' })}>
									<H1 style={styles.totalText}>
										{JSON.stringify(
											this.props.pipelines.filter(p => p.lose === true).length)}
									</H1>
									<Text style={styles.totalText}>LOSE</Text>
								</TouchableOpacity>
							</Col>
							<Col>
								<TouchableOpacity onPress={() => this.setState({ pipelineTabs: 'drop' })}>
									<H1 style={styles.totalText}>
										{JSON.stringify(
											this.props.pipelines.filter(p => p.drop === true).length)}
									</H1>
									<Text style={styles.totalText}>DROP</Text>
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
	success: state.success,
	pipelineProducts: state.pipelineProducts
})

const mapDispatchToProps = dispatch => {
	return {
		setNavigate: (link, data) => dispatch(setNavigate(link, data)),
		fetchPipelines: (id_customer, accessToken) =>
			dispatch(fetchPipelines(id_customer, accessToken)),
		postPipeline: (data, accessToken) => dispatch(postPipeline(data, accessToken)),
		fetchPicsWithIDCustomer: (id, accessToken) =>
			dispatch(fetchPicsWithIDCustomer(id, accessToken)),
		fetchPipelineProducts: (id_pipeline, accessToken) =>
			dispatch(fetchPipelineProducts(id_pipeline, accessToken)),
		updatePipeline: (item , accessToken) => dispatch(updatePipeline(item, accessToken))
	}
}

const styles = StyleSheet.create({
	productCategoryView: {
		marginLeft: 15,
		marginTop: 30,
		paddingBottom: 10
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
		marginLeft: 3,
		paddingBottom: 20
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
		paddingVertical: 20
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
		fontWeight: 'bold',
		color: '#fff',
		marginLeft: 20
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
		flexDirection: 'row',
		marginTop: 10
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
		marginLeft: 5,
		color: '#000'
	},
	dataAddress: {
		fontSize: 14,
		color: '#fff',
		marginLeft: 5,
		maxWidth: width / 1.5
	},
	dataAddPic: {
		fontSize: 12,
		color: '#fff',
		marginLeft: 5
	},
	titleFlex: {
		alignItems: 'center'
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
		padding: 30,
		alignItems: 'center'
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
		flexDirection: 'row',
	},
	titleFlex: {
		flex: 0.8
	},
	badgeFlex: {
		flex: 0.2,
		backgroundColor: '#20E6CD',
		width:100,
		borderRadius: 5
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
	},
	cartContent: {
		width: '100%',
		height: '100%',
		flex: 1,
		backgroundColor: '#ffffff',
		margin: 0,
		alignItems: 'center',
		overflow: 'hidden'
	},
	modalTitle: {
		fontSize: 28,
		fontWeight: 'bold'
	},
	modalTotal: {
		fontSize: 22,
		marginTop: 5
	},
	container: {
		flex: 1,
		marginTop: 20,
		marginBottom: 40
	},
	itemCart: {
		backgroundColor: '#000000',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		marginBottom: 10,
		paddingHorizontal: 20,
		height: Dimensions.get('window').width / 4,
		width: width / 1.3
	},
	itemText: {
		color: '#fff',
		textAlign: 'center',
		backgroundColor: 'transparent'
	},
	cardFooterCart: {
		position: 'absolute',
		bottom: 0,
		height: '25%',
		backgroundColor: 'transparent'
	},
	cardButtonCart: {
		backgroundColor: '#ff6961',
		width: '100%',
		height: '100%',
		flexDirection: 'row',
		borderRadius: 0
	},
	itemForm: {
		marginTop: 20,
		marginLeft: 0,
		marginBottom: 20
	},
	productCategory: {
		fontSize: 18,
		color: '#696969'
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerProfile)
