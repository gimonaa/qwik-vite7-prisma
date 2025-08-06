/**
 * Prisma Client Singleton
 * 
 * Questo file deve essere importato SOLO in:
 * - Route handlers (onGet, onPost, etc.)
 * - routeLoader$ e routeAction$
 * - Altri file .server.ts
 * 
 * MAI importare in componenti Qwik che vengono renderizzati client-side!
 */

import { PrismaClient } from '@prisma/client';

// Dichiarazione globale per TypeScript
declare global {
  var __prisma: PrismaClient | undefined;
}

// Configurazione del client Prisma
const prismaOptions = {
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'info', 'warn', 'error'] as const
    : ['warn', 'error'] as const,
};

// Singleton pattern per evitare multiple connessioni
// In development, riusa l'istanza esistente per evitare problemi con hot reload
export const prisma = globalThis.__prisma || new PrismaClient();

// Salva l'istanza globalmente solo in development
if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma;
}

// Utility function per disconnettere in modo sicuro
export async function disconnectPrisma() {
  try {
    await prisma.$disconnect();
    console.log('✅ Prisma disconnected successfully');
  } catch (error) {
    console.error('❌ Error disconnecting Prisma:', error);
  }
}

// Utility function per verificare la connessione
export async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Gestione graceful shutdown (opzionale)
if (typeof process !== 'undefined') {
  process.on('beforeExit', async () => {
    await disconnectPrisma();
  });

  process.on('SIGINT', async () => {
    await disconnectPrisma();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    await disconnectPrisma();
    process.exit(0);
  });
}

// Export default per comodità
export default prisma;