import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    Image,
    ScrollView,
} from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
// Add this import for toast notifications
import Toast from 'react-native-root-toast';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Toast.show('Please enter an email and password', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                backgroundColor: '#ef4444',
                textColor: '#fff',
            });
            return;
        }

        try {
            setIsLoading(true);

            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) {
                Toast.show(error.message, {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    backgroundColor: '#ef4444',
                    textColor: '#fff',
                });
            } else {
                Toast.show('Login successful!', {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    backgroundColor: '#22c55e',
                    textColor: '#fff',
                });
            }
        } catch (error: any) {
            Toast.show(error?.message || 'An unexpected error occurred', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                backgroundColor: '#ef4444',
                textColor: '#fff',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View className='flex items-center justify-center'>
            <ScrollView className='mb-4'>
                {/* <KeyboardAvoidingView
                    className="flex-1 bg-black"
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                > */}
                    <View className="flex-1 justify-center px-6">
                        {/* Threads Logo and Title */}
                        <View className="items-center mt-10 mb-10">
                            <Image
                                source={require('@/assets/images/icon.png')}
                                style={{ width: 120, height: 120 }}
                                resizeMode="contain"
                            />
                            <Text className="text-4xl font-black text-white tracking-tight mb-2">threads</Text>
                        </View>

                        <View className="w-full max-w-sm mx-auto">
                            <View className="mb-6">
                                <Text className="text-2xl font-bold text-white mb-2">Log in</Text>
                                <Text className="text-neutral-400 text-base">
                                    Enter your email and password to continue.
                                </Text>
                            </View>

                            <View className="gap-4">
                                <View>
                                    <TextInput
                                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder:text-neutral-500 text-base"
                                        placeholder="Email address"
                                        placeholderTextColor="#6B7280"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        value={email}
                                        onChangeText={setEmail}
                                        autoFocus
                                    />
                                </View>

                                <View>
                                    <TextInput
                                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder:text-neutral-500 text-base"
                                        placeholder="Password"
                                        placeholderTextColor="#6B7280"
                                        secureTextEntry
                                        value={password}
                                        onChangeText={setPassword}
                                    />
                                </View>

                                <TouchableOpacity
                                    className="w-full bg-white py-3 rounded-xl mt-4"
                                    activeOpacity={0.8}
                                    onPress={handleLogin}
                                    disabled={isLoading}
                                >
                                    <Text className="text-black text-center font-semibold text-base">
                                        {isLoading ? 'Logging in...' : 'Log in'}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View className="flex-row justify-center mt-8">
                                <Text className="text-neutral-400 text-base">Don&apos;t have an account? </Text>
                                <Link href="/signup" asChild>
                                    <Pressable>
                                        <Text className="text-blue-400 font-semibold text-base">Sign up</Text>
                                    </Pressable>
                                </Link>
                            </View>
                        </View>
                    </View>
                {/* </KeyboardAvoidingView> */}
            </ScrollView>
        </View>
    )
}