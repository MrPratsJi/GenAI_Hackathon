import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import "../firebase";

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const validate = () => {
    if (!email.match(/^\S+@\S+\.\S+$/)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    setError("");
    if (!validate()) return;
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignup = async () => {
    setError("");
    if (!validate()) return;
    try {
      await createUserWithEmailAndPassword(getAuth(), email, password);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(18,32,56,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999}}>
      <div style={{background: "linear-gradient(135deg, #16243a 0%, #233e5c 100%)", borderRadius: 18, padding: 40, minWidth: 340, maxWidth: 420, boxShadow: "0 8px 32px 0 #00eaff88", color: "#eaf6fb", position: "relative", fontFamily: 'Inter, Segoe UI, Arial, sans-serif'}}>
        <button style={{position: "absolute", top: 18, right: 18, fontSize: 22, border: "none", background: "none", color: "#00eaff", cursor: "pointer"}} onClick={onClose}>×</button>
        <h2 style={{marginBottom: 24, color: "#00eaff", fontWeight: 800, fontSize: "2rem", textAlign: "center"}}>{isLogin ? "Log In" : "Sign Up"}</h2>
        {!user ? (
          <>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{width: "100%", marginBottom: 14, padding: 12, borderRadius: 8, border: "1.5px solid #00eaff33", background: "#1b2c47", color: "#eaf6fb", fontSize: 16}} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{width: "100%", marginBottom: 14, padding: 12, borderRadius: 8, border: "1.5px solid #00eaff33", background: "#1b2c47", color: "#eaf6fb", fontSize: 16}} />
            {error && <div style={{color: "#ff6b6b", marginBottom: 10, textAlign: "center"}}>{error}</div>}
            <button onClick={isLogin ? handleLogin : handleSignup} style={{width: "100%", padding: 12, borderRadius: 8, background: "linear-gradient(90deg, #00eaff 0%, #3a8dde 100%)", color: "#fff", border: "none", fontWeight: 700, fontSize: 18, marginBottom: 10, boxShadow: "0 2px 12px 0 #00eaff44", cursor: "pointer"}}>{isLogin ? "Log In" : "Sign Up"}</button>
            <button onClick={() => setIsLogin(!isLogin)} style={{width: "100%", padding: 10, borderRadius: 8, background: "#233e5c", color: "#00eaff", border: "none", fontWeight: 600, fontSize: 16, cursor: "pointer"}}>{isLogin ? "Show Sign Up" : "Show Log In"}</button>
          </>
        ) : (
          <div style={{textAlign: "center"}}>
            <p style={{marginBottom: 18}}>Welcome, {user.email}</p>
            <button onClick={onClose} style={{padding: 10, borderRadius: 8, background: "linear-gradient(90deg, #00eaff 0%, #3a8dde 100%)", color: "#fff", border: "none", fontWeight: 700, fontSize: 16, cursor: "pointer"}}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
