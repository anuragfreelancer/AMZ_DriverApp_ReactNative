import {
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform,
    PermissionsAndroid,
    Image,
    Dimensions,
    Modal,
    ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
    Camera,
    useCameraDevice,
    useCameraFormat,
    VideoFile,
} from 'react-native-vision-camera';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import imageIndex from '../../../assets/imageIndex';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const RecordVideo = () => {
    const camera = useRef(null);
    const videoPlayer = useRef(null);
    const [switchCameraValue, setSwitchCameraValue] = useState('back');
    const [flash, setFlash] = useState('off');
    const [saveError, setSaveError] = useState(null);
    const device = useCameraDevice(switchCameraValue);
    const format = useCameraFormat(device, [{photoHdr: true}, {videoHdr: true}]);
    const supportsFlash = device?.hasFlash ?? false;
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [recordedVideo, setRecordedVideo] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [maxRecordingTime] = useState(60); // 60 seconds max recording time
    const timerRef = useRef(null);
    const recordingStartTimeRef = useRef(null);

    useEffect(() => {
        async function getPermission() {
            const cameraPermission = await Camera.requestCameraPermission();
            console.log(`Camera permission status: ${cameraPermission}`);
            if (cameraPermission === 'denied') await Linking.openSettings();

            const microphonePermission = await Camera.requestMicrophonePermission();
            console.log(`Microphone permission status: ${microphonePermission}`);
            if (microphonePermission === 'denied') await Linking.openSettings();

            if (Platform.OS === 'ios') {
                const photoLibraryPermission =
                    await Camera.requestPhotoLibraryPermission();
                console.log(
                    `Photo library permission status: ${photoLibraryPermission}`,
                );
                if (photoLibraryPermission === 'denied') await Linking.openSettings();
            } else {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                        {
                            title: 'Storage Permission',
                            message: 'App needs access to your storage to save videos',
                            buttonNeutral: 'Ask Me Later',
                            buttonNegative: 'Cancel',
                            buttonPositive: 'OK',
                        },
                    );
                    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                        console.log('Storage permission denied');
                    }
                } catch (err) {
                    console.warn(err);
                }
            }
        }
        getPermission();
    }, []);

    const startTimer = () => {
        recordingStartTimeRef.current = Date.now();
        timerRef.current = setInterval(() => {
            const elapsedSeconds = Math.floor((Date.now() - recordingStartTimeRef.current) / 1000);
            setRecordingTime(elapsedSeconds);
            
            // Stop recording if max time reached
            if (elapsedSeconds >= maxRecordingTime) {
                stopRecording();
            }
        }, 1000);
    };

    const stopTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const resetTimer = () => {
        stopTimer();
        setRecordingTime(0);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
    };

    const startRecording = async () => {
        if (camera.current !== null) {
            try {
                setIsRecording(true);
                startTimer();
                
                await camera.current.startRecording({
                    flash: switchCameraValue === 'back' ? flash : 'off',
                    onRecordingFinished: (video: VideoFile) => {
                        console.log('Recording finished', video);
                        setRecordedVideo(video);
                        setShowPreview(true);
                        setIsRecording(false);
                        resetTimer();
                    },
                    onRecordingError: (error) => {
                        console.error('Recording error', error);
                        setSaveError('Failed to record video. Please try again.');
                        setTimeout(() => setSaveError(null), 3000);
                        setIsRecording(false);
                        resetTimer();
                    }
                });
            } catch (error) {
                console.error('Failed to start recording:', error);
                setIsRecording(false);
                stopTimer();
                setSaveError('Failed to start recording. Please try again.');
                setTimeout(() => setSaveError(null), 3000);
            }
        }
    };

    const stopRecording = async () => {
        if (camera.current !== null && isRecording) {
            try {
                await camera.current.stopRecording();
            } catch (error) {
                console.error('Failed to stop recording:', error);
            }
        }
    };

    const saveVideo = async () => {
        if (!recordedVideo) return;
        
        setIsSaving(true);
        try {
            await CameraRoll.save(`file://${recordedVideo.path}`, {
                type: 'video',
                album: 'MyAppVideos',
            });
            console.log('Video saved successfully!');
            
            // Close preview and reset
            setShowPreview(false);
            setRecordedVideo(null);
            
        } catch (error) {
            console.log('Failed to save video:', error);
            setSaveError('Failed to save video. Please check permissions.');
            setTimeout(() => setSaveError(null), 3000);
        } finally {
            setIsSaving(false);
        }
    };

    const discardVideo = () => {
        setShowPreview(false);
        setRecordedVideo(null);
    };

    const toggleCameraType = () => {
        setSwitchCameraValue(prev => (prev === 'back' ? 'front' : 'back'));
    };

    const toggleFlash = () => {
        setFlash(prev => (prev === 'off' ? 'on' : 'off'));
    };

    const closePreview = () => {
        setShowPreview(false);
        setRecordedVideo(null);
    };

    if (device == null) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading camera...</Text>
            </View>
        );
    }
