import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { router } from "expo-router";
import { colors } from "@/src/constants/Colors";
import ArenaTextArea from "@/src/components/ArenaTextArea";
import { useAuth } from "@/src/context/AuthContext";

const { width } = Dimensions.get("window");

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { SignIn } = useAuth();

  const handleSignIn = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Sign In", "Enter all the Details");
        return;
      }
      setLoading(true);
      await SignIn(email, password);
      setLoading(false);
    } catch (error: any) {
      let msg = error.message;
      console.log(msg);
      setLoading(false);
    }
  };

  return (
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
        <Text style={styles.subtitle}>Welcome Back</Text>
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 40 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 800, delay: 300 }}
        style={styles.form}
      >
        <ArenaTextArea
          label="Enter Your Email"
          value={email}
          onChangeText={(e) => setEmail(e)}
          icon="mail-outline"
        />

        <ArenaTextArea
          label="Enter Your Password"
          value={password}
          onChangeText={(e) => setPassword(e)}
          icon="lock-closed-outline"
          password
        />

        <TouchableOpacity style={styles.loginBtn} onPress={handleSignIn}>
          <LinearGradient
            colors={[colors.primary, colors.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.btnGradient}
          >
            {loading ? (
              <ActivityIndicator size={"small"} color={colors.secondary} />
            ) : (
              <Text style={styles.loginText}>Sign In</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/(auth)/SignUp")}>
          <Text style={styles.signupLink}>
            Don’t have an account?
            <Text style={{ color: colors.primary, fontWeight: "600" }}>
              {" "}
              Sign Up
            </Text>
          </Text>
        </TouchableOpacity>
      </MotiView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "900",
    color: colors.primary,
    textAlign: "center",
    textShadowColor: colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 6,
  },
  form: {
    width: width * 0.85,
    marginTop: 40,
  },

  loginBtn: {
    marginTop: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
  btnGradient: {
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 12,
  },
  loginText: {
    color: colors.textPrimary,
    fontWeight: "700",
    fontSize: 18,
  },
  signupLink: {
    marginTop: 20,
    textAlign: "center",
    color: colors.textSecondary,
    fontSize: 18,
    fontWeight: "600",
  },
});
