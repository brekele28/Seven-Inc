<?php

namespace Database\Seeders;

use App\Models\Lowongan;
use App\Models\User;
use Illuminate\Database\Seeder;

class LowonganSeeder extends Seeder
{
    private const LOCATION = 'Bantul, Kabupaten Bantul, Daerah Istimewa Yogyakarta';

    public function run(): void
    {
        $admin = User::where('email', 'superalie@gmail.com')
            ->where('role', 'admin')
            ->firstOrFail();

        $lowongan = [
            [
                'judul_lowongan' => 'Staf Human Resources Development (HRD)',
                'deskripsi' => 'Bertanggung jawab dalam mengelola administrasi kepegawaian, proses rekrutmen, pengembangan sumber daya manusia, serta memastikan implementasi kebijakan dan budaya perusahaan berjalan efektif.',
                'tanggal_dibuka' => '2026-04-03',
                'tanggal_ditutup' => '2026-06-15',
                'kualifikasi' => [
                    [
                        'id' => 'general',
                        'title' => 'KUALIFIKASI UMUM',
                        'items' => [
                            'Wanita - usia 18-30 tahun (diutamakan sedang tidak kuliah).',
                            'Domisili Yogyakarta & sekitarnya.',
                            'Pendidikan terakhir minimal S1 Psikologi/Manajemen SDM.',
                            'Bersedia di kontrak minimal 1 tahun.',
                            'Ada laptop/netbook.',
                            'Siap bekerja 8 jam/hari pada pukul 08.00-17.00 WIB.',
                            'Mampu bekerja secara individu maupun tim.',
                        ],
                    ],
                    [
                        'id' => 'special',
                        'title' => 'KUALIFIKASI KHUSUS',
                        'items' => [
                            'Bisa blog & sosmed.',
                            'Mengerti dunia HRD.',
                            'Paham rekrutmen-seleksi & menguasai kegiatan HRD lainnya.',
                            'Disiplin, komunikatif, inisiatif, tanggung jawab, dan mampu bekerjasama.',
                            'Cekatan dalam lingkungan fast paced.',
                            'Kemampuan interpersonal baik.',
                            'Dapat bekerja di bawah tekanan.',
                        ],
                    ],
                    [
                        'id' => 'responsibility',
                        'title' => 'TANGGUNG JAWAB',
                        'items' => [
                            'Rekrutmen & seleksi karyawan (iklan loker, interview, tes serta pelaporannya).',
                            'Mengurusi kebutuhan administratif setiap kegiatan HRD (surat-menyurat, dll).',
                            'Mengontrol kedisiplinan karyawan (presensi, dll).',
                            'Penilaian kinerja karyawan.',
                        ],
                    ],
                    [
                        'id' => 'benefit',
                        'title' => 'BENEFIT',
                        'items' => [
                            'Gaji pokok & bonus-bonus.',
                            'Suasana kantor kekeluargaan.',
                            'Kegiatan rutin menyenangkan (motivating competition, one-day outing, cooking day, english day, dresscode day, dll).',
                            'Pelatihan & pengembangan diri.',
                        ],
                    ],
                ],
            ],
            $this->job('Digital Marketing Specialist', 'Merancang dan menjalankan strategi pemasaran digital untuk meningkatkan brand awareness, engagement, dan konversi bisnis Seven Inc.', '2026-04-05', '2026-06-20'),
            $this->job('FullStack Developer', 'Mengembangkan aplikasi web dari sisi frontend dan backend menggunakan teknologi modern yang aman, responsif, dan maintainable.', '2026-04-08', '2026-06-28'),
            $this->job('Frontend Developer', 'Membangun antarmuka website yang responsif, cepat, dan nyaman digunakan berdasarkan kebutuhan desain dan bisnis.', '2026-04-12', '2026-07-05'),
            $this->job('Backend Developer', 'Membangun API dan sistem backend yang aman, stabil, dan mudah dikembangkan untuk mendukung produk digital Seven Inc.', '2026-04-16', '2026-07-12'),
            $this->job('UI/UX Designer', 'Merancang pengalaman pengguna dan antarmuka produk digital yang efektif, konsisten, dan mudah digunakan.', '2026-04-20', '2026-07-20'),
            $this->job('Content Writer', 'Menyusun konten informatif, menarik, dan konsisten dengan brand voice Seven Inc untuk berbagai kanal komunikasi.', '2026-04-24', '2026-07-28'),
            $this->job('System Analyst', 'Menganalisis kebutuhan sistem, menyusun dokumentasi teknis, dan menjembatani kebutuhan user dengan tim developer.', '2026-04-28', '2026-08-05'),
            $this->job('Project Manager IT', 'Mengelola timeline, scope, dan koordinasi tim untuk memastikan proyek digital berjalan sesuai target dan kualitas.', '2026-05-02', '2026-08-14'),
            $this->job('Mobile App Developer', 'Mengembangkan aplikasi mobile yang stabil, responsif, dan mudah digunakan untuk kebutuhan bisnis digital.', '2026-05-06', '2026-08-22'),
            $this->job('QA Tester', 'Melakukan pengujian aplikasi untuk memastikan fitur berjalan sesuai kebutuhan dan bebas dari bug kritikal.', '2026-05-10', '2026-08-30'),
            $this->job('DevOps Engineer', 'Membantu pengelolaan deployment, server, dan pipeline agar aplikasi dapat berjalan stabil dan efisien.', '2026-05-14', '2026-09-07'),
            $this->job('Data Analyst', 'Mengolah dan menganalisis data untuk menghasilkan insight yang membantu pengambilan keputusan bisnis.', '2026-05-18', '2026-09-16'),
            $this->job('SEO Specialist', 'Mengoptimalkan performa website pada mesin pencari melalui strategi SEO teknis, konten, dan analisis keyword.', '2026-05-22', '2026-09-25'),
            $this->job('Social Media Specialist', 'Mengelola strategi dan kalender konten media sosial untuk meningkatkan engagement dan brand awareness.', '2026-05-26', '2026-10-04'),
            $this->job('Graphic Designer', 'Membuat aset visual untuk kebutuhan branding, promosi, dan konten digital dengan gaya desain yang konsisten.', '2026-05-30', '2026-10-14'),
            $this->job('IT Support', 'Mendukung kebutuhan teknis perangkat, jaringan, dan troubleshooting dasar untuk menunjang operasional perusahaan.', '2026-04-10', '2026-10-24'),
            $this->job('Cyber Security Analyst', 'Membantu menjaga keamanan sistem dan melakukan analisis potensi risiko keamanan pada aplikasi maupun infrastruktur.', '2026-04-18', '2026-11-05'),
            $this->job('Product Owner', 'Mengelola kebutuhan produk digital, menyusun prioritas fitur, dan memastikan solusi sesuai kebutuhan pengguna dan bisnis.', '2026-05-08', '2026-11-20'),
            $this->job('Technical Writer', 'Menyusun dokumentasi teknis yang jelas dan mudah dipahami untuk kebutuhan internal maupun pengguna produk.', '2026-05-15', '2026-12-10'),
        ];

        foreach ($lowongan as $item) {
            Lowongan::updateOrCreate(
                [
                    'user_id' => $admin->id,
                    'judul_lowongan' => $item['judul_lowongan'],
                ],
                [
                    'deskripsi' => $item['deskripsi'],
                    'kualifikasi' => $item['kualifikasi'],
                    'lokasi' => self::LOCATION,
                    'status_lowongan' => 'active',
                    'tanggal_dibuka' => $item['tanggal_dibuka'],
                    'tanggal_ditutup' => $item['tanggal_ditutup'],
                ]
            );
        }
    }

