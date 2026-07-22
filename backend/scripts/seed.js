const { initDb } = require('../database');

const intents = ['SCAM', 'RUMOR', 'HELP'];
const wards = ['taipei-daan', 'taipei-xinyi', 'taipei-zhongshan'];

const MOCK_SCAMS = [
  'http://free-crypto-giveaway.com',
  'https://irs-tax-refund-urgent.net',
  'http://win-free-iphone-now.org'
];

const MOCK_RUMORS = [
  'garlic cures the virus',
  'drinking bleach prevents covid',
  '5g towers cause coronavirus'
];

const MOCK_HELP = [
  'How do I apply for the subsidy?',
  'Where is the nearest vaccination center?',
  'I need help with my tax return.'
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(arr) {
  return arr[getRandomInt(0, arr.length - 1)];
}

function getRandomTimestamp() {
  const now = new Date();
  const past24Hours = new Date(now.getTime() - getRandomInt(0, 24 * 60 * 60 * 1000));
  return past24Hours.toISOString();
}

async function seed() {
  try {
    console.log('Initializing database connection...');
    const db = await initDb();

    console.log('Clearing existing interactions...');
    await db.run('DELETE FROM interactions');

    const numRecords = getRandomInt(20, 30);
    console.log(`Generating ${numRecords} mock interactions...`);

    for (let i = 0; i < numRecords; i++) {
      const intent = getRandomElement(intents);
      const ward = getRandomElement(wards);
      const region = 'taipei';
      const timestamp = getRandomTimestamp();
      
      let metadataObj = { source: 'seed' };
      
      if (intent === 'SCAM') {
        metadataObj.url = getRandomElement(MOCK_SCAMS);
      } else if (intent === 'RUMOR') {
        metadataObj.text = getRandomElement(MOCK_RUMORS);
      } else if (intent === 'HELP') {
        metadataObj.request = getRandomElement(MOCK_HELP);
      }

      const metadata = JSON.stringify(metadataObj);

      await db.run(
        'INSERT INTO interactions (intent, region, ward, timestamp, metadata) VALUES (?, ?, ?, ?, ?)',
        [intent, region, ward, timestamp, metadata]
      );
    }

    console.log('Seeding completed successfully.');
    await db.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
