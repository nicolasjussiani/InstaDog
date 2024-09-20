import { View, Text, Image, Pressable} from 'react-native' //37:26 de video Adopt React native>>Authentication
import React, { useCallback } from 'react'
import Colors from './../../constants/Colors'
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'

export const useWarmUpbrowser = () => {
    React.useEffect(() => {
        //Warm up the android browser to impure UX
        //https://docs.expo.dev/guides/authentication/#improving-user-experience
        void WebBrowser.warmUpAsync()
        return () => {
            void WebBrowser.coolDownAsync()
        }
    }, [])
}

WebBrowser.maybecompleteAuthSession()

export default function loginScreen() {

    useWarmUpbrowser();
    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google '})

    const onPress = useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } = await start0AuthFlow({
                redirectUrl: Linking.createURL('/home', { scheme: 'myapp' }),
            })
            
            if (createdSessionId) {

            } else {
            //Use sign or signUp for next steps such as MFA
            }
        }   catch (err) {
            console.error('OAuth error', err)
        }
    }, [])
    
    return (
        <View style={{
            backgroundColor:Colors.WHITE,
            height:'100%'
        }}>
            <Image source={require('./../../assets/images/login.png')}
                style={{
                    width:'100%',
                    height:550
                }}
            />
            <View style={{
                padding:20,
                display:'flex',
                AlignItems:'center'    
             }}>
                <Text style={{
                    fontFamily:'outfit-bold',
                    fontSize:30,
                    textAlign:'center'

                }}>Você já tem um amigo?</Text>
                <Text style={{
                    fontfamily:'outfit-bold',
                    fontSize:18,
                    textAlign:'center',
                    color:Colors.GRAY
                }}>Adote e faça algum Pet muito feliz!</Text>
            
                <Pressable 
                onPress={onPress}
                style={{
                    padding:14,
                    marginTop:100,
                    backgroundColor:Colors.PRIMARY,
                    width:'100%',
                    borderRadius:14
                }}>
                    <Text style={{
                        fontFamily:'outfit-medium',
                        fontSize:20,
                        textAlign:'center',
                        color:Colors
                    }}>Iniciar</Text>
                </Pressable>
           
           
            </View>
        </View>
    )
}