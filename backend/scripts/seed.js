const { initDb } = require('../database');

const intents = ['SCAM', 'RUMOR', 'HELP'];
const wards = ['taipei-daan', 'taipei-xinyi', 'taipei-zhongshan'];

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
      const metadata = JSON.stringify({
        source: 'seed',
        note: `Mock ${intent} report in ${ward}`
      });

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
