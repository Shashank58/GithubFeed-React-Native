import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Navigator } from 'react-native'
import Feed from './Feed'
import Detail from './Detail'
import Search from './Search'
import {TabLayoutAndroid, TabAndroid} from "react-native-android-kit"

class TabLayout extends Component {

	_renderScene(route, navigator) {
		let globarNavigatorProps = { navigator }
		switch(route.id) {
			case 'Feed':
				return <Feed {...globarNavigatorProps} />

			case 'Detail':
				return <Detail {...globarNavigatorProps} 
					feed={route.feed} />	
		}
	}

	render() {
		return (
			<TabLayoutAndroid style={{height:50, elevation: 4}} backgroundColor='#EEEEEE' indicatorTabColor='#48bbec'
                                  indicatorTabHeight={3} scrollable={false} center={false}>
 
                    <TabAndroid text='Feed' textSize={16} textColor="#000000" selectedTextColor='#000000'
                                icon='ic_star_black_24dp' iconPosition='top'>
                        
                        <Navigator
							initialRoute={{id: 'Feed'}}
							renderScene={this._renderScene} />
                        
                    </TabAndroid>
                    
                    <TabAndroid text='Search' textSize={16} textColor='#000000' selectedTextColor='#000000'
                                icon='ic_search_black_24dp' iconPosition='top'>
                        
                        <Text>Im the second Tab content!</Text>
                        
                    </TabAndroid>
 
            </TabLayoutAndroid>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
    	alignItems: 'center',
    	justifyContent: 'center',
    	backgroundColor: 'white',
	},
	icon: {
	    width: 300,
	    height: 300,
	    alignSelf: 'center',
	},
})

module.exports = TabLayout