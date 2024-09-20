import { Link } from "expo-router";
import { Pressable, Text, View } from 'react'

export default function index() {
  return (
    <View
    style={{
      flex: 1,
    }}
    >
      <Link href={'/login'}>
      <Text>Iniciar Verificação</Text>
    </Link>
    </View>
  )
}