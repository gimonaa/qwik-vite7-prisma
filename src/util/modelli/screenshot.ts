// import puppeteer from 'puppeteer';
// import sharp from 'sharp';

// // Funzione asincrona per catturare una schermata e salvarla come WebP
// async function captureScreenshot(url: string, outputFileName: string) {
//   // Avvia Puppeteer in modalità headless
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   // Vai alla pagina desiderata
//   await page.goto(url, { waitUntil: 'networkidle2' });

//   // Cattura la schermata e salvala in formato PNG
//   const screenshotBuffer = await page.screenshot();

//   // Usa sharp per convertire il buffer PNG in WebP
//   sharp(screenshotBuffer)
//     .webp({ quality: 80 }) // Opzione di qualità per il formato WebP
//     .toFile(outputFileName, (info) => {
//         console.log('Schermata salvata come WebP:', info)
//     });

//   // Chiudi il browser
//   await browser.close();
// }

// // Esempio di utilizzo
// const url = 'https://www.meteo.fvg.it';
// const outputFileName = '/public/modelli/screenshot.webp';

// // Cattura la schermata della pagina e salvala come WebP
// captureScreenshot(url, outputFileName).then(() => {
//   console.log('Schermata catturata e salvata con successo!');
// }).catch((err) => {
//   console.error('Errore:', err);
// });
