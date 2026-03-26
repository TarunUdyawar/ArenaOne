import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import { shadows } from "@/src/constants/shadows";
import { MotiView, AnimatePresence } from "moti";
import { useRouter } from "expo-router";
import { colors } from "@/src/constants/Colors";
import ArenaTextArea from "@/src/components/ArenaTextArea";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "@/src/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { Signup } = useAuth();
  const router = useRouter();

  const uploadImageToCloudinary = async (imageUri: string) => {
    try {
      const form = new FormData();
      form.append("file", {
        uri: imageUri,
        name: "profile.jpg",
        type: "image/jpeg",
      } as any);
      form.append("upload_preset", "UniVibe");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dlykbkq5h/image/upload",
        { method: "POST", body: form }
      );

      const data = await response.json();
      return data?.secure_url;
    } catch (error: any) {
      console.log(error.message);
      return null;
    }
  };

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      setErrorMessage("Enter all details to enter the arena!");
      return;
    }
    setLoading(true);
    let imageUrl;
    if (profileImage) {
      imageUrl = await uploadImageToCloudinary(profileImage);
      if (!imageUrl) {
        setErrorMessage("Image upload failed. Try again.");
        setLoading(false);
        return;
      }
    }
    try {
      await Signup(name, email, password, imageUrl || "");
      // Success will handle routing automatically from AuthContext
    } catch (error: any) {
      console.log(error.message);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient
          colors={[colors.background, colors.background]}
          style={styles.container}
        >
          <MotiView
            from={{ opacity: 0, translateY: -40 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 800 }}
          >
            <Text style={styles.title}>Arena One</Text>
            <Text style={styles.subtitle}>Create Your Account</Text>
          </MotiView>

          <MotiView
            from={{ opacity: 0, translateY: 40 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 800, delay: 300 }}
            style={styles.form}
          >
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={styles.profileImage}
                />
              ) : (
                <Text style={styles.addImageText}>+ Upload Profile Image</Text>
              )}
            </TouchableOpacity>

            <ArenaTextArea
              label="Enter Your Name"
              value={name}
              onChangeText={setName}
              icon="person-outline"
            />
            <ArenaTextArea
              label="Enter Your Email"
              value={email}
              onChangeText={setEmail}
              icon="mail-outline"
            />
            <ArenaTextArea
              label="Enter Your Password"
              value={password}
              onChangeText={setPassword}
              icon="lock-closed-outline"
              password
            />

            <TouchableOpacity 
              style={[styles.signupBtn, loading && styles.disabledBtn]} 
              onPress={handleSignUp}
              disabled={loading}
            >
              <LinearGradient
                colors={loading ? ['#555', '#333'] : [colors.primary, colors.accent]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.btnGradient}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.signupText}>Sign Up</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/(auth)/SignIn")}>
              <Text style={styles.loginLink}>
                Already have an account?{" "}
                <Text style={{ color: colors.primary, fontWeight: "600" }}>
                  Sign In
                </Text>
              </Text>
            </TouchableOpacity>
          </MotiView>

          {/* Custom Error Modal Overlay */}
          <AnimatePresence>
            {errorMessage !== "" && (
              <MotiView
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "timing", duration: 300 }}
                style={styles.errorModalContainer}
              >
                <View style={styles.errorModal}>
                  <Ionicons name="warning-outline" size={40} color="#e91e63" />
                  <Text style={styles.errorTitle}>Warning!</Text>
                  <Text style={styles.errorMessageText}>{errorMessage}</Text>
                  <TouchableOpacity 
                    style={styles.errorBtn} 
                    onPress={() => setErrorMessage("")}
                  >
                    <Text style={styles.errorBtnText}>OK</Text>
                  </TouchableOpacity>
                </View>
              </MotiView>
            )}
          </AnimatePresence>

        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: {
    fontSize: 38,
    fontWeight: "900",
    color: colors.primary,
    textAlign: "center",
    textShadowColor: colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    marginTop: 60,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 6,
  },
  form: { width: width * 0.85, marginTop: 40, paddingBottom: 50 },
  imagePicker: {
    marginTop: -20,
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.primary,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 20,
  },
  profileImage: { height: "100%", width: "100%", borderRadius: 50 },
  addImageText: {
    color: colors.textSecondary,
    fontWeight: "600",
    textAlign: "center",
    fontSize: 14,
  },
  signupBtn: { marginTop: 30, borderRadius: 12, overflow: "hidden" },
  disabledBtn: { opacity: 0.7 },
  btnGradient: { paddingVertical: 15, alignItems: "center", borderRadius: 12 },
  signupText: { color: colors.textPrimary, fontWeight: "700", fontSize: 18 },
  loginLink: {
    marginTop: 20,
    textAlign: "center",
    color: colors.textSecondary,
    fontSize: 18,
    fontWeight: "600",
  },
  errorModalContainer: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  errorModal: {
    width: width * 0.8,
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e91e63',
    ...shadows.large,
  },
  errorTitle: {
    fontSize: 22,
    color: '#e91e63',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  errorMessageText: {
    color: '#ddd',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  errorBtn: {
    backgroundColor: '#e91e63',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  errorBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
