

const APP_ID = '9f1cb97edf6e48b2920b4a3d6cd3b793';
// const APP_ID = Config.KEY_FOR_API;
export async function getLatestRates() {
  const url = `https://openexchangerates.org/api/latest.json?app_id=${APP_ID}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch rates: ${res.status}`);
  }

  return res.json();
}
