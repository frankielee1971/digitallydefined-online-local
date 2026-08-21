import React, { useState } from 'react';
import { usePuter } from '../../hooks/usePuter.js';
import { Save, LogOut, User, Check, Loader2, FolderOpen } from 'lucide-react';
import './PuterAuth.css';

export default function PuterAuth({ onAuthComplete }) {
  const { 
    isAuthenticated, 
    user, 
    isLoading, 
    signIn, 
    signOut,
    puter 
  } = usePuter();
  
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsSigningIn(true);
      await signIn();
      if (onAuthComplete) {
        onAuthComplete();
      }
    } catch (error) {
      console.error('Sign in failed:', error);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  // If already authenticated, show user badge
  if (isAuthenticated && user) {
    return (
      <div className="puter-auth-container">
        <div className="puter-user-badge">
          <div className="user-info">
            <User size={16} />
            <span className="username">{user.username || 'User'}</span>
          </div>
          <button 
            className="signout-btn"
            onClick={handleSignOut}
            title="Sign out"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    );
  }

  // Show sign-in button
  return (
    <div className="puter-auth-container">
      <button 
        className="puter-signin-btn"
        onClick={handleSignIn}
        disabled={isSigningIn || isLoading}
      >
        {isSigningIn || isLoading ? (
          <>
            <Loader2 size={16} className="spin" />
            <span>Connecting...</span>
          </>
        ) : (
          <>
            <Save size={16} />
            <span>Save to Cloud Drive</span>
          </>
        )}
      </button>
    </div>
  );
}

// Enhanced version with save functionality
export function PuterSaveButton({ filename, content, mimeType = 'text/plain', onSaveComplete }) {
  const { 
    isAuthenticated, 
    user, 
    signIn, 
    writeFile,
    showAlert 
  } = usePuter();
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const handleSave = async () => {
    // If not authenticated, sign in first
    if (!isAuthenticated) {
      try {
        await signIn();
      } catch (error) {
        setSaveStatus('error');
        return;
      }
    }

    // Save file
    setIsSaving(true);
    setSaveStatus('saving');
    
    try {
      const result = await writeFile(filename, content, { mimeType });
      
      if (result.success) {
        setSaveStatus('success');
        if (onSaveComplete) {
          onSaveComplete(result);
        }
        
        // Show success notification
        await showAlert(`✅ Saved to your cloud drive: ${result.path}`, {
          type: 'success'
        });
        
        // Reset status after 3 seconds
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        setSaveStatus('error');
        console.error('Save failed:', result.error);
      }
    } catch (error) {
      setSaveStatus('error');
      console.error('Save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="puter-save-container">
      <button
        className={`puter-save-btn ${saveStatus}`}
        onClick={handleSave}
        disabled={isSaving}
        title={isAuthenticated ? `Save as ${filename}` : 'Sign in to save'}
      >
        {isSaving ? (
          <>
            <Loader2 size={18} className="spin" />
            <span>Saving...</span>
          </>
        ) : saveStatus === 'success' ? (
          <>
            <Check size={18} />
            <span>Saved!</span>
          </>
        ) : (
          <>
            <FolderOpen size={18} />
            <span>{isAuthenticated ? 'Save to Cloud' : 'Sign In to Save'}</span>
          </>
        )}
      </button>
      
      {isAuthenticated && user && (
        <span className="save-hint">
          Saving as {user.username}'s file
        </span>
      )}
    </div>
  );
}