const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComponent backgroundColor='black'/>
            
            {/* Camera View */}
            {!showPreview && (
                <Camera
                    ref={camera}
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={true}
                    photo={true}
                    video={true}
                    audio={true}
                    videoStabilizationMode="cinematic"
                    videoHdr={format?.supportsVideoHdr}
                    photoHdr={format?.supportsPhotoHdr}
                    // flash={supportsFlash ? flash : 'off'}
                    photoQualityBalance="quality"
                />
            )}
            
            {/* Video Preview Modal */}
            {showPreview && recordedVideo && (
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={showPreview}
                    onRequestClose={closePreview}
                >
                    <View style={styles.previewContainer}>
                        <Video
                            ref={videoPlayer}
                            source={{ uri: `file://${recordedVideo.path}` }}
                            style={styles.videoPlayer}
                            resizeMode="contain"
                            paused={false}
                            repeat={true}
                            controls={true}
                        />
                        
                        <View style={styles.previewControls}>
                            <TouchableOpacity 
                                style={[styles.previewButton, styles.discardButton]}
                                onPress={discardVideo}
                                disabled={isSaving}
                            >
                                <Icon name="delete" size={24} color="white" />
                                <Text style={styles.previewButtonText}>Discard</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={[styles.previewButton, styles.saveButton]}
                                onPress={saveVideo}
                                disabled={isSaving}
                            >
                                {isSaving ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <>
                                        <Icon name="save" size={24} color="white" />
                                        <Text style={styles.previewButtonText}>Save</Text>
                                    </>
                                )}
                            </TouchableOpacity>
                        </View>
                        
                        <TouchableOpacity 
                            style={styles.closePreviewButton}
                            onPress={closePreview}
                        >
                            <Icon name="close" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                </Modal>
            )}
            
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
                    <Image 
                        style={styles.backIcon}
                        source={imageIndex.back}
                    />
                </TouchableOpacity>
                
                {/* <View style={styles.headerRight}>
                    {switchCameraValue === 'back' && supportsFlash && (
                        <TouchableOpacity 
                            style={[styles.iconButton, flash === 'on' && styles.activeIcon]}
                            onPress={toggleFlash}
                        >
                            <Icon 
                                name={flash === 'on' ? 'flash-on' : 'flash-off'} 
                                size={24} 
                                color="white" 
                            />
                        </TouchableOpacity>
                    )}
                </View> */}
            </View>
            
            {saveError && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{saveError}</Text>
                </View>
            )}
            
            {/* Recording Timer */}
            {isRecording && (
                <View style={styles.timerContainer}>
                    <View style={styles.recordingIndicator}>
                        <View style={styles.recordingDot} />
                        <Text style={styles.recordingText}>Recording</Text>
                    </View>
                    <Text style={styles.timerText}>{formatTime(recordingTime)}</Text>
                    <Text style={styles.maxTimeText}>Max: {formatTime(maxRecordingTime)}</Text>
                </View>
            )}
            
            {/* Bottom Controls */}
            <View style={styles.bottomControls}>
                <TouchableOpacity style={styles.sideButton}>
                    <Image 
                        source={imageIndex.syboll}
                        style={styles.sideIcon}
                    />
                </TouchableOpacity>
                
                <View style={styles.captureContainer}>
                    {!isRecording ? (
                        // Record Button
                        <TouchableOpacity 
                            style={styles.recordButton}
                            onPress={startRecording}
                            disabled={showPreview}
                        >
                            <View style={styles.recordButtonOuter}>
                                <View style={styles.recordButtonInner} />
                            </View>
                        </TouchableOpacity>
                    ) : (
                        // Stop Recording Button
                        <TouchableOpacity 
                            style={styles.stopRecordingButton}
                            onPress={stopRecording}
                        >
                            <View style={styles.stopButtonInner} />
                        </TouchableOpacity>
                    )}
                    
                    {isRecording && (
                        <View style={styles.recordingTimeContainer}>
                            <Text style={styles.recordingTimerText}>
                                {formatTime(recordingTime)}
                            </Text>
                        </View>
                    )}
                </View>
                
                <TouchableOpacity 
                    style={styles.sideButton}
                    onPress={toggleCameraType}
                    disabled={isRecording || showPreview}
                >
                    <Image 
                        source={imageIndex.forntImg}
                        style={styles.sideIcon}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 50 : 20,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        zIndex: 10,
    },
    backButton: {
        padding: 10,
        marginTop:20
    },
    backIcon: {
        height: 40,
        width: 40,
        // tintColor: 'white',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    activeIcon: {
        backgroundColor: 'rgba(255, 193, 7, 0.3)',
    },
    errorContainer: {
        position: 'absolute',
        top: 100,
        alignSelf: 'center',
        backgroundColor: 'rgba(255, 0, 0, 0.8)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        zIndex: 20,
    },
    errorText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },
    timerContainer: {
        position: 'absolute',
        top: 100,
        alignSelf: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        alignItems: 'center',
        zIndex: 10,
    },
    recordingIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    recordingDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'red',
        marginRight: 8,
    },
    recordingText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
    timerText: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
    },
    maxTimeText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 10,
        marginTop: 2,
    },
    bottomControls: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    sideButton: {
        padding: 10,
        opacity: 0.9,
    },
    sideIcon: {
        height: 40,
        width: 40,
        resizeMode: 'contain',
        tintColor: 'white',
    },
    captureContainer: {
        alignItems: 'center',
    },
    recordButton: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    recordButtonOuter: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 3,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    recordButtonInner: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'white',
    },
    stopRecordingButton: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stopButtonInner: {
        width: 30,
        height: 30,
        backgroundColor: 'red',
        borderRadius: 4,
    },
    recordingTimeContainer: {
        position: 'absolute',
        top: -40,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 15,
    },
    recordingTimerText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    // Preview Styles
    previewContainer: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoPlayer: {
        width: width,
        height: height * 0.7,
    },
    previewControls: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    previewButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingVertical: 12,
        borderRadius: 25,
        minWidth: 120,
        justifyContent: 'center',
    },
    discardButton: {
        backgroundColor: 'rgba(255, 0, 0, 0.8)',
    },
    saveButton: {
        backgroundColor: 'rgba(0, 150, 0, 0.8)',
    },
    previewButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    closePreviewButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 50 : 20,
        right: 20,
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
    },
});

export default RecordVideo;