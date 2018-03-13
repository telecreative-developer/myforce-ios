import React, { Component } from 'react'
import {
	Dimensions,
	Image,
	ListView,
	PixelRatio,
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableHighlight,
	TouchableOpacity
} from 'react-native'
import {
	Tab,
	Tabs,
	Content,
	Form,
	Item,
	Label,
	H2,
	Input,
	Badge,
	Grid,
	Col
} from 'native-base'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import LinearGradient from 'react-native-linear-gradient'
import Icon, { Button } from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import ThemeContainer from '../components/ThemeContainer'
import { postAvatar } from '../actions/users'
import { setNavigate } from '../actions/processor'
import defaultAvatar from '../assets/images/default-avatar.png'
import defaultLoading from '../assets/images/default-loading.gif'
import ImagePicker from 'react-native-image-picker'

const { width, height } = Dimensions.get('window')

class Profile extends Component {
	constructor() {
		super()

		this.state = {
			avatarBase64: ''
		}
	}
	
	componentWillMount() {
		this.setState({avatarBase64: this.props.sessionPersistance.avatar})
	}

	renderBackground() {
		return (
			<View key="background">
				<Image
					source={{
						uri: 'https://images.pexels.com/photos/567633/pexels-photo-567633.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb',
						width: window.width,
						height: PARALLAX_HEADER_HEIGHT
					}} />
				<View
					style={{
						position: 'absolute',
						top: 0,
						width: window.width,
						backgroundColor: 'rgba(42,92,240,.4)',
						height: PARALLAX_HEADER_HEIGHT
					}} />
			</View>
		)
	}

	handleBackButton() {
		this.props.setNavigate()
		this.props.navigation.goBack()
	}

	handleChangeProfile() {
		const { id, accessToken } = this.props.sessionPersistance
		const options = {
			quality: 1.0,
			maxWidth: 500,
			maxHeight: 500,
			storageOptions: {
				skipBackup: true
			}
		}

		ImagePicker.showImagePicker(options, response => {
			if (response.didCancel) {
				this.setState({avatarBase64: this.state.avatarBase64})
			} else {
				this.props.postAvatar(id, `data:image/png;base64,${response.data}`, accessToken)
			}
		})
	}

	renderFixedHeader = () => {
		const { navigate } = this.props.navigation
		return (
			<Grid>
				<Col style={styles.fixHeaderLeft}>
					<View key="fixed-header" style={styles.fixedSection}>
						<TouchableOpacity
							onPress={() => this.handleBackButton()}
							style={styles.fixedSectionBack}>
							<Icon name="ios-arrow-back" size={25} color="#fff" style={styles.iconBack} />
							<Text style={styles.back}>Back</Text>
						</TouchableOpacity>
					</View>
				</Col>
				<Col style={styles.fixHeaderRight}>
					<View key="fixed-header" style={styles.fixedSection}>
						<TouchableOpacity>
							<Icon name="ios-settings" size={25} color="transparent" style={styles.iconSetting} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
							<Icon name="ios-settings" size={25} color="#fff" style={styles.iconBell} />
						</TouchableOpacity>
					</View>
				</Col>
			</Grid>
		)
	}

