import { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { supabase } from '../lib/supabase'

export default function Confirm() {
  const { token_hash, type } = useLocalSearchParams()

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      if (token_hash && type === 'email') {
        try {
          const { error } = await supabase.auth.verifyOtp({
            token_hash: token_hash as string,
            type: 'email'
          })
          
          if (!error) {
            router.replace('/home')
          } else {
            router.replace('/login')
          }
        } catch (error) {
          router.replace('/login')
        }
      } else {
        router.replace('/login')
      }
    }

    handleEmailConfirmation()
  }, [token_hash, type])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Confirming your email...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#666',
  },
})