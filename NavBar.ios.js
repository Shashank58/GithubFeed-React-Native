import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

class NavBar extends Component {
	render() {
		return(
			<View style={styles.container}>
				<View style={styles.statusBar} />
	          	<View style={styles.navBar}>
	            	<Text style={styles.title}>Feed</Text>
	          	</View>
	        </View>  	
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	statusBar: {
	    backgroundColor: '#EEEEEE',
	    height: 20
	},
	  navBar: {
	    height: 45,
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#EEEEEE'
	},
	  title: {
	    fontSize: 20,
	    fontWeight: '600'
	},
})

module.exports = NavBar