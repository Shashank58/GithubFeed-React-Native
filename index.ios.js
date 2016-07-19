/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, ActivityIndicator, View, Text, StyleSheet } from 'react-native';

import LoginView from './shared/LoginView'
import TabLayout from './TabLayout'

const authenticate = require('./AuthService')

class GithubFeed extends Component {
	constructor(props) {
		super(props)
		this.state = {
			checking: true,
			loggedUser: null
		}
	}

	componentDidMount() {
		authenticate.getAuthInfo((err, user) => {
			console.log('In index: ', err, 'User : ', user)
			if (!err && user) {
				this.setState({loggedUser: user, checking: false})
			} else {
				this.setState({checking: false})
			}
		})
	}

	render() {
		if (this.state.checking) {
			return (
				<View style={styles.container}>
					<ActivityIndicator
						animating={this.state.isChecking}
						size='large' />
				</View>	 
			)	
		}

		return(
			<LoginView user={this.state.loggedUser} />
		)
	}
}

const styles = StyleSheet.create({
	container: {
    	flex: 1,
    	alignItems: 'center',
    	backgroundColor: 'lightblue',
    	justifyContent: 'center'
  	},
})

AppRegistry.registerComponent('GithubFeed', () => GithubFeed);
