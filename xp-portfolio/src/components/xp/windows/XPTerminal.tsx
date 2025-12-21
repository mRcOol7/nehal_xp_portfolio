import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
  timestamp?: Date;
}

const XPTerminal: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: 'Windows XP Terminal v1.0', timestamp: new Date() },
    { type: 'output', content: 'Copyright (c) 2024 Nehal Chauhan Portfolio', timestamp: new Date() },
    { type: 'output', content: '', timestamp: new Date() },
    { type: 'output', content: 'Type "help" for available commands', timestamp: new Date() },
    { type: 'output', content: '', timestamp: new Date() },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentPath, setCurrentPath] = useState('C:\\Documents and Settings\\Nehal>');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    // Focus input when terminal mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const addLine = (line: TerminalLine) => {
    setLines(prev => [...prev, { ...line, timestamp: new Date() }]);
  };

  const executeCommand = (command: string) => {
    const trimmedCommand = command.trim();
    const parts = trimmedCommand.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Add the command to history
    addLine({ type: 'input', content: `${currentPath} ${trimmedCommand}` });

    switch (cmd) {
      case 'help':
        addLine({ type: 'output', content: 'Available commands:' });
        addLine({ type: 'output', content: '  help     - Show this help message' });
        addLine({ type: 'output', content: '  clear    - Clear the terminal screen' });
        addLine({ type: 'output', content: '  echo     - Display a message' });
        addLine({ type: 'output', content: '  date     - Show current date and time' });
        addLine({ type: 'output', content: '  dir      - List directory contents' });
        addLine({ type: 'output', content: '  cd       - Change directory' });
        addLine({ type: 'output', content: '  whoami   - Display current user' });
        addLine({ type: 'output', content: '  system   - Show system information' });
        addLine({ type: 'output', content: '  about    - About this terminal' });
        addLine({ type: 'output', content: '  exit     - Close terminal' });
        break;

      case 'clear':
        setLines([
          { type: 'output', content: 'Windows XP Terminal v1.0', timestamp: new Date() },
          { type: 'output', content: 'Type "help" for available commands', timestamp: new Date() },
          { type: 'output', content: '', timestamp: new Date() },
        ]);
        return;

      case 'echo':
        if (args.length > 0) {
          addLine({ type: 'output', content: args.join(' ') });
        } else {
          addLine({ type: 'output', content: 'ECHO is on.' });
        }
        break;

      case 'date':
        {
          const now = new Date();
          addLine({ type: 'output', content: `Current date: ${now.toLocaleDateString()}` });
          addLine({ type: 'output', content: `Current time: ${now.toLocaleTimeString()}` });
        }
        break;

      case 'dir':
        {
          addLine({ type: 'output', content: ' Volume in drive C is Windows' });
          addLine({ type: 'output', content: ' Volume Serial Number is 1234-ABCD' });
          addLine({ type: 'output', content: ' Directory of C:\\Documents and Settings\\Nehal' });
          addLine({ type: 'output', content: '' });
          addLine({ type: 'output', content: '2024/01/15  10:30 AM    <DIR>          Desktop' });
          addLine({ type: 'output', content: '2024/01/15  10:30 AM    <DIR>          Documents' });
          addLine({ type: 'output', content: '2024/01/15  10:30 AM    <DIR>          Downloads' });
          addLine({ type: 'output', content: '2024/01/15  10:30 AM    <DIR>          Favorites' });
          addLine({ type: 'output', content: '2024/01/15  10:30 AM    <DIR>          My Documents' });
          addLine({ type: 'output', content: '2024/01/15  10:30 AM    <DIR>          My Pictures' });
          addLine({ type: 'output', content: '2024/01/15  10:30 AM             1,234 resume.txt' });
          addLine({ type: 'output', content: '2024/01/15  10:30 AM               512 config.ini' });
          addLine({ type: 'output', content: '               2 File(s)          1,746 bytes' });
          addLine({ type: 'output', content: '               6 Dir(s)  45,123,456,789 bytes free' });
        }
        break;

      case 'cd':
        {
          if (args.length === 0) {
            addLine({ type: 'output', content: currentPath });
          } else if (args[0] === '..') {
            if (currentPath.includes('\\')) {
              const newPath = currentPath.substring(0, currentPath.lastIndexOf('\\'));
              setCurrentPath(newPath + '>');
              addLine({ type: 'output', content: newPath });
            }
          } else if (args[0] === '\\') {
            setCurrentPath('C:\\>');
            addLine({ type: 'output', content: 'C:\\' });
          } else {
            setCurrentPath(`${currentPath.slice(0, -1)}\\${args[0]}>`);
            addLine({ type: 'output', content: `${currentPath.slice(0, -1)}\\${args[0]}` });
          }
        }
        break;

      case 'whoami':
        addLine({ type: 'output', content: 'NEHAL-PC\\Nehal' });
        break;

      case 'system':
        addLine({ type: 'output', content: 'System Information:' });
        addLine({ type: 'output', content: '  OS: Microsoft Windows XP Professional' });
        addLine({ type: 'output', content: '  Version: 5.1.2600 Service Pack 3' });
        addLine({ type: 'output', content: '  Computer: NEHAL-PC' });
        addLine({ type: 'output', content: '  Processor: Intel(R) Core(TM) i5-8250U CPU @ 1.60GHz' });
        addLine({ type: 'output', content: '  Memory: 8.00 GB RAM' });
        break;

      case 'about':
        addLine({ type: 'output', content: 'Windows XP Terminal Emulator' });
        addLine({ type: 'output', content: 'Created by Nehal Chauhan' });
        addLine({ type: 'output', content: 'A web-based terminal simulation for the XP Portfolio' });
        addLine({ type: 'output', content: 'GitHub: https://github.com/mRcOol7' });
        break;

      case 'exit':
        addLine({ type: 'output', content: 'Closing terminal...' });
        setTimeout(() => {
          // This will be handled by the window close functionality
          window.close();
        }, 1000);
        break;

      case '':
        // Empty command, just show new prompt
        break;

      default:
        addLine({ 
          type: 'error', 
          content: `'${cmd}' is not recognized as an internal or external command,` 
        });
        addLine({ 
          type: 'error', 
          content: `operable program or batch file.` 
        });
        break;
    }

    // Add empty line for spacing
    addLine({ type: 'output', content: '' });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
      setCurrentInput('');
    } else if (e.key === 'ArrowUp') {
      // Navigate command history (could be implemented)
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      // Navigate command history (could be implemented)
      e.preventDefault();
    } else if (e.key === 'Tab') {
      // Tab completion (could be implemented)
      e.preventDefault();
    }
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="h-full flex flex-col bg-black font-mono text-sm">
      {/* Terminal Header */}
      <div className="bg-gray-800 px-2 py-1 flex items-center justify-between border-b border-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-gray-400 text-xs">Windows XP Terminal</div>
        <div className="w-16"></div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4"
        onClick={handleTerminalClick}
      >
        {lines.map((line, index) => (
          <div key={index} className="mb-1">
            {line.type === 'input' && (
              <div className="text-green-400">
                <span className="text-white">{line.content}</span>
              </div>
            )}
            {line.type === 'output' && (
              <div className="text-gray-300">{line.content}</div>
            )}
            {line.type === 'error' && (
              <div className="text-red-400">{line.content}</div>
            )}
          </div>
        ))}

        {/* Current Input Line */}
        <div className="flex items-center">
          <span className="text-green-400">{currentPath}</span>
          <span className="text-white ml-1"> </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-white ml-1"
            style={{ caretColor: 'white' }}
          />
          <span className="text-white animate-pulse">_</span>
        </div>
      </div>
    </div>
  );
};

export default XPTerminal;
