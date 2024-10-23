import { View, Text, TextInput, ScrollView, TouchableOpacity, Dimensions, KeyboardAvoidingView, Modal, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { callGPT35Turbo, analyzeImageForIngredients } from '../services/GPTHolla'; 
import { saveRecipeToDB } from '../services/DbService';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'; 
import { StyleSheet } from 'react-native';


// Gets dimensions for the stylesheet
const { width, height } = Dimensions.get('window');


export default function DashboardChatScreen({ navigation }) {

  const route = useRoute();

  // Get the image URI passed from camera
  const { imageUri } = route.params || {}; 

  const [prompt, setPrompt] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // used for the messages that are displayed
  const [messages, setMessages] = useState([
    { text: 'Hello! What would you like to cook today?', fromAI: true }
  ]);


  // Sends text message and gets AI response
  const handleSend = async () => {

    // Don't send empty messages
    if (!prompt.trim()) return; 

    setMessages(prevMessages => [
      ...prevMessages,
      { text: prompt, fromAI: false }
    ]);
    setPrompt('');

    try {
      const gptResponse = await callGPT35Turbo(prompt);
      setMessages(prevMessages => [
        ...prevMessages,
        { text: gptResponse, fromAI: true }
      ]);
    } catch (error) {
      console.error('Error getting GPT response:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        { text: 'Something went wrong. Please try again.', fromAI: true }
      ]);
    }
  };

  // Sends user message and gets AI response
  const handleImageSend = async (imageUri) => {
    try {

      // Display the image and user message in the chat
      setMessages(prevMessages => [
        ...prevMessages,
        { text: 'Please make a recipe using only the ingredients in the provided photo', image: imageUri, fromAI: false }
      ]);

      const ingredients = await analyzeImageForIngredients(imageUri);

      // Construct a prompt for GPT with the ingredients
      const prompt = `Here is a list of ingredients: ${ingredients.join(', ')}. Can you suggest a recipe using these ingredients?`;

      // Get GPT-3.5 Turbo's response
      const gptResponse = await callGPT35Turbo(prompt);

      // Add AI's response to messages
      setMessages(prevMessages => [
        ...prevMessages,
        { text: gptResponse, fromAI: true }
      ]);
    } catch (error) {
      console.error('Error generating recipe:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        { text: 'Something went wrong while analyzing the image. Please try again.', fromAI: true }
      ]);
    }
  };

  // Trigger the image analysis when the imageUri is passed
  useEffect(() => {
    if (imageUri) {
      handleImageSend(imageUri); 
    }
  }, [imageUri]);


  // Save the GPT-3 response to Firestore
  const handleSave = async (index, message) => {
    const recipeName = `Recipe ${index}`; 
    const success = await saveRecipeToDB(recipeName, message.text);
    if (success) {
      const updatedMessages = [...messages];

      // Mark the message as saved
      updatedMessages[index].saved = true; 
      setMessages(updatedMessages);
    }
  };

  // Handles Firebase signout
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Settings Button */}
      <TouchableOpacity style={styles.settingsButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.settingsText}>⚙️</Text>
      </TouchableOpacity>

      {/* Chat Messages */}
      <View style={styles.chatContainer}>
        
        <ScrollView style={styles.messagesContainer} contentContainerStyle={{ paddingBottom: 20 }}>
          {messages.map((message, index) => (
            <View
              key={index}
              style={[
                styles.messageBubble,
                message.fromAI ? styles.aiMessage : styles.userMessage
              ]}
            >
              <Text style={styles.messageText}>{message.text}</Text>

              {/* Show save button only for AI responses (except the default message) */}
              {message.fromAI && !message.saved && index > 0 && (
                <TouchableOpacity style={{ marginTop: 8 }} onPress={() => handleSave(index, message)}>
                  <Ionicons name="bookmark" color="#aaa" size={28} />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </ScrollView>

        {/* Where you type */}
        <KeyboardAvoidingView behavior="padding" style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#aaa"
            value={prompt}
            onChangeText={setPrompt}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>

      {/* Settings Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Settings</Text>
            <Pressable style={styles.signOutButton} onPress={handleSignOut}>
              <Text style={styles.signOutButtonText}>Sign Out</Text>
            </Pressable>
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}


// stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363D45',
  },
  settingsButton: {
    position: 'absolute',
    top: 30,
    right: 10,
    zIndex: 10,
    backgroundColor: '#363D45',
  },
  settingsText: {
    fontSize: 30,
    color: '#e8f17f',
  },
  chatContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 45
  },
  messagesContainer: {
    flex: 1,
    marginTop: -5,
    marginBottom: -10
  },
  messageBubble: {
    padding: 15,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: '75%',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e8f17f',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#8cbcb9',
  },
  messageText: {
    fontSize: width * 0.04,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    height: height * 0.07,
    fontSize: width * 0.04,
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#e8f17f',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  sendButtonText: {
    fontSize: width * 0.045,
    color: '#333',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#363D45',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    color: '#e8f17f',
    marginBottom: 20,
  },
  signOutButton: {
    backgroundColor: '#e8f17f',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  signOutButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#8cbcb9',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
