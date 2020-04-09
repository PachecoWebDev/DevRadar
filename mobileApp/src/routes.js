import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const AppStack = createStackNavigator();

function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator
                initialRouteName="Main" 
                screenOptions={{ 
                    gestureEnabled: false,
                    headerTintColor: '#FFF',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#7D40E7'
                    }
                }}>
                <AppStack.Screen
                    name="Main"
                    component={Main}
                    options={{ title: 'DevRadar' }}
                />
                <AppStack.Screen
                    name="Profile"
                    component={Profile}
                    options={{ title: 'Perfil no Github' }}
                />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;