	render() {
		const { onScroll = () => {} } = this.props
		const { sessionPersistance } = this.props
		return (
			<ParallaxScrollView
				onScroll={onScroll}
				stickyHeaderHeight={STICKY_HEADER_HEIGHT}
				parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
				backgroundSpeed={10}
				renderBackground={this.renderBackground}
				renderForeground={() => (
					<View key="parallax-header" style={styles.parallaxHeader}>
						{this.props.loading.condition === true && this.props.loading.process_on === 'LOADING_POST_AVATAR' ? (
							<Image style={[styles.avatar, {width: AVATAR_SIZE, height: AVATAR_SIZE}]} source={defaultLoading} />
						) : (
							this.state.avatarBase64 === '' ? (
								<Image style={[styles.avatar, {width: AVATAR_SIZE, height: AVATAR_SIZE}]} source={defaultAvatar} />
							) : (
								<Image style={styles.avatar} source={{uri: this.state.avatarBase64, width: AVATAR_SIZE, height: AVATAR_SIZE}} />
							)
						)}
						<TouchableOpacity style={styles.viewBadge} onPress={() => this.handleChangeProfile()}>
							<Badge style={styles.changeAvatarBadge}>
								<Icon name="md-create" color={'#ffffff'} size={20} />
							</Badge>
						</TouchableOpacity>
						<Text style={styles.sectionSpeakerText}>{`${this.props.sessionPersistance.first_name} ${sessionPersistance.last_name}`}</Text>
						<Text style={styles.sectionTitleText}>
							{sessionPersistance.bio}
						</Text>
						<TouchableOpacity style={styles.changeCover}>
							<Badge
								style={{
									backgroundColor: '#2A5CF0',
									alignItems: 'center',
									justifyContent: 'center',
									marginTop: 15}}>
								<Text style={styles.changeCoverText}>Change Cover</Text>
							</Badge>
						</TouchableOpacity>
					</View>
				)}
				renderStickyHeader={() => (
					<View key="sticky-header" style={styles.stickySection}>
						<Text style={styles.stickySectionText}>{`${this.props.sessionPersistance.first_name} ${sessionPersistance.last_name}`}</Text>
					</View>
				)}
				renderFixedHeader={this.renderFixedHeader}>
				<View style={styles.profileInfoView}>
					<H2 style={styles.profileInfoTitle}>PROFILE INFO</H2>
					<Form>
						<Item stackedLabel disabled>
							<Label style={styles.labelText}>First Name</Label>
							<Input disabled placeholder={sessionPersistance.first_name} />
						</Item>
						<Item stackedLabel disabled>
							<Label style={styles.labelText}>Last Name</Label>
							<Input disabled placeholder={sessionPersistance.last_name} />
						</Item>
						<Item stackedLabel disabled style={styles.itemForm}>
							<Label style={styles.labelText}>Username</Label>
							<Input disabled placeholder={sessionPersistance.username} />
						</Item>
						<Item stackedLabel disabled style={styles.itemForm}>
							<Label style={styles.labelText}>Gender</Label>
							<Input disabled placeholder={sessionPersistance.gender === 1 ? 'Male' : 'Female'} />
						</Item>
						<Item stackedLabel disabled style={styles.itemForm}>
							<Label style={styles.labelText}>Email</Label>
							<Input disabled placeholder={sessionPersistance.email} />
						</Item>
						<Item stackedLabel disabled style={styles.itemForm}>
							<Label style={styles.labelText}>Address</Label>
							<Input disabled placeholder={sessionPersistance.address} />
						</Item>
						<Item stackedLabel disabled style={styles.itemForm}>
							<Label style={styles.labelText}>Phone Number</Label>
							<Input disabled placeholder={sessionPersistance.phone} />
						</Item>
						<Item stackedLabel disabled style={styles.itemForm}>
							<Label style={styles.labelText}>Regional Rank</Label>
							<Input disabled placeholder="1" />
						</Item>
						<Item stackedLabel disabled style={styles.itemForm}>
							<Label style={styles.labelText}>National Rank</Label>
							<Input disabled placeholder="1" />
						</Item>
					</Form>
				</View>
			</ParallaxScrollView>
		)
	}
}

const mapStateToProps = state => ({
	users: state.users,
	loading: state.loading,
	sessionPersistance: state.sessionPersistance
})

const mapDispatchToProps = dispatch => ({
	postAvatar: (id, avatar, accessToken) => dispatch(postAvatar(id, avatar, accessToken)),
	setNavigate: (link, data) => dispatch(setNavigate(link, data))
})

const window = Dimensions.get('window')

const AVATAR_SIZE = 100
const ROW_HEIGHT = 60
const PARALLAX_HEADER_HEIGHT = 350
const STICKY_HEADER_HEIGHT = 70

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	background: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: window.width,
		height: PARALLAX_HEADER_HEIGHT,
		backgroundColor: '#2A5CF0'
	},
	stickySection: {
		height: STICKY_HEADER_HEIGHT,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#2A5CF0'
	},
	stickySectionText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 20,
		marginTop: 22
	},
	fixedSection: {
		flex: 1,
		width: '100%',
		flexDirection: 'row',
		position: 'absolute',
		bottom: 10,
		right: 0
	},
	fixedSectionBack: {
		flex: 1,
		width: '100%',
		flexDirection: 'row',
		position: 'absolute',
		bottom: 0,
		right: 0
	},
	fixedSectionText: {
		color: '#999',
		fontSize: 20
	},
	parallaxHeader: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'column',
		paddingTop: 100
	},
	avatar: {
		marginBottom: 10,
		borderRadius: AVATAR_SIZE / 2
	},
	sectionSpeakerText: {
		color: 'white',
		fontSize: 20,
		paddingVertical: 5
	},
	sectionTitleText: {
		color: 'white',
		fontSize: 14,
		paddingVertical: 5
	},
	fixHeaderLeft: {
		flex: 0.9
	},
	fixHeaderRight: {
		flex: 0.1
	},
	row: {
		overflow: 'hidden',
		paddingHorizontal: 10,
		height: ROW_HEIGHT,
		backgroundColor: 'white',
		borderColor: '#ccc',
		borderBottomWidth: 1,
		justifyContent: 'center'
	},
	rowText: {
		fontSize: 20
	},
	iconBell: {
		marginRight: 10
	},
	iconSetting: {
		marginRight: 20
	},
	iconBack: {
		marginLeft: 20
	},
	back: {
		fontSize: 20,
		color: '#ffffff',
		marginLeft: 10
	},
	chartsDirection: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	profileInfoView: {
		paddingHorizontal: width / 12,
		paddingVertical: height / 30
	},
	labelText: {
		fontWeight: 'bold',
		color: '#000000'
	},
	itemForm: {
		marginTop: 10
	},
	profileInfoTitle: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 18,
		marginBottom: 20
	},
	changeAvatarBadge: {
		backgroundColor: '#20E6CD'
	},
	viewBadge: {
		display: 'flex',
		position: 'absolute',
		top: 180,
		right: 340
	},
	changeCover: {
		display: 'flex'
	},
	changeCoverText: {
		color: '#ffffff',
		fontSize: 14,
		marginHorizontal: 5
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(ThemeContainer(Profile))
