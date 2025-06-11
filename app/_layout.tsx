import { useEffect } from 'react'
import { router, SplashScreen, Slot } from 'expo-router'
import { supabase } from '../lib/supabase'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  useEffect(() => {
    // Check auth state on app start
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace('/home')
      } else {
        router.replace('/login')
      }
      SplashScreen.hideAsync()
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        router.replace('/home')
      } else {
        router.replace('/login')
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return <Slot />
}