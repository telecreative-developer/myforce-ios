import React, { Component } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { List, H1, H2, H3, Footer, Thumbnail, Text, View } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

const { height, width } = Dimensions.get('window')

const ContactCard = props => {
	return (
		<View style={styles.card}>
			<View style={styles.content}>
				<View style={styles.cardHeader}>
					<H3 style={styles.textTitle}>{props.title}</H3>
					<View style={styles.viewPerson}>
						<Icon name="ios-person" color="#000000" size={15} />
						<Text style={styles.textPerson}>{props.person}</Text>
					</View>
					<Text style={styles.text}>{props.description}</Text>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
		borderRadius: 5,
		height: height / 8,
		backgroundColor: '#ffffff',
		marginBottom: '3%'
	},
	content: {
		display: 'flex',
		flexDirection: 'row',
		paddingRight: 90,
		paddingLeft: 20
	},
	viewPerson: {
		flexDirection: 'row',
		marginTop: 3
	},
	textTitle: {
		color: '#000000',
		fontSize: 18,
		fontWeight: 'bold'
	},
	textPerson: {
		color: '#000000',
		marginLeft: 5,
		fontSize: 14
	},
	text: {
		color: '#000000',
		fontSize: 11,
		marginTop: 5
	},
	cardHeader: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		marginLeft: 15,
		paddingBottom: 5
	}
})

ContactCard.propTypes = {
	title: PropTypes.string,
	data: PropTypes.array,
	key: PropTypes.string,
	items: PropTypes.node
}

export default ContactCard
