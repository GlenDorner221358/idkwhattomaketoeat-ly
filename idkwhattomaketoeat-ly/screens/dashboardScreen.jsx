// IMPORTS
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, Dimensions, KeyboardAvoidingView, Modal, modalVisible, Pressable } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

function DashboardChatScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [messages, setMessages] = useState([
        { text: 'Hello! What would you like to cook today?', fromAI: true }
    ]);
    const [inputText, setInputText] = useState('');

    const sendMessage = () => {
        if (inputText.trim()) {
        setMessages([...messages, { text: inputText, fromAI: false }]);
        setInputText('');
        // Simulate AI response (replace this with your AI logic)
        setTimeout(() => {
            setMessages(prevMessages => [
            ...prevMessages,
            { text: 'Here’s a great recipe for pasta!', fromAI: true }
            ]);
        }, 1000);
        }
    };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login'); // Navigate to login screen after successful sign-out
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>

    {/* Settings Button */}
    <TouchableOpacity style={styles.settingsButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.settingsText}>⚙️</Text>
    </TouchableOpacity>

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
            </View>
          ))}
        </ScrollView>

        <KeyboardAvoidingView behavior="padding" style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#aaa"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>

        {/* Modal for Settings */}
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

export default DashboardChatScreen;

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
