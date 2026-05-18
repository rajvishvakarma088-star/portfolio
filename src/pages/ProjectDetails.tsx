import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { config } from "../config";
import { FaGithub, FaChevronLeft, FaChevronRight, FaPlay, FaPause, FaPaperPlane } from "react-icons/fa6";
import { MdDone, MdDevices } from "react-icons/md";
import "./ProjectDetails.css";

// Prototypes definitions
interface Hotspot {
  top: string;
  left: string;
  width: string;
  height: string;
  target: string;
}

interface PrototypeScreen {
  title: string;
  description: string;
  image: string;
  hotspots: Hotspot[];
}

const GALLERY_FLOW: Record<string, PrototypeScreen> = {
  main_gallery: {
    title: "Main Gallery",
    description: "Browse local photos and videos categorized dynamically by recency.",
    image: "https://raw.githubusercontent.com/rajvishvakarma088-star/Photic-gallery-app/main/assets/gallery_main_screen.png",
    hotspots: [
      { top: "91%", left: "42%", width: "20%", height: "8%", target: "album_screen" }, // Albums Tab
      { top: "91%", left: "62%", width: "20%", height: "8%", target: "favorites_screen" }, // Favorites Tab
      { top: "18%", left: "5%", width: "42%", height: "16%", target: "photo_viewer" }, // First Image
      { top: "6%", left: "6%", width: "12%", height: "6%", target: "menu_screen" }, // Burger Menu
    ]
  },
  album_screen: {
    title: "Albums Overview",
    description: "Browse categorized folders with high-fidelity dynamic thumbnail cards.",
    image: "https://raw.githubusercontent.com/rajvishvakarma088-star/Photic-gallery-app/main/assets/album_screen.png",
    hotspots: [
      { top: "15%", left: "5%", width: "90%", height: "15%", target: "folder_detail" }, // Camera Album Folder
      { top: "91%", left: "22%", width: "20%", height: "8%", target: "main_gallery" }, // Gallery Tab
    ]
  },
  folder_detail: {
    title: "Folder Details Grid",
    description: "Inspect specific album contents with customizable grid columns.",
    image: "https://raw.githubusercontent.com/rajvishvakarma088-star/Photic-gallery-app/main/assets/folder_detail_screen.png",
    hotspots: [
      { top: "5%", left: "4%", width: "12%", height: "6%", target: "album_screen" }, // Back arrow
      { top: "15%", left: "5%", width: "42%", height: "16%", target: "photo_viewer" }, // First Image
    ]
  },
  favorites_screen: {
    title: "Favorites List",
    description: "Heart-marked media filtered out into a clean aesthetic collection.",
    image: "https://raw.githubusercontent.com/rajvishvakarma088-star/Photic-gallery-app/main/assets/favorites_screen.png",
    hotspots: [
      { top: "91%", left: "22%", width: "20%", height: "8%", target: "main_gallery" }, // Gallery Tab
    ]
  },
  photo_viewer: {
    title: "Immersive Photo Viewer",
    description: "Full-screen media view with rich action tools and zoom controls.",
    image: "https://raw.githubusercontent.com/rajvishvakarma088-star/Photic-gallery-app/main/assets/photo_viwer.png",
    hotspots: [
      { top: "5%", left: "4%", width: "12%", height: "6%", target: "main_gallery" }, // Back arrow
      { top: "89%", left: "75%", width: "18%", height: "8%", target: "photo_menu" }, // Three dots menu
      { top: "89%", left: "6%", width: "18%", height: "8%", target: "music_list" }, // Music list
    ]
  },
  photo_menu: {
    title: "Media Action Sheet Drawer",
    description: "Set wallpapers, rename files, share, or secure into the safe vault.",
    image: "https://raw.githubusercontent.com/rajvishvakarma088-star/Photic-gallery-app/main/assets/photo_viewer_menu.png",
    hotspots: [
      { top: "0%", left: "0%", width: "100%", height: "62%", target: "photo_viewer" }, // Tap outside to close
    ]
  },
  music_list: {
    title: "Music Library Scanner",
    description: "Scan local storage for audio files presented in a premium list view.",
    image: "https://raw.githubusercontent.com/rajvishvakarma088-star/Photic-gallery-app/main/assets/music_list_screen.png",
    hotspots: [
      { top: "5%", left: "4%", width: "12%", height: "6%", target: "main_gallery" }, // Back arrow
      { top: "86%", left: "4%", width: "92%", height: "10%", target: "music_player" }, // Play miniplayer
    ]
  },
  music_player: {
    title: "Music Player Console",
    description: "Visualizers, album arts, active scrub sliders, and playback controls.",
    image: "https://raw.githubusercontent.com/rajvishvakarma088-star/Photic-gallery-app/main/assets/music_screen.png",
    hotspots: [
      { top: "5%", left: "4%", width: "12%", height: "6%", target: "music_list" }, // Collapse arrow
    ]
  },
  menu_screen: {
    title: "Side Menu Drawer",
    description: "Slide-out drawer providing pathways to recycle bin, settings, and lock setups.",
    image: "https://raw.githubusercontent.com/rajvishvakarma088-star/Photic-gallery-app/main/assets/menu_screen_main.png",
    hotspots: [
      { top: "35%", left: "5%", width: "65%", height: "5%", target: "recycle_bin" }, // Recycle Bin Menu
      { top: "55%", left: "5%", width: "65%", height: "5%", target: "dark_settings" }, // Settings Menu
      { top: "0%", left: "75%", width: "25%", height: "100%", target: "main_gallery" }, // Close drawer
    ]
  },
  recycle_bin: {
    title: "Recycle Bin holding",
    description: "Review soft-deleted photos and restore items seamlessly back to grids.",
    image: "https://raw.githubusercontent.com/rajvishvakarma088-star/Photic-gallery-app/main/assets/recycle_bin_screen.png",
    hotspots: [
      { top: "5%", left: "4%", width: "12%", height: "6%", target: "main_gallery" }, // Back arrow
    ]
  },
  dark_settings: {
    title: "App Settings Panel",
    description: "Configure AMOLED layouts, accent color schemes, and fast scrolling.",
    image: "https://raw.githubusercontent.com/rajvishvakarma088-star/Photic-gallery-app/main/assets/dark_setting.png",
    hotspots: [
      { top: "5%", left: "4%", width: "12%", height: "6%", target: "main_gallery" }, // Back arrow
      { top: "25%", left: "8%", width: "84%", height: "8%", target: "dark_gallery" }, // AMOLED switch
    ]
  },
  dark_gallery: {
    title: "AMOLED Dark Mode Grid",
    description: "Sleek pitch-black grid layout, deeply matching OLED hardware panels.",
    image: "https://raw.githubusercontent.com/rajvishvakarma088-star/Photic-gallery-app/main/assets/dark_gallery_screen.png",
    hotspots: [
      { top: "6%", left: "6%", width: "12%", height: "6%", target: "menu_screen" }, // Burger Menu
    ]
  }
};

