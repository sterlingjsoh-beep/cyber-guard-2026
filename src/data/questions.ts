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
    theme: "Phishing email classique",
    scenario: "Vous recevez un e-mail de « service-client@amaz0n-secure.com » vous demandant de confirmer votre identité suite à une activité suspecte. Le lien mène à « amaz0n-secure.com/verify ».",
    mockup: "📧 De : service-client@amaz0n-secure.com\n📋 Objet : ⚠️ Activité suspecte détectée\n\nCher(e) client(e),\nNous avons détecté une connexion inhabituelle. Veuillez confirmer votre identité immédiatement :\n👉 https://amaz0n-secure.com/verify\n\nCordialement, L'équipe Amazon",
    question: "Que faites-vous face à cet e-mail ?",
    choices: [
      "Je clique sur le lien pour vérifier mon compte",
      "Je signale l'e-mail comme phishing et je le supprime",
      "Je réponds pour demander plus d'informations",
      "Je transfère l'e-mail à mes collègues pour avis"
    ],
    correctIndex: 1,
    explanationCorrect: "Excellent ! Le domaine « amaz0n-secure.com » est un faux (notez le zéro à la place du 'o'). Ne jamais cliquer sur un lien suspect.",
    explanationWrong: "Le domaine « amaz0n-secure.com » utilise un zéro à la place du 'o' — c'est un classique du typosquatting. Amazon ne vous demandera jamais vos identifiants par e-mail.",
    advice: "Vérifiez toujours l'adresse de l'expéditeur et ne cliquez jamais sur un lien dans un e-mail non sollicité. Accédez au site directement via votre navigateur."
  },
  {
    id: 2,
    theme: "Smishing bancaire",
    scenario: "Vous recevez un SMS : « ALERTE BNP : Transaction de 1 847€ détectée. Si ce n'est pas vous, bloquez immédiatement : https://bnp-alert.xyz/block »",
    mockup: "📱 SMS de : +33 6 12 XX XX XX\n\n🚨 ALERTE BNP PARIBAS\nTransaction suspecte de 1 847,00€\nSi ce n'est pas vous :\n👉 https://bnp-alert.xyz/block\nRépondez STOP pour annuler",
    question: "Ce SMS est-il légitime ?",
    choices: [
      "Oui, BNP envoie souvent ce type d'alerte",
      "Non, c'est du smishing — le lien est frauduleux",
      "Je clique pour bloquer la transaction par précaution",
      "Je rappelle le numéro pour vérifier"
    ],
    correctIndex: 1,
    explanationCorrect: "Bravo ! Le domaine « bnp-alert.xyz » n'est pas un domaine BNP officiel. Les banques n'envoient jamais de lien de « blocage » par SMS.",
    explanationWrong: "Le domaine .xyz n'appartient pas à BNP Paribas. Les vraies alertes bancaires vous dirigent vers votre application officielle, jamais vers un lien externe.",
    advice: "En cas de doute sur une transaction, connectez-vous directement à votre application bancaire officielle ou appelez le numéro au dos de votre carte."
  },
  {
    id: 3,
    theme: "Faux support Microsoft",
    scenario: "Un pop-up s'affiche sur votre navigateur : « ALERTE SÉCURITÉ MICROSOFT — Votre ordinateur est infecté ! Appelez immédiatement le 01 89 XX XX XX pour assistance technique. Ne fermez pas cette fenêtre. »",
    mockup: "🖥️ ╔══════════════════════════════╗\n   ║  ⚠️ ALERTE SÉCURITÉ MICROSOFT  ║\n   ║                                  ║\n   ║  Votre PC est INFECTÉ !          ║\n   ║  Trojan détecté : Win32.Malware  ║\n   ║                                  ║\n   ║  ☎️ Appelez : 01 89 XX XX XX     ║\n   ║  NE FERMEZ PAS CETTE FENÊTRE     ║\n   ╚══════════════════════════════╝",
    question: "Quelle est la bonne réaction ?",
    choices: [
      "J'appelle le numéro indiqué pour résoudre le problème",
      "Je télécharge l'antivirus proposé sur la page",
      "Je ferme la fenêtre/onglet et je lance un vrai scan antivirus",
      "Je donne mon accès à distance pour un diagnostic"
    ],
    correctIndex: 2,
    explanationCorrect: "Parfait ! Microsoft ne vous contactera jamais via un pop-up de navigateur. Fermez simplement l'onglet.",
    explanationWrong: "Microsoft n'affiche jamais d'alertes dans votre navigateur avec un numéro de téléphone. C'est une arnaque au faux support technique très répandue.",
    advice: "Ne jamais appeler un numéro affiché dans un pop-up. Fermez l'onglet (Ctrl+W), videz le cache et lancez votre antivirus légitime."
  },
  {
    id: 4,
    theme: "Arnaque crypto/airdrop",
    scenario: "Vous recevez un DM sur Twitter/X : « 🎉 Félicitations ! Vous avez été sélectionné pour recevoir 0.5 ETH gratuit dans notre airdrop exclusif. Connectez votre wallet ici : https://eth-airdrop-2026.io »",
    mockup: "🐦 DM de @CryptoAirdrop2026 ✓\n\n🎉 CONGRATULATIONS!\nYou've been selected for our exclusive ETH airdrop!\n\n💰 Reward: 0.5 ETH (~900€)\n\n👉 Connect wallet: https://eth-airdrop-2026.io\n⏰ Expires in 24h!\n\n#Ethereum #Airdrop #Web3",
    question: "Que faites-vous ?",
    choices: [
      "Je connecte mon wallet pour recevoir les ETH gratuits",
      "Je partage le lien pour que mes amis en profitent aussi",
      "J'ignore et je signale le compte — c'est une arnaque",
      "Je crée un nouveau wallet pour tester sans risque"
    ],
    correctIndex: 2,
    explanationCorrect: "Bien vu ! Les vrais airdrops ne vous contactent jamais par DM. Connecter votre wallet à un site malveillant peut vider tous vos fonds.",
    explanationWrong: "Les airdrops légitimes ne sont jamais distribués par DM. Si vous connectez votre wallet, un smart contract malveillant peut drainer tous vos actifs.",
    advice: "Ne connectez jamais votre wallet à un site inconnu. Les vrais projets crypto annoncent les airdrops sur leurs canaux officiels vérifiés."
  },
  {
    id: 5,
    theme: "Deepfake vocal (vishing)",
    scenario: "Vous recevez un appel WhatsApp. La voix de votre directeur (que vous reconnaissez) vous demande en urgence de transférer 15 000€ sur un compte « pour finaliser un deal confidentiel ». Il insiste pour que vous n'en parliez à personne.",
    mockup: "📞 Appel WhatsApp entrant\n👤 \"DG - Marc Dupont\"\n\n🗣️ « Bonjour, c'est Marc. Écoute, j'ai\nbesoin que tu fasses un virement urgent\nde 15 000€. C'est confidentiel, n'en\nparle à personne. Je t'envoie le RIB\npar message. C'est très urgent. »\n\n⏱️ Durée : 00:47",
    question: "Comment réagissez-vous ?",
    choices: [
      "J'exécute le virement — c'est bien la voix du directeur",
      "Je raccroche et rappelle le directeur sur son numéro officiel pour vérifier",
      "Je demande plus de détails par retour de message WhatsApp",
      "J'envoie la moitié du montant en attendant confirmation"
    ],
    correctIndex: 1,
    explanationCorrect: "Excellent réflexe ! En 2026, les deepfakes vocaux sont quasi-indétectables. Toujours vérifier par un canal différent.",
    explanationWrong: "Les deepfakes audio générés par IA peuvent parfaitement imiter une voix connue. Toujours vérifier une demande financière urgente par un second canal.",
    advice: "Établissez un code secret avec vos supérieurs pour les demandes financières urgentes. Rappelez toujours sur le numéro officiel."
  },
  {
    id: 6,
    theme: "QR code malveillant",
    scenario: "Dans le parking de votre entreprise, vous trouvez un flyer : « Scannez ce QR code pour gagner une place VIP au concert de ce soir ! Offert par le CE. » Le QR code pointe vers un site inconnu.",
    mockup: "🎫 ╔═══════════════════════════╗\n   ║  🎵 CONCERT PRIVÉ 2026 🎵  ║\n   ║                              ║\n   ║     ██████████████████       ║\n   ║     ██  QR CODE  ████       ║\n   ║     ██████████████████       ║\n   ║                              ║\n   ║  Scannez pour votre          ║\n   ║  place VIP GRATUITE !        ║\n   ║  Offert par le CE            ║\n   ╚═══════════════════════════╝",
    question: "Que faites-vous ?",
    choices: [
      "Je scanne le QR code immédiatement — c'est le CE !",
      "Je scanne mais je vérifie l'URL avant de cliquer",
      "Je ne scanne pas et je vérifie auprès du CE si c'est légitime",
      "Je scanne sur mon téléphone personnel pour ne pas risquer celui du travail"
    ],
    correctIndex: 2,
    explanationCorrect: "Parfait ! Les QR codes peuvent rediriger vers des sites malveillants. Toujours vérifier la source avant de scanner.",
    explanationWrong: "Les QR codes dans des lieux publics sont un vecteur d'attaque courant en 2026. Ils peuvent installer des malwares ou voler vos identifiants.",
    advice: "Ne scannez jamais un QR code trouvé dans un lieu public sans vérification. Contactez directement l'émetteur supposé."
  },
  {
    id: 7,
    theme: "Fausse offre LinkedIn",
    scenario: "Un recruteur LinkedIn avec un profil bien rempli (500+ connexions) vous propose un poste à 120K€/an. Il vous demande de remplir un formulaire sur « careers-google-eu.com » avec vos infos personnelles et votre numéro de sécurité sociale.",
    mockup: "💼 LinkedIn Message\n👤 Sarah Martinez - Tech Recruiter @ Google\n📍 500+ connexions • Paris\n\n\"Bonjour ! Votre profil correspond parfaitement\nà un poste Senior Engineer chez Google.\nSalaire : 120K€ + stock options.\n\nMerci de compléter votre candidature ici :\n👉 https://careers-google-eu.com/apply\n\n(Pièce d'identité et n° SS requis)\"",
    question: "Quelle est la bonne attitude ?",
    choices: [
      "Je remplis le formulaire — c'est une opportunité incroyable",
      "Je refuse — un vrai recruteur Google ne demanderait jamais mon n° de SS à cette étape",
      "Je donne mes infos mais pas le n° de SS",
      "Je vérifie le profil LinkedIn et si les connexions sont réelles, j'y vais"
    ],
    correctIndex: 1,
    explanationCorrect: "Bravo ! Aucun recruteur légitime ne demande de n° de sécurité sociale lors d'un premier contact. Le domaine « careers-google-eu.com » n'est pas un domaine Google.",
    explanationWrong: "Google utilise « careers.google.com » uniquement. Un faux domaine et une demande de données sensibles dès le premier contact sont des signaux d'alarme majeurs.",
    advice: "Vérifiez les offres sur le site officiel de l'entreprise. Ne donnez jamais de données personnelles sensibles avant un processus de recrutement formel."
  },
  {
    id: 8,
    theme: "MFA fatigue attack",
    scenario: "À 3h du matin, votre téléphone vous bombarde de notifications d'authentification à deux facteurs (MFA) : « Approuver la connexion ? » — vous en recevez 15 en 5 minutes.",
    mockup: "📱 Notifications (x15 en 5 min)\n\n🔐 Microsoft Authenticator\n\"Approuver la connexion ?\"\n📍 Connexion depuis : Lagos, Nigeria\n⏰ 03:12, 03:13, 03:14, 03:15...\n\n[Approuver]  [Refuser]\n\n🔐 Microsoft Authenticator\n\"Approuver la connexion ?\"\n📍 Connexion depuis : Lagos, Nigeria\n⏰ 03:16\n\n[Approuver]  [Refuser]",
    question: "Que faites-vous ?",
    choices: [
      "J'approuve pour arrêter les notifications — c'est peut-être un bug",
      "Je refuse toutes les demandes, change mon mot de passe et alerte la sécurité IT",
      "J'ignore et je me rendors — ça passera",
      "J'approuve une seule fois pour voir ce qui se passe"
    ],
    correctIndex: 1,
    explanationCorrect: "Parfait ! C'est une attaque par fatigue MFA. L'attaquant a votre mot de passe et espère que vous approuvez par fatigue ou agacement.",
    explanationWrong: "C'est une technique appelée 'MFA fatigue' ou 'MFA bombing'. L'attaquant possède déjà votre mot de passe et bombarde votre téléphone en espérant une approbation accidentelle.",
    advice: "Ne jamais approuver une demande MFA que vous n'avez pas initiée. Changez immédiatement votre mot de passe et contactez votre équipe sécurité."
  },
  {
    id: 9,
    theme: "Pop-up faux support technique",
    scenario: "En naviguant sur un site d'actualités, une page s'ouvre en plein écran : « Votre Windows est compromis — Erreur #DW6VB36. Vos données bancaires sont en danger. Appelez Microsoft : 09 72 XX XX XX »",
    mockup: "🖥️ [PLEIN ÉCRAN - IMPOSSIBLE À FERMER]\n\n🔴🔴🔴 ALERTE CRITIQUE 🔴🔴🔴\n\nWindows Defender - Alerte de sécurité\nErreur #DW6VB36\n\n⚠️ Vos données personnelles et bancaires\nsont EN DANGER !\n\n🔊 [Son d'alarme en boucle]\n\n☎️ Support Microsoft : 09 72 XX XX XX\n\n⚠️ NE REDÉMARREZ PAS VOTRE ORDINATEUR\nVos fichiers pourraient être SUPPRIMÉS",
    question: "Comment réagir correctement ?",
    choices: [
      "J'appelle le numéro — mes données bancaires sont en danger !",
      "Je ferme le navigateur avec Alt+F4 ou le gestionnaire de tâches",
      "Je suis les instructions et je ne redémarre pas",
      "Je donne mes infos bancaires pour les « sécuriser »"
    ],
    correctIndex: 1,
    explanationCorrect: "Parfait ! Utilisez Alt+F4, Ctrl+Alt+Suppr ou forcez la fermeture. Microsoft ne vous demandera jamais d'appeler un numéro via votre navigateur.",
    explanationWrong: "C'est une arnaque au faux support technique. Le pop-up est conçu pour vous paniquer. Forcez la fermeture du navigateur — vos données ne sont pas en danger.",
    advice: "Utilisez Ctrl+Alt+Suppr pour ouvrir le gestionnaire de tâches et fermer le navigateur. Lancez ensuite un vrai scan antivirus."
  },
  {
    id: 10,
    theme: "Arnaque IA (faux chatbot)",
    scenario: "Vous utilisez un site qui propose un « assistant IA gratuit ». Après quelques échanges, le chatbot vous dit : « Pour des réponses personnalisées, connectez-vous avec votre compte Google. » et affiche un formulaire de connexion.",
    mockup: "🤖 SuperAI Chat — Assistant Intelligent\n\n💬 Vous : \"Comment optimiser mon CV ?\"\n\n🤖 SuperAI : \"Je peux vous aider ! Pour des\nconseils personnalisés, connectez-vous :\"\n\n╔════════════════════════╗\n║   🔐 Connexion Google    ║\n║                          ║\n║ Email : [______________] ║\n║ Mdp :   [______________] ║\n║                          ║\n║    [ Se connecter ]      ║\n╚════════════════════════╝\n\n🔒 \"Vos données sont 100% sécurisées\"",
    question: "Est-ce sûr de se connecter ?",
    choices: [
      "Oui, c'est une connexion Google classique",
      "Non — un vrai site utiliserait OAuth/SSO Google, pas un formulaire qui demande le mot de passe",
      "Oui si le site est en HTTPS",
      "Je me connecte avec un ancien mot de passe par précaution"
    ],
    correctIndex: 1,
    explanationCorrect: "Excellent ! Un vrai « Se connecter avec Google » vous redirige vers accounts.google.com. Un formulaire qui demande votre mot de passe directement est toujours une arnaque.",
    explanationWrong: "Un site légitime utilisant Google Sign-In vous redirige vers la page officielle de Google (accounts.google.com). Un formulaire intégré qui demande votre mot de passe est du phishing pur.",
    advice: "Ne saisissez jamais vos identifiants Google sur un formulaire qui n'est pas sur accounts.google.com. Utilisez toujours les boutons OAuth officiels."
  }
];
