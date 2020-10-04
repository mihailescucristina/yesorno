import React, { useEffect } from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useDispatch } from 'react-redux';

import HomeScreen from '../screens/HomeScreen';
import QuestionScreen from '../screens/QuestionScreen';
import CategoryScreen from '../screens/CategoryScreen';
import HotScreen from '../screens/HotScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { filterQuestions } from '../store/actions/questions';
import { FILTER } from '../constants/Filters';
import { fetchQuestions } from '../store/actions/questions';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const AppNavigator = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchQuestions());
    }, [dispatch])

    const HomeStack = () => {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Question" component={QuestionScreen} />
                <Stack.Screen name="Category" component={CategoryScreen} />
                <Stack.Screen name="New" component={HomeScreen} />
            </Stack.Navigator>
            /*i'm lying, it doesn't render home*/
        );
    };

    const MyTheme = {
        dark: false,
        colors: {
          primary: 'rgb(255, 45, 85)',
          background: 'rgb(242, 242, 242)',
          card: 'rgb(255, 255, 255)',
          text: 'rgb(28, 28, 30)',
          border: 'rgb(199, 199, 204)',
          notification: 'rgb(255, 69, 58)',
        },
      };

    return (
        <NavigationContainer theme={MyTheme}>
            <Tab.Navigator
                activeColor={Colors.brandColor}
                inactiveColor={Colors.onSurfaceColor}
                barStyle={{ backgroundColor: Colors.backgroundColor }}
                shifting={false}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                        let iconName;
                        let iconColor;

                        if (route.name === 'Home') {
                            iconName = 'home';
                            iconColor = focused
                                ? Colors.brandColor
                                : Colors.onSurfaceColor;
                        } else {
                            if (route.name === 'Hot') {
                                iconName = 'fire';
                                iconColor = focused
                                    ? Colors.brandColor
                                    : Colors.onSurfaceColor;
                            } else {
                                if (route.name === 'New') {
                                    iconName = 'plus-circle';
                                    iconColor = focused
                                        ? Colors.brandColor
                                        : Colors.onSurfaceColor;
                                } else {
                                    if (route.name === 'Search') {
                                        iconName = 'magnify';
                                        iconColor = focused
                                            ? Colors.brandColor
                                            : Colors.onSurfaceColor;
                                    } else {
                                        if (route.name === 'Profile') {
                                            iconName = 'account';
                                            iconColor = focused
                                                ? Colors.brandColor
                                                : Colors.onSurfaceColor;
                                        }
                                    }
                                }
                            }
                        }
                        return (
                            <Icon name={iconName} size={25} color={iconColor} />
                        );
                    },
                })}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeStack}
                    listeners={({ navigation }) => ({
                        tabPress: (event) => {
                            dispatch(filterQuestions(FILTER.LAST_WEEK));
                            navigation.navigate('Home');
                        },
                    })}
                />
                <Tab.Screen
                    name="Hot"
                    component={HotScreen}
                    listeners={({ navigation }) => ({
                        tabPress: (event) => {
                            dispatch(filterQuestions(FILTER.LAST_24_HOURS));
                            navigation.navigate('Hot');
                        },
                    })}
                />
                <Tab.Screen
                    name="New"
                    component={HomeScreen}
                    listeners={({ navigation }) => ({
                        tabPress: (event) => {
                            event.preventDefault();
                            props.showNewModal();
                        },
                    })}
                />
                <Tab.Screen name="Search" component={SearchScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
