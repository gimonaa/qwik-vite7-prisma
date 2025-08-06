/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  
  // const delteversion = await prisma.version.deleteMany({})
  // const version = await prisma.version.createMany({
  //   data: [
  //     // { version: '0.0.2', descrizione: 'prima versione di preweb3', data: new Date('2024-02-01') },
  //     { version: '0.0.3', descrizione: 'implementazione menu laterale', data: new Date('2024-02-13')  },
  //     { version: '0.0.4', descrizione: 'gestione ruoli utenti', data: new Date('2024-02-20') },
  //     { version: '0.0.5', descrizione: 'creazione interfacce gestione utenti', data: new Date('2024-03-10') },
  //     { version: '0.0.6', descrizione: 'visualizzazione modelli deterministici, radar, mappa stazioni, satellite' },
  //     { version: '0.0.7', descrizione: 'dashboard utente', data: new Date('2024-07-13') },
  //     { version: '0.0.8', descrizione: 'visualizzazione siti esterni tramite iframe', data: new Date('2024-07-24') },
  //     { version: '0.1.0', descrizione: 'visualizzazione radar tracking, lastmnx e retesyn, NWCSAF, indici, webcam, mare', data: new Date('2024-07-29') },
  //     { version: '0.1.1', descrizione: 'gestione versioning di preweb3', data: new Date('2024-07-31') },
  //     { version: '0.1.2', descrizione: '[indici] aggiunta visualizzazione indici temporali con aggiunta dei grafici', data: new Date('2024-08-22') },
  //     { version: '0.1.3', descrizione: '[previsioni] verifica delle previsioni - tabella', data: new Date('2024-09-17') },
  //     { version: '0.1.4', descrizione: '[previsioni] verifica delle previsioni - grafico', data: new Date('2024-09-24') },
  //     { version: '0.1.5', descrizione: '[auth] migrazione autenticazione da builder.io/qwik-auth a @auth/qwik', data: new Date('2024-09-25') },
  //     { version: '0.1.6', descrizione: '[rds] visualizzazione radiosondaggio di Udine', data: new Date('2024-10-02') },
  //     { version: '0.1.7', descrizione: '[modelli] aggiunta links ai siti web dei vari modelli disponibili online', data: new Date('2024-10-08') },
  //     { version: '0.1.8', descrizione: '[rds] visualizzazione tabella radiosondaggio di Udine', data: new Date('2024-10-09') },
  //     { version: '0.1.9', descrizione: '[rds] visualizzazione pseudosondaggi', data: new Date('2024-10-18') },
  //     { version: '0.2.0', descrizione: '[stazioni] lista stazioni per il FVG e dettaglio dati', data: new Date('2024-10-23') },
  //     { version: '0.2.1', descrizione: '[meteogrammi] visualizzazione dei meteogrammi a 3 e 5 giorni per i vari modelli', data: new Date('2024-10-24') },
  //     { version: '0.2.2', descrizione: '[indici] visualizzazione indici neve e bora', data: new Date('2024-10-25') },
  //     { version: '0.2.3', descrizione: '[mare] visualizzazione grafici Ispra e Comune di Venezia', data: new Date('2024-11-25') },
  //     { version: '0.2.4', descrizione: '[mare] visualizzazione grafici e tabelle BIG SUMDP', data: new Date('2024-11-27') },
  //     { version: '0.2.5', descrizione: '[modello - dwd] visualizzazione delle immagini del modello dwd', data: new Date('2024-12-09') },
  //     { version: '0.2.6', descrizione: '[omnia] visualizzazione iframe omnia-sea e omnia-fvg', data: new Date('2024-12-10') },
  //     { version: '0.2.7', descrizione: '[modelli] visualizzazione mappe poor', data: new Date('2024-12-11') },
  //     { version: '0.2.8', descrizione: '[indici] visualizzazione tabelle MOS-T giornalire e triorarie', data: new Date('2024-12-13') },
  //     { version: '0.2.9', descrizione: '[modelli] visualizzazione modelli probabilistici - spaghetti ECMWF', data: new Date('2025-01-09') },
  //     { version: '0.2.10', descrizione: '[modelli] visualizzazione modelli probabilistici ECMWF-EPS', data: new Date('2025-01-10') },
  //     { version: '1.0.0', descrizione: 'attivazione atmodesk.meteo.fvg.it', data: new Date('2025-02-06') },
  //     { version: '1.0.1', descrizione: '[stazioni] aggiunta grafici e altre funzioni', data: new Date('2025-02-10') },
  //     { version: '1.0.2', descrizione: '[mare] aggiunta visualizzazione marea misurata su Grado', data: new Date('2025-03-13') },
  //     { version: '1.0.3', descrizione: '[PCR] aggiunta prodotti CFD PCR Gabriele Peressi - onda incendi frane e soglie pioggia', data: new Date('2025-03-18') },
  //     { version: '1.0.4', descrizione: '[mare] visualizzazione modelli ISPRA', data: new Date('2025-03-24') },
  //     { version: '1.0.5', descrizione: '[qr-code] utility per la creazione di qr-code', data: new Date('2025-04-30') },
  //     { version: '1.0.6', descrizione: '[mare] aggiunta visualizzazione modello onda Pelmo', data: new Date('2025-05-09') },
  //     { version: '1.0.7', descrizione: '[severe] aggiunta visualizzazione mappe severe', data: new Date('2025-05-12') },
  //     { version: '1.0.8', descrizione: '[mare] aggiunta visualizzazione mappe Pelmo', data: new Date('2025-05-14') },
  //     { version: '1.0.9', descrizione: '[monitor-prodotti] visualizzazione/gestione stato del prodotto', data: new Date('2025-05-28') },
  //     { version: '1.0.10', descrizione: '[Thom] visualizzazione indice di Thom orario e giornaliero', data: new Date('2025-06-05') },
  //     { version: '1.1.0', descrizione: '[QWIK] aggiornamento alla versione 2.0.0-beta.1', data: new Date('2025-06-09') },
  //     { version: '1.1.1', descrizione: '[radar marino] visualizzazione immagini radar marino ARPA FVG', data: new Date('2025-06-19') },
  //     { version: '1.1.2', descrizione: '[stazioni] visualizzazione dati statistici con mos e previlong', data: new Date('2025-06-24') },
  //     { version: '1.1.3', descrizione: '[QWIK] aggiornamento alla versione 2.0.0-beta.4', data: new Date('2025-07-03') },
  //     { version: '1.1.4', descrizione: '[edit] prima versione interfaccia editing richiesta extrasondaggio', data: new Date('2025-07-18') },
    //   { version: '1.1.5', descrizione: '[mda] utilizzo della mda di NAS', data: new Date('2025-07-22') },
    //   { version: '1.1.6', descrizione: '[radar] visualizzazione orecchiette Radar VMI Fossalon', data: new Date('2025-07-29') },
    // ],
  //   skipDuplicates: true,
  // })

  const roles = await prisma.role.createMany({
    data: [
      // { desc: 'ADMIN' },
      // { desc: 'USER' },
      // { desc: 'PREVIS' },
      // { desc: 'CFD' },
      // { desc: 'OSSERV' },
      // { desc: 'CLIMA' },
      // { desc: 'NIVO' },
      // { desc: 'PCR' },
      // { desc: 'AIM' },
    ],
    // skipDuplicates: true,
  })

  const user = await prisma.user.upsert({
    where: { email: "admin@user.it" },
    update: {},
    create: {
      name: 'admin',
      email: 'admin@user.it',
      password: '3c1b11c27d718af7114bedfa4aa27f3ab09017796350101a4bd94c7e18bffff6',  // 12345678
      role: 'ADMIN'
    },
  })

  // const deleteDeltaSec = await prisma.deltaSec.deleteMany({})
  // const sec = await prisma.deltaSec.createMany({
  //   data: [
  //     { id: 60,    desc : '1 min',    class: "g-delta1min", order : 0 },
  //     { id: 300,   desc : '5 min',    class: "g-delta5min", order : 1 },
  //     { id: 600,   desc : '10 min',   class: "g-delta10min", order : 2 },
  //     { id: 900,   desc : '15 min',   class: "g-delta15min", order : 3 },
  //     { id: 1800,  desc : '30 min',   class: "g-delta30min", order : 3 },
  //     { id: 3600,  desc : '1 ora',    class: "g-delta1h", order : 4 },
  //     { id: 86400, desc : '1 giorno', class: "g-delta1day", order : 5 },
  //   ]
  // }) 

  // const deleteMenu = await prisma.menu.deleteMany({})
  // const menu = await prisma.menu.createMany({
  //   data: [
      // MODELLI
      // { id: 100 , order: 100, title: 'modelli' },
      // { id: 101 , order: 101, title: 'deterministici', url: "/modelli/deterministici/",  parrentMenuId: 100, permit : "PREVIS,OSSERV,CLIMA,AIM" },
      // { id: 102 , order: 102, title: 'meteogrammi', url: "/modelli/meteogrammi/",  parrentMenuId: 100, permit : "PREVIS,OSSERV,CLIMA,CFD,PCR,NIVO,AIM" },
      // { id: 103 , order: 103, title: 'poor', url: "/modelli/poor/", parrentMenuId: 100,  permit : "PREVIS,OSSERV,CLIMA,CFD,PCR,NIVO,AIM" },
      // { id: 104 , order: 104, title: 'spaghetti', url: "/modelli/spaghetti/",  parrentMenuId: 100, permit : "PREVIS,OSSERV,CLIMA,AIM" },
      // { id: 199 , order: 104, title: 'spaghetti test', url: "/modelli/spaghetti2/",  parrentMenuId: 100, permit : "PREVIS" },
      // { id: 105 , order: 105, title: 'probabilistici', url: "/modelli/probabilistici/",  parrentMenuId: 100, permit : "PREVIS,OSSERV,CLIMA,CFD,PCR,NIVO,AIM" },
      // { id: 126 , order: 126, title: 'previlong', url: "/iframe/?src=https:///www.meteo.fvg.it/previlong.php?metweb=on", parrentMenuId: 100, permit : "PREVIS,OSSERV,CLIMA" },
      // { id: 137 , order: 137, title: 'dwd-opendata', url: "/modelli/dwd-opendata/", parrentMenuId: 100, permit : "PREVIS,OSSERV,CLIMA" },
      // { id: 150 , order: 150, title: 'link esterni', url: "/modelli/link/", parrentMenuId: 100, permit : "PREVIS,OSSERV,CLIMA" },

      // // RADAR
      // { id: 200 , order: 200, title: 'radar' },
      // { id: 201 , order: 201, title: 'visualizza', url: "/radar/visualizza/", parrentMenuId: 200, permit : "PREVIS,OSSERV,CLIMA,CFD,PCR"},
      // { id: 202 , order: 202, title: 'movie www', url: "/iframe/?src=https:///www.meteo.fvg.it/radar-geo-movie.php", parrentMenuId: 200, permit : "PREVIS,OSSERV,CLIMA" },
      // // { id: 203 , order: 23, title: 'DPCN', url: "/iframe/?src=https:///radar.protezionecivile.it/#/pages/dashboard", parrentMenuId: 200 },
      // { id: 204 , order: 204, title: 'esterni', url: "/radar/esterni/", parrentMenuId: 200, permit : "PREVIS,OSSERV,CLIMA,CFD,PCR" },
      // { id: 205 , order: 205, title: 'tracking', url: "/radar/tracking/", parrentMenuId: 200, permit : "PREVIS,OSSERV,CLIMA,CFD,PCR" },
      
      // // STAZIONI
      // { id: 300 , order: 300, title: 'stazioni' },
      // { id: 305 , order: 305, title: 'mappa', url: "/stazioni/mappa/", parrentMenuId: 300, permit : "PREVIS,OSSERV,CLIMA" },
      // { id: 310 , order: 310, title: 'lista', url: "/stazioni/lista/", parrentMenuId: 300, permit : "PREVIS,OSSERV,CLIMA,CFD,PCR,NIVO" },
      // { id: 320 , order: 320, title: 'tabelle', url: "/stazioni/tabelle/", parrentMenuId: 300, permit : "PREVIS,OSSERV,CLIMA,CFD,PCR" },
      // { id: 325 , order: 325, title: 'statistica', url: "/stazioni/statistica/", parrentMenuId: 300, permit : "PREVIS,OSSERV,CLIMA" },
      // { id: 330 , order: 330, title: 'GR RAI', url: "/iframe/?src=https:///www.meteo.fvg.it/rai/", parrentMenuId: 300, permit : "PREVIS,OSSERV,CLIMA"  },
      // { id: 340 , order: 340, title: 'Clima FVG', url: "/iframe/?src=https:///www.meteo.fvg.it/clima.php", parrentMenuId: 300, permit : "PREVIS,OSSERV,CLIMA" },
      // { id: 345 , order: 345, title: 'monitor (FVG)', url: "/omnia/fvg/", parrentMenuId: 300, permit : "PREVIS,OSSERV,CLIMA,CFD,PCR" }, 
      // // { id: 360 , order: 60, title: 'Autostrade', url: "/iframe/?src=http:///meteo.autostrade.it/", parrentMenuId: 300, permit : "PREVIS,OSSERV,CLIMA" },
      // { id: 361 , order: 361, title: 'soglie pioggia', url: "/stazioni/soglie/", parrentMenuId: 300, permit : "PREVIS,OSSERV,CLIMA,CFD,PCR" },
      // // { id: 306 , order: 36, title: 'statistica', url: "/stazioni/statistica/", parrentMenuId: 300 },

      // // SATELLITE
      // { id: 600 , order: 600, title: 'satellite' },
      // { id: 601 , order: 601, title: 'visualizza', url: "/satellite/visualizza/", parrentMenuId: 600, permit : "PREVIS,OSSERV,CLIMA,CFD,PCR,AIM"},
      // { id: 602 , order: 602, title: 'nwcsaf', url: "/satellite/nwcsaf/", parrentMenuId: 600, permit : "PREVIS,OSSERV,CLIMA,CFD,PCR" },
      // // { id: 603 , order: 43, title: 'incendi', url: "/iframe/?src=https:///effis.jrc.ec.europa.eu/apps/effis_current_situation/", parrentMenuId: 600, permit : "PREVIS,OSSERV,CLIMA" },
      // { id: 604 , order: 604, title: 'mtg', url: "/iframe/?src=https:///view.eumetsat.int/productviewer?v=default", parrentMenuId: 600, permit : "PREVIS,OSSERV,CLIMA" },
      // // { id: 605 , order: 605, title: 'Osservatorio Tricalle', url: "/iframe/?src=https:///www.osservatoriometeotricalle.it/sat/", parrentMenuId: 600, permit : "PREVIS,OSSERV,CLIMA" },
      // { id: 606 , order: 606, title: 'link esterni', url: "/satellite/link/", parrentMenuId: 600, permit : "PREVIS,OSSERV,CLIMA" },

      // // RDS
      // { id: 700 , order: 700, title: 'rds' },
      // { id: 701 , order: 701, title: 'Udine', url: "/rds/udine/", parrentMenuId: 700, permit : "PREVIS,OSSERV,CLIMA,CFD,PCR" },
      // { id: 702 , order: 702, title: 'pseudosondaggi', url: "/rds/modelli/", parrentMenuId: 700, permit : "PREVIS,OSSERV,CLIMA,AIM" },

      // // INDICI
      // { id: 900 , order: 900, title: 'indici' },
      // { id: 901 , order: 901, title: 'temperature', url: "/indici/mos-t/", parrentMenuId: 900, permit : "PREVIS,OSSERV,CLIMA" },
      // { id: 902 , order: 902, title: 'thom', url: "/indici/thom/", parrentMenuId: 900, permit : "PREVIS,OSSERV,CLIMA" },
      // { id: 920 , order: 920, title: 'vento', url: "/indici/vento/", parrentMenuId: 900, permit : "PREVIS,OSSERV,CLIMA" },
      // { id: 930 , order: 930, title: 'incendi', url: "/indici/incendi/", parrentMenuId: 900, permit : "PREVIS,OSSERV,CLIMA,CFD,PCR" },
      // { id: 940 , order: 940, title: 'frane', url: "/indici/frane/", parrentMenuId: 900, permit : "PREVIS,OSSERV,CLIMA,CFD,PCR" },

      // // NEVE
      // { id: 1000 , order: 1000, title: 'neve' },
      // { id: 1001 , order: 1001, title: 'tabella', url: "/neve/tabella/", parrentMenuId: 1000, permit : "PREVIS,OSSERV,CLIMA,CFD,NIVO,PCR" },
      // { id: 1002 , order: 1002, title: 'monitor (SNOW)', url: "/omnia/snow/", parrentMenuId: 1000, permit : "PREVIS,OSSERV,CLIMA,CFD,NIVO,PCR" }, 

      // // TEMPORALI
      // { id: 1100 , order: 1100, title: 'temporali' },
      // { id: 1110 , order: 1101, title: 'severe', url: "/temporali/severe/", parrentMenuId: 1100, permit : "PREVIS,OSSERV,CLIMA,AIM" },
      // { id: 1120 , order: 1102, title: 'flas-atmoswing', url: "/temporali/indici/", parrentMenuId: 1100, permit : "PREVIS,OSSERV,CLIMA"},
      // { id: 1130 , order: 1103, title: 'ANN_forecast', url: "/temporali/ann_forecast/", parrentMenuId: 1100, permit : "PREVIS,OSSERV,CLIMA" },
      // { id: 1140 , order: 1104, title: 'link esterni', url: "/temporali/link/", parrentMenuId: 1100, permit : "PREVIS,OSSERV,CLIMA" },
      // // { id: 1140 , order: 1104, title: 'estofex', url: "/iframe/?src=https:///www.estofex.org/", parrentMenuId: 1100, permit : "PREVIS,OSSERV,CLIMA" },
      // // { id: 1150 , order: 1105, title: 'pretemp', url: "/iframe/?src=https:///pretemp.altervista.org/", parrentMenuId: 1100, permit : "PREVIS,OSSERV,CLIMA" },

      // // WEBCAM
      // { id: 1700 , order: 1700, title: 'webcam' },
      // { id: 1701 , order: 1701, title: 'mappa', url: "/iframe/?src=https:///www.meteo.fvg.it/app_webcam.php", parrentMenuId: 1700, permit : "PREVIS,OSSERV,CLIMA,NIVO,CFD,PCR" },
      // { id: 1702 , order: 1702, title: 'pannello', url: "/iframe/?src=https:///www.meteo.fvg.it/webcam_img.php", parrentMenuId: 1700, permit : "PREVIS,OSSERV,CLIMA,NIVO,CFD,PCR" },

      // // MARE
      // { id: 1800 , order: 1800, title: 'mare' },
      // { id: 1801 , order: 1801, title: 'BIG SUMDP - crma', url: "/iframe/?src=https:///lx-ext-apps.arpa.fvg.it/crma/AA10/sea_level/sealevel_fcst.html", parrentMenuId: 1800, permit : "PREVIS,OSSERV,CLIMA,CFD,PCR" },
      // { id: 1802 , order: 1802, title: 'CPSM + ISPRA', url: "/mare/cpsm-ispra/", parrentMenuId: 1800, permit : "PREVIS,OSSERV,CLIMA,CFD,PCR" },
      // { id: 1803 , order: 1803, title: 'Grafici Marea', url: "/mare/grafici/", parrentMenuId: 1800, permit : "PREVIS,OSSERV,CLIMA,CFD,PCR" },
      // { id: 1804 , order: 1804, title: 'monitor (SEA)', url: "/omnia/sea/", parrentMenuId: 1800, permit : "PREVIS,OSSERV,CLIMA,CFD,PCR" }, 
      // { id: 1805 , order: 1805, title: 'onda', url: "/mare/onda/", parrentMenuId: 1800, permit : "PREVIS,OSSERV,CLIMA,CFD,PCR" },
      // { id: 1806 , order: 1806, title: 'onda-pelmo', url: "/mare/onda-pelmo/", parrentMenuId: 1800, permit : "PREVIS,OSSERV,CLIMA,CFD,PCR" },
      // { id: 1810 , order: 1810, title: 'radar marino', url: "/mare/radar-marino/", parrentMenuId: 1800, permit : "PREVIS,OSSERV,CLIMA" },
      
      // // PREVISIONI
      // { id: 6000 , order: 6000, title: 'previsioni' , permit: "PREVIS,ADMIN" },
      // { id: 6004 , order: 6004, title: 'verifica', url: "/previsioni/verifica/", parrentMenuId: 6000 , permit: "PREVIS,ADMIN"},

      // // EDIT
      // { id: 7000 , order: 7000, title: 'edit' , permit: "PREVIS,ADMIN" },
      // { id: 7001 , order: 7001, title: 'extrasondaggio', url: "/edit/extrasondaggio/", parrentMenuId: 7000 , permit: "PREVIS,ADMIN" },
      // { id: 7002 , order: 7002, title: 'cfd', url: "/edit/cfd/qpf/", parrentMenuId: 7000 , permit: "PREVIS,ADMIN" },
      // { id: 7003 , order: 7003, title: 'previsioni-1', url: "/edit/previsioni/test1/0/", parrentMenuId: 7000 , permit: "PREVIS,ADMIN" },
      // { id: 7004 , order: 7004, title: 'previsioni-2', url: "/edit/previsioni/test2/", parrentMenuId: 7000 , permit: "PREVIS,ADMIN" },

  //     // ADMIN
  //     { id: 9000 , order: 9000, title: 'admin' , permit: "ADMIN"},
  //     { id: 9001 , order: 9001, title: 'lista utenti', url: "/admin/user/list/", parrentMenuId: 9000 , permit: "ADMIN" },        
  //     { id: 9002 , order: 9002, title: 'crea utente', url: "/admin/user/create/", parrentMenuId: 9000 , permit: "ADMIN" },
  //     { id: 9003 , order: 9003, title: 'cronologia utenti', url: "/admin/user/history/", parrentMenuId: 9000 , permit: "ADMIN" },
  //     { id: 9004 , order: 9004, title: 'cronologia email', url: "/admin/email/history/", parrentMenuId: 9000 , permit: "ADMIN" },

  //     // // UTILS
  //     // { id: 8000 , order: 8000, title: 'utils', permit: "PREVIS,OSSERV,CLIMA" },
  //     // { id: 8001 , order: 8001, title: 'qr-code', url: "/utils/qr-code/", parrentMenuId: 8000 , permit: "PREVIS,OSSERV,CLIMA" },
  //     // { id: 8002 , order: 8002, title: 'monitor-prodotti', url: "/utils/monitor-prodotti/", parrentMenuId: 8000 , permit: "PREVIS" },

  //     // // TEST
  //     // { id: 9905 , order: 9905, title: 'test', permit: "ADMIN" },
  //     // { id: 9906 , order: 9906, title: 'invio email', url: "/test/email/", parrentMenuId: 9905 , permit: "ADMIN" },
  //     // { id: 9907 , order: 9907, title: 'geolocalizzaizone', url: "/test/geolocalizzaizone/", parrentMenuId: 9905 , permit: "ADMIN" },
  //     // { id: 9908 , order: 9908, title: 'mapserver', url: "/test/mapserver/", parrentMenuId: 9905 , permit: "ADMIN" },
  //     // // { id: 9909 , order: 9909, title: 'QR-code', url: "/test/qr-code/", parrentMenuId: 9905 , permit: "ADMIN" },

  //     // // SHARE
  //     // { id: 10000, order: 10000, title: 'nas', permit: "ADMIN,PREVIS" },
  //     // { id: 10001, order: 10001, title: 'share', url: "/browse/share/", parrentMenuId: 10000, permit: "ADMIN,PREVIS" },
  //     // { id: 10010, order: 10010, title: 'prodotti', url: "/browse/prodotti/", parrentMenuId: 10000, permit: "ADMIN,PREVIS" },

  //   ],
  //   // skipDuplicates: true, 
  // })

  // // const deleteLoc = await prisma.localita.deleteMany({})
  // const localita = await prisma.previLocalita.createMany({
  //   data: [
  //     {id:1 ,desc: "Alpi Carniche", stringa: "alpi_carniche", order: 1},
  //     {id:2 ,desc: "Alpi Giulie", stringa: "alpi_giulie", order:2},
  //     {id:3 ,desc: "Preali Carniche", stringa: "prealpi_carniche", order:3},
  //     {id:4 ,desc: "Prealpi Giulie", stringa: "prealpi_giulie", order:4},
  //     {id:5 ,desc: "Pordenone", stringa: "pordenone", order:5},
  //     {id:6 ,desc: "Udine", stringa: "udine", order:6},
  //     {id:7 ,desc: "Gorizia", stringa: "gorizia", order:7},
  //     {id:8 ,desc: "Costa", stringa: "costa", order:8},
  //     {id:9 ,desc: "Trieste", stringa: "trieste", order:9},
  //   ],
  //   skipDuplicates: true,
  // })

  // const cielo = await prisma.previCielo.createMany({
  //   data: [
  //     {id:1 ,desc: "sereno", order: 1},
  //     {id:2 ,desc: "poco_nuvoloso", order: 2},
  //     {id:3 ,desc: "variabile", order: 3},
  //     {id:4 ,desc: "nuvoloso", order: 4},
  //     {id:5 ,desc: "coperto", order: 5},
  //     {id:6 ,desc: "sole_nebbia", order: 6},
  //   ],
  //   skipDuplicates: true,
  // })


  // const modeltype = await prisma.modelType.createMany({
  //   data: [
  //     {id: 1, name: "deterministico"},
  //     {id: 2, name: "probabilistico"},
  //   ],
  //   skipDuplicates: true,
  // })

  // const modelli = await prisma.model.createMany({
  //   data: [
  //     {id:1,  name: 'ECMWF',       codice: "ECMWF",      descrizione: "IFS",     typeIdId: 1, order: 1},
  //     {id:9,  name: 'DWD-ICON',    codice: "DWD-ICON",   descrizione: "IEU",     typeIdId: 1, order: 2},
  //     {id:3,  name: 'GFS' ,        codice: "GFS",        descrizione: "GFS",     typeIdId: 1, order: 3},
  //     {id:4,  name: 'ARPEGE' ,     codice: "ARPEGE",     descrizione: "ARPEGE",  typeIdId: 1, order: 4, active: false},
  //     {id:2,  name: 'ALADIN' ,     codice: "ALADIN",     descrizione: "ALADIN",  typeIdId: 1, order: 5},
  //     {id:7,  name: 'MOLOCH' ,     codice: "MOLOCH",     descrizione: "MOLOCH",  typeIdId: 1, order: 6},
  //     {id:8,  name: 'WRF-CRMA',    codice: "WRF-CRMA",   descrizione: "WRF",     typeIdId: 1, order: 7},
  //     {id:5,  name: 'ICON-2I' ,    codice: "ICON-2I",    descrizione: "I2I",     typeIdId: 1, order: 8},
  //     {id:6,  name: 'DWD-ICON-D2', codice: "DWD-ICON-D2",descrizione: "ID2",     typeIdId: 1, order: 9},



  //     {id:101, name: 'ECMWF-EPS' , codice: "ECMWF-EPS", typeIdId: 2, order: 101},
  //   ],
  //   skipDuplicates: true,
  // })

  // const modelRun = await prisma.modelRun.createMany({
  //   data: [
  //     {id:0,  name: '00'},
  //     {id:3,  name: '03'},
  //     {id:6,  name: '06'},
  //     {id:9,  name: '09'},
  //     {id:12, name: '12'},
  //     {id:15, name: '15'},
  //     {id:18, name: '18'},
  //     {id:21, name: '21'}
  //   ],
  //   skipDuplicates: true,
  // })

  // const modelRunRel = await prisma.modelRunRel.createMany({
  //   data: [
  //     // ECMWF
  //     {id:100, modelId: 1, modelRunId: 0,  maxStep: 240},  // ECMWF 00
  //     {id:106, modelId: 1, modelRunId: 6,  maxStep:  90},  // ECMWF 06
  //     {id:112, modelId: 1, modelRunId: 12, maxStep: 240},  // ECMWF 12
  //     {id:118, modelId: 1, modelRunId: 18, maxStep: 90},   // ECMWF 18
  //     // DWD-ICON
  //     {id:900, modelId: 9, modelRunId: 0,  maxStep: 72},  // ICON-2I 00
  //     {id:906, modelId: 9, modelRunId: 6,  maxStep: 72},  // ICON-2I 06
  //     {id:912, modelId: 9, modelRunId: 12, maxStep: 72},  // ICON-2I 12
  //     {id:918, modelId: 9, modelRunId: 18, maxStep: 72},  // ICON-2I 18
  //     // GFS
  //     {id:300, modelId: 3, modelRunId: 0,  maxStep: 84},  // GFS 00
  //     {id:306, modelId: 3, modelRunId: 6,  maxStep: 84},  // GFS 06  
  //     {id:312, modelId: 3, modelRunId: 12, maxStep: 84},  // GFS 12
  //     {id:318, modelId: 3, modelRunId: 18, maxStep: 84},  // GFS 18
  //     // ARPEGE
  //     {id:400, modelId: 4, modelRunId: 0,  maxStep: 120},  // ARPEGE 00
  //     {id:412, modelId: 4, modelRunId: 12, maxStep: 120},  // ARPEGE 12
  //     // ALADIN
  //     {id:200, modelId: 2, modelRunId: 0,  maxStep: 72},  // ALADIN 00
  //     {id:212, modelId: 2, modelRunId: 12, maxStep: 72},  // ALADIN 12
  //     // MOLOCH
  //     {id:703, modelId: 7, modelRunId: 3,  maxStep: 45},  // MOLOCH 00
  //     // WRF-CRMA
  //     {id:800, modelId: 8, modelRunId: 0,  maxStep: 72}, // WRF-CRMA 00
  //     // ICON-2I
  //     {id:500, modelId: 5, modelRunId: 0, maxStep: 72},  // ICON-2I 00
  //     {id:503, modelId: 5, modelRunId: 3, maxStep: 72},  // ICON-2I 03
  //     {id:506, modelId: 5, modelRunId: 6, maxStep: 72},  // ICON-2I 06
  //     {id:509, modelId: 5, modelRunId: 9, maxStep: 72},  // ICON-2I 09
  //     {id:512, modelId: 5, modelRunId: 12, maxStep: 72}, // ICON-2I 12
  //     {id:515, modelId: 5, modelRunId: 15, maxStep: 72}, // ICON-2I 15
  //     {id:518, modelId: 5, modelRunId: 18, maxStep: 72}, // ICON-2I 18
  //     {id:521, modelId: 5, modelRunId: 21, maxStep: 72}, // ICON-2I 21
  //     // DWD-ICON-D2
  //     {id:600, modelId: 6, modelRunId: 0, maxStep: 48},  // DWD-ICON-D2 00
  //     {id:603, modelId: 6, modelRunId: 3, maxStep: 48},  // DWD-ICON-D2 03
  //     {id:606, modelId: 6, modelRunId: 6, maxStep: 48},  // DWD-ICON-D2 06
  //     {id:609, modelId: 6, modelRunId: 9, maxStep: 48},  // DWD-ICON-D2 09
  //     {id:612, modelId: 6, modelRunId: 12, maxStep: 48}, // DWD-ICON-D2 12
  //     {id:615, modelId: 6, modelRunId: 15, maxStep: 48}, // DWD-ICON-D2 15
  //     {id:618, modelId: 6, modelRunId: 18, maxStep: 48}, // DWD-ICON-D2 18
  //     {id:621, modelId: 6, modelRunId: 21, maxStep: 48}, // DWD-ICON-D2 21

  //   ],
  //   skipDuplicates: true,
  // })

  // const modelliL = await prisma.modelDomain.createMany({
  //   data: [
  //     {id:1, name: 'ITA',   order: 3},
  //     {id:2, name: 'NIT',  order: 4},
  //     {id:3, name: 'EUR' ,  order: 2},
  //     {id:4, name: 'EUA' ,  order: 1},
  //     {id:5, name: 'FVG' ,  order: 6},
  //     {id:6, name: 'SEA' ,  order: 7},
  //     {id:7, name: 'NE' ,  order: 5},
  //     {id:99, name: '' ,  order: 99},

  //   ],
  //   skipDuplicates: true,
  // })

  // const modelliLev = await prisma.modelLevel.createMany({
  //   data: [
  //     {id:1, name: '250',   order: 1},
  //     {id:9, name: '300',   order: 2},
  //     {id:2, name: '500',   order: 3},
  //     {id:3, name: '700' ,  order: 4},
  //     {id:4, name: '850' ,  order: 5},
  //     {id:5, name: '925' ,  order: 6},
  //     {id:6, name: 'ATM' ,  order: 8},
  //     {id:7, name: 'SFC' ,  order: 7},
  //     {id:99, name: ''   ,  order: 9},
  //   ],
  //   skipDuplicates: true,
  // })

  // // const modelliVarD = await prisma.modelVar.deleteMany({})
  // const modelliVar = await prisma.modelVar.createMany({
  //   data: [
  //     {id:1, name: 'TP',        order: 201},
  //     {id:3, name: 'CP' ,       order: 202},
  //     {id:4, name: 'SF' ,       order: 203},
  //     {id:6, name: 'PT_TP' ,    order: 204},
  //     {id:7, name: 'TP_V' ,     order: 205},
  //     {id:2, name: 'SF_T' ,     order: 206},
  //     {id:8, name: 'R_V_Z_T' ,  order: 101},
  //     {id:9, name: 'W' ,        order: 105},
  //     {id:10, name: 'T_Z' ,     order: 102},
  //     {id:11, name: 'R_V' ,     order: 103},
  //     {id:13, name: 'T2' ,      order: 501},
  //     {id:14, name: 'MN2T' ,    order: 502},
  //     {id:15, name: 'MX2T' ,    order: 503},
  //     {id:16, name: 'SLP_V10' , order: 703},
  //     {id:17, name: 'VG10_V10', order: 704},
  //     {id:18, name: 'DEG0L' ,   order: 302},
  //     {id:19, name: 'TCC' ,     order: 403},
  //     {id:20, name: 'SKT' ,     order: 504},
  //     {id:21, name: 'T2-D2' ,   order: 601},
  //     {id:22, name: 'VIS' ,     order: 602},
  //     {id:23, name: 'IVT' ,     order: 401},
  //     {id:24, name: 'VG10' ,    order: 702},
  //     {id:25, name: 'R2' ,      order: 603},
  //     {id:26, name: 'R_V_T' ,   order: 104},
  //     {id:27, name: 'TCW' ,     order: 402},
  //     {id:28, name: 'V10' ,     order: 701},
  //     {id:29, name: 'CAPE' ,    order: 801},
  //     {id:30, name: 'CIN' ,     order: 802},
  //     {id:31, name: 'LPI' ,     order: 804},
  //     {id:32, name: 'SFL' ,     order: 301},
  //     {id:33, name: 'VMI' ,     order: 803},
  //     {id:34, name: '#' ,       order: 200},
  //     {id:35, name: '##' ,      order: 300},
  //     {id:36, name: '###' ,     order: 400},
  //     {id:37, name: '####' ,    order: 500},
  //     {id:38, name: '#####' ,   order: 600},
  //     {id:39, name: '######' ,  order: 700},
  //   ],
  //   skipDuplicates: true,
  // })

  // const modelliVarCum = await prisma.modelVarCum.createMany({
  //   data: [
  //     {id:0, name: '',   order: 1},
  //     {id:24, name: '24' ,  order: 2},
  //   ],
  //   skipDuplicates: true,
  // })

  // const modelStep = await prisma.modelStep.createMany({
  //   data:[
  //     {id: 1, start: 3, end: 120, step: 3}, // ecmwf
  //     {id: 2, start: 6, end: 120, step: 3}, // ecmwf
  //     {id: 3, start: 6, end: 240, step: 6}, // ecmwf
  //     {id: 4, start: 6, end: 120, step: 6}, // ecmwf
  //     {id: 5, start: 3, end: 48, step: 3},  // aladin
  //     {id: 6, start: 3, end: 84, step: 3},  // gfs  arpege
  //     {id: 7, start: 24, end: 84, step: 3},  // gfs TP24
  //     {id: 8, start: 0, end: 72, step: 1},  // icon-2i
  //     {id: 9, start: 0, end: 48, step: 1},  // dwd-icon-d2
  //     {id: 10, start: 3, end: 72, step: 3},  // dwd-icon-eu
  //     {id: 11, start: 6, end: 45, step: 3},  // moloch
  //     {id: 12, start: 6, end: 72, step: 3},  // wrf
  //   ],
  //   skipDuplicates: true,
  // })

  // // const modelRelD = await prisma.modelRelations.deleteMany({})
  // const modelRel = await prisma.modelRelations.createMany({
  //   data:[
  //     // ecmwf SFC 
  //     { id: 1, modelId: 1, modelDomainId: 2, modelLevelId: 7, modelVarId : 1, modelVarCumId: 0, modelStepId: 1},  // NIT TP
  //     { id: 2, modelId: 1, modelDomainId: 2, modelLevelId: 7, modelVarId : 1, modelVarCumId: 24, modelStepId: 2}, // NIT TP24
  //     { id: 3, modelId: 1, modelDomainId: 2, modelLevelId: 7, modelVarId : 3, modelVarCumId: 0, modelStepId: 1},  // NIT CP
  //     { id: 4, modelId: 1, modelDomainId: 2, modelLevelId: 7, modelVarId : 4, modelVarCumId: 0, modelStepId: 1},  // NIT SF
  //     { id: 5, modelId: 1, modelDomainId: 2, modelLevelId: 7, modelVarId : 4, modelVarCumId: 24, modelStepId: 2}, // NIT SF24
  //     { id: 6, modelId: 1, modelDomainId: 2, modelLevelId: 7, modelVarId : 6, modelVarCumId: 0, modelStepId: 1},  // NIT PT_TP
  //     { id: 30, modelId: 1, modelDomainId: 2, modelLevelId: 7, modelVarId : 13, modelVarCumId: 0, modelStepId: 1},  // NIT T2
  //     { id: 31, modelId: 1, modelDomainId: 2, modelLevelId: 7, modelVarId : 14, modelVarCumId: 0, modelStepId: 1},  // NIT MN2T
  //     { id: 32, modelId: 1, modelDomainId: 2, modelLevelId: 7, modelVarId : 15, modelVarCumId: 0, modelStepId: 1},  // NIT MX2T
  //     { id: 33, modelId: 1, modelDomainId: 2, modelLevelId: 7, modelVarId : 16, modelVarCumId: 0, modelStepId: 1},  // NIT SLP_V10
  //     { id: 34, modelId: 1, modelDomainId: 2, modelLevelId: 7, modelVarId : 17, modelVarCumId: 0, modelStepId: 1},  // NIT VG10__V10
  //     { id: 35, modelId: 1, modelDomainId: 2, modelLevelId: 7, modelVarId : 18, modelVarCumId: 0, modelStepId: 1},  // NIT DEG0L
  //     { id: 36, modelId: 1, modelDomainId: 5, modelLevelId: 7, modelVarId : 18, modelVarCumId: 0, modelStepId: 1},  // FVG DEG0L
  //     { id: 37, modelId: 1, modelDomainId: 2, modelLevelId: 7, modelVarId : 19, modelVarCumId: 0, modelStepId: 1},  // NIT TCC
  //     { id: 38, modelId: 1, modelDomainId: 2, modelLevelId: 7, modelVarId : 20, modelVarCumId: 0, modelStepId: 1},  // NIT SKT
  //     { id: 39, modelId: 1, modelDomainId: 2, modelLevelId: 7, modelVarId : 21, modelVarCumId: 0, modelStepId: 1},  // NIT T2-D2
  //     { id: 40, modelId: 1, modelDomainId: 2, modelLevelId: 7, modelVarId : 22, modelVarCumId: 0, modelStepId: 1},  // NIT VIS
  //     { id: 41, modelId: 1, modelDomainId: 6, modelLevelId: 7, modelVarId : 16, modelVarCumId: 0, modelStepId: 1},  // SEA SLP_V10

  //     // ecmwf 925 
  //     { id: 7, modelId: 1, modelDomainId: 1, modelLevelId: 5, modelVarId : 8, modelVarCumId: 0, modelStepId: 1},  // ITA R_V_Z_T
  //     { id: 8, modelId: 1, modelDomainId: 2, modelLevelId: 5, modelVarId : 8, modelVarCumId: 0, modelStepId: 1},  // NIT R_V_Z_T
  //     { id: 9, modelId: 1, modelDomainId: 2, modelLevelId: 5, modelVarId : 9, modelVarCumId: 0, modelStepId: 1},  // NIT W

  //     // ecmwf 500  
  //     { id: 10, modelId: 1, modelDomainId: 3, modelLevelId: 2, modelVarId : 10, modelVarCumId: 0, modelStepId: 3}, // EUR T_Z
  //     { id: 11, modelId: 1, modelDomainId: 3, modelLevelId: 2, modelVarId : 11, modelVarCumId: 0, modelStepId: 3}, // EUR R_V 
  //     { id: 12, modelId: 1, modelDomainId: 1, modelLevelId: 2, modelVarId : 8, modelVarCumId: 0, modelStepId: 1}, // ITA R_V_Z_T
  //     { id: 13, modelId: 1, modelDomainId: 2, modelLevelId: 2, modelVarId : 8, modelVarCumId: 0, modelStepId: 1}, // NIT R_V_Z_T
  //     { id: 14, modelId: 1, modelDomainId: 2, modelLevelId: 2, modelVarId : 9, modelVarCumId: 0, modelStepId: 1}, // NIT W
  //     // ecmwf 250
  //     { id: 15, modelId: 1, modelDomainId: 3, modelLevelId: 1, modelVarId : 10, modelVarCumId: 0, modelStepId: 3}, // EUR T_Z
  //     { id: 16, modelId: 1, modelDomainId: 3, modelLevelId: 1, modelVarId : 11, modelVarCumId: 0, modelStepId: 3}, // EUR R_V 
  //     { id: 17, modelId: 1, modelDomainId: 1, modelLevelId: 1, modelVarId : 8, modelVarCumId: 0, modelStepId: 1}, // ITA R_V_Z_T
  //     { id: 18, modelId: 1, modelDomainId: 2, modelLevelId: 1, modelVarId : 8, modelVarCumId: 0, modelStepId: 1}, // NIT R_V_Z_T
  //     { id: 19, modelId: 1, modelDomainId: 2, modelLevelId: 1, modelVarId : 9, modelVarCumId: 0, modelStepId: 1}, // NIT W
  //     // ecmwf 700
  //     { id: 20, modelId: 1, modelDomainId: 1, modelLevelId: 3, modelVarId : 8, modelVarCumId: 0, modelStepId: 1}, // ITA R_V_Z_T
  //     { id: 21, modelId: 1, modelDomainId: 2, modelLevelId: 3, modelVarId : 8, modelVarCumId: 0, modelStepId: 1}, // NIT R_V_Z_T
  //     { id: 22, modelId: 1, modelDomainId: 2, modelLevelId: 3, modelVarId : 9, modelVarCumId: 0, modelStepId: 1}, // NIT W
  //     // ecmwf 850
  //     { id: 23, modelId: 1, modelDomainId: 1, modelLevelId: 4, modelVarId : 8, modelVarCumId: 0, modelStepId: 1}, // ITA R_V_Z_T
  //     { id: 24, modelId: 1, modelDomainId: 2, modelLevelId: 4, modelVarId : 8, modelVarCumId: 0, modelStepId: 1}, // NIT R_V_Z_T
  //     { id: 25, modelId: 1, modelDomainId: 2, modelLevelId: 4, modelVarId : 9, modelVarCumId: 0, modelStepId: 1}, // NIT W

  //     // ecmwf ATM
  //     { id: 29, modelId: 1, modelDomainId: 4, modelLevelId: 6, modelVarId : 23, modelVarCumId: 0, modelStepId: 4}, // EUA IVT


  //     // Aladin SFC
  //     { id: 101, modelId: 2, modelDomainId: 99, modelLevelId: 7, modelVarId : 1, modelVarCumId: 0, modelStepId: 5},  //  TP
  //     { id: 102, modelId: 2, modelDomainId: 99, modelLevelId: 7, modelVarId : 1, modelVarCumId: 24, modelStepId: 5}, //  TP24
  //     { id: 103, modelId: 2, modelDomainId: 99, modelLevelId: 7, modelVarId : 3, modelVarCumId: 0, modelStepId: 5},  //  CP
  //     { id: 104, modelId: 2, modelDomainId: 99, modelLevelId: 7, modelVarId : 4, modelVarCumId: 0, modelStepId: 5},  //  SF
  //     { id: 105, modelId: 2, modelDomainId: 99, modelLevelId: 7, modelVarId : 4, modelVarCumId: 24, modelStepId: 5}, //  SF24
  //     { id: 130, modelId: 2, modelDomainId: 99, modelLevelId: 7, modelVarId : 13, modelVarCumId: 0, modelStepId: 5},  //  T2
  //     { id: 133, modelId: 2, modelDomainId: 99, modelLevelId: 7, modelVarId : 16, modelVarCumId: 0, modelStepId: 5},  //  SLP_V10
  //     { id: 134, modelId: 2, modelDomainId: 99, modelLevelId: 7, modelVarId : 24, modelVarCumId: 0, modelStepId: 5},  //  VG10
  //     { id: 137, modelId: 2, modelDomainId: 99, modelLevelId: 7, modelVarId : 19, modelVarCumId: 0, modelStepId: 5},  //  TCC
  //     { id: 138, modelId: 2, modelDomainId: 99, modelLevelId: 7, modelVarId : 20, modelVarCumId: 0, modelStepId: 5},  //  SKT
  //     { id: 140, modelId: 2, modelDomainId: 99, modelLevelId: 7, modelVarId : 25, modelVarCumId: 0, modelStepId: 5},  //  R2

  //     // Aladin 700
  //     { id: 150, modelId: 2, modelDomainId: 99, modelLevelId: 3, modelVarId : 10, modelVarCumId: 0, modelStepId: 5}, // T_Z
  //     { id: 151, modelId: 2, modelDomainId: 99, modelLevelId: 3, modelVarId : 26, modelVarCumId: 0, modelStepId: 5}, // R_V_T
  //     // Aladin 850
  //     { id: 152, modelId: 2, modelDomainId: 99, modelLevelId: 4, modelVarId : 10, modelVarCumId: 0, modelStepId: 5}, // T_Z
  //     { id: 153, modelId: 2, modelDomainId: 99, modelLevelId: 4, modelVarId : 26, modelVarCumId: 0, modelStepId: 5}, // R_V_T
  //     // Aladin 925
  //     { id: 154, modelId: 2, modelDomainId: 99, modelLevelId: 5, modelVarId : 10, modelVarCumId: 0, modelStepId: 5}, // T_Z
  //     { id: 155, modelId: 2, modelDomainId: 99, modelLevelId: 5, modelVarId : 26, modelVarCumId: 0, modelStepId: 5}, // R_V_T


  //     // GFS SFC
  //     { id: 201, modelId: 3, modelDomainId: 99, modelLevelId: 99, modelVarId : 1, modelVarCumId: 0, modelStepId: 6},  //  TP
  //     { id: 202, modelId: 3, modelDomainId: 99, modelLevelId: 99, modelVarId : 1, modelVarCumId: 24, modelStepId: 7}, //  TP24


  //     // Arpege SFC
  //     { id: 301, modelId: 4, modelDomainId: 7, modelLevelId: 7, modelVarId : 1, modelVarCumId: 0, modelStepId: 6},  //  TP
  //     { id: 302, modelId: 4, modelDomainId: 7, modelLevelId: 7, modelVarId : 1, modelVarCumId: 24, modelStepId: 6}, //  TP24
  //     { id: 304, modelId: 4, modelDomainId: 7, modelLevelId: 7, modelVarId : 4, modelVarCumId: 0, modelStepId: 6},  //  SF
  //     { id: 305, modelId: 4, modelDomainId: 7, modelLevelId: 7, modelVarId : 4, modelVarCumId: 24, modelStepId: 6}, //  SF24
  //     { id: 330, modelId: 4, modelDomainId: 7, modelLevelId: 7, modelVarId : 13, modelVarCumId: 0, modelStepId: 6},  //  T2
  //     { id: 331, modelId: 4, modelDomainId: 7, modelLevelId: 7, modelVarId : 14, modelVarCumId: 0, modelStepId: 6},  // MN2T
  //     { id: 332, modelId: 4, modelDomainId: 7, modelLevelId: 7, modelVarId : 15, modelVarCumId: 0, modelStepId: 6},  // MX2T
  //     { id: 333, modelId: 4, modelDomainId: 7, modelLevelId: 7, modelVarId : 16, modelVarCumId: 0, modelStepId: 6},  //  SLP_V10
  //     { id: 334, modelId: 4, modelDomainId: 7, modelLevelId: 7, modelVarId : 24, modelVarCumId: 0, modelStepId: 6},  //  VG10
  //     { id: 337, modelId: 4, modelDomainId: 7, modelLevelId: 7, modelVarId : 19, modelVarCumId: 0, modelStepId: 6},  //  TCC
  //     { id: 340, modelId: 4, modelDomainId: 7, modelLevelId: 7, modelVarId : 25, modelVarCumId: 0, modelStepId: 6},  //  R2

  //     // Arpege 700
  //     { id: 350, modelId: 4, modelDomainId: 7, modelLevelId: 3, modelVarId : 9, modelVarCumId: 0, modelStepId: 6}, // W
  //     { id: 351, modelId: 4, modelDomainId: 7, modelLevelId: 3, modelVarId : 8, modelVarCumId: 0, modelStepId: 6}, // R_V_Z_T
  //     // Arpege 850
  //     { id: 352, modelId: 4, modelDomainId: 7, modelLevelId: 4, modelVarId : 9, modelVarCumId: 0, modelStepId: 6}, // W
  //     { id: 353, modelId: 4, modelDomainId: 7, modelLevelId: 4, modelVarId : 8, modelVarCumId: 0, modelStepId: 6}, // R_V_Z_T
  //     // Arpege 925
  //     { id: 354, modelId: 4, modelDomainId: 7, modelLevelId: 5, modelVarId : 9, modelVarCumId: 0, modelStepId: 6}, // W
  //     { id: 355, modelId: 4, modelDomainId: 7, modelLevelId: 5, modelVarId : 8, modelVarCumId: 0, modelStepId: 6}, // R_V_T      
  //     // Arpege 500
  //     { id: 354, modelId: 4, modelDomainId: 7, modelLevelId: 2, modelVarId : 9, modelVarCumId: 0, modelStepId: 6}, // W
  //     { id: 355, modelId: 4, modelDomainId: 7, modelLevelId: 2, modelVarId : 8, modelVarCumId: 0, modelStepId: 6}, // R_V_T   
  //     // Arpege 250
  //     { id: 354, modelId: 4, modelDomainId: 7, modelLevelId: 1, modelVarId : 9, modelVarCumId: 0, modelStepId: 6}, // W
  //     { id: 355, modelId: 4, modelDomainId: 7, modelLevelId: 1, modelVarId : 8, modelVarCumId: 0, modelStepId: 6}, // R_V_T   

  //     // Icon-2i
  //     { id: 401, modelId: 5, modelDomainId: 5, modelLevelId: 7, modelVarId : 1, modelVarCumId: 0, modelStepId: 8},   //  TP
  //     { id: 402, modelId: 5, modelDomainId: 5, modelLevelId: 7, modelVarId : 1, modelVarCumId: 24, modelStepId: 8},  //  TP24
  //     { id: 403, modelId: 5, modelDomainId: 5, modelLevelId: 7, modelVarId : 4, modelVarCumId: 0, modelStepId: 8},   //  SF
  //     { id: 404, modelId: 5, modelDomainId: 5, modelLevelId: 7, modelVarId : 4, modelVarCumId: 24, modelStepId: 8},  //  SF24
  //     { id: 405, modelId: 5, modelDomainId: 5, modelLevelId: 7, modelVarId : 13, modelVarCumId: 0, modelStepId: 8},  //  T2
  //     { id: 406, modelId: 5, modelDomainId: 5, modelLevelId: 7, modelVarId : 16, modelVarCumId: 0, modelStepId: 8},  //  SLP_V10
  //     { id: 407, modelId: 5, modelDomainId: 5, modelLevelId: 7, modelVarId : 24, modelVarCumId: 0, modelStepId: 8},  //  VG10
  //     { id: 408, modelId: 5, modelDomainId: 5, modelLevelId: 7, modelVarId : 19, modelVarCumId: 0, modelStepId: 8},  //  TCC
  //     { id: 409, modelId: 5, modelDomainId: 5, modelLevelId: 7, modelVarId : 20, modelVarCumId: 0, modelStepId: 8},  //  SKT
  //     { id: 410, modelId: 5, modelDomainId: 5, modelLevelId: 7, modelVarId : 27, modelVarCumId: 0, modelStepId: 8},  //  TCW
  //     { id: 411, modelId: 5, modelDomainId: 5, modelLevelId: 7, modelVarId : 28, modelVarCumId: 0, modelStepId: 8},  //  V10
  //     { id: 412, modelId: 5, modelDomainId: 5, modelLevelId: 7, modelVarId : 29, modelVarCumId: 0, modelStepId: 8},  //  CAPE
  //     { id: 413, modelId: 5, modelDomainId: 5, modelLevelId: 7, modelVarId : 30, modelVarCumId: 0, modelStepId: 8},  //  CIN
  //     { id: 414, modelId: 5, modelDomainId: 5, modelLevelId: 7, modelVarId : 31, modelVarCumId: 0, modelStepId: 8},  //  LPI
  //     { id: 415, modelId: 5, modelDomainId: 5, modelLevelId: 7, modelVarId : 21, modelVarCumId: 0, modelStepId: 8},  //  T2-D2
  //     { id: 416, modelId: 5, modelDomainId: 5, modelLevelId: 7, modelVarId : 3 , modelVarCumId: 0, modelStepId: 8},  //  CP
  //     { id: 417, modelId: 5, modelDomainId: 5, modelLevelId: 7, modelVarId : 18, modelVarCumId: 0, modelStepId: 8},  //  DEG0L
  //     { id: 418, modelId: 5, modelDomainId: 5, modelLevelId: 7, modelVarId : 32, modelVarCumId: 0, modelStepId: 8},  //  SFL

  //     // Icon-2i 925
  //     { id: 420, modelId: 5, modelDomainId: 5, modelLevelId: 5, modelVarId : 9, modelVarCumId: 0, modelStepId: 8}, // W
  //     { id: 421, modelId: 5, modelDomainId: 5, modelLevelId: 5, modelVarId : 8, modelVarCumId: 0, modelStepId: 8}, // R_V_Z_T  
  //     // Icon-2i 850
  //     { id: 422, modelId: 5, modelDomainId: 5, modelLevelId: 4, modelVarId : 9, modelVarCumId: 0, modelStepId: 8}, // W
  //     { id: 423, modelId: 5, modelDomainId: 5, modelLevelId: 4, modelVarId : 8, modelVarCumId: 0, modelStepId: 8}, // R_V_Z_T
  //     // Icon-2i 700
  //     { id: 424, modelId: 5, modelDomainId: 5, modelLevelId: 3, modelVarId : 9, modelVarCumId: 0, modelStepId: 8}, // W
  //     { id: 425, modelId: 5, modelDomainId: 5, modelLevelId: 3, modelVarId : 8, modelVarCumId: 0, modelStepId: 8}, // R_V_Z_T    
  //     // Icon-2i 500
  //     { id: 426, modelId: 5, modelDomainId: 5, modelLevelId: 2, modelVarId : 9, modelVarCumId: 0, modelStepId: 8}, // W
  //     { id: 427, modelId: 5, modelDomainId: 5, modelLevelId: 2, modelVarId : 8, modelVarCumId: 0, modelStepId: 8}, // R_V_Z_T   
  //     // Icon-2i 250
  //     { id: 428, modelId: 5, modelDomainId: 5, modelLevelId: 1, modelVarId : 9, modelVarCumId: 0, modelStepId: 8}, // W
  //     { id: 429, modelId: 5, modelDomainId: 5, modelLevelId: 1, modelVarId : 8, modelVarCumId: 0, modelStepId: 8}, // R_V_Z_T   


  //     // dwd-icon-d2
  //     { id: 501, modelId: 6, modelDomainId: 5, modelLevelId: 7, modelVarId : 1, modelVarCumId: 0, modelStepId: 9},   //  TP
  //     { id: 502, modelId: 6, modelDomainId: 5, modelLevelId: 7, modelVarId : 1, modelVarCumId: 24, modelStepId: 9},  //  TP24
  //     { id: 503, modelId: 6, modelDomainId: 5, modelLevelId: 7, modelVarId : 4, modelVarCumId: 0, modelStepId: 9},   //  SF
  //     { id: 504, modelId: 6, modelDomainId: 5, modelLevelId: 7, modelVarId : 4, modelVarCumId: 24, modelStepId: 9},  //  SF24
  //     { id: 505, modelId: 6, modelDomainId: 5, modelLevelId: 7, modelVarId : 13, modelVarCumId: 0, modelStepId: 9},  //  T2
  //     { id: 506, modelId: 6, modelDomainId: 5, modelLevelId: 7, modelVarId : 16, modelVarCumId: 0, modelStepId: 9},  //  SLP_V10
  //     { id: 507, modelId: 6, modelDomainId: 5, modelLevelId: 7, modelVarId : 24, modelVarCumId: 0, modelStepId: 9},  //  VG10
  //     { id: 508, modelId: 6, modelDomainId: 5, modelLevelId: 7, modelVarId : 19, modelVarCumId: 0, modelStepId: 9},  //  TCC
  //     { id: 509, modelId: 6, modelDomainId: 5, modelLevelId: 7, modelVarId : 20, modelVarCumId: 0, modelStepId: 9},  //  SKT
  //     { id: 510, modelId: 6, modelDomainId: 5, modelLevelId: 7, modelVarId : 25, modelVarCumId: 0, modelStepId: 9},  //  R2
  //     { id: 511, modelId: 6, modelDomainId: 5, modelLevelId: 7, modelVarId : 28, modelVarCumId: 0, modelStepId: 9},  //  V10
  //     { id: 512, modelId: 6, modelDomainId: 5, modelLevelId: 7, modelVarId : 32, modelVarCumId: 0, modelStepId: 9},  //  SFL
  //     { id: 513, modelId: 6, modelDomainId: 5, modelLevelId: 7, modelVarId : 18, modelVarCumId: 0, modelStepId: 9},  //  DEG0L
  //     { id: 514, modelId: 6, modelDomainId: 5, modelLevelId: 7, modelVarId : 33, modelVarCumId: 0, modelStepId: 9},  //  VMI
  //     { id: 515, modelId: 6, modelDomainId: 5, modelLevelId: 7, modelVarId : 21, modelVarCumId: 0, modelStepId: 9},  //  T2-D2
  //     { id: 516, modelId: 6, modelDomainId: 5, modelLevelId: 7, modelVarId : 14 , modelVarCumId: 0, modelStepId: 9}, //  MN2T
  //     { id: 517, modelId: 6, modelDomainId: 5, modelLevelId: 7, modelVarId : 15 , modelVarCumId: 0, modelStepId: 9}, //  MX2T

  //     // dwd-icon-d2 925
  //     { id: 520, modelId: 6, modelDomainId: 5, modelLevelId: 5, modelVarId : 9, modelVarCumId: 0, modelStepId: 9}, // W
  //     { id: 521, modelId: 6, modelDomainId: 5, modelLevelId: 5, modelVarId : 26, modelVarCumId: 0, modelStepId: 9}, // R_V_T  
  //     { id: 522, modelId: 6, modelDomainId: 5, modelLevelId: 5, modelVarId : 10, modelVarCumId: 0, modelStepId: 9}, // T_Z  
  //     // dwd-icon-d2 850
  //     { id: 523, modelId: 6, modelDomainId: 5, modelLevelId: 4, modelVarId : 9, modelVarCumId: 0, modelStepId: 9}, // W
  //     { id: 524, modelId: 6, modelDomainId: 5, modelLevelId: 4, modelVarId : 26, modelVarCumId: 0, modelStepId: 9}, // R_V_T
  //     { id: 525, modelId: 6, modelDomainId: 5, modelLevelId: 4, modelVarId : 10, modelVarCumId: 0, modelStepId: 9}, // T_Z 
  //     // dwd-icon-d2 700
  //     { id: 526, modelId: 6, modelDomainId: 5, modelLevelId: 3, modelVarId : 9, modelVarCumId: 0, modelStepId: 9}, // W
  //     { id: 527, modelId: 6, modelDomainId: 5, modelLevelId: 3, modelVarId : 26, modelVarCumId: 0, modelStepId: 9}, // R_V_T    
  //     { id: 528, modelId: 6, modelDomainId: 5, modelLevelId: 3, modelVarId : 10, modelVarCumId: 0, modelStepId: 9}, // T_Z  
  //     // dwd-icon-d2 500
  //     { id: 529, modelId: 6, modelDomainId: 5, modelLevelId: 2, modelVarId : 9, modelVarCumId: 0, modelStepId: 9}, // W
  //     { id: 530, modelId: 6, modelDomainId: 5, modelLevelId: 2, modelVarId : 26, modelVarCumId: 0, modelStepId: 9}, // R_V_T   
  //     { id: 531, modelId: 6, modelDomainId: 5, modelLevelId: 2, modelVarId : 10, modelVarCumId: 0, modelStepId: 9}, // T_Z 
  //     // dwd-icon-d2 300
  //     { id: 532, modelId: 6, modelDomainId: 5, modelLevelId: 9, modelVarId : 9, modelVarCumId: 0, modelStepId: 9}, // W
  //     { id: 533, modelId: 6, modelDomainId: 5, modelLevelId: 9, modelVarId : 26, modelVarCumId: 0, modelStepId: 9}, // R_V_T   
  //     { id: 534, modelId: 6, modelDomainId: 5, modelLevelId: 9, modelVarId : 10, modelVarCumId: 0, modelStepId: 9}, // T_Z       

  //     // dwd-icon-eu SFC
  //     { id: 601, modelId: 9, modelDomainId: 99, modelLevelId: 99, modelVarId : 1, modelVarCumId: 0, modelStepId: 10}, // TP
  //     { id: 601, modelId: 9, modelDomainId: 99, modelLevelId: 99, modelVarId : 1, modelVarCumId: 24, modelStepId: 10}, // TP24

  //     // moloch SFC
  //     { id: 701, modelId: 7, modelDomainId: 99, modelLevelId: 99, modelVarId : 1, modelVarCumId: 0, modelStepId: 11}, // TP
  //     { id: 702, modelId: 7, modelDomainId: 99, modelLevelId: 99, modelVarId : 1, modelVarCumId: 24, modelStepId: 11}, // TP24
  //     { id: 703, modelId: 7, modelDomainId: 99, modelLevelId: 99, modelVarId : 4, modelVarCumId: 0, modelStepId: 11}, // SF
  //     { id: 704, modelId: 7, modelDomainId: 99, modelLevelId: 99, modelVarId : 4, modelVarCumId: 24, modelStepId: 11}, // SF24

  //     // wrf SFC
  //     { id: 801, modelId: 8, modelDomainId: 99, modelLevelId: 7, modelVarId : 7, modelVarCumId: 0, modelStepId: 12}, // TP_V
  //     { id: 802, modelId: 8, modelDomainId: 99, modelLevelId: 7, modelVarId : 1, modelVarCumId: 24, modelStepId: 12}, // TP24
  //     { id: 803, modelId: 8, modelDomainId: 99, modelLevelId: 7, modelVarId : 19, modelVarCumId: 0, modelStepId: 12}, // TCC
  //     { id: 804, modelId: 8, modelDomainId: 99, modelLevelId: 7, modelVarId : 2, modelVarCumId: 0, modelStepId: 12}, // SF_T

  //   ],
  //    skipDuplicates: true,
  // })

  // // Modelli Probabiòistici Spaghetti
  // const modelProbLocationDelete = await prisma.modelProbLocation.deleteMany({})
  // const modelProbLocation = await prisma.modelProbLocation.createMany({
  //   data: [
  //     {id:0,  name: 'Codroipo',    codice: '46.00-13.00', order: 1},
  //     {id:1,  name: 'Sutrio',      codice: '46.50-13.00', order: 2},
  //     {id:2,  name: 'Claut',       codice: '46.25-12.50', order: 3},
  //     {id:3,  name: 'Caporetto',   codice: '46.25-13.50', order: 4},
  //     {id:5,  name: 'Sgonico',     codice: '45.75-13.75', order: 6},
  //     {id:6,  name: 'Caorle-Mare', codice: '45.50-13.00', order: 7},
  //     {id:7,  name: 'Cadore',      codice: '46.50-12.50', order: 8},
  //     {id:8,  name: 'Tarvisio',    codice: '46.50-13.50', order: 9},
  //     {id:9,  name: 'Forgaria',    codice: '46.25-13.00', order: 10},
  //     {id:10, name: 'Polcenigo',   codice: '46.00-12.50', order: 11},
  //     {id:11, name: 'Venco',       codice: '46.00-13.50', order: 12},
  //     {id:12, name: 'Oderzo',      codice: '45.75-12.50', order: 13},
  //     {id:13, name: 'Latisana',    codice: '45.75-13.00', order: 14},
  //     {id:14, name: 'Fossalon',    codice: '45.75-13.50', order: 15},
  //   ]
  // })

  // const modelliProbLev = await prisma.modelProbLevel.createMany({
  //   data: [
  //     {id:1, name: 'SFC',   order: 1},
  //     {id:2, name: '500',   order: 2},
  //     {id:3, name: '700' ,  order: 3},
  //     {id:4, name: '850' ,  order: 4},
  //   ],
  //   skipDuplicates: true,
  // })

  // const modelliProbVar = await prisma.modelProbVar.createMany({
  //   data: [
  //     {id:1, name: 'SLP',     order: 1},
  //     {id:2, name: 'V10m' ,   order: 2},
  //     {id:3, name: 'RR_t' ,   order: 3},
  //     {id:4, name: 'T2m' ,    order: 4},
  //     {id:5, name: 'WG10' ,   order: 5},
  //     {id:6, name: 'DEG0L' ,  order: 6},

  //     {id:11, name: 'Z' ,  order: 11},
  //     {id:12, name: 'T' ,  order: 12},
  //     {id:13, name: 'V' ,  order: 13},
  //     {id:14, name: 'W' ,  order: 14},
  //     // {id:15, name: 'Vo' ,  order: 15},
  //     {id:16, name: 'Q' ,  order: 16},
  //   ],
  //   skipDuplicates: true,
  // })


  // const modelProbStep = await prisma.modelProbStep.createMany({
  //   data:[
  //     {id: 1, start: 0, end: 0, step: 1}, // ecmwf-eps
  //     {id: 2, start: 3, end: 240, step: 6}, // ecmwf-eps
  //   ],
  //   skipDuplicates: true,
  // })

  // const modelProbRel = await prisma.modelProbRelations.createMany({
  //   data:[
  //     // ecmwf-eps SFC 
  //     { id: 1, modelId: 101, modelLevelId: 1, modelVarId : 1, modelStepId: 1, statistic: "NORMAL|STATISTIC" }, // SFC SLP
  //     { id: 2, modelId: 101, modelLevelId: 1, modelVarId : 2, modelStepId: 1, statistic: "NORMAL|STATISTIC" }, // SFC V10m
  //     { id: 3, modelId: 101, modelLevelId: 1, modelVarId : 3, modelStepId: 1, statistic: "NORMAL|STATISTIC" }, // SFC RR_t
  //     { id: 4, modelId: 101, modelLevelId: 1, modelVarId : 4, modelStepId: 1, statistic: "NORMAL|STATISTIC" }, // SFC T2m
  //     { id: 5, modelId: 101, modelLevelId: 1, modelVarId : 5, modelStepId: 1, statistic: "NORMAL|STATISTIC" }, // SFC WG10
  //     { id: 6, modelId: 101, modelLevelId: 1, modelVarId : 6, modelStepId: 1, statistic: "NORMAL|STATISTIC" }, // SFC DEG0L

  //     // ecmwf-eps 500
  //     { id: 7, modelId: 101, modelLevelId: 2, modelVarId : 11, modelStepId: 1, statistic: "NORMAL|STATISTIC" }, // 500 Z
  //     { id:107, modelId: 101, modelLevelId: 2, modelVarId : 11, modelStepId: 2, statistic: "SCATTER"}, // 500 Z
  //     { id: 8, modelId: 101, modelLevelId: 2, modelVarId : 12, modelStepId: 1, statistic: "NORMAL|STATISTIC" }, // 500 T
  //     { id: 9, modelId: 101, modelLevelId: 2, modelVarId : 13, modelStepId: 1, statistic: "NORMAL|STATISTIC" }, // 500 V
  //     { id: 10, modelId: 101, modelLevelId: 2, modelVarId : 14, modelStepId: 1, statistic: "NORMAL|STATISTIC" }, // 500 W
  //     // { id: 11, modelId: 101, modelLevelId: 2, modelVarId : 15, modelStepId: 1}, // 500 Vo
  //     { id: 12, modelId: 101, modelLevelId: 2, modelVarId : 16, modelStepId: 1, statistic: "NORMAL|STATISTIC" }, // 500 Q

  //     // ecmwf-eps 700
  //     { id: 13, modelId: 101, modelLevelId: 3, modelVarId : 11, modelStepId: 1, statistic: "NORMAL|STATISTIC" }, // 700 Z
  //     { id:113, modelId: 101, modelLevelId: 3, modelVarId : 11, modelStepId: 2, statistic: "SCATTER"}, // 700 Z
  //     { id: 14, modelId: 101, modelLevelId: 3, modelVarId : 12, modelStepId: 1, statistic: "NORMAL|STATISTIC" }, // 700 T
  //     { id: 15, modelId: 101, modelLevelId: 3, modelVarId : 13, modelStepId: 1, statistic: "NORMAL|STATISTIC" }, // 700 V
  //     { id: 16, modelId: 101, modelLevelId: 3, modelVarId : 14, modelStepId: 1, statistic: "NORMAL|STATISTIC" }, // 700 W
  //     // { id: 17, modelId: 101, modelLevelId: 3, modelVarId : 15, modelStepId: 1}, // 700 Vo
  //     { id: 18, modelId: 101, modelLevelId: 3, modelVarId : 16, modelStepId: 1}, // 700 Q

  //     // ecmwf-eps 850
  //     { id: 19, modelId: 101, modelLevelId: 4, modelVarId : 11, modelStepId: 1, statistic: "NORMAL|STATISTIC" }, // 850 Z
  //     { id:119, modelId: 101, modelLevelId: 4, modelVarId : 11, modelStepId: 2, statistic: "SCATTER"}, // 850 Z
  //     { id: 20, modelId: 101, modelLevelId: 4, modelVarId : 12, modelStepId: 1, statistic: "NORMAL|STATISTIC" }, // 850 T
  //     { id: 21, modelId: 101, modelLevelId: 4, modelVarId : 13, modelStepId: 1, statistic: "NORMAL|STATISTIC" }, // 850 V
  //     { id: 22, modelId: 101, modelLevelId: 4, modelVarId : 14, modelStepId: 1, statistic: "NORMAL|STATISTIC" }, // 850 W
  //     // { id: 23, modelId: 101, modelLevelId: 4, modelVarId : 15, modelStepId: 1}, // 850 Vo
  //     { id: 24, modelId: 101, modelLevelId: 4, modelVarId : 16, modelStepId: 1, statistic: "NORMAL|STATISTIC" }, // 850 Q


  //   ],
  //   skipDuplicates: true,
  // })



  // const satelliteDelete = await prisma.satellite.deleteMany({})
  // const satellite = await prisma.satellite.createMany({
  //   data: [
  //     {id:0, name: 'MSG',  descrizione: 'MSG', path: 'satellite/msg/', order: 1},
  //   ]
  // })

  // const satelliteProdDelete = await prisma.satelliteProd.deleteMany({})
  // const satelliteProd = await prisma.satelliteProd.createMany({
  //   data: [
  //     {id:0, name: 'IR-EUR-MR-M', descrizione: 'IR EUR', order: 1},
  //     {id:1, name: 'IR-ITN-MR-M', descrizione: 'IR ITN', order: 2},
  //     {id:2, name: 'VIS-EUR-HR-M', descrizione: 'VIS EUR', order: 3},
  //     {id:3, name: 'VIS-ITN-HR-M', descrizione: 'VIS ITN', order: 4},
  //     {id:4, name: 'WV-EUR-MR-M', descrizione: 'WV EUR', order: 5},
  //     {id:5, name: 'WV-ITN-MR-M', descrizione: 'WV ITN', order: 6},
  //     {id:6, name: 'FOG-ITN-MR-M', descrizione: 'FOG ITN', order: 7},
  //   ]
  // })

  // const previLocalitaVerificaDelete = await prisma.previLocalitaVerifica.deleteMany({}) 
  // const previLocalitaVerifica = await prisma.previLocalitaVerifica.createMany({
  //   data: [
  //     {id:0, desc: 'Canin-Gilberti', order: 0},
  //     {id:1, desc: 'Claut', order: 1},
  //     {id:2, desc: 'Costa', order: 2},
  //     {id:3, desc: 'Forni_Avoltri', order: 3},
  //     {id:4, desc: 'Lussari', order: 4},
  //     {id:5, desc: 'Piancavallo', order: 5},
  //     {id:6, desc: 'Pianura', order: 6},
  //     {id:7, desc: 'Sella_Nevea', order: 7},
  //     {id:8, desc: 'Tarvisio', order: 8},
  //     {id:9, desc: 'Zoncolan', order: 9},
  //   ]
  // })


  // const radarDelete = await prisma.radar.deleteMany({})
  // const radar = await prisma.radar.createMany({
  //   data: [
  //     {id:0, name: 'fossalon', descrizione: 'Fossalon di Grado - PCR', ente: 'PCR', path: 'pcr/fossalon', order: 1},
  //     {id:1, name: 'loncon' ,  descrizione: 'Loncon - ARPAV', ente: 'ARPAV', path: 'arpav/loncon',  order: 2},
  //     {id:2, name: 'teolo' ,  descrizione: 'Teolo - ARPAV', ente: 'ARPAV', path: 'arpav/teolo', order: 3},
  //     {id:3, name: 'mosaico arso' ,  descrizione: 'mosaico - ARSO', ente: 'ARSO', path: 'arso/mosaico', order: 4},
  //     {id:4, name: 'mosaico austria' ,  descrizione: 'mosaico - AUSTRIA', ente: 'AUSTRIA', path: 'austria/mosaico', order: 5},
  //     {id:5, name: 'opera nord italia', descrizione: 'Nord Italia - OPERA', ente: 'OPERA', path: 'opera/ITANOR', order: 6},
  //     {id:6, name: 'opera italia', descrizione: 'Italia - OPERA', ente: 'OPERA', path: 'opera/ITALIA', order: 7},
  //     {id:7, name: 'opera europa', descrizione: 'Europa - OPERA', ente: 'OPERA', path: 'opera/EUROPA', order: 8},

  //   ],
  //   skipDuplicates: true,
  // })

  // const radarProdDelete = await prisma.radarProd.deleteMany({})
  // const radarProd = await prisma.radarProd.createMany({
  //   data: [
  //     {id:0, name: 'vmi', order: 1},
  //     {id:1, name: 'sri', order: 2},
  //     {id:2, name: 'lbm_v', order: 3},
  //     {id:3, name: 'hmc', order: 4},
  //     {id:4, name: 'srt_01', order: 5},
  //     {id:5, name: 'srt_03', order: 6},
  //     {id:6, name: 'srt_06', order: 7},
  //     {id:7, name: 'srt_12', order: 8},
  //     {id:8, name: 'srt_24', order: 9},
  //   ],
  //   skipDuplicates: true,
  // })

  // const radarRelDelete = await prisma.radarRelations.deleteMany({})
  // const radarRel = await prisma.radarRelations.createMany({
  //   data: [
  //     {id:0, radarId: 0, radarProdId: 0},
  //     {id:1, radarId: 0, radarProdId: 1},
  //     {id:2, radarId: 0, radarProdId: 2},
  //     {id:3, radarId: 0, radarProdId: 3},
  //     {id:4, radarId: 0, radarProdId: 4},
  //     {id:5, radarId: 0, radarProdId: 5},
  //     {id:6, radarId: 0, radarProdId: 6},
  //     {id:7, radarId: 0, radarProdId: 7},
  //     {id:8, radarId: 0, radarProdId: 8},

  //     {id:100, radarId: 1, radarProdId: 1},
  //     {id:200, radarId: 2, radarProdId: 1},

  //     {id: 300, radarId: 3, radarProdId: 1},

  //     {id: 400, radarId: 4, radarProdId: 1},

  //     {id: 500, radarId: 5, radarProdId: 1},
  //     {id: 501, radarId: 6, radarProdId: 1},
  //     {id: 502, radarId: 7, radarProdId: 1},
  //   ],
  //   skipDuplicates: true,
  // })


  // const pseudoDelete = await prisma.pseudosondaggi.deleteMany({})
  // const pseudo = await prisma.pseudosondaggi.createMany({
  //   data: [
  //     {id:0, name: 'ecmwf',   descrizione: 'ECMWF',  path: 'ecmwf', runs: "00,12" , order: 1},
  //     {id:1, name: 'aladin',  descrizione: 'ALADIN', path: 'aladin', runs: "00,12" , order: 3},
  //     {id:2, name: 'moloch',  descrizione: 'MOLOCH', path: 'moloch', runs: "03"   , order: 4},
  //   ],
  //   skipDuplicates: true,
  // })

  // const pseudoLocDelete = await prisma.pseudosondaggiLocalita.deleteMany({})
  // const pseudoLoc = await prisma.pseudosondaggiLocalita.createMany({
  //   data: [

  //     {id:0, name:"UDINE", pseudosondaggiId: 0, order: 1},
  //     {id:1, name:"TRIESTE", pseudosondaggiId: 0, order: 2},
  //     {id:2, name:"SAPPADA", pseudosondaggiId: 0, order: 3},
  //     {id:3, name:"CORTINA", pseudosondaggiId: 0, order: 4},
  //     {id:4, name:"CADORE", pseudosondaggiId: 0, order: 5},
  //     {id:5, name:"CLAUT", pseudosondaggiId: 0, order: 6},
  //     {id:6, name:"PAULARO", pseudosondaggiId: 0, order: 7},
  //     {id:7, name:"TOLMEZZO", pseudosondaggiId: 0, order: 8},
  //     {id:8, name:"CARNIA", pseudosondaggiId: 0, order: 9},
  //     {id:9, name:"TARVISIO", pseudosondaggiId: 0, order: 10},
  //     {id:10, name:"PIANCAVALLO", pseudosondaggiId: 0, order: 11},
  //     {id:11, name:"MUSI", pseudosondaggiId: 0, order: 12},
  //     {id:12, name:"GEMONA", pseudosondaggiId: 0, order: 13},
  //     {id:13, name:"BORDANO", pseudosondaggiId: 0, order: 14},
  //     {id:14, name:"PORTOGRUARO", pseudosondaggiId: 0, order: 15},
  //     {id:15, name:"CONEGLIANO", pseudosondaggiId: 0, order: 16},
  //     {id:16, name:"LIGNANO", pseudosondaggiId: 0, order: 17},
  //     {id:17, name:"GORIZIA", pseudosondaggiId: 0, order: 18},
  //     {id:18, name:"CARSO", pseudosondaggiId: 0, order: 19},
  //     {id:19, name:"VENEZIA", pseudosondaggiId: 0, order: 20},

  //     {id:100, name:"UDINE", pseudosondaggiId: 1, order: 1},
  //     {id:101, name:"TRIESTE", pseudosondaggiId: 1, order: 2},
  //     {id:102, name:"SAPPADA", pseudosondaggiId: 1, order: 3},
  //     {id:103, name:"CORTINA", pseudosondaggiId: 1, order: 4},
  //     {id:104, name:"CADORE", pseudosondaggiId: 1, order: 5},
  //     {id:105, name:"CLAUT", pseudosondaggiId: 1, order: 6},
  //     {id:106, name:"PAULARO", pseudosondaggiId: 1, order: 7},
  //     {id:107, name:"TOLMEZZO", pseudosondaggiId: 1, order: 8},
  //     {id:108, name:"CARNIA", pseudosondaggiId: 1, order: 9},
  //     {id:109, name:"TARVISIO", pseudosondaggiId: 1, order: 10},
  //     {id:110, name:"PIANCAVALLO", pseudosondaggiId: 1, order: 11},
  //     {id:111, name:"MUSI", pseudosondaggiId: 1, order: 12},
  //     {id:112, name:"GEMONA", pseudosondaggiId: 1, order: 13},
  //     {id:113, name:"BORDANO", pseudosondaggiId: 1, order: 14},
  //     {id:114, name:"PORTOGRUARO", pseudosondaggiId: 1, order: 15},
  //     {id:115, name:"CONEGLIANO", pseudosondaggiId: 1, order: 16},
  //     {id:116, name:"LIGNANO", pseudosondaggiId: 1, order: 17},
  //     {id:117, name:"GORIZIA", pseudosondaggiId: 1, order: 18},
  //     {id:118, name:"CARSO", pseudosondaggiId: 1, order: 19},
  //     {id:119, name:"VENEZIA", pseudosondaggiId: 1, order: 20},

  //     {id: 200, name:"UDINE", pseudosondaggiId: 2, order: 1},
  //     {id: 201, name:"TRIESTE", pseudosondaggiId: 2, order: 2},
  //     {id: 202, name:"SAPPADA", pseudosondaggiId: 2, order: 3},
  //     {id: 203, name:"CORTINA", pseudosondaggiId: 2, order: 4},
  //     {id: 204, name:"CADORE", pseudosondaggiId: 2, order: 5},
  //     {id: 205, name:"CLAUT", pseudosondaggiId: 2, order: 6},
  //     {id: 206, name:"PAULARO", pseudosondaggiId: 2, order: 7},
  //     {id: 207, name:"TOLMEZZO", pseudosondaggiId: 2, order: 8},
  //     {id: 208, name:"CARNIA", pseudosondaggiId: 2, order: 9},
  //     {id: 209, name:"TARVISIO", pseudosondaggiId: 2, order: 10},
  //     {id: 210, name:"PIANCAVALLO", pseudosondaggiId: 2, order: 11},
  //     {id: 211, name:"MUSI", pseudosondaggiId: 2, order: 12},
  //     {id: 212, name:"GEMONA", pseudosondaggiId: 2, order: 13},
  //     {id: 213, name:"BORDANO", pseudosondaggiId: 2, order: 14},
  //     {id: 214, name:"PORTOGRUARO", pseudosondaggiId: 2, order: 15},
  //     {id: 215, name:"CONEGLIANO", pseudosondaggiId: 2, order: 16},
  //     {id: 216, name:"LIGNANO", pseudosondaggiId: 2, order: 17},
  //     {id: 217, name:"GORIZIA", pseudosondaggiId: 2, order: 18},
  //     {id: 218, name:"CARSO", pseudosondaggiId: 2, order: 19},
  //     {id: 219, name:"VENEZIA", pseudosondaggiId: 2, order: 20},

  //   ],
  //   skipDuplicates: true,
  // })

  // // Poor
  // // const poorDelete = await prisma.poor.deleteMany({})
  // // const poor = await prisma.poor.updateMany({
  // //   data: [
  // //     {id:0, name: 'PROB' },
  // //     {id:1, name: 'PROBFVG' },
  // //     {id:2, name: 'SNOWP' },
  // //     {id:3, name: 'SNOWPFVG' },
  // //     {id:4, name: 'WIND' },
  // //     {id:5, name: 'WINDFVG' },
  // //     {id:6, name: 'CLOUD' },
  // // ]
  // // })

  // const data = [
  //   { id: 0, name: 'PROB',      active : true },
  //   { id: 1, name: 'PROBFVG',   active : true },
  //   { id: 2, name: 'SNOWP',     active : true },
  //   { id: 3, name: 'SNOWPFVG',  active : true },
  //   { id: 4, name: 'WIND',      active : true },
  //   { id: 5, name: 'WINDFVG',   active : true },
  //   { id: 6, name: 'CLOUD',     active : true },
  //   { id: 7, name: 'CLOUDFVG',  active : true },
  // ]
  
  // // for (const item of data) {
  // //   await prisma.poor.update({
  // //     where: { id: item.id },
  // //     data: { name: item.name },
  // //   })
  // // }

  // const poor = await prisma.poor.createMany({data, skipDuplicates: true} )

  // // const poorPercDelete = await prisma.poorPercent.deleteMany({})
  // const poorPerc = await prisma.poorPercent.createMany({
  //   data: [
  //     {id:0, poorId: 0 ,value: 1},  
  //     {id:1, poorId: 0 ,value: 5},
  //     {id:2, poorId: 0 ,value: 10},
  //     {id:3, poorId: 0 ,value: 20},
  //     {id:4, poorId: 0 ,value: 30},
  //     {id:5, poorId: 0 ,value: 50},
  //     {id:6, poorId: 0 ,value: 100},
  //     {id:7, poorId: 0 ,value: 150},
  //     {id:8, poorId: 0 ,value: 200},

  //     {id:100,  poorId: 1 ,value: 1},
  //     {id:101,  poorId: 1 ,value: 5},
  //     {id:102,  poorId: 1 ,value: 10},  
  //     {id:103,  poorId: 1 ,value: 20},
  //     {id:104,  poorId: 1 ,value: 30},
  //     {id:105,  poorId: 1 ,value: 50},
  //     {id:106,  poorId: 1 ,value: 100},
  //     {id:107,  poorId: 1 ,value: 150},
  //     {id:108,  poorId: 1 ,value: 200},

  //     {id:200,  poorId: 2 ,value: 1},
  //     {id:201,  poorId: 2 ,value: 5},
  //     {id:202,  poorId: 2 ,value: 10},  
  //     {id:203,  poorId: 2 ,value: 15},
  //     {id:204,  poorId: 2 ,value: 20},
  //     {id:205,  poorId: 2 ,value: 30},
  //     {id:206,  poorId: 2 ,value: 40},
  //     {id:207,  poorId: 2 ,value: 80},

  //     {id:300,  poorId: 3 ,value: 1},
  //     {id:301,  poorId: 3 ,value: 5},
  //     {id:302,  poorId: 3 ,value: 10},  
  //     {id:303,  poorId: 3 ,value: 15},
  //     {id:304,  poorId: 3 ,value: 20},
  //     {id:305,  poorId: 3 ,value: 30},
  //     {id:306,  poorId: 3 ,value: 40},
  //     {id:307,  poorId: 3 ,value: 80},

  //     {id:400,  poorId: 4 ,value: 20},
  //     {id:401,  poorId: 4 ,value: 40},
  //     {id:402,  poorId: 4 ,value: 70},  
  //     {id:403,  poorId: 4 ,value: 100},

  //     {id:500,  poorId: 5 ,value: 20},
  //     {id:501,  poorId: 5 ,value: 40},
  //     {id:502,  poorId: 5 ,value: 70},  
  //     {id:503,  poorId: 5 ,value: 100},

  //     {id:600,  poorId: 6 ,value: 0},
  //     {id:601,  poorId: 6 ,value: 20},
  //     {id:602,  poorId: 6 ,value: 40},  
  //     {id:603,  poorId: 6 ,value: 60},
  //     {id:604,  poorId: 6 ,value: 80},

  //     {id:700,  poorId: 7 ,value: 0},
  //     {id:701,  poorId: 7 ,value: 20},
  //     {id:702,  poorId: 7 ,value: 40},  
  //     {id:703,  poorId: 7 ,value: 60},
  //     {id:704,  poorId: 7 ,value: 80},

  //   ],
  //   skipDuplicates: true,
  // })

  // // Meteogrammi
  // const meteogrammiDelete = await prisma.meteogrammi.deleteMany({})
  // const meteogrammi = await prisma.meteogrammi.createMany({
  //   data: [
  //     {id:0, name: 'ecmwf',   descrizione: 'ECMWF',  path: 'ecmwf', order: 1},
  //     {id:1, name: 'aladin',  descrizione: 'ALADIN', path: 'aladin', order: 2},
  //     {id:2, name: 'moloch',  descrizione: 'MOLOCH', path: 'moloch', order: 3},
  //     {id:3, name: 'arpege',  descrizione: 'ARPEGE', path: 'arpege', order: 5},
  //     {id:4, name: 'wrf-crma',  descrizione: 'WRF-CRMA', path: 'wrf-crma', order: 4},
  //   ],
  //   skipDuplicates: true,
  // })

  // const meteogrammiLoc = await prisma.meteogrammiLocalita.createMany({
  //   data: [
  //     {id:0, name:"UDINE", meteogrammiId: 0, order: 1},
  //     {id:1, name:"VENEZIA", meteogrammiId: 0, order: 2},
  //     {id:2, name:"TRIESTE", meteogrammiId: 0, order: 3},
  //     {id:3, name:"BORDANO", meteogrammiId: 0, order: 4},
  //     {id:4, name:"CADORE", meteogrammiId: 0, order: 5},
  //     {id:5, name:"CARSO", meteogrammiId: 0, order: 6},
  //     {id:6, name:"CLAUT", meteogrammiId: 0, order: 7},
  //     {id:7, name:"CONEGLIANO", meteogrammiId: 0, order: 8},
  //     {id:8, name:"CORTINA", meteogrammiId: 0, order: 9},
  //     {id:9, name:"GEMONA", meteogrammiId: 0, order: 10},
  //     {id:10, name:"GORIZIA", meteogrammiId: 0, order: 11},
  //     {id:11, name:"LIGNANO", meteogrammiId: 0, order: 12},
  //     {id:12, name:"MUSI", meteogrammiId: 0, order: 13},
  //     {id:13, name:"PAULARO", meteogrammiId: 0, order: 14},
  //     {id:14, name:"PIANCAVALLO", meteogrammiId: 0, order: 15},
  //     {id:15, name:"PORTOGRUARO", meteogrammiId: 0, order: 16},
  //     {id:16, name:"SAPPADA", meteogrammiId: 0, order: 17},
  //     {id:17, name:"TARVISIO", meteogrammiId: 0, order: 18},
  //     {id:18, name:"TOLMEZZO", meteogrammiId: 0, order: 19},

  //     {id:100, name:"UDINE", meteogrammiId: 1, order: 1},
  //     {id:102, name:"TRIESTE", meteogrammiId: 1, order: 2},
  //     {id:103, name:"VENEZIA", meteogrammiId: 1, order: 3},
  //     {id:104, name:"BORDANO", meteogrammiId: 1, order: 4},
  //     {id:105, name:"CADORE", meteogrammiId: 1, order: 5},
  //     {id:106, name:"CARSO", meteogrammiId: 1, order: 6},
  //     {id:107, name:"CLAUT", meteogrammiId: 1, order: 7},
  //     {id:108, name:"CONEGLIANO", meteogrammiId: 1, order: 8},
  //     {id:109, name:"CORTINA", meteogrammiId: 1, order: 9},
  //     {id:110, name:"GEMONA", meteogrammiId: 1, order: 10},
  //     {id:111, name:"GORIZIA", meteogrammiId: 1, order: 11},
  //     {id:112, name:"LIGNANO", meteogrammiId: 1, order: 12},
  //     {id:113, name:"MUSI", meteogrammiId: 1, order: 13},
  //     {id:114, name:"PAULARO", meteogrammiId: 1, order: 14},
  //     {id:115, name:"PIANCAVALLO", meteogrammiId: 1, order: 15},
  //     {id:116, name:"PORTOGRUARO", meteogrammiId: 1, order: 16},
  //     {id:117, name:"SAPPADA", meteogrammiId: 1, order: 17},
  //     {id:118, name:"TARVISIO", meteogrammiId: 1, order: 18},
  //     {id:119, name:"TOLMEZZO", meteogrammiId: 1, order: 19},

  //     {id:200, name:"UDINE", meteogrammiId: 2, order: 1},
  //     {id:201, name:"VENEZIA", meteogrammiId: 2, order: 2},
  //     {id:202, name:"TRIESTE", meteogrammiId: 2, order: 3},
  //     {id:203, name:"BORDANO", meteogrammiId: 2, order: 4},
  //     {id:204, name:"CADORE", meteogrammiId: 2, order: 5},
  //     {id:205, name:"CARSO", meteogrammiId: 2, order: 6},
  //     {id:206, name:"CLAUT", meteogrammiId: 2, order: 7},
  //     {id:207, name:"CONEGLIANO", meteogrammiId: 2, order: 8},
  //     {id:208, name:"CORTINA", meteogrammiId: 2, order: 9},
  //     {id:209, name:"GEMONA", meteogrammiId: 2, order: 10},
  //     {id:210, name:"GORIZIA", meteogrammiId: 2, order: 11},
  //     {id:211, name:"LIGNANO", meteogrammiId: 2, order: 12},
  //     {id:212, name:"MUSI", meteogrammiId: 2, order: 13},
  //     {id:213, name:"PAULARO", meteogrammiId: 2, order: 14},
  //     {id:214, name:"PIANCAVALLO", meteogrammiId: 2, order: 15},
  //     {id:215, name:"PORTOGRUARO", meteogrammiId: 2, order: 16},
  //     {id:216, name:"SAPPADA", meteogrammiId: 2, order: 17},
  //     {id:217, name:"TARVISIO", meteogrammiId: 2, order: 18},
  //     {id:218, name:"TOLMEZZO", meteogrammiId: 2, order: 19},


  //     {id:300, name:"UDINE", meteogrammiId: 3, order: 1},
  //     {id:301, name:"VENEZIA", meteogrammiId: 3, order: 2},
  //     {id:302, name:"TRIESTE", meteogrammiId: 3, order: 3},
  //     {id:303, name:"BORDANO", meteogrammiId: 3, order: 4},
  //     {id:304, name:"CADORE", meteogrammiId: 3, order: 5},
  //     {id:305, name:"CARSO", meteogrammiId: 3, order: 6},
  //     {id:306, name:"CLAUT", meteogrammiId: 3, order: 7},
  //     {id:307, name:"CONEGLIANO", meteogrammiId: 3, order: 8},
  //     {id:308, name:"CORTINA", meteogrammiId: 3, order: 9},
  //     {id:309, name:"GEMONA", meteogrammiId: 3, order: 10},
  //     {id:310, name:"GORIZIA", meteogrammiId: 3, order: 11},
  //     {id:311, name:"LIGNANO", meteogrammiId: 3, order: 12},
  //     {id:312, name:"MUSI", meteogrammiId: 3, order: 13},
  //     {id:313, name:"PAULARO", meteogrammiId: 3, order: 14},
  //     {id:314, name:"PIANCAVALLO", meteogrammiId: 3, order: 15},
  //     {id:315, name:"PORTOGRUARO", meteogrammiId: 3, order: 16},
  //     {id:316, name:"SAPPADA", meteogrammiId: 3, order: 17},
  //     {id:317, name:"TARVISIO", meteogrammiId: 3, order: 18},
  //     {id:318, name:"TOLMEZZO", meteogrammiId: 3, order: 19},

  //     {id:400, name:"UDINE", meteogrammiId: 4, order: 1},
  //     {id:401, name:"VENEZIA", meteogrammiId: 4, order: 2},
  //     {id:402, name:"TRIESTE", meteogrammiId: 4, order: 3},
  //     {id:403, name:"BORDANO", meteogrammiId: 4, order: 4},
  //     {id:404, name:"CADORE", meteogrammiId: 4, order: 5},
  //     {id:405, name:"CARSO", meteogrammiId: 4, order: 6},
  //     {id:406, name:"CLAUT", meteogrammiId: 4, order: 7},
  //     {id:407, name:"CONEGLIANO", meteogrammiId: 4, order: 8},
  //     {id:408, name:"CORTINA", meteogrammiId: 4, order: 9},
  //     {id:409, name:"GEMONA", meteogrammiId: 4, order: 10},
  //     {id:410, name:"GORIZIA", meteogrammiId: 4, order: 11},
  //     {id:411, name:"LIGNANO", meteogrammiId: 4, order: 12},
  //     {id:412, name:"MUSI", meteogrammiId: 4, order: 13},
  //     {id:413, name:"PAULARO", meteogrammiId: 4, order: 14},
  //     {id:414, name:"PIANCAVALLO", meteogrammiId: 4, order: 15},
  //     {id:415, name:"PORTOGRUARO", meteogrammiId: 4, order: 16},
  //     {id:416, name:"SAPPADA", meteogrammiId: 4, order: 17},
  //     {id:417, name:"TARVISIO", meteogrammiId: 4, order: 18},
  //     {id:418, name:"TOLMEZZO", meteogrammiId: 4, order: 19},

  //   ],
  //   skipDuplicates: true,
  // })

  // // const deleteProduct = await prisma.monitorProduct.deleteMany({})
  // const monitProduct = await prisma.monitorProduct.createMany({
  //   data: [
  //     // deterministici
  //     {code: 'ecmwf-ita',             descrizione: 'ecmwf-ita',                 order: 101},
  //     {code: 'ecmwf-eua',             descrizione: 'ecmwf-eua',                 order: 101},
  //     {code: 'gfs',                   descrizione: 'gfs',                       order: 102},
  //     {code: 'aladin',                descrizione: 'aladin',                    order: 103},
  //     {code: 'arpege',                descrizione: 'arpege',                    order: 104},
  //     {code: 'moloch',                descrizione: 'moloch',                    order: 105},
  //     {code: 'wrf',                   descrizione: 'wrf',                       order: 106},
  //     {code: 'icon-2i',               descrizione: 'icon-2i',                   order: 107},
  //     {code: 'icon-2i-ruc',           descrizione: 'icon-2i-ruc',               order: 108},
  //     {code: 'dwd-icon-d2',           descrizione: 'dwd-icon-d2',               order: 109},
      
  //     {code: 'meteogrammi-ifs',       descrizione: 'ECMWF - meteogrammi',       order: 200},
  //     {code: 'poor',                  descrizione: 'POOR - ensemble',           order: 300},
  //     {code: 'severe',                descrizione: 'severe',                    order: 350},
      
  //     // probabilistici
  //     {code: 'ecmwf-eps',             descrizione: 'ecmwf - eps',               order: 400},
  //     {code: 'ifs-probs',             descrizione: 'IFS - probabilistici',      order: 500},

  //     {code: 'ifs-pseudosondaggi',    descrizione: 'IFS - pseudosondaggi',      order: 600},
  //     {code: 'onda-pelmo',            descrizione: 'MARE - onda Pelmo',         order: 700},
  //     {code: 'mare-ispra',            descrizione: 'MARE - marea Ispra',        order: 800},
  //     {code: 'flas',                  descrizione: 'Temporali - Flas',          order: 900},
  //     {code: 'atmoswing',             descrizione: 'Temporali - Atmoswing',     order: 901},

  //     {code: 'bora',                  descrizione: 'bora',                      order: 910},
      
  //     {code: 'verifica-t',            descrizione: 'verifica Temperatura',      order: 920},

  //   ],
  //   skipDuplicates: true,
  // })


  // const editProduct = await prisma.editProduct.createMany({
  //   data: [
  //     {id:0, name: 'atmodesk',       descrizione: 'Atmodesk',   archivePath: ''},
  //     {id:1, name: 'extrasondaggio', descrizione: 'richieste extrasondaggio', archivePath: 'cfd/rds/richieste/'},
  //     {id:2, name: 'bvmr',           descrizione: 'Bollettino di Vigilanza Meteorologica (BVMR)', archivePath: 'cfd/bvmr/bollettini/'},
  //     {id:3, name: 'qpf',            descrizione: 'Valutazione meteo (QPF)',  archivePath: 'cfd/qpf/bollettini/'},
  //     {id:4, name: 'amr',            descrizione: 'Avviso meteo regionale (AMR)', archivePath: 'cfd/amr/bollettini/'},
  //     {id:5, name: 'caldo',          descrizione: 'Avviso Caldo', archivePath: 'cfd/caldo/bollettini/'},
  //     {id:6, name: 'basre',          descrizione: 'Bollettino di previsioni per il Sistema di Risposta alle Emergenze ARPA', archivePath: 'cfd/basre/bollettini/'},
  //   ],
  //   skipDuplicates: true,
  // })

  // const editEmail = await prisma.editEmail.createMany({
  //   data: [
  //     {id:0, email: 'meteo.support@arpa.fvg.it'},
  //     {id:1, email: 'alessandro.gimona@arpa.fvg.it'},
  //     {id:2, email: 'meteo.previs@arpa.fvg.it'},
  //   ],
  //   skipDuplicates: true,
  // })

  // const editEmailRel = await prisma.editEmailProduct.createMany({
  //   data: [
  //     { emailId: 0, productId: 1},
  //     { emailId: 0, productId: 2},
  //     { emailId: 2, productId: 1},
  //   ],
  //   skipDuplicates: true,
  // })


  console.log({  roles })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })