import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Trash2, X, Code, FileText, AlertTriangle } from 'lucide-react';
import useMentor from '../hooks/useMentor';
import { onHermesTyping } from '../lib/hermes.js';

export default function MentorWidget({ topic = 'default', systemPrompt, toolState, autoOpenCount = 0 }) {
  const {
    messages,
    loading,
    error,
    isOpen,
    devMode,
    messagesEndRef,
    sendMessage,
    clearChat,
    toggleOpen,
    setIsOpen
  } = useMentor(topic, { systemPrompt, toolState });

  const [inputValue, setInputValue] = useState('');
  const [isHermesTyping, setIsHermesTyping] = useState(false);
  const inputRef = useRef(null);

  /* Focus input when opened */
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  /* Auto-open when triggered by inactivity or tool events */
  useEffect(() => {
    if (autoOpenCount > 0) {
      setIsOpen(true);
    }
  }, [autoOpenCount, setIsOpen]);

  /* Hermes typing indicator */
  useEffect(() => {
    onHermesTyping((state) => setIsHermesTyping(state));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || loading) return;
    const msg = inputValue.trim();
    setInputValue('');
    await sendMessage(msg);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleOpen}
        className="mentor-toggle-btn"
        aria-label={isOpen ? 'Close Hermes mentor' : 'Open Hermes mentor'}
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {/* Widget */}
      {isOpen && (
        <div className="mentor-widget">
          {/* Header */}
          <div className="mentor-widget__header">
            <div>
              <div className="mentor-widget__title">Hermes</div>
              <div className="mentor-widget__subtitle">DigitallyDefined AI Mentor</div>
            </div>

            <div className="mentor-widget__header-actions">
              {devMode && (
                <span className="mentor-widget__dev-badge">
                  DEV MODE
                </span>
              )}
              <button
                onClick={clearChat}
                className="mentor-widget__icon-button"
                title="Clear chat"
                aria-label="Clear chat"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="mentor-widget__messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mentor-widget__message mentor-widget__message--${msg.role}`}
              >
                {/* Dev Guidance Label */}
                {msg.isDevGuidance && (
                  <div className="mentor-widget__dev-notice">
                    <AlertTriangle size={14} />
                    <span>Developer Guidance</span>
                  </div>
                )}

                {/* Main Message */}
                <div className="mentor-widget__message-content">
                  {msg.content}
                </div>

                {/* Optional Dev Blocks */}
                {(msg.filePath || msg.codeSnippet || msg.exactChange) && (
                  <div className="mentor-widget__dev-block">
                    {msg.filePath && (
                      <div className="mentor-widget__dev-label">
                        <FileText size={14} />
                        <span>{msg.filePath}</span>
                      </div>
                    )}

                    {msg.codeSnippet && (
                      <pre className="mentor-widget__code">
                        <code>{msg.codeSnippet}</code>
                      </pre>
                    )}

                    {msg.exactChange && (
                      <div className="mentor-widget__change">
                        <Code size={14} />
                        <span>{msg.exactChange}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {(isHermesTyping || loading) && (
              <div className="hermes-typing">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                Hermes is thinking…
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Error */}
          {error && (
            <div className="mentor-widget__error">{error}</div>
          )}

          {/* Composer */}
          <form className="mentor-widget__composer" onSubmit={handleSubmit}>
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Ask Hermes anything..."
              disabled={loading}
              rows={2}
            />

            <button
              type="submit"
              disabled={!inputValue.trim() || loading}
              className="mentor-widget__send"
              aria-label="Send message"
            >
              {loading ? '...' : <Send size={17} />}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
