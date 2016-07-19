import React, { Component } from 'react'
import { View, StyleSheet, Image, ListView, Text } from 'react-native'

class Feed extends Component {
	constructor(props) {
	    super(props); 
	    this.state = {
	      dataSource: new ListView.DataSource({
	        rowHasChanged: (row1, row2) => row1 !== row2
	      }),
	      loaded: false,
	    }
  	}

  	componentDidMount() {
  		this.fetchData()
  	}

  	fetchData() {
  		require('./AuthService').getAuthInfo((err, authInfo) => {
  			var url = 'https://api.github.com/users/'
  					+ authInfo.login + '/events'
  			fetch(url, {
  				headers: authInfo.header
  			})		
  			.then((response) => response.json())
  			.then((responseData) => {
  				this.setState({
  					loaded: true,
  					dataSource: this.state.dataSource.cloneWithRows(responseData)
  				})
  			})
  		})
  	}

  	renderFeed(feed) {
  		debugger
  		return(
  			<View><Text>{feed}</Text></View>
  		)
  	}

	render() {
		if (!this.state.loaded) {
			return(
				<View />
			)
		}

		return(
			<ListView 
				automaticallyAdjustContentInsets={true}
				dataSource={this.state.dataSource}
				renderRow={this.renderFeed} />
		)
	}
}

module.exports = Feed