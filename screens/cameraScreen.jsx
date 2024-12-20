import { Camera } from 'expo-camera/legacy';
import { useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function CameraScreen({ navigation }) {

  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [previewUri, setPreviewUri] = useState(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>We need your permission to use the camera</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Allow</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setPreviewUri(photo.uri); // Set the preview image URI
    }
  };

  const retakePicture = () => {
    setPreviewUri(null); // Reset the photo preview URI
  };

  const addToChat = () => {
    if (previewUri) {
      // Navigate to the dashboard and pass the image URI
      navigation.navigate('dashboard', { imageUri: previewUri });
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* camera box */}
      <View style={styles.cameraContainer}>
        {previewUri ? (
          <View style={styles.preview}>
            <Image source={{ uri: previewUri }} style={styles.imagePreview} />
          </View>
        ) : (
          <Camera style={styles.camera} ref={ref => setCameraRef(ref)} />
        )}
      </View>

      {/* take photo button */}
      <TouchableOpacity style={styles.button} onPress={previewUri ? addToChat : takePicture}>
        <Text style={styles.buttonText}>{previewUri ? 'Add to Chat' : 'Take Picture'}</Text>
      </TouchableOpacity>

      {/* "Retake Photo" button */}
      <TouchableOpacity style={styles.retakeButton} onPress={retakePicture}>
        <Text style={styles.buttonText}>Retake Photo</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363D45',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    width: width * 0.85,
    height: height * 0.5,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#363D45',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  preview: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  button: {
    width: width * 0.6,
    height: height * 0.07,
    backgroundColor: '#e8f17f',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  retakeButton: {
    width: width * 0.5,
    height: height * 0.07,
    backgroundColor: '#8cbcb9',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 15
  },
  buttonText: {
    color: '#333',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionText: {
    color: 'black',
    fontSize: width * 0.045,
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#e8f17f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  permissionButtonText: {
    color: '#333',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
});
