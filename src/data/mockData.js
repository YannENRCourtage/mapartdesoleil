
export const users = [
  {
    id: 1,
    email: 'admin@mapartdesoleil.fr',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'Système',
    isAdmin: true,
    phone: '0123456789',
    address: '1 Rue de l\'Administration, 75001 Paris',
    joinDate: '2023-01-15',
    projects: [],
    consumption: {
      monthly: [],
      total: 0
    }
  },
  {
    id: 2,
    email: 'jean.dupont@email.fr',
    password: 'user123',
    firstName: 'Jean',
    lastName: 'Dupont',
    isAdmin: false,
    phone: '0612345678',
    address: '15 Avenue du Soleil, 69001 Lyon',
    joinDate: '2023-03-20',
    projects: ['1'],
    consumption: {
      monthly: [
        { month: 'Janvier', consumption: 450, production: 380, savings: 19 },
        { month: 'Février', consumption: 420, production: 360, savings: 18 },
        { month: 'Mars', consumption: 380, production: 420, savings: 21 },
        { month: 'Avril', consumption: 350, production: 480, savings: 24 },
        { month: 'Mai', consumption: 320, production: 520, savings: 26 },
        { month: 'Juin', consumption: 300, production: 550, savings: 27.5 }
      ],
      total: 2220
    }
  },
  {
    id: 3,
    email: 'marie.martin@email.fr',
    password: 'user123',
    firstName: 'Marie',
    lastName: 'Martin',
    isAdmin: false,
    phone: '0698765432',
    address: '8 Rue de la Lumière, 33000 Bordeaux',
    joinDate: '2023-05-10',
    projects: ['2'],
    consumption: {
      monthly: [
        { month: 'Janvier', consumption: 380, production: 320, savings: 16 },
        { month: 'Février', consumption: 360, production: 300, savings: 15 },
        { month: 'Mars', consumption: 340, production: 350, savings: 17.5 },
        { month: 'Avril', consumption: 310, production: 400, savings: 20 },
        { month: 'Mai', consumption: 290, production: 430, savings: 21.5 },
        { month: 'Juin', consumption: 270, production: 460, savings: 23 }
      ],
      total: 1950
    }
  }
];

export const applications = [
  {
    id: 1,
    userId: 2,
    projectId: '1',
    status: 'approved',
    submittedDate: '2023-03-20',
    approvedDate: '2023-03-25',
    documents: [
      { name: 'Pièce d\'identité', url: '#', uploaded: true },
      { name: 'Justificatif de domicile', url: '#', uploaded: true },
      { name: 'RIB', url: '#', uploaded: true }
    ],
    signature: {
      signed: true,
      signedDate: '2023-03-24',
      signatureData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
    }
  },
  {
    id: 2,
    userId: 3,
    projectId: '2',
    status: 'pending',
    submittedDate: '2023-05-10',
    documents: [
      { name: 'Pièce d\'identité', url: '#', uploaded: true },
      { name: 'Justificatif de domicile', url: '#', uploaded: true },
      { name: 'RIB', url: '#', uploaded: false }
    ],
    signature: {
      signed: false
    }
  },
  {
    id: 3,
    userId: 4,
    projectId: '1',
    status: 'rejected',
    submittedDate: '2023-04-15',
    rejectedDate: '2023-04-20',
    rejectionReason: 'Documents incomplets',
    documents: [
      { name: 'Pièce d\'identité', url: '#', uploaded: true },
      { name: 'Justificatif de domicile', url: '#', uploaded: false },
      { name: 'RIB', url: '#', uploaded: false }
    ],
    signature: {
      signed: false
    }
  }
];

export const mockNotifications = [
  {
    id: 1,
    userId: 2,
    title: 'Candidature approuvée',
    message: 'Votre candidature pour le projet "Centrale Solaire Lyon Sud" a été approuvée !',
    date: '2023-03-25',
    read: false,
    type: 'success'
  },
  {
    id: 2,
    userId: 2,
    title: 'Nouveau document disponible',
    message: 'Le contrat d\'adhésion est maintenant disponible dans votre espace documents.',
    date: '2023-03-26',
    read: false,
    type: 'info'
  },
  {
    id: 3,
    userId: 3,
    title: 'Documents manquants',
    message: 'Veuillez compléter votre dossier en téléchargeant votre RIB.',
    date: '2023-05-12',
    read: false,
    type: 'warning'
  }
];

export const mockDocuments = [
  { id: 1, name: 'Contrat d\'adhésion - Projet Lyon Sud', type: 'Contrat', date: '2023-03-26', size: '1.2 MB', status: 'Signé' },
  { id: 2, name: 'Facture - Avril 2023', type: 'Facture', date: '2023-05-01', size: '256 KB', status: 'Disponible' },
  { id: 3, name: 'Rapport de production - T1 2023', type: 'Rapport', date: '2023-04-15', size: '2.5 MB', status: 'Disponible' },
  { id: 4, name: 'Avenant au contrat - Projet Bordeaux Ouest', type: 'Contrat', date: '2023-06-05', size: '800 KB', status: 'En attente de signature' },
  { id: 5, name: 'Facture - Mai 2023', type: 'Facture', date: '2023-06-01', size: '260 KB', status: 'Disponible' },
];
