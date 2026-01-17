
import * as fs from 'fs';
import * as path from 'path';

// Define interfaces to match the data
interface Package {
  title: string;
  description: string;
  facilities: string[];
  isActive: boolean;
  games: string[];
  // other fields optional for this display
  [key: string]: any; 
}

// Mock assets object to handle the variables in the file
const assets = new Proxy({}, {
  get: (target, prop) => `[Asset: ${String(prop)}]`
});

async function getGameData() {
  console.log('--- Memulai Pengambilan Data Game ---\n');

  try {
    // 1. Tentukan path file
    const dataPath = path.join(process.cwd(), 'src', 'data', 'initialData.ts');
    
    // 2. Cek apakah file ada
    if (!fs.existsSync(dataPath)) {
      throw new Error(`File tidak ditemukan di: ${dataPath}`);
    }

    console.log(`✅ Mengambil data dari sumber cadangan: ${dataPath}\n`);

    // 3. Baca konten file
    const fileContent = fs.readFileSync(dataPath, 'utf-8');

    // 4. Ekstrak bagian initialPackages array
    // Mencari pattern: export const initialPackages: Package[] = [ ... ];
    // Kita ambil dari '[' setelah initialPackages sampai '];'
    const match = fileContent.match(/export const initialPackages: Package\[\] = (\[[\s\S]*?\]);/);
    
    if (!match) {
      throw new Error('Format data initialPackages tidak ditemukan dalam file');
    }

    let arrayString = match[1];

    // 5. Evaluasi string menjadi object
    // Kita perlu membersihkan syntax TS jika ada, tapi di sini sepertinya aman karena array literal
    // Kita gunakan eval dengan context 'assets' yang sudah didefinisikan di atas
    // Note: eval digunakan di sini untuk parsing file TS/JS raw tanpa compiler
    const packages: Package[] = eval(arrayString);

    if (!packages || packages.length === 0) {
      throw new Error('Data packages kosong');
    }

    // 6. Tampilkan Data
    console.log('--- Daftar Data Game & Fasilitas ---\n');

    packages.forEach((pkg, index) => {
      console.log(`Game #${index + 1}: ${pkg.title}`);
      console.log(`Deskripsi: ${pkg.description}`);
      
      const status = pkg.isActive ? 'Tersedia' : 'Tidak Tersedia';
      console.log(`Status: ${status}`);

      console.log('Fasilitas:');
      if (pkg.facilities && pkg.facilities.length > 0) {
        // Minimum 3 facilities check handled by just showing what we have
        // User asked to "Show min 3", usually implies "At least 3 items" or "Show first 3".
        // "Daftar fasilitas yang tersedia (minimum 3 fasilitas per game)" 
        // -> Ensure data HAS 3? Or display 3?
        // Let's display all of them to be safe, or at least 3.
        
        pkg.facilities.forEach(fac => {
          console.log(`  - ${fac}`);
        });
      } else {
        console.log('  - Tidak ada data fasilitas');
      }
      console.log('----------------------------------------\n');
    });

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

getGameData();
