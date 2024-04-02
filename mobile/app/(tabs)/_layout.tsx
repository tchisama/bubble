
import React from 'react';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useFilesystem } from '@/store/filesystem';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const {path , setPath} = useFilesystem()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="filesystem"

        options={{
          title: 'Filesystem',
          tabBarIcon: ({ color }) => <FontAwesome name="folder" size={24} color={color} />,
          headerLeft: () => (
            path !== "/home" &&
              <Pressable onPress={()=>{setPath(path.split("/").slice(0, -1).join("/"))}}>
                {({ pressed }) => (
                  <AntDesign name="arrowleft"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
          ),
        }}
        
      />
    </Tabs>
  );
}


