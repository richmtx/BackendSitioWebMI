import * as fs from 'fs';
import * as path from 'path';

export function imagenABase64(rutaRelativa: string | null): string | null {
  if (!rutaRelativa) return null;

  const rutaNormalizada = rutaRelativa.startsWith('uploads/')
    ? rutaRelativa
    : `uploads/${rutaRelativa}`;

  const rutaAbsoluta = path.join(process.cwd(), rutaNormalizada);

  if (!fs.existsSync(rutaAbsoluta)) {
    console.warn(`[imagen.helper] No se encontró: ${rutaAbsoluta}`);
    return null;
  }

  const archivo = fs.readFileSync(rutaAbsoluta);
  const base64 = archivo.toString('base64');
  const ext = path.extname(rutaAbsoluta).toLowerCase();

  const mimeTypes: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
  };

  const mimeType = mimeTypes[ext] ?? 'image/jpeg';

  return `data:${mimeType};base64,${base64}`;
}