import React, { Component } from 'react'
import {
	Dimensions,
	StyleSheet,
	ImageBackground,
	View,
	TouchableOpacity,
	Image,
	ScrollView
} from 'react-native'
import {
	Container,
	Text,
	Header,
	Left,
	Button,
	H3,
	Form,
	Item,
	Footer,
	FooterTab,
	ListItem,
	Body,
	Textarea,
	Label,
	CheckBox,
	Spinner,
	Icon
} from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { NavigationActions } from 'react-navigation'
import bg from '../assets/images/meeting.jpg'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { fetchQuestionWithStep } from '../actions/questions'
import { postAnswer } from '../actions/answers'
import { sendProductsOnCart } from '../actions/cart'

const { width, height } = Dimensions.get('window')

class QuestionPage extends Component {
	constructor() {
		super()

		this.state = {
			visibleModalMainQuestion: false,
			visibleModalActivityDesc: false,
			visibleModalMinusOfMeeting: false,
			visibleModalTodoList: false,
			answer: '',
			activity_desc: '',
			minus_of_meeting: '',
			todo_list: ''
		}
	}

	componentWillReceiveProps(props) {
		if (
			props.loading.condition === false &&
			props.loading.process_on === 'LOADING_POST_ANSWER' &&
			props.success.condition === true &&
			props.success.process_on === 'SUCCESS_POST_ANSWER'
		) {
			const resetAction = NavigationActions.reset({
				index: 0,
				actions: [
					NavigationActions.navigate({
						routeName: 'CustomerProfile',
						params: props.success.payload
					})
				]
			})
			props.navigation.dispatch(resetAction)
			this.setState({ isModalVisible: false })
		}
	}

	async componentWillMount() {
		const { params } = await this.props.navigation.state
		const { sessionPersistance } = await this.props
		await this.props.fetchQuestionWithStep(
			params.step,
			sessionPersistance.accessToken
		)
	}

	handlePostAnswer() {
		const { answer, activity_desc, minus_of_meeting, todo_list } = this.state
		const {
			step,
			id_pipeline,
			id_customer,
			total
		} = this.props.navigation.state.params
		const { questionWithStep, cartProducts } = this.props
		const { id, id_branch, accessToken } = this.props.sessionPersistance
		if (step === 4) {
			cartProducts.forEach(data => {
				this.props.sendProductsOnCart(
					{
						id_pipeline,
						id_customer,
						id,
						id_branch,
						total,
						id_product: data.id_product,
						id_subproduct: data.id_subproduct
					},
					accessToken
				)
			})
			this.props.postAnswer(
				{
					answer,
					activity_desc,
					minus_of_meeting,
					todo_list,
					step,
					id_customer,
					id_pipeline,
					id,
					id_question: questionWithStep.id_question
				},
				accessToken
			)
		} else {
			this.props.postAnswer(
				{
					answer,
					activity_desc,
					minus_of_meeting,
					todo_list,
					step,
					id_customer,
					id_pipeline,
					id,
					id_question: questionWithStep.id_question
				},
				accessToken
			)
		}
	}

	render() {
		const { navigate, goBack } = this.props.navigation
		const { sessionPersistance, questionWithStep, loading } = this.props
		return (
			<Container>
				<Modal style={styles.modal} isVisible={this.state.visibleModalMainQuestion}>
					<View style={styles.viewName}>
						<Text style={styles.textName}>Hello, {sessionPersistance.first_name}!</Text>
					</View>
					<View style={styles.viewQuestion}>
						<Text style={styles.textQuestion}>{questionWithStep.question}</Text>
					</View>
					<Form style={styles.form}>
						<Textarea rowSpan={8} bordered placeholder="Masukan jawaban Anda disini" value={this.state.answer} onChangeText={(answer) => this.setState({answer})} />
          </Form>
					<View style={styles.containerButtonModal}>
						<View style={styles.viewButtonModal}>
							<Button block danger style={styles.buttonModalLeft} onPress={() => this.setState({visibleModalMainQuestion: false})}>
								<Text>Cancel</Text>
							</Button>
						</View>
						<View style={styles.viewButtonModal}>
							{this.state.answer ? (
								<Button block primary style={styles.buttonModalRight} onPress={() => this.setState({visibleModalMainQuestion: false})}>
									<Text>Save</Text>
								</Button>
							) : (
								<Button block style={[styles.buttonModalRight, {backgroundColor: '#999999'}]}>
									<Text>Save</Text>
								</Button>
							)}
						</View>
					</View>
				</Modal>
				<Modal style={styles.modal} isVisible={this.state.visibleModalActivityDesc}>
					<View style={styles.viewName}>
						<Text style={styles.textName}>Hello, {sessionPersistance.first_name}!</Text>
					</View>
					<View style={styles.viewQuestion}>
						<Text style={styles.textQuestion}>Deskripsikan aktivitas anda pada kolom dibawah</Text>
					</View>
					<Form style={styles.form}>
						<Textarea rowSpan={8} bordered placeholder="Masukan deskripsi Anda disini" value={this.state.activity_desc} onChangeText={(activity_desc) => this.setState({activity_desc})} />
          </Form>
					<View style={styles.containerButtonModal}>
						<View style={styles.viewButtonModal}>
							<Button block danger style={styles.buttonModalLeft} onPress={() => this.setState({visibleModalActivityDesc: false})}>
								<Text>Cancel</Text>
							</Button>
						</View>
						<View style={styles.viewButtonModal}>
							{this.state.activity_desc ? (
								<Button block primary style={styles.buttonModalRight} onPress={() => this.setState({visibleModalActivityDesc: false})}>
									<Text>Save</Text>
								</Button>
							) : (
								<Button block style={[styles.buttonModalRight, {backgroundColor: '#999999'}]}>
									<Text>Save</Text>
								</Button>
							)}
						</View>
					</View>
				</Modal>
				<Modal style={styles.modal} isVisible={this.state.visibleModalMinusOfMeeting}>
					<View style={styles.viewName}>
						<Text style={styles.textName}>Hello, {sessionPersistance.first_name}!</Text>
					</View>
					<View style={styles.viewQuestion}>
						<Text style={styles.textQuestion}>Isi kolom dibawah</Text>
					</View>
					<Form style={styles.form}>
						<Textarea rowSpan={8} bordered placeholder="Isi jawaban disini" value={this.state.minus_of_meeting} onChangeText={(minus_of_meeting) => this.setState({minus_of_meeting})} />
          </Form>
					<View style={styles.containerButtonModal}>
						<View style={styles.viewButtonModal}>
							<Button block danger style={styles.buttonModalLeft} onPress={() => this.setState({visibleModalMinusOfMeeting: false})}>
								<Text>Cancel</Text>
							</Button>
						</View>
						<View style={styles.viewButtonModal}>
							{this.state.minus_of_meeting ? (
								<Button block primary style={styles.buttonModalRight} onPress={() => this.setState({visibleModalMinusOfMeeting: false})}>
									<Text>Save</Text>
								</Button>
							) : (
								<Button block style={[styles.buttonModalRight, {backgroundColor: '#999999'}]}>
									<Text>Save</Text>
								</Button>
							)}
						</View>
					</View>
				</Modal>
				<Modal style={styles.modal} isVisible={this.state.visibleModalTodoList}>
					<View style={styles.viewName}>
						<Text style={styles.textName}>Hello, {sessionPersistance.first_name}!</Text>
					</View>
					<View style={styles.viewQuestion}>
						<Text style={styles.textQuestion}>Isi kolom dibawah</Text>
					</View>
					<Form style={styles.form}>
						<Textarea rowSpan={8} bordered placeholder="Isi jawaban disini" value={this.state.todo_list} onChangeText={(todo_list) => this.setState({todo_list})} />
          </Form>
					<View style={styles.containerButtonModal}>
						<View style={styles.viewButtonModal}>
							<Button block danger style={styles.buttonModalLeft} onPress={() => this.setState({visibleModalTodoList: false})}>
								<Text>Cancel</Text>
							</Button>
						</View>
						<View style={styles.viewButtonModal}>
							{this.state.todo_list ? (
								<Button block primary style={styles.buttonModalRight} onPress={() => this.setState({visibleModalTodoList: false})}>
									<Text>Save</Text>
								</Button>
							) : (
								<Button block style={[styles.buttonModalRight, {backgroundColor: '#999999'}]}>
									<Text>Save</Text>
								</Button>
							)}
						</View>
					</View>
				</Modal>
				<ImageBackground source={bg} style={styles.imageBackground}>
					<View style={styles.container}>
						<View style={styles.viewContainerRight}>
							<TouchableOpacity style={styles.card} onPress={() => this.setState({visibleModalMainQuestion: true})}>
								<Text style={styles.textCard}>Main Question</Text>
								{this.state.answer !== '' && (
									<Icon name='checkmark-circle' style={{color: '#4CAF50'}} />
								)}
							</TouchableOpacity>
						</View>
						<View style={styles.viewContainerLeft}>
							<TouchableOpacity style={styles.card} onPress={() => this.setState({visibleModalActivityDesc: true})}>
								<Text style={styles.textCard}>Activity Description</Text>
								{this.state.activity_desc !== '' && (
									<Icon name='checkmark-circle' style={{color: '#4CAF50'}} />
								)}
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.container}>
						<View style={styles.viewContainerRight}>
							<TouchableOpacity style={styles.card} onPress={() => this.setState({visibleModalMinusOfMeeting: true})}>
								<Text style={styles.textCard}>Minus of Meeting</Text>
								{this.state.minus_of_meeting !== '' && (
									<Icon name='checkmark-circle' style={{color: '#4CAF50'}} />
								)}
							</TouchableOpacity>
						</View>
						<View style={styles.viewContainerLeft}>
							<TouchableOpacity style={styles.card} onPress={() => this.setState({visibleModalTodoList: true})}>
								<Text style={styles.textCard}>To Do List</Text>
								{this.state.todo_list !== '' && (
									<Icon name='checkmark-circle' style={{color: '#4CAF50'}} />
								)}
							</TouchableOpacity>
						</View>
					</View>
					<View style={{flexDirection: 'row'}}>
						<View style={{width: width / 2.2, margin: 15}}>
							<Button block danger>
								<Text>Back</Text>
							</Button>
						</View>
						<View style={{width: width / 2.2, margin: 15}}>
							{this.state.answer && this.state.activity_desc && this.state.minus_of_meeting && this.state.todo_list ? (
								<Button block primary style={styles.buttonModalRight} onPress={() => this.setState({visibleModalTodoList: false})}>
									<Text>Save</Text>
								</Button>
							) : (
								<Button block style={[styles.buttonModalRight, {backgroundColor: '#999999'}]}>
									<Text>Save</Text>
								</Button>
							)}
						</View>
					</View>
				</ImageBackground>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	loading: state.loading,
	success: state.success,
	sessionPersistance: state.sessionPersistance,
	questionWithStep: state.questionWithStep,
	cartProducts: state.cartProducts
})

