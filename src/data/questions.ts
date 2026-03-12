export interface QuizQuestion {
  id: number;
  theme: string;
  scenario: string;
  mockup: string;
  question: string;
  choices: string[];
  correctIndex: number;
  explanationCorrect: string;
  explanationWrong: string;
  advice: string;
}

export const questions: QuizQuestion[] = [
  {
    id: 1,
    theme: "Classic phishing email",
    scenario: "You receive an email from 'customer-service@amaz0n-secure.com' asking you to confirm your identity due to suspicious activity. The link leads to 'amaz0n-secure.com/verify'.",
    mockup: "📧 From: customer-service@amaz0n-secure.com\n📋 Subject: ⚠️ Suspicious activity detected\n\nDear customer,\nWe detected an unusual login on your account. Please confirm your identity immediately:\n👉 https://amaz0n-secure.com/verify\n\nBest regards, The Amazon Team",
    question: "What do you do with this email?",
    choices: [
      "I click the link to verify my account",
      "I report the email as phishing and delete it",
      "I reply to ask for more information",
      "I forward the email to my colleagues for their opinion"
    ],
    correctIndex: 1,
    explanationCorrect: "Excellent! The domain 'amaz0n-secure.com' is fake (notice the zero instead of the 'o'). Never click on a suspicious link.",
    explanationWrong: "The domain 'amaz0n-secure.com' uses a zero instead of the 'o' — this is a classic typosquatting attack. Amazon will never ask for your credentials by email.",
    advice: "Always check the sender's address and never click a link in an unsolicited email. Access the site directly through your browser."
  },
  {
    id: 2,
    theme: "Banking smishing",
    scenario: "You receive a text: 'ALERT Chase: Transaction of $1,847 detected. If this wasn't you, block immediately: https://chase-alert.xyz/block'",
    mockup: "📱 SMS from: +1 (555) 123-XXXX\n\n🚨 ALERT CHASE BANK\nSuspicious transaction of $1,847.00\nIf this wasn't you:\n👉 https://chase-alert.xyz/block\nReply STOP to cancel",
    question: "Is this text message legitimate?",
    choices: [
      "Yes, Chase often sends this type of alert",
      "No, it's smishing — the link is fraudulent",
      "I click to block the transaction just in case",
      "I call the number back to verify"
    ],
    correctIndex: 1,
    explanationCorrect: "Well done! The domain 'chase-alert.xyz' is not an official Chase domain. Banks never send 'block' links via text.",
    explanationWrong: "The .xyz domain does not belong to Chase Bank. Real bank alerts direct you to your official app, never to an external link.",
    advice: "If you're worried about a transaction, log in directly to your official banking app or call the number on the back of your card."
  },
  {
    id: 3,
    theme: "Fake Microsoft support",
    scenario: "A pop-up appears in your browser: 'MICROSOFT SECURITY ALERT — Your computer is infected! Call immediately: 1-800-XXX-XXXX for technical assistance. Do not close this window.'",
    mockup: "🖥️ ╔══════════════════════════════╗\n   ║  ⚠️ MICROSOFT SECURITY ALERT   ║\n   ║                                  ║\n   ║  Your PC is INFECTED!            ║\n   ║  Trojan detected: Win32.Malware  ║\n   ║                                  ║\n   ║  ☎️ Call: 1-800-XXX-XXXX         ║\n   ║  DO NOT CLOSE THIS WINDOW        ║\n   ╚══════════════════════════════╝",
    question: "What is the right reaction?",
    choices: [
      "I call the number to fix the problem",
      "I download the antivirus offered on the page",
      "I close the window/tab and run a real antivirus scan",
      "I grant remote access for a diagnosis"
    ],
    correctIndex: 2,
    explanationCorrect: "Perfect! Microsoft will never contact you through a browser pop-up. Simply close the tab.",
    explanationWrong: "Microsoft never displays alerts in your browser with a phone number. This is a very common tech support scam.",
    advice: "Never call a number displayed in a pop-up. Close the tab (Ctrl+W), clear the cache, and run your legitimate antivirus."
  },
  {
    id: 4,
    theme: "Crypto/airdrop scam",
    scenario: "You receive a DM on Twitter/X: '🎉 Congratulations! You've been selected to receive 0.5 ETH free in our exclusive airdrop. Connect your wallet here: https://eth-airdrop-2026.io'",
    mockup: "🐦 DM from @CryptoAirdrop2026 ✓\n\n🎉 CONGRATULATIONS!\nYou've been selected for our exclusive ETH airdrop!\n\n💰 Reward: 0.5 ETH (~$900)\n\n👉 Connect wallet: https://eth-airdrop-2026.io\n⏰ Expires in 24h!\n\n#Ethereum #Airdrop #Web3",
    question: "What do you do?",
    choices: [
      "I connect my wallet to receive the free ETH",
      "I share the link so my friends can benefit too",
      "I ignore it and report the account — it's a scam",
      "I create a new wallet to test it risk-free"
    ],
    correctIndex: 2,
    explanationCorrect: "Good catch! Real airdrops never contact you via DM. Connecting your wallet to a malicious site can drain all your funds.",
    explanationWrong: "Legitimate airdrops are never distributed via DMs. If you connect your wallet, a malicious smart contract can drain all your assets.",
    advice: "Never connect your wallet to an unknown site. Real crypto projects announce airdrops through their verified official channels."
  },
  {
    id: 5,
    theme: "Voice deepfake (vishing)",
    scenario: "You receive a WhatsApp call. Your CEO's voice (which you recognize) urgently asks you to transfer $15,000 to an account 'to finalize a confidential deal.' He insists you tell no one.",
    mockup: "📞 Incoming WhatsApp call\n👤 \"CEO - John Smith\"\n\n🗣️ \"Hi, it's John. Listen, I need you\nto make an urgent wire transfer of\n$15,000. It's confidential, don't\ntell anyone. I'll send you the account\ndetails by message. It's very urgent.\"\n\n⏱️ Duration: 00:47",
    question: "How do you react?",
    choices: [
      "I execute the transfer — it's clearly the CEO's voice",
      "I hang up and call the CEO back on their official number to verify",
      "I ask for more details by replying on WhatsApp",
      "I send half the amount while waiting for confirmation"
    ],
    correctIndex: 1,
    explanationCorrect: "Excellent reflex! In 2026, voice deepfakes are nearly undetectable. Always verify through a different channel.",
    explanationWrong: "AI-generated voice deepfakes can perfectly imitate a known voice. Always verify an urgent financial request through a second channel.",
    advice: "Establish a secret code word with your superiors for urgent financial requests. Always call back on the official number."
  },
  {
    id: 6,
    theme: "Malicious QR code",
    scenario: "In your company's parking lot, you find a flyer: 'Scan this QR code to win a VIP spot at tonight's concert! Courtesy of HR.' The QR code points to an unknown website.",
    mockup: "🎫 ╔═══════════════════════════╗\n   ║  🎵 PRIVATE CONCERT 2026 🎵 ║\n   ║                              ║\n   ║     ██████████████████       ║\n   ║     ██  QR CODE  ████       ║\n   ║     ██████████████████       ║\n   ║                              ║\n   ║  Scan for your FREE          ║\n   ║  VIP pass!                   ║\n   ║  Courtesy of HR              ║\n   ╚═══════════════════════════╝",
    question: "What do you do?",
    choices: [
      "I scan the QR code right away — it's from HR!",
      "I scan but check the URL before clicking",
      "I don't scan and verify with HR if it's legitimate",
      "I scan on my personal phone so I don't risk my work phone"
    ],
    correctIndex: 2,
    explanationCorrect: "Perfect! QR codes can redirect to malicious sites. Always verify the source before scanning.",
    explanationWrong: "QR codes in public places are a common attack vector in 2026. They can install malware or steal your credentials.",
    advice: "Never scan a QR code found in a public place without verification. Contact the supposed issuer directly."
  },
  {
    id: 7,
    theme: "Fake LinkedIn job offer",
    scenario: "A LinkedIn recruiter with a well-filled profile (500+ connections) offers you a position at $120K/year. They ask you to fill out a form on 'careers-google-eu.com' with your personal info and social security number.",
    mockup: "💼 LinkedIn Message\n👤 Sarah Martinez - Tech Recruiter @ Google\n📍 500+ connections • San Francisco\n\n\"Hi! Your profile is a perfect match\nfor a Senior Engineer role at Google.\nSalary: $120K + stock options.\n\nPlease complete your application here:\n👉 https://careers-google-eu.com/apply\n\n(Photo ID and SSN required)\"",
    question: "What is the right response?",
    choices: [
      "I fill out the form — it's an amazing opportunity",
      "I decline — a real Google recruiter would never ask for my SSN at this stage",
      "I share my info but not my SSN",
      "I check the LinkedIn profile and if the connections look real, I go for it"
    ],
    correctIndex: 1,
    explanationCorrect: "Well done! No legitimate recruiter asks for a social security number during a first contact. The domain 'careers-google-eu.com' is not a Google domain.",
    explanationWrong: "Google only uses 'careers.google.com'. A fake domain and a request for sensitive data at first contact are major red flags.",
    advice: "Verify job offers on the company's official website. Never share sensitive personal data before a formal recruitment process."
  },
  {
    id: 8,
    theme: "MFA fatigue attack",
    scenario: "At 3 AM, your phone is bombarded with two-factor authentication (MFA) notifications: 'Approve sign-in?' — you receive 15 in 5 minutes.",
    mockup: "📱 Notifications (x15 in 5 min)\n\n🔐 Microsoft Authenticator\n\"Approve sign-in?\"\n📍 Sign-in from: Lagos, Nigeria\n⏰ 03:12, 03:13, 03:14, 03:15...\n\n[Approve]  [Deny]\n\n🔐 Microsoft Authenticator\n\"Approve sign-in?\"\n📍 Sign-in from: Lagos, Nigeria\n⏰ 03:16\n\n[Approve]  [Deny]",
    question: "What do you do?",
    choices: [
      "I approve to stop the notifications — it's probably a bug",
      "I deny all requests, change my password, and alert IT security",
      "I ignore it and go back to sleep — it will stop",
      "I approve just once to see what happens"
    ],
    correctIndex: 1,
    explanationCorrect: "Perfect! This is an MFA fatigue attack. The attacker has your password and hopes you'll approve out of exhaustion or annoyance.",
    explanationWrong: "This technique is called 'MFA fatigue' or 'MFA bombing.' The attacker already has your password and bombards your phone hoping for an accidental approval.",
    advice: "Never approve an MFA request you didn't initiate. Change your password immediately and contact your security team."
  },
  {
    id: 9,
    theme: "Fake tech support pop-up",
    scenario: "While browsing a news site, a full-screen page opens: 'Your Windows is compromised — Error #DW6VB36. Your banking data is at risk. Call Microsoft: 1-888-XXX-XXXX'",
    mockup: "🖥️ [FULL SCREEN - UNABLE TO CLOSE]\n\n🔴🔴🔴 CRITICAL ALERT 🔴🔴🔴\n\nWindows Defender - Security Alert\nError #DW6VB36\n\n⚠️ Your personal and banking data\nis AT RISK!\n\n🔊 [Alarm sound looping]\n\n☎️ Microsoft Support: 1-888-XXX-XXXX\n\n⚠️ DO NOT RESTART YOUR COMPUTER\nYour files may be DELETED",
    question: "How do you react correctly?",
    choices: [
      "I call the number — my banking data is at risk!",
      "I close the browser with Alt+F4 or Task Manager",
      "I follow the instructions and don't restart",
      "I share my banking info to 'secure' them"
    ],
    correctIndex: 1,
    explanationCorrect: "Perfect! Use Alt+F4, Ctrl+Alt+Del or force-close. Microsoft will never ask you to call a number through your browser.",
    explanationWrong: "This is a tech support scam. The pop-up is designed to panic you. Force-close the browser — your data is not at risk.",
    advice: "Use Ctrl+Alt+Del to open Task Manager and close the browser. Then run a real antivirus scan."
  },
  {
    id: 10,
    theme: "AI scam (fake chatbot)",
    scenario: "You're using a site that offers a 'free AI assistant.' After a few exchanges, the chatbot says: 'For personalized answers, sign in with your Google account.' and shows a login form.",
    mockup: "🤖 SuperAI Chat — Smart Assistant\n\n💬 You: \"How can I optimize my resume?\"\n\n🤖 SuperAI: \"I can help! For personalized\nadvice, please sign in:\"\n\n╔════════════════════════╗\n║   🔐 Google Sign-In      ║\n║                          ║\n║ Email: [______________]  ║\n║ Pass:  [______________]  ║\n║                          ║\n║    [ Sign In ]           ║\n╚════════════════════════╝\n\n🔒 \"Your data is 100% secure\"",
    question: "Is it safe to sign in?",
    choices: [
      "Yes, it's a standard Google login",
      "No — a real site would use Google OAuth/SSO, not a form asking for your password",
      "Yes, as long as the site uses HTTPS",
      "I sign in with an old password just to be safe"
    ],
    correctIndex: 1,
    explanationCorrect: "Excellent! A real 'Sign in with Google' redirects you to accounts.google.com. A form asking for your password directly is always a scam.",
    explanationWrong: "A legitimate site using Google Sign-In redirects you to Google's official page (accounts.google.com). An embedded form asking for your password is pure phishing.",
    advice: "Never enter your Google credentials on a form that isn't on accounts.google.com. Always use official OAuth buttons."
  }
];
