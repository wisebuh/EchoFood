import { View, Text, Alert } from 'react-native'
import { Link, router } from 'expo-router'
import CustomInput from '@/components/CustomEntry'
import CustomButton from '@/components/CustomButton'
import { useState } from 'react'
import { createUser } from '@/lib/appwrite'
export default function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({name:"", email:"", password:""});

  const submit = async ()=>{

    const {name, email, password} = form;
    if (!form.email || !form.password) return Alert.alert("Error","Fill in the blank inputs")
    setIsSubmitting(true)

    try{
      await createUser({
        name:name,
        email: email,
        password:password
      })
      
      router.replace("/")
    }catch(error:any){
      Alert.alert("Error", error.message)
    }finally{
      setIsSubmitting(false)
    }
  }
  return (
    <View className='gap-10 bg-white rounded-lg p-5'>

      <CustomInput 
        placeholder='Enter Your Full Name'
        value={form.name}
        onChangeText={((text)=>setForm((prev)=>({...prev, name:text})))}
        label='Full Name'
        />
        
      <CustomInput 
        placeholder='Enter Your Email'
        value={form.email}
        onChangeText={((text)=>setForm((prev)=>({...prev, email:text})))}
        label='Email'
        keyboardType='email-address'/>
        <CustomInput 
        placeholder='Enter Your password'
        value={form.password}
        onChangeText={((password)=>setForm((prev)=>({...prev, password:password})))}
        label='Password'
        secureTextEntry={true}/>
        <CustomButton 
        title='Sign Up'
        isLoading={isSubmitting}
        onPress={submit}/>

        <View className='flex justify-center mt-5 gap-2 flex-row'>
          <Text className='base-regular text-gray-100'>
            Already have an account? <Link href="/(auth)/sign-in" className='base-bold text-primary'>Sign In</Link>
          </Text>
        </View>
    </View>
  )
}
