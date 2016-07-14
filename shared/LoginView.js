import React, { Component } from 'react'
import { View, Text, TouchableHighlight, StyleSheet, Image , TextInput } from 'react-native'

class LoginView extends Component {

	constructor(props) {
		super(props)
		this.state = {
			message: '',
			userName : '',
			password: ''
		}
	}

	render() {
		return(
			<View style={styles.container}>
				<Image source={require('../images/github.png')}  
					style={styles.githubImage} />
				<Text style={styles.title}>Github Feed</Text>	
				<TextInput style={styles.textInput}
					onChangeText={(text) => this.setState({userName: text})}
					placeholder='Username' />	
				<TextInput style={styles.textInput}
					onChangeText={(text) => this.setState({password: text})}
					placeholder='Password' />
				<TouchableHighlight style={styles.signIn} 
					onPress={this.tryLoggingIn.bind(this)} >
					<Text style={styles.signInText}>Sign In</Text>
				</TouchableHighlight>
				<Text style={styles.errorMsg}>{this.state.message}</Text>			
			</View>
		)
	}

	tryLoggingIn() {
		if (this.state.userName === '' || this.state.password === '') {
			return this.setState({message: 'Username or password cannot be empty'})
		}
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
  	fontSize: 24,
  	alignSelf: 'center',
  	marginTop: 24
  },
  githubImage: {
  	width: 48,
  	height:48,
  	alignSelf: 'center',
  	marginTop: 60
  },
  textInput: {
  	height: 40,
  	marginTop: 12,
  	marginLeft: 16,
  	marginRight: 16,
  	paddingLeft: 6,
  	paddingRight: 6,
  	borderWidth: 1,
  	borderColor: 'gray',
  },
  signIn: {
  	height: 40,
  	backgroundColor: '#48bbec',
  	alignSelf: 'stretch',
  	marginTop: 20,
  	margin: 16,
  	justifyContent: 'center'
  },
  signInText: {
  	color: 'white',
  	fontSize: 20,
  	fontWeight: '800',
  	alignSelf: 'center'
  }, 
  errorMsg: {
  	color: 'red'
  }
});


module.exports = LoginView