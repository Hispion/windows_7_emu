document.addEventListener('DOMContentLoaded', function() {
    // Update clock
    function updateClock() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        document.querySelector('.time').textContent = timeStr;
    }
    
    updateClock();
    setInterval(updateClock, 60000);
    
    // Handle clicking on desktop icons
    const icons = document.querySelectorAll('.icon');
    icons.forEach(icon => {
        icon.addEventListener('click', function() {
            const appName = this.getAttribute('data-name');
            createWindow(appName);
        });
        
        // Double click handling
        icon.addEventListener('dblclick', function(e) {
            e.preventDefault();
            const appName = this.getAttribute('data-name');
            createWindow(appName);
        });
    });
    
    // Handle start button
    const startButton = document.querySelector('.start-button');
    const startMenu = document.querySelector('.start-menu');
    
    startButton.addEventListener('click', function() {
        if (startMenu.style.display === 'none') {
            startMenu.style.display = 'block';
        } else {
            startMenu.style.display = 'none';
        }
    });
    
    // Close start menu when clicking elsewhere
    document.addEventListener('click', function(e) {
        if (!startButton.contains(e.target) && !startMenu.contains(e.target)) {
            startMenu.style.display = 'none';
        }
    });
    
    // Window handling
    let windowCounter = 0;
    let activeWindow = null;
    
    function createWindow(title) {
        // Clone window template
        const windowTemplate = document.getElementById('window-template');
        const newWindow = windowTemplate.cloneNode(true);
        newWindow.id = 'window-' + windowCounter++;
        newWindow.style.display = 'flex';
        newWindow.style.left = (50 + (windowCounter * 20)) + 'px';
        newWindow.style.top = (50 + (windowCounter * 20)) + 'px';
        newWindow.style.width = '500px';
        newWindow.style.height = '350px';
        
        // Set window title
        const windowTitle = newWindow.querySelector('.window-title');
        windowTitle.textContent = title;
        
        // Add window content based on type
        const windowContent = newWindow.querySelector('.window-content');
        const windowStatus = newWindow.querySelector('.window-statusbar');
        
        switch(title) {
            case 'My Computer':
                windowContent.innerHTML = `
                    <div style="display: flex; flex-wrap: wrap; gap: 20px;">
                        <div style="text-align: center;">
                            <svg viewBox="0 0 24 24" width="40" height="40">
                                <rect width="18" height="18" x="3" y="3" fill="#ffffcc" stroke="#000" stroke-width="0.5"/>
                                <path d="M5,7 H19 M5,11 H19 M5,15 H19" stroke="#000" stroke-width="0.5"/>
                            </svg>
                            <div style="font-size: 12px;">C: Drive</div>
                        </div>
                        <div style="text-align: center;">
                            <svg viewBox="0 0 24 24" width="40" height="40">
                                <circle cx="12" cy="12" r="8" fill="#ccc" stroke="#000" stroke-width="0.5"/>
                                <circle cx="12" cy="12" r="2" fill="#888"/>
                                <path d="M12,4 L12,6 M20,12 L18,12 M12,20 L12,18 M4,12 L6,12" stroke="#000" stroke-width="1"/>
                            </svg>
                            <div style="font-size: 12px;">CD Drive</div>
                        </div>
                        <div style="text-align: center;">
                            <svg viewBox="0 0 24 24" width="40" height="40">
                                <path d="M5,5 L19,5 L19,19 L5,19 Z" fill="#ddd" stroke="#000" stroke-width="0.5"/>
                                <path d="M8,8 L16,8 L16,16 L8,16 Z" fill="#aaa" stroke="#000" stroke-width="0.5"/>
                            </svg>
                            <div style="font-size: 12px;">Network</div>
                        </div>
                    </div>
                `;
                windowStatus.textContent = '3 items';
                break;
                
            case 'Recycle Bin':
                windowContent.innerHTML = '<div style="text-align: center; padding: 40px; color: #808080;">Recycle Bin is empty</div>';
                windowStatus.textContent = '0 items';
                break;
                
            case 'Internet Explorer':
                windowContent.innerHTML = `
                    <div style="display: flex; flex-direction: column; height: 100%;">
                        <div style="display: flex; padding: 5px; gap: 5px; border-bottom: 1px solid #ccc;">
                            <button class="ie-back" style="padding: 2px 10px;">Back</button>
                            <button class="ie-forward" style="padding: 2px 10px;">Forward</button>
                            <button class="ie-home" style="padding: 2px 10px;">Home</button>
                            <div class="ie-address" style="flex-grow: 1; background: white; border: 1px solid #888; padding: 2px 5px; font-size: 12px;">http://www.windows.com</div>
                            <button class="ie-go" style="padding: 2px 10px;">Go</button>
                        </div>
                        <div class="ie-content" style="flex-grow: 1; padding: 20px; text-align: center;">
                            <h3 style="margin-bottom: 20px;">Welcome to the Internet</h3>
                            <p>The page cannot be displayed because you are not connected to the Internet.</p>
                        </div>
                    </div>
                `;
                windowStatus.textContent = 'Done';
                
                // Internet Explorer functionality
                const ieContent = windowContent.querySelector('.ie-content');
                const ieAddress = windowContent.querySelector('.ie-address');
                const ieGo = windowContent.querySelector('.ie-go');
                const ieHome = windowContent.querySelector('.ie-home');
                
                const loadPage = (url) => {
                    ieAddress.textContent = url;
                    windowStatus.textContent = 'Loading...';
                    
                    setTimeout(() => {
                        if (url.includes('windows.com')) {
                            ieContent.innerHTML = `
                                <h2>Windows Online</h2>
                                <p>Welcome to the official Windows website.</p>
                                <div style="display: flex; justify-content: center; gap: 20px; margin-top: 30px;">
                                    <div style="border: 1px solid #ccc; padding: 15px; width: 120px; text-align: center; cursor: pointer;">
                                        <div>Products</div>
                                    </div>
                                    <div style="border: 1px solid #ccc; padding: 15px; width: 120px; text-align: center; cursor: pointer;">
                                        <div>Support</div>
                                    </div>
                                    <div style="border: 1px solid #ccc; padding: 15px; width: 120px; text-align: center; cursor: pointer;">
                                        <div>Downloads</div>
                                    </div>
                                </div>
                            `;
                        } else if (url.includes('search')) {
                            ieContent.innerHTML = `
                                <h2>Web Search</h2>
                                <div style="margin: 20px 0;">
                                    <input type="text" style="width: 300px; padding: 5px;"> 
                                    <button style="padding: 5px 10px;">Search</button>
                                </div>
                                <p>No search results available.</p>
                            `;
                        } else {
                            ieContent.innerHTML = `
                                <h3>Page Not Found</h3>
                                <p>The page you requested could not be found.</p>
                                <p>Please check the address and try again.</p>
                            `;
                        }
                        windowStatus.textContent = 'Done';
                    }, 1000);
                };
                
                ieGo.addEventListener('click', () => {
                    loadPage(ieAddress.textContent);
                });
                
                ieHome.addEventListener('click', () => {
                    loadPage('http://www.windows.com');
                });
                
                ieAddress.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        loadPage(ieAddress.textContent);
                    }
                });
                break;
                
            case 'My Documents':
                windowContent.innerHTML = '<div style="text-align: center; padding: 40px;">No documents found</div>';
                windowStatus.textContent = '0 items';
                break;
                
            case 'Calculator':
                windowContent.innerHTML = `
                    <div style="width: 220px; margin: 0 auto; padding: 10px; background: #e0e0e0; border: 1px solid #999;">
                        <div class="calc-display" style="background: #fff; border: 1px solid #999; padding: 5px; text-align: right; margin-bottom: 10px; height: 30px; font-size: 18px;">0</div>
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px;">
                            <button class="calc-btn" data-value="7" style="padding: 8px; background: #f0f0f0; border: 1px solid #999;">7</button>
                            <button class="calc-btn" data-value="8" style="padding: 8px; background: #f0f0f0; border: 1px solid #999;">8</button>
                            <button class="calc-btn" data-value="9" style="padding: 8px; background: #f0f0f0; border: 1px solid #999;">9</button>
                            <button class="calc-btn" data-value="/" style="padding: 8px; background: #f0f0f0; border: 1px solid #999;">/</button>
                            <button class="calc-btn" data-value="4" style="padding: 8px; background: #f0f0f0; border: 1px solid #999;">4</button>
                            <button class="calc-btn" data-value="5" style="padding: 8px; background: #f0f0f0; border: 1px solid #999;">5</button>
                            <button class="calc-btn" data-value="6" style="padding: 8px; background: #f0f0f0; border: 1px solid #999;">6</button>
                            <button class="calc-btn" data-value="*" style="padding: 8px; background: #f0f0f0; border: 1px solid #999;">*</button>
                            <button class="calc-btn" data-value="1" style="padding: 8px; background: #f0f0f0; border: 1px solid #999;">1</button>
                            <button class="calc-btn" data-value="2" style="padding: 8px; background: #f0f0f0; border: 1px solid #999;">2</button>
                            <button class="calc-btn" data-value="3" style="padding: 8px; background: #f0f0f0; border: 1px solid #999;">3</button>
                            <button class="calc-btn" data-value="-" style="padding: 8px; background: #f0f0f0; border: 1px solid #999;">-</button>
                            <button class="calc-btn" data-value="0" style="padding: 8px; background: #f0f0f0; border: 1px solid #999;">0</button>
                            <button class="calc-btn" data-value="." style="padding: 8px; background: #f0f0f0; border: 1px solid #999;">.</button>
                            <button class="calc-btn" data-value="=" style="padding: 8px; background: #ff9800; border: 1px solid #999; color: white;">=</button>
                            <button class="calc-btn" data-value="+" style="padding: 8px; background: #f0f0f0; border: 1px solid #999;">+</button>
                        </div>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; margin-top: 5px;">
                            <button class="calc-btn" data-value="C" style="padding: 8px; background: #f0f0f0; border: 1px solid #999;">C</button>
                            <button class="calc-btn" data-value="CE" style="padding: 8px; background: #f0f0f0; border: 1px solid #999;">CE</button>
                            <button class="calc-btn" data-value="backspace" style="padding: 8px; background: #f0f0f0; border: 1px solid #999;">←</button>
                        </div>
                    </div>
                `;
                windowStatus.textContent = 'Ready';
                
                // Calculator functionality
                const calcDisplay = windowContent.querySelector('.calc-display');
                const calcButtons = windowContent.querySelectorAll('.calc-btn');
                
                let firstOperand = null;
                let waitingForSecondOperand = false;
                let operator = null;
                
                calcButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const value = button.getAttribute('data-value');
                        const displayValue = calcDisplay.textContent;
                        
                        if ('0123456789.'.includes(value)) {
                            if (displayValue === '0' || waitingForSecondOperand) {
                                calcDisplay.textContent = value;
                                waitingForSecondOperand = false;
                            } else {
                                calcDisplay.textContent = displayValue + value;
                            }
                        } else if ('+-*/'.includes(value)) {
                            firstOperand = parseFloat(displayValue);
                            operator = value;
                            waitingForSecondOperand = true;
                        } else if (value === '=') {
                            if (operator && !waitingForSecondOperand) {
                                const secondOperand = parseFloat(displayValue);
                                let result;
                                
                                switch (operator) {
                                    case '+': result = firstOperand + secondOperand; break;
                                    case '-': result = firstOperand - secondOperand; break;
                                    case '*': result = firstOperand * secondOperand; break;
                                    case '/': result = firstOperand / secondOperand; break;
                                }
                                
                                calcDisplay.textContent = result;
                                firstOperand = result;
                                waitingForSecondOperand = true;
                                operator = null;
                            }
                        } else if (value === 'C') {
                            calcDisplay.textContent = '0';
                            firstOperand = null;
                            waitingForSecondOperand = false;
                            operator = null;
                        } else if (value === 'CE') {
                            calcDisplay.textContent = '0';
                        } else if (value === 'backspace') {
                            if (displayValue.length > 1) {
                                calcDisplay.textContent = displayValue.slice(0, -1);
                            } else {
                                calcDisplay.textContent = '0';
                            }
                        }
                    });
                });
                break;
                
            case 'Command Prompt':
                windowContent.innerHTML = `
                    <div style="background: black; color: white; font-family: 'Courier New', monospace; padding: 10px; height: 100%; overflow: auto;">
                        <div>Microsoft Windows [Version 5.1.2600]</div>
                        <div>(C) Copyright 1985-2001 Microsoft Corp.</div>
                        <div>&nbsp;</div>
                        <div class="command-line">C:\\>_</div>
                        <input type="text" class="command-input" style="opacity: 0; position: absolute;">
                    </div>
                `;
                windowStatus.textContent = 'C:\\';
                
                // Command prompt functionality
                const cmdInput = windowContent.querySelector('.command-input');
                const cmdLine = windowContent.querySelector('.command-line');
                
                windowContent.addEventListener('click', () => {
                    cmdInput.focus();
                });
                
                cmdInput.addEventListener('input', (e) => {
                    cmdLine.textContent = `C:\\>${e.target.value}_`;
                });
                
                cmdInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        const command = cmdInput.value.trim().toLowerCase();
                        cmdLine.textContent = `C:\\>${command}`;
                        
                        const response = document.createElement('div');
                        
                        if (command === 'help') {
                            response.textContent = 'Available commands: dir, cls, echo, ver, help';
                        } else if (command === 'dir') {
                            response.innerHTML = 'Directory of C:\\\n\n' +
                                '05/11/2001  03:43 PM    <DIR>          Windows\n' +
                                '07/15/2001  08:21 AM    <DIR>          Program Files\n' +
                                '04/12/2001  11:35 AM    <DIR>          Documents and Settings\n' +
                                '               0 File(s)              0 bytes\n' +
                                '               3 Dir(s)   4,294,967,295 bytes free';
                        } else if (command === 'cls') {
                            windowContent.querySelectorAll('div').forEach(el => {
                                if (!el.classList.contains('command-line')) {
                                    el.remove();
                                }
                            });
                            cmdLine.textContent = 'C:\\>_';
                            cmdInput.value = '';
                            return;
                        } else if (command === 'ver') {
                            response.textContent = 'Microsoft Windows [Version 5.1.2600]';
                        } else if (command.startsWith('echo ')) {
                            response.textContent = command.substring(5);
                        } else if (command !== '') {
                            response.textContent = `'${command}' is not recognized as an internal or external command, operable program or batch file.`;
                        }
                        
                        windowContent.insertBefore(response, cmdLine);
                        windowContent.appendChild(cmdLine);
                        cmdInput.value = '';
                        cmdLine.textContent = 'C:\\>_';
                        windowContent.scrollTop = windowContent.scrollHeight;
                    }
                });
                break;
                
            case 'Notepad':
                windowContent.innerHTML = `
                    <div style="display: flex; flex-direction: column; height: 100%;">
                        <textarea class="notepad-content" style="flex-grow: 1; resize: none; border: none; padding: 5px; font-family: 'Consolas', monospace; font-size: 14px; outline: none;"></textarea>
                    </div>
                `;
                windowStatus.textContent = 'Untitled - Notepad';
                
                const notepadContent = windowContent.querySelector('.notepad-content');
                
                // Auto-save to local storage
                const saveKey = 'notepad-' + Date.now();
                notepadContent.addEventListener('input', () => {
                    localStorage.setItem(saveKey, notepadContent.value);
                });
                
                // Set window menu for Notepad
                const fileMenu = newWindow.querySelector('.window-menu div:first-child');
                fileMenu.addEventListener('click', () => {
                    alert('File menu clicked. In a real application, this would show save/open options.');
                });
                break;
                
            case 'Media Player':
                windowContent.innerHTML = `
                    <div style="display: flex; flex-direction: column; height: 100%; background-color: #333; color: white;">
                        <div style="padding: 10px; background-color: #222;">
                            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                <div class="media-now-playing" style="flex-grow: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Select a song to play</div>
                                <select class="media-playlist" style="margin-left: 10px; padding: 4px; background: #444; color: white; border: 1px solid #555;">
                                    <option value="">Select a song</option>
                                    <option value="Relaxed Scene.mp3">Relaxed Scene</option>
                                    <option value="Chess Type Beat (Slowed).mp3">Chess Type Beat (Slowed)</option>
                                    <option value="Wii Party Soundtrack - Main Menu Music.mp3">Wii Party - Main Menu</option>
                                    <option value="THE WORLD REVOLVING.mp3">THE WORLD REVOLVING</option>
                                    <option value="MEGALOVANIA.mp3">MEGALOVANIA</option>
                                    <option value="SuperMarioBros.mp3">Super Mario Bros</option>
                                    <option value="Super Mario RPG - Forest Maze.mp3">Super Mario RPG - Forest Maze</option>
                                    <option value="Spongebob Squarepants - Ending.mp3">Spongebob Squarepants - Ending</option>
                                    <option value="Wii-Shop-Background-Music.mp3">Wii Shop Background Music</option>
                                    <option value="Pillar John's Revenge V2 (Remix) - Pizza Tower Lap 3 Deluxe OST.mp3">Pizza Tower - Pillar John's Revenge</option>
                                    <option value="Pizza Tower OST  Funiculi Holiday Tutorial (1).mp3">Pizza Tower - Funiculi Holiday</option>
                                    <option value="pizza-tower-ost-unexpectancy-1-through-3-final-boss-128-ytshorts.savetube.me.mp3">Pizza Tower - Unexpectancy</option>
                                    <option value="pizzatower3.mp3">Pizza Tower 3</option>
                                    <option value="Pizza Tower OST  Move It Boy Unused  Character Select (2).mp3">Pizza Tower - Move It Boy</option>
                                    <option value="Pizza Tower Scoutdigo mod_ Death Mode OST.mp3">Pizza Tower - Scoutdigo Death Mode</option>
                                </select>
                            </div>
                            <div style="flex-grow: 1; display: flex; justify-content: center; align-items: center;">
                                <div style="text-align: center;">
                                    <img src="media player icon.webp" style="width: 120px; height: 120px; margin-bottom: 20px;" alt="Media Player">
                                    <div class="media-title" style="font-size: 16px; margin-bottom: 10px;">No song selected</div>
                                </div>
                            </div>
                            <div style="padding: 15px; background-color: #333;">
                                <audio class="media-audio" style="width: 100%;" controls></audio>
                                <div style="display: flex; justify-content: center; gap: 15px; margin-top: 10px;">
                                    <button class="media-prev" style="padding: 5px 15px; background: #555; border: none; color: white; cursor: pointer;">Prev</button>
                                    <button class="media-play" style="padding: 5px 15px; background: #555; border: none; color: white; cursor: pointer;">Play</button>
                                    <button class="media-next" style="padding: 5px 15px; background: #555; border: none; color: white; cursor: pointer;">Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                // Media Player functionality
                const audioElement = windowContent.querySelector('.media-audio');
                const playlistSelect = windowContent.querySelector('.media-playlist');
                const mediaTitle = windowContent.querySelector('.media-title');
                const nowPlaying = windowContent.querySelector('.media-now-playing');
                const playButton = windowContent.querySelector('.media-play');
                const prevButton = windowContent.querySelector('.media-prev');
                const nextButton = windowContent.querySelector('.media-next');
                
                // When a song is selected from the dropdown
                playlistSelect.addEventListener('change', () => {
                    if (playlistSelect.value) {
                        // First pause any currently playing audio to avoid interrupted play requests
                        audioElement.pause();
                        // Then update the source and play
                        audioElement.src = playlistSelect.value;
                        const songName = playlistSelect.options[playlistSelect.selectedIndex].text;
                        mediaTitle.textContent = songName;
                        nowPlaying.textContent = "Now Playing: " + songName;
                        
                        // Play after a small delay to ensure the source is loaded
                        setTimeout(() => {
                            audioElement.play().catch(e => {
                                console.log("Error playing audio:", e);
                            });
                            playButton.textContent = "Pause";
                        }, 100);
                    }
                });
                
                // Play/Pause button
                playButton.addEventListener('click', () => {
                    if (audioElement.src) {
                        if (audioElement.paused) {
                            audioElement.play();
                            playButton.textContent = "Pause";
                        } else {
                            audioElement.pause();
                            playButton.textContent = "Play";
                        }
                    } else if (playlistSelect.options.length > 1) {
                        // Auto-select first song if none selected
                        playlistSelect.selectedIndex = 1;
                        playlistSelect.dispatchEvent(new Event('change'));
                    }
                });
                
                // Previous button
                prevButton.addEventListener('click', () => {
                    // First pause the current audio
                    audioElement.pause();
                    
                    if (playlistSelect.selectedIndex > 1) {
                        playlistSelect.selectedIndex -= 1;
                    } else {
                        playlistSelect.selectedIndex = playlistSelect.options.length - 1;
                    }
                    playlistSelect.dispatchEvent(new Event('change'));
                });
                
                // Next button
                nextButton.addEventListener('click', () => {
                    // First pause the current audio
                    audioElement.pause();
                    
                    if (playlistSelect.selectedIndex < playlistSelect.options.length - 1) {
                        playlistSelect.selectedIndex += 1;
                    } else {
                        playlistSelect.selectedIndex = 1;
                    }
                    playlistSelect.dispatchEvent(new Event('change'));
                });
                
                // When a song ends, play the next one
                audioElement.addEventListener('ended', () => {
                    nextButton.click();
                });
                break;
                
            case 'Microsoft Store':
                windowContent.innerHTML = `
                    <div style="display: flex; flex-direction: column; height: 100%; background-color: #333; color: white;">
                        <div style="padding: 10px; background-color: #222;">
                            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                <input type="text" placeholder="Search apps, games, movies..." style="flex-grow: 1; padding: 8px; border: none; border-radius: 4px;" class="store-search">
                                <button style="margin-left: 10px; padding: 8px 15px; background: #0078d7; border: none; color: white; border-radius: 4px;" class="store-search-btn">Search</button>
                            </div>
                            <div style="display: flex; gap: 15px; font-size: 14px;" class="store-tabs">
                                <div class="store-tab active" data-tab="home" style="cursor: pointer; padding: 5px 10px; border-bottom: 2px solid #0078d7;">Home</div>
                                <div class="store-tab" data-tab="apps" style="cursor: pointer; padding: 5px 10px;">Apps</div>
                                <div class="store-tab" data-tab="games" style="cursor: pointer; padding: 5px 10px;">Games</div>
                                <div class="store-tab" data-tab="movies" style="cursor: pointer; padding: 5px 10px;">Movies & TV</div>
                            </div>
                        </div>
                        <div style="flex-grow: 1; overflow-y: auto; padding: 15px;" class="store-content">
                            <div class="store-section" id="store-home">
                                <h3 style="margin-top: 0;">Featured Apps</h3>
                                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px;">
                                    <div class="store-item" style="background: #444; padding: 15px; border-radius: 8px; cursor: pointer;">
                                        <div style="font-weight: bold; margin-bottom: 5px;">Office 365</div>
                                        <div style="color: #aaa; font-size: 12px;">Productivity</div>
                                        <div style="margin-top: 10px; background: #0078d7; color: white; text-align: center; padding: 5px; border-radius: 4px;">$69.99</div>
                                    </div>
                                    <div class="store-item" style="background: #444; padding: 15px; border-radius: 8px; cursor: pointer;">
                                        <div style="font-weight: bold; margin-bottom: 5px;">Adobe Photoshop</div>
                                        <div style="color: #aaa; font-size: 12px;">Photo & Design</div>
                                        <div style="margin-top: 10px; background: #0078d7; color: white; text-align: center; padding: 5px; border-radius: 4px;">$20.99/mo</div>
                                    </div>
                                    <div class="store-item" style="background: #444; padding: 15px; border-radius: 8px; cursor: pointer;">
                                        <div style="font-weight: bold; margin-bottom: 5px;">Spotify</div>
                                        <div style="color: #aaa; font-size: 12px;">Music</div>
                                        <div style="margin-top: 10px; background: #0078d7; color: white; text-align: center; padding: 5px; border-radius: 4px;">Free</div>
                                    </div>
                                </div>
                                
                                <h3>Top Games</h3>
                                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px;">
                                    <div class="store-item" style="background: #444; padding: 15px; border-radius: 8px; cursor: pointer;">
                                        <div style="font-weight: bold; margin-bottom: 5px;">Minecraft</div>
                                        <div style="color: #aaa; font-size: 12px;">Adventure</div>
                                        <div style="margin-top: 10px; background: #0078d7; color: white; text-align: center; padding: 5px; border-radius: 4px;">$26.99</div>
                                    </div>
                                    <div class="store-item" style="background: #444; padding: 15px; border-radius: 8px; cursor: pointer;">
                                        <div style="font-weight: bold; margin-bottom: 5px;">Forza Horizon 5</div>
                                        <div style="color: #aaa; font-size: 12px;">Racing</div>
                                        <div style="margin-top: 10px; background: #0078d7; color: white; text-align: center; padding: 5px; border-radius: 4px;">$59.99</div>
                                    </div>
                                    <div class="store-item" style="background: #444; padding: 15px; border-radius: 8px; cursor: pointer;">
                                        <div style="font-weight: bold; margin-bottom: 5px;">Halo Infinite</div>
                                        <div style="color: #aaa; font-size: 12px;">FPS</div>
                                        <div style="margin-top: 10px; background: #0078d7; color: white; text-align: center; padding: 5px; border-radius: 4px;">$59.99</div>
                                    </div>
                                </div>
                                
                                <h3>Deals & Promotions</h3>
                                <div style="background: linear-gradient(135deg, #0078d7, #004080); padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                                    <div style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">Summer Sale!</div>
                                    <div style="margin-bottom: 15px;">Save up to 75% on top games and apps</div>
                                    <button class="view-deals-btn" style="background: white; color: #0078d7; border: none; padding: 8px 15px; border-radius: 4px; font-weight: bold; cursor: pointer;">View Deals</button>
                                </div>
                            </div>
                            <div class="store-section" id="store-apps" style="display: none;">
                                <h3 style="margin-top: 0;">Productivity Apps</h3>
                                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px;">
                                    <div class="store-item" style="background: #444; padding: 15px; border-radius: 8px; cursor: pointer;">
                                        <div style="font-weight: bold; margin-bottom: 5px;">Microsoft Office</div>
                                        <div style="color: #aaa; font-size: 12px;">Productivity</div>
                                        <div style="margin-top: 10px; background: #0078d7; color: white; text-align: center; padding: 5px; border-radius: 4px;">$149.99</div>
                                    </div>
                                    <div class="store-item" style="background: #444; padding: 15px; border-radius: 8px; cursor: pointer;">
                                        <div style="font-weight: bold; margin-bottom: 5px;">Adobe Creative Cloud</div>
                                        <div style="color: #aaa; font-size: 12px;">Design Suite</div>
                                        <div style="margin-top: 10px; background: #0078d7; color: white; text-align: center; padding: 5px; border-radius: 4px;">$52.99/mo</div>
                                    </div>
                                    <div class="store-item" style="background: #444; padding: 15px; border-radius: 8px; cursor: pointer;">
                                        <div style="font-weight: bold; margin-bottom: 5px;">Notion</div>
                                        <div style="color: #aaa; font-size: 12px;">Productivity</div>
                                        <div style="margin-top: 10px; background: #0078d7; color: white; text-align: center; padding: 5px; border-radius: 4px;">Free</div>
                                    </div>
                                </div>
                                
                                <h3>Social Media</h3>
                                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px;">
                                    <div class="store-item" style="background: #444; padding: 15px; border-radius: 8px; cursor: pointer;">
                                        <div style="font-weight: bold; margin-bottom: 5px;">Instagram</div>
                                        <div style="color: #aaa; font-size: 12px;">Social</div>
                                        <div style="margin-top: 10px; background: #0078d7; color: white; text-align: center; padding: 5px; border-radius: 4px;">Free</div>
                                    </div>
                                    <div class="store-item" style="background: #444; padding: 15px; border-radius: 8px; cursor: pointer;">
                                        <div style="font-weight: bold; margin-bottom: 5px;">TikTok</div>
                                        <div style="color: #aaa; font-size: 12px;">Social</div>
                                        <div style="margin-top: 10px; background: #0078d7; color: white; text-align: center; padding: 5px; border-radius: 4px;">Free</div>
                                    </div>
                                    <div class="store-item" style="background: #444; padding: 15px; border-radius: 8px; cursor: pointer;">
                                        <div style="font-weight: bold; margin-bottom: 5px;">Discord</div>
                                        <div style="color: #aaa; font-size: 12px;">Communication</div>
                                        <div style="margin-top: 10px; background: #0078d7; color: white; text-align: center; padding: 5px; border-radius: 4px;">Free</div>
                                    </div>
                                </div>
                            </div>
                            <div class="store-section" id="store-games" style="display: none;">
                                <h3 style="margin-top: 0;">Action Games</h3>
                                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px;">
                                    <div class="store-item" style="background: #444; padding: 15px; border-radius: 8px; cursor: pointer;">
                                        <div style="font-weight: bold; margin-bottom: 5px;">Call of Duty</div>
                                        <div style="color: #aaa; font-size: 12px;">FPS</div>
                                        <div style="margin-top: 10px; background: #0078d7; color: white; text-align: center; padding: 5px; border-radius: 4px;">$59.99</div>
                                    </div>
                                    <div class="store-item" style="background: #444; padding: 15px; border-radius: 8px; cursor: pointer;">
                                        <div style="font-weight: bold; margin-bottom: 5px;">Assassin's Creed</div>
                                        <div style="color: #aaa; font-size: 12px;">Adventure</div>
                                        <div style="margin-top: 10px; background: #0078d7; color: white; text-align: center; padding: 5px; border-radius: 4px;">$49.99</div>
                                    </div>
                                    <div class="store-item" style="background: #444; padding: 15px; border-radius: 8px; cursor: pointer;">
                                        <div style="font-weight: bold; margin-bottom: 5px;">Doom Eternal</div>
                                        <div style="color: #aaa; font-size: 12px;">FPS</div>
                                        <div style="margin-top: 10px; background: #0078d7; color: white; text-align: center; padding: 5px; border-radius: 4px;">$39.99</div>
                                    </div>
                                </div>
                                
                                <h3>Simulation Games</h3>
                                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px;">
                                    <div class="store-item" style="background: #444; padding: 15px; border-radius: 8px; cursor: pointer;">
                                        <div style="font-weight: bold; margin-bottom: 5px;">The Sims 4</div>
                                        <div style="color: #aaa; font-size: 12px;">Life Simulation</div>
                                        <div style="margin-top: 10px; background: #0078d7; color: white; text-align: center; padding: 5px; border-radius: 4px;">$39.99</div>
                                    </div>
                                    <div class="store-item" style="background: #444; padding: 15px; border-radius: 8px; cursor: pointer;">
                                        <div style="font-weight: bold; margin-bottom: 5px;">Microsoft Flight Simulator</div>
                                        <div style="color: #aaa; font-size: 12px;">Simulation</div>
                                        <div style="margin-top: 10px; background: #0078d7; color: white; text-align: center; padding: 5px; border-radius: 4px;">$59.99</div>
                                    </div>
                                    <div class="store-item" style="background: #444; padding: 15px; border-radius: 8px; cursor: pointer;">
                                        <div style="font-weight: bold; margin-bottom: 5px;">Farming Simulator 22</div>
                                        <div style="color: #aaa; font-size: 12px;">Simulation</div>
                                        <div style="margin-top: 10px; background: #0078d7; color: white; text-align: center; padding: 5px; border-radius: 4px;">$49.99</div>
                                    </div>
                                </div>
                            </div>
                            <div class="store-section" id="store-movies" style="display: none;">
                                <h3 style="margin-top: 0;">New Releases</h3>
                                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px;">
                                    <div class="store-item" style="background: #444; padding: 15px; border-radius: 8px; cursor: pointer;">
                                        <div style="font-weight: bold; margin-bottom: 5px;">Avengers: Endgame</div>
                                        <div style="color: #aaa; font-size: 12px;">Action, Adventure</div>
                                        <div style="margin-top: 10px; background: #0078d7; color: white; text-align: center; padding: 5px; border-radius: 4px;">$19.99</div>
                                    </div>
                                    <div class="store-item" style="background: #444; padding: 15px; border-radius: 8px; cursor: pointer;">
                                        <div style="font-weight: bold; margin-bottom: 5px;">Dune</div>
                                        <div style="color: #aaa; font-size: 12px;">Sci-Fi, Adventure</div>
                                        <div style="margin-top: 10px; background: #0078d7; color: white; text-align: center; padding: 5px; border-radius: 4px;">$24.99</div>
                                    </div>
                                    <div class="store-item" style="background: #444; padding: 15px; border-radius: 8px; cursor: pointer;">
                                        <div style="font-weight: bold; margin-bottom: 5px;">No Time To Die</div>
                                        <div style="color: #aaa; font-size: 12px;">Action, Thriller</div>
                                        <div style="margin-top: 10px; background: #0078d7; color: white; text-align: center; padding: 5px; border-radius: 4px;">$19.99</div>
                                    </div>
                                </div>
                                
                                <h3>TV Shows</h3>
                                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px;">
                                    <div class="store-item" style="background: #444; padding: 15px; border-radius: 8px; cursor: pointer;">
                                        <div style="font-weight: bold; margin-bottom: 5px;">Stranger Things</div>
                                        <div style="color: #aaa; font-size: 12px;">Sci-Fi, Horror</div>
                                        <div style="margin-top: 10px; background: #0078d7; color: white; text-align: center; padding: 5px; border-radius: 4px;">$29.99/Season</div>
                                    </div>
                                    <div class="store-item" style="background: #444; padding: 15px; border-radius: 8px; cursor: pointer;">
                                        <div style="font-weight: bold; margin-bottom: 5px;">The Mandalorian</div>
                                        <div style="color: #aaa; font-size: 12px;">Sci-Fi, Action</div>
                                        <div style="margin-top: 10px; background: #0078d7; color: white; text-align: center; padding: 5px; border-radius: 4px;">$24.99/Season</div>
                                    </div>
                                    <div class="store-item" style="background: #444; padding: 15px; border-radius: 8px; cursor: pointer;">
                                        <div style="font-weight: bold; margin-bottom: 5px;">Ted Lasso</div>
                                        <div style="color: #aaa; font-size: 12px;">Comedy, Drama</div>
                                        <div style="margin-top: 10px; background: #0078d7; color: white; text-align: center; padding: 5px; border-radius: 4px;">$19.99/Season</div>
                                    </div>
                                </div>
                            </div>
                            <div class="store-section" id="store-search-results" style="display: none;">
                                <h3 style="margin-top: 0;">Search Results</h3>
                                <div id="search-results-container" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
                                    <!-- Search results will be added here dynamically -->
                                </div>
                                <div id="no-results" style="text-align: center; padding: 30px; display: none;">
                                    <h3>No results found</h3>
                                    <p>Try another search term</p>
                                </div>
                            </div>
                            <div class="store-section" id="store-deals" style="display: none;">
                                <h3 style="margin-top: 0;">Summer Sale Deals</h3>
                                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px;">
                                    <div class="store-item" style="background: #444; padding: 15px; border-radius: 8px; cursor: pointer;">
                                        <div style="font-weight: bold; margin-bottom: 5px;">Cyberpunk 2077</div>
                                        <div style="color: #aaa; font-size: 12px;">RPG</div>
                                        <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                                            <div style="text-decoration: line-through; color: #aaa;">$59.99</div>
                                            <div style="background: #d32f2f; color: white; text-align: center; padding: 2px 5px; border-radius: 4px;">-75%</div>
                                        </div>
                                        <div style="margin-top: 5px; background: #0078d7; color: white; text-align: center; padding: 5px; border-radius: 4px;">$14.99</div>
                                    </div>
                                    <div class="store-item" style="background: #444; padding: 15px; border-radius: 8px; cursor: pointer;">
                                        <div style="font-weight: bold; margin-bottom: 5px;">Red Dead Redemption 2</div>
                                        <div style="color: #aaa; font-size: 12px;">Action, Adventure</div>
                                        <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                                            <div style="text-decoration: line-through; color: #aaa;">$59.99</div>
                                            <div style="background: #d32f2f; color: white; text-align: center; padding: 2px 5px; border-radius: 4px;">-50%</div>
                                        </div>
                                        <div style="margin-top: 5px; background: #0078d7; color: white; text-align: center; padding: 5px; border-radius: 4px;">$29.99</div>
                                    </div>
                                    <div class="store-item" style="background: #444; padding: 15px; border-radius: 8px; cursor: pointer;">
                                        <div style="font-weight: bold; margin-bottom: 5px;">Adobe Premiere Pro</div>
                                        <div style="color: #aaa; font-size: 12px;">Video Editing</div>
                                        <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                                            <div style="text-decoration: line-through; color: #aaa;">$20.99/mo</div>
                                            <div style="background: #d32f2f; color: white; text-align: center; padding: 2px 5px; border-radius: 4px;">-40%</div>
                                        </div>
                                        <div style="margin-top: 5px; background: #0078d7; color: white; text-align: center; padding: 5px; border-radius: 4px;">$12.99/mo</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                // Store functionality
                const storeTabs = windowContent.querySelectorAll('.store-tab');
                const storeItems = windowContent.querySelectorAll('.store-item');
                const viewDealsBtn = windowContent.querySelector('.view-deals-btn');
                const storeSearch = windowContent.querySelector('.store-search');
                const storeSearchBtn = windowContent.querySelector('.store-search-btn');
                
                // Tab functionality
                storeTabs.forEach(tab => {
                    tab.addEventListener('click', function() {
                        // Remove active class from all tabs
                        storeTabs.forEach(t => t.classList.remove('active'));
                        // Add active class to clicked tab
                        tab.classList.add('active');
                        // Remove border from all tabs
                        storeTabs.forEach(t => t.style.borderBottom = 'none');
                        // Add border to active tab
                        tab.style.borderBottom = '2px solid #0078d7';
                        
                        // Hide all sections
                        const sections = windowContent.querySelectorAll('.store-section');
                        sections.forEach(section => section.style.display = 'none');
                        
                        // Show the selected section
                        const tabName = tab.getAttribute('data-tab');
                        const targetSection = windowContent.querySelector(`#store-${tabName}`);
                        if (targetSection) {
                            targetSection.style.display = 'block';
                        }
                    });
                });
                
                // Store item functionality
                storeItems.forEach(item => {
                    item.addEventListener('click', function() {
                        const appName = this.querySelector('div:first-child').textContent;
                        const appCategory = this.querySelector('div:nth-child(2)').textContent;
                        const appPrice = this.querySelector('div:last-child').textContent;
                        
                        const confirmPurchase = confirm(`Would you like to purchase ${appName} (${appCategory}) for ${appPrice}?`);
                        
                        if (confirmPurchase) {
                            alert(`Thank you for purchasing ${appName}! The app will be installed shortly.`);
                            
                            // Show a download notification
                            setTimeout(() => {
                                const notification = document.createElement('div');
                                notification.style.position = 'fixed';
                                notification.style.bottom = '40px';
                                notification.style.right = '10px';
                                notification.style.background = '#333';
                                notification.style.color = 'white';
                                notification.style.padding = '10px 15px';
                                notification.style.borderRadius = '5px';
                                notification.style.zIndex = '2000';
                                notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
                                notification.innerHTML = `
                                    <div style="display: flex; align-items: center; gap: 10px;">
                                        <div class="download-icon" style="width: 20px; height: 20px; border-radius: 50%; border: 2px solid #ccc; border-top-color: #0078d7; animation: spin 1s linear infinite;"></div>
                                        <div>Downloading ${appName}...</div>
                                    </div>
                                    <style>
                                        @keyframes spin {
                                            0% { transform: rotate(0deg); }
                                            100% { transform: rotate(360deg); }
                                        }
                                    </style>
                                `;
                                document.body.appendChild(notification);
                                
                                // Remove notification after 3 seconds
                                setTimeout(() => {
                                    notification.remove();
                                    
                                    // Show install complete notification
                                    const completeNotification = document.createElement('div');
                                    completeNotification.style.position = 'fixed';
                                    completeNotification.style.bottom = '40px';
                                    completeNotification.style.right = '10px';
                                    completeNotification.style.background = '#333';
                                    completeNotification.style.color = 'white';
                                    completeNotification.style.padding = '10px 15px';
                                    completeNotification.style.borderRadius = '5px';
                                    completeNotification.style.zIndex = '2000';
                                    completeNotification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
                                    completeNotification.innerHTML = `
                                        <div style="display: flex; align-items: center; gap: 10px;">
                                            <div style="color: #4caf50;">✓</div>
                                            <div>${appName} installed successfully!</div>
                                        </div>
                                    `;
                                    document.body.appendChild(completeNotification);
                                    
                                    // Remove complete notification after 3 seconds
                                    setTimeout(() => {
                                        completeNotification.remove();
                                    }, 3000);
                                }, 3000);
                            }, 500);
                        }
                    });
                });
                
                // View deals button
                viewDealsBtn.addEventListener('click', function() {
                    // Hide all sections
                    const sections = windowContent.querySelectorAll('.store-section');
                    sections.forEach(section => section.style.display = 'none');
                    
                    // Show deals section
                    const dealsSection = windowContent.querySelector('#store-deals');
                    dealsSection.style.display = 'block';
                    
                    // Reset tab highlighting
                    storeTabs.forEach(t => {
                        t.classList.remove('active');
                        t.style.borderBottom = 'none';
                    });
                });
                
                // Search functionality
                storeSearchBtn.addEventListener('click', performSearch);
                storeSearch.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        performSearch();
                    }
                });
                
                function performSearch() {
                    const searchTerm = storeSearch.value.trim().toLowerCase();
                    
                    if (searchTerm === '') {
                        alert('Please enter a search term');
                        return;
                    }
                    
                    // Hide all sections
                    const sections = windowContent.querySelectorAll('.store-section');
                    sections.forEach(section => section.style.display = 'none');
                    
                    // Show search results section
                    const searchSection = windowContent.querySelector('#store-search-results');
                    searchSection.style.display = 'block';
                    
                    // Reset tab highlighting
                    storeTabs.forEach(t => {
                        t.classList.remove('active');
                        t.style.borderBottom = 'none';
                    });
                    
                    // Get all store items across all sections
                    const allItems = [];
                    document.querySelectorAll('.store-item').forEach(item => {
                        const title = item.querySelector('div:first-child').textContent.toLowerCase();
                        const category = item.querySelector('div:nth-child(2)').textContent.toLowerCase();
                        
                        if (title.includes(searchTerm) || category.includes(searchTerm)) {
                            allItems.push(item.cloneNode(true));
                        }
                    });
                    
                    // Display results
                    const resultsContainer = windowContent.querySelector('#search-results-container');
                    const noResults = windowContent.querySelector('#no-results');
                    
                    resultsContainer.innerHTML = '';
                    
                    if (allItems.length > 0) {
                        noResults.style.display = 'none';
                        resultsContainer.style.display = 'grid';
                        
                        allItems.forEach(item => {
                            resultsContainer.appendChild(item);
                        });
                        
                        // Re-add click event to new items
                        resultsContainer.querySelectorAll('.store-item').forEach(item => {
                            item.addEventListener('click', function() {
                                const appName = this.querySelector('div:first-child').textContent;
                                const appCategory = this.querySelector('div:nth-child(2)').textContent;
                                const appPrice = this.querySelector('div:last-child').textContent;
                                
                                const confirmPurchase = confirm(`Would you like to purchase ${appName} (${appCategory}) for ${appPrice}?`);
                                
                                if (confirmPurchase) {
                                    alert(`Thank you for purchasing ${appName}! The app will be installed shortly.`);
                                }
                            });
                        });
                    } else {
                        resultsContainer.style.display = 'none';
                        noResults.style.display = 'block';
                    }
                }
                
                windowStatus.textContent = 'Connected to Store';
                break;
                
            case 'Twitch':
                windowContent.innerHTML = `
                    <div style="display: flex; flex-direction: column; height: 100%;">
                        <div style="display: flex; padding: 5px; gap: 5px; border-bottom: 1px solid #ccc;">
                            <button class="twitch-back" style="padding: 2px 10px;">Back</button>
                            <button class="twitch-forward" style="padding: 2px 10px;">Forward</button>
                            <button class="twitch-refresh" style="padding: 2px 10px;">Refresh</button>
                            <div class="twitch-address" style="flex-grow: 1; background: white; border: 1px solid #888; padding: 2px 5px; font-size: 12px;">https://websim.ai/@EathenERROR/streamsim-with-more-features</div>
                            <button class="twitch-go" style="padding: 2px 10px;">Go</button>
                        </div>
                        <iframe 
                            class="twitch-frame" 
                            src="https://websim.ai/@EathenERROR/streamsim-with-more-features" 
                            style="flex-grow: 1; border: none; width: 100%; height: 100%;">
                        </iframe>
                    </div>
                `;
                windowStatus.textContent = 'Connected';
                
                // Twitch functionality
                const twitchFrame = windowContent.querySelector('.twitch-frame');
                const twitchAddress = windowContent.querySelector('.twitch-address');
                const twitchGo = windowContent.querySelector('.twitch-go');
                const twitchRefresh = windowContent.querySelector('.twitch-refresh');
                
                twitchGo.addEventListener('click', () => {
                    const url = twitchAddress.textContent.trim();
                    if (url.startsWith('http')) {
                        twitchFrame.src = url;
                        windowStatus.textContent = 'Loading...';
                        setTimeout(() => windowStatus.textContent = 'Connected', 1500);
                    }
                });
                
                twitchRefresh.addEventListener('click', () => {
                    twitchFrame.src = twitchFrame.src;
                    windowStatus.textContent = 'Refreshing...';
                    setTimeout(() => windowStatus.textContent = 'Connected', 1500);
                });
                break;
                
            case 'Paint MS':
                windowContent.innerHTML = `
                    <div style="display: flex; flex-direction: column; height: 100%;">
                        <div style="display: flex; padding: 5px; gap: 10px; border-bottom: 1px solid #ccc;">
                            <div style="display: flex; gap: 5px;">
                                <button class="paint-tool" data-tool="pencil" style="padding: 4px 8px; background: #f0f0f0; border: 1px solid #999;">Pencil</button>
                                <button class="paint-tool" data-tool="line" style="padding: 4px 8px; background: #f0f0f0; border: 1px solid #999;">Line</button>
                                <button class="paint-tool" data-tool="rectangle" style="padding: 4px 8px; background: #f0f0f0; border: 1px solid #999;">Rectangle</button>
                                <button class="paint-tool" data-tool="circle" style="padding: 4px 8px; background: #f0f0f0; border: 1px solid #999;">Circle</button>
                                <button class="paint-tool" data-tool="eraser" style="padding: 4px 8px; background: #f0f0f0; border: 1px solid #999;">Eraser</button>
                                <button class="paint-tool" data-tool="text" style="padding: 4px 8px; background: #f0f0f0; border: 1px solid #999;">Text</button>
                                <button class="paint-tool" data-tool="fill" style="padding: 4px 8px; background: #f0f0f0; border: 1px solid #999;">Fill</button>
                            </div>
                            <div style="display: flex; gap: 5px; align-items: center;">
                                <label>Color:</label>
                                <input type="color" class="paint-color" value="#000000" style="width: 30px; height: 30px;">
                                <label>Size:</label>
                                <input type="range" class="paint-size" min="1" max="50" value="5" style="width: 80px;">
                            </div>
                            <button class="paint-clear" style="padding: 4px 8px; background: #f0f0f0; border: 1px solid #999; margin-left: auto;">Clear</button>
                            <button class="paint-save" style="padding: 4px 8px; background: #f0f0f0; border: 1px solid #999;">Save</button>
                        </div>
                        <div style="flex-grow: 1; overflow: hidden; position: relative; background: #f0f0f0;">
                            <canvas class="paint-canvas" style="background: white; display: block;"></canvas>
                        </div>
                    </div>
                `;
                windowStatus.textContent = 'Ready';
                
                // Paint functionality
                const canvas = windowContent.querySelector('.paint-canvas');
                const context = canvas.getContext('2d');
                const colorPicker = windowContent.querySelector('.paint-color');
                const brushSize = windowContent.querySelector('.paint-size');
                const clearButton = windowContent.querySelector('.paint-clear');
                const saveButton = windowContent.querySelector('.paint-save');
                const toolButtons = windowContent.querySelectorAll('.paint-tool');
                
                let currentTool = 'pencil';
                let isDrawing = false;
                let startX, startY;
                let snapshot;
                
                // Set canvas size
                function resizeCanvas() {
                    const container = canvas.parentElement;
                    canvas.width = container.clientWidth;
                    canvas.height = container.clientHeight;
                    context.lineCap = 'round';
                    context.lineJoin = 'round';
                }
                
                // Initial canvas setup
                resizeCanvas();
                
                // Take a snapshot of the canvas for tools that need to redraw (like shapes)
                function takeSnapshot() {
                    snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
                }
                
                // Restore the canvas snapshot during shape drawing
                function restoreSnapshot() {
                    context.putImageData(snapshot, 0, 0);
                }
                
                // Resize canvas when the window is resized
                new ResizeObserver(resizeCanvas).observe(canvas.parentElement);
                
                // Tool selection
                toolButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        currentTool = this.getAttribute('data-tool');
                        
                        // Visual feedback for selected tool
                        toolButtons.forEach(btn => btn.style.background = '#f0f0f0');
                        this.style.background = '#cce8ff';
                    });
                });
                
                // Set the default tool as selected
                windowContent.querySelector('[data-tool="pencil"]').style.background = '#cce8ff';
                
                // Drawing functions
                canvas.addEventListener('mousedown', function(e) {
                    isDrawing = true;
                    
                    const rect = canvas.getBoundingClientRect();
                    startX = e.clientX - rect.left;
                    startY = e.clientY - rect.top;
                    
                    // Take a snapshot for shape drawing
                    takeSnapshot();
                    
                    if (currentTool === 'pencil' || currentTool === 'eraser') {
                        context.beginPath();
                        context.moveTo(startX, startY);
                        context.lineWidth = brushSize.value;
                        context.strokeStyle = currentTool === 'eraser' ? '#FFFFFF' : colorPicker.value;
                        context.lineTo(startX, startY);
                        context.stroke();
                    } else if (currentTool === 'text') {
                        const text = prompt('Enter text:', '');
                        if (text) {
                            context.font = `${brushSize.value * 2}px Arial`;
                            context.fillStyle = colorPicker.value;
                            context.fillText(text, startX, startY);
                        }
                    } else if (currentTool === 'fill') {
                        const targetColor = context.getImageData(startX, startY, 1, 1).data;
                        const fillColor = hexToRgb(colorPicker.value);
                        floodFill(startX, startY, targetColor, fillColor);
                    }
                });
                
                canvas.addEventListener('mousemove', function(e) {
                    if (!isDrawing) return;
                    
                    const rect = canvas.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    if (currentTool === 'pencil' || currentTool === 'eraser') {
                        context.lineTo(x, y);
                        context.stroke();
                    } else if (currentTool === 'line') {
                        // Restore the canvas and draw a new line
                        restoreSnapshot();
                        context.beginPath();
                        context.moveTo(startX, startY);
                        context.lineTo(x, y);
                        context.lineWidth = brushSize.value;
                        context.strokeStyle = colorPicker.value;
                        context.stroke();
                    } else if (currentTool === 'rectangle') {
                        // Restore the canvas and draw a new rectangle
                        restoreSnapshot();
                        context.beginPath();
                        context.rect(
                            Math.min(startX, x),
                            Math.min(startY, y),
                            Math.abs(x - startX),
                            Math.abs(y - startY)
                        );
                        context.lineWidth = brushSize.value;
                        context.strokeStyle = colorPicker.value;
                        context.stroke();
                    } else if (currentTool === 'circle') {
                        // Restore the canvas and draw a new circle
                        restoreSnapshot();
                        context.beginPath();
                        const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
                        context.arc(startX, startY, radius, 0, 2 * Math.PI);
                        context.lineWidth = brushSize.value;
                        context.strokeStyle = colorPicker.value;
                        context.stroke();
                    }
                });
                
                canvas.addEventListener('mouseup', function() {
                    isDrawing = false;
                });
                
                canvas.addEventListener('mouseout', function() {
                    isDrawing = false;
                });
                
                // Flood fill algorithm
                function hexToRgb(hex) {
                    const r = parseInt(hex.slice(1, 3), 16);
                    const g = parseInt(hex.slice(3, 5), 16);
                    const b = parseInt(hex.slice(5, 7), 16);
                    return [r, g, b, 255];
                }
                
                function colorsMatch(a, b, tolerance = 10) {
                    return Math.abs(a[0] - b[0]) <= tolerance &&
                           Math.abs(a[1] - b[1]) <= tolerance &&
                           Math.abs(a[2] - b[2]) <= tolerance;
                }
                
                function floodFill(x, y, targetColor, fillColor) {
                    x = Math.floor(x);
                    y = Math.floor(y);
                    
                    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                    const data = imageData.data;
                    const width = canvas.width;
                    const height = canvas.height;
                    
                    // If target color is the same as fill color, do nothing
                    if (colorsMatch(targetColor, fillColor)) return;
                    
                    const pixelPos = (y * width + x) * 4;
                    const stack = [[x, y]];
                    
                    while (stack.length > 0) {
                        const [curX, curY] = stack.pop();
                        const pixelPos = (curY * width + curX) * 4;
                        
                        if (curX < 0 || curY < 0 || curX >= width || curY >= height) continue;
                        
                        const currentColor = [
                            data[pixelPos],
                            data[pixelPos + 1],
                            data[pixelPos + 2],
                            data[pixelPos + 3]
                        ];
                        
                        if (!colorsMatch(currentColor, targetColor)) continue;
                        
                        // Set color
                        data[pixelPos] = fillColor[0];
                        data[pixelPos + 1] = fillColor[1];
                        data[pixelPos + 2] = fillColor[2];
                        data[pixelPos + 3] = fillColor[3];
                        
                        // Check neighboring pixels
                        stack.push([curX + 1, curY]);
                        stack.push([curX - 1, curY]);
                        stack.push([curX, curY + 1]);
                        stack.push([curX, curY - 1]);
                    }
                    
                    context.putImageData(imageData, 0, 0);
                }
                
                // Clear canvas
                clearButton.addEventListener('click', function() {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                });
                
                // Save canvas
                saveButton.addEventListener('click', function() {
                    const link = document.createElement('a');
                    link.download = 'paint-drawing.png';
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                });
                break;
                
            case 'Minesweeper':
                windowContent.innerHTML = `
                    <div style="display: flex; flex-direction: column; height: 100%; background-color: #c0c0c0; padding: 10px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <div class="mine-counter" style="background: black; color: red; font-family: 'Digital', monospace; padding: 5px 10px; font-size: 20px; font-weight: bold;">000</div>
                            <button class="mine-reset" style="width: 30px; height: 30px; background: #c0c0c0; border: 2px outset #f0f0f0; display: flex; justify-content: center; align-items: center; font-size: 18px;">😊</button>
                            <div class="mine-timer" style="background: black; color: red; font-family: 'Digital', monospace; padding: 5px 10px; font-size: 20px; font-weight: bold;">000</div>
                        </div>
                        <div class="mine-field" style="flex-grow: 1; display: grid; grid-template-columns: repeat(9, 1fr); grid-template-rows: repeat(9, 1fr); gap: 1px; background-color: #c0c0c0; position: relative;">
                            <!-- Game cells will be added here -->
                        </div>
                        <div style="margin-top: 10px; display: flex; gap: 10px;">
                            <select class="mine-difficulty" style="padding: 5px;">
                                <option value="beginner">Beginner (9x9, 10 mines)</option>
                                <option value="intermediate">Intermediate (16x16, 40 mines)</option>
                                <option value="expert">Expert (30x16, 99 mines)</option>
                            </select>
                            <button class="mine-new-game" style="padding: 5px 10px;">New Game</button>
                        </div>
                    </div>
                `;
                windowStatus.textContent = 'Ready';
                
                // Minesweeper functionality
                const mineField = windowContent.querySelector('.mine-field');
                const mineCounter = windowContent.querySelector('.mine-counter');
                const mineTimer = windowContent.querySelector('.mine-timer');
                const mineReset = windowContent.querySelector('.mine-reset');
                const mineDifficulty = windowContent.querySelector('.mine-difficulty');
                const mineNewGame = windowContent.querySelector('.mine-new-game');
                
                let mineGame = {
                    width: 9,
                    height: 9,
                    mines: 10,
                    board: [],
                    started: false,
                    gameOver: false,
                    flagsPlaced: 0,
                    cellsRevealed: 0,
                    timer: null,
                    seconds: 0
                };
                
                // Initialize game
                function initMinesweeperGame() {
                    // Reset game state
                    mineGame.started = false;
                    mineGame.gameOver = false;
                    mineGame.flagsPlaced = 0;
                    mineGame.cellsRevealed = 0;
                    mineGame.seconds = 0;
                    mineGame.board = [];
                    
                    // Clear any existing timer
                    if (mineGame.timer) {
                        clearInterval(mineGame.timer);
                        mineGame.timer = null;
                    }
                    
                    // Update display
                    mineReset.textContent = '😊';
                    mineCounter.textContent = mineGame.mines.toString().padStart(3, '0');
                    mineTimer.textContent = '000';
                    
                    // Create board array
                    for (let y = 0; y < mineGame.height; y++) {
                        const row = [];
                        for (let x = 0; x < mineGame.width; x++) {
                            row.push({
                                isMine: false,
                                isRevealed: false,
                                isFlagged: false,
                                adjacentMines: 0
                            });
                        }
                        mineGame.board.push(row);
                    }
                    
                    // Setup the grid layout
                    mineField.style.gridTemplateColumns = `repeat(${mineGame.width}, 1fr)`;
                    mineField.style.gridTemplateRows = `repeat(${mineGame.height}, 1fr)`;
                    
                    // Clear existing cells
                    mineField.innerHTML = '';
                    
                    // Create cells
                    for (let y = 0; y < mineGame.height; y++) {
                        for (let x = 0; x < mineGame.width; x++) {
                            const cell = document.createElement('div');
                            cell.className = 'mine-cell';
                            cell.dataset.x = x;
                            cell.dataset.y = y;
                            cell.style.width = '100%';
                            cell.style.height = '100%';
                            cell.style.background = '#c0c0c0';
                            cell.style.border = '2px outset #f0f0f0';
                            cell.style.boxSizing = 'border-box';
                            cell.style.display = 'flex';
                            cell.style.justifyContent = 'center';
                            cell.style.alignItems = 'center';
                            cell.style.fontWeight = 'bold';
                            cell.style.fontSize = '14px';
                            cell.style.userSelect = 'none';
                            
                            // Left click to reveal
                            cell.addEventListener('click', () => {
                                if (mineGame.gameOver || cell.classList.contains('revealed') || cell.classList.contains('flagged')) {
                                    return;
                                }
                                
                                // First click - place mines and start timer
                                if (!mineGame.started) {
                                    placeMines(x, y);
                                    mineGame.started = true;
                                    mineGame.timer = setInterval(() => {
                                        mineGame.seconds++;
                                        if (mineGame.seconds > 999) {
                                            mineGame.seconds = 999;
                                        }
                                        mineTimer.textContent = mineGame.seconds.toString().padStart(3, '0');
                                    }, 1000);
                                }
                                
                                // Reveal cell
                                revealCell(x, y);
                            });
                            
                            // Right click to flag
                            cell.addEventListener('contextmenu', (e) => {
                                e.preventDefault();
                                
                                if (mineGame.gameOver || cell.classList.contains('revealed')) {
                                    return;
                                }
                                
                                const cellData = mineGame.board[y][x];
                                
                                if (!cellData.isFlagged) {
                                    // Add flag if we haven't placed all mines yet
                                    if (mineGame.flagsPlaced < mineGame.mines) {
                                        cell.classList.add('flagged');
                                        cell.innerHTML = '🚩';
                                        cellData.isFlagged = true;
                                        mineGame.flagsPlaced++;
                                    }
                                } else {
                                    // Remove flag
                                    cell.classList.remove('flagged');
                                    cell.innerHTML = '';
                                    cellData.isFlagged = false;
                                    mineGame.flagsPlaced--;
                                }
                                
                                // Update mine counter
                                mineCounter.textContent = mineGame.mines.toString().padStart(3, '0');
                                
                                // Start timer on first action
                                if (!mineGame.started && !mineGame.timer) {
                                    mineGame.started = true;
                                    mineGame.timer = setInterval(() => {
                                        mineGame.seconds++;
                                        if (mineGame.seconds > 999) {
                                            mineGame.seconds = 999;
                                        }
                                        mineTimer.textContent = mineGame.seconds.toString().padStart(3, '0');
                                    }, 1000);
                                }
                            });
                            
                            mineField.appendChild(cell);
                        }
                    }
                }
                
                // Place mines (avoiding the first clicked cell)
                function placeMines(firstX, firstY) {
                    let minesPlaced = 0;
                    
                    while (minesPlaced < mineGame.mines) {
                        const x = Math.floor(Math.random() * mineGame.width);
                        const y = Math.floor(Math.random() * mineGame.height);
                        
                        // Skip the first clicked cell and cells already containing mines
                        if ((x === firstX && y === firstY) || mineGame.board[y][x].isMine) {
                            continue;
                        }
                        
                        // Place a mine
                        mineGame.board[y][x].isMine = true;
                        minesPlaced++;
                    }
                    
                    // Calculate adjacent mines for each cell
                    for (let y = 0; y < mineGame.height; y++) {
                        for (let x = 0; x < mineGame.width; x++) {
                            if (!mineGame.board[y][x].isMine) {
                                let count = 0;
                                
                                // Check all 8 adjacent cells
                                for (let dy = -1; dy <= 1; dy++) {
                                    for (let dx = -1; dx <= 1; dx++) {
                                        if (dx === 0 && dy === 0) continue;
                                        
                                        const nx = x + dx;
                                        const ny = y + dy;
                                        
                                        if (nx >= 0 && nx < mineGame.width && ny >= 0 && ny < mineGame.height) {
                                            if (mineGame.board[ny][nx].isMine) {
                                                count++;
                                            }
                                        }
                                    }
                                }
                                
                                mineGame.board[y][x].adjacentMines = count;
                            }
                        }
                    }
                }
                
                // Reveal a cell
                function revealCell(x, y) {
                    // Skip if out of bounds or already revealed
                    if (x < 0 || y < 0 || x >= mineGame.width || y >= mineGame.height || 
                        mineGame.board[y][x].isRevealed || mineGame.board[y][x].isFlagged) {
                        return;
                    }
                    
                    const cell = mineGame.board[y][x];
                    const cellElement = mineField.querySelector(`[data-x="${x}"][data-y="${y}"]`);
                    
                    // Mark as revealed
                    cell.isRevealed = true;
                    cellElement.classList.add('revealed');
                    cellElement.style.border = '1px solid #808080';
                    cellElement.style.backgroundColor = '#d5d5d5';
                    
                    mineGame.cellsRevealed++;
                    
                    // Check if it's a mine
                    if (cell.isMine) {
                        // Game over - show all mines
                        cellElement.innerHTML = '💣';
                        cellElement.style.backgroundColor = 'red';
                        gameOver(false);
                        return;
                    }
                    
                    // Show adjacent mine count if any
                    if (cell.adjacentMines > 0) {
                        cellElement.textContent = cell.adjacentMines;
                        // Set color based on number
                        const colors = ['blue', 'green', 'red', 'purple', 'maroon', 'turquoise', 'black', 'gray'];
                        cellElement.style.color = colors[cell.adjacentMines - 1];
                    } else {
                        // No adjacent mines - reveal adjacent cells (flood fill)
                        for (let dy = -1; dy <= 1; dy++) {
                            for (let dx = -1; dx <= 1; dx++) {
                                if (dx === 0 && dy === 0) continue;
                                revealCell(x + dx, y + dy);
                            }
                        }
                    }
                    
                    // Check if all non-mine cells are revealed (win condition)
                    if (mineGame.cellsRevealed === (mineGame.width * mineGame.height) - mineGame.mines) {
                        gameOver(true);
                    }
                }
                
                // Game over
                function gameOver(won) {
                    mineGame.gameOver = true;
                    clearInterval(mineGame.timer);
                    
                    if (won) {
                        mineReset.textContent = '😎';
                        
                        // Flag all remaining mines
                        for (let y = 0; y < mineGame.height; y++) {
                            for (let x = 0; x < mineGame.width; x++) {
                                if (mineGame.board[y][x].isMine && !mineGame.board[y][x].isFlagged) {
                                    const cellElement = mineField.querySelector(`[data-x="${x}"][data-y="${y}"]`);
                                    cellElement.innerHTML = '🚩';
                                    mineGame.board[y][x].isFlagged = true;
                                }
                            }
                        }
                        
                        mineCounter.textContent = '000';
                    } else {
                        mineReset.textContent = '😵';
                        
                        // Reveal all mines
                        for (let y = 0; y < mineGame.height; y++) {
                            for (let x = 0; x < mineGame.width; x++) {
                                if (mineGame.board[y][x].isMine && !mineGame.board[y][x].isRevealed) {
                                    const cellElement = mineField.querySelector(`[data-x="${x}"][data-y="${y}"]`);
                                    
                                    if (mineGame.board[y][x].isFlagged) {
                                        // Already flagged correctly
                                        continue;
                                    }
                                    
                                    cellElement.innerHTML = '💣';
                                    cellElement.style.backgroundColor = '#d5d5d5';
                                    cellElement.style.border = '1px solid #808080';
                                }
                                
                                // Show incorrectly flagged cells
                                if (!mineGame.board[y][x].isMine && mineGame.board[y][x].isFlagged) {
                                    const cellElement = mineField.querySelector(`[data-x="${x}"][data-y="${y}"]`);
                                    cellElement.innerHTML = '❌';
                                }
                            }
                        }
                    }
                }
                
                // Set up difficulty
                mineDifficulty.addEventListener('change', () => {
                    const difficulty = mineDifficulty.value;
                    
                    if (difficulty === 'beginner') {
                        mineGame.width = 9;
                        mineGame.height = 9;
                        mineGame.mines = 10;
                    } else if (difficulty === 'intermediate') {
                        mineGame.width = 16;
                        mineGame.height = 16;
                        mineGame.mines = 40;
                    } else if (difficulty === 'expert') {
                        mineGame.width = 30;
                        mineGame.height = 16;
                        mineGame.mines = 99;
                    }
                    
                    initMinesweeperGame();
                });
                
                // Reset button
                mineReset.addEventListener('click', () => {
                    initMinesweeperGame();
                });
                
                // New game button
                mineNewGame.addEventListener('click', () => {
                    initMinesweeperGame();
                });
                
                // Initialize the game
                initMinesweeperGame();
                break;
                
            case 'Chess':
                windowContent.innerHTML = `
                    <div style="display: flex; flex-direction: column; height: 100%; padding: 10px; background-color: #f0f0f0;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <div style="display: flex; gap: 5px;">
                                <button class="chess-new-game" style="padding: 5px 10px;">New Game</button>
                                <select class="chess-difficulty" style="padding: 5px;">
                                    <option value="easy">Easy</option>
                                    <option value="medium" selected>Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>
                            <div class="chess-status" style="font-weight: bold;">Your turn (White)</div>
                        </div>
                        <div class="chess-board" style="flex-grow: 1; display: grid; grid-template-columns: repeat(8, 1fr); grid-template-rows: repeat(8, 1fr); gap: 1px; background-color: #000; max-width: 100%; aspect-ratio: 1/1; margin: 0 auto;">
                            <!-- Chess board will be generated here -->
                        </div>
                        <div style="margin-top: 10px;">
                            <div class="chess-message" style="font-style: italic; height: 20px;"></div>
                            <div class="chess-history" style="margin-top: 10px; height: 100px; overflow-y: auto; border: 1px solid #ccc; padding: 5px; font-family: monospace; font-size: 12px;">
                                Game started. You are playing as White.
                            </div>
                        </div>
                    </div>
                `;
                windowStatus.textContent = 'Ready';
                
                // Chess game functionality
                const chessBoard = windowContent.querySelector('.chess-board');
                const chessStatus = windowContent.querySelector('.chess-status');
                const chessMessage = windowContent.querySelector('.chess-message');
                const chessHistory = windowContent.querySelector('.chess-history');
                const chessNewGame = windowContent.querySelector('.chess-new-game');
                const chessDifficulty = windowContent.querySelector('.chess-difficulty');
                
                // Chess game state
                const chess = {
                    board: [],
                    turn: 'white',
                    selectedPiece: null,
                    whiteKingMoved: false,
                    blackKingMoved: false,
                    whiteRook1Moved: false,
                    whiteRook2Moved: false,
                    blackRook1Moved: false,
                    blackRook2Moved: false,
                    difficulty: 'medium',
                    gameOver: false,
                    moveHistory: []
                };
                
                // Initialize chess board
                function initChessBoard() {
                    // Reset game state
                    chess.board = [];
                    chess.turn = 'white';
                    chess.selectedPiece = null;
                    chess.whiteKingMoved = false;
                    chess.blackKingMoved = false;
                    chess.whiteRook1Moved = false;
                    chess.whiteRook2Moved = false;
                    chess.blackRook1Moved = false;
                    chess.blackRook2Moved = false;
                    chess.gameOver = false;
                    chess.moveHistory = [];
                    
                    // Initial board setup
                    const initialBoard = [
                        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
                        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
                        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
                        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']
                    ];
                    
                    // Create board representation
                    for (let row = 0; row < 8; row++) {
                        const boardRow = [];
                        for (let col = 0; col < 8; col++) {
                            boardRow.push({
                                piece: initialBoard[row][col],
                                color: initialBoard[row][col] === ' ' ? null : 
                                      initialBoard[row][col].toUpperCase() === initialBoard[row][col] ? 'black' : 'white'
                            });
                        }
                        chess.board.push(boardRow);
                    }
                    
                    // Clear the board
                    chessBoard.innerHTML = '';
                    
                    // Create board cells
                    for (let row = 0; row < 8; row++) {
                        for (let col = 0; col < 8; col++) {
                            const cell = document.createElement('div');
                            cell.className = 'chess-cell';
                            cell.dataset.row = row;
                            cell.dataset.col = col;
                            
                            const isLight = (row + col) % 2 === 0;
                            cell.style.backgroundColor = isLight ? '#f0d9b5' : '#b58863';
                            cell.style.display = 'flex';
                            cell.style.justifyContent = 'center';
                            cell.style.alignItems = 'center';
                            cell.style.cursor = 'pointer';
                            cell.style.userSelect = 'none';
                            
                            // Add the piece
                            const piece = chess.board[row][col].piece;
                            if (piece !== ' ') {
                                cell.innerHTML = getPieceHTML(piece);
                            }
                            
                            // Cell click event
                            cell.addEventListener('click', handleCellClick);
                            
                            chessBoard.appendChild(cell);
                        }
                    }
                    
                    // Update status
                    chessStatus.textContent = "Your turn (White)";
                    chessMessage.textContent = "";
                    
                    // Update history
                    chessHistory.innerHTML = "Game started. You are playing as White.<br>";
                    
                    // Update difficulty
                    chess.difficulty = chessDifficulty.value;
                }
                
                // Get HTML for chess piece
                function getPieceHTML(piece) {
                    const pieceType = piece.toLowerCase();
                    const pieceColor = piece === piece.toUpperCase() ? 'black' : 'white';
                    
                    const pieceMap = {
                        'r': '♜', // rook
                        'n': '♞', // knight
                        'b': '♝', // bishop
                        'q': '♛', // queen
                        'k': '♚', // king
                        'p': '♟' // pawn
                    };
                    
                    return `<div class="chess-piece" data-piece="${piece}" style="font-size: 30px; color: ${pieceColor};">${pieceMap[pieceType]}</div>`;
                }
                
                // Handle cell click
                function handleCellClick(e) {
                    if (chess.gameOver || chess.turn !== 'white') return;
                    
                    const cell = e.currentTarget;
                    const row = parseInt(cell.dataset.row);
                    const col = parseInt(cell.dataset.col);
                    
                    // If no piece is selected yet
                    if (!chess.selectedPiece) {
                        // Check if cell has a piece and it's the player's turn
                        const cellData = chess.board[row][col];
                        if (cellData.piece !== ' ' && cellData.color === 'white') {
                            // Select the piece
                            chess.selectedPiece = { row, col, piece: cellData.piece };
                            cell.style.backgroundColor = '#aaffaa'; // Highlight selected piece
                            
                            // Highlight valid moves
                            for (let r = 0; r < 8; r++) {
                                for (let c = 0; c < 8; c++) {
                                    if (isValidMove(row, col, r, c)) {
                                        const targetCell = chessBoard.querySelector(`[data-row="${r}"][data-col="${c}"]`);
                                        // Use a different highlight color for captures
                                        if (chess.board[r][c].piece !== ' ') {
                                            targetCell.style.backgroundColor = '#ffaaaa'; // Red for capture
                                        } else {
                                            targetCell.style.backgroundColor = '#aaaaff'; // Blue for empty square
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        // A piece is already selected, try to move it
                        const fromRow = chess.selectedPiece.row;
                        const fromCol = chess.selectedPiece.col;
                        const piece = chess.selectedPiece.piece;
                        
                        // Reset all cell colors
                        for (let r = 0; r < 8; r++) {
                            for (let c = 0; c < 8; c++) {
                                const resetCell = chessBoard.querySelector(`[data-row="${r}"][data-col="${c}"]`);
                                const isLightSquare = (r + c) % 2 === 0;
                                resetCell.style.backgroundColor = isLightSquare ? '#f0d9b5' : '#b58863';
                            }
                        }
                        
                        // Check if move is valid
                        if (isValidMove(fromRow, fromCol, row, col)) {
                            // Make the move
                            makeMove(fromRow, fromCol, row, col);
                            
                            // After player's move, check for game over
                            if (isCheckmate('black')) {
                                chessStatus.textContent = "Checkmate! You win!";
                                chess.gameOver = true;
                                logToHistory("Checkmate! You win!");
                            } else if (isStalemate('black')) {
                                chessStatus.textContent = "Stalemate! Game is a draw.";
                                chess.gameOver = true;
                                logToHistory("Stalemate! Game is a draw.");
                            } else {
                                // Computer's turn
                                chess.turn = 'black';
                                chessStatus.textContent = "Computer thinking...";
                                
                                // Delay for a more natural feel
                                setTimeout(() => {
                                    computerMove();
                                    
                                    // After computer's move, check for game over
                                    if (isCheckmate('white')) {
                                        chessStatus.textContent = "Checkmate! Computer wins!";
                                        chess.gameOver = true;
                                        logToHistory("Checkmate! Computer wins!");
                                    } else if (isStalemate('white')) {
                                        chessStatus.textContent = "Stalemate! Game is a draw.";
                                        chess.gameOver = true;
                                        logToHistory("Stalemate! Game is a draw.");
                                    } else {
                                        chess.turn = 'white';
                                        chessStatus.textContent = "Your turn (White)";
                                    }
                                }, 500);
                            }
                        }
                        
                        // Deselect the piece
                        chess.selectedPiece = null;
                    }
                }
                
                // Check if a move is valid
                function isValidMove(fromRow, fromCol, toRow, toCol) {
                    const piece = chess.board[fromRow][fromCol].piece;
                    const pieceColor = chess.board[fromRow][fromCol].color;
                    const targetPiece = chess.board[toRow][toCol].piece;
                    const targetColor = chess.board[toRow][toCol].color;
                    
                    // Can't move to a square with your own piece
                    if (targetPiece !== ' ' && targetColor === pieceColor) {
                        return false;
                    }
                    
                    // Different logic for each piece type
                    const pieceType = piece.toLowerCase();
                    
                    switch (pieceType) {
                        case 'p': // Pawn
                            return isValidPawnMove(fromRow, fromCol, toRow, toCol);
                        case 'r': // Rook
                            return isValidRookMove(fromRow, fromCol, toRow, toCol);
                        case 'n': // Knight
                            return isValidKnightMove(fromRow, fromCol, toRow, toCol);
                        case 'b': // Bishop
                            return isValidBishopMove(fromRow, fromCol, toRow, toCol);
                        case 'q': // Queen
                            return isValidQueenMove(fromRow, fromCol, toRow, toCol);
                        case 'k': // King
                            return isValidKingMove(fromRow, fromCol, toRow, toCol);
                        default:
                            return false;
                    }
                }
                
                // Pawn move validation
                function isValidPawnMove(fromRow, fromCol, toRow, toCol) {
                    const pieceColor = chess.board[fromRow][fromCol].color;
                    const targetPiece = chess.board[toRow][toCol].piece;
                    
                    // Direction depends on color (white moves up, black moves down)
                    const direction = pieceColor === 'white' ? -1 : 1;
                    const startRow = pieceColor === 'white' ? 6 : 1;
                    
                    // Forward move
                    if (fromCol === toCol && targetPiece === ' ') {
                        // One square forward
                        if (toRow === fromRow + direction) {
                            return true;
                        }
                        // Two squares forward from starting position
                        if (fromRow === startRow && toRow === fromRow + 2 * direction && 
                            chess.board[fromRow + direction][fromCol].piece === ' ') {
                            return true;
                        }
                    }
                    
                    // Capture diagonally
                    if (Math.abs(fromCol - toCol) === 1 && toRow === fromRow + direction) {
                        if (targetPiece !== ' ') {
                            return true;
                        }
                        // TODO: Implement en passant if needed
                    }
                    
                    return false;
                }
                
                // Rook move validation
                function isValidRookMove(fromRow, fromCol, toRow, toCol) {
                    // Rook moves horizontally or vertically
                    if (fromRow !== toRow && fromCol !== toCol) {
                        return false;
                    }
                    
                    // Check if path is clear
                    return isPathClear(fromRow, fromCol, toRow, toCol);
                }
                
                // Knight move validation
                function isValidKnightMove(fromRow, fromCol, toRow, toCol) {
                    // Knight moves in L-shape: 2 squares in one direction and 1 square perpendicular
                    const rowDiff = Math.abs(fromRow - toRow);
                    const colDiff = Math.abs(fromCol - toCol);
                    
                    return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
                }
                
                // Bishop move validation
                function isValidBishopMove(fromRow, fromCol, toRow, toCol) {
                    // Bishop moves diagonally
                    const rowDiff = Math.abs(fromRow - toRow);
                    const colDiff = Math.abs(fromCol - toCol);
                    
                    if (rowDiff !== colDiff) {
                        return false;
                    }
                    
                    // Check if path is clear
                    return isPathClear(fromRow, fromCol, toRow, toCol);
                }
                
                // Queen move validation
                function isValidQueenMove(fromRow, fromCol, toRow, toCol) {
                    // Queen moves like a rook or bishop
                    return isValidRookMove(fromRow, fromCol, toRow, toCol) || 
                           isValidBishopMove(fromRow, fromCol, toRow, toCol);
                }
                
                // King move validation
                function isValidKingMove(fromRow, fromCol, toRow, toCol) {
                    // King moves one square in any direction
                    const rowDiff = Math.abs(fromRow - toRow);
                    const colDiff = Math.abs(fromCol - toCol);
                    
                    if (rowDiff <= 1 && colDiff <= 1) {
                        return true;
                    }
                    
                    // TODO: Implement castling if needed
                    
                    return false;
                }
                
                // Check if the path is clear (for rook, bishop, queen)
                function isPathClear(fromRow, fromCol, toRow, toCol) {
                    const rowDir = fromRow === toRow ? 0 : (toRow > fromRow ? 1 : -1);
                    const colDir = fromCol === toCol ? 0 : (toCol > fromCol ? 1 : -1);
                    
                    let row = fromRow + rowDir;
                    let col = fromCol + colDir;
                    
                    while (row !== toRow || col !== toCol) {
                        if (chess.board[row][col].piece !== ' ') {
                            return false;
                        }
                        row += rowDir;
                        col += colDir;
                    }
                    
                    return true;
                }
                
                // Make a move
                function makeMove(fromRow, fromCol, toRow, toCol) {
                    const piece = chess.board[fromRow][fromCol].piece;
                    const pieceColor = chess.board[fromRow][fromCol].color;
                    
                    // Log the move
                    const moveNotation = getMoveNotation(fromRow, fromCol, toRow, toCol);
                    logToHistory(`${pieceColor === 'white' ? 'You' : 'Computer'}: ${moveNotation}`);
                    
                    // Track king and rook movements for castling
                    if (piece.toLowerCase() === 'k') {
                        if (pieceColor === 'white') {
                            chess.whiteKingMoved = true;
                        } else {
                            chess.blackKingMoved = true;
                        }
                    }
                    
                    if (piece.toLowerCase() === 'r') {
                        if (pieceColor === 'white') {
                            if (fromCol === 0) chess.whiteRook1Moved = true;
                            if (fromCol === 7) chess.whiteRook2Moved = true;
                        } else {
                            if (fromCol === 0) chess.blackRook1Moved = true;
                            if (fromCol === 7) chess.blackRook2Moved = true;
                        }
                    }
                    
                    // Save move for history
                    chess.moveHistory.push({
                        from: { row: fromRow, col: fromCol },
                        to: { row: toRow, col: toCol },
                        piece: chess.board[fromRow][fromCol].piece,
                        captured: chess.board[toRow][toCol].piece
                    });
                    
                    // Move the piece on the board array
                    chess.board[toRow][toCol].piece = chess.board[fromRow][fromCol].piece;
                    chess.board[toRow][toCol].color = chess.board[fromRow][fromCol].color;
                    chess.board[fromRow][fromCol].piece = ' ';
                    chess.board[fromRow][fromCol].color = null;
                    
                    // Update the visual board
                    const fromCell = chessBoard.querySelector(`[data-row="${fromRow}"][data-col="${fromCol}"]`);
                    const toCell = chessBoard.querySelector(`[data-row="${toRow}"][data-col="${toCol}"]`);
                    
                    toCell.innerHTML = fromCell.innerHTML;
                    fromCell.innerHTML = '';
                    
                    // Check for pawn promotion (simplified - auto promote to queen)
                    if (piece.toLowerCase() === 'p' && (toRow === 0 || toRow === 7)) {
                        const promotedPiece = pieceColor === 'white' ? 'q' : 'Q';
                        chess.board[toRow][toCol].piece = promotedPiece;
                        toCell.innerHTML = getPieceHTML(promotedPiece);
                        logToHistory(`Pawn promoted to Queen`);
                    }
                }
                
                // Convert move to algebraic notation
                function getMoveNotation(fromRow, fromCol, toRow, toCol) {
                    const piece = chess.board[fromRow][fromCol].piece.toLowerCase();
                    const pieceSymbols = { 'r': 'R', 'n': 'N', 'b': 'B', 'q': 'Q', 'k': 'K', 'p': '' };
                    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
                    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
                    
                    const from = files[fromCol] + ranks[fromRow];
                    const to = files[toCol] + ranks[toRow];
                    const isCapture = chess.board[toRow][toCol].piece !== ' ';
                    
                    return `${pieceSymbols[piece]}${isCapture ? 'x' : ''}${to}`;
                }
                
                // Log to the game history
                function logToHistory(message) {
                    chessHistory.innerHTML += `${message}<br>`;
                    chessHistory.scrollTop = chessHistory.scrollHeight;
                }
                
                // Simple AI for computer moves
                function computerMove() {
                    const possibleMoves = [];
                    
                    // Find all possible moves
                    for (let fromRow = 0; fromRow < 8; fromRow++) {
                        for (let fromCol = 0; fromCol < 8; fromCol++) {
                            if (chess.board[fromRow][fromCol].piece !== ' ' && 
                                chess.board[fromRow][fromCol].color === 'black') {
                                
                                for (let toRow = 0; toRow < 8; toRow++) {
                                    for (let toCol = 0; toCol < 8; toCol++) {
                                        if (isValidMove(fromRow, fromCol, toRow, toCol)) {
                                            // Evaluate move
                                            const score = evaluateMove(fromRow, fromCol, toRow, toCol);
                                            possibleMoves.push({ fromRow, fromCol, toRow, toCol, score });
                                        }
                                    }
                                }
                            }
                        }
                    }
                    
                    // Sort moves by score
                    possibleMoves.sort((a, b) => b.score - a.score);
                    
                    // Choose a move based on difficulty
                    let chosenMove;
                    
                    if (chess.difficulty === 'easy') {
                        // In easy mode, pick a random move from the top half of moves
                        const cutoff = Math.max(1, Math.floor(possibleMoves.length / 2));
                        const randomIndex = Math.floor(Math.random() * cutoff);
                        chosenMove = possibleMoves[randomIndex];
                    } else if (chess.difficulty === 'medium') {
                        // In medium mode, pick a random move from the top quarter of moves
                        const cutoff = Math.max(1, Math.floor(possibleMoves.length / 4));
                        const randomIndex = Math.floor(Math.random() * cutoff);
                        chosenMove = possibleMoves[randomIndex];
                    } else {
                        // In hard mode, pick the best move
                        chosenMove = possibleMoves[0];
                    }
                    
                    // If we have a valid move, make it
                    if (chosenMove) {
                        makeMove(chosenMove.fromRow, chosenMove.fromCol, chosenMove.toRow, chosenMove.toCol);
                        
                        // After computer's move, check for game over
                        if (isCheckmate('white')) {
                            chessStatus.textContent = "Checkmate! Computer wins!";
                            chess.gameOver = true;
                            logToHistory("Checkmate! Computer wins!");
                        } else if (isStalemate('white')) {
                            chessStatus.textContent = "Stalemate! Game is a draw.";
                            chess.gameOver = true;
                            logToHistory("Stalemate! Game is a draw.");
                        } else {
                            chess.turn = 'white';
                            chessStatus.textContent = "Your turn (White)";
                        }
                    } else {
                        // No valid moves available (shouldn't happen)
                        chessMessage.textContent = "Computer has no valid moves!";
                    }
                }
                
                // Evaluate a move for the AI
                function evaluateMove(fromRow, fromCol, toRow, toCol) {
                    let score = 0;
                    
                    // Material value
                    const pieceValues = {
                        'p': 1, 'P': 1,
                        'n': 3, 'N': 3,
                        'b': 3, 'B': 3,
                        'r': 5, 'R': 5,
                        'q': 9, 'Q': 9,
                        'k': 0, 'K': 0 // King's value isn't important for material calculation
                    };
                    
                    // If capture, add the value of the captured piece
                    if (chess.board[toRow][toCol].piece !== ' ') {
                        score += pieceValues[chess.board[toRow][toCol].piece] * 10;
                    }
                    
                    // Add small value for controlling center
                    const centerDistance = Math.abs(toRow - 3.5) + Math.abs(toCol - 3.5);
                    score += (4 - centerDistance) * 0.1;
                    
                    // Add value for pawn advancement
                    if (chess.board[fromRow][fromCol].piece.toLowerCase() === 'p') {
                        score += (7 - toRow) * 0.2; // Black pawns move down the board
                    }
                    
                    // Add random factor for unpredictability
                    score += Math.random() * 0.5;
                    
                    return score;
                }
                
                // Check if the current player's king is in check
                function isInCheck(color) {
                    // Find the king's position
                    let kingRow = -1;
                    let kingCol = -1;
                    const kingPiece = color === 'white' ? 'k' : 'K';
                    
                    for (let row = 0; row < 8; row++) {
                        for (let col = 0; col < 8; col++) {
                            if (chess.board[row][col].piece === kingPiece) {
                                kingRow = row;
                                kingCol = col;
                                break;
                            }
                        }
                        if (kingRow !== -1) break;
                    }
                    
                    // If king not found, return false
                    if (kingRow === -1 || kingCol === -1) return false;
                    
                    // Check if any opponent piece can capture the king
                    const opponentColor = color === 'white' ? 'black' : 'white';
                    
                    for (let row = 0; row < 8; row++) {
                        for (let col = 0; col < 8; col++) {
                            if (chess.board[row][col].piece !== ' ' && 
                                chess.board[row][col].color === opponentColor) {
                                // Check if this piece can move to the king's position
                                if (isValidMove(row, col, kingRow, kingCol)) {
                                    return true;
                                }
                            }
                        }
                    }
                    
                    return false;
                }
                
                // Check if the current player is in checkmate
                function isCheckmate(color) {
                    // First, check if the king is in check
                    if (!isInCheck(color)) {
                        return false;
                    }
                    
                    // Then check if any move can get out of check
                    return !hasLegalMove(color);
                }
                
                // Check if the current player is in stalemate
                function isStalemate(color) {
                    // First, check if the king is NOT in check
                    if (isInCheck(color)) {
                        return false;
                    }
                    
                    // Then check if there are no legal moves
                    return !hasLegalMove(color);
                }
                
                // Check if the current player has any legal move
                function hasLegalMove(color) {
                    // Try all possible moves for all pieces
                    for (let fromRow = 0; fromRow < 8; fromRow++) {
                        for (let fromCol = 0; fromCol < 8; fromCol++) {
                            if (chess.board[fromRow][fromCol].piece !== ' ' && 
                                chess.board[fromRow][fromCol].color === color) {
                                
                                for (let toRow = 0; toRow < 8; toRow++) {
                                    for (let toCol = 0; toCol < 8; toCol++) {
                                        // Skip moves to the same square
                                        if (fromRow === toRow && fromCol === toCol) continue;
                                        
                                        if (isValidMove(fromRow, fromCol, toRow, toCol)) {
                                            // Make the move temporarily
                                            const fromPiece = chess.board[fromRow][fromCol];
                                            const toPiece = chess.board[toRow][toCol];
                                            
                                            chess.board[toRow][toCol] = fromPiece;
                                            chess.board[fromRow][fromCol] = { piece: ' ', color: null };
                                            
                                            // Check if the king is still in check
                                            const inCheck = isInCheck(color);
                                            
                                            // Undo the move
                                            chess.board[fromRow][fromCol] = fromPiece;
                                            chess.board[toRow][toCol] = toPiece;
                                            
                                            // If this move gets the king out of check, return true
                                            if (!inCheck) {
                                                return true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    
                    // No legal moves found
                    return false;
                }
                
                // New game button
                chessNewGame.addEventListener('click', () => {
                    initChessBoard();
                });
                
                // Difficulty select
                chessDifficulty.addEventListener('change', () => {
                    chess.difficulty = chessDifficulty.value;
                });
                
                // Initialize the chess board
                initChessBoard();
                break;
                
            case 'Gmail':
                windowContent.innerHTML = `
                    <div style="display: flex; flex-direction: column; height: 100%; background-color: #f5f5f5; font-family: Arial, sans-serif;">
                        <div style="background-color: #d93025; color: white; padding: 10px; display: flex; align-items: center;">
                            <img src="Email logo.png" style="height: 30px; margin-right: 10px;" alt="Gmail">
                            <div style="font-size: 20px; font-weight: bold;">Gmail</div>
                            <div style="margin-left: auto; display: flex; gap: 10px;">
                                <input type="text" placeholder="Search mail" style="padding: 5px 10px; border-radius: 5px; border: none; width: 200px;">
                                <button style="background: none; border: none; cursor: pointer;">⚙️</button>
                            </div>
                        </div>
                        <div style="display: flex; height: 100%;">
                            <div style="width: 200px; background-color: white; border-right: 1px solid #e0e0e0; padding: 10px;">
                                <button class="gmail-compose" style="background-color: #c2e7ff; color: #001d35; border: none; border-radius: 16px; padding: 10px 15px; width: 100%; text-align: left; margin-bottom: 15px; font-weight: bold; cursor: pointer;">
                                    <span style="margin-right: 10px;">✏️</span> Compose
                                </button>
                                <div class="gmail-folder active" style="padding: 5px 10px; cursor: pointer; border-radius: 12px; background-color: #e8eaed;">
                                    <span style="margin-right: 10px;">📥</span> Inbox <span style="margin-left: auto;">(14)</span>
                                </div>
                                <div class="gmail-folder" style="padding: 5px 10px; cursor: pointer; border-radius: 12px;">
                                    <span style="margin-right: 10px;">⭐</span> Starred
                                </div>
                                <div class="gmail-folder" style="padding: 5px 10px; cursor: pointer; border-radius: 12px;">
                                    <span style="margin-right: 10px;">⏱️</span> Snoozed
                                </div>
                                <div class="gmail-folder" style="padding: 5px 10px; cursor: pointer; border-radius: 12px;">
                                    <span style="margin-right: 10px;">📤</span> Sent
                                </div>
                                <div class="gmail-folder" style="padding: 5px 10px; cursor: pointer; border-radius: 12px;">
                                    <span style="margin-right: 10px;">📝</span> Drafts <span style="margin-left: auto;">(2)</span>
                                </div>
                                <div class="gmail-folder" style="padding: 5px 10px; cursor: pointer; border-radius: 12px;">
                                    <span style="margin-right: 10px;">🗑️</span> Trash
                                </div>
                            </div>
                            <div style="flex-grow: 1; overflow-y: auto; padding: 15px;">
                                <div class="gmail-mail-list">
                                    <div class="gmail-mail-item unread" style="padding: 10px; border-bottom: 1px solid #e0e0e0; display: flex; align-items: center; cursor: pointer; background-color: #f2f6fc;">
                                        <input type="checkbox" style="margin-right: 10px;">
                                        <div style="margin-right: 10px;">⭐</div>
                                        <div style="font-weight: bold; width: 180px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Microsoft Teams</div>
                                        <div style="flex-grow: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                            <span style="font-weight: bold;">Meeting reminder: Project Status Update</span> - 
                                            The weekly project status meeting will start in 15 minutes. Join with the link below...
                                        </div>
                                        <div style="margin-left: 10px; font-weight: bold;">10:45 AM</div>
                                    </div>
                                    <div class="gmail-mail-item" style="padding: 10px; border-bottom: 1px solid #e0e0e0; display: flex; align-items: center; cursor: pointer;">
                                        <input type="checkbox" style="margin-right: 10px;">
                                        <div style="margin-right: 10px;">⭐</div>
                                        <div style="width: 180px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Adobe Creative Cloud</div>
                                        <div style="flex-grow: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                            Your subscription will renew soon - Your Adobe Creative Cloud subscription will automatically renew on May 15th...
                                        </div>
                                        <div style="margin-left: 10px;">May 2</div>
                                    </div>
                                    <div class="gmail-mail-item" style="padding: 10px; border-bottom: 1px solid #e0e0e0; display: flex; align-items: center; cursor: pointer;">
                                        <div style="margin-right: 10px;">⭐</div>
                                        <div style="width: 180px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">LinkedIn</div>
                                        <div style="flex-grow: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                            5 people viewed your profile this week - See who's been looking at your LinkedIn profile and boost your visibility...
                                        </div>
                                        <div style="margin-left: 10px;">Apr 29</div>
                                    </div>
                                    <div class="gmail-mail-item" style="padding: 10px; border-bottom: 1px solid #e0e0e0; display: flex; align-items: center; cursor: pointer;">
                                        <div style="margin-right: 10px;">⭐</div>
                                        <div style="width: 180px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Amazon</div>
                                        <div style="flex-grow: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                            Your order has shipped - Your recent Amazon order #102-5398741-6940271 has shipped and is on its way...
                                        </div>
                                        <div style="margin-left: 10px;">Apr 28</div>
                                    </div>
                                    <div class="gmail-mail-item" style="padding: 10px; border-bottom: 1px solid #e0e0e0; display: flex; align-items: center; cursor: pointer;">
                                        <div style="margin-right: 10px;">⭐</div>
                                        <div style="width: 180px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Twitter</div>
                                        <div style="flex-grow: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                            You have 5 new notifications - Check what's happening on Twitter with your network...
                                        </div>
                                        <div style="margin-left: 10px;">Apr 25</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                windowStatus.textContent = 'Connected';
                
                // Gmail functionality
                const gmailCompose = windowContent.querySelector('.gmail-compose');
                const gmailFolders = windowContent.querySelectorAll('.gmail-folder');
                const gmailTabs = windowContent.querySelectorAll('.gmail-tab');
                const gmailMailItems = windowContent.querySelectorAll('.gmail-mail-item');
                
                // Compose button
                gmailCompose.addEventListener('click', () => {
                    // Create compose popup
                    const composeWindow = document.createElement('div');
                    composeWindow.style.position = 'absolute';
                    composeWindow.style.bottom = '0';
                    composeWindow.style.right = '20px';
                    composeWindow.style.width = '500px';
                    composeWindow.style.height = '400px';
                    composeWindow.style.backgroundColor = 'white';
                    composeWindow.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
                    composeWindow.style.borderRadius = '8px 8px 0 0';
                    composeWindow.style.display = 'flex';
                    composeWindow.style.flexDirection = 'column';
                    composeWindow.style.zIndex = '100';
                    
                    composeWindow.innerHTML = `
                        <div style="padding: 10px; background-color: #f5f5f5; border-bottom: 1px solid #e0e0e0; display: flex; align-items: center;">
                            <div style="flex-grow: 1;">New Message</div>
                            <button class="compose-minimize" style="background: none; border: none; cursor: pointer;">_</button>
                            <button class="compose-close" style="background: none; border: none; cursor: pointer;">✕</button>
                        </div>
                        <div style="padding: 10px; border-bottom: 1px solid #e0e0e0; display: flex; align-items: center;">
                            <div style="width: 60px;">To:</div>
                            <input type="text" placeholder="Recipients" style="flex-grow: 1; border: none; outline: none;" class="compose-to">
                        </div>
                        <div style="padding: 10px; border-bottom: 1px solid #e0e0e0; display: flex; align-items: center;">
                            <div style="width: 60px;">Subject:</div>
                            <input type="text" placeholder="Subject" style="flex-grow: 1; border: none; outline: none;" class="compose-subject">
                        </div>
                        <div style="flex-grow: 1; padding: 10px;">
                            <textarea style="width: 100%; height: 100%; border: none; outline: none; resize: none;" placeholder="Compose email" class="compose-body"></textarea>
                        </div>
                        <div style="padding: 10px; display: flex; align-items: center;">
                            <button class="compose-send" style="background-color: #0b57d0; color: white; border: none; border-radius: 4px; padding: 8px 16px; cursor: pointer;">Send</button>
                            <button style="background: none; border: none; cursor: pointer; margin-left: 10px;">📎</button>
                        </div>
                    `;
                    
                    windowContent.appendChild(composeWindow);
                    
                    // Close button functionality
                    composeWindow.querySelector('.compose-close').addEventListener('click', () => {
                        composeWindow.remove();
                    });
                    
                    // Send button functionality
                    composeWindow.querySelector('.compose-send').addEventListener('click', () => {
                        alert('Email sent successfully!');
                        composeWindow.remove();
                    });
                    
                    // Minimize button functionality
                    composeWindow.querySelector('.compose-minimize').addEventListener('click', () => {
                        if (composeWindow.style.height === '400px') {
                            composeWindow.style.height = '40px';
                            composeWindow.querySelectorAll('div')[0].nextElementSibling.style.display = 'none';
                            composeWindow.querySelectorAll('div')[0].nextElementSibling.nextElementSibling.style.display = 'none';
                            composeWindow.querySelectorAll('div')[0].nextElementSibling.nextElementSibling.nextElementSibling.style.display = 'none';
                            composeWindow.querySelectorAll('div')[0].nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style.display = 'none';
                        } else {
                            composeWindow.style.height = '400px';
                            composeWindow.querySelectorAll('div')[0].nextElementSibling.style.display = 'flex';
                            composeWindow.querySelectorAll('div')[0].nextElementSibling.nextElementSibling.style.display = 'flex';
                            composeWindow.querySelectorAll('div')[0].nextElementSibling.nextElementSibling.nextElementSibling.style.display = 'block';
                            composeWindow.querySelectorAll('div')[0].nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style.display = 'flex';
                        }
                    });
                });
                
                // Folder selection
                gmailFolders.forEach(folder => {
                    folder.addEventListener('click', () => {
                        gmailFolders.forEach(f => f.style.backgroundColor = 'transparent');
                        folder.style.backgroundColor = '#e8eaed';
                    });
                });
                
                // Tab selection
                gmailTabs.forEach(tab => {
                    tab.addEventListener('click', () => {
                        gmailTabs.forEach(t => {
                            t.classList.remove('active');
                            t.style.borderBottom = 'none';
                        });
                        tab.classList.add('active');
                        tab.style.borderBottom = '2px solid #d93025';
                    });
                });
                
                // Email item click
                gmailMailItems.forEach(item => {
                    item.addEventListener('click', () => {
                        // Create email view
                        const mailContent = windowContent.querySelector('.gmail-mail-list');
                        const originalContent = mailContent.innerHTML;
                        
                        // Get email data
                        const sender = item.querySelector('div:nth-child(3)').textContent;
                        const subject = item.querySelector('div:nth-child(4) span') ? 
                                       item.querySelector('div:nth-child(4) span').textContent : 
                                       'No Subject';
                        const preview = item.querySelector('div:nth-child(4)').textContent.split('- ')[1] || '';
                        
                        mailContent.innerHTML = `
                            <div style="padding: 20px;">
                                <div style="display: flex; margin-bottom: 20px;">
                                    <button class="email-back" style="background: none; border: none; cursor: pointer; margin-right: 10px;">←</button>
                                    <div style="font-size: 20px; font-weight: bold;">${subject}</div>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                        <div style="width: 40px; height: 40px; border-radius: 50%; background: #f00; margin-right: 10px;"></div>
                                        <div>
                                            <div style="font-weight: bold;">${sender}</div>
                                            <div style="color: #666; font-size: 12px;">to me</div>
                                        </div>
                                        <div style="margin-left: auto; color: #666;">Today, 10:45 AM</div>
                                    </div>
                                </div>
                                <div style="line-height: 1.6; margin-bottom: 20px;">
                                    <p>${preview}</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisl nunc euismod nisi, eu porttitor nisl nisi euismod nisi.</p>
                                    <p>Regards,<br>The Team</p>
                                </div>
                                <div style="display: flex; gap: 10px;">
                                    <button style="background-color: #f5f5f5; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer;">Reply</button>
                                    <button style="background-color: #f5f5f5; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer;">Forward</button>
                                </div>
                            </div>
                        `;
                        
                        // Back button functionality
                        mailContent.querySelector('.email-back').addEventListener('click', () => {
                            mailContent.innerHTML = originalContent;
                            
                            // Reattach event listeners to new elements
                            mailContent.querySelectorAll('.gmail-mail-item').forEach(newItem => {
                                newItem.addEventListener('click', function() {
                                    item.click();
                                });
                            });
                        });
                        
                        // Mark as read
                        item.classList.remove('unread');
                        item.style.backgroundColor = 'white';
                        if (item.querySelector('div:nth-child(3)')) {
                            item.querySelector('div:nth-child(3)').style.fontWeight = 'normal';
                        }
                        if (item.querySelector('div:nth-child(4) span')) {
                            item.querySelector('div:nth-child(4) span').style.fontWeight = 'normal';
                        }
                    });
                    
                    // Prevent checkbox from triggering email open
                    item.querySelector('input[type="checkbox"]').addEventListener('click', (e) => {
                        e.stopPropagation();
                    });
                });
                break;
                
            case 'Youtube':
                windowContent.innerHTML = `
                    <div style="display: flex; flex-direction: column; height: 100%; background-color: #121212; color: white; font-family: 'Roboto', Arial, sans-serif;">
                        <div style="padding: 10px; background-color: #202020; display: flex; align-items: center; border-bottom: 1px solid #303030;">
                            <img src="Youtubepink.png" style="height: 30px; margin-right: 10px;" alt="Youtube">
                            <div style="font-size: 20px; font-weight: bold; color: white;">YouTube</div>
                            <div style="margin-left: auto; display: flex; gap: 10px;">
                                <input type="text" placeholder="Search videos" class="youtube-search" style="padding: 5px 10px; border-radius: 20px; border: 1px solid #303030; background: #121212; color: white; width: 250px;">
                                <button class="youtube-search-btn" style="background: #303030; border: none; color: white; border-radius: 20px; padding: 5px 15px; cursor: pointer;">Search</button>
                            </div>
                        </div>
                        <div style="display: flex; height: 100%;">
                            <div style="width: 200px; background-color: #212121; border-right: 1px solid #303030; padding: 10px;">
                                <div class="youtube-nav-item active" style="padding: 8px 10px; cursor: pointer; border-radius: 8px; background-color: #383838; margin-bottom: 5px;">
                                    <span style="margin-right: 10px;">🏠</span> Home
                                </div>
                                <div class="youtube-nav-item" style="padding: 8px 10px; cursor: pointer; border-radius: 8px; margin-bottom: 5px;">
                                    <span style="margin-right: 10px;">🔥</span> Trending
                                </div>
                                <div class="youtube-nav-item" style="padding: 8px 10px; cursor: pointer; border-radius: 8px; margin-bottom: 5px;">
                                    <span style="margin-right: 10px;">📦</span> Subscriptions
                                </div>
                                <div class="youtube-nav-item" style="padding: 8px 10px; cursor: pointer; border-radius: 8px; margin-bottom: 5px;">
                                    <span style="margin-right: 10px;">📚</span> Library
                                </div>
                                <div class="youtube-nav-item" style="padding: 8px 10px; cursor: pointer; border-radius: 8px; margin-bottom: 5px;">
                                    <span style="margin-right: 10px;">⏱️</span> History
                                </div>
                                <hr style="border-color: #303030; margin: 10px 0;">
                                <div style="font-weight: bold; margin: 10px 0 5px 5px;">Subscriptions</div>
                                <div class="youtube-channel" style="padding: 8px 10px; cursor: pointer; border-radius: 8px; display: flex; align-items: center;">
                                    <div style="width: 24px; height: 24px; border-radius: 50%; background: #f00; margin-right: 10px;"></div>
                                    MrBeast
                                </div>
                                <div class="youtube-channel" style="padding: 8px 10px; cursor: pointer; border-radius: 8px; display: flex; align-items: center;">
                                    <div style="width: 24px; height: 24px; border-radius: 50%; background: #0a0; margin-right: 10px;"></div>
                                    PewDiePie
                                </div>
                                <div class="youtube-channel" style="padding: 8px 10px; cursor: pointer; border-radius: 8px; display: flex; align-items: center;">
                                    <div style="width: 24px; height: 24px; border-radius: 50%; background: #00f; margin-right: 10px;"></div>
                                    Markiplier
                                </div>
                            </div>
                            <div style="flex-grow: 1; overflow-y: auto; padding: 15px;">
                                <div class="youtube-content">
                                    <h3 style="margin-top: 0;">Recommended Videos</h3>
                                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px;">
                                        <div class="youtube-video" data-title="10 Million Subscriber Special" data-channel="MrBeast" data-views="54M views" style="cursor: pointer;">
                                            <div style="position: relative; padding-bottom: 56.25%; background: #000; border-radius: 8px; overflow: hidden; margin-bottom: 10px;">
                                                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background: linear-gradient(45deg, #f00, #f0f);">
                                                    <span style="font-size: 40px;">▶️</span>
                                                </div>
                                                <div style="position: absolute; bottom: 5px; right: 5px; background: rgba(0,0,0,0.7); padding: 2px 5px; border-radius: 4px; font-size: 12px;">10:45</div>
                                            </div>
                                            <div style="font-weight: bold; margin-bottom: 5px;">10 Million Subscriber Special</div>
                                            <div style="color: #aaa; font-size: 12px;">MrBeast • 54M views • 2 years ago</div>
                                        </div>
                                        <div class="youtube-video" data-title="I Survived 100 Days in Minecraft Hardcore" data-channel="PewDiePie" data-views="28M views" style="cursor: pointer;">
                                            <div style="position: relative; padding-bottom: 56.25%; background: #000; border-radius: 8px; overflow: hidden; margin-bottom: 10px;">
                                                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background: linear-gradient(45deg, #0af, #00f);">
                                                    <span style="font-size: 40px;">▶️</span>
                                                </div>
                                                <div style="position: absolute; bottom: 5px; right: 5px; background: rgba(0,0,0,0.7); padding: 2px 5px; border-radius: 4px; font-size: 12px;">25:18</div>
                                            </div>
                                            <div style="font-weight: bold; margin-bottom: 5px;">I Survived 100 Days in Minecraft Hardcore</div>
                                            <div style="color: #aaa; font-size: 12px;">PewDiePie • 28M views • 1 year ago</div>
                                        </div>
                                        <div class="youtube-video" data-title="Five Nights at Freddy's - Complete Playthrough" data-channel="Markiplier" data-views="45M views" style="cursor: pointer;">
                                            <div style="position: relative; padding-bottom: 56.25%; background: #000; border-radius: 8px; overflow: hidden; margin-bottom: 10px;">
                                                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background: linear-gradient(45deg, #0a0, #0f0);">
                                                    <span style="font-size: 40px;">▶️</span>
                                                </div>
                                                <div style="position: absolute; bottom: 5px; right: 5px; background: rgba(0,0,0,0.7); padding: 2px 5px; border-radius: 4px; font-size: 12px;">32:45</div>
                                            </div>
                                            <div style="font-weight: bold; margin-bottom: 5px;">Five Nights at Freddy's - Complete Playthrough</div>
                                            <div style="color: #aaa; font-size: 12px;">Markiplier • 45M views • 3 years ago</div>
                                        </div>
                                        <div class="youtube-video" data-title="World's Most Dangerous Escape Room" data-channel="MrBeast" data-views="87M views" style="cursor: pointer;">
                                            <div style="position: relative; padding-bottom: 56.25%; background: #000; border-radius: 8px; overflow: hidden; margin-bottom: 10px;">
                                                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background: linear-gradient(45deg, #ff0, #fa0);">
                                                    <span style="font-size: 40px;">▶️</span>
                                                </div>
                                                <div style="position: absolute; bottom: 5px; right: 5px; background: rgba(0,0,0,0.7); padding: 2px 5px; border-radius: 4px; font-size: 12px;">15:26</div>
                                            </div>
                                            <div style="font-weight: bold; margin-bottom: 5px;">World's Most Dangerous Escape Room</div>
                                            <div style="color: #aaa; font-size: 12px;">MrBeast • 87M views • 1 year ago</div>
                                        </div>
                                        <div class="youtube-video" data-title="I Spent 50 Hours Buried Alive" data-channel="MrBeast" data-views="110M views" style="cursor: pointer;">
                                            <div style="position: relative; padding-bottom: 56.25%; background: #000; border-radius: 8px; overflow: hidden; margin-bottom: 10px;">
                                                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background: linear-gradient(45deg, #a0f, #50f);">
                                                    <span style="font-size: 40px;">▶️</span>
                                                </div>
                                                <div style="position: absolute; bottom: 5px; right: 5px; background: rgba(0,0,0,0.7); padding: 2px 5px; border-radius: 4px; font-size: 12px;">12:20</div>
                                            </div>
                                            <div style="font-weight: bold; margin-bottom: 5px;">I Spent 50 Hours Buried Alive</div>
                                            <div style="color: #aaa; font-size: 12px;">MrBeast • 110M views • 8 months ago</div>
                                        </div>
                                        <div class="youtube-video" data-title="Gaming Setup Tour 2023" data-channel="PewDiePie" data-views="15M views" style="cursor: pointer;">
                                            <div style="position: relative; padding-bottom: 56.25%; background: #000; border-radius: 8px; overflow: hidden; margin-bottom: 10px;">
                                                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background: linear-gradient(45deg, #00a, #05f);">
                                                    <span style="font-size: 40px;">▶️</span>
                                                </div>
                                                <div style="position: absolute; bottom: 5px; right: 5px; background: rgba(0,0,0,0.7); padding: 2px 5px; border-radius: 4px; font-size: 12px;">18:34</div>
                                            </div>
                                            <div style="font-weight: bold; margin-bottom: 5px;">Gaming Setup Tour 2023</div>
                                            <div style="color: #aaa; font-size: 12px;">PewDiePie • 15M views • 4 months ago</div>
                                        </div>
                                    </div>
                                    
                                    <h3 style="margin-top: 20px;">Gaming Highlights</h3>
                                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px;">
                                        <div class="youtube-video" data-title="Minecraft's New Update Changed Everything" data-channel="Dream" data-views="12M views" style="cursor: pointer;">
                                            <div style="position: relative; padding-bottom: 56.25%; background: #000; border-radius: 8px; overflow: hidden; margin-bottom: 10px;">
                                                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background: linear-gradient(45deg, #f00, #f50);">
                                                    <span style="font-size: 40px;">▶️</span>
                                                </div>
                                                <div style="position: absolute; bottom: 5px; right: 5px; background: rgba(0,0,0,0.7); padding: 2px 5px; border-radius: 4px; font-size: 12px;">22:12</div>
                                            </div>
                                            <div style="font-weight: bold; margin-bottom: 5px;">Minecraft's New Update Changed Everything</div>
                                            <div style="color: #aaa; font-size: 12px;">Dream • 12M views • 2 months ago</div>
                                        </div>
                                        <div class="youtube-video" data-title="Elden Ring: The Ultimate Guide" data-channel="IGN" data-views="8.7M views" style="cursor: pointer;">
                                            <div style="position: relative; padding-bottom: 56.25%; background: #000; border-radius: 8px; overflow: hidden; margin-bottom: 10px;">
                                                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background: linear-gradient(45deg, #f00, #f0a);">
                                                    <span style="font-size: 40px;">▶️</span>
                                                </div>
                                                <div style="position: absolute; bottom: 5px; right: 5px; background: rgba(0,0,0,0.7); padding: 2px 5px; border-radius: 4px; font-size: 12px;">24:45</div>
                                            </div>
                                            <div style="font-weight: bold; margin-bottom: 5px;">Elden Ring: The Ultimate Guide</div>
                                            <div style="color: #aaa; font-size: 12px;">IGN • 8.7M views • 6 months ago</div>
                                        </div>
                                        <div class="youtube-video" data-title="Fortnite Chapter 4: Everything You Need To Know" data-channel="Ali-A" data-views="22M views" style="cursor: pointer;">
                                            <div style="position: relative; padding-bottom: 56.25%; background: #000; border-radius: 8px; overflow: hidden; margin-bottom: 10px;">
                                                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background: linear-gradient(45deg, #a00, #f00);">
                                                    <span style="font-size: 40px;">▶️</span>
                                                </div>
                                                <div style="position: absolute; bottom: 5px; right: 5px; background: rgba(0,0,0,0.7); padding: 2px 5px; border-radius: 4px; font-size: 12px;">16:16</div>
                                            </div>
                                            <div style="font-weight: bold; margin-bottom: 5px;">Fortnite Chapter 4: Everything You Need To Know</div>
                                            <div style="color: #aaa; font-size: 12px;">Ali-A • 22M views • 3 months ago</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="youtube-player" style="display: none; flex-direction: column; height: 100%;">
                                    <div style="position: relative; padding-bottom: 56.25%; background: #000; margin-bottom: 15px;">
                                        <div class="youtube-video-player" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background: #000;">
                                            <div class="youtube-video-placeholder" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; font-size: 40px; background-size: cover; background-position: center;">
                                                <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; background: rgba(0,0,0,0.6);">
                                                    <span style="font-size: 100px;">▶️</span>
                                                </div>
                                            </div>
                                            <div class="youtube-video-controls" style="position: absolute; bottom: 0; left: 0; right: 0; height: 40px; background: rgba(0,0,0,0.7); display: flex; align-items: center; padding: 0 10px;">
                                                <button class="youtube-play-btn" style="background: none; border: none; color: white; cursor: pointer; font-size: 18px;">▶️</button>
                                                <div style="flex-grow: 1; height: 4px; background: #333; margin: 0 10px; position: relative;">
                                                    <div class="youtube-progress" style="position: absolute; left: 0; top: 0; bottom: 0; width: 0%; background: red;"></div>
                                                </div>
                                                <div class="youtube-time" style="color: white; font-size: 12px;">0:00 / 0:00</div>
                                                <button class="youtube-fullscreen" style="background: none; border: none; color: white; cursor: pointer; font-size: 18px; margin-left: 10px;">⛶</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="youtube-video-info">
                                        <h2 class="youtube-video-title">Video Title</h2>
                                        <div style="display: flex; margin-bottom: 15px;">
                                            <div style="display: flex; align-items: center; margin-right: 20px;">
                                                <div class="youtube-channel-icon" style="width: 40px; height: 40px; border-radius: 50%; background: #f00; margin-right: 10px;"></div>
                                                <div>
                                                    <div class="youtube-channel-name" style="font-weight: bold;">Channel Name</div>
                                                    <div style="color: #aaa; font-size: 12px;">1.2M subscribers</div>
                                                </div>
                                            </div>
                                            <button style="background: #f00; color: white; border: none; border-radius: 20px; padding: 10px 20px; margin-left: auto; cursor: pointer;">Subscribe</button>
                                        </div>
                                        <div style="background: #212121; padding: 10px; border-radius: 10px; margin-bottom: 20px;">
                                            <div style="display: flex; margin-bottom: 10px;">
                                                <div class="youtube-view-count" style="margin-right: 15px;">1.2M views</div>
                                                <div>1 year ago</div>
                                            </div>
                                            <div class="youtube-description">
                                                Video description will appear here. Click the video to watch!
                                            </div>
                                        </div>
                                        <div class="youtube-comments">
                                            <h3>Comments</h3>
                                            <div style="display: flex; margin-bottom: 15px;">
                                                <div style="width: 40px; height: 40px; border-radius: 50%; background: #00a; margin-right: 10px; flex-shrink: 0;"></div>
                                                <input type="text" placeholder="Add a comment..." style="flex-grow: 1; padding: 10px; border-radius: 20px; border: 1px solid #303030; background: #121212; color: white;">
                                            </div>
                                            <div style="display: flex; margin-bottom: 15px;">
                                                <div style="width: 40px; height: 40px; border-radius: 50%; background: #0a0; margin-right: 10px; flex-shrink: 0;"></div>
                                                <div>
                                                    <div style="font-weight: bold; margin-bottom: 5px;">User123</div>
                                                    <div>This video is amazing! I've watched it 10 times already.</div>
                                                </div>
                                            </div>
                                            <div style="display: flex; margin-bottom: 15px;">
                                                <div style="width: 40px; height: 40px; border-radius: 50%; background: #a0a; margin-right: 10px; flex-shrink: 0;"></div>
                                                <div>
                                                    <div style="font-weight: bold; margin-bottom: 5px;">GamerGirl42</div>
                                                    <div>This channel always has the best content. Can't wait for the next video!</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                windowStatus.textContent = 'Connected to YouTube';
                
                // YouTube functionality
                const youtubeVideos = windowContent.querySelectorAll('.youtube-video');
                const youtubeContent = windowContent.querySelector('.youtube-content');
                const youtubePlayer = windowContent.querySelector('.youtube-player');
                const youtubeVideoTitle = windowContent.querySelector('.youtube-video-title');
                const youtubeViewCount = windowContent.querySelector('.youtube-view-count');
                const youtubeDescription = windowContent.querySelector('.youtube-description');
                const youtubeNavItems = windowContent.querySelectorAll('.youtube-nav-item');
                const youtubeSearch = windowContent.querySelector('.youtube-search');
                const youtubeSearchBtn = windowContent.querySelector('.youtube-search-btn');
                const youtubeVideoPlaceholder = windowContent.querySelector('.youtube-video-placeholder');
                const youtubeChannelName = windowContent.querySelector('.youtube-channel-name');
                const youtubeChannelIcon = windowContent.querySelector('.youtube-channel-icon');
                const youtubePlayBtn = windowContent.querySelector('.youtube-play-btn');
                const youtubeProgress = windowContent.querySelector('.youtube-progress');
                const youtubeTime = windowContent.querySelector('.youtube-time');
                
                // Video click handler
                youtubeVideos.forEach(video => {
                    video.addEventListener('click', () => {
                        const videoTitle = video.getAttribute('data-title');
                        const channelName = video.getAttribute('data-channel'); 
                        const viewCount = video.getAttribute('data-views');
                        const videoColor = video.querySelector('div > div').style.background;
                        
                        // Update player
                        youtubeContent.style.display = 'none';
                        youtubePlayer.style.display = 'flex';
                        youtubeVideoTitle.textContent = videoTitle;
                        youtubeChannelName.textContent = channelName;
                        youtubeViewCount.textContent = viewCount;
                        youtubeDescription.textContent = `This is a video by ${channelName} titled "${videoTitle}". It has been viewed ${viewCount.toLowerCase()}.`;
                        
                        // Match channel icon to original video
                        if (channelName === 'MrBeast') {
                            youtubeChannelIcon.style.background = '#f00';
                        } else if (channelName === 'PewDiePie') {
                            youtubeChannelIcon.style.background = '#0a0';
                        } else if (channelName === 'Markiplier') {
                            youtubeChannelIcon.style.background = '#00f';  
                        } else {
                            youtubeChannelIcon.style.background = '#a0a';
                        }
                        
                        // Check if this is the Minecraft video and load embedded YouTube
                        if (videoTitle === "I Survived 100 Days in Minecraft Hardcore") {
                            youtubeVideoPlaceholder.innerHTML = `
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/jLuMFyAL61Q" 
                                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
                                gyroscope; picture-in-picture" allowfullscreen></iframe>
                            `;
                            // Hide controls as YouTube player has its own
                            const controls = windowContent.querySelector('.youtube-video-controls');
                            if (controls) controls.style.display = 'none';
                        } else {
                            // Reset for other videos
                            youtubeVideoPlaceholder.innerHTML = `
                                <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; background: rgba(0,0,0,0.6);">
                                    <span style="font-size: 100px;">▶️</span>
                                </div>
                            `;
                            
                            // Show controls for simulated videos
                            const controls = windowContent.querySelector('.youtube-video-controls');
                            if (controls) controls.style.display = 'flex';
                            
                            // Set video placeholder background to match the video thumbnail
                            youtubeVideoPlaceholder.style.background = videoColor;
                            
                            // Reset progress bar and time
                            youtubeProgress.style.width = '0%';
                            
                            // Generate random video duration (3-30 minutes)
                            const minutes = Math.floor(Math.random() * 27) + 3;
                            const seconds = Math.floor(Math.random() * 60);
                            const duration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                            youtubeTime.textContent = `0:00 / ${duration}`;
                        }
                        
                        // Set up play button functionality
                        youtubePlayBtn.addEventListener('click', function() {
                            if (videoTitle === "I Survived 100 Days in Minecraft Hardcore") {
                                return; // Skip for actual YouTube embed
                            }
                            
                            if (youtubePlayBtn.textContent === '▶️') {
                                youtubePlayBtn.textContent = '⏸️';
                                youtubeVideoPlaceholder.querySelector('div').style.display = 'none';
                                
                                // Simulate video progress
                                let progress = 0;
                                const interval = setInterval(() => {
                                    progress += 0.5;
                                    youtubeProgress.style.width = `${progress}%`;
                                    
                                    // Update time
                                    const currentSeconds = Math.floor((minutes * 60 + seconds) * (progress / 100));
                                    const currentMinutes = Math.floor(currentSeconds / 60);
                                    const remainingSeconds = currentSeconds % 60;
                                    youtubeTime.textContent = `${currentMinutes}:${remainingSeconds.toString().padStart(2, '0')} / ${duration}`;
                                    
                                    if (progress >= 100) {
                                        clearInterval(interval);
                                        youtubePlayBtn.textContent = '▶️';
                                        youtubeVideoPlaceholder.querySelector('div').style.display = 'flex';
                                    }
                                }, 500);
                            } else {
                                youtubePlayBtn.textContent = '▶️';
                                youtubeVideoPlaceholder.querySelector('div').style.display = 'flex';
                            }
                        });
                    });
                });
                
                // Navigation click handler
                youtubeNavItems.forEach(item => {
                    item.addEventListener('click', () => {
                        // Reset active state
                        youtubeNavItems.forEach(nav => {
                            nav.classList.remove('active');
                            nav.style.backgroundColor = 'transparent';
                        });
                        
                        // Set active state
                        item.classList.add('active');
                        item.style.backgroundColor = '#383838';
                        
                        // Return to content view if in player view
                        if (youtubePlayer.style.display !== 'none') {
                            youtubePlayer.style.display = 'none';
                            youtubeContent.style.display = 'block';
                        }
                        
                        // Update content based on navigation
                        const navText = item.textContent.trim();
                        if (navText.includes('Trending')) {
                            alert('Trending videos would be shown here');
                        } else if (navText.includes('Subscriptions')) {
                            alert('Subscription videos would be shown here');
                        } else if (navText.includes('Library')) {
                            alert('Your library would be shown here');
                        } else if (navText.includes('History')) {
                            alert('Your watch history would be shown here');
                        }
                    });
                });
                
                // Search functionality
                youtubeSearchBtn.addEventListener('click', performSearch);
                youtubeSearch.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        performSearch();
                    }
                });
                
                function performSearch() {
                    const searchTerm = youtubeSearch.value.trim().toLowerCase();
                    if (!searchTerm) return;
                    
                    // Return to content view
                    youtubePlayer.style.display = 'none';
                    youtubeContent.style.display = 'block';
                    
                    // Find videos that match search
                    let found = false;
                    youtubeVideos.forEach(video => {
                        const title = video.getAttribute('data-title').toLowerCase();
                        const channel = video.getAttribute('data-channel').toLowerCase();
                        
                        if (title.includes(searchTerm) || channel.includes(searchTerm)) {
                            video.style.display = 'block';
                            video.parentElement.style.display = 'grid';
                            found = true;
                        } else {
                            video.style.display = 'none';
                        }
                    });
                    
                    // Update headings
                    const headings = youtubeContent.querySelectorAll('h3');
                    headings.forEach(heading => {
                        heading.style.display = 'none';
                    });
                    
                    if (found) {
                        const searchHeading = document.createElement('h3');
                        searchHeading.textContent = `Search results for "${searchTerm}"`;
                        searchHeading.style.marginTop = '0';
                        youtubeContent.insertBefore(searchHeading, youtubeContent.firstChild);
                    } else {
                        const noResults = document.createElement('h3');
                        noResults.textContent = `No results found for "${searchTerm}"`;
                        noResults.style.marginTop = '0';
                        youtubeContent.insertBefore(noResults, youtubeContent.firstChild);
                    }
                }
                break;
                
            default:
                windowContent.innerHTML = '<div style="text-align: center; padding: 40px;">Window Content</div>';
                windowStatus.textContent = 'Ready';
        }
        
        // Add to document
        document.body.appendChild(newWindow);
        
        // Add to taskbar
        addToTaskbar(newWindow.id, title);
        
        // Make the window active
        makeWindowActive(newWindow);
        
        // Setup window controls
        setupWindowControls(newWindow);
        
        // Make window draggable
        makeWindowDraggable(newWindow);
        
        return newWindow;
    }
    
    function addToTaskbar(windowId, title) {
        const openWindows = document.querySelector('.open-windows');
        const taskbarItem = document.createElement('div');
        taskbarItem.className = 'taskbar-item';
        taskbarItem.setAttribute('data-window-id', windowId);
        taskbarItem.textContent = title;
        
        taskbarItem.addEventListener('click', function() {
            const windowElement = document.getElementById(this.getAttribute('data-window-id'));
            
            if (windowElement.style.display === 'none') {
                windowElement.style.display = 'flex';
                makeWindowActive(windowElement);
            } else if (windowElement === activeWindow) {
                windowElement.style.display = 'none';
                this.classList.remove('active');
            } else {
                makeWindowActive(windowElement);
            }
        });
        
        openWindows.appendChild(taskbarItem);
    }
    
    function makeWindowActive(windowElement) {
        // Deactivate currently active window
        if (activeWindow) {
            activeWindow.style.zIndex = '1';
            const activeTitleBar = activeWindow.querySelector('.window-header');
            activeTitleBar.style.backgroundColor = '#808080';
            
            // Update taskbar
            const activeTaskbarItem = document.querySelector(`.taskbar-item[data-window-id="${activeWindow.id}"]`);
            if (activeTaskbarItem) {
                activeTaskbarItem.classList.remove('active');
            }
        }
        
        // Set this window as active
        windowElement.style.zIndex = '10';
        const titleBar = windowElement.querySelector('.window-header');
        titleBar.style.backgroundColor = '#0078d7';
        
        // Update taskbar
        const taskbarItem = document.querySelector(`.taskbar-item[data-window-id="${windowElement.id}"]`);
        if (taskbarItem) {
            taskbarItem.classList.add('active');
        }
        
        activeWindow = windowElement;
    }
    
    function setupWindowControls(windowElement) {
        const closeBtn = windowElement.querySelector('.close');
        const minimizeBtn = windowElement.querySelector('.minimize');
        const maximizeBtn = windowElement.querySelector('.maximize');
        
        closeBtn.addEventListener('click', function() {
            // Remove from taskbar
            const taskbarItem = document.querySelector(`.taskbar-item[data-window-id="${windowElement.id}"]`);
            if (taskbarItem) {
                taskbarItem.remove();
            }
            
            // Remove window
            windowElement.remove();
            
            // Reset active window if this was active
            if (activeWindow === windowElement) {
                activeWindow = null;
            }
        });
        
        minimizeBtn.addEventListener('click', function() {
            windowElement.style.display = 'none';
            
            // Update taskbar
            const taskbarItem = document.querySelector(`.taskbar-item[data-window-id="${windowElement.id}"]`);
            if (taskbarItem) {
                taskbarItem.classList.remove('active');
            }
            
            if (activeWindow === windowElement) {
                activeWindow = null;
            }
        });
        
        let isMaximized = false;
        let beforeMaximize = {
            width: '',
            height: '',
            left: '',
            top: ''
        };
        
        maximizeBtn.addEventListener('click', function() {
            if (!isMaximized) {
                // Save current dimensions
                beforeMaximize = {
                    width: windowElement.style.width,
                    height: windowElement.style.height,
                    left: windowElement.style.left,
                    top: windowElement.style.top
                };
                
                // Maximize
                windowElement.style.width = 'calc(100vw - 4px)';
                windowElement.style.height = 'calc(100vh - 34px)';
                windowElement.style.left = '0';
                windowElement.style.top = '0';
                isMaximized = true;
            } else {
                // Restore
                windowElement.style.width = beforeMaximize.width;
                windowElement.style.height = beforeMaximize.height;
                windowElement.style.left = beforeMaximize.left;
                windowElement.style.top = beforeMaximize.top;
                isMaximized = false;
            }
        });
        
        // Make window active when clicked
        windowElement.addEventListener('mousedown', function() {
            makeWindowActive(windowElement);
        });
        
        makeWindowResizable(windowElement);
    }
    
    function makeWindowResizable(windowElement) {
        const resizeHandles = ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'];
        
        // Create resize handles
        resizeHandles.forEach(direction => {
            const handle = document.createElement('div');
            handle.className = `resize-handle resize-${direction}`;
            windowElement.appendChild(handle);
        });
        
        // Resize logic
        let isResizing = false;
        let resizeDirection = '';
        let startX, startY, startWidth, startHeight, startLeft, startTop;
        
        // Mouse down on resize handle
        windowElement.querySelectorAll('.resize-handle').forEach(handle => {
            handle.addEventListener('mousedown', function(e) {
                e.stopPropagation();
                isResizing = true;
                resizeDirection = this.className.split('resize-')[1];
                
                // Get starting dimensions
                startX = e.clientX;
                startY = e.clientY;
                startWidth = parseInt(getComputedStyle(windowElement).width, 10);
                startHeight = parseInt(getComputedStyle(windowElement).height, 10);
                startLeft = parseInt(getComputedStyle(windowElement).left, 10);
                startTop = parseInt(getComputedStyle(windowElement).top, 10);
                
                // Make window active
                makeWindowActive(windowElement);
                
                document.addEventListener('mousemove', resizeMouseMove);
                document.addEventListener('mouseup', resizeMouseUp);
            });
        });
        
        // Mouse move during resize
        function resizeMouseMove(e) {
            if (!isResizing) return;
            
            let newWidth = startWidth;
            let newHeight = startHeight;
            let newLeft = startLeft;
            let newTop = startTop;
            
            // Calculate new dimensions based on direction
            if (resizeDirection.includes('e')) {
                newWidth = startWidth + (e.clientX - startX);
            }
            if (resizeDirection.includes('s')) {
                newHeight = startHeight + (e.clientY - startY);
            }
            if (resizeDirection.includes('w')) {
                newWidth = startWidth - (e.clientX - startX);
                newLeft = startLeft + (e.clientX - startX);
            }
            if (resizeDirection.includes('n')) {
                newHeight = startHeight - (e.clientY - startY);
                newTop = startTop + (e.clientY - startY);
            }
            
            // Apply minimum size constraints
            if (newWidth < 200) {
                if (resizeDirection.includes('w')) {
                    newLeft = startLeft + startWidth - 200;
                }
                newWidth = 200;
            }
            
            if (newHeight < 150) {
                if (resizeDirection.includes('n')) {
                    newTop = startTop + startHeight - 150;
                }
                newHeight = 150;
            }
            
            // Apply new dimensions
            windowElement.style.width = `${newWidth}px`;
            windowElement.style.height = `${newHeight}px`;
            windowElement.style.left = `${newLeft}px`;
            windowElement.style.top = `${newTop}px`;
        }
        
        // Mouse up after resize
        function resizeMouseUp() {
            isResizing = false;
            document.removeEventListener('mousemove', resizeMouseMove);
            document.removeEventListener('mouseup', resizeMouseUp);
        }
    }
    
    function makeWindowDraggable(windowElement) {
        const header = windowElement.querySelector('.window-header');
        let isDragging = false;
        let offsetX, offsetY;
        
        header.addEventListener('mousedown', (e) => {
            // Only initiate drag if it's not a button click
            if (!e.target.closest('button')) {
                isDragging = true;
                offsetX = e.clientX - windowElement.getBoundingClientRect().left;
                offsetY = e.clientY - windowElement.getBoundingClientRect().top;
            }
        });
        
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                windowElement.style.left = (e.clientX - offsetX) + 'px';
                windowElement.style.top = (e.clientY - offsetY) + 'px';
            }
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }
    
    // Start Menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            if (text === 'Shut Down') {
                alert('Windows would now shut down');
            } else {
                createWindow(text);
            }
            startMenu.style.display = 'none';
        });
    });
    
    // Initialize Clippy
    const clippy = document.getElementById('clippy-container');
    const clippyBubble = document.getElementById('clippy-bubble');
    const clippyText = document.getElementById('clippy-text');
    const clippyClose = document.getElementById('clippy-close');
    
    // Show Clippy after a delay
    setTimeout(() => {
        clippy.style.display = 'block';
        setTimeout(() => {
            clippyBubble.style.display = 'block';
        }, 1000);
    }, 5000);
    
    // Clippy responses
    const clippyResponses = [
        "It looks like you're trying to use Windows. Would you like some help?",
        "Need help opening a program?",
        "Would you like to know keyboard shortcuts?",
        "Having trouble with something? I'm here to help!",
        "Did you know you can double-click icons to open them?",
        "Try clicking the Start button to see more options!",
        "Need help finding your files?",
        "Would you like me to show you how to use the calculator?",
        "Want me to help you write a letter in Notepad?"
    ];
    
    // Clippy interactions
    clippy.addEventListener('click', () => {
        if (clippyBubble.style.display === 'none') {
            clippyBubble.style.display = 'block';
            clippyText.textContent = clippyResponses[Math.floor(Math.random() * clippyResponses.length)];
        } else {
            showClippyChat();
        }
    });
    
    clippyClose.addEventListener('click', (e) => {
        e.stopPropagation();
        clippyBubble.style.display = 'none';
        if (document.getElementById('clippy-chat-container')) {
            document.getElementById('clippy-chat-container').remove();
        }
    });
    
    // Function to show Clippy chat interface
    function showClippyChat() {
        // Remove existing chat if any
        if (document.getElementById('clippy-chat-container')) {
            document.getElementById('clippy-chat-container').remove();
            return;
        }
        
        // Create chat container
        const chatContainer = document.createElement('div');
        chatContainer.id = 'clippy-chat-container';
        chatContainer.style.position = 'absolute';
        chatContainer.style.bottom = '120px';
        chatContainer.style.right = '0';
        chatContainer.style.width = '300px';
        chatContainer.style.height = '250px';
        chatContainer.style.backgroundColor = 'white';
        chatContainer.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
        chatContainer.style.borderRadius = '8px 8px 0 0';
        chatContainer.style.display = 'flex';
        chatContainer.style.flexDirection = 'column';
        chatContainer.style.zIndex = '100';
        
        // Create chat history
        const chatHistory = document.createElement('div');
        chatHistory.style.flexGrow = '1';
        chatHistory.style.overflowY = 'auto';
        chatHistory.style.marginBottom = '10px';
        chatHistory.style.padding = '5px';
        chatHistory.style.border = '1px solid #ddd';
        chatHistory.style.borderRadius = '4px';
        
        // Add initial Clippy message
        const clippyMessage = document.createElement('div');
        clippyMessage.style.marginBottom = '10px';
        clippyMessage.innerHTML = '<strong>Clippy:</strong> Hi there! How can I help you today?';
        chatHistory.appendChild(clippyMessage);
        
        // Create input area
        const inputContainer = document.createElement('div');
        inputContainer.style.display = 'flex';
        
        const chatInput = document.createElement('input');
        chatInput.type = 'text';
        chatInput.placeholder = 'Type your message to Clippy...';
        chatInput.style.flexGrow = '1';
        chatInput.style.padding = '5px';
        chatInput.style.marginRight = '5px';
        
        const sendButton = document.createElement('button');
        sendButton.textContent = 'Send';
        sendButton.style.background = '#0078d7';
        sendButton.style.color = 'white';
        sendButton.style.border = 'none';
        sendButton.style.padding = '5px 10px';
        sendButton.style.borderRadius = '4px';
        sendButton.style.cursor = 'pointer';
        
        inputContainer.appendChild(chatInput);
        inputContainer.appendChild(sendButton);
        
        // Add elements to container
        chatContainer.appendChild(chatHistory);
        chatContainer.appendChild(inputContainer);
        
        // Add container to Clippy
        clippy.appendChild(chatContainer);
        
        // Focus input
        chatInput.focus();
        
        // Clippy responses for chat
        const clippyChatResponses = {
            "hello": "Hello! How can I assist you today?",
            "hi": "Hi there! Need some help with Windows?",
            "help": "I can help with many things! Try asking about programs, files, or Windows features.",
            "who are you": "I'm Clippy, your helpful Office Assistant! I'm here to make computing easier.",
            "thanks": "You're welcome! Let me know if you need anything else.",
            "thank you": "Happy to help! Is there anything else you'd like to know?",
            "bye": "Goodbye! Click me again if you need help later.",
            "how are you": "I'm functioning perfectly! How are you doing today?",
            "what can you do": "I can provide tips about Windows, help you find files, suggest keyboard shortcuts, and much more!",
            "internet explorer": "Would you like me to open Internet Explorer for you? It's a great way to browse the web!",
            "notepad": "Need help with Notepad? It's perfect for taking notes or writing simple documents.",
            "calculator": "The Calculator app can help you with basic and scientific calculations. Would you like to open it?",
            "windows": "Windows is the operating system you're using right now! It helps you interact with your computer."
        };
        
        // Function to get Clippy's response
        function getClippyResponse(message) {
            message = message.toLowerCase();
            
            // Check for exact matches
            if (clippyChatResponses[message]) {
                return clippyChatResponses[message];
            }
            
            // Check for partial matches
            for (const key in clippyChatResponses) {
                if (message.includes(key)) {
                    return clippyChatResponses[key];
                }
            }
            
            // Default responses
            const defaults = [
                "That's interesting! Can you tell me more about what you're trying to do?",
                "I'm not sure I understand. Could you try rephrasing that?",
                "Would you like me to help you find something in Windows?",
                "I'm here to help! Try asking me about specific Windows features.",
                "It looks like you're trying to express yourself. How can I assist you with Windows?"
            ];
            
            return defaults[Math.floor(Math.random() * defaults.length)];
        }
        
        // Handle sending messages
        function sendMessage() {
            const message = chatInput.value.trim();
            if (!message) return;
            
            // Add user message
            const userMessage = document.createElement('div');
            userMessage.style.marginBottom = '10px';
            userMessage.style.textAlign = 'right';
            userMessage.innerHTML = `<strong>You:</strong> ${message}`;
            chatHistory.appendChild(userMessage);
            
            // Clear input
            chatInput.value = '';
            
            // Get and display Clippy's response after a short delay
            setTimeout(() => {
                const response = getClippyResponse(message);
                const responseElement = document.createElement('div');
                responseElement.style.marginBottom = '10px';
                responseElement.innerHTML = `<strong>Clippy:</strong> ${response}`;
                chatHistory.appendChild(responseElement);
                
                // Scroll to bottom
                chatHistory.scrollTop = chatHistory.scrollHeight;
            }, 500);
            
            // Scroll to bottom
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }
        
        // Event listeners for chat
        sendButton.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
    
    // Show random Clippy messages periodically
    setInterval(() => {
        if (Math.random() < 0.3 && clippyBubble.style.display === 'none') {
            clippy.click();
            
            // Auto-hide after a while
            setTimeout(() => {
                clippyBubble.style.display = 'none';
            }, 8000);
        }
    }, 30000);
    
    // Make Clippy draggable
    let isDraggingClippy = false;
    let clippyOffsetX, clippyOffsetY;
    
    clippy.addEventListener('mousedown', (e) => {
        isDraggingClippy = true;
        clippyOffsetX = e.clientX - clippy.getBoundingClientRect().left;
        clippyOffsetY = e.clientY - clippy.getBoundingClientRect().top;
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDraggingClippy) {
            clippy.style.bottom = 'auto';
            clippy.style.right = 'auto';
            clippy.style.left = (e.clientX - clippyOffsetX) + 'px';
            clippy.style.top = (e.clientY - clippyOffsetY) + 'px';
        }
    });
    
    document.addEventListener('mouseup', () => {
        isDraggingClippy = false;
    });
});