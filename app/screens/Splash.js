import React, { Component } from 'react'
import { StyleSheet, Image, AsyncStorage } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Container } from 'native-base'
import moment from 'moment'
import logo from '../assets/images/logo-myforce-white.png'
import { login } from '../actions/login'
import { connect } from 'react-redux'
import { fetchTarget } from '../actions/targets'

class Splash extends Component {
	componentDidMount() {
		setTimeout(async () => {
			await this.props.fetchTarget(moment().format('YYYY'))
			const response = await AsyncStorage.getItem('session')
			const data = await JSON.parse(response)
			if (data !== null) {
				try {
					await this.props.login(data.email, data.password)
					await this.props.navigation.navigate('Home')
				} catch (e) {
					await this.props.navigation.navigate('Home')
				}
			} else {
				await this.props.navigation.navigate('Start')
			}
		}, 2000)
	}

	render() {
		return (
			<Container>
				<LinearGradient
					colors={['#20E6CD', '#2D38F9']}
					style={styles.linearGradient}>
					<Image source={logo} />
				</LinearGradient>
			</Container>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	login: (email, password) => dispatch(login(email, password)),
	fetchTarget: (year) => dispatch(fetchTarget(year))
})

const styles = StyleSheet.create({
	linearGradient: {
		flex: 1,
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default connect(null, mapDispatchToProps)(Splash)
