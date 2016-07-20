import React, { Component } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'

class Detail extends Component {
	render() {
		return(
			<View style={styles.container}>
				<View style={styles.statusBar} />
	        	<View style={styles.navBar}>
	        		<TouchableOpacity onPress={() => this._back()}>
	        			<View style={styles.backView}>
			        		<Image style={styles.back}
			        			source={require('./images/back.png')} />
			        		<Text>Feed</Text>
		        		</View>	
		        	</TouchableOpacity>		
	            	<Text style={styles.title}>
	            	{this.props.feed.actor.display_login}
	            	</Text>
	          	</View>
			</View>
		)
	}

	_back() {
		this.props.navigator.pop()
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	statusBar: {
	   backgroundColor: '#EEEEEE',
	   height: 20
	},
	navBar: {
	   flexDirection: 'row',		
	   height: 45,
	   alignItems: 'center',
       backgroundColor: '#EEEEEE',
	},
	title: {
	   flex: 2,	
	   fontSize: 20,
	   fontWeight: '600',
	   alignSelf: 'center',
	   textAlign: 'center',
	   marginRight: 36
  	},
  	back: {
  		width: 26,
  		height: 26
  	},
  	backView: {
  		flex: 1,
  		flexDirection: 'row',
  		justifyContent: 'center',
  		alignItems: 'center'
  	}
})

module.exports = Detail