    private function job(string $title, string $description, string $openedAt, string $closedAt): array
    {
        return [
            'judul_lowongan' => $title,
            'deskripsi' => $description,
            'tanggal_dibuka' => $openedAt,
            'tanggal_ditutup' => $closedAt,
            'kualifikasi' => $this->sections(
                [
                    'Laki-laki / Perempuan.',
                    'Memiliki motivasi kerja yang tinggi.',
                    'Mampu bekerja secara individu maupun tim.',
                    'Komunikatif, teliti, dan bertanggung jawab.',
                ],
                [
                    "Memiliki pengetahuan dasar sesuai posisi {$title}.",
                    'Mampu menggunakan tools pendukung pekerjaan.',
                    'Memiliki portofolio atau pengalaman relevan menjadi nilai tambah.',
                    'Mampu mengikuti perkembangan teknologi dan tren digital.',
                ],
                [
                    "Menjalankan tugas sesuai jobdesk posisi {$title}.",
                    'Berkoordinasi dengan tim terkait.',
                    'Menyelesaikan pekerjaan sesuai timeline.',
                    'Membuat laporan progres pekerjaan secara berkala.',
                ],
                [
                    'Lingkungan kerja kolaboratif.',
                    'Pengalaman menangani real project.',
                    'Kesempatan mengembangkan skill dan portofolio.',
                    'Pelatihan dan pengembangan diri.',
                ]
            ),
        ];
    }

    private function sections(array $general, array $special, array $responsibility, array $benefit): array
    {
        return [
            [
                'id' => 'general',
                'title' => 'KUALIFIKASI UMUM',
                'items' => $general,
            ],
            [
                'id' => 'special',
                'title' => 'KUALIFIKASI KHUSUS',
                'items' => $special,
            ],
            [
                'id' => 'responsibility',
                'title' => 'TANGGUNG JAWAB',
                'items' => $responsibility,
            ],
            [
                'id' => 'benefit',
                'title' => 'BENEFIT',
                'items' => $benefit,
            ],
        ];
    }
}