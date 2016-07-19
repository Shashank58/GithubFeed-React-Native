import React, { Component } from 'react'
import { View, Text, TabBarIOS, StyleSheet, Image } from 'react-native'
import Feed from './Feed'

class TabLayout extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedTab: 'Feed'
		}
	}

	render() {
		return (
			<TabBarIOS style={styles.container}>
				<TabBarIOS.Item
					selected={this.state.selectedTab === 'Feed'}
					icon={require('./images/ic_star.png')}
					title='Feed'
					onPress={() => {
						this.setState({selectedTab: 'Feed'})
					}}>
					<Feed />
				</TabBarIOS.Item>
				<TabBarIOS.Item
					selected={this.state.selectedTab === 'Search'}
					icon={require('./images/ic_search.png')}
					title='Search'
					onPress={() => {
						this.setState({selectedTab: 'Search'})
					}}>
					<View><Text>Nothing</Text></View>
				</TabBarIOS.Item>	
			</TabBarIOS>	
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
    	alignItems: 'center',
    	justifyContent: 'center',
    	backgroundColor: 'white',
	}
})

module.exports = TabLayout