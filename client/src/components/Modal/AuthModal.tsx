'use client'

import { LoginRequest, RegisterRequest } from "@/api/api";
import { AuthModes } from "@/constants/constants";
import { useAuthStore } from "@/store/store";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

type AuthModeType = "login" | 'register';

export default function AuthModal() {
    const { isLoginModalOpen, setLoginModalOpen, authMode, setAuthMode, setAccess_Token, login } = useAuthStore();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const isLoginMode = authMode === AuthModes.LOGIN;
    const isRegisterMode = authMode === AuthModes.REGISTER;

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const changeAuthMode = (mode: AuthModeType) => {
        setAuthMode(mode);
        setFormData({ email: '', password: '', confirmPassword: '' });
    }

    const closeModal = () => {
        setLoginModalOpen(false);
        setFormData({ email: '', password: '', confirmPassword: '' });
    }

    const RegisterAndClose = async () => {
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        await RegisterRequest({ email: formData.email, password: formData.password });
        closeModal();
    };
    
    const LoginAndClose = async () => {
        const data = await LoginRequest({ email: formData.email, password: formData.password });
        setAccess_Token(data.access_token);
        login({ email: formData.email });
        closeModal();
    };
    
    const handleAuthSubmit = async () => {
        if (isLoginMode) {
            await LoginAndClose();
        }
        else if (isRegisterMode) {
            await RegisterAndClose();
        }
    };
  
    return <Dialog open={isLoginModalOpen} onClose={closeModal}>
        <DialogTitle>
            {isLoginMode ? 'Login' : 'Register'}
        </DialogTitle>
        <DialogContent>
            <Typography variant="body2" sx={{ mb: 2 }}>
                {isLoginMode ? 'Welcome back!' : 'Create a new account'}
            </Typography>

            <InputLabel htmlFor="email">Email</InputLabel>
            <Input 
                id="email" 
                type="email" 
                fullWidth 
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                sx={{ mb: 2 }}
            />

            <InputLabel htmlFor="password">Password</InputLabel>
            <Input 
                id="password" 
                type="password" 
                fullWidth 
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                sx={{ mb: 2 }}
            />

            {isRegisterMode && (
                <>
                    <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                    <Input 
                        id="confirmPassword" 
                        type="password" 
                        fullWidth 
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        sx={{ mb: 2 }}
                    />
                </>
            )}
        </DialogContent>
        <DialogActions>
            <Button onClick={closeModal}>Cancel</Button>
            <Button onClick={handleAuthSubmit} variant="contained">
                {isLoginMode ? 'Login' : 'Register'}
            </Button>
            <Typography 
                variant="caption" 
                sx={{ mr: 2, cursor: 'pointer', color: 'primary.main' }}
                onClick={() => changeAuthMode(isLoginMode ? AuthModes.REGISTER as AuthModeType : AuthModes.LOGIN as AuthModeType)}
            >
                {isLoginMode ? 'Create account' : 'Back to login'}
            </Typography>
        </DialogActions>
    </Dialog>;
}