const DEALZY_FLOW: Record<string, PrototypeScreen> = {
  welcome: {
    title: "App Welcome Surface",
    description: "Clean modern welcome presentation designed to introduce visit logs.",
    image: "https://raw.githubusercontent.com/rajvishvakarma088-star/Dealzy/main/screenshots/welcome_screen.jpeg",
    hotspots: [
      { top: "79%", left: "8%", width: "84%", height: "8%", target: "login" }, // Get Started Button
    ]
  },
  login: {
    title: "Secure Login Panel",
    description: "Elegantly styled credentials form hooked straight to Firebase Authentication.",
    image: "https://raw.githubusercontent.com/rajvishvakarma088-star/Dealzy/main/screenshots/loginScreen.jpeg",
    hotspots: [
      { top: "53%", left: "8%", width: "84%", height: "8%", target: "dashboard" }, // Login Button
      { top: "89%", left: "8%", width: "84%", height: "5%", target: "signup" }, // Sign Up link
    ]
  },
  signup: {
    title: "Create Account Panel",
    description: "Register dynamic accounts and automatically initialize custom sync engines.",
    image: "https://raw.githubusercontent.com/rajvishvakarma088-star/Dealzy/main/screenshots/signupScreen.jpeg",
    hotspots: [
      { top: "63%", left: "8%", width: "84%", height: "8%", target: "dashboard" }, // Signup Button
      { top: "91%", left: "8%", width: "84%", height: "5%", target: "login" }, // Login Link
    ]
  },
  dashboard: {
    title: "Sales Visit Logs Dashboard",
    description: "Track sales logs marked as draft or synced, with bulk filters.",
    image: "https://raw.githubusercontent.com/rajvishvakarma088-star/Dealzy/main/screenshots/homeScreen.jpeg",
    hotspots: [
      { top: "86%", left: "74%", width: "18%", height: "8%", target: "add_visit" }, // FAB "+" Button
      { top: "25%", left: "4%", width: "92%", height: "12%", target: "visit_details" }, // First Log Item
      { top: "7%", left: "78%", width: "15%", height: "6%", target: "profile" }, // Profile Avatar
      { top: "91%", left: "38%", width: "24%", height: "8%", target: "insights" }, // Graph tab
    ]
  },
  add_visit: {
    title: "Log Sales Visit Form",
    description: "Input fields detailing customer meetings, synced offline via AsyncStorage.",
    image: "https://raw.githubusercontent.com/rajvishvakarma088-star/Dealzy/main/screenshots/add_sales_visit_screen.jpeg",
    hotspots: [
      { top: "88%", left: "8%", width: "84%", height: "8%", target: "dashboard" }, // Save button
      { top: "5%", left: "4%", width: "12%", height: "6%", target: "dashboard" }, // Back arrow
    ]
  },
  visit_details: {
    title: "Log Details Summary",
    description: "AI-generated client indicators, synced indicators, and quick tools.",
    image: "https://raw.githubusercontent.com/rajvishvakarma088-star/Dealzy/main/screenshots/visitDetailsScreen.jpeg",
    hotspots: [
      { top: "5%", left: "4%", width: "12%", height: "6%", target: "dashboard" }, // Back arrow
      { top: "5%", left: "80%", width: "15%", height: "6%", target: "edit_visit" }, // Edit icon
    ]
  },
  edit_visit: {
    title: "Modify Visit Log Form",
    description: "Tweak meeting details and queue them for automated background sync.",
    image: "https://raw.githubusercontent.com/rajvishvakarma088-star/Dealzy/main/screenshots/editVisit.jpeg",
    hotspots: [
      { top: "89%", left: "8%", width: "84%", height: "8%", target: "visit_details" }, // Save edits
      { top: "5%", left: "4%", width: "12%", height: "6%", target: "visit_details" }, // Back arrow
    ]
  },
  insights: {
    title: "AI Meeting Analytics",
    description: "Summary charts detailing customer interest levels powered by LLaMA 3.1.",
    image: "https://raw.githubusercontent.com/rajvishvakarma088-star/Dealzy/main/screenshots/salesInsights.jpeg",
    hotspots: [
      { top: "5%", left: "4%", width: "12%", height: "6%", target: "dashboard" }, // Back arrow
    ]
  },
  profile: {
    title: "Member Profile Settings",
    description: "Configure dark modes, sync stats, and authentication details.",
    image: "https://raw.githubusercontent.com/rajvishvakarma088-star/Dealzy/main/screenshots/profileScreen.jpeg",
    hotspots: [
      { top: "5%", left: "4%", width: "12%", height: "6%", target: "dashboard" }, // Back arrow
      { top: "35%", left: "8%", width: "84%", height: "8%", target: "dark_mode" }, // Dark Mode toggle
    ]
  },
  dark_mode: {
    title: "AMOLED Dark Mode Dashboard",
    description: "AMOLED dashboard mode, comfortable during night audits.",
    image: "https://raw.githubusercontent.com/rajvishvakarma088-star/Dealzy/main/screenshots/dark_mode_on_screen.jpeg",
    hotspots: [
      { top: "5%", left: "4%", width: "12%", height: "6%", target: "profile" }, // Back arrow
    ]
  }
};

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = parseInt(id || "1");
  const project = config.projects.find((p) => p.id === projectId);

  // Setup dynamic flow variables
  const isGallery = projectId === 2;
  const isDealzy = projectId === 3;
  const isChatRoom = projectId === 1;

  const flow = isGallery ? GALLERY_FLOW : isDealzy ? DEALZY_FLOW : null;
  const flowKeys = flow ? Object.keys(flow) : [];

  const [currentKey, setCurrentKey] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);

  // Live Chat Simulator state (Project 1)
  const [chatUser, setChatUser] = useState<string>("");
  const [chatInput, setChatInput] = useState<string>("");
  const [hasJoined, setHasJoined] = useState<boolean>(false);
  const [activeRoom, setActiveRoom] = useState<string>("#general-devs");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<{ sender: string; text: string; isUser: boolean }>>([
    { sender: "System", text: "Welcome to Firestore Simulated Channel!", isUser: false },
    { sender: "Antigravity Bot", text: "Hey there! Try sending a message below to test the instant Kotlin & Firestore sync simulator!", isUser: false }
  ]);

  // Set default flow keys
  useEffect(() => {
    if (isGallery) {
      setCurrentKey("main_gallery");
    } else if (isDealzy) {
      setCurrentKey("welcome");
    }
  }, [projectId]);

  // Auto-play preview carousel
  useEffect(() => {
    let interval: any;
    if (isPlaying && flowKeys.length > 0) {
      interval = setInterval(() => {
        setCurrentKey((prev) => {
          const currentIndex = flowKeys.indexOf(prev);
          const nextIndex = (currentIndex + 1) % flowKeys.length;
          return flowKeys[nextIndex];
        });
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, flowKeys]);

  if (!project) {
    return (
      <div className="project-not-found">
        <h2>Project not found</h2>
        <Link to="/myworks">Back to Works</Link>
      </div>
    );
  }

  // Next and Back navigation helpers
  const handleNext = () => {
    if (!flowKeys.length) return;
    const currentIndex = flowKeys.indexOf(currentKey);
    const nextIndex = (currentIndex + 1) % flowKeys.length;
    setCurrentKey(flowKeys[nextIndex]);
  };

  const handleBack = () => {
    if (!flowKeys.length) return;
    const currentIndex = flowKeys.indexOf(currentKey);
    const prevIndex = (currentIndex - 1 + flowKeys.length) % flowKeys.length;
    setCurrentKey(flowKeys[prevIndex]);
  };

  // Chat simulator action
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setMessages((prev) => [...prev, { sender: chatUser || "Anonymous User", text: userMsg, isUser: true }]);
    setChatInput("");
    setIsTyping(true);

    // Bot Auto responses
    setTimeout(() => {
      setIsTyping(false);
      const botReplies = [
        `Sync complete! Sub-second Firestore upload verified for room ${activeRoom}.`,
        "This Kotlin and Jetpack Compose frontend is highly modular, separating state cleanly from UI rendering elements.",
        "Your offline log remains saved in SQLite/Room and auto-synchronizes as soon as a mock socket connection fires!",
        "Stunning performance! Thanks for trying the simulated Firestore app log, Raj!"
      ];
      const selectedReply = botReplies[Math.floor(Math.random() * botReplies.length)];
      setMessages((prev) => [...prev, { sender: "Antigravity Bot", text: selectedReply, isUser: false }]);
    }, 1200);
  };

  const currentScreen = flow && currentKey ? flow[currentKey] : null;

  return (
    <div className="project-details-page">
      {/* Background radial highlights */}
      <div className="details-bg-glow glow-1"></div>
      <div className="details-bg-glow glow-2"></div>

      <header className="details-header">
        <Link to="/myworks" className="back-link" data-cursor="disable">
          <FaChevronLeft /> Back to Works
        </Link>
        <div className="project-number-badge">0{projectId}</div>
      </header>

      <main className="details-main-grid">
        {/* Left Column: UI Flow Map Directory (For gallery and dealzy) */}
        {!isChatRoom && flow && (
          <section className="details-panel flow-panel">
            <h3 className="panel-title">Figma UI Flow Directory</h3>
            <p className="panel-desc">Click any screen in the directory or use the pulsing hotspots inside the iPhone mockup to navigate the flow.</p>
            
            <div className="flow-list">
              {flowKeys.map((key) => {
                const screen = flow[key];
                const isActive = key === currentKey;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setCurrentKey(key);
                      setIsPlaying(false);
                    }}
                    className={`flow-list-item ${isActive ? "active" : ""}`}
                    data-cursor="disable"
                  >
                    <div className="flow-bullet"></div>
                    <div className="flow-item-content">
                      <h4>{screen.title}</h4>
                      {isActive && <p>{screen.description}</p>}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="prototype-toolbar">
              <button onClick={() => setIsPlaying(!isPlaying)} className={`toolbar-btn play-btn ${isPlaying ? "playing" : ""}`} data-cursor="disable">
                {isPlaying ? <><FaPause /> Pause Autoplay</> : <><FaPlay /> Autoplay Flow</>}
              </button>
              <button onClick={() => setShowHotspots(!showHotspots)} className={`toolbar-btn hotspot-toggle ${showHotspots ? "active" : ""}`} data-cursor="disable">
                <MdDevices /> {showHotspots ? "Hide Hotspots" : "Show Hotspots"}
              </button>
            </div>
          </section>
        )}

        {/* Project 1: Chat Room custom simulated sidebar directory */}
        {isChatRoom && (
          <section className="details-panel flow-panel">
            <h3 className="panel-title">Simulated Settings</h3>
            <p className="panel-desc">Configure the Kotlin/Jetpack Compose real-time chat application dashboard.</p>

            <div className="chat-join-form">
              {!hasJoined ? (
                <div className="join-panel">
                  <h4>Join Chat Network</h4>
                  <input
                    type="text"
                    placeholder="Enter your name..."
                    value={chatUser}
                    onChange={(e) => setChatUser(e.target.value)}
                    className="chat-username-input"
                  />
                  <button
                    onClick={() => {
                      if (chatUser.trim()) setHasJoined(true);
                    }}
                    className="join-btn"
                    data-cursor="disable"
                  >
                    Launch Simulator
                  </button>
                </div>
              ) : (
                <div className="active-network-panel">
                  <div className="network-status">
                    <span className="status-indicator online"></span>
                    <p>Connected as <strong>{chatUser}</strong></p>
                  </div>
                  
                  <h4>Select Channel Room</h4>
                  <div className="room-selector-list">
                    {["#general-devs", "#flutter-team", "#kotlin-compose", "#firebase-sync"].map((room) => (
                      <button
                        key={room}
                        onClick={() => {
                          setActiveRoom(room);
                          setMessages((prev) => [
                            ...prev,
                            { sender: "System", text: `Switched room to ${room}`, isUser: false }
                          ]);
                        }}
                        className={`room-select-btn ${activeRoom === room ? "active" : ""}`}
                        data-cursor="disable"
                      >
                        {room}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setHasJoined(false);
                      setChatUser("");
                    }}
                    className="disconnect-btn"
                    data-cursor="disable"
                  >
                    Disconnect Simulator
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Middle Column: The High-Fidelity iPhone Mockup */}
        <section className="iphone-column">
          <div className="iphone-mockup-wrapper">
            {/* Phone Container */}
            <div className="iphone-15-pro-frame">
              {/* Reflective steel border */}
              <div className="steel-border"></div>
              
              {/* Speaker notch */}
              <div className="speaker-grill"></div>

              {/* Dynamic Island Capsule */}
              <div className="dynamic-island">
                <span className="camera-lens"></span>
              </div>

              {/* Volume & Action Buttons */}
              <div className="side-button action-btn"></div>
              <div className="side-button vol-up"></div>
              <div className="side-button vol-down"></div>
              {/* Power Button */}
              <div className="side-button power-btn"></div>

              {/* Inside Mock Screen */}
              <div className="iphone-screen">
                
                {/* 1. Screenshots prototype flow viewer */}
                {!isChatRoom && currentScreen && (
                  <div className="prototype-viewer-screen">
                    <img src={currentScreen.image} alt={currentScreen.title} className="prototype-image" />
                    
                    {/* Floating Hotspots Overlay */}
                    {showHotspots && currentScreen.hotspots.map((hotspot, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setCurrentKey(hotspot.target);
                          setIsPlaying(false);
                        }}
                        className="hotspot-pulse-marker"
                        style={{
                          top: hotspot.top,
                          left: hotspot.left,
                          width: hotspot.width,
                          height: hotspot.height
                        }}
                        title={`Click to navigate to ${hotspot.target}`}
                        data-cursor="disable"
                      />
                    ))}
                  </div>
                )}

                {/* 2. Interactive Chat Room App Simulator inside iPhone */}
                {isChatRoom && (
                  <div className="live-chat-simulator">
                    {/* Simulated App Header */}
                    <div className="app-bar">
                      <div className="app-bar-info">
                        <span className="app-status"></span>
                        <div>
                          <h4>ChatRoom v1.0</h4>
                          <p>{activeRoom}</p>
                        </div>
                      </div>
                    </div>

                    {/* Simulated Screen Body */}
                    {!hasJoined ? (
                      <div className="app-welcome-view">
                        <div className="app-logo">💬</div>
                        <h3>Jetpack Compose Chat</h3>
                        <p>A simulated Android/Kotlin chat interface built directly into your browser.</p>
                        <div className="mock-input-wrap">
                          <input
                            type="text"
                            placeholder="Type a username..."
                            value={chatUser}
                            onChange={(e) => setChatUser(e.target.value)}
                          />
                          <button
                            onClick={() => {
                              if (chatUser.trim()) setHasJoined(true);
                            }}
                          >
                            Join
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="app-chat-view">
                        <div className="app-message-list">
                          {messages.map((msg, index) => (
                            <div key={index} className={`mock-msg-wrapper ${msg.isUser ? "user" : "bot"}`}>
                              <span className="msg-sender">{msg.sender}</span>
                              <div className="msg-bubble">{msg.text}</div>
                            </div>
                          ))}
                          
                          {isTyping && (
                            <div className="mock-msg-wrapper bot">
                              <span className="msg-sender">Antigravity Bot</span>
                              <div className="msg-bubble typing-bubble">
                                <span></span><span></span><span></span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Input toolbar */}
                        <div className="app-input-bar">
                          <input
                            type="text"
                            placeholder="Type message..."
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleSendMessage();
                            }}
                          />
                          <button onClick={handleSendMessage}>
                            <FaPaperPlane />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>

            {/* Figma-style quick arrows (Next & Back) under phone */}
            {!isChatRoom && (
              <div className="figma-arrow-controls">
                <button onClick={handleBack} className="control-arrow-btn" title="Previous Screen" data-cursor="disable">
                  <FaChevronLeft />
                </button>
                <div className="controls-page-indicator">
                  {flowKeys.indexOf(currentKey) + 1} / {flowKeys.length}
                </div>
                <button onClick={handleNext} className="control-arrow-btn" title="Next Screen" data-cursor="disable">
                  <FaChevronRight />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Right Column: Project Context Panel */}
        <section className="details-panel info-panel">
          <div className="info-header">
            <span className="project-category-tag">{project.category}</span>
            <h2>{project.title}</h2>
            <div className="info-divider"></div>
          </div>

          <p className="project-full-desc">{project.description}</p>

          <div className="project-feature-section">
            <h4>Core Architecture Stack</h4>
            <div className="tech-badge-wrap">
              {project.technologies.split(",").map((tech) => (
                <span key={tech.trim()} className="tech-pill-badge">{tech.trim()}</span>
              ))}
            </div>
          </div>

          <div className="project-utility-metrics">
            <h4>Product Sync Specifications</h4>
            <ul className="metrics-checklist">
              <li>
                <span className="bullet-wrap"><MdDone /></span>
                <p>Offline-First Caching utilizing Local storage.</p>
              </li>
              <li>
                <span className="bullet-wrap"><MdDone /></span>
                <p>Dynamic authentication gateways with auto-tokens.</p>
              </li>
              <li>
                <span className="bullet-wrap"><MdDone /></span>
                <p>Fully decoupled architecture patterns (MVVM).</p>
              </li>
            </ul>
          </div>

          <div className="project-action-card">
            <h4>Explore the Source Code</h4>
            <p>Read clean architectures, database managers, and UI components directly on GitHub.</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="github-explore-btn" data-cursor="disable">
              <span>View Repository</span>
              <FaGithub />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProjectDetails;
