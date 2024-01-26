import { Stack, Tabs, router, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { firebaseConfig } from '../../FirebaseConfig'; // Import the generated config file
import { initializeApp } from '@react-native-firebase/app';
import { Pressable } from 'react-native';

// Initialize Firebase
initializeApp(firebaseConfig);

// AppRegistry.registerComponent(appName, () => App);

SplashScreen.preventAutoHideAsync();

const Layout = () => {
    // const [fontsLoaded] = useFonts({
    //     DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
    //     DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
    //     DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
    // })
    const handleNotification = () => {
        router.push("/Notifications");
    };

    return (
        <Tabs
            screenOptions={{
                // headerShown: false,
                tabBarActiveTintColor: '#e5b91b', // Color when tab is active
                tabBarInactiveTintColor: 'gray', // Color when tab is inactive
            }}
        >
            <Tabs.Screen
                name='reserveBook'
                options={{
                    headerTitle: "",
                    title: 'Home',
                    tabBarIcon: ({ color }) => <Ionicons name='home' size={24} color={color} />,

                }
                }
            />

            <Tabs.Screen
                name='books'
                options={{
                    headerTitle: "",
                    title: 'Books',
                    tabBarIcon: ({ color }) => <Ionicons size={24} name='book' color={color} />
                }
                }
            />
            <Tabs.Screen
                name='borrowedBooks'
                options={{
                    title: 'History',
                    tabBarIcon: ({ color }) => <Ionicons size={24} name='list' color={color} />
                }
                }
            />
            <Tabs.Screen
                name='settings'
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color }) => <Ionicons size={24} name='settings' color={color} />
                }
                }
            />
            {/* <Tabs.Screen
                name='profile'
                options={{
                    headerTitle: "",
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <Ionicons name='person' size={24} color={color} />
                }
                }
            /> */}

        </Tabs>
    );

};

export default Layout;