import { Stack } from 'expo-router';

export default function Layout() {

    return (
        <Stack
            // https://reactnavigation.org/docs/headers#sharing-common-options-across-screens
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#f0f0f0',
                },
                headerShown: false,
                headerTintColor: '#000',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            {/* Optionally configure static options outside the route. */}
            {/* <Stack.Screen name="home" options={{}} /> */}
        </Stack>
    );
}
