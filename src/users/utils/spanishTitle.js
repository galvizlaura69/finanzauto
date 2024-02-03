const listTitles = [
  { spanish: 'Sr', english: 'mr' },
  { spanish: 'Srta', english: 'ms' },
  { spanish: 'Sra', english: 'mrs' },
  { spanish: 'Srta', english: 'miss' },
  { spanish: 'Dr', english: 'dr' },
];

const spanishTitle = (title) => {
  if (!title) return '';

  const resultado = listTitles.find(item => item.english === title.toLowerCase());
  return resultado ? resultado.spanish : ''; 
};

export default spanishTitle;