const mapDispatchToProps = dispatch => ({
	sendProductsOnCart: (data, accessToken) =>
		dispatch(sendProductsOnCart(data, accessToken)),
	postAnswer: (data, accessToken) => dispatch(postAnswer(data, accessToken)),
	fetchQuestionWithStep: (step, accessToken) =>
		dispatch(fetchQuestionWithStep(step, accessToken))
})

const styles = StyleSheet.create({
	modal: {
		flex: 0.5, height: height / 4, backgroundColor: '#FFFFFF', borderRadius: 5
	},
	viewName: {
		marginLeft: 20
	},
	textName: {
		fontSize: 20, fontWeight: 'bold'
	},
	viewQuestion: {
		marginLeft: 20, marginTop: 10
	},
	textQuestion: {
		fontSize: 20
	},
	form: {
		margin: 20
	},
	viewButton: {
		margin: 20,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	imageBackground: {
		alignItems: 'center', justifyContent: 'center', width: width, height: height
	},
	container: {
		justifyContent: 'center', flexDirection: 'row'
	},
	viewContainerRight: {
		justifyContent: 'center', alignItems: 'flex-start', margin: 15
	},
	viewContainerLeft: {
		justifyContent: 'center', alignItems: 'flex-end', margin: 15
	},
	card: {
		justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 10, borderColor: '#0D47A1', borderWidth: 5, width: width / 2.2, height: height / 4.2
	},
	textCard: {
		fontSize: 20, fontWeight: 'bold'
	},
	viewButtonModal: {
		width: width / 2.5
	},
	buttonModalLeft: {
		marginRight: 10
	},
	buttonModalRight: {
		marginLeft: 10
	},
	containerButtonModal: {
		flexDirection: 'row', justifyContent: 'center'
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage)
