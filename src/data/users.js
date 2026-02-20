export const generateUsers = (projects, userCount) => {
  const firstNames = [
    'Pierre', 'Marie', 'Jean', 'Sophie', 'Michel', 'Catherine', 'Philippe', 'Nathalie',
    'Alain', 'Isabelle', 'François', 'Sylvie', 'Daniel', 'Martine', 'Bernard', 'Christine',
    'Laurent', 'Françoise', 'Patrick', 'Monique', 'André', 'Nicole', 'Jacques', 'Brigitte',
    'Claude', 'Chantal', 'Gérard', 'Dominique', 'René', 'Jacqueline', 'Henri', 'Véronique',
    'Robert', 'Annie', 'Marcel', 'Denise', 'Louis', 'Michèle', 'Paul', 'Colette'
  ];

  const lastNames = [
    'Martin', 'Bernard', 'Thomas', 'Petit', 'Robert', 'Richard', 'Durand', 'Dubois',
    'Moreau', 'Laurent', 'Simon', 'Michel', 'Lefebvre', 'Leroy', 'Roux', 'David',
    'Bertrand', 'Morel', 'Fournier', 'Girard', 'Bonnet', 'Dupont', 'Lambert', 'Fontaine',
    'Rousseau', 'Vincent', 'Muller', 'Lefevre', 'Faure', 'Andre', 'Mercier', 'Blanc',
    'Guerin', 'Boyer', 'Garnier', 'Chevalier', 'Francois', 'Legrand', 'Gauthier', 'Garcia'
  ];

  const cities = [
    'Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Strasbourg',
    'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Saint-Étienne', 'Toulon', 'Le Havre', 'Grenoble',
    'Dijon', 'Angers', 'Nîmes', 'Villeurbanne', 'Clermont-Ferrand', 'Le Mans', 'Aix-en-Provence',
    'Brest', 'Tours', 'Amiens', 'Limoges', 'Annecy', 'Perpignan', 'Boulogne-Billancourt'
  ];

  const users = [];
  
  for (let i = 1; i <= userCount; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    
    const participatingProjects = [];
    const numProjects = Math.floor(Math.random() * 4) + 1;
    
    for (let j = 0; j < numProjects; j++) {
      const randomProject = projects[Math.floor(Math.random() * projects.length)];
      if (!participatingProjects.find(p => p.projectId === randomProject.id)) {
        participatingProjects.push({
          projectId: randomProject.id,
          projectName: randomProject.name,
          investment: Math.floor(Math.random() * 5000) + 500,
          joinDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0]
        });
      }
    }

    users.push({
      id: i,
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
      phone: `0${Math.floor(Math.random() * 9) + 1}${Math.floor(Math.random() * 90000000) + 10000000}`,
      city,
      registrationDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      status: Math.random() > 0.1 ? 'Actif' : 'En attente',
      totalInvestment: participatingProjects.reduce((sum, p) => sum + p.investment, 0),
      projects: participatingProjects,
      pdl: `${Math.floor(Math.random() * 90000000000000) + 10000000000000}`,
      prm: `${Math.floor(Math.random() * 90000000000000) + 10000000000000}`,
      notifications: {
        email: Math.random() > 0.3,
        sms: Math.random() > 0.7,
        push: Math.random() > 0.5
      }
    });
  }

  return users;
};