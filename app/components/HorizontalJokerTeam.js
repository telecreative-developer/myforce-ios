/**
 * HorizontalJoker
 * A horizontal card for React Native
 * Copyright (c) 2017 Kevin Hermawan
 */
import React, { Component } from 'react'
import { FlatList, View, Text, StyleSheet, Image } from 'react-native'
import PropTypes from 'prop-types'
import {
	Container,
	Content,
	List,
	H1,
	H2,
	H3,
	Footer,
	Thumbnail
} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import defaultAvatar from '../assets/images/default-avatar.png'

const HorizontalJoker = props => {
	return (
		<View style={styles.card}>
			<LinearGradient
				colors={['#20E6CD', '#2D38F9']}
				style={styles.linearGradient}>
				<View style={styles.content}>
					{props.avatar === '' ? (
						<Thumbnail source={defaultAvatar} />
					) : (
						<Thumbnail source={{ uri: props.avatar }} />
					)}
					<View style={styles.cardHeader}>
						<H3 style={styles.textTitle}>{props.name}</H3>
						<View style={styles.viewLocation}>
							<Text style={styles.textLocation}>{props.company}</Text>
						</View>
						<View style={styles.cardText}>
							<Text style={styles.text}>{props.pipeline}</Text>
						</View>
						<View style={styles.cardText}>
							<Text style={styles.text}>Step {props.step}</Text>
						</View>
					</View>
				</View>
			</LinearGradient>
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		display: 'flex',
		borderRadius: 5,
		width: 300,
		height: 100,
		marginHorizontal: 5,
		backgroundColor: '#ffffff'
	},
	content: {
		marginLeft: 15,
		backgroundColor: 'transparent',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	viewLocation: {
		flexDirection: 'row',
		marginTop: 3
	},
	textTitle: {
		color: '#ffffff',
		fontSize: 18,
		fontWeight: 'bold'
	},
	textLocation: {
		color: '#ffffff',
	},
	text: {
		color: '#ffffff',
		fontSize: 10,
		maxWidth: '90%'
	},
	cardHeader: {
		display: 'flex',
		flexDirection: 'column',
		marginLeft: 15,
		paddingTop: 5,
		paddingBottom: 5
	},
	cardText: {
		marginTop: '3%',
		backgroundColor: 'transparent'
	},
	linearGradient: {
		borderRadius: 5,
		flex: 1,
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center'
	}
})

HorizontalJoker.propTypes = {
	title: PropTypes.string,
	data: PropTypes.array,
	key: PropTypes.string,
	items: PropTypes.node,
	horizontalIndicator: PropTypes.bool
}

HorizontalJoker.defaultProps = {
	horizontalIndicator: false
}

export default HorizontalJoker
