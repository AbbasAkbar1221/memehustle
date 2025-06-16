import React, { useEffect, useState } from 'react';

const messages = [
  'Initializing MemeHustle...',
  'Connecting to neon-grid...',
  'Syncing real-time channels...',
  'Ready.'
];

export default function TerminalEffect() {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let idx = 0;
    let charIdx = 0;
    function type() {
      if (idx >= messages.length) return;
      const msg = messages[idx];
      if (charIdx < msg.length) {
        setDisplay(prev => prev + msg.charAt(charIdx));
        charIdx++;
        setTimeout(type, 50);
      } else {
        setDisplay(prev => prev + '\n');
        idx++;
        charIdx = 0;
        setTimeout(type, 300);
      }
    }
    type();
  }, []);

  return (
    <pre className="font-mono text-sm text-neonYellow whitespace-pre-wrap mb-4">
      {display}
    </pre>
  );
}
