const allProjects = [
  {
    id: 'project-charente-maritime-1',
    name: 'Bâtiment agricole en Charente-Maritime',
    location: 'Charente-Maritime (17), France',
    description: 'Construction d\'un bâtiment agricole pour stockage de matériel en Charente-Maritime. Une installation solaire de 162 kWc intégrée en toiture pour valoriser le foncier agricole et générer des revenus complémentaires.',
    power: 162, // kWc
    capacity: 162, // For compatibility
    annualProduction: 178, // MWh/an estimé
    participants: 0,
    maxParticipants: 0,
    eligibilityDistance: 0,
    consumerTariff: 0,
    latitude: 45.75,
    longitude: -0.63,
    imageUrl: '/images/projet-charente-maritime.jpg',
  },
  {
    id: 'project-dordogne-1',
    name: 'Bâtiment artisanal en Dordogne',
    location: 'Dordogne (24), France',
    description: 'Construction d\'un bâtiment artisanal sur zone artisanale en Dordogne. Projet d\'envergure de 500 kWc en toiture, idéalement situé sur une zone d\'activité pour maximiser l\'autoconsommation et la valorisation de l\'énergie produite.',
    power: 500, // kWc
    capacity: 500, // For compatibility
    annualProduction: 545, // MWh/an estimé
    participants: 0,
    maxParticipants: 0,
    eligibilityDistance: 0,
    consumerTariff: 0,
    latitude: 45.18,
    longitude: 0.72,
    imageUrl: '/images/projet-dordogne.jpg',
  },
  {
    id: 'project-gers-1',
    name: 'Bâtiment agricole dans le Gers',
    location: 'Gers (32), France',
    description: 'Construction d\'un bâtiment agricole pour stockage de matériel dans le Gers. Installation solaire de 280 kWc en toiture, bénéficiant d\'un excellent ensoleillement du Sud-Ouest pour une production optimisée tout au long de l\'année.',
    power: 280, // kWc
    capacity: 280, // For compatibility
    annualProduction: 315, // MWh/an estimé
    participants: 0,
    maxParticipants: 0,
    eligibilityDistance: 0,
    consumerTariff: 0,
    latitude: 43.65,
    longitude: 0.59,
    imageUrl: '/images/projet-gers.jpg',
  },
];

export { allProjects };